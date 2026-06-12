// Interaction gate for the case-study reader overlay (work page).
import { chromium } from 'playwright-core';

const base = process.argv[2] || 'http://localhost:4321';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const results = [];
const check = (name, ok) => {
  results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) process.exitCode = 1;
};

// 1. open via card link click
await page.goto(`${base}/work/`, { waitUntil: 'networkidle' });
await page.click('.study[data-study="dispatch"] .study__link');
await page.waitForTimeout(400);
check('opens from card link', await page.isVisible('#study-reader .reader-title'));
check(
  'title matches study',
  (await page.textContent('#study-reader .reader-title')).includes('Dispatch')
);
check(
  'scroll locked while open',
  (await page.evaluate(() => document.body.style.overflow)) === 'hidden'
);
check(
  'close button focused on open',
  await page.evaluate(() => document.activeElement?.classList.contains('reader__close'))
);

// 2. focus trap wraps
await page.keyboard.press('Shift+Tab');
check(
  'shift-tab from close wraps inside panel',
  await page.evaluate(() => document.querySelector('.reader__panel').contains(document.activeElement))
);

// 3. Esc closes + restores focus + unlocks scroll
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
check('esc closes', await page.isHidden('#study-reader'));
check('scroll unlocked', (await page.evaluate(() => document.body.style.overflow)) === '');
check(
  'focus restored to trigger',
  await page.evaluate(() => document.activeElement?.closest('.study')?.dataset.study === 'dispatch')
);

// 4. backdrop closes
await page.click('.study[data-study="intake"] .study__link');
await page.waitForTimeout(400);
await page.mouse.click(20, 400); // backdrop edge
await page.waitForTimeout(400);
check('backdrop closes', await page.isHidden('#study-reader'));

// 5. deep link opens on load
await page.goto(`${base}/work/#reconcile`, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
check('deep link #reconcile opens on load', await page.isVisible('#study-reader .reader-title'));
check(
  'deep-linked title matches',
  (await page.textContent('#study-reader .reader-title')).includes('reconciliation')
);

// 6. reduced motion: reader still opens (no transition), tilt not armed
const rm = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await rm.emulateMedia({ reducedMotion: 'reduce' });
await rm.goto(`${base}/work/`, { waitUntil: 'networkidle' });
await rm.click('.study[data-study="dispatch"] .study__link');
await rm.waitForTimeout(200);
check('reduced-motion: reader opens', await rm.isVisible('#study-reader .reader-title'));
check('reduced-motion: tilt not armed', !(await rm.$('[data-tilt="on"]')));

console.log(results.join('\n'));
await browser.close();
