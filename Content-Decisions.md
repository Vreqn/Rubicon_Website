# Content Decisions — awaiting Krisztian

Real-world facts and brand forks that aren't the agent's to decide. Each entry: **Issue**, **Why it's not mine to decide**, **Options**, **Decision** (blank until made). When a decision lands, apply it and move the entry to the "Resolved" section at the bottom.

---

## 1. Services list & pricing — REOPENED 2026-06-12 (design loop changed the list)

- **Was resolved 2026-06-10:** five capability areas (Automated reporting · Connecting systems · Data entry automation · Document processing · Verification & summarization tools).
- **Issue:** The 2026-06 Claude Design comp shipped a **six-engagement** list instead, now live on `/services/` per the approved full port: Workflow audit · Process automation · Reporting & data pipelines · System integration · Document & inbox handling · Care & maintenance (each with a mono "deliverable" line).
- **Why:** What Rubicon actually sells is a real-world fact. The six-engagement framing covers the same ground plus the audit + care bookends, but it supersedes a list Krisztian explicitly confirmed.
- **Options:** (a) Confirm the six engagements as the canonical list; (b) revert to the five areas (copy swap in `src/pages/services.astro`); (c) edit the six in place.
- **Decision:**

## 2. Public contact details — RESOLVED 2026-06-10

- **Decision:** Public email = `krisztian@rubiconworkflows.ca`, now live in the footer, contact-page sidebar (as a `mailto:` link), and the LocalBusiness JSON-LD `email` field. No phone or street address for now — structured data stays name + Vancouver locality + URL + email (valid). Revisit address/phone later for stronger local SEO.

## 3. Case studies — UPDATED 2026-06-12 (three SAMPLE studies now ship, per Krisztian)

- **Decision so far:** Per Krisztian's call during the design port, the three studies from the design loop ship as **editable mock content**: `src/content/work/{dispatch,intake,reconcile}.md`. Every number, sector, quote, and attribution in them is **illustrative, not real**. Containment while mock: a visible "sample data — numbers illustrative" badge on every card/reader/detail render, `noindex` on the detail pages, and exclusion from the sitemap (`astro.config.mjs`).
- **Realization path (per study):** edit the `.md` facts to a real engagement's, flip `sample: false`, remove the slug from the sitemap filter in `astro.config.mjs`. The honest empty state still exists as the fallback if all studies are ever pulled (`draft: true`).

## 4. Team bios (About page) — UPDATED 2026-06-12 (founders copy live, confirm wording)

- **Now live (from the design comp):** the About page names **Krisztian Kadar** and **Attila Kadar** as Co-founders (hero meta line + two-name signature block), with the "Rubicon is the two of us" narrative — no individual bios, no headshots.
- **Needs Krisztian:** confirm the names/roles/wording are exactly right (they're public-facing claims). Edit points: `src/pages/about.astro` (hero meta + signature block).

## 5. Testimonials / social proof — UPDATED 2026-06-12 (marquee built, hidden)

- **Issue:** No testimonials or cleared client logos exist. The 2026-06 design comp included a "Companies we work with" logo marquee; per Krisztian's call it is **built but not rendered** — `src/components/LogoMarquee.astro` exists, the homepage keeps the PillarsTicker in that slot.
- **Why:** Quotes and logos require real clients and their permission; an empty/fake logo wall is exactly what the brand refuses.
- **When logos land:** import LogoMarquee in `src/pages/index.astro` and pass `logos=[{src, alt}…]` (the post-hero strip has a pointer comment).
- **Options for the interim:** (a) collect quotes from past work; (b) sector keywords; (c) ticker only (current).
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

## 8. Hero video footage — RESOLVED 2026-06-10

- **Decision:** Krisztian supplied "Rubicon Website Hero Final.mp4" (1920×1080, 27.4s). Optimized for web: H.264 CRF 28, audio stripped (hero plays muted), faststart → **66.6 MB → 2.39 MB** (729 kbps), shipping at `public/video/hero.mp4` with a 140 KB poster at `public/video/hero-poster.jpg`. Verified playing in-browser (readyState 4, opacity capped 0.5, text AA over the scrim). The 66 MB master lives in `_assets-source/` (gitignored) — re-encode from there if a higher-quality source is ever needed. A WebM variant was tried but came out larger than the MP4, so it was dropped.

## 9. OG / social-share image — RESOLVED 2026-06-10

- **Decision:** Richer assembled OG image now ships at `public/og-default.png` (2400×1260 @2×): Pine bg, sage R mark, "Rubicon Workflows" in Space Grotesk, tagline "Automate the routine, focus on the results." in muted bone, and a mono `~ CUSTOM AUTOMATION · VANCOUVER, BC` line. Rendered with the real brand fonts. Good for launch; a bespoke designed version (and per-page OG images) can come in the Claude Design polish phase.

## 10. Slate contrast fork (brand spec vs WCAG AA) — RESOLVED 2026-06-10 (agent call)

- **Decision:** Accept the AA-safe derived muted-text tokens (current behavior). Slate stays restricted to large text/dividers/decorative use; body-size muted text uses `--text-muted-on-dark`/`--text-muted-on-light`. This is the only WCAG-AA-compliant option without changing the palette, and the project a11y gate requires AA (Lighthouse a11y = 100 confirms). Krisztian may optionally darken Slate in a future brand v0.3 — if so, update `tokens.css` only.

## 11. Hero CTA wording — RESOLVED 2026-06-10; NOTE 2026-06-12

- **Decision:** Primary hero CTA read "Tell us what's eating your time" (→ `/contact`), secondary "How we work" (→ `/services`).
- **Note (design port):** the approved 2026-06 comp removes the hero buttons entirely — the homepage hero is now copy-only, and the resolved CTA wording lives on in the **Forest CTA band** ("Tell us what's eating your team's time." → "Start the conversation"). If hero buttons should return, that's a one-section edit in `src/pages/index.astro`.

## 15. Email alias & social handle (from the design comps) — NEW 2026-06-12

- **Issue:** The design comps use `hello@rubiconworkflows.ca` throughout; the site ships the resolved `krisztian@rubiconworkflows.ca` (#2). The comps also link `@rubiconworkflows` — but no real profile URL exists, so the handle renders as plain text (footer + contact aside), never a dead link.
- **Why:** Creating a `hello@` alias and choosing/creating the social profile are owner actions.
- **Options:** (a) keep krisztian@ everywhere; (b) create the hello@ alias and swap site-wide (Footer.astro, contact.astro, index.astro JSON-LD); (c) add the real social URL when a profile exists.
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
