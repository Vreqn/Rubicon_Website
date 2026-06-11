# Rubicon Workflows — Design Brief for the Claude Design Loop

> **Purpose.** This is the hand-off pack for visual-design iteration (in Claude Design or any design tool). The site is already built, on-brand, deployable, and token-driven. Design work here is a **polish loop**, not a from-scratch design — push the visuals further *within the brand system*, one section/component at a time, and the output ports back into code as token edits and component changes.
>
> **The deal:** the brand is law, tokens are the single source of truth, and real-world facts (client names, metrics, bios) are never invented. Anything that violates those is rejected at port-time. Everything else is fair game.

---

## 1. What this is

Marketing site for **Rubicon Workflows** — a small, owner-led **Vancouver** automation consultancy. They find the manual tasks eating a team's hours (reports, data entry, system-to-system busywork) and automate them, inside the tools the client already uses, one bottleneck at a time. Audience: **owner-operators** of 15–200-person businesses (construction, manufacturing, strata management). They are a **teaching brand, not a competitive one** — educational, plainspoken, never salesy.

Built with **Astro 5** (static output, near-zero JS). Deploys to **rubiconworkflows.ca** via GitHub → Vercel.

---

## 2. The brand is law (non-negotiable)

### Palette — six colors, each with ONE job (never interchangeable)

| Token | Hex | Role |
|---|---|---|
| `--forest` | `#2E4B3C` | Hero brand color; **primary accent on light**; signature surface |
| `--sage` | `#7DA371` | **Accent on dark**; eyebrows, icons, mono accents |
| `--pine` | `#1A1D1B` | Dark surface bg; primary text on light (near-black, green-tinted) |
| `--slate` | `#6B6F62` | Muted text/dividers — **large/decorative only** (fails AA at body size) |
| `--honey` | `#B89B6E` | Small accent, mono details on dark — **NEVER a CTA** |
| `--bone` | `#F0EEE7` | Light surface bg; light text on dark (warm off-white) |

**Hard rules:** Honey is never a CTA. Sage is an accent, never body text. No color outside these six. No gradients-as-decoration (the only gradients in use are the hero scrim and a 1px divider fade).

### Typography

- **Space Grotesk** (400, 500) — everything: display, headings, body, nav, captions.
- **JetBrains Mono** (400) — three contexts ONLY: eyebrow labels (uppercase, tracked, accent-colored), inline code/filenames, and the signature `~` tilde flourish. Used sparingly so it stays special.
- Type scale (desktop): Display XL 56/60 · Display L 40/46 · H1 32/38 · H2 24/30 · H3 18/26 · Body L 18/30 · **Body M 16/26 (default)** · Body S 14/22 · Eyebrow 11/16 mono uppercase 0.1em · Inline mono 13/22 · Caption 12/18. Display tiers carry negative tracking (−0.015 to −0.025em).

### The signature pattern: hanging mono index

Numbered display lines get a JB Mono `01 /` marker hanging in the left margin (sage, ~30% of display size, ~64px outdent). Live on the homepage hero:
```
01 / Automate the routine.
02 / Focus on the results.
```
Collapses inline-above each line below 768px so it never collides on mobile. **Keep this** — it's the brand's most distinctive visual move. Use for numbered display moments; plain Display tier for un-numbered ones.

### Surfaces — the site is DARK-LED (~60–70% Pine)

| Surface | When | Accent leads |
|---|---|---|
| **Dark** (Pine bg) | impact, mood, attention — hero, case-studies canvas | **Sage** (Forest disappears on Pine) |
| **Light** (Bone bg) | reading, work — blog/case-study bodies, the contact form | **Forest** |
| **Forest** bg | rare "unmistakably us" signature moments | Sage |

Used in code via `data-surface="dark|light|forest"` — see §4.

### Voice (site copy only — code/commits are internal)

