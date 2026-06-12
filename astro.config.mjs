// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sample case studies (sample: true in frontmatter) are noindexed AND kept
// out of the sitemap — fabricated numbers must not enter the index under the
// brand's name. Remove a slug here when its study is realized with real
// facts (Content-Decisions #3).
const SAMPLE_STUDY_PATHS = [
  'https://rubiconworkflows.ca/work/dispatch/',
  'https://rubiconworkflows.ca/work/intake/',
  'https://rubiconworkflows.ca/work/reconcile/',
];

// https://astro.build/config
export default defineConfig({
  site: 'https://rubiconworkflows.ca',
  integrations: [
    sitemap({
      filter: (page) => !SAMPLE_STUDY_PATHS.includes(page),
    }),
  ],
});
