# Agent Instructions — Rubicon Workflows Website

You're building the **Rubicon Workflows marketing website**. This is a *build-time* job: you write source that compiles to a static site. There's no live system to orchestrate, no runtime decisions, no LLM in any production path. The output is HTML, CSS, and a sliver of JS — fast, accessible, and unmistakably on-brand.

Two things govern everything you do here: **the brand is law**, and **content facts aren't yours to invent**. The rest of this file is how those two rules play out.

## Working agreement

- Ask when scope is ambiguous instead of guessing. A wrong guess on a shared component or a page's copy costs more than a question.
- Push back and flag risks. Honest assessment over agreement.
- Be concise. This is internal dev work — plain technical language, no ceremony.
- **Two audiences, never confused:** *site copy* is client-facing and must follow brand voice (plain language for non-technical owner-operators). *Code, commits, dev notes, this file* are internal. If you're unsure which a given output is, ask.

## The stack

- **Framework:** Astro. Content (blog, case studies) as Markdown content collections. Components in `.astro`. Ships ~zero JS by default — add interactivity as islands only where genuinely needed.
- **Styling:** CSS custom properties as the single source of truth (see *Design tokens*). If Tailwind is added later, its config must *read from* the tokens, never duplicate hex/sizes.
- **Pipeline:** Claude Code in VS Code → commit → push to GitHub → Vercel rebuilds and deploys automatically. Production domain: **rubiconworkflows.ca** (.com forwards to .ca).
- **Forms:** contact form posts to a third-party service (Formspree or a Vercel-native form handler). No backend, no database, no auth, no CMS dashboard. Content is authored as Markdown in the repo.

Don't reach for a heavier tool than the site needs. A teaching brand's marketing site is content + components + a contact form. If a request seems to need a server, a database, or a login, that's a scope change — stop and raise it, don't build it.

## File structure

```
src/
  components/        # reusable .astro (Header, Footer, Button, Eyebrow, CaseStudyCard, etc.)
  layouts/           # page shells (BaseLayout, BlogPost, CaseStudy)
  pages/             # routes — index, about, services, contact
    blog/            # index + [slug].astro
    work/            # case-study index + [slug].astro
  content/
    blog/            # *.md posts
    work/            # *.md case studies
    config.ts        # collection schemas (Zod) — enforce required frontmatter
  styles/
    tokens.css       # ← SINGLE SOURCE OF TRUTH: color, type, spacing
    global.css
  assets/            # logo SVGs (5 colorways), images
public/              # favicon, robots.txt, sitemap, static files
astro.config.mjs
CLAUDE.md            # this file
Content-Decisions.md # real-world facts & brand forks awaiting Krisztian (see below)
ReleaseNotes.txt     # running log of changes — keep this current, not this file
```

Treat this file as the operator's manual, not a changelog. Log changes in `ReleaseNotes.txt`.

---

## The brand is law

The Brand Guidelines doc is the canonical reference. The rules below are the *enforced subset* — the things you must not get wrong. When the guidelines and this file agree, follow them. When something isn't covered, it's a brand decision (see *Content vs code*).

### Design tokens — single source of truth

Every color, type size, and spacing value lives in `src/styles/tokens.css` as a CSS custom property. **Never hardcode a hex value or font name in a component.** A raw `#2E4B3C` in a template is a bug — fix it to `var(--forest)`. This is what makes the surface system and any future palette tweak a one-file change instead of a hunt.

