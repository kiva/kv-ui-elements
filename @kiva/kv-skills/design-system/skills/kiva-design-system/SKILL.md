---
name: kiva-design-system
description: Index and router for the Kiva design-system sub-skills — typography, layout, spacing, radius, color, and color-themes. Entry point for any task touching Kiva's visual language — auditing existing code for design-system compliance, generating new UI with correct tokens and Tailwind utilities, answering design-token questions, or performing a Figma-to-code handoff. Routes to the relevant sub-skill(s); load only what the task requires, never all at once.
when_to_use: Invoke when — auditing a component, page, or PR for design-system compliance (wrong token, missing class, incorrect radius, hardcoded color); generating new Vue/HTML/Tailwind code and needing the correct token name, utility class, or component pattern for color, type, spacing, radius, or layout; answering which-token questions (e.g. "right text color for a disabled button in the Marigold theme?"); or handing a Figma design off to code (mapping Figma token and theme names to @kiva/kv-tokens utilities). Trigger phrases — "design system", "kiva token", "tw- class", "which token", "audit", "design compliance", "Figma handoff", "color theme", "type style", "spacing token", "border radius", "layout grid", "breakpoint".
---

# Kiva Design System — Index Skill

## What this skill is

This file is the **entry point and router** for the Kiva design system knowledge base. It does not contain token values itself — those live in the sub-skills below, sourced directly from the Figma Kiva Ecosystem 2026 file. Each sub-skill is **Figma-canonical**: the values, token names, and utility classes recorded there reflect design intent, and the shipped code in `@kiva/kv-tokens` may temporarily lag those specs while the token sync is in progress.

**Always read the relevant sub-skill before advising on or generating design-system code.** Do not rely on memory for token names, class names, or hex values — load the sub-skill and quote from it.

---

## Sub-skills

Load only the sub-skill(s) relevant to the current task. Do not load all six unless the task genuinely spans all categories.

| Sub-skill | File | What it covers |
|---|---|---|
| **color** | [color.md](color.md) | Primitive palettes, the five themes (Default, Green Light, Green Dark, Marigold, Stone Light), the role/slot/state token grammar, accessibility levels per pairing, and decision rules for picking a token by purpose. |
| **color-themes** | [color-themes.md](color-themes.md) | Full per-theme token tables (name → hex → primitive source → description) for every text, background, border, underline, and shadow slot. Load alongside `color` when you need canonical token data for a specific theme. |
| **typography** | [typography.md](typography.md) | Type scale (Display → Caption), heading hierarchy, font families (Dovetail MVB / Kiva Post Grotesk), pairing rules, and Tailwind utility class mappings (`tw-text-*`). |
| **layout** | [layout.md](layout.md) | Breakpoint tiers (XS/SM/MD/LG/XL), column/gutter/margin specs, content max-width rules, nested grids, and rules for aligning content on the grid. |
| **spacing** | [spacing.md](spacing.md) | Semantic spacing categories (Structure, Component Gap, Component Inset, Micro), the 4px-grain ramp, responsive per-tier values, and the "between vs. inside" decision for picking a token. |
| **radius** | [radius.md](radius.md) | Border-radius token scale (`none` → `full`), per-component use cases, the `inner = outer − gap` concentric formula, and the `tw-rounded` = 16px gotcha. |

---

## Routing rules — which sub-skill(s) to load

### By task type

