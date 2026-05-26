---
name: color
description: Semantic color system from the Kiva design system — primitive palettes (eco-green, marigold, desert-rose, stone, gray, neutral), the five themes (Default, Green Light, Green Dark, Marigold, Stone Light), the role/slot/state token grammar, accessibility levels per pairing, and rules for picking a token by purpose rather than hex value. Sourced from Figma; values describe design intent and may diverge from current code implementation.
when_to_use: When designing or implementing anything that has color — backgrounds, text, borders, button surfaces, alert states, themed sections — or when picking between two tokens that look similar. Use it before reaching for a hex value, before applying a theme to a section, and any time a color decision crosses a semantic line (action vs. caution, primary vs. secondary, default vs. inverse). Reference design intent first; verify token names against current code before relying on them.
---

# Kiva Color

## Source of truth

This skill captures the **semantic color system** as defined in Figma (the Kiva Ecosystem 2026 file). Figma is the canonical source for design intent: which primitives exist, which themes are supported, what each semantic token means, when to use it, and how tokens compose into accessible pairings.

Hex values and token names in this document reflect the Figma specifications. The shipped code in `@kiva/kv-tokens` may temporarily lag behind these specs while the token sync work is in progress. **Verify any token reference against the current code before depending on it.** See "Outstanding discrepancies" at the end of this skill for known gaps, and "Using with Tailwind" for code naming and the shipped utility surface.

## Why color matters

Color does work on Kiva that the rest of the system can't: it tells a lender which button advances the lending flow, signals to a borrower that a field is in error, and separates a marigold "story" section from a default "form" section without needing a single word of copy. The semantic color system encodes that work in token names — `background/action` is *the* button color in whatever theme is active, not "green" — so the same component behaves correctly under any of the five themes.

Common alternative names you may see used interchangeably: **color palette**, **color variables**, **design tokens**, **swatches**, **semantic colors**.

## Design principles

1. **Name the purpose, not the hue.** Use `text/action` for an interactive link, not "green" — the token resolves to the right color per theme. If you ever find yourself picking a token because it "looks right," step back and pick by intent.
2. **Themes scope intent.** A theme is a coordinated set of role/slot tokens tuned for one page atmosphere. The token name stays the same across themes; the value changes. Compose pages from themed *sections*, don't repaint individual components.
3. **Semantic meanings don't theme.** Error stays red, warning stays amber. Caution and danger token values are stable across themes precisely because the meaning is stable.
4. **Always reference semantic tokens, not primitives.** Primitives exist to *build* semantic tokens. Components should never reach past the semantic layer into a raw `eco-green/3` or `gray/500`.

## Primitives

Primitive tokens are the raw values that power every semantic token. Use these only when defining new semantic tokens — components should always consume the semantic layer.

| Family | Step | Hex | | Family | Step | Hex |
|---|---|---|---|---|---|---|
| **eco-green** | 1 | `#EDF4F1` | | **stone** | 1 | `#F3F1EF` |
| | 2 | `#78C79F` | | | default | `#DFD0BC` |
| | default | `#2AA967` | | | 2 | `#AA9E8D` |
| | 3 | `#276A43` | | | 3 | `#635544` |
| | 4 | `#223829` | | | 4 | `#2E271E` |
| **marigold** | 1 | `#F8F2E6` | | **gray** | 50 | `#FAFAFA` |
| | 2 | `#F8CD69` | | | 100 | `#F5F5F5` |
| | default | `#F4B539` | | | 200 | `#E0E0E0` |
| | 3 | `#996210` | | | 300 | `#C4C4C4` |
| | 4 | `#593207` | | | 400 | `#9E9E9E` |
| **desert-rose** | 1 | `#F9F0EF` | | | 500 | `#757575` |
| | 2 | `#E0988D` | | | 600 | `#505050` |
| | default | `#C45F4F` | | | 700 | `#454545` |
| | 3 | `#A24536` | | | 800 | `#212121` |
| | 4 | `#5C2A22` | | **neutral** | white | `#FFFFFF` |
| | | | | | black | `#000000` |

The stone family uses an out-of-order step naming (`1`, `default`, `2`, `3`, `4`) so the lighter swatch keeps the visual position designers expect. Don't try to "fix" it.

> **Figma label typo for `eco-green/2`.** The Color Overview panel renders the text label `#C7EDD7` on top of the `eco-green/2` swatch, but the swatch's *actual fill* is `#78C79F` (the value above). The label is stale; the chip color, the Figma `color/eco-green/2` variable, and the shipped code (`tokens/core/color.json`) all agree on `#78C79F`. Use `#78C79F`.

