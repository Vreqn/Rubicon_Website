// Responsive screenshot helper for quality gates.
// Usage: node scripts/screenshot.mjs <url> <outDir> [name]
// Uses the installed Chrome via playwright-core (no browser download).
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
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  await page.screenshot({ path: `${outDir}/${name}-${label}.png`, fullPage: true });
  console.log(`${name}-${label}.png  h-overflow: ${overflow}px${overflow > 0 ? '  <-- OVERFLOW' : ''}`);
  await page.close();
}

await browser.close();
