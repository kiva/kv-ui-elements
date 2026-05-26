---
name: figma-design-system-to-skill
description: Process skill for extracting a section of the Kiva design system from Figma into a portable agent skill file in @kiva/kv-tokens/docs/skills. Codifies the artifact-gathering, code-verification, structure, voice, and index-update steps proven out across typography, layout, spacing, and radius.
when_to_use: Whenever starting a new skill that extracts a Figma design-system section (e.g., color, elevation, motion, iconography, components). Trigger phrases — "extract the X section of our design system into a skill", "create a new skill from these Figma panels", "let's build a skill for X".
---

# Figma Design-System → Skill

## What this skill produces

A single self-contained Markdown skill file in `@kiva/kv-tokens/docs/skills/<name>.md`, plus a one-line entry in `@kiva/kv-tokens/SKILLS.md`. The skill captures *design intent* from Figma (canonical) and notes *real divergences* in the shipped code (so consumers know what to verify before depending on a token name).

Existing exemplars in this repo:

- `typography.md` — the original template, content-style skill
- `layout.md` — multi-panel extraction with cross-skill linkage
- `spacing.md` — the most complex (semantic categories + raw ramp + responsive values)
- `radius.md` — small, tight scale with a per-component lookup table

Read at least one before starting a new extraction; mirror voice, headings, and table conventions.

## Inputs to gather from the user

Always ask for, or confirm you have, all three:

1. **Figma node links** for each panel in the section. Typical sections have:
   - An **Overview** panel (the "why" + design principles + anatomy)
   - A **Scales / Tokens** panel (the canonical values)
   - A **Guidelines** panel (Do/Don't, usage rules, implementation in Figma)
   Some sections have additional or merged panels — adapt accordingly.
2. **Screenshots** of each panel (one each, plus any zoomed/annotated supplementals).
3. **Section name** — confirm the file name (kebab-case) before writing.

### When to start with screenshots vs. the Figma MCP

Screenshots are sufficient for **conceptual panels** — overviews, principles, do/don't grids, anatomy diagrams, small scales. Lift content directly from them.

**For dense token tables, start with `get_design_context` from the first pass — don't try to read them from a screenshot.** A panel qualifies as a "dense token table" if it has any of:

- More than ~10 rows of tokens *with* a description column
- Multiple sub-tables (e.g., one per theme, tier, or component)
- Per-row metadata you'd otherwise transcribe (primitive source, opacity, state)

The color skill round of this process missed ~5 tokens per theme and invented incorrect shadow names by reading screenshots of tables that were too dense to be legible. The Figma MCP returns the underlying React export, which lets a parser pull every row reliably (see *Extracting table data with a parser*, below). For everything else — Overview, Guidelines, Accessibility framework text — screenshots remain faster.

## File and index locations

- **New skill:** `@kiva/kv-tokens/docs/skills/<kebab-name>.md`
- **Index to update:** `@kiva/kv-tokens/SKILLS.md` (add one line under `## Skills`, format: `- [name](docs/skills/name.md) — one-line hook`)

## Code verification — before writing "Current code state"

Every skill ends with a **Current code state** section that flags where shipped code diverges from the Figma spec. Don't write that section from memory or from the Figma side alone — read the source.

Standard verification path (start narrow, widen only as needed):

1. **`@kiva/kv-tokens/tokens/core/*.json`** — canonical token source. Files: `size.json` (space, breakpoint, radius, border-width), `color.json`, `typography.json`, `misc.json`. Open the one relevant to your section.
2. **`@kiva/kv-tokens/configs/tailwind.config.js`** — how tokens get exposed as Tailwind utilities. Find the relevant `theme.*` block. Note any hardcoded values *not* sourced from the JSON (those are sync gaps worth flagging).
3. **`@kiva/kv-tokens/configs/kiva*.js`** — utility modules (`kivaColors.js`, `kivaTypography.js`) for sections with programmatic helpers.
4. **`@kiva/kv-tokens/dist/js/tokens.js`** — built output. Useful as a fallback if the source JSON doesn't yet contain everything you expect (e.g., the spacing ramp is fully expanded here even when the source isn't).
5. **Component-side wrappers** in `@kiva/kv-components/src/vue/` — only if the section has a thin component abstraction (e.g., `KvGrid.vue` for layout). Grep for likely names; don't open the whole tree.

Use `grep -rn` for targeted lookups; use `Read` for whole files. Both are fast — there's no reason to defer to a subagent for code verification at this size.

### Distinguish real sync gaps from intentional differences

Not every Figma-vs-code mismatch is a gap to close. Some are deliberate:

