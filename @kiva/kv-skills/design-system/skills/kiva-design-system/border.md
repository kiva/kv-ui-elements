---
name: border
description: Border token system from the Kiva design system — the stroke-weight scale (1px resting / hover / active, 2px emphasis, 2px dashed, none) paired with semantic border colors, the weight-as-signal model, per-component usage recommendations, and Do/Don't rules. Sourced from Figma; values describe design intent and may diverge from current code implementation.
when_to_use: When designing or implementing any UI element with a stroke — form inputs, dropdowns, cards, secondary buttons, selected/error states, empty-state placeholders, dividers. Use it whenever someone reaches for a raw border-width value, picks a `tw-border-*` utility, signals selection or error with a border, or chooses between solid and dashed. Reference design intent first; verify token names against current code before relying on them.
make_kit:
  include: true
  category: foundations
  order: 70
---

# Kiva Border

## Source of truth

This skill captures the **border system** as defined in Figma (the Kiva Ecosystem 2026 file). Figma is the canonical source for design intent: which width and style tokens exist, what each communicates, and how to choose between them for any given component state.

Numeric values, token names, and class references in this document reflect the Figma specifications. The shipped code in `@kiva/kv-tokens` may temporarily lag behind these specs while the token sync work is in progress. **Verify any token reference against the current code before depending on it.** See "Outstanding discrepancies" at the end of this skill for known gaps.

## About

Borders help organize and emphasize interface elements through a combination of **width** and **color** tokens. Width defines the level of visual emphasis, while color provides contextual meaning. Together, these tokens help define purposes such as separation, hierarchy, and interactive states.

A border is two decisions, not one: pick a **width** from the scale below for the level of emphasis, and pair it with a semantic **border color** (from the [color](color.md) system) for the contextual meaning. Width without the right color reads as noise; color without the right width can be missed.

Common alternative names you may see used interchangeably: **stroke**, **outline**, **border width**.

## Design principles

1. **Weight as signal.** Border weight communicates state. 1px = resting, 2px = active / selected / error. Never use heavy borders on resting elements.
2. **Style discipline.** Solid borders for all filled content. Dashed borders exclusively for empty / unearned states. Never mix styles in the same component.
3. **Token-first.** Always reference the token, never hardcode pixel values. Interactive states use `--border-hover` and `--border-active` for subtle visual feedback.

## The scale

Border weight is the emphasis dial. Pick the width by the element's **state**, not by eyeballing a stroke.

| Token | Width | Style | What it signals |
|---|---|---|---|
| **default** | 1px | solid | Resting state — the baseline for all standard bordered elements |
| **hover** | 1px | solid | Pointer hover on an interactive element — subtle feedback |
| **active** | 1px | solid | Active / focus interaction — subtle feedback |
| **emphasis** | 2px | solid | Selected, error, or open state — the element is "lit up" |
| **dashed** | 2px | dashed | Empty / unearned placeholder containers only |
| **none** | 0 | none | Filled elements that carry their emphasis through fill, not stroke (e.g. primary buttons) |

Hover and active share the **1px** resting width — they differ from `default` by **color** (`--border-hover` / `--border-active`), not weight. The only width step up the scale is **2px** for emphasis. Width alone has just two live values: 1px and 2px.

## Usage recommendations

The canonical width-token → component-state mapping, pairing each width with the semantic border color it's meant to carry.

| Width | Border color token(s) | Use cases |
|---|---|---|
| **1px** | `--border-default` | Form input (entered), dropdown, secondary button, card |
| **1px** | `--border-secondary-disabled` | Disabled input |
| **1px** | `--border-hover`, `--border-active` | Input hover, active interaction |
| **2px** | emphasis — `--border-action` (selected) / danger (error) | Selected card, error input, open dropdown |
| **2px dashed** | empty state | Empty badge / placeholder container |
| **none** | `border: none` | Primary button |

Selected states pair the **2px** weight with `--border-action`; error states pair **2px** with the danger border color. The weight change is what makes the signal survive for users who can't rely on color alone (see Best Practices, below).

## Best practices

### Keep resting elements light

- **Do** use 1px (`--border-default`) for all resting form controls. Lightweight borders keep the UI clean and let content lead.
- **Don't** use 2px or thicker borders on resting elements. Heavy borders at rest compete with content and create visual noise.

### Pair weight with color for state changes

- **Do** use 2px with `border-action` for selected states. The combined weight + color change ensures the selection signal is never color-only.
- **Don't** signal selection with a color change alone at the same weight. Users with low vision may miss a color-only shift. Always pair weight + color.

