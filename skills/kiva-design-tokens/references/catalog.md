# Kiva Design Tokens — Catalog

Snapshot contains 7 collections. Each section below summarizes a collection; load its JSON for detail.

## Alias - Border — 3 tokens, 1 mode

Semantic border widths.

→ `references/tokens/alias-border.json`

## Alias - Color — 39 tokens, 5 modes (default, green-dark, green-light, marigold, stone)

Semantic color roles: text/*, background/*, border/*, action/*, icon/*. Values vary by theme mode — this is the canonical source for theme-aware colors.

→ `references/tokens/alias-color.json`

## Alias - Elevation — 3 tokens, 4 modes (Blur, Opacity, Spread, y)

Shadow attribute axes. Each 'mode' is one dimension of a drop shadow — combine Blur + Opacity + Spread + y for a given elevation token to build a complete CSS box-shadow.

**Modes:** Modes are attribute axes (Blur, Opacity, Spread, y), NOT themes. To render a shadow, read all four modes for the same token.

→ `references/tokens/alias-elevation.json`

## Alias - Text_Spacing_Layout — 68 tokens, 5 modes (desktop (lg), desktop (xl), mobile (sm), mobile (xs), tablet (md))

Responsive text sizes, spacing, and layout widths. Values vary by breakpoint mode — pick the mode matching the viewport you're rendering for.

→ `references/tokens/alias-text-spacing-layout.json`

## Global — 174 tokens, 1 mode

Primitives — raw colors (eco-green, marigold, stone, neutral), type atoms (font sizes, weights, line heights, letter spacings), spacing scale, layout widths, radius atoms, elevation atoms. All other collections alias into this one.

→ `references/tokens/global.json`

## Mapped — 21 tokens, 2 modes (primary, secondary)

Component-level bindings — declares which semantic alias each component variant uses (e.g. button.color.default in the 'primary' mode points to background.action).

**Modes:** Modes are component variants (primary, secondary), NOT themes.

> ⚠️ Concrete hex values in this file match only the DEFAULT theme. For cross-theme values, follow aliasOf into the referenced collection (usually Alias - Color) and read the theme mode there.
> ⚠️ Some aliasOf targets reference 'Alias - Color (deprecated)' — a collection not in this snapshot. The current equivalent lives in Alias - Color at the matching leaf path.

→ `references/tokens/mapped.json`

## radius size — 7 tokens, 1 mode

Semantic radius tokens for specific component sizes (button.radius.sm/md/lg, card, input, dropdown). Aliases into Global's radius primitives.

→ `references/tokens/radius-size.json`
