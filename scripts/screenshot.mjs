// Responsive screenshot helper for quality gates.
// Usage: node scripts/screenshot.mjs <url> <outDir> [name]
// Uses the installed Chrome via playwright-core (no browser download).
// Auto-scrolls through the page first so scroll reveals fire and lazy
// background videos load — a fullPage capture alone never scrolls, which
// would screenshot below-fold content in its hidden pre-reveal state.
import { chromium } from 'playwright-core';

const [url = 'http://localhost:4321/', outDir = 'shots', name = 'page'] = process.argv.slice(2);

const viewports = [
  { label: 'mobile', width: 375, height: 812 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'desktop', width: 1280, height: 800 },
];

const browser = await chromium.launch({ channel: 'chrome' });

for (const { label, width, height } of viewports) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(url, { waitUntil: 'networkidle' });

  // Walk the page so IntersectionObservers (reveals, lazy video) trigger.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900); // let reveal transitions settle

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  await page.screenshot({ path: `${outDir}/${name}-${label}.png`, fullPage: true });
  console.log(`${name}-${label}.png  h-overflow: ${overflow}px${overflow > 0 ? '  <-- OVERFLOW' : ''}`);
  await page.close();
}

await browser.close();
