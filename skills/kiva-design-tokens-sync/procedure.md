# Kiva Design Tokens — Sync Procedure

Follow these steps in order. Do not skip verification.

## 1. Confirm export location

Ask the human for the path to the Figma variables export folder (or confirm one at a conventional location). The folder contains `.tokens.json` files and subdirectories, one per collection.

## 2. Stage raw files

Replace the previous snapshot in `skills/kiva-design-tokens/references/raw/`:

```bash
rm -rf skills/kiva-design-tokens/references/raw/*
cp -R "<export-folder>"/* skills/kiva-design-tokens/references/raw/
find skills/kiva-design-tokens/references/raw -name .DS_Store -delete
```

List the result to confirm structure was preserved.

## 3. Update MANIFEST.md

Rewrite `skills/kiva-design-tokens/references/raw/MANIFEST.md` with:
- Export date (from the human or today's date)
- Figma file key (from the human — the export itself doesn't carry it)
- List of collections and their modes (read from the directory structure)
- Any notes the designer provided

## 4. Run the normalizer

```bash
nvm use
node skills/kiva-design-tokens-sync/normalize.js
```

This reads `references/raw/`, writes `references/tokens/*.json` and `references/catalog.md`, and prints a coverage report.

## 5. Review coverage report

The normalizer prints per-collection counts and flags collections whose token count dropped vs. git HEAD. Surface any flags to the human before committing — a drop may indicate tokens that were removed intentionally (fine) or a broken export (not fine).

## 6. Hand off to human

Tell the human:
- Sync complete
- Coverage report summary (collection counts, any flags)
- Next step: `git diff` and commit if the diff looks right

Do not commit on the user's behalf unless explicitly asked.
