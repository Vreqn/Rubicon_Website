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
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    sector: z.enum(['construction', 'manufacturing', 'strata-management', 'other']),
    /** Anonymized client descriptor — real facts only, never invented. */
    clientLabel: z.string().optional(),
    services: z.array(z.string()).default([]),
    /** Real, verified metrics only (Content-Decisions.md #3). */
    outcomes: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    pubDate: z.coerce.date(),
    /**
     * Case studies are draft-by-default: a study only ships when someone
     * deliberately sets draft: false after the facts are confirmed.
     */
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog, work };
