---
name: make-to-vue
description: Use when porting a Figma Make (or other React) component into a Vue 3 component for @kiva/kv-components — typically triggered by a request like "port this to Vue", "convert this React component", or when the user shares Figma Make code, a Figma Make URL, or a Figma file link.
---

# Figma Make to Vue Component Porting Guide

A repeatable process for converting Figma Make-generated React components into Vue 3 components for `@kiva/kv-components`.

## How to Use This Skill

**Announce at start:** "I'm using the make-to-vue skill to port `<ComponentName>` into kv-components."

Then walk the [Procedure](#procedure) below in order. Each phase has explicit verification steps; do not move to the next phase until the current one passes. If any **Stop-and-ask** condition fires, pause and check with the user before continuing.

### Inputs You Need Before Starting

Before Phase 1, confirm you have at least one of the following. If none are present, **stop and ask the user** which they can provide:

- React/TSX source code for the component (pasted, attached, or saved into the repo — `/source-files/` at the repo root is a suggested location but not required)
- A Figma Make URL (so the source can be inspected/exported)
- A Figma file or frame link for the target design (for visual reference, color, and spacing verification)

Screenshots help but are not a substitute for source code or a Figma link.

### Stop-and-Ask Conditions

Pause and ask the user rather than guessing when:

- No source code or Figma Make URL is available — porting from a screenshot alone will produce drift.
- The component overlaps an existing kv-components component (see Phase 1.2). Confirm whether to extend the existing one, create a `V2`, or build a new component.
- Hardcoded colors don't map cleanly to a design token. Confirm the intended token rather than inventing a new hex.
- The source uses an animation library (`motion/react`, `framer-motion`, etc.) and the equivalent CSS transition would visibly differ. Confirm whether to match exactly or adapt.
- Accessibility behavior is unclear (e.g., what should screen readers announce, what should keyboard interactions trigger).

## Procedure

The [Quick Reference: Porting Checklist](#quick-reference-porting-checklist) at the end of this doc is the spine — work through it top-to-bottom. The phases below elaborate each step. After every phase, run the listed verification before moving on.

### Verification Gates

| After Phase | Verify |
|-------------|--------|
| 1 (Analysis) | You can name the props, state, sub-components, animations, and existing equivalents. If not, re-read the source. |
| 2 (Translation) | Component renders in Storybook with representative data and no console errors. |
| 3 (Structure) | Component is exported in `src/vue/index.ts` and visible in Storybook sidebar under the correct folder prefix. |
| 4 (Design system) | No raw hex colors or pixel spacing remain unless the user explicitly approved them. |
| 5 (Testing) | `npm run test` passes (lint + jest), including `jest-axe` accessibility check. |
| 6 (Storybook) | Default + edge-case stories render correctly under visual review. |

If a verification fails, fix the underlying issue before continuing — do not paper over it to keep moving.

## Prerequisites

- Source React code available (see [Inputs You Need Before Starting](#inputs-you-need-before-starting))
- Familiarity with the target component's Figma design (request links/screenshots if needed)
- Read `@kiva/kv-components/AGENTS.md` for component development patterns

## Phase 1: Analysis

### 1.1 Read the React Source

Read the source file and identify:

- **Props and data model** — What data does the component accept? Is it hardcoded or dynamic?
- **State management** — React hooks (`useState`, `useEffect`, `useRef`) that need Vue equivalents
- **Sub-components** — Internal components that may become part of the Vue file or separate utils
- **External dependencies** — Libraries used (e.g., `motion/react`, `framer-motion`)
- **Styling approach** — Tailwind classes, inline styles, CSS modules

### 1.2 Check for Existing Equivalents

```
# Check if a similar component already exists
Glob: @kiva/kv-components/src/vue/Kv*<ComponentName>*.vue

# Check for reusable utils
Glob: @kiva/kv-components/src/utils/**/*
```

Decide: new component, v2 of existing, or enhancement to existing.

### 1.3 Identify What Changes

Figma Make output is presentational/demo code. Determine what needs to change:

- **Hardcoded data** -> Dynamic props
- **Hardcoded colors** -> Design system tokens from `@kiva/kv-tokens`
- **Fixed dimensions** -> Container-responsive sizing
- **Presentational strings** -> Configurable via props/slots
- **React animation libraries** -> CSS transitions or Vue composables (prefer no extra deps)

### 1.4 New Sibling Component vs. Extending an Existing One

When the source overlaps an existing kv-component, decide which path to take:

| Situation | Decision |
|-----------|----------|
| Same renderer, additional variant or mode | Extend the existing component (new prop, new slot) |
| Same renderer, breaking change | Create a `V2` (e.g. `KvPieChartV2`) |
| **Different renderer or fundamentally different runtime cost** | **New sibling component** |

Example: `KvMap` uses MapLibre/Leaflet (WebGL/canvas, tile fetching, ~200KB+ over the wire). A storytelling map driven by inline SVG paths and CSS transforms has none of those costs. Adding a `mode` prop would force every `KvMap` consumer to think about both paths and would bundle code most callers don't use. The right call is a sibling (`KvSimpleMap`) that shares the design vocabulary but not the implementation.

**Stop-and-ask** if the choice isn't obvious — the wrong call is expensive to undo.

### 1.5 External Data Modules

If the source imports a generated or large data module (SVG path dictionaries, GeoJSON, country lists, icon registries, etc.), **copy it into `src/data/` as-is**. Do not translate, reformat, or hand-edit. These files are usually exported from a tool (Figma, Mapshaper, etc.) and should be treated as opaque assets.

- Place the file alongside existing data assets in `src/data/`
- Rename to a descriptive, kv-style name (e.g. `simpleMapPaths.ts`, not `svg-iw48hjyvei.ts`)
- Re-export the default export with a typed name where useful
- Do **not** inline the data into the component file — keeps the component readable and lets the data module be tree-shaken or lazy-imported if needed

Reference: `KvMap.vue` lazy-imports `data/ne_110m_admin_0_countries.json` via dynamic `import()` to keep it out of the main chunk. Do the same when the data is large and only needed when the component actually mounts.

## Phase 2: Translation Patterns

### 2.1 React Hooks to Vue Composition API

| React | Vue 3 |
|-------|-------|
| `useState(value)` | `ref(value)` |
| `useEffect(() => {}, [deps])` | `watch(deps, () => {})` or `onMounted(() => {})` |
| `useRef(null)` | `ref(null)` or `templateRef` |
| `useMemo(() => {}, [deps])` | `computed(() => {})` |
| `useCallback(() => {}, [deps])` | Plain function (no memoization needed in Vue) |
| Custom hooks | Composables in `src/utils/use*.ts` |

### 2.2 JSX to Vue Template

| React JSX | Vue Template |
|-----------|-------------|
| `{condition && <div>}` | `<div v-if="condition">` |
| `{items.map(item => <X key={item.id} />)}` | `<X v-for="item in items" :key="item.id" />` |
| `className="..."` | `class="..."` |
| `style={{ color: 'red' }}` | `:style="{ color: 'red' }"` |
| `onClick={handler}` | `@click="handler"` |
| `{children}` | `<slot />` |
| `<motion.div animate={...}>` | CSS transitions or Vue transition components |

### 2.3 Styling Translation

Figma Make outputs raw Tailwind classes. Convert to kv-components patterns:

- **Always use the project's Tailwind config** (`@kiva/kv-tokens/configs/tailwind.config.js`) as the source of truth for available utilities, the `tw-` prefix, the spacing scale (8px-based, not Tailwind's default 4px), and the colour palette. Don't introduce raw hex values, hardcoded `px`/`rem` literals, or arbitrary class names where a token-backed utility exists.
- **Apply the `tw-` prefix everywhere.** That includes class attributes in markup *and* `@apply` directives inside `<style lang="postcss" scoped>` blocks. `@apply tw-w-4 tw-h-4 tw-bg-white tw-border tw-border-tertiary tw-rounded-xs;` is the preferred way to assemble shared styles and pseudo-state rules; raw CSS belongs only where no utility exists (e.g. one-off `box-shadow` values, animation keyframes).
- **Replace hardcoded font families** with design system fonts (`tw-font-sans`, `tw-font-serif`).
- **Replace hardcoded colors** with token references — semantic Tailwind utilities (`tw-bg-primary`, `tw-text-secondary`, `tw-border-tertiary`) first, then named-palette utilities (`tw-bg-eco-green-2`, `tw-text-gray-300`); reach into `kvTokensPrimitives.colors[...]` from JS only when the colour must reach a non-class consumer (e.g. an SVG `:fill` binding).
- **Replace pixel values** in Tailwind classes with spacing scale values (8px increments). `tw-w-4` = 32px, not 16px — verify against the token scale, not Tailwind defaults.
- **Reference the kv-tokens skills** as the canonical guide for any text-styling decision before writing custom CSS. Start with [@kiva/kv-tokens/docs/skills/typography.md](../../kv-tokens/docs/skills/typography.md) for the semantic type scale, heading hierarchy, font pairing, and HTML / Tailwind mappings — always consult it before picking a heading element or text utility.

### 2.4 Animation Translation

Prefer CSS-native animations: CSS transitions, Tailwind utility classes, and Vue's built-in `<Transition>` / `<TransitionGroup>` for enter/leave. Reach for a JS-driven composable only when the animation is genuinely numeric (count-up, interpolated values, multi-step choreography that can't be expressed declaratively).

| Figma Make / React | Vue Equivalent |
|--------------------|----------------|
| `motion.div` with `animate={...}` | Bind reactive style/class; let CSS transition handle the tween |
| `transition={{ duration: 0.5 }}` | `transition: property 500ms ease-in-out` (or `tw-transition tw-duration-500`) |
| `transition={{ ease: [...] }}` | `transition-timing-function: cubic-bezier(...)` |
| Staggered animations | Computed `transition-delay` per item index |
| Spring animations | CSS `cubic-bezier()` or `ease-in-out` (springs rarely visibly differ at small distances) |
| `<AnimatePresence>` + `initial`/`animate`/`exit` | Vue `<Transition>` with `enter-from`/`enter-to`/`leave-from`/`leave-to` classes |
| `requestAnimationFrame` hooks | Vue composable with `onMounted`/`onUnmounted` lifecycle |
| Opacity/transform tweens | CSS transitions on those properties |
| `setTimeout`-driven cycles | Vue composable that owns the timer set + cleanup (see 2.5) |

Guidelines:

- **Default to declarative.** If the animation can be expressed as "this style depends on this state, transition between them," it belongs in CSS — not in a JS animation loop.
- **One key per remountable element.** When porting `AnimatePresence` keyed children, preserve the `:key` on the Vue side so `<Transition>` treats each instance as a fresh mount/unmount.
- **Match perceived timing, not the exact curve.** Spring → ease-in-out and motion's default cubic → a similar `cubic-bezier` are acceptable substitutions unless the user says otherwise. **Stop-and-ask** if the source uses a noticeably distinct easing (overshoot, bounce).
- **Tailwind first, scoped CSS second.** Prefer `tw-transition`, `tw-duration-*`, `tw-ease-*` utilities; fall back to `<style scoped>` only when a utility doesn't exist for the property or curve.
- **Don't add a JS animation library.** No `framer-motion` Vue equivalent, no `gsap`, no `motion-vue`. If a component genuinely needs orchestrated numeric animation, write a small composable.

### 2.5 Timer-Driven Cycles → Composables

`setTimeout`/`setInterval` choreography inside a React `useEffect` should become a composable that owns its timer set and cleans up on unmount. Component files stay declarative; the cycle becomes independently testable.

Guidelines:

- **One owner for timers.** The composable creates timers, holds the references, and clears them on unmount or `stop()`. The component doesn't manage timers directly.
- **Cancellation is non-negotiable.** Always provide a teardown path and call it from `onBeforeUnmount`. Stale timers firing after unmount are a common source of port bugs.
- **Expose state, not timers.** Return reactive refs (current step, active flag, etc.) and `start`/`stop` controls — never raw timer IDs.
- **Test with fake timers.** Use `jest.useFakeTimers()` to assert state transitions at each step boundary without rendering the component.
- **Make timings injectable.** Pass durations/delays as options with sensible defaults so the cycle can be tuned per consumer (and sped up in tests).

### 2.6 Container-Responsive Sizing

Figma Make outputs **fixed pixel dimensions**. kv-components must be responsive by default, with optional explicit overrides.

Guidelines:

- **Default to 100% width.** Never hardcode a container width into the component.
- **Mirror existing sizing props.** When a kv-component already implements responsive sizing (e.g. `KvMap` with `aspectRatio` / `height` / `width` props and a `mapDimensions` computed), follow that prop shape so consumers have one mental model.
- **Decouple internal coordinates from rendered size.** SVG `viewBox`, math keyed off the source's `CONT_W`/`CONT_H` constants, etc. should remain at their natural values; the *container* is what scales. If the source's pan/zoom math is keyed off fixed pixel dimensions, derive those from `getBoundingClientRect()` at runtime.
- **Use `ResizeObserver` if the container can resize after mount.** Fall back gracefully where it isn't supported.
- **Aspect-ratio prop, not fixed height.** A numeric `aspectRatio` (width / height) lets the component scale fluidly; explicit `height`/`width` props are escape hatches, not the default path.

## Phase 3: Component Structure

### 3.1 File Creation Checklist

1. `src/vue/Kv<Name>.vue` — Main component
2. `src/utils/<utilName>.ts` — Extracted logic (composables, helpers)
3. `src/vue/stories/Kv<Name>.stories.ts` — Storybook stories (create EARLY)
4. `tests/unit/specs/components/Kv<Name>.spec.ts` — Component tests
5. `tests/unit/specs/utils/<utilName>.spec.ts` — Utility tests
6. Export in `src/vue/index.ts`

### 3.2 Component Patterns

Follow these kv-components conventions:

- **Script**: `<script lang="ts">` with `export default { setup() {} }` or `<script setup lang="ts">`
- **Styling**: `<style lang="postcss" scoped>` for component-specific styles
- **Props**: TypeScript typed with JSDoc for Storybook auto-docs
- **Naming**: `Kv` prefix, PascalCase (e.g., `KvPieChartV2`)
- **Accessibility**: ARIA attributes, semantic HTML, keyboard support
- **No references to the source framework**: The shipped Vue component is the source of truth — code, comments, and JSDoc must not mention "React", "Figma Make", "the React source", etc. Strip these as you translate, and double-check before committing.

### 3.3 When to Extract Utils

Extract into `src/utils/` when:
- Logic involves lifecycle management (rAF, timers, observers)
- Logic is reusable across components
- Logic is complex enough to benefit from independent unit testing
- The main component file would exceed ~300 lines without extraction

## Phase 4: Design System Integration

### 4.1 Colors

Always check `@kiva/kv-tokens` for existing color tokens before using hardcoded hex values. Map Figma Make colors to the closest token:

```js
import kvTokensPrimitives from '@kiva/kv-tokens';
const { colors } = kvTokensPrimitives;
// colors['eco-green'].DEFAULT, colors.marigold['3'], etc.
```

### 4.2 Typography

The canonical reference for type styling is the [kv-tokens typography skill](../../kv-tokens/docs/skills/typography.md). Consult it before picking a heading element or a text utility; it covers the semantic type scale (`tw-text-display`, `tw-text-headline`, `tw-text-title`, `tw-text-base`, `tw-text-caption`, etc.), heading hierarchy, font pairing, and the HTML / Tailwind mappings.

Quick guidance for a port:
- **Map Figma Make font references** by intent, not by raw weight: pick the semantic utility (e.g. `tw-text-headline`, `tw-text-title`, `tw-text-label`) that matches the role the text plays. Don't translate `font-weight: 500` into a hand-set numeric weight — pick the utility that the design system says owns "medium" emphasis.
- **Font family** → `tw-font-sans` (PostGrotesk) by default; only switch when the typography skill calls for `tw-font-serif`.
- **Heading elements** → follow the heading hierarchy described in the typography skill so any new `<h1>`–`<h6>` usage you introduce uses the correct semantic level for its role.
- If no existing element default or utility class fits the design, that's a signal to stop and confirm with the design system team — not to author bespoke CSS.

### 4.3 Spacing

Convert pixel values to the 8px spacing scale:
- `4px` -> `tw-p-0.5`
- `8px` -> `tw-p-1`
- `16px` -> `tw-p-2`
- etc.

## Phase 5: Testing

### 5.1 Test Requirements

Every ported component must have:

1. **Accessibility test** — jest-axe `toHaveNoViolations()`
2. **Rendering tests** — correct output for various prop combinations
3. **Interaction tests** — click/hover/keyboard behaviors
4. **Edge cases** — empty data, single item, maximum items
5. **Utility tests** — independent tests for extracted composables/helpers

### 5.2 Test Structure

```ts
import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvComponentName from '#components/KvComponentName.vue';

describe('KvComponentName', () => {
  it('should have no automated accessibility violations', async () => {
    const { container } = render(KvComponentName, { props: { /* ... */ } });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // ... rendering, interaction, edge case tests
});
```

## Phase 6: Storybook

Create stories early in the process for visual review:

1. **Default story** with representative data
2. **Loading/skeleton state**
3. **Edge cases** (empty, single item, many items)
4. **Prop variations** (different modes, sizes, configurations)
5. **Interactive controls** via argTypes

## Quick Reference: Porting Checklist

- [ ] Read React source, identify hooks/state/deps/sub-components
- [ ] Check for existing kv-components equivalents
- [ ] Map hardcoded values to design system tokens
- [ ] Create Storybook story early for visual review
- [ ] Translate React hooks to Vue Composition API
- [ ] Convert JSX to Vue template with `tw-` prefix classes
- [ ] Replace animation libraries with CSS transitions
- [ ] Extract complex logic into `src/utils/` composables
- [ ] Export component in `src/vue/index.ts`
- [ ] Write component tests with jest-axe accessibility check
- [ ] Write utility tests for extracted logic
- [ ] Review in Storybook across stories
- [ ] Run `npm run test` (lint + jest)
