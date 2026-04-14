---
name: kiva-design-tokens-sync
description: Use when refreshing the local Kiva design token snapshot from a new Figma export. Triggers on "sync figma tokens", "refresh design tokens", "update tokens from figma", "resync design system". Follows procedure.md exactly — the normalizer is pure JS, no Figma calls required.
---

# Kiva Design Tokens — Sync Procedure

Refresh the local snapshot under `skills/kiva-design-tokens/` from a fresh Figma variables export.

Follow `procedure.md` step by step. The whole flow is deterministic: parse exports → normalize → regenerate catalog → human reviews git diff.

See `README.md` for a human-oriented overview.