- **`default` vs `base`** (radius): in code the token is `default` (Tailwind's `DEFAULT` key generates the unsuffixed utility class); in Figma it's `base` (renamed for consistency with the `xs/sm/md/lg/xl` scale, with `default` marked *legacy*). Same token, two surface-native names — document both, but don't assert which name "wins" long-term unless the team has said so. The only mechanically-fixed piece is the Tailwind `DEFAULT` key.
- **Naming-convention separators** for the same token across surfaces: source JSON uses `_` (e.g., `2_5`), Tailwind utilities use `.` (`tw-p-2.5`), Figma variables use `-` (`2-5`). Not a gap — just three idioms for the same value.
- **Theme / variant identifiers**: Figma names a theme "Marigold"; code names it `marigold-light`. Both are correct in their own surface. Document both side-by-side so designers and engineers can each type the name native to their tool.

When you find a divergence, **ask the user or check context** before framing it as "to be closed." Errantly calling an intentional difference a sync gap is a small but recurring failure mode — and so is the inverse: declaring a difference "permanent / intentional" when the Figma source actually marks the old value *legacy* (the radius `default` vs `base` case did exactly this on its first pass). State what each surface says today and let the team decide permanence.

### List concrete missing tokens — don't summarize gaps in prose

When you find real sync gaps (Figma defines tokens or values that code doesn't ship), enumerate them as a bullet list inside the "Current code state" section. A list of names — `text/action-disabled`, `background/action-secondary`, `border/secondary-disabled` — is actionable; "several tokens are missing" is not. Group by theme or category if there are more than ~5 missing entries.

### Extracting table data — prefer `get_metadata` for dense tables

For any dense token/spec table, **`get_metadata` is the most reliable extractor** — more so than parsing the `get_design_context` React export. `get_metadata` returns each text node's `name` (the literal rendered string) plus its `x`/`y` coordinates and the containing cell's geometry. Reconstruct the table by sorting cells into columns by `x` and rows by `y`. This sidesteps two problems with the React export: (a) dense panels often exceed the output limit and get truncated or persisted to a file, and (b) the export is laid out column-major with ~100KB of image-asset constants, so a naive text scrape drops or scrambles cells. The metadata coordinates reconstruct even a two-sub-table ramp exactly.

The QA pass that verified the spacing ramp relied on this: the `get_design_context` text scrape stopped mid-table and missed the bottom rows, while `get_metadata` returned every `(token, REM, value)` cell with coordinates — which is how the `15-5` / `16` mislabel at the bottom of the Figma ramp was confirmed. As a bonus, text-node `name`s give you clean copy for conceptual panels too (anatomy definitions, guideline paragraphs) without dumping the React export.

**Fallback — parse the React export.** When metadata isn't enough (you need styling, or text lives in nested instances), write a small parser (~25 lines of Python) over the `get_design_context` export: each cell has a `data-name="<cell-type>"` attribute (e.g. `"semantic name"`, `"hex code"`, `"primitive token"`, `"description"`) and a `row-N` class — group by row and emit a Markdown row per group. Note that text inside component *instances* (Do/Don't example cards, anatomy-label components) is often exposed by neither tool — capture that from a screenshot.

## Standard skill structure

Mirror this order. Sections marked *(optional)* can be omitted if the source content doesn't support them.

```
---
name: <kebab-name>
description: <one sentence — specific enough that an agent can decide relevance>
when_to_use: <concrete triggers — when designing/implementing X, picking between Y and Z, etc.>
---

# Kiva <Section Title>

## Source of truth
<Figma is canonical. Code may lag. Verify before depending. Link to "Current code state" at bottom.>

## Why <section> matters / About
<2-4 sentences on the why. Lift from the Overview panel. Include "Common alternative names" line if Figma has one.>

## Design principles
<Numbered list, usually 2-4 items from the Overview panel. One sentence each.>

## <Main spec tables>
<The canonical content. Use tables for token data. Lead with semantic intent, raw values second.>

## Best practices / Usage rules
<Do / Don't pairs. Group related rules.>

## (optional) <Worked examples, lookup tables, gotchas>
<Anything that's component-level or implementation-level worth pulling out.>

## How to use in Figma
<Variable picker tips, library hover descriptions, before-handoff check (re-bind any raw values).>

## Current code state (verify before depending)
<Authoritative source file path. Real gaps. Intentional differences explicitly marked as such.>

## Figma source references
- <Panel name>: node `XXXXX:XXXX`
- ...
File: `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 — WIP)
```

## Voice and formatting conventions

- Lead with **semantic intent**, then concrete values. "Pick a token by what the component *is*, not by eyeballing a curve" comes before the value table.
- **Tables** for any structured data — tokens, scales, tier values, component→token lookups.
- **Do / Don't** as boldface inline labels in a paragraph or as bullet pairs. Match how `typography.md` does it.
- **Cross-link** related skills with relative markdown links: `[spacing](spacing.md)`, `[layout](layout.md)`.
- Use **fenced quote blocks** (`>`) for callouts the user needs to *see* (formulas, gotchas, caveats about Figma typos). Use them sparingly — every callout dilutes the next.
- Keep tone direct. Avoid hedge words ("typically", "generally", "may"). When something *is* true, say so; when it's a recommendation, name the recommender (design system team, the Figma spec, the engineering convention).

## When to split into a companion reference file

Some sections have more *reference data* than *conceptual content*. For those, split into two files: an umbrella skill that captures the framework, and a reference companion that holds the bulk data.

Use the umbrella + companion pattern when **any** of these is true:

- The section has multiple structured tables and the total row count exceeds ~50.
- The data is organized **per-X** (per-theme, per-tier, per-component) and each X's table is independently useful — an agent typically needs one X's worth at a time, not all of them.
- The Figma source itself organizes the data into discrete sub-sections that mirror well to per-file split.

Naming: `<topic>.md` (umbrella) + `<topic>-<axis>.md` (companion). Examples: `color.md` + `color-themes.md`. The companion's frontmatter `description` should explicitly call out that it's a reference for the umbrella — e.g., "Reference companion to `color` …".

What lives where:

- **Umbrella** (`<topic>.md`): source-of-truth caveat, why, principles, token grammar, accessibility framework, best practices / usage rules, Figma usage, current code state.
- **Companion** (`<topic>-<axis>.md`): the full structured tables, with whatever columns the Figma source has (name, hex, primitive, description, etc.). Light intro pointing back to the umbrella; per-X "source caveats" sections for Figma typos specific to that table.

Add **both** files to `SKILLS.md`. The companion's index entry should explicitly mark it as a reference: e.g., *"Reference companion to `color`: the full per-theme token tables …"*

## Watch-outs

- **Figma source typos.** Multiple panels have small errors — `rem` column wrapping in the spacing scale, "Atonomy" / "Principals" headings on the radius overview. **Silently correct** these in the skill; don't transcribe the typo.
- **Internally inconsistent Figma claims.** Panels — and even cells *within one panel* — contradict each other. Spacing Overview says "every value is a 4px multiple" while the Ramp says "8px base unit"; the Layout Grids panel's SM spec row says 4 columns while the SM breakpoint *diagram* is tagged `col: 8` (the drawn diagram and the Building Layouts example both confirm 4). Favor the value the canonical spec table and shipped code agree on, and add a brief caveat so a reader cross-referencing Figma isn't tripped by the stale label.
- **Quote vs. paraphrase.** If you wrap text in quotation marks and attribute it to Figma, it must be the *literal* string from the panel. The spacing skill's first pass quoted an "8px base unit with half-steps" phrasing Figma never wrote; the real sentence ("Every space token is a multiple of this base unit") is both quotable *and* more useful, because quoting it accurately exposes why it's wrong. Paraphrase freely — just don't dress paraphrase up as a quote.
- **Don't lift the panel's subtitle as your introduction.** Figma panel subtitles are often boilerplate ("Use these [Component name] examples in your design"). Write a real "why this matters" intro instead.
- **Don't include the "Any questions? Let us know!" / Slack avatars** that appear in Overview panels — those are panel chrome, not content.
- **Headings are H2.** The skill title is the only H1. All other sections are H2 / H3. Don't slip into H4+ unless you genuinely have four levels of hierarchy.
- **No emojis** unless the user explicitly asks. The existing skills don't use them.

## Process — step by step

1. **Confirm inputs.** Re-state the section name, the Figma node links, and that you have the screenshots. Ask for anything missing.
2. **(Optional) Skim one or two existing skills** if you haven't recently — pattern-match voice and structure.
3. **Decide on the data source per panel.** Screenshots for conceptual panels; `get_design_context` (and a parser) for dense token tables. See "When to start with screenshots vs. the Figma MCP" above.
4. **Decide whether to split** into an umbrella + reference companion before drafting. The split shape is hard to retrofit after the fact. See "When to split into a companion reference file."
5. **Verify code state.** Open the relevant token JSON, the Tailwind config block, and any wrapper components. Note real gaps and intentional differences; list concrete missing tokens by name.
6. **Draft the skill(s)** using the standard structure. Write into `@kiva/kv-tokens/docs/skills/<name>.md`. Use the `Write` tool for new files; use `Edit` if revising.
7. **Update the index.** Add one entry per file to `@kiva/kv-tokens/SKILLS.md` under `## Skills`.
8. **Self-verify against canonical Figma data.** Before declaring done, pull every panel you summarized from screenshots and spot-check at least: (a) primitive / token values that drive other claims, (b) every callout in the accessibility or "do not use" sections, (c) every Do/Don't headline. Stale Figma labels and copy-paste errors are common enough that this step regularly catches real factual mistakes — treat it as required, not optional.
9. **Brief the user.** End with a short summary listing what's in the new skill and any divergences from Figma you flagged. Don't re-list the full table of contents — call out structural choices and surprises only.

## Iteration

The user will frequently correct facts after the first draft — naming conventions, scale framing, intentional-vs-accidental gaps. Treat the first pass as an outline they'll refine. When a correction lands, audit *related* skills for the same mistake — the spacing/layout 4px-vs-8px correction propagated to both files because the same misleading framing was in both.

The self-verification step (step 8 above) should catch most of these before the user has to. Don't skip it to save tokens.

## Kickoff prompt template

Hand the user this template they (or you) can drop into a fresh session to start the next extraction:

```
Time to extract the <SECTION> section of our design system into a new skill. Please load the `figma-design-system-to-skill` skill and walk through it.

Figma node links:
- <Panel 1>: <URL>
- <Panel 2>: <URL>
- <Panel 3>: <URL>

Screenshots attached: <count or list>
```
