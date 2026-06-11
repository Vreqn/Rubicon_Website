# Content Decisions — awaiting Krisztian

Real-world facts and brand forks that aren't the agent's to decide. Each entry: **Issue**, **Why it's not mine to decide**, **Options**, **Decision** (blank until made). When a decision lands, apply it and move the entry to the "Resolved" section at the bottom.

---

## 1. Services list & pricing — RESOLVED 2026-06-10

- **Decision:** Capability areas, no packages, no pricing. Five real areas confirmed by Krisztian, now live on the Services page under "What we build": Automated reporting · Connecting systems · Data entry automation · Document processing · Verification & summarization tools. Closing note states every engagement is scoped individually, starting with one bottleneck.

## 2. Public contact details — RESOLVED 2026-06-10

- **Decision:** Public email = `krisztian@rubiconworkflows.ca`, now live in the footer, contact-page sidebar (as a `mailto:` link), and the LocalBusiness JSON-LD `email` field. No phone or street address for now — structured data stays name + Vancouver locality + URL + email (valid). Revisit address/phone later for stronger local SEO.

## 3. Case studies — PENDING (Krisztian to supply)

- **Decision so far:** Keep the honest empty state for launch ("being written up — ask us about it"). Krisztian will provide one real case study (client descriptor + what was built + verified outcomes) in a later session; I'll draft it from exactly what he gives and set `draft: false` only after his review. Template stays `draft: true`.

## 4. Team bios (About page) — PENDING (Krisztian to supply text)

- **Decision:** A short joint "who we are" paragraph (no individual bios/photos). Krisztian will supply the exact wording; I'll shape it to brand voice. The "Who's behind it" section stays with a TODO badge until then.

## 5. Testimonials / social proof

- **Issue:** No testimonials exist on the site. The hero reference design had a client-logo marquee; it was replaced with a four-pillars ticker because we have no client logos cleared for use.
- **Why:** Quotes and logos require real clients and their permission.
- **Options:** (a) Collect quotes from past work; (b) sector keywords instead of logos; (c) none for launch.
- **Decision:**

## 6. Wordmark lockup — AWAITING KRISZTIAN (agent recommends "bless interim")

- **Issue:** Brand doc v0.2 has the R mark only; a custom-drawn wordmark/lockup isn't finalized. Header currently shows the mark + "Rubicon Workflows" in Space Grotesk 500.
- **Agent recommendation:** Bless the current mark + Space Grotesk text as the official *interim* lockup and drop the "placeholder" framing — it looks finished and is what most B2B brands actually ship. A bespoke designed wordmark can come later without blocking launch.
- **Options:** (a) Bless current mark + Space Grotesk as interim lockup [recommended]; (b) mark only in header (name still in footer/titles); (c) keep flagged as placeholder pending brand v0.3.
- **Decision:** _pending — explained to Krisztian 2026-06-10, awaiting pick_

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

## 9. OG / social-share image — RESOLVED 2026-06-10

- **Decision:** Richer assembled OG image now ships at `public/og-default.png` (2400×1260 @2×): Pine bg, sage R mark, "Rubicon Workflows" in Space Grotesk, tagline "Automate the routine, focus on the results." in muted bone, and a mono `~ CUSTOM AUTOMATION · VANCOUVER, BC` line. Rendered with the real brand fonts. Good for launch; a bespoke designed version (and per-page OG images) can come in the Claude Design polish phase.

## 10. Slate contrast fork (brand spec vs WCAG AA) — RESOLVED 2026-06-10 (agent call)

- **Decision:** Accept the AA-safe derived muted-text tokens (current behavior). Slate stays restricted to large text/dividers/decorative use; body-size muted text uses `--text-muted-on-dark`/`--text-muted-on-light`. This is the only WCAG-AA-compliant option without changing the palette, and the project a11y gate requires AA (Lighthouse a11y = 100 confirms). Krisztian may optionally darken Slate in a future brand v0.3 — if so, update `tokens.css` only.

## 11. Hero CTA wording — RESOLVED 2026-06-10

- **Decision:** Primary hero CTA now reads "Tell us what's eating your time" (links to `/contact`), matching the contact-page heading. Secondary button stays "How we work" → `/services`.

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
