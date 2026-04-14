# Kiva Design Tokens — Skills Design

**Date:** 2026-04-13 (revised after MCP + export discovery)
**Status:** Draft — ready for implementation plan
**Scope:** v1 — tokens only

## Goal

Package Kiva's design variables and tokens as a set of purpose-built skill files that AI agents can consult when building apps against the Kiva design system. The system must expand over time: agents should "know" what's available from a lean entry point and fetch detailed information on demand.

## Non-goals (v1)

- Guidance/documentation page extraction from Figma — deferred to a follow-up spec
- Component specs (button variants, input states, etc.)
- Translating new tokens into `primitives.js` / `kivaTypography.js` — separate workstream
- Auto-running sync on CI or on a schedule — human-initiated only
- Change-summary reporting in the sync — rely on `git diff` for review
- Publishing as a Claude plugin — layout should make this a future `mv` + packaging step
- Live Figma API calls in the consumer skill — snapshot-only

## Source of truth: Figma W3C DTCG exports

Discovery ruled out Figma MCP as the canonical extraction source. `get_variable_defs` is node-scoped — it returns only variables *used on a given node*, lacks descriptions, flattens alias references to values for primitives, and infers types from value shape. It's useful for live inspection but not for complete, reliable bulk extraction.

The Figma desktop app's **"Export Variables"** feature produces a folder of files in W3C Design Tokens Community Group (DTCG) format. Each file is one mode of one variable collection, with:

- `$type`, `$value`, `$description` per token
- `$extensions.com.figma.aliasData.{targetVariableName, targetVariableSetName}` — fully resolvable alias info
- `$extensions.com.figma.scopes` — usage constraints (`TEXT_FILL`, `CORNER_RADIUS`, etc.)
- Collection-level `com.figma.modeName`

This is complete, structured, and stable. It is the v1 source. MCP becomes optional — useful later for guidance/component extraction but not on the critical path.

See `2026-04-13-mcp-discovery/` for the evidence behind this decision (MCP probe samples + export samples).

## Observed collections (from 2026-04-13 export)

| Collection folder/file | Modes | Contents (rough) |
|---|---|---|
| `Global.tokens.json` | 1 | All primitives: colors, type, spacing, layout, radius, elevation atoms |
| `radius size.tokens.json` | 1 | Semantic radii (button, card, input, dropdown) aliased to `radius/*` in Global |
| `Alias - Border.tokens.json` | 1 | Border width tokens |
| `Alias - Color/` | 5 | Theme variants: default, green-dark, green-light, marigold, stone |
| `Alias - Elevation/` | 4 | Shadow attribute axes: Blur, Opacity, Spread, y |
| `Alias - Text_Spacing_Layout/` | 5 | Breakpoints: desktop lg/xl, mobile sm/xs, tablet md |
| `Mapped/` | 2 | Component-level theme mappings: primary, secondary |

Counts may shift over time — normalize.js must be generic over collections, not hardcoded to these seven.

## Core decisions

1. **Two skills, clear separation of concerns.**
   - `kiva-design-tokens` — consumer skill. Loaded when an agent is building UI and needs to know what tokens exist.
   - `kiva-design-tokens-sync` — procedure skill. Loaded when an engineer or designer needs to refresh the snapshot from a new export.

2. **Snapshot model, export-driven.** The sync procedure ingests a folder of Figma DTCG exports, normalizes them into per-collection JSON, and updates the catalog. Consumer agents never touch Figma — they read local files.

3. **`normalize.js` does all real work.** MCP is not invoked during sync. The procedure is: drop exports in `raw/`, run the normalizer, review `git diff`, commit.

4. **Progressive disclosure.** Skill entry points stay lean. A catalog markdown file acts as the agent's routing table. Per-collection JSON files are loaded only when the agent drills in.

5. **All exported collections in scope.** The sync is generic — it doesn't enumerate expected collection names. Whatever Figma exports gets normalized and catalogued.

## File layout