## Themes

Five themes are supported. Each is suited to a specific page atmosphere; choose one as the section's base and let the semantic tokens do the rest.

| Theme | Atmosphere | Use for |
|---|---|---|
| **Default** | White background, neutral and trustworthy | Forms, dashboards, primary content surfaces. The required theme for any form or text field. |
| **Green Light** | Light green tinted surfaces | Secondary sections that lean on brand color without dominating. Inherits Default's text, action, and caution tokens. |
| **Green Dark** | Dark green sections | High-emphasis brand moments (impact stats, partner CTAs). Section-level only — never the whole page. |
| **Marigold** | Warm amber accents | Marketing, donation, warmth-forward stories. |
| **Stone Light** | Neutral warm stone | Editorial / story content where green would compete with imagery. |

## Token grammar

Every semantic token reads as **role / slot / state-modifier**:

| Part | Meaning | Examples |
|---|---|---|
| **Role** | What kind of property the token paints. | `text`, `background`, `border`, `heading-underline`, `shadow` |
| **Slot** | What the color communicates. | `primary`, `secondary`, `tertiary`, `action`, `caution`, `danger` |
| **State modifier** *(optional)* | Interaction or context variant. | `highlight` (hover / pressed), `inverse` (on opposite-tone surface), `disabled`, `secondary` (alternate emphasis within a state) |

A few practical reads:

- `text/primary` — the standard body copy color for the current theme.
- `background/action-highlight` — the button surface under a hover or pressed state.
- `border/primary-inverse` — the border color used when the component sits on a dark surface in the current theme.
- `text/danger` — the foreground for an error message; pair with `background/danger-highlight` for the standard alert surface.

## Per-theme token tables

Every theme's full token list — name, hex, primitive source, and Figma-authored description for every text / background / border / underline token — lives in the companion reference file [color-themes.md](color-themes.md). That file is the data layer; this file is the framework.

A quick orientation before you load it:

- **Default** is the base. Every other theme inherits Default and only redefines the tokens that differ.
- **Green Light** is the smallest theme — only two unique tokens (`background/primary`, `background/primary-inverse`). Everything else falls back to Default.
- **Green Dark**, **Marigold**, and **Stone Light** each define their own full set of text / background / border tokens plus `heading-underline-primary`.
- **Alert tokens** (`text/caution(+-highlight)`, `text/danger(+-highlight)`, `background/caution(+-highlight)`, `background/danger(+-highlight)`, `border/caution(+-highlight)`, `border/danger(+-highlight)`) are defined on Default only and used unchanged across themes — caution stays amber, danger stays desert-rose. See "Preserve semantic color meaning" below.

The companion file also documents `shadow/default`, `shadow/hover`, and `shadow/click-active` and calls out the (several) Figma copy-paste errors in the source table.

## The disabled-state pattern

Disabled tokens (`text/action-disabled`, `background/primary-disabled`, `border/secondary-disabled`) are not full new color values — they are an **existing primitive at reduced opacity**. The Figma table renders this as a primitive name with a `-1` suffix (e.g., `color/gray/800-1` = `#212121` at 30%; `color/eco-green/3-1` = `#276A43` at 30%).

The takeaway: a disabled state is the active-state color washed down — not a separately tuned gray. If you find yourself reaching for a custom disabled color, use the matching `*-disabled` token instead.

## Shadow tokens (interaction-driven)

