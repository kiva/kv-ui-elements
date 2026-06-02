---
name: spacing
description: Semantic spacing system from the Kiva design system — token categories (Structure, Component Gap, Component Inset, Micro), the 4px-grain ramp, responsive per-tier values, and rules for picking a token by spatial relationship rather than pixel value. Sourced from Figma; values describe design intent and may diverge from current code implementation.
when_to_use: When designing or implementing any UI that involves space — section gaps, component padding, gaps inside a component, padding inside a card or modal, or any auto-layout gap/padding decision in Figma. Use it whenever someone reaches for a raw pixel value, or when picking between two tokens that happen to share the same number. Reference design intent first; verify token names against current code before relying on them.
make_kit:
  include: true
  category: foundations
  order: 40
---

# Kiva Spacing

## Source of truth

This skill captures the **semantic spacing system** as defined in Figma (the Kiva Ecosystem 2026 file). Figma is the canonical source for design intent: which categories exist, what each token means, when to use it, and how spacing values are expected to scale across breakpoints.

Numeric values and token names in this document reflect the Figma specifications. The shipped code in `@kiva/kv-tokens` may temporarily lag behind these specs while the token sync work is in progress. **Verify any token reference against the current code before depending on it.** See "Outstanding discrepancies" at the end of this skill for known gaps.

## Why spacing matters

Spacing is the invisible structure that holds an interface together. It creates relationships: grouping elements that belong together, separating elements that don't, and guiding a user's eye from one piece of content to the next. On Kiva, spacing shapes how borrowers read loan details, how lenders scan the stories, and how partners navigate their dashboards.

Common alternative names you may see used interchangeably: **padding**, **gap**, **layout**.

## Design principles

1. **Name the relationships.** Each spacing value should represent a clear intent — group related elements, separate distinct sections, indicate hierarchy, improve readability and scanning. *If you can't explain why a space exists, reconsider it.*
2. **Stay on the grid.** Every value is a 4px multiple. The spacing system shares its grid with typography and layout — reusing tokens across screens creates rhythm and reduces visual noise.
3. **Spacing signals hierarchy.** A larger space implies separation; a medium space implies "related but distinct"; a smaller space implies grouping. Hierarchy should be readable even with color and typography stripped away.

## The "between or inside" decision

When picking a token, start with the spatial relationship — not with a pixel value:

> **Am I spacing *between* things, or *inside* something?**

- **Between** → reach for **Structure** (page-scale) or **Component / Gap** (inside-a-component scale).
- **Inside** → reach for **Component / Inset** (padding within a bordered container).

The same number can mean two different things (16px as a card gap is not the same intent as 16px of internal card padding). Picking by category first keeps that distinction explicit.

## Semantic token categories

Token values are responsive: most tokens hold a single value across tiers, but a few shrink on mobile. Always apply the token, not a raw px — the responsiveness is the point.

### Structure

The large-scale spaces that shape a page's overall layout and breathing room. Use *between* sections and large compositions on a page.

| Token | Desktop | Tablet | Mobile | Example use |
|---|---|---|---|---|
| **XL** | 32px | 32px | 24px | Between major page sections (hero → content, content → footer) |
| **L** | 24px | 24px | 16px | Between large components |
| **M** | 16px | 16px | 16px | Between components |
| **S** | 8px | 8px | 8px | Between header and subheader |

### Component / Gap

Space between sibling elements *inside* a component. The internal breathing room of a component.

| Token | Desktop | Tablet | Mobile | Example use |
|---|---|---|---|---|
| **L** | 16px | 16px | 16px | Between cards in a grid |
| **M** | 8px | 8px | 8px | Between content and button inside a card; list-item internal spacing |
| **S** | 4px | 4px | 4px | Between tags or text elements in compact contexts |

### Component / Inset

Padding *inside* containers. Anything with a visible boundary — modals, cards, sidesheets, chips — gets inset padding.

| Token | Desktop | Tablet | Mobile | Example use |
|---|---|---|---|---|
| **XL** | 32px | 24px | 20px | Padding for modals, lightboxes, sidesheets, popups |
| **L** | 24px | 24px | 20px | Padding for large widgets, expanded panels, feature sections |
| **M** | 16px | 16px | 16px | Padding for medium cards, standard content containers |
| **S** | 8px | 8px | 8px | Padding for small cards, compact containers |
| **XS** | 4px | 4px | 4px | Padding for location chips, tags, badges |

### Micro

A single 4px value reserved for the **tightest inline coupling** — gaps that exist only to keep adjacent elements visually attached, not to imply hierarchy.

| Token | Desktop | Tablet | Mobile | Example use |
|---|---|---|---|---|
| **Micro** | 4px | 4px | 4px | Gap between icon + text pairs, small inline elements, gaps inside compact UI patterns |

