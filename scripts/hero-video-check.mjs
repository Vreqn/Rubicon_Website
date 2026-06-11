// Verifies the hero video actually loads and plays, and captures a frame.
import { chromium } from 'playwright-core';

const outDir = process.argv[2] || 'shots';
const browser = await chromium.launch({ channel: 'chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const state = await page.evaluate(async () => {
  const v = document.getElementById('hero-video');
  if (!v) return { present: false };
  // give it a moment to start
  await new Promise((r) => setTimeout(r, 1500));
  return {
    present: true,
    src: v.currentSrc,
    readyState: v.readyState, // 4 = HAVE_ENOUGH_DATA
    paused: v.paused,
    currentTime: Number(v.currentTime.toFixed(2)),
    opacity: getComputedStyle(v).opacity,
    videoWidth: v.videoWidth,
    videoHeight: v.videoHeight,
  };
});

console.log('HERO VIDEO:', JSON.stringify(state, null, 2));

await page.screenshot({ path: `${outDir}/hero-with-video.png` });
console.log('captured hero-with-video.png');

await browser.close();
