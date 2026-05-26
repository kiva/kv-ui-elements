# Tailwind Usage Guidance in Design Skills — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a consistent, hybrid `## Using with Tailwind` section (plus a focused `## Outstanding discrepancies` section where real gaps exist) to the five core design-intent skills, dissolving the catch-all `## Current code state` heading, and add a fallback pointer to `color-themes.md`.

**Architecture:** Documentation-only edits to markdown skill files under `@kiva/kv-tokens/docs/skills/`. Each skill keeps its Figma-intent design guidance as-is; the new section is the code-facing bridge that links *into* `tailwind.md` for mechanics and points to in-body tables for value lookups rather than duplicating them. "Tests" are `grep`-based structure/link verifications (the markdown analog of a unit test).

**Tech Stack:** Markdown, GitHub-flavored heading anchors, `grep` for verification, `git` for commits.

**Spec:** `docs/superpowers/specs/2026-05-26-tailwind-guidance-in-design-skills-design.md`

**Working directory for all paths below:** `@kiva/kv-tokens/docs/skills/` unless an absolute/relative path is given. All `grep`/`git` commands assume repo root `/Users/mst-kv/kiva/kv-ui-elements`.

---

## Conventions every edited file must follow

- New section title is exactly `## Using with Tailwind`; fallback subsection is exactly `### Without the preset`; gaps section is exactly `## Outstanding discrepancies`.
- The new section(s) replace the `## Current code state (verify before depending)` section (where present) and sit immediately **before** `## Figma source references`.
- Never re-explain `tailwind.md` mechanics or copy a mapping table already in the skill — link instead.
- Both fallback cases present and clearly separated.