| Task | Load these sub-skills |
|---|---|
| Audit component for design compliance | color + typography + spacing + radius (the four most commonly violated) |
| Audit layout / responsive breakpoints | layout |
| Generate a new component | Load the sub-skills that match the component's visual categories (color + typography is almost always needed; add spacing, radius, layout as the component requires) |
| Answer a token question about color | color (+ color-themes if a specific theme's values are needed) |
| Answer a token question about type | typography |
| Answer a token question about space | spacing |
| Answer a token question about corners | radius |
| Answer a question about the grid / breakpoints | layout |
| Figma-to-code handoff involving color | color + color-themes |
| Figma-to-code handoff involving a full component | All sub-skills that the component's design touches |

### By keyword in the task

- **"color", "background", "text color", "border color", "theme"** → color (+ color-themes for specific values)
- **"font", "heading", "type style", "text size", "tw-text-"** → typography
- **"spacing", "padding", "gap", "margin between"** → spacing
- **"radius", "rounded", "corner"** → radius
- **"grid", "column", "breakpoint", "responsive", "layout"** → layout

---

## Use-case playbooks

### 1 — Auditing code for design-system compliance

**Goal:** Identify violations — hardcoded values, wrong tokens, missing classes — and recommend the correct replacement.

**Steps:**

1. Load the sub-skills that cover the component's visual categories (see routing rules above).
2. Scan the target code for:
   - Hardcoded hex values, raw `px` sizes, or `font-*` properties instead of token-backed utilities.
   - Tailwind classes from stock Tailwind that the Kiva preset overrides or disables (e.g. `text-lg`, `font-bold` without the `tw-` prefix).
   - Incorrect token usage — right category, wrong semantic role (e.g. using `text/secondary` for an interactive link instead of `text/action`).
   - Radius values applied as raw `px` instead of `tw-rounded-*` utilities.
   - Color primitives (e.g. `eco-green/3`) used directly in a component instead of the semantic layer.
3. For each violation, cite the sub-skill rule that applies and give the specific corrected class or token name.
4. Flag any divergence between the Figma-canonical spec (sub-skill) and the current shipped code — note it as a known sync gap, not a compliance failure.

### 2 — Generating new UI code

**Goal:** Produce HTML/Vue/Tailwind code that uses the correct Kiva tokens and utility classes from the first line.

**Steps:**

1. Before writing any markup, load the sub-skills that correspond to the component's visual areas.
2. Apply type styles exclusively via `tw-text-*` utilities (e.g. `tw-text-headline`, `tw-text-body`); never set `font-family`, `font-size`, `font-weight`, `line-height`, or `letter-spacing` by hand.
3. Use semantic color tokens via the `tw-bg-*` / `tw-text-*` / `tw-border-*` utilities backed by `@kiva/kv-tokens`; never use a hex value or a primitive token name in a component.
4. Apply spacing via token-backed utilities — reach for the spacing sub-skill to pick the right semantic category before picking a size.
5. Apply border radius via `tw-rounded-*` utilities — reach for the radius sub-skill to match the component family to the correct token.
6. Verify that any utility class you write exists in the Kiva preset, not just in stock Tailwind. Note the sync-gap caveat from each sub-skill for any class you are unsure about.

### 3 — Answering design token questions

**Goal:** Give a specific, correct answer about which token to use and why — no guessing from memory.

**Steps:**

1. Load the targeted sub-skill (see routing rules).
2. Find the token or rule that directly answers the question.
3. Quote the token name, its utility class, and the decision rule from the sub-skill.
4. If the question involves two similar tokens, use the sub-skill's decision guidance (e.g. the "between vs. inside" rule in spacing, or the role/slot grammar in color) to explain the difference.
5. Flag any case where the Figma-canonical value in the sub-skill may differ from what is currently shipped in code (every sub-skill has an "Outstanding discrepancies" section).

### 4 — Figma-to-code handoff

**Goal:** Map Figma token names and theme values to the `@kiva/kv-tokens` Tailwind utilities a developer will actually write.

**Steps:**

1. Load **color + color-themes** for any color decision (nearly always needed).
2. Load the additional sub-skills matching the design's visual categories.
3. For each Figma token name, locate its row in the relevant sub-skill table and provide:
   - The semantic token name (e.g. `text/action`)
   - The Tailwind utility class (e.g. `tw-text-action`)
   - The hex value for the active theme (from color-themes)
4. For layout, map Figma's frame width and auto-layout gap values to the breakpoint tier and spacing token using the layout + spacing sub-skills.
5. For typography, map Figma's text style name to the correct `tw-text-*` utility.
6. Call out any Figma token that does not yet have a shipped code equivalent — use the "Outstanding discrepancies" section of the relevant sub-skill.

---

## Important standing rules

1. **Figma is the source of truth for design intent.** The sub-skills capture that intent. Shipped code may lag; always note divergence rather than silently adopting the code value as correct.
2. **Never reach past the semantic layer.** Components use semantic tokens (e.g. `text/action`). Primitives (e.g. `eco-green/3`) are only for defining semantics — never in component code.
3. **No bespoke styles.** Do not write inline `style` attributes or custom CSS to set color, typography, spacing, or radius values. Always use the token-backed utility class. If no class fits, that is a signal for the design system team.
4. **Token names are surface-specific.** In Figma: `base` (radius). In code: `default` → generates `tw-rounded`. Both refer to the same token. When bridging surfaces, use the name native to each surface.
5. **Verify before committing.** The sub-skills note which token names or class names may not yet be shipped. Check `@kiva/kv-tokens/configs/tailwind.config.js` or the dist output before depending on a class name in production code.