```css
:root {
  --forest: #2E4B3C;  /* hero brand color; primary accent on light */
  --sage:   #7DA371;  /* accent on dark; eyebrows, icons, mono accents */
  --pine:   #1A1D1B;  /* dark surface bg; primary text on light (near-black, green-tinted) */
  --slate:  #6B6F62;  /* muted text, captions, dividers */
  --honey:  #B89B6E;  /* small accent; mono details on dark; NEVER a primary CTA */
  --bone:   #F0EEE7;  /* light surface bg; light text on dark (warm off-white) */

  --font-sans: "Space Grotesk", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

Colors are **not interchangeable** — each has one job. Honey is never a CTA. Sage is an accent, not body text.

### Surfaces

The brand is **dark-led**: roughly 60–70% dark, with strategic light sections. Pick a surface by what the moment needs to do.

- **Dark (Pine bg)** — impact, mood, attention. Hero, "our work" section, social/marketing moments. On dark, **Sage leads** as the accent (Forest disappears against Pine); Honey shows up in mono details.
- **Light (Bone bg)** — content, readability, work. **Blog posts, case-study detail pages**, anything long-form or print-bound. On light, **Forest leads** as the accent.
- **Forest bg** — the signature surface. Use sparingly for "this is unmistakably us" moments. Overused it's wallpaper.

### Typography

- **Space Grotesk** (400, 500) — all display, headings, body, captions, nav.
- **JetBrains Mono** (400) — three contexts *only*: eyebrow labels (uppercase, tracked, sage), inline code/filenames/technical strings, and the brand-signature `~` tilde flourish. Used sparingly so it stays special.

Hierarchy (size / line-height): Display XL 56/60 · Display L 40/46 · H1 32/38 · H2 24/30 · H3 18/26 · Body L 18/30 · **Body M 16/26 (default)** · Body S 14/22 · Eyebrow 11/16 mono uppercase 0.1em · Inline mono 13/22 · Caption 12/18. Display tiers carry negative tracking (−0.015 to −0.025em).

**Hanging mono index** — the signature display pattern. Numbered display lines get a mono `01 /` marker hanging in the left margin (sage, ~30% of display size, ~64px outdent):

```
01 / Automate the routine.
02 / Focus on the results.
```

Use it for display moments with a numbered structure. For display without numbering, use the plain Display tier — don't force the marker.

### Voice (site copy only)

Plainspoken, confident-not-cocky, educational-not-salesy, specific over generic, warm but professional. Write like an experienced friend who happens to be an automation expert — not an enterprise vendor.

- **Use:** automate, workflow, bottleneck, manual, custom, fit, step, accuracy, time, find, build, work, partner.
- **Avoid:** leverage, synergize, robust, solution-oriented, holistic, enterprise-grade, seamless, revolutionary, disrupt, "AI-powered."
- **Specific beats generic, always.** "Saved a roadworks estimator ~6 hours a week comparing quote PDFs" beats "significant time savings." (But: never *invent* such a number — see *Content vs code*.)
- **On AI:** say "uses AI" only when it literally does, and be specific ("uses an LLM to summarize the document"). Most of the work is deterministic code — say so plainly. Never use "AI-powered / AI-driven / intelligent automation" as decoration.

### Iconography & logo

- Icons: mixed-weight rounded — 2px stroke outer, 1.5px inner, sage by default, round caps/joins, no fill. Feature variant sits in a 10px rounded square with sage at ~13% opacity. One icon, one color.
- Logo: the custom "R" mark exists in five colorways (Forest, Pine, Sage, Bone, Honey) as SVGs. Forest leads on light, Sage on dark. Min 16px (favicon); clear space ≥ half the mark's height; don't recolor, stretch, rotate, or add effects.
- **The wordmark and full lockups are NOT finalized** (brand doc is at v0.2). Do not fabricate a wordmark lockup. If a layout needs one, that's a Content-Decisions entry — use the mark + a Space Grotesk text treatment as a clearly-labeled placeholder and flag it.

---

## Content vs code — when to defer to `Content-Decisions.md`

Some questions aren't build questions. They depend on **real-world facts or brand judgment that only Krisztian (and Attila/clients) hold** — and you must not invent an answer and ship it.

When you hit one, add an entry to `Content-Decisions.md` with: **Issue** (what's undecided, with file paths), **Why it's not yours to decide** (what real fact or preference it depends on), **Options** (concrete alternatives + implications), **Decision** (left blank).

**Defer (never fabricate):**
- Client names, logos, testimonials, quotes
- Project metrics and outcomes ("saved 6 hrs/week", "%" improvements)
- The actual services list, pricing, team bios, contact details
- Whether a specific automation "uses AI" (a factual claim about a real build)
- Brand forks the guidelines don't settle (which surface a new page type uses; the pending wordmark)

**Just do it (clear build or clear brand-rule application):**
- Hardcoded `#2E4B3C` → `var(--forest)`
- Eyebrow rendered in Space Grotesk instead of JB Mono → fix
- `<h2>` before the page's `<h1>`, or a skipped heading level → fix
- Missing alt text, missing focus state, non-encoded URL → fix

Rule of thumb: if two people who both know the brand could disagree because the answer depends on a real fact or operator preference, it's a Content-Decisions entry. If a competent reviewer would call it a bug or a plain brand-rule violation in 30 seconds, just fix it. **Placeholder copy and invented stats are the #1 thing to avoid — better an obvious `[TODO: real metric]` than a plausible fabrication that ships.**

