# Kiva Design Tokens — Sync (Human Guide)

This skill lets an AI agent refresh the local Kiva design token snapshot after you've exported fresh variables from Figma.

## When to sync

- Variables in Figma have changed (new tokens, renamed tokens, value updates, new modes)
- You want the local snapshot up to date before starting work

## How to sync

1. In Figma, open the design system file and use **Export Variables** → save the output folder somewhere accessible.
2. Ask your AI agent: *"sync figma tokens"* (or similar). The agent will load this skill and follow `procedure.md`.
3. Tell the agent where the export folder is.
4. The agent stages the files, runs the normalizer, and produces a `git diff`.
5. Review the diff. If it looks right, commit.

## What changes on a sync

- `skills/kiva-design-tokens/references/raw/` — replaced with fresh export contents
- `skills/kiva-design-tokens/references/raw/MANIFEST.md` — updated with export date and notes
- `skills/kiva-design-tokens/references/tokens/*.json` — regenerated
- `skills/kiva-design-tokens/references/catalog.md` — regenerated

## What the normalizer does not do

- It doesn't call Figma. The export folder is the only input.
- It doesn't decide which tokens are "good" or "deprecated". Old collections aliased from within the export are preserved as-is; humans decide what to do about them.
