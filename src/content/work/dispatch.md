---
# SAMPLE STUDY (Content-Decisions #3) — structural draft from the 2026-06
# design loop. Every number, sector, and quote below is ILLUSTRATIVE.
# Realize it: replace the facts with a real engagement's, then set
# sample: false and remove the slug from astro.config.mjs's sitemap filter.
title: Dispatch reports that build themselves
description: A Monday-morning spreadsheet ritual became an overnight pipeline — three systems reconciled and the summary in inboxes before the team logs on.
sector: Logistics · Freight
summary: A Monday-morning spreadsheet ritual became an overnight pipeline — three systems reconciled and the dispatch summary waiting in inboxes before the team logs on.
metric:
  value: '31'
  unit: hrs/wk
  caption: reclaimed from manual dispatch reporting
tint: sage
lede: A Monday-morning spreadsheet ritual, turned into an overnight pipeline.
timeline: 5 weeks to live
stack: [TMS, Sheets, Email]
stats:
  - { value: '31', unit: hrs/wk, label: reclaimed from the Monday rebuild }
  - { value: '6', unit: am, label: summary in inboxes before login }
  - { value: '0', label: manual exports or pasted cells }
quote:
  text: The report just arrives now. I'd forgotten Mondays didn't have to start with a spreadsheet.
  attribution: Operations lead · regional freight carrier
pubDate: 2026-06-12
draft: false
sample: true
---

## The bottleneck

Every Monday a dispatch lead lost the first hours of the week rebuilding the movement summary by hand — exporting from the TMS, pasting into a master sheet, reconciling it against the fuel log, and repairing the same broken formulas before anyone could use it. By the time it was ready, half the floor had already asked where it was.

## What we built

We replaced the ritual with an overnight job. It pulls straight from the TMS, reconciles each load against the fuel and driver logs, flags anything that doesn't tie out, and writes a clean, formatted summary to the shared sheet — then emails it to the distribution list before 6am. Nothing is exported or pasted by a person.

## The result

The Monday scramble is gone. The lead now opens the week with the report already done, and spends the reclaimed time on exceptions and customer calls — the part that actually needs a person.
