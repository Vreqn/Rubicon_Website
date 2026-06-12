# Rubicon Workflows — Marketing Website

Static marketing site for [Rubicon Workflows](https://rubiconworkflows.ca), a Vancouver automation consultancy. Built with Astro; ships as plain HTML/CSS with a single small JS island (the hero video). No backend, no database, no CMS — content is Markdown in the repo.

## Stack

- **[Astro 5](https://astro.build)** (pinned `^5.18.2` — see `ReleaseNotes.txt` for why not v6)
- **Content collections** — blog posts and case studies as Markdown in `src/content/`, schemas enforced by Zod in `src/content/config.ts`
- **CSS custom properties** — `src/styles/tokens.css` is the single source of truth for every color, type size, and spacing value. No hardcoded hex values or font names in components, ever.
- **Fonts** — Space Grotesk (400/500) + JetBrains Mono (400), self-hosted via Fontsource

## Develop

```sh
npm install
npm run dev        # dev server at localhost:4321
npm run build      # production build to dist/
npm run preview    # serve the production build
npm run check      # type + content-schema check
npm run verify     # check + build
```

## Where things live

| Path | What |
|---|---|
| `src/styles/tokens.css` | **Single source of truth** — palette, type scale, spacing, surface system |
| `src/components/` | Reusable `.astro` components |
| `src/layouts/` | Page shells (BaseLayout, BlogPost, CaseStudy) |
| `src/pages/` | Routes |
| `src/content/blog/`, `src/content/work/` | Markdown content (posts, case studies) |
| `CLAUDE.md` | Operator's manual for agents working on this repo |
| `DESIGN-BRIEF.md` | Hand-off pack for the Claude Design / visual-polish loop |
| `docs/design-brief-shots/` | Current-state screenshots of every page (375/768/1280) |
| `Content-Decisions.md` | Real-world facts & brand forks awaiting Krisztian — **check before inventing any content** |
| `ReleaseNotes.txt` | Running change log |

> **Blog is built but hidden** — `/blog` pages still render, but Blog is removed from the nav, footer, and homepage. Re-add the nav entries in `Header.astro` / `Footer.astro` to launch it. Nav order: Services · Case Studies · About · Contact (the `/work/` route is labelled "Case Studies" in the UI).

## Deploy

Push to `main` → Vercel builds and deploys automatically. Production domain: **rubiconworkflows.ca** (`.com` forwards to `.ca`). Preview deploys per branch/PR.

Secrets (form endpoint, analytics) live in Vercel environment variables — never in the repo.

## Drop-in contracts

- **Hero video:** lives at `public/video/hero.mp4` (+ poster `hero-poster.jpg`) and the hero auto-detects it at build time. To swap in a new cut, drop the file there, commit, push — nothing else changes. **Compress before committing** (a hero background should be ~2–5 MB): `ffmpeg -i <new>.mp4 -an -c:v libx264 -crf 28 -preset slow -movflags +faststart public/video/hero.mp4`. Heavy source masters go in `_assets-source/` (gitignored), not the repo.
- **Logo SVGs:** five colorways (forest, pine, sage, bone, honey) live at `src/assets/logo-*.svg`, plus `public/favicon.svg` and PNG fallbacks. Extracted from `Rubicon_Logo.ai` (kept out of git — 21 MB).
- **Contact form:** set `PUBLIC_FORMSPREE_ENDPOINT` in Vercel (and a local `.env` for testing). The form renders disabled with a TODO badge until the endpoint exists.
- **Design drops:** drop a whole zip from Claude Design (or another project) into `docs/design/inbox/` and tell Claude to "process the inbox". It extracts, proposes a file-by-file mapping (flagging anything brand- or content-sensitive), places everything properly, then clears the staging area. The inbox is git-ignored except its `README.md`. See [`docs/design/inbox/README.md`](docs/design/inbox/README.md).

## Helper scripts (`scripts/`)

- `screenshot.mjs <url> <outDir> <name>` — full-page captures at 375/768/1280 with horizontal-overflow check; auto-scrolls first so scroll reveals and lazy background videos are in their final state.
- `interaction-checks.mjs` — keyboard focus order, mobile menu toggle, contact-form disabled state.
- `video-aa-check.mjs <url> [--video=N] "<selector>|<large|normal>" […]` — WCAG AA gate for text over background video: samples the rendered composite at worst-case frames and reports the worst contrast ratio per selector. `--video=N` targets a below-fold section ambient.
- `reader-check.mjs [base]` — case-study reader interaction gate (open/close paths, focus trap, scroll lock, deep links, reduced motion).

All use `playwright-core` against the installed Chrome (no browser download).
