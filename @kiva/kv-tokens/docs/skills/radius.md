---
name: radius
description: Border-radius token system from the Kiva design system — the 8-step scale from none (0px) to full (9999px), per-component use cases, the inner-radius formula for nested elements, and rules for keeping corners consistent. Sourced from Figma; values describe design intent and may diverge from current code implementation.
when_to_use: When designing or implementing any UI that has corners — buttons, cards, modals, inputs, chips, tags, avatars, images, section frames. Use it whenever someone reaches for a raw px corner-radius value, when nesting one rounded element inside another, or when picking a Tailwind `tw-rounded-*` utility. Reference design intent first; verify token names against current code before relying on them.
---

# Kiva Radius

## Source of truth

This skill captures the **border-radius system** as defined in Figma (the Kiva Ecosystem 2026 file). Figma is the canonical source for design intent: which tokens exist, what each represents, and how to choose between them for any given component.

Numeric values, token names, and class references in this document reflect the Figma specifications. The shipped code in `@kiva/kv-tokens` may temporarily lag behind these specs while the token sync work is in progress. **Verify any token reference against the current code before depending on it.** See "Current code state" at the end of this skill for known gaps.

## Why radius matters

Radius shapes the corners of UI elements — and corner shape communicates **warmth, hierarchy, and interactivity**. Kiva's system defines 8 tokens running from square (`none`) to fully rounded (`full`), each mapped to a specific component family.

Using defined tokens instead of arbitrary values gets us three things:

1. Visual consistency across screens and components.
2. **Concentric corners** — proportional relationships between nested elements so corner curves look intentional.
3. Cleaner design-to-engineering handoff with no surprise pixel values to translate.

Common alternative names you may see used interchangeably: **border radius**, **rounding**, **corner radius**.

## Design principles