Plainspoken, confident-not-cocky, educational, **specific over generic**, warm but professional. "An experienced friend who happens to be an automation expert," not an enterprise vendor.
- **Use:** automate, workflow, bottleneck, manual, custom, fit, step, accuracy, time, find, build, work, partner.
- **Avoid:** leverage, synergize, robust, seamless, revolutionary, "AI-powered" (unless literally true and specific).

### What the brand REFUSES to look like

Generic SaaS/startup-template aesthetics · flashy tech-startup OR sleepy professional-services OR enterprise-vendor tone · AI buzzword decoration · literal Rubicon imagery (bridges, rivers, water) · pure abstract geometry with no character.

---

## 3. The single source of truth: `src/styles/tokens.css`

Every color, type size, spacing value, radius, and motion value is a CSS custom property in [tokens.css](src/styles/tokens.css). **A raw hex or font name in a component is a bug.** Structure:

1. **Raw palette** — the six hex values (the only place hex appears).
2. **Derived colors** — `--sage-tint-13` (icon containers), `--text-muted-on-dark/light` (AA-safe muted text), `--scrim-pine` (hero legibility).
3. **Type scale** — `--text-*` / `--lh-*` / `--track-*` triplets per tier; display tiers use `clamp()` for mobile.
4. **Spacing** — 4px base (`--space-1`…`--space-32`), `--section-pad`, `--index-outdent`.
5. **Layout** — `--container-max` (72rem), `--container-prose` (42rem), `--container-pad`.
6. **Radii** — `--radius-sm/md/lg/full` (md = 10px, matches the brand icon-container spec).
7. **Motion/focus/z** — `--ease`, `--dur-*`, `--dur-fade` (hero), focus ring.
8. **Surface role tokens** — `[data-surface="…"]` sets `--bg / --fg / --accent / --accent-text / --accent-2 / --muted / --line / --cta-bg / --cta-fg`.

**Why this matters for design:** because components consume *role tokens*, a palette tweak, a spacing-rhythm change, or a new radius is a **one-file edit** that updates everywhere consistently. Design proposals should be expressible as token changes wherever possible.

### Contrast — verified, must stay AA

Pine/Bone 14.6:1 · Forest-on-Bone 8.3:1 · Sage-on-Pine 5.9:1 · Honey-on-Pine 6.4:1 (all pass). **Sage-on-Bone 2.5:1 and Honey-on-Bone 2.3:1 are decorative ONLY.** Slate fails AA at body size on both surfaces. Readable accent text uses `--accent-text` (Sage on dark, Forest on light, Bone on forest) — never raw Sage on light/forest. Any design that puts text on a new color pairing must be checked against AA before it ships.

---

## 4. Component & page inventory

### Components (`src/components/`)
| Component | Role | Surfaces |
|---|---|---|
| `Seo.astro` | head: title pattern, canonical, OG/Twitter, JSON-LD | — |
| `Header.astro` | mark + "Rubicon Workflows" (Space Grotesk); nav; mobile menu. **Always dark.** | dark |
| `Footer.astro` | nav, `~` tilde flourish, email, social handle. **Always dark.** | dark |
| `Logo.astro` | R mark, colorway auto by surface (`--accent`) | all |
| `Button.astro` | primary (`--cta-bg/fg`) / secondary (outline). Honey can't be a CTA. | all |
| `Eyebrow.astro` | mono kicker, `~` prefix, `--accent-text` | all |
| `DisplayIndex.astro` | the hanging mono index | all |
| `Section.astro` | `<section data-surface>` + container; unit of the dark/light rhythm | all |
| `SectionHeader.astro` | eyebrow + heading + lede | all |
| `Icon.astro` | brand icon set (2px/1.5px sage strokes, round; feature variant in 10px sage-tint container) | all |
| `CaseStudyCard.astro` | case-study card (dark canvas) | dark |
| `PostCard.astro` | blog index card | light |
| `PillarsTicker.astro` | CSS marquee of the four pillars (honest replacement for fake-logo marquees) | dark |
| `HeroVideo.astro` | the hero bg video island (see §5) | dark |
| `ContactForm.astro` | native POST → Formspree; disabled until endpoint set | light |
| `Todo.astro` | visible placeholder badge for pending real content | all |

