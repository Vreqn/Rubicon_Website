// WCAG AA over-video contrast gate (2026-06 design port).
//
// With video opacity caps above 0.5 the SCRIM is the AA mechanism — this
// script verifies it against worst-case frames. For each sampled time in the
// page's background video it hides the checked text, screenshots the region
// behind each text block (video + scrim composite, exactly as rendered),
// finds the BRIGHTEST pixel (worst case for light text), and computes the
// WCAG contrast ratio against the text's actual computed color.
//
// Usage:
//   node scripts/video-aa-check.mjs <url> "<selector>|<large|normal>" [...]
// Large text (≥24px / ≥18.7px bold) needs ≥3:1, normal text ≥4.5:1.
//
// Example:
//   node scripts/video-aa-check.mjs http://localhost:4321/ ".hero__tagline|large" ".hero__lede|normal"
import { chromium } from 'playwright-core';
import { PNG } from 'pngjs';

const [url, ...checks] = process.argv.slice(2);
if (!url || !checks.length) {
  console.error('usage: node scripts/video-aa-check.mjs <url> "<selector>|<large|normal>" [...]');
  process.exit(2);
}
const targets = checks.map((c) => {
  const [selector, kind = 'normal'] = c.split('|');
  return { selector, required: kind === 'large' ? 3 : 4.5 };
});

const srgbToLin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (r, g, b) => 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
const contrast = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--autoplay-policy=no-user-gesture-required'],
});

let failed = false;

for (const viewport of [
  { label: 'mobile', width: 375, height: 812 },
  { label: 'desktop', width: 1280, height: 800 },
]) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'networkidle' });

  const meta = await page.evaluate(async () => {
    const v = document.querySelector('video.bg-video');
    if (!v) return null;
    if (v.readyState < 2)
      await new Promise((r) => v.addEventListener('loadeddata', r, { once: true }));
    v.pause();
    // Worst case is the video at its FULL cap — kill the fade so early
    // samples aren't flattered by a still-running opacity transition.
    v.style.transition = 'none';
    v.style.opacity = v.dataset.max || '0.5';
    return { duration: v.duration };
  });
  if (!meta) {
    console.log(`[${viewport.label}] no bg video on page — skipping`);
    await page.close();
    continue;
  }

  // text colors + boxes (before hiding)
  const boxes = await page.evaluate((sels) => {
    return sels.map((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const color = getComputedStyle(el).color;
      return { sel, x: r.x, y: r.y, w: r.width, h: r.height, color };
    });
  }, targets.map((t) => t.selector));

  // hide checked text so we sample pure background composite
  await page.evaluate((sels) => {
    sels.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) el.style.visibility = 'hidden';
    });
  }, targets.map((t) => t.selector));

  const times = [];
  for (let t = 0; t < meta.duration; t += Math.max(2, meta.duration / 10)) times.push(t);

  const worst = targets.map(() => ({ ratio: Infinity, t: 0 }));

  for (const t of times) {
    await page.evaluate(async (time) => {
      const v = document.querySelector('video.bg-video');
      v.currentTime = time;
      await new Promise((r) => v.addEventListener('seeked', r, { once: true }));
    }, t);
    await page.waitForTimeout(60);

    for (let i = 0; i < targets.length; i++) {
      const box = boxes[i];
      if (!box || box.w < 2 || box.h < 2) continue;
      const buf = await page.screenshot({
        clip: { x: box.x, y: box.y, width: box.w, height: box.h },
      });
      const png = PNG.sync.read(buf);
      let maxL = 0;
      for (let p = 0; p < png.data.length; p += 4) {
        const l = luminance(png.data[p], png.data[p + 1], png.data[p + 2]);
        if (l > maxL) maxL = l;
      }
      if (process.env.AA_DUMP) {
        const { writeFileSync } = await import('node:fs');
        writeFileSync(
          `docs/port-shots/aa-${viewport.label}-${i}-t${t.toFixed(0)}.png`,
          buf
        );
      }
      // Computed colors arrive as rgb(0-255 …) — or, when the source is a
      // color-mix(), as color(srgb 0-1 0-1 0-1). Normalize both to 0-255.
      const m = box.color.match(/[\d.]+/g).map(Number);
      const rgb = box.color.startsWith('color(srgb')
        ? m.slice(0, 3).map((v) => v * 255)
        : m.slice(0, 3);
      const textL = luminance(rgb[0], rgb[1], rgb[2]);
      const ratio = contrast(textL, maxL);
      if (ratio < worst[i].ratio) worst[i] = { ratio, t };
    }
  }

  for (let i = 0; i < targets.length; i++) {
    const { selector, required } = targets[i];
    if (!boxes[i]) {
      console.log(`[${viewport.label}] ${selector}: NOT FOUND`);
      continue;
    }
    const { ratio, t } = worst[i];
    const ok = ratio >= required;
    if (!ok) failed = true;
    console.log(
      `[${viewport.label}] ${selector}: worst ${ratio.toFixed(2)}:1 at t=${t.toFixed(1)}s ` +
        `(needs ${required}:1) ${ok ? 'PASS' : '<-- FAIL'}`
    );
  }

  await page.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