## The raw spacing ramp

Underneath the semantic categories is a numeric ramp that is **4px-grained** — every token is a 4px multiple, and adjacent steps on the ramp are 4px apart. Every semantic token resolves to a value on this ramp, and the same ramp underpins layout values (gutters, margins) and any other dimension token in the system.

Token naming uses two kinds of step:

- **Whole-number tokens** (`1`, `2`, `3`…) land on the 8px multiples of the scale — `1` = 8px, `2` = 16px, `3` = 24px, etc. These are the most commonly reached-for values.
- **Half-step tokens** (`0-5`, `1-5`, `2-5`…) fill in the 4px steps between — `0-5` = 4px, `1-5` = 12px, `2-5` = 20px, etc.

Despite the `-5` naming, the half-steps are not "less canonical." They're first-class values on the same 4px scale. The Figma Spacing Ramp panel frames the system around an 8px base unit: *"The 8px base unit … forms the basis of our space token system, as the base unit `spacing 1`. Every space token is a multiple of this base unit."* That last claim is misleading — the half-step tokens (`0-5` = 4px, `1-5` = 12px, `2-5` = 20px) are **not** multiples of 8px. Treat the scale as **4px-grained** throughout, which matches both the Spacing Overview panel's "Every value is a 4px multiple" principle and the shipped code.

Quick formula: `N` = `N × 8px`, and `N-5` = `N × 8px + 4px` — both of which simplify to "the Nth and (N + ½)th rung of a 4px ramp."

| Token | px | rem | | Token | px | rem |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | | 8-5 | 68 | 4.25 |
| 0-5 | 4 | 0.25 | | 9 | 72 | 4.5 |
| 1 | 8 | 0.5 | | 9-5 | 76 | 4.75 |
| 1-5 | 12 | 0.75 | | 10 | 80 | 5 |
| 2 | 16 | 1 | | 10-5 | 84 | 5.25 |
| 2-5 | 20 | 1.25 | | 11 | 88 | 5.5 |
| 3 | 24 | 1.5 | | 11-5 | 92 | 5.75 |
| 3-5 | 28 | 1.75 | | 12 | 96 | 6 |
| 4 | 32 | 2 | | 12-5 | 100 | 6.25 |
| 4-5 | 36 | 2.25 | | 13 | 104 | 6.5 |
| 5 | 40 | 2.5 | | 13-5 | 108 | 6.75 |
| 5-5 | 44 | 2.75 | | 14 | 112 | 7 |
| 6 | 48 | 3 | | 14-5 | 116 | 7.25 |
| 6-5 | 52 | 3.25 | | 15 | 120 | 7.5 |
| 7 | 56 | 3.5 | | 15-5 | 124 | 7.75 |
| 7-5 | 60 | 3.75 | | 16 | 128 | 8 |
| 8 | 64 | 4 | | | | |

The raw ramp is the layer the **Tailwind config** ships today (e.g., `tw-p-2.5` = 20px). The semantic categories above are not yet exposed in code — see "Outstanding discrepancies."

> **Caveat about the Figma table:** the Spacing Scales & Tokens panel in Figma has typos in the `rem` column from row `10-5` onward (the values appear to have wrapped), and the panel labels the bottom two rows as `16 = 124px` and `16-5 = 128px` when they are actually `15-5` and `16` on the ramp. The shipped `tokens/core/size.json` is authoritative — trust it (and the formula above) over the rendered Figma table.

## Best practices

### Apply spacing by *meaning*, not values

- **Do** select spacing tokens based on their intended semantic purpose. Use **Component / Gap** for spacing between elements *inside* a component, and **Component / Inset** for the container's padding. Semantic consistency keeps layouts predictable, scalable, and easier to refactor.
- **Don't** substitute tokens across categories just because the pixel values happen to match. Picking by number alone breaks system logic and makes the system harder to evolve — when the value behind `Inset M` shifts later, you don't want stray `Gap M`s following along.

### A worked example (single card on a page)

Reading from outside in on a typical loan-style card:

1. **Structure XL** — space between the card section and the next page section.
2. **Component Inset XL** — padding inside the card.
3. **Component Inset L** — padding inside a sub-region of the card.
4. **Component Gap L** — vertical space between stacked content blocks inside the card (e.g., body → CTAs).
5. **Component Gap S** — tight space between a small heading and its supporting paragraph.

The mobile variant of the same card shifts insets down a tier (XL → 20px, L → 20px) and replaces Structure XL's 32 with 24 — all driven by the same tokens, automatically.

## Implementation in Figma

### Responsive spacing

Apply spacing tokens using Figma's **variable modes**. The token holds responsive values; switching modes refreshes everything bound to it.

