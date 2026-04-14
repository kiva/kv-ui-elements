# Raw Export Manifest

**Exported:** 2026-04-13
**Figma file:** `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 WIP)
**Source:** Figma desktop app "Export Variables" feature
**Format:** W3C Design Tokens Community Group (DTCG) with Figma extensions

## Collections in this export

| Folder/File | Modes | Notes |
|---|---|---|
| `Global.tokens.json` | Mode 1 | Primitives: colors, type atoms, spacing, layout, radius, elevation atoms |
| `radius size.tokens.json` | Mode 1 | Semantic radii (button, card, input, dropdown) |
| `Alias - Border.tokens.json` | Mode 1 | Border widths |
| `Alias - Color/` | default, green-dark, green-light, marigold, stone | Theme variants |
| `Alias - Elevation/` | Blur, Opacity, Spread, y | Shadow attribute axes (not theme variants) |
| `Alias - Text_Spacing_Layout/` | desktop (lg), desktop (xl), mobile (sm), mobile (xs), tablet (md) | Breakpoint variants |
| `Mapped/` | primary, secondary | Component-level theme mappings |

## Notes

- Aliases inside `Mapped/` may reference `Alias - Color (deprecated)` — a collection not included in the export. The normalizer preserves these references verbatim.
- `Alias - Elevation` modes are attribute axes, not theme variants. Each mode represents one dimension of a shadow effect (blur radius, opacity, spread, y-offset).