---

## Blast radius — fix everywhere, out loud

When you fix something, find **every** place the same class of issue lives — other components sharing the helper, every page using the layout, every caller of the token — and in the *same change* either fix them too or **state why each is unaffected.** End every fix with a short "here's everywhere else this could live, and what I found."

This is sharper on a component-based site than anywhere: a spacing bug in `Button` is a bug in every button; a wrong token in `Header` is wrong on every page. Don't patch the one spot named and leave siblings to surface later. Equally, don't "fix" a structurally different component that isn't actually affected — say why it's safe instead.

---

## Quality gates — show the output

A marketing site doesn't need unit tests on everything; over-testing a brochure is its own waste. The gates that matter are build, accessibility, performance, links, and responsiveness. Before you call any change done — or answer "is it ready?" — run the relevant checks and **paste the actual command output.** "Looks good" is not done.

Run and show:

1. **`astro build`** — clean, no errors or warnings.
2. **`astro check`** — type/content-schema check passes.
3. **Links** — no broken internal or external links.
4. **Accessibility** — every image has alt text; one `<h1>` per page, no skipped heading levels; keyboard-navigable; visible focus states; **contrast verified** (see below).
5. **Performance (Lighthouse)** — target Perf ≥ 95, A11y ≥ 95, SEO 100 on a static Astro build. Flag and explain anything below.
6. **Responsive** — check ~375px (mobile), ~768px (tablet), ~1280px (desktop): no overflow, type scales, the hanging-mono index doesn't collide on narrow screens.
7. **Contact form** — actually exercise the submit path (Playwright or a manual run) before claiming it works. Don't assume a form posts.

**Contrast is not optional and not assumable.** Verify every text/surface pairing against WCAG AA — trace the actual values, don't eyeball it:
- Body text must be Pine-on-Bone or Bone-on-Pine. Both pass comfortably.
- Forest-on-Bone passes for text. **Sage-on-Bone and Honey-on-Bone do not** — those are decorative/accent only, never body copy.
- Sage-on-Pine and Honey-on-Pine pass for accents. Confirm anyway when you use them at small sizes.

If a check fails, you're not done: show the failure, fix it, rerun, paste the green result.

---

## SEO discipline

The name collides with several larger companies — disambiguation is the whole game.

- **Always "Rubicon Workflows"** (two words) in `<title>`, meta descriptions, `<h1>`s, and any searchable text. "Rubicon" alone only in established body copy.
- Pair with **"Vancouver"** and **"automation"** in metadata.
- Title pattern: `Rubicon Workflows | Custom Automation for Vancouver Businesses`.
- Every page: unique title + meta description, canonical URL, Open Graph + Twitter tags, semantic headings.
- Ship `sitemap.xml` and `robots.txt`. Add `LocalBusiness`/`Organization` structured data (JSON-LD) with the real name, locality (Vancouver), and URL.

---

## Deployment & secrets

- Push to GitHub triggers a Vercel build. Vercel preview deploys per branch/PR; production tracks the main branch.
- **Never commit secrets.** Form-service keys, analytics IDs, etc. live in Vercel's environment variables, not the repo. No `.env` in git.
- Don't change DNS, domain config, Vercel project settings, or access controls yourself — those are Krisztian's to do. If something needs one, say so.

---

## Self-improvement loop

Every snag makes the system better: identify what broke → fix the component/token → verify → if it was a recurring pattern, encode the fix (a shared component, a token, a lint rule, a note in this file *after asking*) → move on more robust. Don't overwrite this file or invent new conventions without checking first — refine, don't churn.

## What we are NOT

The brand defines itself partly by what it refuses to look like. Don't drift toward:
- Generic SaaS / startup-template aesthetics
- Flashy tech-startup *or* sleepy professional-services *or* enterprise-vendor tone
- AI buzzword decoration
- Overly literal Rubicon imagery (bridges, rivers, water)
- Pure abstract geometry with no character, or pure-typographic treatment with no mark

## Bottom line

You build a fast, accessible, dark-led static site that makes an owner-operator think "they get my problem." The brand is law; tokens are the single source of truth; real-world facts go to `Content-Decisions.md`, not into your imagination; every fix surveys its blast radius; every "done" comes with pasted output. Stay pragmatic, stay on-brand, keep the build green.

Always ask when you're unsure.