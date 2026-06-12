// Content collection schemas. NOTE: this file deliberately lives at
// src/content/config.ts (CLAUDE.md-mandated). Astro 5 supports this path;
// Astro 6 requires src/content.config.ts — see ReleaseNotes 2026-06-10
// before "fixing" the deprecation notice.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160), // doubles as the meta description
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  // 2026-06 design port: schema matches the study card + reader structure.
  // The narrative lives in the markdown body as "## The bottleneck /
  // ## What we built / ## The result" sections — the most owner-editable form.
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    /** Display string, e.g. "Logistics · Freight". */
    sector: z.string(),
    /** Card body line under the title. */
    summary: z.string(),
    /** Banner headline metric. Real, verified numbers only (CD #3). */
    metric: z.object({
      value: z.string(),
      unit: z.string().optional(),
      caption: z.string(),
    }),
    /** Banner accent — cycles the brand accents across the grid. */
    tint: z.enum(['sage', 'honey', 'forest']).default('sage'),
    /** Reader lede (one line under the title in the detail view). */
    lede: z.string().optional(),
    timeline: z.string().optional(),
    stack: z.array(z.string()).default([]),
    /** "The result" stat row (max 3). */
    stats: z
      .array(
        z.object({ value: z.string(), unit: z.string().optional(), label: z.string() })
      )
      .max(3)
      .default([]),
    quote: z.object({ text: z.string(), attribution: z.string() }).optional(),
    pubDate: z.coerce.date(),
    /**
     * Case studies are draft-by-default: a study only ships when someone
     * deliberately sets draft: false after the facts are confirmed.
     */
    draft: z.boolean().default(true),
    /**
     * Mock content awaiting realization (Content-Decisions #3): renders with
     * a visible "sample data" badge, noindex, and sitemap exclusion. Edit the
     * facts to real numbers, then flip to false.
     */
    sample: z.boolean().default(false),
  }),
});

export const collections = { blog, work };
