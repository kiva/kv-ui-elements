---
name: header-element-audit
description: Pre-emptive audit and cleanup of <h1>-<h6> elements and tw-text-h1-h6 utility classes in repos that consume @kiva/kv-tokens, ahead of the semantic typography remap. Produces an audit inventory and applies per-usage fixes one heading level at a time.
when_to_use: When a Kiva repo (kv-ui-elements or any consumer) needs to be prepared for the upcoming kv-tokens semantic typography mapping and you want to minimize visual churn. Trigger phrases - "header audit", "header cleanup", "typography header migration", "pre-empt the type style update".
---

# Typography Header Cleanup

## Purpose

`@kiva/kv-tokens` is moving toward a new semantic typography system. The `<h1>`–`<h6>` element defaults and `tw-text-h1`–`tw-text-h6` utility classes will eventually be remapped onto the new semantic styles. The classes and elements stay in use; their visual output shifts.

This skill audits every header usage in the target repo and applies pre-emptive per-usage fixes (element swap, class swap, both, or no-op) so the remap produces minimal visible churn.

## Prerequisites

- Confirm the consuming repo uses `@kiva/kv-tokens` and the `tw-` prefix.
- Read the current `typography.md` skill in `kv-tokens` (`@kiva/kv-skills/design-system/skills/kiva-design-system/typography.md`) — it's the source of truth for the new mapping.
- Identify which packages / source roots contain `.vue` (or `.tsx`/`.jsx` if extended later) component files in scope.
- Have ripgrep installed.

## Decision vocabulary

- `keep` — accept the new mapped style, no change
- `swap-class` — replace the `tw-text-hN` class with another typography utility
- `swap-element` — change the HTML element only
- `swap-both` — both element and class change
- `defer` — flag for design-team review; not fixed in this pass

## Phase 1 — Audit

Run a single ripgrep pass across all in-scope packages. Match four surfaces (the fourth was added during real use):

1. Header elements: `<h[1-6]\b` in `<template>`
2. Header utility classes in template attributes: `tw-text-h[1-6]`
3. `@apply tw-text-h[1-6]` declarations inside `<style>` / `<style scoped>` blocks
4. **CSS selectors referencing the heading classes** inside `<style>` blocks (e.g. `.tw-text-h1 u { ... }`) — flag as `source: style-selector`

### Glob set

```
--glob '**/*.vue'
--glob '!**/stories/**'
--glob '!**/.storybook/**'
--glob '!**/*.stories.*'
--glob '!**/tests/**'
--glob '!**/*.spec.*'
--glob '!**/dist/**'
--glob '!**/build/**'
--glob '!**/node_modules/**'
```

### Combined pattern

```
<h[1-6]\b|tw-text-h[1-6]|@apply\s+tw-text-h[1-6]
```

The element scan and class scan are usually best as separate `rg` runs to keep output legible:

```bash
# Element matches
rg -n --no-heading <globs> '<h[1-6]\b' <source-roots>

# Class matches (template + style-apply + style-selector all caught)
rg -n --no-heading <globs> 'tw-text-h[1-6]' <source-roots>
```

Then disambiguate `template` vs `style-apply` vs `style-selector` by inspecting whether the match line is inside `<template>`, contains `@apply`, or appears as a CSS selector inside `<style>`.

### Inventory schema

Write a Markdown working doc (default `docs/header-cleanup-audit.md`) with a Summary table and one section per heading level. Row columns:

| Column | Description |
|---|---|
| `package` | Package name |
| `file` | Path relative to repo root |
| `line` | Line number |
| `level` | 1–6 |
| `element` | `<hN>` if present, else blank |
| `class` | `tw-text-hN` if present, else blank |
| `source` | `template`, `style-apply`, `style-selector`, or `template+style-apply` |
| `mismatch?` | `yes` if element# ≠ class# on the same opening tag |
| `context` | Trimmed match line (peek next line if opening tag has no inner text) |
| `decision` | Filled in Phase 2 |
| `replacement` | Filled in Phase 2 |
| `verified?` | Filled in Phase 2 |

