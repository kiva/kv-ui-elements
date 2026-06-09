# Swap & verify mechanics

Stable, migration-agnostic mechanics for safely editing markup during an audit.
Self-contained — no dependency on any other skill.

## Detection surfaces checklist

When scanning a component for a dimension, check all four surfaces:

1. Template **element** (e.g. `<h2>`, `<p>`).
2. Template **class** (e.g. `tw-text-title`, `tw-mt-5`).
3. `@apply` inside a `<style>` / `<style scoped>` block.
4. CSS **selector** inside a `<style>` block that references a design-system
   class (e.g. `.tw-text-h1 u { ... }`).

## Element-swap rules (apply every time you change an element)

1. Copy **ALL** attributes onto the new element verbatim — `class`, `:class`,
   `id`, ARIA (`aria-labelledby`, `aria-describedby`, ...), `ref`, event handlers
   (`@click`, ...), `data-*`, directives (`v-if`, `v-show`).
2. If the original element had an `id` referenced elsewhere via `aria-labelledby`
   / `aria-describedby`, the replacement element must keep that `id`.
3. Update the matching closing tag.
4. Search the test suite for assertions targeting the old element selector (e.g.
   `querySelectorAll('h4')`, `find('h2')`) and update them — element swaps break
   selector-based assertions. Fix the test; do not accept the regression.

## Class-swap rules (apply every time you change a class)

1. Preserve all other classes in their original order; do not reorder unrelated
   classes.
2. Handle `@apply` swaps inside `<style>` blocks separately from template
   classes — change only the matched token, not the selector or other
   declarations.
3. Don't leave an element typographically/spatially "naked" — if removing a class
   strips its only style, choose the correct replacement, don't just delete.

## Verification

- Run the **repo's own** lint and unit-test commands (`npm run lint` /
  `npm run test`), not ad-hoc `npx eslint`, on modified files/packages.
- Element swaps frequently break selector-based test assertions — update the
  test.
- Visual confirmation is the before/after capture pair.

## Anti-patterns

- Never edit `@kiva/kv-tokens` (primitives, configs, classes) as part of an
  audit.
- Do not auto-commit. Pause for the operator on commit boundaries.
- Do not rename or remove design-system utility classes.

## Respect completed migrations (do not regress)

The `<h4>` element cleanup is **already complete** in kv-ui-elements and its
consumers. Treat these outcomes as **known-good — never regress them back toward
heading styles**:

- former H4s now on `tw-text-upper` / `tw-text-label`
- `<p>`-swapped country-name overlays on loan cards
- eyebrow / status / tag labels on `tw-text-upper`
- date/metadata and chart-axis labels swapped off `<h4>`

Soft note: if an `<hN>` remap migration is *actively in flight* in the target
repo, coordinate to avoid colliding edits.
