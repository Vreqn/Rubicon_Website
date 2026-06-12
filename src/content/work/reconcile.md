---
# SAMPLE STUDY (Content-Decisions #3) — structural draft from the 2026-06
# design loop. Every number, sector, and quote below is ILLUSTRATIVE.
# Realize it: replace the facts with a real engagement's, then set
# sample: false and remove the slug from astro.config.mjs's sitemap filter.
title: A reconciliation that runs overnight
description: The close pulls straight from the ledger, reconciles itself, and surfaces only the exceptions a person needs to judge — done before anyone arrives.
sector: Finance · Month-end
summary: The close now pulls straight from the ledger, reconciles itself, and surfaces only the exceptions a person actually needs to judge — ready before anyone arrives.
metric:
  value: '20'
  unit: min
  caption: to close the books — down from three full days
tint: forest
lede: A three-day month-end close, compressed into twenty minutes of review.
timeline: 6 weeks to live
stack: [ERP, Ledger, Bank feed]
stats:
  - { value: '20', unit: min, label: 'to close, from three full days' }
  - { value: '95', unit: '%', label: 'auto-reconciled, no review' }
  - { value: '1', label: 'review queue, zero spreadsheets' }
quote:
  text: I get the exceptions and nothing else. The close is finished before I've had coffee.
  attribution: Financial controller · mid-market manufacturer
pubDate: 2026-06-10
draft: false
sample: true
---

## The bottleneck

Closing the books meant three full days of exporting ledgers, matching them line by line against the ERP and the bank feed across a sprawl of spreadsheets, and chasing the handful of entries that didn't agree. It happened under deadline every month, and the errors that slipped through were the expensive kind.

## What we built

We built a close that runs itself. Overnight it pulls the ledger, the ERP, and the bank feed, reconciles them against each other, and surfaces only the exceptions — the entries that genuinely need a human decision — in a clean review queue. The matched majority never reaches a person.

## The result

Month-end went from a dreaded three-day sprint to twenty minutes of judgment on the exceptions that matter. The close is done before the team arrives, and it's right the same way every time.