1. **Contextual hierarchy.** Radius signals element importance. Larger tokens (`base`, `lg`, `xl`) mark prominent interactive surfaces — buttons, cards, section frames. Smaller tokens (`xs`, `sm`) serve utility-first components like inputs and chips.
2. **Concentric consistency.** When elements are nested, the inner radius equals the outer radius minus the gap (see the [inner-radius formula](#inner-radius-the-concentric-formula)). A flat inner corner inside a rounded outer corner reads as unintentional.
3. **Scale discipline.** Always reach for a token — in design and in code. Never introduce arbitrary radius values. This keeps the system predictable, token-auditable, and clean for engineering handoff.

## The scale

Each token pairs a value with a component family. Pick by what the component *is*, not by eyeballing a curve.

| Token | Value | Tailwind class | Use cases |
|---|---|---|---|
| **none** | 0px | `tw-rounded-none` | Table cells; marketing photos as needed |
| **xs** | 4px | `tw-rounded-xs` | Form inputs, dropdowns, text areas, combo boxes |
| **sm** | 8px | `tw-rounded-sm` | Chips, table frame, large rectangular achievement badges |
| **md** | 12px | `tw-rounded-md` | Tooltips, stats tiles, selection tiles, sticky banners/footers, images, photos |
| **base** | 16px | `tw-rounded` | Buttons, modal, lightbox, toast, bottom sheet, mini cards |
| **lg** | 20px | `tw-rounded-lg` | All standard card outer corners, loan cards, slider cards, desktop images (except branding/marketing) |
| **xl** | 24px | `tw-rounded-xl` | Section frame |
| **full** | 9999px | `tw-rounded-full` | Icon buttons, tags / small badges, avatars, toggles |

### Anatomy of a token

Every radius token is defined by three properties:

- **Token name** — the identifier used in Figma and code. The 16px token is named **`base`** in Figma (renamed for visual consistency with the `xs / sm / md / lg / xl` scale; Figma treats the older **`default`** as the legacy name). In code it is still **`default`**, because Tailwind's `DEFAULT` key convention is what generates the unsuffixed `tw-rounded` utility. The two names refer to the same token — each is the one to type in its own surface.
- **Pixel value** — the corner radius. The scale runs `0, 4, 8, 12, 16, 20, 24, 9999`.
- **Tailwind class** — the utility generated from the token. Because the 16px token maps to the **`DEFAULT`** key in Tailwind, the utility is just `tw-rounded` (no suffix).

### The `tw-rounded` gotcha

In stock Tailwind, `rounded` (no suffix) is a small radius — pill-shaped corners come from `rounded-full`. In **Kiva's Tailwind preset** that's not true: `tw-rounded` resolves to **16px** (the `base` token), not to a pill. Use **`tw-rounded-full`** when you want a pill or circle.

If you're porting code from a standard Tailwind project, audit every bare `rounded` — what was a subtle curve there is a noticeably rounded 16px corner here.

## Inner radius — the concentric formula

When a component is nested flush inside a container, calculate its corner radius:

> **inner radius = outer radius − gap**

This prevents *visual inversion* — the failure mode where inner corners look larger than outer corners, which breaks the spatial hierarchy.

Worked examples (outer / gap → content):

| Outer | Gap | Content (inner) |
|---|---|---|
| 16px | 8px | 8px |
| 20px | 8px | 12px |
| 20px | 16px | 4px |
| 24px | 16px | 8px |

### When math suggests something awkward

For some cases, lean into an **8px radius** for a more effortless look, even if the formula suggests 4px. Treat the formula as a baseline, not a tyrant — the goal is optical consistency, not strict arithmetic.

### Independent content — when not to use the formula

When inner elements are **clearly independent** of the container (e.g., mini cards laid out inside a wide banner, where the cards have their own visual identity), the inner element should use its **own component token radius** rather than the container's formula.

The one constraint that still holds: **inner radius must always be ≤ outer radius**. Even with independent content, never let a child have a more rounded corner than its parent — that's visual inversion in the other direction.

## Best practices

### Use the formula inside a card

- **Do** compute the inner radius from the outer + gap when content sits flush inside a rounded container.
- **Don't** use a flat `0px` corner radius inside a rounded container. Always calculate the inner radius.

### Keep corners symmetric unless there's a structural reason

- **Do** apply the same radius to all four corners of a component.
- **Don't** apply different radius values to different corners arbitrarily. Asymmetric rounding reads as inconsistency unless it has a structural justification — for example, a card visually attached to the bottom of a tab bar where the top corners are flat to indicate continuity.

## Component → token quick reference

For fast lookup at design or build time, here's the inverse of the table above — common component types and the token they map to:

| Component | Token | Class |
|---|---|---|
| Dropdown, text input, text area, combo box | `xs` | `tw-rounded-xs` |
| Chip, table frame, achievement badge | `sm` | `tw-rounded-sm` |
| Tooltip, mobile image, stats tile, selection tile, sticky banner/footer | `md` | `tw-rounded-md` |
| Button, toast, lightbox, modal, bottom sheet, mini card | `base` | `tw-rounded` |
| Card (standard), loan card, slider card, desktop image | `lg` | `tw-rounded-lg` |
| Section frame | `xl` | `tw-rounded-xl` |
| Icon button, tag, small badge, avatar, toggle | `full` | `tw-rounded-full` |
| Table cell, raw marketing photo | `none` | `tw-rounded-none` |

## Usage rules

### Do

- Pick a token by **component type** using the scale table above.
- Use the inner-radius formula whenever content is nested flush inside a rounded container.
- Apply the same radius to all four corners by default.
- Use `tw-rounded-full` (not bare `tw-rounded`) when you want a pill or circle.

### Don't

- Don't write arbitrary radius values (`border-radius: 10px`, `tw-rounded-[10px]`). If no token fits, that's a design-system conversation, not a one-off.
- Don't leave a flat (`0px`) corner against a rounded container.
- Don't let an inner radius exceed its container's radius — visual inversion in either direction breaks the spatial hierarchy.
- Don't asymmetrically round corners without a structural reason.

### Need something not covered here?

Open a request with the design system team. Include the use case, the component, and why the existing tokens don't fit.

## How to use in Figma

All radius tokens are published as variables in the Kiva Ecosystem library. When applying a radius:

- Bind the corner-radius property to the radius variable instead of typing a number.
- Hover a variable to see its value and intended use cases.
- Before handoff, inspect the frame: if the corner-radius field shows a raw number instead of a variable name, **re-bind it from the library**. A raw value is a detached decision that won't follow updates and leaves developers without a token to map to.

## Current code state (verify before depending)

The shipped code has a small structural gap relative to the new Figma spec. Check before assuming a token name:

- **Authoritative source:** `@kiva/kv-tokens/tokens/core/size.json` — the canonical declaration of the `radius` token set (alongside `space`, `breakpoint`, `border-width`).
- **`size.json` currently defines six tokens:** `xs` (4), `sm` (8), `md` (12), **`default`** (16), `lg` (20), `xl` (24).
  - **The 16px token is `default` in code, `base` in Figma** (see the Anatomy note above). Figma renamed it to `base` for visual consistency with the `xs/sm/md/lg/xl` scale and treats `default` as the legacy name; code still ships `default` in `size.json`. The one piece that is mechanically fixed on the code side is Tailwind's **`DEFAULT`** key — that convention is what generates the unsuffixed `tw-rounded` utility, so the mapping resolves through `DEFAULT` regardless of the source token's name. Both names are correct in their own surface: when reading or writing code today, use `default` / `radii.default` / `DEFAULT`; in Figma, use `base`.
  - **`none` (0px) and `full` (9999px) are not in `size.json`.** They are currently *hardcoded directly in the Tailwind preset* — see below — rather than flowing from the token source. This *is* a sync gap worth closing.
- **Tailwind utility classes** (`@kiva/kv-tokens/configs/tailwind.config.js` → `theme.borderRadius`) ship the full spec scale today:
  - `tw-rounded-none` → `0px` (hardcoded in preset)
  - `tw-rounded-xs` → `4px` (from `radii.xs`)
  - `tw-rounded-sm` → `8px` (from `radii.sm`)
  - `tw-rounded-md` → `12px` (from `radii.md`)
  - `tw-rounded` → `16px` (`DEFAULT` key, from `radii.default`)
  - `tw-rounded-lg` → `20px` (from `radii.lg`)
  - `tw-rounded-xl` → `24px` (from `radii.xl`)
  - `tw-rounded-full` → `500rem` (hardcoded in preset; functionally a pill at any real-world width)
- **Net effect:** at the utility-class layer everything in the Figma scale is usable today. At the token-source layer, two tokens (`none`, `full`) are not yet first-class entries in `size.json` and one (`base`) is still named `default`.

When you find a divergence between this skill and the shipped tokens/components, flag it — closing those gaps is part of the long-running token sync work, and each instance is a data point.

## Figma source references

- Radius Overview: node `18929:1295`
- Radius Scale: node `18931:1295`
- Radius Guidelines: node `18932:1295`

File: `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 — WIP)