### Pages & surface rhythm (screenshots in `docs/design-brief-shots/`, 3 viewports each)
- **`/` Home** — dark video hero (hanging index + one-liner + CTA + pillars ticker) → dark four-pillars (icon cards) → dark case-studies (honest empty state) → **Forest CTA band** (the one signature moment).
- **`/services`** — dark intro → light body: "How we approach every engagement" (4 pillars) + "What we build" (5 capability cards).
- **`/work` (Case Studies)** — dark card grid; honest empty state until a real study lands.
- **`/about`** — **Forest hero** → light body (what we do / who we work with / AI stance / who's behind it).
- **`/contact`** — dark intro → light form + sidebar (email, handle).
- **`/blog`** — built but **hidden from nav** (launch later). Light list + light post template.
- **`/404`**, **`/contact/thanks`** — dark, mono `~` treatment.

---

## 5. The hero video (live)

`public/video/hero.mp4` (2.39 MB, 1920×1080, muted, no audio) + `hero-poster.jpg`. JS island: starts at opacity 0 → 0.5s fade-in → caps at **0.5 opacity** so Pine dominates → 0.5s fade-out near end → resets and loops. `prefers-reduced-motion` shows the poster, never plays. A Pine **scrim** (heavier behind the text block, fading toward the video) guarantees Bone text stays AA over any frame. **Design within these constraints:** the video is a *mood layer*, not the focal point — text legibility and the 0.5 opacity cap are load-bearing.

---

## 6. Quality gates every design change must still pass

Run before calling anything done (paste real output):
1. `npx astro check` — clean. 2. `npx astro build` — clean. 3. Links — no breaks (linkinator). 4. **A11y** — alt text, one h1/page, no skipped heading levels, visible focus, **AA contrast on every text/surface pairing**. 5. **Lighthouse** — Perf ≥95, A11y ≥95, SEO 100 (currently 100/100/100). 6. **Responsive** — 375/768/1280, no overflow, hanging index doesn't collide. Helper: `node scripts/screenshot.mjs <url> <outDir> <name>` reports horizontal overflow per viewport. 7. Contact form — exercised once a real endpoint exists.

---

## 7. How to run the design loop

1. **Pick a target** — one section or component at a time (e.g. "the homepage hero composition", "the four-pillar cards", "section-to-section transitions"). Whole-page redesigns are harder to port and review.
2. **Feed Claude Design:** this brief + `tokens.css` (verbatim) + the relevant screenshot(s) from `docs/design-brief-shots/` + the live preview URL once deployed.
3. **Generate options** within the brand system. Good directions to explore: a more deliberate hero composition; spacing/rhythm refinement; hover/focus micro-states; how the hanging-mono-index scales; treatment of the Forest signature surface; the case-study card and empty state; iconography polish.
4. **Port back to code:**
   - Translate any raw values into **existing tokens**; only add a new token when it's a genuinely new decision (then it lives in `tokens.css`, never inline).
   - **Reject at port-time** anything that breaks brand law: gradients-as-decoration, off-palette colors, new fonts, Honey CTAs, Sage body text, AA failures, invented copy/stats.
   - Land it as a normal commit through the quality gates in §6.
5. **The site stays shippable throughout** — every change is incremental and verified.

### Run locally
```
npm install
npm run dev       # localhost:4321
npm run build && npm run preview
```

---

## 8. Out of scope for the design loop (don't invent)

Client names, logos, testimonials, project metrics, the team bios, pricing — these are real-world facts in `Content-Decisions.md`, supplied by Krisztian, not designed in. Use the `Todo` badge / honest empty states already in place. The wordmark lockup is also pending a brand decision (Content-Decisions #6) — don't fabricate a custom wordmark; the mark + Space Grotesk text is the current treatment.