### Reserve dashed borders for emptiness

- **Do** use dashed borders only for empty / unearned placeholder containers. The dashed pattern signals "content goes here" at a glance.
- **Don't** use dashed borders on filled content containers. Dashed borders imply emptiness, which contradicts the presence of content inside.

## How to use in Figma

Border width and border color are published as variables in the Kiva Ecosystem library. When applying a border:

- Bind the stroke weight to the border-width variable and the stroke color to the border-color variable instead of typing raw values.
- Hover a variable to see its value and intended use cases.
- Solid vs. dashed is a style decision, not a width decision — keep the style consistent within a single component.
- Before handoff, inspect the frame: if the stroke shows a raw number or hex instead of a variable name, **re-bind it from the library**. A raw value is a detached decision that won't follow updates and leaves developers without a token to map to.

## Using with Tailwind

Border utilities come from the `@kiva/kv-tokens` Tailwind preset. Haven't registered the preset yet? See the **kiva-tailwind-css** skill (kiva-design-to-code plugin) → "Consuming the preset". Not using the preset at all? See [Without the preset](#without-the-preset) below.

A border in code is the same two decisions as in Figma — **width** and **color** — expressed as separate utilities:

- **Width** — `tw-border` (the bare class) is the `DEFAULT` 1px resting weight; `tw-border-2` is the 2px emphasis weight. Reach for `tw-border` on resting elements and `tw-border-2` for selected / error / open states, mirroring the [scale](#the-scale) above.
- **Style** — dashed comes from stock Tailwind's `tw-border-dashed`; pair it with `tw-border-2` for the 2px-dashed empty-state treatment. Solid is the default and needs no class.
- **Color** — apply a semantic border color with `tw-border-{slot}` (e.g. `tw-border-action` for selected, a danger slot for error). These are the same themable color slots documented in the [color](color.md) skill — never a hex value or a raw primitive.

**Shipped today** (verify against `@kiva/kv-tokens/configs/tailwind.config.js → theme.borderWidth` and the semantic `border` color block before depending):

- `tw-border` → `1px` (the `DEFAULT` key, the only width sourced from `tokens/core/size.json → border-width.default`)
- `tw-border-0` → `0px`, `tw-border-2` → `2px`, `tw-border-4` → `4px`, `tw-border-8` → `8px` (these four are hardcoded in the preset, **not** token-sourced)
- Border **colors** ship as the semantic slots `primary`, `primary-inverse`, `secondary`, `tertiary`, `action`, `action-highlight`, `caution`, `caution-highlight`, `danger`, `danger-highlight` — each exposed as `tw-border-{slot}` and themed per active theme.

Resting, hover, and active all use the same 1px width (`tw-border`); they differ only by border color. The single width step up the scale is `tw-border-2` for emphasis — see "Outstanding discrepancies" for what is and isn't token-backed.

### Without the preset

- **Kiva (or Kiva-adjacent) repo, preset not registered yet:** install and register it — the **kiva-tailwind-css** skill (kiva-design-to-code plugin) → "Consuming the preset". Until then, arbitrary values (`border-[2px]`) are a stopgap.
- **Stock-Tailwind / non-Kiva project:** replicate the intent from the [scale](#the-scale) — `border` (1px), `border-2` (2px), `border-dashed` — and pull border colors from `@kiva/kv-tokens/css` (the `--border-*` custom properties) so runtime theming is preserved. Hardcoded hex values are a point-in-time copy and lose theming; re-check them if the tokens change.

## Outstanding discrepancies

- **Border *width* is almost entirely un-tokenized in code.** Only `border-width.default` (1px) exists in `tokens/core/size.json`; the `tw-border-0/2/4/8` steps are hardcoded in the Tailwind preset. The 2px emphasis weight is only available via the hardcoded `tw-border-2`, not a named token. Closing this means adding an `emphasis` width token (2px) to the core size scale.
- **Border *color* tokens referenced in Figma that don't ship yet.** The Usage Recommendations panel names these color slots; the shipped semantic `border` block only includes `action`:
  - `--border-default`
  - `--border-hover`
  - `--border-active`
  - `--border-secondary-disabled`

When you find a divergence from the shipped tokens, flag it — each is a data point for the design-system team.

## Figma source references

- Border Overview: node `19661:2006` (scale strip, About, design principles)
- Border Scale: node `19661:2006` (same panel as Overview)
- Border Guidelines: node `19661:1774` (Best Practices, Usage Recommendations)

File: `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 — WIP)
