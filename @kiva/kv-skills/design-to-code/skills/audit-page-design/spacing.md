# Spacing dimension

Detect and fix spacing drift on a page against the Kiva design system. Load the
design-system `spacing.md` sub-skill (via the `kiva-design-system` router) for the
canonical categories before judging anything. Use
`references/swap-and-verify-mechanics.md` for how to edit safely.

## Why this dimension is conservative

- The same number means different things — `16px` can be Structure/M,
  Component-Gap/L, or Inset. Picking the token requires the **between-vs-inside**
  judgment, not a pixel lookup.
- Spacing values are **responsive per tier** — the token carries the
  responsiveness; a raw value does not.
- Several semantic spacing tokens **may not have shipped utility classes yet**
  (token sync in progress). Verify before proposing a class.

## Off-spec signals (scan local source in the page's component tree)

Scope the scan to the page body — **skip the global header and footer subtrees**
unless the prompt explicitly asks for them (see SKILL.md).

1. **Raw values** — `px` / `rem` in custom CSS for `padding`, `margin`, `gap`.
2. **Arbitrary / stock utilities** — `tw-p-[13px]`, `tw-mt-5`, `tw-gap-7`, etc.
   that aren't a semantic token.
3. **Off-grid** — any value that is not a 4px multiple. Always a finding.
4. **On-grid but wrong category** — the between/inside judgment. Hardest; usually
   needs a human.

## Apply policy — confidence-graded

- **Auto-apply (high confidence only):** unambiguous, exact-match fixes where a
  shipped utility exists — e.g. an off-grid raw value whose intent is clear and
  maps to exactly one token utility verified to exist in code.
- **Propose-only (everything else):** anything needing the between/inside
  judgment, any responsive nuance, **and any case where the correct semantic
  token has no shipped utility class** -> write it to `audit.md` as a
  recommendation; do **not** edit.

## Per-finding flow

For each finding: determine the spatial relationship (between vs inside) and the
target token -> classify local vs external
(`references/classifying-external.md`) -> auto-apply only if high-confidence and
local; otherwise propose -> record under Applied / Requires external update /
Design-system gap in the run's `audit.md`.
