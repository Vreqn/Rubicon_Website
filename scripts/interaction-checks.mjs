import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome' });

// 1. Keyboard navigation + visible focus (desktop)
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const focusResults = [];
for (let i = 0; i < 6; i++) {
  await page.keyboard.press('Tab');
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      text: (el.textContent || '').trim().slice(0, 30),
      outline: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0,
    };
  });
  focusResults.push(info);
}
console.log('TAB ORDER (first 6):');
for (const r of focusResults) console.log(` ${r.tag} "${r.text}" visible-focus=${r.outline}`);

// 2. Mobile menu toggle
const mob = await browser.newPage({ viewport: { width: 375, height: 812 } });
await mob.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
const navBefore = await mob.locator('#site-nav').isVisible();
await mob.locator('.site-header__toggle').click();
const navAfter = await mob.locator('#site-nav').isVisible();
const expanded = await mob.locator('.site-header__toggle').getAttribute('aria-expanded');
await mob.locator('.site-header__toggle').click();
const navClosed = await mob.locator('#site-nav').isVisible();
console.log(`MOBILE MENU: closed=${!navBefore} opens=${navAfter} aria-expanded=${expanded} re-closes=${!navClosed}`);

// 3. Contact form disabled state (no endpoint configured)
const contact = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await contact.goto('http://localhost:4321/contact/', { waitUntil: 'networkidle' });
const submitDisabled = await contact.locator('form button[type="submit"]').isDisabled();
const action = await contact.locator('form.contact-form').getAttribute('action');
console.log(`CONTACT FORM: submit-disabled=${submitDisabled} action="${action}" (endpoint unset => must be # and disabled)`);

await browser.close();
