# Inbox — design-drop staging area

Drop zips (or loose files) here when something comes back from **Claude Design** or another
project. This is a **staging area**, not a permanent home — files here are git-ignored and get
sorted into the repo, then cleared out.

## Why a whole-zip drop

Claude Design exports are easier to hand over as the **entire zip** than cherry-picked files —
that way the agent reading them has context for everything at once. So drop the whole thing here
and let the sort step figure out where each piece belongs.

## How it works

1. **You drop** a `.zip` (or loose files) into this folder.
2. **You tell Claude** in chat — e.g. *"I dropped a new zip"* or *"process the inbox"*.
3. **Claude extracts** the zip in place, reads everything for context, then **deletes the zip**.
4. **Claude proposes a mapping table** — every file → its destination, with reasons — and
   **flags** anything ambiguous or anything that touches **brand law** (off-palette colors, new
   fonts, Honey CTAs, AA failures) or **real-world content** (client names, logos, metrics, bios
   — these are `Content-Decisions.md` territory, never invented or auto-placed).
5. **You approve** the mapping (or adjust it).
6. **Claude places** everything properly:
   - design/token changes flow through `src/styles/tokens.css` (never inline hex) per the
     port-back rules in [`DESIGN-BRIEF.md`](../../../DESIGN-BRIEF.md);
   - assets → `src/assets/` or `public/`; screenshots/comps → `docs/`;
   - code changes run the quality gates before being called done.
7. **Claude clears the inbox** — deletes the extracted working files. This `README.md` stays.

## The one guardrail

**Nothing is committed straight from the inbox.** Files only enter the repo *after* they've been
placed properly — tokenized, on-brand, gates green. The inbox itself is transient and never
tracked in git (only this README is).
