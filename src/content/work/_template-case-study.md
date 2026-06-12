---
# TEMPLATE — copy to <slug>.md. Files starting with _ are ignored by the
# collection loader. Facts (metrics, sector, quote) are REAL ONLY — never
# invented (Content-Decisions #3).
title: '[TODO: study title]'
description: '[TODO: meta description, max 160 chars]'
sector: '[TODO: e.g. Logistics · Freight]'
summary: '[TODO: one-paragraph card summary]'
metric:
  value: '[TODO]'
  unit: '[TODO — delete this line if the number has no unit]'
  caption: '[TODO: what the headline number means]'
tint: sage # sage | honey | forest — cycle accents across the grid
lede: '[TODO: one line under the title in the reader]'
timeline: '[TODO: e.g. 5 weeks to live]'
stack: ['[TODO]', '[TODO]']
stats:
  - { value: '[TODO]', unit: '[TODO]', label: '[TODO]' }
quote:
  text: '[TODO: real quote only — delete the whole quote block if none]'
  attribution: '[TODO: role · anonymized client descriptor]'
pubDate: 2026-01-01
draft: true # stays true until facts are confirmed and Krisztian approves
sample: false
---

<!-- TEMPLATE — demonstrates the study layout in dev. Everything here is a
     placeholder. This file must never ship with draft: false. -->

## The bottleneck

[TODO: what manual process was eating time, who it affected, what it cost.]

## What we built

[TODO: the automation, in plain language. Name the systems it works inside.
If it uses AI, say exactly how ("uses an LLM to summarize the document") —
otherwise describe the deterministic logic plainly.]

## The result

[TODO: closing paragraph — the stats row renders from frontmatter above.
Specific, verified outcomes. Numbers only if real.]