When an opening tag has both `<hN>` and `tw-text-hM`, emit **one** row at level = M (the class number). The element column shows the actual element; the mismatch flag is set when M ≠ N.

After populating, spot-check 3 random rows against the source files before continuing.

## Phase 2 — Per-level fix loop

Run this six-step loop **once per level**, in order **H4 → H1 → H2 → H3 → H5 → H6**. H4 first because its rule is known (default class swap to `tw-text-upper`), which proves the loop and surfaces toolchain/test issues early.

1. **Slice** — pull rows for level *N* into focus.
2. **Discuss patterns** — codify candidate patterns with the operator before editing. Group rows by usage shape (e.g. "all country-name overlays," "all eyebrow labels," "all section headers").
3. **Decide** — fill `decision` and `replacement` for every row.
4. **Apply** — edit components grouped by file (smallest diff first); commit grouped by pattern.
5. **Verify** — Storybook eyeball for visual surfaces; run lint + tests; record `verified?`.
6. **Close out** — confirm every row has non-blank `decision`, `replacement` (where applicable), and `verified?`.

## Per-level rubric (starting hypotheses)

These are starting points. Refine against actual audit data per level.

| Level | Today | New mapped style | Likely visual delta | Starting hypothesis |
|---|---|---|---|---|
| **H1** | Serif Medium, h1 scale, letter-spacing −0.5 | `textHeadline` — Serif Medium, semantic h1 scale, letter-spacing −200/−300 | Minor | Default `keep`. Inspect tight compositions for unwanted spacing shifts. |
| **H2** | Serif Medium, h2 scale, letter-spacing normal→−0.3 | `textHeadlineTwo` — Serif Medium, semantic h2 scale, letter-spacing −200/−300 | Minor | Default `keep`. Watch for H2s used as eyebrows / small labels. |
| **H3** | Sans Normal, letter-spacing −1, tight | `textSubheadline` — Sans Light, letter-spacing 0 | Notable: weight Normal → Light; tightening lost | Per-usage. Section sub-heading → likely `keep`; card/module title → likely `swap-class` to `tw-text-title`. |
| **H4** | Sans Normal, **uppercase**, h4 scale | `textTitle` — Sans Normal, **not uppercase**, h3 scale | Major: loses uppercase, size grows | Default `swap-class` to `tw-text-upper`. Element case-by-case. |
| **H5** | Sans Normal, h4.sm size | None (deprecated) | Unknown — depends on base CSS pruning | Default `swap-element` → `<p>` + `tw-text-title` / `tw-text-label` / `tw-text-upper`. |
| **H6** | Not defined in kv-tokens | None (deprecated) | Already off-system | Default `swap-element` → `<p>` + a utility class chosen per usage. Treat as latent bug. |

## Recurring patterns observed (from kv-ui-elements H4 sweep)

These showed up as repeating shapes during the proving run. Worth checking for in any consumer repo.

- **Country-name overlay on loan cards** — `<p>` (or `<div>`) inside an absolutely-positioned pill on top of an image, today using `tw-text-h4` for small uppercase. **Replacement:** `swap-class` → `tw-text-upper`. Element stays.
- **Eyebrow / status / tag labels** — `<span>` with `tw-text-h4` near other UI. **Replacement:** `swap-class` → `tw-text-upper`. Element stays.
- **Mismatched element/class headings** — `<hN class="tw-text-hM">` where N ≠ M. The class is what the consumer relied on visually. **Replacement:** swap the class to its new equivalent; element usually stays.
- **Lowercase-overridden H4** — `<h4 class="tw-lowercase ...">` deliberately removes the H4 uppercase. After the remap H4 isn't uppercase anymore, so `tw-lowercase` becomes noise. **Replacement:** `swap-both` → `<p>` + `tw-text-label` (Medium 14px, no transform); drop `tw-lowercase`.
- **Date / metadata heading inside a list** — `<h4>{{ date }}</h4>`. Not really structural; visually small uppercase. **Replacement:** `swap-both` → `<p>` + `tw-text-upper`.
- **Chart axis label as `<h4>`** — semantically not a heading. **Replacement:** `swap-both` → `<p>` + `tw-text-upper`.
- **Text-link styled as `tw-text-h4`** — small uppercase link. **Replacement:** `swap-class` → `tw-text-upper`. Component element stays.
- **`@apply tw-text-h4` overriding third-party iframe styles** (e.g. Braintree) — pre-empt the look-shift. **Replacement:** swap the `@apply` token to `tw-text-upper`.

