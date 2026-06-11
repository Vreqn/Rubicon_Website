# Content Decisions — awaiting Krisztian

Real-world facts and brand forks that aren't the agent's to decide. Each entry: **Issue**, **Why it's not mine to decide**, **Options**, **Decision** (blank until made). When a decision lands, apply it and move the entry to the "Resolved" section at the bottom.

---

## 1. Services list & pricing

- **Issue:** `src/pages/services.astro` is structured around the four brand pillars, but the actual list of offered services (and whether pricing appears at all) is unset. Page ships with `[TODO]` blocks.
- **Why:** The real service catalogue is a business fact only Krisztian/Attila hold.
- **Options:** (a) Named service packages; (b) capability areas without packaging; (c) "every engagement is scoped" narrative with no list.
- **Decision:**

## 2. Public contact details

- **Issue:** Footer, contact page, and LocalBusiness JSON-LD need a public email (brand convention is `firstname@rubiconworkflows.ca` — which first name?), and optionally phone/address. JSON-LD currently ships with name/locality/URL only.
- **Why:** Real contact facts; publishing an address/phone is an owner call.
- **Options:** (a) `krisztian@`; (b) `attila@`; (c) a role address like `hello@`; phone/address: include or omit.
- **Decision:**

## 3. Case studies

- **Issue:** `src/content/work/` has one all-placeholder template, `draft: true`. The Work section renders an honest empty state. Publishing requires real client facts, metrics, and permission.
- **Why:** Client names, outcomes, and numbers are real-world facts; inventing them is prohibited.
- **Options:** (a) Anonymized studies ("a Vancouver roadworks estimator"); (b) named studies with permission; (c) keep empty state until ready.
- **Decision:**

## 4. Team bios (About page)

- **Issue:** `/about` has the elevator pitch and positioning from the brand doc, but team names, roles, photos, and history are `[TODO]`.
- **Why:** Biographical facts.
- **Options:** (a) Full bios + photos; (b) short joint "who we are" paragraph; (c) no bio section.
- **Decision:**

## 5. Testimonials / social proof

- **Issue:** No testimonials exist on the site. The hero reference design had a client-logo marquee; it was replaced with a four-pillars ticker because we have no client logos cleared for use.
- **Why:** Quotes and logos require real clients and their permission.
- **Options:** (a) Collect quotes from past work; (b) sector keywords instead of logos; (c) none for launch.
- **Decision:**

## 6. Wordmark lockup

- **Issue:** Brand doc v0.2 has the R mark only; wordmark/lockups are explicitly not finalized. Header uses mark + "Rubicon Workflows" in Space Grotesk 500 as a labeled placeholder.
- **Why:** Pending brand decision (v0.3).
- **Options:** Wait for v0.3; or bless the current mark+text treatment as the interim lockup.
- **Decision:**

## 7. Logo SVG source

- **Issue:** Only `Rubicon_Logo.ai` existed. The vector path was extracted programmatically from the .ai (it's PDF-compatible: one page, one path, filled Sage) into `src/assets/logo-mark.svg`, verified pixel-faithful against a render of the original, and used to generate the five colorways + `public/favicon.svg` (auto Forest-on-light / Sage-on-dark) + PNG fallbacks. 16px favicon legibility verified.
- **Why:** The mark must come from the real source file — never fabricated. It did; Krisztian should still eyeball the rendered mark in the site header.
- **Options:** (a) Accept extracted SVGs (recommended — they are the original path data); (b) re-export from Illustrator if anything looks off.
- **Decision:**

## 8. Hero video footage

- **Issue:** The hero is built video-first with a drop-in contract: place the file at `public/video/hero.mp4` (optional poster at `public/video/hero-poster.jpg`), commit, push — nothing else changes. Until then a static Pine treatment renders. What the footage shows is undecided.
- **Why:** Krisztian is supplying the asset; subject matter is a brand call.
- **Options:** Abstract/texture motion; workspace footage; typographic motion piece.
- **Decision:**

## 9. OG / social-share image

- **Issue:** A temporary 1200×630 OG image (Pine background + sage mark + company name) ships at `public/og-default.png`. A designed replacement is wanted.
- **Why:** Brand-visual judgment beyond the locked rules.
- **Options:** Keep assembled placeholder; design one in Claude Design pass; per-page OG images later.
- **Decision:**

## 10. Slate contrast fork (brand spec vs WCAG AA)

- **Issue:** Brand doc assigns Slate `#6B6F62` to "muted text, captions, footnotes" — but Slate measures ~4.4:1 on Bone and ~3.3:1 on Pine, failing WCAG AA for normal-size text. The build uses derived muted-text tokens (`color-mix` of Pine/Bone) for body-size muted text and restricts Slate to large text (≥18.66px), dividers, and decorative elements.
- **Why:** This is a fork between the brand doc and the project's hard AA requirement; resolving it permanently (e.g. darkening Slate in brand v0.3) is a brand decision.
- **Options:** (a) Accept derived tokens (current behavior); (b) darken Slate in brand v0.3 and update `tokens.css`; (c) accept AA failure for captions only (not recommended; violates project a11y gate).
- **Decision:**

## 11. Hero CTA wording

- **Issue:** Hero CTA currently reads "Start with one bottleneck" (assembled from brand language: "starting with one bottleneck and building from there"), linking to `/contact`.
- **Why:** Primary conversion copy — operator preference.
- **Options:** (a) Keep; (b) "Book a consult"; (c) "Tell us what's eating your time".
- **Decision:**

## 12. First real blog posts

- **Issue:** One seed post exists, assembled strictly from brand-doc pillar copy and flagged for review. The blog needs a real editorial direction and Krisztian's sign-off on the seed post (or its replacement).
- **Why:** Published thought-leadership speaks as the company.
- **Options:** Review/keep seed post; replace; hold blog at "coming soon".
- **Decision:**

## 13. Analytics

- **Issue:** No analytics installed. If wanted, Vercel Analytics is the lightest fit (no cookie banner needed for basic mode); key/config lives in Vercel, not the repo.
- **Why:** Tooling + privacy posture is an owner call.
- **Options:** (a) Vercel Analytics; (b) Plausible/Fathom (paid, privacy-first); (c) none.
- **Decision:**

## 14. Formspree account & endpoint

- **Issue:** The contact form needs a Formspree (or similar) endpoint, set as `PUBLIC_FORMSPREE_ENDPOINT` in Vercel env vars. Until it exists the form renders disabled with a visible TODO badge — it must not pretend to work.
- **Why:** Account creation and the service choice are owner actions; the key is a secret-adjacent config.
- **Options:** (a) Formspree free tier; (b) Vercel-native form handling; (c) Basin/other.
- **Decision:**

---

## Resolved

*(nothing yet)*
