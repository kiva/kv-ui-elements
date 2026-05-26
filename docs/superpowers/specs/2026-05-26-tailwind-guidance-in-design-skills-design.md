# Tailwind usage guidance in the design-system skills

**Date:** 2026-05-26
**Status:** Approved design, pending implementation plan
**Author:** Matt Stover (with Claude)

## Problem

`@kiva/kv-tokens/docs/skills/tailwind.md` now exists as the canonical, code-authoritative
guide to Kiva's Tailwind preset (the `tw-` prefix, themable colors as CSS custom properties,
disabled `fontSize`/`lineHeight`/`letterSpacing` core plugins, token-driven scales, the base
layer, and the DTCG → preset compile pipeline). It cross-links *outward* to the per-topic
design-intent skills for "which value to pick."

The per-topic skills (`color`, `spacing`, `radius`, `typography`, `layout`) do not yet point
*back* with consistent, intentional "how do I express this concern in Tailwind" guidance. They
already reference the config ad hoc (radius has a full `tw-rounded-*` column, typography has a
class list and an HTML/Tailwind table, spacing/color/layout mention `tw-` utilities in passing),
and each (except `typography`) ends with a catch-all `## Current code state (verify before
depending)` section that mixes routine "what's shipped" facts with genuine Figma-vs-code sync gaps.

## Goal

The design-intent skills remain the **authoritative guidance for building visually accurate
pages and components** with Kiva's design system. Layer onto each one a consistent, in-context
section that teaches how to express that skill's intent in Tailwind — **hybrid**: it encourages
registering and using the `@kiva/kv-tokens` preset, but is also useful when the preset is absent.

