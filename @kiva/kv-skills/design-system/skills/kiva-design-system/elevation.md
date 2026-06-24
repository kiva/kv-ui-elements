---
name: elevation
description: Elevation (shadow) token system from the Kiva design system — the three interaction-state shadow tokens (elevation/default, elevation/hover, elevation/click-active), their exact shadow values, the rest → lift → settle interaction flow, Do/Don't usage rules, and the `tw-shadow-*` mappings. In Kiva, elevation communicates interaction state, not depth or layering. Sourced from Figma; values describe design intent and may diverge from current code implementation.
when_to_use: When designing or implementing shadows on interactive surfaces — cards, banners, tiles, buttons, anything that lifts on hover or settles on click. Use it whenever someone reaches for a one-off `box-shadow`, picks a `tw-shadow-*` utility, needs the resting / hover / active shadow for a component, or is deciding whether a shadow should convey interaction state (yes) versus depth or stacking (no — that's out of scope). Reference design intent first; verify token names against current code before relying on them.
make_kit:
  include: true
  category: foundations
  order: 80
---

# Kiva Elevation

## Source of truth

This skill captures the **elevation system** as defined in Figma (the Kiva Ecosystem 2026 file). Figma is the canonical source for design intent: which shadow tokens exist, the exact value of each, what interaction state each represents, and how to choose between them.

Numeric values, token names, and class references in this document reflect the Figma specifications. The shipped code in `@kiva/kv-tokens` may temporarily lag behind these specs while the token sync work is in progress. **Verify any token reference against the current code before depending on it.** See "Outstanding discrepancies" at the end of this skill for known gaps.

## About

Elevation uses shadow to communicate interactive surface states. It helps users understand when a surface is available for interaction, responding to attention, or actively engaged.

Kiva uses elevation to communicate **interaction states**, not page hierarchy, z-index, or layer depth.

Common alternative names you may see used interchangeably: **shadows**, **drop shadows**, **shadow tokens**.

## Design principles

1. **State over depth.** In Kiva, elevation communicates interaction state rather than physical depth. Shadows help users understand when a surface is available, hovered, or active.
2. **Token-first.** Use an elevation token instead of creating a one-off shadow. Tokens keep shadows consistent across Figma, Storybook, and code. Avoid adjusting blur, opacity, spread, or direction manually unless the design system introduces a new token.
3. **Elevation is not layering.** The new elevation guidance focuses on semantic interaction states. Some existing components may still use shadow for layering or surface separation. Those current uses are outside this interactive elevation guidance and can remain until overlay / layering guidance is defined separately.

## Shadow tokens

Three tokens, one per interaction state. All are drop shadows in pure black (`#000000`) with the opacity — not the color — doing the work. Pick by **what the surface is doing**, not by eyeballing a shadow.

| Token | Type | X | Y | Blur | Opacity | Color | Purpose |
|---|---|---|---|---|---|---|---|
| **elevation/default** | Drop shadow | 0px | 4px | 12px | 8% | #000000 | Shows an interactive surface is available |
| **elevation/hover** | Drop shadow | 0px | 4px | 16px | 16% | #000000 | Confirms the surface is responding to the pointer |
| **elevation/click-active** | Drop shadow | 0px | 4px | 12px | 8% | #000000 | Shows the surface has settled after interaction |

> **Same value, different state.** `elevation/default` and `elevation/click-active` currently share the same shadow value (`0 4px 12px` at 8%), but they represent different moments in the interaction cycle. **Default** means the surface is ready to use. **Click/active** means the surface has responded and settled after interaction. Keep both token names in use even though the value is identical today — they may diverge, and the name documents intent.

## Interaction flow

Elevation states follow a simple flow: the surface starts at rest, lifts on hover, and settles after click or activation.

> **Rest** (`elevation/default`) → **Lift** (`elevation/hover`) → **Settle** (`elevation/click-active`)

The hover state is the only "lifted" step — its larger blur (16px) and doubled opacity (16%) read as the surface rising toward the pointer. On settle, it returns to the resting shadow value.

## Best practices

### Support interactivity

- **Do** apply elevation to surfaces that respond to user input. Shadow acts as a tactile affordance, helping users understand that the surface is interactive.
- **Don't** use elevation on static or decorative elements. Shadows can create a false affordance and make users think a surface is clickable.

### Show responsive feedback

- **Do** use `elevation/hover` to confirm interactivity when the pointer enters a surface. The visual lift helps users understand that the element is responsive.
- **Don't** leave hover and resting states visually identical for elevated interactive surfaces. Without a visible response, users may second-guess whether the element is clickable.

### Keep sibling surfaces equal

- **Do** use consistent elevation for sibling surfaces. Equal shadows help users understand that items share the same level of importance and interaction.
- **Don't** mix shadow depths within a group to create emphasis. This breaks the rhythm of the layout and can make one surface feel more interactive or important than its peers.

## How to use in Figma

Elevation tokens are published as effect styles / variables in the Kiva Ecosystem library, named by interaction state (`elevation/default`, `elevation/hover`, `elevation/click-active`).

- Apply the named elevation style rather than typing blur / opacity / offset values by hand.
- Don't adjust blur, spread, opacity, or direction on an applied token — if a surface needs something the three tokens don't cover, that's a design-system conversation, not a one-off.
- Before handoff, inspect the layer: if the effect shows raw values instead of a named elevation style, **re-bind it from the library** so developers have a token to map to.

## Using with Tailwind

Shadow utilities come from the `@kiva/kv-tokens` Tailwind preset. Haven't registered the preset yet? See the **kiva-tailwind-css** skill (kiva-design-to-code plugin) → "Consuming the preset". Not using the preset at all? See [Without the preset](#without-the-preset) below.

There are **no semantic `elevation/*` utilities yet** — the elevation tokens are named by interaction state, but the preset only ships generic `tw-shadow` utilities. The mappings below are the temporary implementation bridge Figma specifies until dedicated semantic elevation utilities are added.

| Elevation token | Tailwind utility | Status |
|---|---|---|
| `elevation/default` | `tw-shadow-lg` | Ships — exact match (`0 4px 12px` at 8%) |
| `elevation/hover` | `tw-shadow-xl` | **Proposed — not shipped.** No utility currently produces the `0 4px 16px` at 16% hover shadow |
| `elevation/click-active` | `tw-shadow-lg` | Ships — same value as default |

`tw-shadow-default` (the bare `tw-shadow`, `0 1px 4px` at 8%) is **not part of the elevation model** — the preset's default shadow is lighter than `elevation/default` and isn't one of the three semantic states. Don't reach for it when you mean an interaction-state shadow.

**Shipped today** (verify against `@kiva/kv-tokens/configs/tailwind.config.js → theme.boxShadow` before depending):

- `tw-shadow` → `0 1px 4px 0 rgb(0 0 0 / 0.08)` (the `DEFAULT` key)
- `tw-shadow-lg` → `0 4px 12px rgba(0, 0, 0, 0.08)` (matches `elevation/default` / `elevation/click-active`)

Because `boxShadow` is set on `theme` (not `theme.extend`), it **replaces** the stock Tailwind shadow scale — `tw-shadow-sm`, `tw-shadow-md`, `tw-shadow-xl`, `tw-shadow-2xl`, and `tw-shadow-inner` do **not** exist in this preset. Only `tw-shadow` and `tw-shadow-lg` are available.

### Without the preset

- **Kiva (or Kiva-adjacent) repo, preset not registered yet:** install and register it — the **kiva-tailwind-css** skill (kiva-design-to-code plugin) → "Consuming the preset". Until then, arbitrary values (`shadow-[0_4px_12px_rgba(0,0,0,0.08)]`) are a stopgap.
- **Stock-Tailwind / non-Kiva project:** replicate the intent from the [shadow tokens table](#shadow-tokens) as arbitrary values — `elevation/default` and `elevation/click-active` are `shadow-[0_4px_12px_rgba(0,0,0,0.08)]`; `elevation/hover` is `shadow-[0_4px_16px_rgba(0,0,0,0.16)]`. These are point-in-time copies of the token values; re-check them if the tokens change.

## Outstanding discrepancies

- **Shadows are not tokenized in the JSON token source.** The `boxShadow` scale is hardcoded directly in `configs/tailwind.config.js`; there are no shadow entries in `tokens/core/*.json`. A sync gap worth closing so elevation flows from tokens like the rest of the system.
- **No semantic `elevation/*` utilities ship.** The Figma tokens are named by interaction state, but code only has generic `tw-shadow` / `tw-shadow-lg`. Adding `tw-shadow-elevation-default` / `-hover` / `-click-active` (or equivalent) would close the naming gap; the Figma panel explicitly frames the current generic utilities as "temporary implementation mappings until dedicated semantic elevation utilities are added."
- **`elevation/hover` has no shipped utility.** Its value (`0 4px 16px` at 16%) maps to a *proposed* `tw-shadow-xl` that does not exist in the preset. Until it's added, the hover elevation can only be expressed via an arbitrary value.

When you find a divergence from the shipped tokens, flag it — each is a data point for the design-system team.

## Figma source references

- Elevation Overview: node `19910:612` (scale strip, About, design principles)
- Elevation Tokens & Values: node `19910:468` (shadow tokens table, interaction flow, Tailwind mapping)
- Elevation Guidelines: node `19910:353` (Best Practices — Support interactivity / Show responsive feedback / Keep sibling surfaces equal)

File: `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 — WIP)