## Edge cases

- **Mismatched element/class pair** (`<h2 class="tw-text-h4">`): decide based on the **class** — that's what the consumer was relying on visually.
- **Class on a non-heading element** (`<span class="tw-text-h4">`): class is the source of truth; element stays unless structurally wrong.
- **`@apply tw-text-hN` in a `<style>` block**: same per-class decision applies, but the swap is made in the style block (`@apply tw-text-upper`), not on the template element.
- **CSS selectors referencing heading classes** (`.tw-text-h1 u { ... }`): usually safe to `keep` — the rules continue to apply to whatever the new mapped style produces. Worth a quick visual check (e.g. underline color/style) but rarely actionable.
- **`<h6>` and `tw-text-h6`**: in `kv-tokens` today, `tw-text-h6` is not defined (silent no-op) and `<h6>` has no token-driven base style. Both are off-system — treat as latent bugs to clean up regardless of the remap.
- **Heading inside a slot consumed by another component**: flag for slot-consumer review; may need `defer`.

## Element-swap rules (apply every time)

When swapping an HTML element (e.g. `<h4>` → `<p>`):

1. Copy ALL attributes onto the new element verbatim — `class`, `:class`, `id`, ARIA attributes (`aria-labelledby`, `aria-describedby`, etc.), `ref`, event handlers (`@click`, etc.), `data-*`, conditional directives (`v-if`, `v-show`).
2. If the original element had an `id` referenced elsewhere via `aria-labelledby`, the replacement element still needs that `id`.
3. Update the matching closing tag (`</h4>` → `</p>`).
4. Search the test suite for assertions targeting the old element selector (e.g. `querySelectorAll('h4')`) and update them — element swaps will break tests that assert on tag names.

## Class-swap rules (apply every time)

1. Preserve all other classes in their original order.
2. Don't reorder unrelated classes.
3. When the original tag had both `<hN>` and `tw-text-hN` (redundant), removing the class on element-swap to `<p>` requires picking the right replacement class — don't leave the `<p>` typography-naked unless that's intended.
4. For `@apply` swaps in `<style>` blocks: replace only the matched `tw-text-hN` token. Do not change the selector or other declarations in the rule.

## Verification

- **Lint** (per-package, using the repo's eslintrc): run on every modified file.
- **Unit tests** (per-package): run after edits. Element swaps frequently break selector-based assertions — update the test, don't accept the regression.
- **Storybook**: eyeball for components with stories. Compare before/after for the H4 patterns where the visual delta is biggest (loss of uppercase).
- For utility/non-visual packages, verification happens transitively when re-rendering through a consumer.
- No-visual-surface escape hatch: mark `verified?` as `n/a — no local visual surface` with a one-line reason. Should be rare.

## Definition of done

- Every inventory row has a non-blank `decision`.
- Every `swap-*` row has a non-blank `replacement`.
- Every modified component has been visually verified or explicitly marked `n/a`.
- All H6 rows resolved (latent bugs cleaned up regardless of remap status).
- Re-running the master `rg` pattern shows only `decision: keep` rows remaining.
- Code changes per heading level are committed in level-scoped chunks (or one bundled PR if the operator explicitly prefers that).

## Anti-patterns

- Do **not** edit `kv-tokens` (primitives, configs, classes) as part of this work.
- Do **not** rename or remove `tw-text-hN` classes.
- Do **not** fix non-header typography drift while in the codebase for this work.
- Do **not** apply a uniform per-level rubric in place of per-usage discussion. Patterns emerge from the audit; impose them after seeing the slice, not before.
- Do **not** bundle all six heading levels into a single commit — chunking by level is what makes review tractable.
- Do **not** auto-commit. The operator decides commit boundaries; pause for confirmation.
