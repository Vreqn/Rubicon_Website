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
| `Content-Decisions.md` | Real-world facts & brand forks awaiting Krisztian — **check before inventing any content** |
| `ReleaseNotes.txt` | Running change log |

## Deploy

Push to `main` → Vercel builds and deploys automatically. Production domain: **rubiconworkflows.ca** (`.com` forwards to `.ca`). Preview deploys per branch/PR.

Secrets (form endpoint, analytics) live in Vercel environment variables — never in the repo.

## Drop-in contracts

- **Hero video:** place the file at `public/video/hero.mp4` (optional poster: `public/video/hero-poster.jpg`), commit, push. The hero detects it at build time; nothing else changes. Until then a static treatment renders.
- **Logo SVGs:** five colorways (forest, pine, sage, bone, honey) live at `src/assets/logo-*.svg`. If they need re-exporting, source is `Rubicon_Logo.ai` (kept out of git — 21 MB).
- **Contact form:** set `PUBLIC_FORMSPREE_ENDPOINT` in Vercel (and a local `.env` for testing). The form renders disabled with a TODO badge until the endpoint exists.