```
/skills/
  kiva-design-tokens/                       # consumer skill
    SKILL.md
    references/
      catalog.md                            # human-readable index of all collections
      tokens/
        <collection>.json                   # one per collection, modes merged
      raw/
        <Figma export folder contents>      # preserved as-is from the export
        MANIFEST.md                         # export date, source file, mode mapping

  kiva-design-tokens-sync/                  # procedure skill
    SKILL.md
    procedure.md                            # step-by-step agent instructions
    normalize.js                            # pure JS: raw/ → tokens/ + catalog.md
    README.md                               # human intro for designers/engineers
```

`/skills/` sits at repo root for now. The layout supports a future `mv` to a dedicated skills repo without restructuring.

## Consumer skill: `kiva-design-tokens`

**Purpose:** let an agent answer "what tokens are available, and what values should I use?" without touching Figma.

**SKILL.md frontmatter triggers:** building UI with the Kiva design system, picking a color/spacing/typography token, "Kiva tokens", "design variables".

**SKILL.md instructions:**
1. Read `references/catalog.md` first to see what collections exist.
2. Drill into the specific `references/tokens/<collection>.json` when detail is needed.
3. Never call Figma tools — all data is local.

**`catalog.md` shape:**

```md
# Kiva Design Tokens — Catalog

Snapshot from Figma export pulled 2026-04-13. Seven collections.

## Global — 142 tokens, 1 mode
Primitive tokens: colors, type, spacing, layout, radius, elevation atoms.
→ `references/tokens/global.json`

## Alias - Color — 38 tokens, 5 modes (default, green-dark, green-light, marigold, stone)
Theme variants for semantic color roles (text, background, border, action).
→ `references/tokens/alias-color.json`

...
```

One section per collection: name, token count, mode list, one-sentence purpose (when inferable), pointer to the JSON file.

**`references/tokens/<collection>.json` shape:**

```json
{
  "collection": "alias-color",
  "displayName": "Alias - Color",
  "source": {
    "figmaFileKey": "TPmBUB4olYPMF6glEhBGDG",
    "exportedAt": "2026-04-13",
    "rawFiles": [
      "Alias - Color/default.tokens.json",
      "Alias - Color/green-dark.tokens.json",
      "Alias - Color/green-light.tokens.json",
      "Alias - Color/marigold.tokens.json",
      "Alias - Color/stone.tokens.json"
    ]
  },
  "modes": ["default", "green-dark", "green-light", "marigold", "stone"],
  "tokens": {
    "text.primary": {
      "type": "color",
      "values": {
        "default": { "hex": "#223829", "alpha": 1 },
        "green-dark": { "hex": "#...", "alpha": 1 }
      },
      "description": "Main high-contrast text color. Used for body text, titles, headlines and primary icons to ensure maximum readability.",
      "figmaId": "VariableID:18613:1247",
      "scopes": ["ALL_SCOPES"],
      "aliasOf": {
        "default": { "name": "color/eco-green/4", "collection": "Global" },
        "green-dark": { "name": "color/eco-green/1", "collection": "Global" }
      }
    }
  }
}
```

Key choices:
- **Dot-notation keys** flatten DTCG nesting (`text.primary` instead of `text.primary` as nested path). Easier for agents to grep and reference.
- **`values` keyed by mode** — collapses per-mode export files into one entry per token.
- **`aliasOf` keyed by mode** — each mode can alias a different target (themes work this way). Preserves both the target name and the target collection.
- **`scopes` surface Figma's usage constraints** so agents can know where a token is valid (e.g., `TEXT_FILL`-scoped tokens shouldn't be applied to borders).
- **`description` preserved verbatim** from the export.
- **`figmaId` preserved** for future round-trip tooling.
- **Color `$value` objects collapse** to `{ hex, alpha }` — the sRGB components are redundant with hex and add noise.

## Sync skill: `kiva-design-tokens-sync`

**Purpose:** let any teammate refresh the snapshot after a fresh Figma export.

**SKILL.md frontmatter triggers:** "sync figma tokens", "refresh design tokens", "update tokens from figma".

**`procedure.md`** — the step-by-step the agent follows:

1. **Confirm the export.** Verify that a new Figma DTCG export folder has been dropped somewhere accessible (user-provided path, or default expected location).
2. **Stage raw files.** Copy/move the export contents into `../kiva-design-tokens/references/raw/`, overwriting the previous snapshot. Preserve Figma's folder/file structure.
3. **Update manifest.** Rewrite `references/raw/MANIFEST.md`: export date, Figma file key, per-collection mode listing, any notes the designer provided.
4. **Normalize.** Run `node normalize.js`. Reads everything under `raw/`, re-emits `references/tokens/*.json` and `references/catalog.md`.
5. **Coverage report.** Normalize prints per-collection token and mode counts. Flag collections that shrank vs. previous run (potential regressions for human review).
6. **Handoff.** Tell the human to review `git diff` and commit.

**`normalize.js` responsibilities (pure JS, no network, no MCP):**

- Walk `raw/` directory. Top-level files = single-mode collections; top-level folders = multi-mode collections (each `.tokens.json` inside is one mode).
- For each token (detected by presence of `$type` + `$value`), compute the dot-notation key from its nested path.
- Normalize the value by type:
  - `color`: `{ hex, alpha }` from `$value.hex` and `$value.alpha`
  - `number`: raw number
  - `string`: raw string
- Preserve `$description`, `com.figma.variableId`, `com.figma.scopes`.
- Preserve `com.figma.aliasData` as `aliasOf: { name: targetVariableName, collection: targetVariableSetName }`.
- Merge all modes for a collection under one token entry (`values: { mode: ... }`, `aliasOf: { mode: ... }`).
- Write one `tokens/<collection-slug>.json` per collection.
- Regenerate `catalog.md` from the normalized files.
- Print coverage report to stdout.

**Collection slugging:** lowercase, spaces/underscores to hyphens, strip non-alphanumerics except hyphens. `"Alias - Color"` → `alias-color`. `"radius size"` → `radius-size`. Stored in the JSON's `displayName` field so the original name isn't lost.

**Configuration:** none beyond paths. The Figma file key is recorded in MANIFEST.md for reference; it isn't used by normalize.js.

## Data flow

```
Figma desktop app → export variables
    │
    ▼
Human drops export folder next to the sync skill
    │
    │  agent runs the sync procedure (procedure.md)
    ▼
references/raw/  (W3C DTCG files, preserved structure)
    │
    │  node normalize.js (pure transform)
    ▼
references/tokens/*.json + references/catalog.md
    │
    │  human reviews git diff
    ▼
git commit
```

Humans initiate sync, agents drive the procedure, `normalize.js` does structured transformation, git tracks what changed. No MCP calls on the v1 critical path.

## Open items to resolve during implementation

- **Deprecated-collection handling.** The export's `aliasData` can reference `Alias - Color (deprecated)` — a collection not included in the export. `normalize.js` surfaces these as `aliasOf.collection: "Alias - Color (deprecated)"` without trying to resolve further. Agents see the reference and can reason about it.
- **Elevation modes semantics.** `Alias - Elevation` has modes `Blur/Opacity/Spread/y` — these are *attribute axes*, not theme variants. The normalized output will carry them as modes like any other collection; a follow-up guidance doc will explain the semantics. No special code path in v1.
- **Slug collisions.** If two collections slug to the same name (e.g., `Alias - Color` vs. a hypothetical `alias-color`), `normalize.js` fails with an explicit error. Unlikely in practice.
- **Token key collisions across modes.** Within one collection, all modes should contain the same token set; if a token appears in some modes and not others, the normalized entry carries `values` only for the modes where it exists. The catalog notes partial-coverage tokens.

## Success criteria

- An agent, with zero prior context, can load `kiva-design-tokens`, read `catalog.md`, and answer "what's the Kiva primary text color in green-dark mode?" by fetching one JSON file.
- A teammate with a fresh Figma export can load `kiva-design-tokens-sync`, follow `procedure.md`, and produce a clean `git diff` that updates raw files, tokens, and catalog.
- Adding a new collection to the Figma export requires no code changes — a resync picks it up and the catalog reflects it automatically.
- `normalize.js` is pure, deterministic, and unit-testable with small fixture files.