1. Find **Appearance** in the right panel.
2. Click the component and select the variable mode (`lg` for desktop, `md` for tablet, `sm` for mobile).
3. When switching a frame's tier, change the mode to match the breakpoint.
4. Responsive tokens then update automatically.

### Finding the right token

Spacing tokens are organized by category in Figma's variable picker. Use the category to narrow results quickly.

- Search keywords: `gap`, `inset`, `structure`.
- Tokens are namespaced like `spacing/component/gap`, `spacing/component/inset`, `spacing/structure`.
- If you're unsure which category fits, ask the "between or inside" question first.

### Before handoff

Check auto-layout properties on key frames. If you see a raw number instead of a variable name, **re-bind it from the library** — a raw value is a detached spacing decision that won't follow updates and gives developers nothing to map to.

## Usage rules

### Do

- Pick the token by **category first**, then size.
- Apply tokens via Figma variables (or, in code, via the Tailwind utility) — never as raw px in an inline style.
- Let responsive tokens do the per-tier work; don't author one-off mobile values when an existing token already encodes the shift.
- Re-use the same token for spaces that mean the same thing across screens, even when the surrounding components differ.

### Don't

- Don't substitute tokens across categories because the pixel value happens to match (`Inset M` ≠ `Gap M` even if both are 16px today).
- Don't reach for a raw `tw-p-[18px]` or `gap: 18px` — if no token fits, that's a design-system conversation, not a one-off override.
- Don't mix `Micro` with the other categories for hierarchy. Micro is for *coupling*, not separation.
- Don't leave detached spacing values in Figma at handoff.

### Need something not covered here?

Open a request with the design system team. Include the use case, the component, and why the existing categories or tokens don't fit.

## Using with Tailwind

The spacing utilities come from the `@kiva/kv-tokens` Tailwind preset. Haven't registered it yet? See [tailwind → Consuming the preset](../kiva-tailwind-css/SKILL.md#consuming-the-preset). Not using the preset? See [Without the preset](#without-the-preset) below.

The preset wires every value on [the raw spacing ramp](#the-raw-spacing-ramp) into the standard spacing utilities — `tw-p-*`, `tw-m-*`, `tw-gap-*`, `tw-space-*`, etc. all flow from the `space` scale. The thing to internalize: this is an **8px scale with 4px half-steps**, so the same number means a different size than stock Tailwind — `tw-p-4` is **32px** here, not 16px. See [tailwind → Spacing is an 8px scale](../kiva-tailwind-css/SKILL.md#spacing-is-an-8px-scale-with-4px-half-steps).

Three key-naming conventions describe the same tokens — don't get tripped up:

- **Tailwind classes** use dots: `tw-p-0.5`, `tw-p-1`, `tw-p-1.5`, `tw-p-2.5` (4px, 8px, 12px, 20px).
- **`tokens/core/size.json`** (the authoritative source) uses underscores: `0_5`, `1`, `1_5`, `2_5`.
- **Figma's variable picker** uses hyphens: `0-5`, `1`, `1-5`, `2-5`.

The shipped code exposes this **raw numeric ramp**, not the semantic categories above — verify a value against `@kiva/kv-tokens/tokens/core/size.json` before depending on it. Express responsive shifts with breakpoint prefixes (`tw-p-2.5 md:tw-p-3 lg:tw-p-4`); note there is **no `sm` screen** — mobile is the unprefixed default.

### Without the preset

- **Kiva (or Kiva-adjacent) repo, preset not registered yet:** install and register it — [tailwind → Consuming the preset](../kiva-tailwind-css/SKILL.md#consuming-the-preset).
- **Stock-Tailwind / non-Kiva project:** the ramp is plain px, so the values in [the raw spacing ramp](#the-raw-spacing-ramp) table can be applied as arbitrary values (`p-[20px]`) or used to define your own scale. These are point-in-time copies.

## Outstanding discrepancies

- **No shipped semantic spacing tokens.** `structure-xl`, `component-gap-l`, `component-inset-xl`, `micro`, etc. do not exist in code — the semantic layer lives only in Figma variables today. In code, express the intent by picking the matching ramp value (optionally with a comment or a thin component wrapper).
- **No responsive spacing tokens.** Figma encodes per-tier shifts (e.g. `Inset XL` is `32 / 24 / 20`); the code does not. Today, responsive shifts must be done with Tailwind responsive prefixes.

When you find a divergence between this skill and the shipped tokens, flag it — each is a data point for the design-system team.

## Figma source references

- Spacing Overview: node `17285:6968`
- Spacing Scales & Tokens: node `17285:6976`
- Spacing Guidelines: node `17285:6981`

File: `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 — WIP)
