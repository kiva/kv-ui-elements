# Figma MCP Discovery — Findings

**Date:** 2026-04-13
**File probed:** `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 WIP)
**Tool used:** `mcp__plugin_figma_figma__get_variable_defs`

Raw MCP outputs are preserved alongside this file, one JSON per frame:

| Frame | NodeId | File |
|---|---|---|
| Typography (primary reference) | 17299:5886 | `typography-17299-5886.json` |
| Spacing | 17391:6360 | `spacing-17391-6360.json` |
| Layout | 18008:7544 | `layout-18008-7544.json` |
| Color Overview | 18445:832 | `color-overview-18445-832.json` |
| Color Themes and Usage | 17950:8787 | `color-themes-17950-8787.json` |
| Radius (docs page) | 18931:1295 | `radius-18931-1295.json` |
| Radius (tile) | 18929:1295 | `radius-tile-18929-1295.json` |

## Tool behavior

- `get_variable_defs(fileKey, nodeId)` returns a **flat JSON object** mapping `variable name` → `value`.
- Only variables **actually used** on the target node (and its descendants) are returned. Frames that don't exercise a collection don't surface it.
- No separate metadata (no descriptions, no explicit types, no alias syntax at the primitive level).
- Both radius frames returned **zero radius variables**. Confirmed by user: radii aren't bound as their own Figma variables — they reuse values from the `spacing/*` scale. No `radius` collection will exist in v1; guidance (v2) will document the "use spacing values for radii" pattern.
- No desktop selection is required — the earlier "nothing selected" error happened because the target node used no variables. The tool works unattended as long as the node has variables on it.

## Value shapes observed

1. **Hex color** — `"#2aa967"`, `"#00000014"` (8-digit = alpha channel). Inferred type: `color`.
2. **Numeric string, integer** — `"16"`, `"32"`. Inferred type: `dimension` (px by convention) or `unitless`.
3. **Numeric string, float** — `"-0.2199999988079071"`. Typically letter-spacing; sub-em values.
4. **Bare string** — `"Medium"`, `"Book"` (font weight names) or `"Kiva Post Grot"`, `"Dovetail MVB"` (font families).
5. **Composite `Font(...)`** — e.g.
   `Font(family: "type/font-family/serif", style: type/font-weight/medium, size: type/font-size/h1/lg, weight: 500, lineHeight: type/line-height/h1/lg, letterSpacing: type/letter-spacing/-300)`
   Composite typography tokens. **Two variants coexist:**
   - Alias-preserved: references are variable names (e.g. `type/font-family/serif`)
   - Alias-resolved: references are literal final values (e.g. `"Kiva Post Grot"`, `Medium`, `16`)
   Likely reflects how the variable was authored (whether each attribute was bound to a variable or typed as a literal).
6. **Composite `Effect(...)`** — one occurrence: `Effect(type: DROP_SHADOW, color: #00000014, offset: (0, 4), radius: 12, spread: 0)` — shadow primitive.

## Namespace / collection patterns

Parsed from observed keys, splitting on `/`:

### New — Ecosystem 2026 (keep)
- `color/*` — color primitives (`color/eco-green/default`, `color/gray/400`, `color/shadow/hover`)
- `type/*` — typography primitives (`type/font-size/h1/lg`, `type/line-height/base/lg`, `type/font-family/sans`, `type/letter-spacing/-300`, `type/font-weight/medium`)
- `spacing/*` — spacing primitives (`spacing/component/gap/L`, `spacing/structure/XL`, `spacing/micro/micro`)
- `layout/*` — layout primitives (`layout/page-margin/lg`, `layout/gutter/sm`)
- `text/*`, `background/*`, `border/*` — semantic aliases (`text/primary`, `background/action`, `border/tertiary`)
- `default theme/*` — themed semantic layer (`default theme/text/primary`, `default theme/border/tertiary`)
- Breakpoint-prefixed font composites — mixed casing:
  - `Desktop (L, XL)/*`, `Mobile (S)/*`, `Tablet (M)/*` — alias-preserved composites
  - `desktop (Lg, XL)/*`, `tablet (Md)/*`, `mobile (Sm)/*` — alias-resolved composites

### Old — Ecosystem v2 2024 (flag/exclude)
- `Brand/Grays/*`, `Brand/Greens/*`, `Brand/Marigolds/*` — `Brand/Greens/Kiva Green`, `Brand/Grays/$colors-white`
- `Default/Text/*`, `Default/Background/*` — old semantic layer
- `Actions/*` — `Actions/green-4`
- `Danger/*` — `Danger/$colors-danger-700`
- `LG/*` — old layout (`LG/gutter`, `LG/margin`, `LG/columns`)
- Bare `$colors-DEFAULT`, `default`, `Shadow Default` — leaking top-level aliases

### Classification rule (proposed for normalize.js)
- Path starts with lowercase `color/`, `type/`, `spacing/`, `layout/`, `text/`, `background/`, `border/`, `default theme/` → **new**
- Path starts with uppercase `Brand/`, `Default/`, `Actions/`, `Danger/`, `LG/` → **old**
- Breakpoint composites: casing distinguishes (`Desktop (L, XL)/*` vs `desktop (Lg, XL)/*`) — capture both but mark `alias-preserved` vs `resolved`
- Bare-name entries (`default`, `$colors-DEFAULT`, `Shadow Default`) → **flag for manual review**; likely old

User confirmed old entries can be kept with a notation so tokens don't silently disappear during normalization.

## Coverage constraints

- Every frame returns typography tokens as noise because the pages contain text. Over-capture, not under-capture.
- Some collections may be **intentionally absent** as variables: radii reuse spacing values rather than being their own collection. The sync config should only list frames for collections that exist; absence is not an error.
- Full coverage requires a **set** of frames per logical collection. Merging + deduping across frames by variable name is essential.

## Alias info

- Composites preserve aliases when they exist: `Font(family: "type/font-family/serif", ...)`.
- Primitive-level aliases are **not visible** in `get_variable_defs` output — `text/primary` returns `"#223829"`, not `{color/eco-green/4}`.
- Back-inferring primitive aliases by value matching is lossy (many tokens share hex values).
- **Decision for v1:** keep aliases only where MCP exposes them (inside composites). Don't try to reverse-engineer primitive aliases.

## Implications for the spec

These bullets are the main deltas to fold back into `2026-04-13-kiva-design-tokens-skills-design.md`:

1. **Replace "one raw file per MCP call" with "one raw file per frame"**, each named `<collection>-<nodeId>.json`. The sync procedure holds an explicit list of `{collection, frameName, nodeId}` tuples.
2. **Normalize.js responsibilities grow** to include:
   - Merging N frame outputs into deduped per-collection token sets
   - Classifying each variable as `new` / `old` / `unclassified` by path prefix
   - Inferring token type from value shape (color/dimension/font-family/font-weight/composite-font/composite-effect)
   - Parsing `Font(...)` and `Effect(...)` composites into structured objects
   - Flagging collections with zero hits (e.g., radius if the gallery frame doesn't exercise them)
3. **No `description` field in v1 normalized output** — MCP doesn't return descriptions. Remove from the token shape until we find a tool that does.
4. **Primitive-level `aliases` field is removed from v1** — composite-level aliases are captured inside the parsed composite structure; primitive aliases are out of scope.
5. **A `source.frames[]` array replaces `source.rawFiles[]`** — records which frame contributed which token (useful for debugging over/under-capture).
6. **Sync procedure requires a config file** listing frame nodeIds. `sync/frames.json`:
   ```json
   { "colors": [{ "name": "Color Overview", "nodeId": "18445:832" }, { "name": "Color Themes and Usage", "nodeId": "17950:8787" }], "spacing": [{ "nodeId": "17391:6360" }], ... }
   ```
7. **Add a "coverage report" step** to normalize.js — prints per-collection counts and flags empties. Replaces the earlier "rely only on git diff" position.