Three color tokens drive elevation: `shadow/default` (resting), `shadow/hover` (lifted on hover), `shadow/click-active` (pressed). The naming is **interaction-state-based**, not severity-based. Full descriptions in [color-themes.md](color-themes.md#shadow-colors).

## Accessibility

Every meaningful foreground/background pairing in the Figma "Color Accessibility" panel is rated against **WCAG 2.1 AA (4.5:1)** and **AAA (7:1)** for normal body text.

| Badge | Meaning | Safe for |
|---|---|---|
| **Pass** | Ratio ≥ 7:1 (passes AA and AAA) | All text, all sizes. |
| **AA only** | 4.5:1 ≤ ratio < 7:1 | Normal body text; not for extended reading at small sizes or thin weights. |
| **Large only** | 3:1 ≤ ratio < 4.5:1 | Large text (≥ 18pt or ≥ 14pt bold), icons, decorative type — never small body copy. |
| **Fail** | Ratio < 4.5:1 (below AA) | Non-text decorative use only, or intentionally low-emphasis states (e.g., disabled). |

A "Fail" is not automatically a bug. Some pairings fail on purpose — disabled controls, decorative panels — but a few are dangerous and should never be used for readable content. The Figma panel calls those out individually; treat its annotations as authoritative for which "Fail" pairings are acceptable.

Notable real-world callouts from the Figma rating tables:

- **Default theme:** `text/tertiary` on `background/secondary` is `4.1:1` and on `background/tertiary` is `2.6:1` — both flagged **Fail** in Figma with the note "Does not pass AA at any text size." Don't use `text/tertiary` for readable copy on those surfaces; use `text/primary` or `text/secondary` instead. (The 4.1:1 ratio technically clears 3:1 for large text, but the design system team is explicit that this pairing should not be used for readable text — heed the explicit guidance.)
- **Green Light:** inherits Default's text/action/caution ratings — refer to Default for those, not duplicated in the Green Light table.
- **Green Dark:** has a critically low pairing (`text/primary` on `background/tertiary` at `1.5:1`) explicitly flagged "must never be used." Treat the warning as load-bearing.
- **Marigold:** `text/tertiary` pairings drop into Large-only or Fail; keep tertiary text off Marigold body surfaces.
- **Stone Light:** similar caution around `text/tertiary` — Large-only on `background/primary`, Fail on `background/tertiary`.
- **Alerts:** the alert tokens (`text/caution(+-highlight)`, `text/danger(+-highlight)`) are defined on Default and used across themes. They pass AA on their paired alert backgrounds.

When in doubt, look the pairing up in the Figma table before approving it for body copy.

## Best practices

### Limit 1–2 primary themes per page

- **Do** keep a page visually cohesive by anchoring it in one to two primary themes, with an optional tertiary theme for emphasis if needed.
- **Don't** stack multiple themed sections (Default → Green Dark → Stone Light → Marigold) in a single page — the page reads as a swatchbook.

### Buttons adapt to their theme context

- **Do** use the theme's `background/action` and `text/action` tokens — the button reads as "primary" in whatever theme it sits in.
- **Don't** hard-pin a button to a specific brand color or override `background/action` to enforce a global "primary green." Doing so breaks contrast guarantees in dark themes and defeats the point of theming.

### Don't mix theme content within a single section

- **Do** keep all content inside one section on the same theme. Theme switches should align with section boundaries.
- **Don't** drop a Green Dark card into a Default section just to call attention to it — use spacing, hierarchy, or a sectioning component instead.

### All forms and text fields follow the Default theme

- **Do** render forms and inputs in Default theme, even when the surrounding section uses another theme.
- **Don't** apply alternate themes to inputs, selects, or controls. Input contrast and focus states are tuned only against Default; off-theme inputs fail accessibility and read as broken.

### Dark theme is for sections, not pages

- **Do** use Green Dark to highlight specific sections.
- **Don't** stack multiple Green Dark sections back to back without a visual break — the page loses rhythm and the dark sections stop reading as emphasized.

### Preserve semantic color meaning

- **Do** keep alert colors stable — caution is amber, danger is desert-rose, success is eco-green. Use `text/danger` and the danger backgrounds only for error states.
- **Don't** redefine what a color represents per context (e.g., using desert-rose as a brand accent in a marketing band). The same color must mean the same thing everywhere or the system stops communicating.

## How to use in Figma

### Picking the right token

Tokens are namespaced in the Figma variable picker by role. Search keywords:

- `text` for foregrounds, `background` (or `bg`) for surfaces, `border` for outlines.
- Add the slot to narrow further: `text/action`, `background/primary-inverse`, `border/danger-highlight`.

If the variable picker shows two tokens with the same hex value, pick by *role*, not by value — `border/secondary` and `text/secondary` resolve to the same gray today but will diverge if the secondary text ramp shifts.

### Theming a section

1. Wrap the section frame in a component or auto-layout container themed via Figma variable modes.
2. Switch the mode to the target theme (`default`, `green-light`, `green-dark`, `marigold`, `stone-light`).
3. Every variable-bound color in that subtree updates automatically.
4. Forms inside the section still use Default — re-wrap form children in a Default-themed container.

### Before handoff

Walk the file and check fills, strokes, and text colors for raw hex values. **Re-bind any raw value to a variable** — a raw hex is a detached color decision that won't follow updates and gives engineering nothing to map to. The Figma panel calls this out explicitly; treat it as a hard gate on hand-off.

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

## Figma source references

- Color Overview: node `18445:832`
- Color Themes and Usage: node `17950:8787`
- Color Accessibility: node `18829:465`
- Color Guidelines: node `18296:7293`

File: `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 — WIP)
