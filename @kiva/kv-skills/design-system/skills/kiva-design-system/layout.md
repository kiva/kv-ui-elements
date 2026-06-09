---
name: layout
description: Layout grid system from the Kiva design system — breakpoint tiers (XS/SM/MD/LG/XL), columns, gutters, margins, nested grids, and rules for aligning content within the grid. Sourced from Figma; values describe design intent and may diverge from current code implementation.
when_to_use: When designing or implementing any page layout, responsive composition, or component that places content into columns — choosing a breakpoint, deciding a column span, reasoning about gutter vs. margin, nesting a grid inside a component, or handing off a multi-tier design to development. Reference design intent first; verify breakpoint and gap values against current code before relying on them.
make_kit:
  include: true
  category: foundations
  order: 50
---

# Kiva Layout

## Source of truth

This skill captures the **layout grid system** as defined in Figma (the Kiva Ecosystem 2026 file). Figma is the canonical source for design intent: which tiers exist, what their column/gutter/margin values are, and how content is meant to sit on the grid.

Numeric values, tier names, and any class references in this document reflect the Figma specifications. The shipped code in `@kiva/kv-tokens` and `@kiva/kv-components` may temporarily lag behind these specs while the layout token sync work is in progress. **Verify any breakpoint value, gap class, or grid utility against the current code before depending on it.** See "Outstanding discrepancies" at the end of this skill for known gaps.

## Why a grid

Kiva uses layout grids so that content aligns consistently across all screen sizes. The grid provides a shared structure that makes layout decisions predictable and repeatable — designers and developers reach the same answer without re-deriving it per screen.

Common alternative names you may see used interchangeably: **columns**, **rows**, **guides**, **layout guides**, **grid system**.

## Anatomy

A page grid has three parts.

| Part | What it is |
|---|---|
| **Column** | The vertical divisions that content aligns to. Column count and width change based on the size of the screen or container. |
| **Gutter** | The empty space between columns, separating elements and preventing content from merging. Gutter stays the same size as the container resizes within a tier. |
| **Margin** | The space between the outermost columns and the container edge. This value stays constant across the full range of each tier. |

The mental model: margins frame the page; columns hold content; gutters keep content blocks from touching.

## Breakpoint tiers — page grid specs

The canonical reference for all five breakpoint tiers:

| Tier | Range | Columns | Gutter | Margin |
|---|---|---|---|---|
| **XS** | 0 – 319px | 4 | 16px | 20px |
| **SM** | 320px – 733px | 4 | 16px | 20px |
| **MD** | 734px – 1023px | 8 | 24px | 32px |
| **LG** | 1024px – 1439px | 12 | 32px | 64px |
| **XL** | 1440px – up | 12 | 32px | 120px |

### What XS is for

XS exists as a **boundary tier only**. There is no XS Figma frame to design in — SM at 390px is the practical mobile design frame. XS guarantees the grid still resolves below 320px if a viewport ever lands there.

### Content max width

Even in LG and XL, content is constrained within a **1200px container**. Actual grid content caps at **~1152px** after accounting for padding and margins. Wider viewports show additional negative space at the edges; the grid does not keep growing.

### Relationship to the spacing scale

Every gutter and margin value above is a multiple of 4 — they sit on the same **4px-grained ramp** that powers the spacing system (see the [spacing](spacing.md) skill). Gutters map cleanly to spacing tokens (16 = `2`, 24 = `3`, 32 = `4`); the larger margin values (64 = `8`, 120 = `15`) also resolve on the ramp. Designers and developers can reason about both systems against one shared scale.

## Nested grids

A nested grid is a grid placed **inside a column of an existing page grid**. Use nested grids to organize the internal layout of a component (e.g., stats inside a loan card) without affecting the overall page structure.

| Tier | Columns | Gutter | Margin |
|---|---|---|---|
| **XS** | 4 | 16px | — |
| **SM** | 4 | 16px | — |
| **MD** | 8 | 24px | — |
| **LG** | 12 | 32px | — |
| **XL** | 12 | 32px | — |

**There is no margin on a nested grid** — that is the only structural difference from the page grid. Columns and gutters match the parent tier.

### When to nest vs. span the parent

The decision comes down to whether a section needs to align with the rest of the page or only with itself.

| Use case | Approach | Example | Gutter |
|---|---|---|---|
| Main page sections | Span the parent grid | Nav, hero, content rows | Parent tier gutter |
| Internal component layout | Use a nested grid | Stats inside a loan card | Parent tier gutter |
| Spacing between items | Always use the tier gutter | Gap between cards, columns | Parent tier gutter |

## Aligning content on the grid

### Place content at the column edge, not the gutter

Content starts at the **column edge**. Gutters are breathing room between content blocks — they are not a starting point for content.

### Span

Content can span one or more columns. Use `span` to control how wide a content block is within the grid.

- If a span value **exceeds** the available columns, the content shrinks to fill what's available.
- If there is not enough room left in a row, the content **wraps to the next row**.

### Intrinsic-width content

Not all content needs to span the full column width. Tags, badges, and pill buttons have a fixed natural size and should remain at their default width.

- **Do** keep the intrinsic-width content at its natural size.
- **Don't** stretch or shrink an intrinsic-width component to fill the grid.

### Fixed-width content

Some elements — most often a side navigation panel — have a fixed width that does not align with the column grid. When placed next to other content:

- The gap between the fixed-width element and the adjacent content uses the **parent grid's gutter value**.
- The remaining content continues to align with the outer grid.

- **Do** follow the parent screen's layout gutter for the gap.
- **Don't** abut adjacent content directly to the fixed-width edge with no gutter, and don't push the adjacent content past the next column edge.

## Building layouts across tiers

The same composition is expressed differently per tier because column counts change. Use spans that make sense for the tier:

- **LG (12 columns):** Full-width sections use `span 12`. A three-up row of cards uses three `span 4` items.
- **MD (8 columns):** Full-width sections use `span 8`. A two-up row uses two `span 4` items.
- **SM (4 columns):** Almost everything stacks into single `span 4` blocks.

When a design needs to shift from a multi-up row to a stack on a smaller tier, redo the span — don't try to preserve the same span value across tiers with different column counts.

## Implementation in Figma

### The grid is a guide, not a cage

Use the grid as a guide, not a constraint. It exists to create alignment and rhythm, but:

- Full-bleed elements (e.g., a hero background, a section banner) may extend beyond the grid.
- Intrinsic elements like tags, badges, and buttons do not need to align to column edges.

### Switching tiers mid-design

Set your Figma frame to the **official width for the tier you're designing for**. Designing at an arbitrary width and approximating the grid causes inconsistencies during handoff. The tier ranges are absolute: anything 1024–1439px should use LG; anything 734–1023px should use MD; etc.

### Handoff clarity

When sharing specs with developers, **always note which tier the design is built at** and **whether any nested grids are in use**. Developers working mobile-first need to know which breakpoint token a component's internal layout maps to.

### Applying layout grids in Figma

Layout grid styles are published in the Kiva Ecosystem library. Apply the matching style to a frame:

- `XS 0 - 319` — page grid for XS
- `SM 320 - 733` — page grid for SM
- `MD 734 - 1023` — page grid for MD
- `LG 1024 - 1439` — page grid for LG
- `XL 1440 - up` — page grid for XL
- `XS-Nested 0 - 319`, `SM-Nested 320 - 733`, … — nested grid variants

Match the style to the frame width and to whether the frame represents a page or a nested context.

## Usage rules

### Do

- Pick the tier by viewport width using the absolute ranges above.
- Align content to **column edges**, not gutters.
- Use the **tier's** gutter for spacing between grid items (don't substitute an arbitrary gap).
- Use a **nested grid** for component-internal layout that shouldn't be coupled to the page grid.
- Note tier and nested-grid usage when handing a design to developers.

### Don't

- Don't approximate the grid by designing at non-tier widths.
- Don't start content in the gutter or treat the gutter as a content well.
- Don't stretch intrinsic-width components (tags, badges, pills) to fill columns.
- Don't add a margin to a nested grid — nested grids have no margin by design.
- Don't reuse the same span number across tiers without re-checking against the tier's column count.

## Using with Tailwind

The layout primitives come from the `@kiva/kv-tokens` Tailwind preset. Haven't registered it yet? See the **kiva-tailwind-css** skill (kiva-design-to-code plugin) → "Consuming the preset". Not using the preset? See [Without the preset](#without-the-preset) below.

Breakpoints are **mobile-first min-width screens: `md`, `lg`, `xl`** (plus a `print` screen) — there is **no `sm` and no `2xl`**. Unprefixed utilities are the base tier, so the design system's XS and SM tiers both fall under "no prefix" in Tailwind; layer `md:` / `lg:` / `xl:` on top. See the **kiva-tailwind-css** skill → "Breakpoints are `md` / `lg` / `xl`". Build grids with `tw-grid` and the column/gap utilities, or use `KvGrid` (with the gutter caveat below).

**Shipped breakpoint values** (verify against `@kiva/kv-tokens/configs/tailwind.config.js` / `tokens/core/size.json`): `md: 734`, `lg: 1024`, `xl: 1440`.

### Without the preset

- **Kiva (or Kiva-adjacent) repo, preset not registered yet:** install and register it — the **kiva-tailwind-css** skill (kiva-design-to-code plugin) → "Consuming the preset".
- **Stock-Tailwind / non-Kiva project:** define `md` / `lg` / `xl` screens at the values above in your own config (or use arbitrary min-width media), and set gutters/margins explicitly from the [grid specs](#breakpoint-tiers--page-grid-specs). Copied values are point-in-time.

## Outstanding discrepancies

- **XS and SM tiers are not named breakpoints in code** — mobile is the unprefixed default; the XS/SM values in this skill are design-side targets only.
- **`KvGrid`** ([`@kiva/kv-components/src/vue/KvGrid.vue`](../../../kv-components/src/vue/KvGrid.vue)) hard-codes its gap as `tw-gap-2 md:tw-gap-3 lg:tw-gap-3.5`, which **does not match** the Figma tier gutters (16 / 16 / 24 / 32 / 32). For spec-accurate gutters, set them explicitly with gap utilities rather than relying on `KvGrid`'s defaults.
- **Margins** (20 / 20 / 32 / 64 / 120) and the **1200px content max-width** are not shipped as named tokens; page-container behavior lives per-consumer today.

When you find a divergence between this skill and the shipped tokens/components, flag it — each is a data point for the design-system team.

## Figma source references

- Layout Overview: node `17968:7844`
- Layout Grid: node `17968:7170`
- Layout Guidelines: node `17968:7175`

File: `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 — WIP)