**Verified `tailwind.md` cross-link anchors** (confirmed against the file's headings — do not re-derive):

| Target | Anchor |
|---|---|
| Consuming the preset | `tailwind.md#consuming-the-preset` |
| Make themable colors resolve | `tailwind.md#3-make-themable-colors-resolve-required-for-color-to-render` |
| Color is semantic/themable/runtime | `tailwind.md#color-is-semantic-themable-and-runtime-resolved` |
| Spacing 8px scale | `tailwind.md#spacing-is-an-8px-scale-with-4px-half-steps` |
| Border-radius / `tw-rounded` | `tailwind.md#border-radius-is-token-driven-and-tw-rounded--pill` |
| Text sizing utilities disabled | `tailwind.md#text-sizing-utilities-dont-exist--use-semantic-text-styles` |
| Font weight tops out at medium | `tailwind.md#font-weight-tops-out-at-medium-500` |
| Breakpoints md/lg/xl | `tailwind.md#breakpoints-are-md--lg--xl-mobile-first-no-sm` |

---

## Task 1: Confirm anchor map (no file change)

**Files:** none (verification only)

- [ ] **Step 1: Re-confirm the tailwind.md headings still match the anchor table above**

Run:
```bash
grep -nE '^#{2,3} ' @kiva/kv-tokens/docs/skills/tailwind.md
```
Expected: the headings `## Consuming the preset`, `### 3. Make themable colors resolve (required for color to render)`, `### Color is semantic, themable, and runtime-resolved`, `### Spacing is an 8px scale with 4px half-steps`, `### Text sizing utilities don't exist — use semantic text styles`, `### Font weight tops out at \`medium\` (500)`, `### Border-radius is token-driven and \`tw-rounded\` ≠ pill`, `### Breakpoints are \`md\` / \`lg\` / \`xl\` (mobile-first, no \`sm\`)` all present. If any heading text changed, recompute that one anchor (lowercase, drop punctuation/backticks, spaces→hyphens, `≠`/em-dash→removed leaving a doubled hyphen) before using it in later tasks.

No commit (verification only).

---

## Task 2: `radius.md`

**Files:**
- Modify: `@kiva/kv-tokens/docs/skills/radius.md` (replace the `## Current code state (verify before depending)` section, ~lines 144–163)

- [ ] **Step 1: Replace the `## Current code state (verify before depending)` section**

Read the file, then replace everything from the `## Current code state (verify before depending)` heading up to (but **not** including) `## Figma source references` with:

````markdown
## Using with Tailwind

The radius utilities below come from the `@kiva/kv-tokens` Tailwind preset. Haven't registered the preset yet? See [tailwind → Consuming the preset](tailwind.md#consuming-the-preset). Not using the preset at all? See [Without the preset](#without-the-preset) below.

Pick the class straight from the [scale table](#the-scale) above — each token's `tw-rounded-*` utility is listed there. The one trap carried over from stock Tailwind: **`tw-rounded` (no suffix) is 16px here**, not a small radius; use `tw-rounded-full` for a pill or circle. See [The `tw-rounded` gotcha](#the-tw-rounded-gotcha) above, and [tailwind](tailwind.md#border-radius-is-token-driven-and-tw-rounded--pill) for why.

**Shipped today** (verify against `@kiva/kv-tokens/configs/tailwind.config.js → theme.borderRadius` before depending):

- `tw-rounded-none` → `0px` (hardcoded in the preset)
- `tw-rounded-xs` → `4px` (from `radii.xs`)
- `tw-rounded-sm` → `8px` (from `radii.sm`)
- `tw-rounded-md` → `12px` (from `radii.md`)
- `tw-rounded` → `16px` (the `DEFAULT` key, from `radii.default`)
- `tw-rounded-lg` → `20px` (from `radii.lg`)
- `tw-rounded-xl` → `24px` (from `radii.xl`)
- `tw-rounded-full` → `500rem` (hardcoded in the preset; functionally a pill at any real width)

The 16px token is **`default` in code** and **`base` in Figma** — Tailwind's `DEFAULT` key generates the unsuffixed `tw-rounded` utility, so the mapping resolves through `DEFAULT` regardless of the source name. In code use `default` / `DEFAULT`; in Figma use `base`.

### Without the preset

- **Kiva (or Kiva-adjacent) repo, preset not registered yet:** install and register it — [tailwind → Consuming the preset](tailwind.md#consuming-the-preset). Until then, arbitrary values (`rounded-[16px]`) are a stopgap.
- **Stock-Tailwind / non-Kiva project:** use arbitrary values from the [scale table](#the-scale) (`rounded-[16px]`, `rounded-[20px]`). These are point-in-time copies of the token values, so re-check them if the scale changes.

## Outstanding discrepancies

- **`none` (0px) and `full` (500rem) are hardcoded in the preset** rather than flowing from `tokens/core/size.json` like the rest of the scale. A sync gap worth closing.

When you find a divergence from the shipped tokens, flag it — each is a data point for the design-system team.

````

- [ ] **Step 2: Verify structure and links**

Run:
```bash
cd @kiva/kv-tokens/docs/skills
grep -nE '^## (Using with Tailwind|Outstanding discrepancies|Current code state|Figma source references)' radius.md
grep -c 'tailwind.md#consuming-the-preset' radius.md
grep -c 'tailwind.md#border-radius-is-token-driven-and-tw-rounded--pill' radius.md
grep -n '### Without the preset' radius.md
```
Expected: `Using with Tailwind` and `Outstanding discrepancies` present, **no** `Current code state`, `Figma source references` still present and *after* the new sections; both `grep -c` return `1`; `### Without the preset` present.

- [ ] **Step 3: Commit**

```bash
git add @kiva/kv-tokens/docs/skills/radius.md
git commit -m "docs(kv-tokens): add Tailwind usage guidance to radius skill

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: `spacing.md`

**Files:**
- Modify: `@kiva/kv-tokens/docs/skills/spacing.md` (replace the `## Current code state (verify before depending)` section, ~lines 182–195)

- [ ] **Step 1: Replace the `## Current code state (verify before depending)` section**

Read the file, then replace everything from the `## Current code state (verify before depending)` heading up to (but **not** including) `## Figma source references` with:

````markdown
## Using with Tailwind

The spacing utilities come from the `@kiva/kv-tokens` Tailwind preset. Haven't registered it yet? See [tailwind → Consuming the preset](tailwind.md#consuming-the-preset). Not using the preset? See [Without the preset](#without-the-preset) below.

The preset wires every value on [the raw spacing ramp](#the-raw-spacing-ramp) into the standard spacing utilities — `tw-p-*`, `tw-m-*`, `tw-gap-*`, `tw-space-*`, etc. all flow from the `space` scale. The thing to internalize: this is an **8px scale with 4px half-steps**, so the same number means a different size than stock Tailwind — `tw-p-4` is **32px** here, not 16px. See [tailwind → Spacing is an 8px scale](tailwind.md#spacing-is-an-8px-scale-with-4px-half-steps).

Three key-naming conventions describe the same tokens — don't get tripped up:

- **Tailwind classes** use dots: `tw-p-0.5`, `tw-p-1`, `tw-p-1.5`, `tw-p-2.5` (4px, 8px, 12px, 20px).
- **`tokens/core/size.json`** (the authoritative source) uses underscores: `0_5`, `1`, `1_5`, `2_5`.
- **Figma's variable picker** uses hyphens: `0-5`, `1`, `1-5`, `2-5`.

The shipped code exposes this **raw numeric ramp**, not the semantic categories above — verify a value against `@kiva/kv-tokens/tokens/core/size.json` before depending on it. Express responsive shifts with breakpoint prefixes (`tw-p-2.5 md:tw-p-3 lg:tw-p-4`); note there is **no `sm` screen** — mobile is the unprefixed default.

### Without the preset

- **Kiva (or Kiva-adjacent) repo, preset not registered yet:** install and register it — [tailwind → Consuming the preset](tailwind.md#consuming-the-preset).
- **Stock-Tailwind / non-Kiva project:** the ramp is plain px, so the values in [the raw spacing ramp](#the-raw-spacing-ramp) table can be applied as arbitrary values (`p-[20px]`) or used to define your own scale. These are point-in-time copies.

## Outstanding discrepancies

- **No shipped semantic spacing tokens.** `structure-xl`, `component-gap-l`, `component-inset-xl`, `micro`, etc. do not exist in code — the semantic layer lives only in Figma variables today. In code, express the intent by picking the matching ramp value (optionally with a comment or a thin component wrapper).
- **No responsive spacing tokens.** Figma encodes per-tier shifts (e.g. `Inset XL` is `32 / 24 / 20`); the code does not. Today, responsive shifts must be done with Tailwind responsive prefixes.

When you find a divergence between this skill and the shipped tokens, flag it — each is a data point for the design-system team.

````

- [ ] **Step 2: Verify structure and links**

Run:
```bash
cd @kiva/kv-tokens/docs/skills
grep -nE '^## (Using with Tailwind|Outstanding discrepancies|Current code state|Figma source references)' spacing.md
grep -c 'tailwind.md#spacing-is-an-8px-scale-with-4px-half-steps' spacing.md
grep -c '#the-raw-spacing-ramp' spacing.md
grep -n '### Without the preset' spacing.md
```
Expected: `Using with Tailwind` + `Outstanding discrepancies` present, **no** `Current code state`, `Figma source references` still present; tailwind anchor `grep -c` returns `1`; `#the-raw-spacing-ramp` returns `2` (two links); `### Without the preset` present.

- [ ] **Step 3: Commit**

```bash
git add @kiva/kv-tokens/docs/skills/spacing.md
git commit -m "docs(kv-tokens): add Tailwind usage guidance to spacing skill

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: `color.md`

**Files:**
- Modify: `@kiva/kv-tokens/docs/skills/color.md` (replace the `## Current code state (verify before depending)` section, ~lines 185–228). The eco-green *Color Overview label* typo bullet is **removed here** and added to `color-themes.md` in Task 7.

- [ ] **Step 1: Replace the `## Current code state (verify before depending)` section**

Read the file, then replace everything from the `## Current code state (verify before depending)` heading up to (but **not** including) `## Figma source references` with:

````markdown
## Using with Tailwind

The color utilities come from the `@kiva/kv-tokens` Tailwind preset. Haven't registered it yet? See [tailwind → Consuming the preset](tailwind.md#consuming-the-preset). Not using the preset? See [Without the preset](#without-the-preset) below.

**Themable colors** are exposed as `tw-text-{slot}`, `tw-bg-{slot}`, `tw-border-{slot}`, `tw-divide-{slot}`, and `tw-ring-{slot}` — e.g. `tw-bg-primary`, `tw-text-action`, `tw-border-danger-highlight`. The slot names match the semantic token names in [color-themes.md](color-themes.md) (with `background/` → `bg-`). They compile to `rgb(var(--token))` and resolve at runtime from CSS custom properties, so they follow the active theme — reach for them by default. See [tailwind → Color is semantic, themable, and runtime-resolved](tailwind.md#color-is-semantic-themable-and-runtime-resolved), and [tailwind → Make themable colors resolve](tailwind.md#3-make-themable-colors-resolve-required-for-color-to-render) for how the custom properties get onto the page (`KvThemeProvider` does this in components).

**Primitive (non-themed) utilities** — `tw-bg-eco-green-3`, `tw-text-marigold-DEFAULT`, `tw-bg-gray-100`, etc. — resolve directly to primitive values and do **not** change with theme. Use sparingly; components should consume semantic tokens, not primitives.

**Theme names: type the code name, not the Figma name.** When importing themes from `@kiva/kv-tokens` (e.g. `marigoldLightTheme`) or referencing one in code:

| Figma (design intent) | Code (what to type) |
|---|---|
| Default | `DEFAULT` |
| Green Light | `green-light` |
| Green Dark | `green-dark` |
| Marigold | `marigold-light` *(code suffixes `-light`)* |
| Stone Light | `stone-light` |

Legacy themes still exported in code (`dark`, `dark-green`, `dark-mint`, `dark-stone`, `mint`, `stone-dark`) predate the five-theme system and are kept for backwards compatibility — **don't pick them for new work.**

**Authoritative sources** (verify before depending):

- `@kiva/kv-tokens/tokens/core/color.json` — primitive palette declarations.
- `@kiva/kv-tokens/dist/js/tokens.js` (`colors.theme.*`) — the built, per-theme semantic token tree.
- `@kiva/kv-tokens/configs/kivaColors.js` — turns each theme into CSS custom properties and exposes the Tailwind color choices.
- `@kiva/kv-tokens/configs/tailwind.config.js` — wires the custom properties into the `tw-text-*` / `tw-bg-*` / `tw-border-*` / `tw-divide-*` / `tw-ring-*` utilities.
- [`KvThemeProvider.vue`](../../../kv-components/src/vue/KvThemeProvider.vue) — sets the theme custom properties on a subtree.

### Without the preset

- **Kiva (or Kiva-adjacent) repo, preset not registered yet:** install and register it — [tailwind → Consuming the preset](tailwind.md#consuming-the-preset).
- **Stock-Tailwind / non-Kiva project:** the themable utilities won't exist. Either import the shipped custom properties from `@kiva/kv-tokens/css` ([`dist/css/tokens.css`](../../dist/css/tokens.css), which ships a `:root` block plus `[data-theme="…"]` blocks) and reference `var(--token)` yourself, or use the static hex values from [color-themes.md](color-themes.md). The hex route loses runtime theming and the values are point-in-time.

## Outstanding discrepancies

- **`heading-underline/primary` is the only `heading-underline` token shipped,** and only Default, Marigold, and Stone Light (plus legacy `stone-dark`) define it; other themes fall back to whatever the parent provides.
- **Semantic tokens defined in Figma but not yet in the shipped `colors.theme.*` tree:**
  - `text/action-disabled` (all themes)
  - `background/action-secondary`, `background/action-secondary-highlight`, `background/primary-disabled` (all themes except Green Light)
  - `border/secondary-disabled`, `border/tertiary` (Green Dark, Marigold, Stone Light)
  - `text/secondary`, `text/tertiary`, `background/tertiary`, `border/tertiary` (Green Dark, Marigold, Stone Light)

  These can be added without breaking changes since they're new entries.
- **Shadow tokens are not yet color-tokenized.** `boxShadow.DEFAULT` and `boxShadow.lg` in `tailwind.config.js` are hardcoded `rgb(0 0 0 / 0.08)`; the `shadow/default`, `shadow/hover`, `shadow/click-active` semantic tokens described in Figma have no code entry yet.

When you find a divergence between this skill and the shipped tokens/components, flag it — closing those gaps is part of the long-running token sync work, and each instance is a data point.

````

- [ ] **Step 2: Verify structure, links, and that the eco-green label bullet is gone**

Run:
```bash
cd @kiva/kv-tokens/docs/skills
grep -nE '^## (Using with Tailwind|Outstanding discrepancies|Current code state|Figma source references)' color.md
grep -c 'tailwind.md#color-is-semantic-themable-and-runtime-resolved' color.md
grep -c 'tailwind.md#3-make-themable-colors-resolve-required-for-color-to-render' color.md
grep -c 'C7EDD7' color.md
```
Expected: `Using with Tailwind` + `Outstanding discrepancies` present, **no** `Current code state`, `Figma source references` still present; both tailwind anchor counts `1`; `C7EDD7` count is `0` (the Color-Overview-label typo was removed from this file — it moves to `color-themes.md`).

- [ ] **Step 3: Commit**

```bash
git add @kiva/kv-tokens/docs/skills/color.md
git commit -m "docs(kv-tokens): add Tailwind usage guidance to color skill

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: `typography.md` (additive — no `Current code state` section today)

**Files:**
- Modify: `@kiva/kv-tokens/docs/skills/typography.md` (insert a new `## Using with Tailwind` section immediately before `## Figma source references`, after `## How to use in Figma`)

- [ ] **Step 1: Insert the `## Using with Tailwind` section before `## Figma source references`**

Read the file, then insert the following block immediately **before** the `## Figma source references` heading (leaving `## How to use in Figma` above it intact):

````markdown
## Using with Tailwind

The typography utilities come from the `@kiva/kv-tokens` Tailwind preset. Haven't registered it yet? See [tailwind → Consuming the preset](tailwind.md#consuming-the-preset). Not using the preset? See [Without the preset](#without-the-preset) below.

Type styles ship as **semantic, whole-style utilities** (e.g. `tw-text-base`, `tw-text-headline`, `tw-text-caption`) — each bundles font-family, size, line-height, and letter-spacing together. Pick one from [How to apply type styles](#how-to-apply-type-styles) or the [HTML + Tailwind mapping](#heading-hierarchy--semantic-html-mapping) tables above; don't assemble a style from individual utilities.

Two stock-Tailwind habits won't work here, by design:

- **No `tw-text-lg` / `tw-text-2xl` / `tw-leading-*` / `tw-tracking-*`.** The preset disables the `fontSize`, `lineHeight`, and `letterSpacing` core plugins, so those utilities aren't generated — use a semantic text style instead. (`tw-text-{color}` like `tw-text-primary` still works; that's color, a separate concern.) See [tailwind → Text sizing utilities don't exist](tailwind.md#text-sizing-utilities-dont-exist--use-semantic-text-styles).
- **No `tw-font-bold` / `tw-font-semibold`.** The heaviest weight is `medium` (500), and the base layer resets `strong` / `b` to normal (400). See [tailwind → Font weight tops out at `medium`](tailwind.md#font-weight-tops-out-at-medium-500).

These utilities are defined in `@kiva/kv-tokens/configs/tailwind.config.js` (via `kivaTypography.js`) — verify a class name against the current config before depending on it.

### Without the preset

- **Kiva (or Kiva-adjacent) repo, preset not registered yet:** install and register it — [tailwind → Consuming the preset](tailwind.md#consuming-the-preset).
- **Stock-Tailwind / non-Kiva project:** the semantic `tw-text-*` styles won't exist. Replicate a style by reading its font-family, size, and line-height from the [type scale](#type-scale) and the mapping tables, and load the web fonts with the `@font-face` rules the package ships. Copied values are point-in-time.

> The in-progress `<h1>`–`<h6>` / `tw-text-h1`–`tw-text-h6` semantic remap is tracked separately — see the `header-element-audit` skill before doing heading cleanup.

````

- [ ] **Step 2: Verify structure and links**

Run:
```bash
cd @kiva/kv-tokens/docs/skills
grep -nE '^## (Using with Tailwind|How to use in Figma|Figma source references)' typography.md
grep -c 'tailwind.md#text-sizing-utilities-dont-exist--use-semantic-text-styles' typography.md
grep -c 'tailwind.md#font-weight-tops-out-at-medium-500' typography.md
grep -c '#heading-hierarchy--semantic-html-mapping' typography.md
grep -n '### Without the preset' typography.md
```
Expected: `Using with Tailwind` appears **after** `How to use in Figma` and **before** `Figma source references`; both tailwind anchor counts `1`; in-body mapping anchor count `1`; `### Without the preset` present.

- [ ] **Step 3: Commit**

```bash
git add @kiva/kv-tokens/docs/skills/typography.md
git commit -m "docs(kv-tokens): add Tailwind usage guidance to typography skill

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: `layout.md`

**Files:**
- Modify: `@kiva/kv-tokens/docs/skills/layout.md` (replace the `## Current code state (verify before depending)` section, ~lines 171–179)

- [ ] **Step 1: Replace the `## Current code state (verify before depending)` section**

Read the file, then replace everything from the `## Current code state (verify before depending)` heading up to (but **not** including) `## Figma source references` with:

````markdown
## Using with Tailwind

The layout primitives come from the `@kiva/kv-tokens` Tailwind preset. Haven't registered it yet? See [tailwind → Consuming the preset](tailwind.md#consuming-the-preset). Not using the preset? See [Without the preset](#without-the-preset) below.

Breakpoints are **mobile-first min-width screens: `md`, `lg`, `xl`** (plus a `print` screen) — there is **no `sm` and no `2xl`**. Unprefixed utilities are the base tier, so the design system's XS and SM tiers both fall under "no prefix" in Tailwind; layer `md:` / `lg:` / `xl:` on top. See [tailwind → Breakpoints are `md` / `lg` / `xl`](tailwind.md#breakpoints-are-md--lg--xl-mobile-first-no-sm). Build grids with `tw-grid` and the column/gap utilities, or use `KvGrid` (with the gutter caveat below).

**Shipped breakpoint values** (verify against `@kiva/kv-tokens/configs/tailwind.config.js` / `tokens/core/size.json`): `md: 734`, `lg: 1024`, `xl: 1440`.

### Without the preset

- **Kiva (or Kiva-adjacent) repo, preset not registered yet:** install and register it — [tailwind → Consuming the preset](tailwind.md#consuming-the-preset).
- **Stock-Tailwind / non-Kiva project:** define `md` / `lg` / `xl` screens at the values above in your own config (or use arbitrary min-width media), and set gutters/margins explicitly from the [grid specs](#breakpoint-tiers--page-grid-specs). Copied values are point-in-time.

## Outstanding discrepancies

- **XS and SM tiers are not named breakpoints in code** — mobile is the unprefixed default; the XS/SM values in this skill are design-side targets only.
- **`KvGrid`** ([`@kiva/kv-components/src/vue/KvGrid.vue`](../../../kv-components/src/vue/KvGrid.vue)) hard-codes its gap as `tw-gap-2 md:tw-gap-3 lg:tw-gap-3.5`, which **does not match** the Figma tier gutters (16 / 16 / 24 / 32 / 32). For spec-accurate gutters, set them explicitly with gap utilities rather than relying on `KvGrid`'s defaults.
- **Margins** (20 / 20 / 32 / 64 / 120) and the **1200px content max-width** are not shipped as named tokens; page-container behavior lives per-consumer today.

When you find a divergence between this skill and the shipped tokens/components, flag it — each is a data point for the design-system team.

````

- [ ] **Step 2: Verify structure and links**

Run:
```bash
cd @kiva/kv-tokens/docs/skills
grep -nE '^## (Using with Tailwind|Outstanding discrepancies|Current code state|Figma source references)' layout.md
grep -c 'tailwind.md#breakpoints-are-md--lg--xl-mobile-first-no-sm' layout.md
grep -c '#breakpoint-tiers--page-grid-specs' layout.md
grep -n '### Without the preset' layout.md
```
Expected: `Using with Tailwind` + `Outstanding discrepancies` present, **no** `Current code state`, `Figma source references` still present; tailwind anchor count `1`; in-body grid-specs anchor count `1`; `### Without the preset` present.

- [ ] **Step 3: Commit**

```bash
git add @kiva/kv-tokens/docs/skills/layout.md
git commit -m "docs(kv-tokens): add Tailwind usage guidance to layout skill

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: `color-themes.md` (fallback pointer + relocated label typo)

**Files:**
- Modify: `@kiva/kv-tokens/docs/skills/color-themes.md` (add a fallback pointer after the intro; add the relocated Color-Overview label-typo bullet to `## Source-of-truth caveats`)

Note: the Green-Dark eco-green hex caveat already lives here (under `### Figma source caveats — Green Dark`); only the **Color Overview swatch label** typo moves from `color.md`. Do not duplicate the Green-Dark note.

- [ ] **Step 1: Add the fallback pointer after the intro paragraph**

Read the file. Immediately **after** the paragraph that ends "…opacity-based disabled tokens (e.g., `color/gray/800-1` = `#212121 (30%)`) are visible." and **before** the `## Source-of-truth caveats` heading, insert:

```markdown
**Wiring colors without the Tailwind preset?** These hex and primitive values are your fallback. See [color → Using with Tailwind](color.md#using-with-tailwind): when the `@kiva/kv-tokens` preset isn't registered, the themable `tw-bg-*` / `tw-text-*` utilities don't exist, so you either pull the CSS custom properties from `@kiva/kv-tokens/css` or apply the hex values in the tables below directly (losing runtime theming).

```

- [ ] **Step 2: Add the relocated Color-Overview label typo to `## Source-of-truth caveats`**

In the `## Source-of-truth caveats` section, append this bullet after its existing paragraph (which ends "…the hex/description should match the primitive."):

```markdown

- **Color Overview swatch label typo (no code change needed):** the Color Overview swatch label reads `#C7EDD7`, but the swatch is filled with `#78C79F` (primitive `color/eco-green/2`, the canonical value). Trust the chip fill and primitive name; the label is stale text. (The Green Dark theme's related hex-label typo is covered under [Figma source caveats — Green Dark](#figma-source-caveats--green-dark).)
```

- [ ] **Step 3: Verify**

Run:
```bash
cd @kiva/kv-tokens/docs/skills
grep -c 'color.md#using-with-tailwind' color-themes.md
grep -c 'C7EDD7' color-themes.md
grep -c '78C79F' color-themes.md
```
Expected: fallback pointer count `1`; `C7EDD7` count `1` (the relocated bullet); `78C79F` count `≥2` (the existing Green Dark caveat plus the new bullet).

- [ ] **Step 4: Commit**

```bash
git add @kiva/kv-tokens/docs/skills/color-themes.md
git commit -m "docs(kv-tokens): add no-preset fallback pointer + relocate label typo to color-themes

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Final consistency sweep

**Files:** none (verification only; fix-forward if a check fails)

- [ ] **Step 1: Confirm `Current code state` is gone from all five core skills**

Run:
```bash
cd @kiva/kv-tokens/docs/skills
grep -l 'Current code state' color.md spacing.md radius.md typography.md layout.md || echo "NONE — good"
```
Expected: `NONE — good`. If any file still has it, that file's Task did not fully replace the section — go back and finish it.

- [ ] **Step 2: Confirm every core skill has the new section, both fallback cases, and a tailwind cross-link**

Run:
```bash
cd @kiva/kv-tokens/docs/skills
for f in color.md spacing.md radius.md typography.md layout.md; do
  printf '%s: UWT=%s Without=%s twlink=%s\n' "$f" \
    "$(grep -c '^## Using with Tailwind' "$f")" \
    "$(grep -c '^### Without the preset' "$f")" \
    "$(grep -c 'tailwind.md#' "$f")"
done
```
Expected: each line shows `UWT=1 Without=1 twlink>=1`. (`color.md` and `typography.md` will show `twlink=2`.)

- [ ] **Step 3: Confirm no broken in-file anchors introduced**

Run:
```bash
cd @kiva/kv-tokens/docs/skills
grep -nE '#the-scale|#the-tw-rounded-gotcha' radius.md
grep -nE '#the-raw-spacing-ramp' spacing.md
grep -nE '#how-to-apply-type-styles|#heading-hierarchy--semantic-html-mapping|#type-scale' typography.md
grep -nE '#breakpoint-tiers--page-grid-specs' layout.md
```
Then manually confirm each referenced heading exists by running, for example:
```bash
grep -nE '^## The scale$|^### The `tw-rounded` gotcha$' radius.md
grep -nE '^## The raw spacing ramp$' spacing.md
grep -nE '^## How to apply type styles$|^## Heading hierarchy & semantic HTML mapping$|^## Type scale$' typography.md
grep -nE '^## Breakpoint tiers — page grid specs$' layout.md
```
Expected: every in-body anchor referenced by a link resolves to an existing heading.

- [ ] **Step 4: Final review commit (only if Step 1–3 required fixes)**

If any earlier check forced an edit, commit it:
```bash
git add -A @kiva/kv-tokens/docs/skills
git commit -m "docs(kv-tokens): fix consistency issues in design-skill Tailwind sections

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```
If no fixes were needed, this step is a no-op.

---

## Self-review notes (author check against spec)

- **Spec coverage:** all 5 core skills (Tasks 2–6), `color-themes` pointer + relocated typo (Task 7), dissolved `Current code state` (Tasks 2,3,4,6 + verified Task 8 Step 1), `Outstanding discrepancies` only where gaps exist (radius/spacing/color/layout — typography intentionally has none, only the `header-element-audit` pointer), both fallback cases per skill (verified Task 8 Step 2), no `tailwind.md`/`SKILLS.md` changes (out of scope, none added).
- **Placeholders:** none — every section contains final prose.
- **Anchor consistency:** tailwind.md anchors fixed in the table at top and reused verbatim; in-body anchors verified in Task 8 Step 3.
- **Decided open items reflected:** eco-green label typo relocated to `color-themes.md` (Task 7); typography top-of-file class list kept in place and only referenced (Task 5).
