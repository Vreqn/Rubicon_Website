---
# SAMPLE STUDY (Content-Decisions #3) — structural draft from the 2026-06
# design loop. Every number, sector, and quote below is ILLUSTRATIVE.
# Realize it: replace the facts with a real engagement's, then set
# sample: false and remove the slug from astro.config.mjs's sitemap filter.
title: Patient intake that files itself
description: Forms validate and route to the right coordinator the moment they arrive — no shared-inbox triage, no request waiting to be filed by hand.
sector: Healthcare · Clinics
summary: Forms now validate and route to the right coordinator the moment they arrive — no shared-inbox triage, no request sitting in a queue waiting to be filed by hand.
metric:
  value: '9,400'
  unit: forms/yr
  caption: sorted and routed without a human touch
tint: honey
lede: A shared inbox of forms, turned into instant, accurate routing.
timeline: 7 weeks to live
stack: [Intake forms, EHR, Shared inbox]
stats:
  - { value: '9,400', unit: /yr, label: forms handled hands-free }
  - { value: '<2', unit: min, label: 'to route, from a day or more' }
  - { value: '0', label: requests lost in the inbox }
quote:
  text: We used to dread Monday's inbox. Now it's empty by the time we sit down.
  attribution: Practice manager · multi-site clinic group
pubDate: 2026-06-11
draft: false
sample: true
---

## The bottleneck

New-patient forms landed in a shared inbox at all hours. A coordinator opened each one, checked it for missing fields, decided which clinic and which person it belonged to, and filed it by hand. On a busy week, thousands of forms meant requests sat for a day or more before anyone touched them.

## What we built

We put a layer in front of the inbox. The moment a form arrives it's validated for completeness, matched to the right clinic and coordinator, and written into the EHR with the correct tags. Incomplete ones bounce back automatically with a note on what's missing, so a person only ever sees a genuine exception.

## The result

Intake stopped being a queue. Coordinators spend their time with patients instead of triaging a mailbox, and nothing slips, because no form waits on a human to file it.