This follows the established kv-tokens skill authoring style: **teach usage and mechanics, do
not catalog classes, cross-link to the canonical sources** (`tailwind.md` for mechanics, the
skill's own shipped-state notes / config for exact values). The per-topic skills stay
Figma-canonical for design intent; the new section is the code-facing bridge and is
code-canonical for "how it ships."

## Scope

**In scope (content edits to skill markdown only):**
- `color.md`, `spacing.md`, `radius.md`, `typography.md`, `layout.md` — add `## Using with Tailwind`,
  add `## Outstanding discrepancies` where genuine gaps exist, dissolve `## Current code state`.
- `color-themes.md` — lightweight pointer only (no full section).

**Out of scope:**
- `tailwind.md` (already links outward; no change expected — flag if a divergence is found).
- `SKILLS.md` (conventions already cover this; no change expected — flag if needed).
- `header-element-audit.md`, `figma-design-system-to-skill.md` (audit/process, not design-intent).
- Any code, token, or config changes. This is documentation only.

## Design

### Approach (chosen)

A consistent, dedicated `## Using with Tailwind` section per skill (Approach A), placed in the
usage area where `## Current code state (verify before depending)` sits today. The catch-all
`Current code state` heading is **dissolved**; its content is redistributed (see split criteria).
A separate `## Outstanding discrepancies` section captures only critical, unresolved Figma-vs-code
divergences worth future work.

Existing in-body Tailwind references (radius's scale table + `tw-rounded` gotcha, typography's
class list + HTML/Tailwind table) are **augmented, not relocated** — they stay where they read
well, and the new section links to them rather than duplicating them.

### `## Using with Tailwind` — uniform four-part backbone

1. **Hybrid setup line.** "The utilities below come from the `@kiva/kv-tokens` preset. Not wired
   up yet? See [tailwind → Consuming the preset](tailwind.md#consuming-the-preset). Not using the
   preset at all? See *Without the preset* below."
2. **Authoring guidance (topic-specific).** How to pick/apply the class for this concern + the one
   key gotcha, linking to the matching `tailwind.md` subsection for the mechanics rationale, and
   pointing to any in-body mapping already in the skill rather than reprinting it.
3. **Shipped-state details.** The routine "what's actually shipped today, verify against the
   current config" content lifted out of the old `Current code state` section, including the
   authoritative-source pointer (e.g. `tokens/core/size.json`, `configs/tailwind.config.js`).
   The "verify before depending" caveat moves onto these individual lines.
4. **`### Without the preset`** — two clearly separated fallbacks:
   - *Kiva (or Kiva-adjacent) repo, preset not registered yet:* install + register — link to
     [tailwind → Consuming the preset](tailwind.md#consuming-the-preset). Arbitrary/raw values are
     a stopgap until then.
   - *Stock-Tailwind / non-Kiva project:* replicate the intent with the documented token values
     and/or pull CSS custom properties from `@kiva/kv-tokens/css` (`dist/css/tokens.css`). Note you
     lose runtime theming and that copied values are point-in-time.

### `## Outstanding discrepancies` — only where real gaps exist

Holds only critical, unresolved Figma-vs-code divergences worth future work (the files already
self-label these as "real sync gap" / "worth closing"). Each retains the closing note: "When you
find a divergence from the shipped tokens/components, flag it — each is a data point for the
design-system team." Skills with no genuine gaps omit this section.

### `tailwind.md` cross-link targets (verify exact anchors during implementation)

GitHub-style heading slugs can be fiddly (em dashes, backticks, `≠` → empty); verify each anchor
against the rendered file before depending on it.

- `color` → `#color-is-semantic-themable-and-runtime-resolved`, plus `#3-make-themable-colors-resolve-required-for-color-to-render` (for the custom-property requirement) and `#consuming-the-preset`.
- `spacing` → `#spacing-is-an-8px-scale-with-4px-half-steps`.
- `radius` → `#border-radius-is-token-driven-and-tw-rounded--pill`.
- `typography` → `#text-sizing-utilities-dont-exist--use-semantic-text-styles` and `#font-weight-tops-out-at-medium-500`.
- `layout` → `#breakpoints-are-md--lg--xl-mobile-first-no-sm`.

## Per-skill split (what moves where)

### `radius.md`
- **Keep in body:** the `## The scale` table (with Tailwind column) and `### The tw-rounded gotcha`.
- **Using with Tailwind:** setup line; "pick the class from the scale table above"; `tw-rounded` =
  16px gotcha (link to in-body gotcha + tailwind.md); shipped mapping (`tw-rounded-xs` 4px …
  `tw-rounded` 16px via `DEFAULT` … `tw-rounded-full` 500rem) framed as "shipped today, verify
  against `configs/tailwind.config.js → theme.borderRadius`"; the `default` (code) vs `base`
  (Figma) naming note; Without-the-preset (arbitrary `rounded-[16px]`).
- **Outstanding discrepancies:** `none` (0px) and `full` (500rem) are hardcoded in the preset
  rather than flowing from `size.json` — sync gap worth closing.

### `spacing.md`
- **Keep in body:** `## The raw spacing ramp` table; the three key-convention note (underscores /
  dots / hyphens) — this is routine usage, fold its essence into Using with Tailwind.
- **Using with Tailwind:** setup line; spacing is an 8px scale with 4px half-steps, so the same
  number differs from stock Tailwind (`tw-p-4` = 32px) — link to tailwind.md spacing subsection;
  `tw-p-*`/`tw-m-*`/`tw-gap-*`/`tw-space-*` all flow from `space`; class-name convention is dots
  (`tw-p-2.5`) vs source underscores vs Figma hyphens; authoritative source `tokens/core/size.json`;
  responsive shifts via prefixes (`tw-p-2.5 md:tw-p-3 lg:tw-p-4`, no `sm`); Without-the-preset.
- **Outstanding discrepancies:** no shipped semantic spacing tokens (`structure-xl`,
  `component-gap-l`, `component-inset-xl`, `micro`, …) — semantic layer lives only in Figma; no
  responsive spacing tokens (per-tier shifts must be done with responsive prefixes today).

### `color.md` (3-way split — most heterogeneous)
- **Using with Tailwind:** themable utility surface (`tw-text-{slot}`, `tw-bg-{slot}`,
  `tw-border-{slot}`, `tw-divide-{slot}`, `tw-ring-{slot}`) and that slot names match
  color-themes.md (`background/` → `bg-`); primitive (non-themed) utilities and "use sparingly";
  how themable colors resolve at runtime (custom properties / `KvThemeProvider`, link to
  tailwind.md §3); the **theme-name map (Figma → code)** as "code names you type" (`DEFAULT`,
  `green-light`, `green-dark`, `marigold-light`, `stone-light`); authoritative sources
  (`tokens/core/color.json`, `dist/js/tokens.js`, `kivaColors.js`, `tailwind.config.js`);
  Without-the-preset (import `@kiva/kv-tokens/css`, or use hex from color-themes.md; lose theming).
- **Outstanding discrepancies:** missing semantic tokens (action-disabled, action-secondary,
  some secondary/tertiary/disabled border & background, partial heading-underline); shadow tokens
  not yet color-tokenized (`boxShadow.DEFAULT`/`lg` hardcoded). Keep the legacy-themes note
  (`dark`, `mint`, …) here or in Using-with-Tailwind as a "don't pick these for new work" caution.
- **Relocate (proposed, confirm in review):** the eco-green `#78C79F` *Figma-label typos* are not
  code state — move them to `color-themes.md`'s existing "Figma source caveats" area, since that's
  exactly the kind of note those subsections hold.

### `typography.md` (additive — no `Current code state` today)
- **Keep in body:** `## How to apply type styles` class list and the HTML/Tailwind mapping tables.
- **Using with Tailwind:** setup line; semantic text-style utilities (`tw-text-h1`/`tw-text-body`/…
  and the 2026 styles) carry size + line-height + letter-spacing — link to "pick a style from the
  tables above"; the two key gotchas: **no `tw-text-lg`/`tw-leading-*`/`tw-tracking-*`** (disabled
  core plugins — link to tailwind.md) and **no `tw-font-bold`** (heaviest weight is `medium` 500 —
  link to tailwind.md); note `tw-text-{color}` still works (color ≠ size); Without-the-preset
  (replicate font-family/size/line-height from the type-scale tables; `@font-face` from the package).
- **Outstanding discrepancies:** likely none in this file; if anything, a one-line pointer to the
  `header-element-audit` skill for the in-progress `<h1>`–`<h6>` / `tw-text-h1`–`h6` remap.

### `layout.md`
- **Using with Tailwind:** setup line; breakpoints are `md`/`lg`/`xl` (min-width, mobile-first) +
  `print`, **no `sm`/`2xl`** — link to tailwind.md breakpoints subsection; mobile/XS/SM are the
  unprefixed base tier; grid via `tw-grid`/gap utilities; shipped breakpoint values
  (`md: 734`, `lg: 1024`, `xl: 1440`); Without-the-preset (define matching screens, or use
  arbitrary min-width media).
- **Outstanding discrepancies:** XS/SM tiers not expressed as named breakpoints; `KvGrid` gap
  defaults (`tw-gap-2 md:tw-gap-3 lg:tw-gap-3.5`) don't match Figma gutters (16/16/24/32/32) — set
  gutters explicitly when spec accuracy matters; margins (20/20/32/64/120) and 1200px max-width
  not shipped as named tokens.

### `color-themes.md` (pointer only)
- Add a short note that the per-theme hex/primitive tables are what you use to wire colors
  **without** the preset (the stock-Tailwind fallback), cross-linking to `color.md`'s Using-with-
  Tailwind section and to `tailwind.md`. If the eco-green typo relocation is accepted, those notes
  land in this file's "Figma source caveats" area.

## Consistency checklist (apply to every edited skill)

- Section title is exactly `## Using with Tailwind`; fallback subsection is exactly
  `### Without the preset`; gaps section is exactly `## Outstanding discrepancies`.
- New section sits where `Current code state` was, before `## Figma source references`.
- Never re-explains tailwind.md mechanics or copies a mapping table that already exists in-body —
  links instead.
- Both fallback cases present and clearly separated.
- Cross-links resolve (tailwind.md anchors verified; in-body anchors verified).
- `Current code state (verify before depending)` heading no longer exists in the 5 core skills.

## Risks / open items

- **Anchor drift:** tailwind.md heading slugs must be verified, not assumed.
- **Color's third category:** the eco-green Figma-label typos relocation to color-themes.md is a
  proposal; if rejected, keep them as a brief reference note in color.md instead.
- **typography top-of-file class list:** kept in place and referenced; not relocated into the new
  section, to avoid churn. Confirm acceptable.
