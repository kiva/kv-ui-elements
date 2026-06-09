---
name: kiva-tailwind
description: How to use Tailwind CSS v3 when it is backed by Kiva's design tokens — what the @kiva/kv-tokens preset changes about stock Tailwind (the tw- prefix, themable colors compiled to CSS custom properties, disabled core plugins, token-driven scales, an opinionated base layer), how to wire the preset into a project, and how the preset is compiled from DTCG tokens. Mechanical and integration-focused; for which token to pick, defer to the per-topic skills (color, spacing, radius, typography, layout).
when_to_use: When authoring or reviewing Tailwind utility classes in any repo that uses the Kiva preset (kv-components, kiva/ui, and other consumers), when setting up the preset in a new project, when a Tailwind class behaves differently than stock Tailwind would suggest (e.g. tw-text-lg or tw-font-bold "not working"), or when modifying the design-token → Tailwind pipeline inside this monorepo. Read this for how the system works and how to use it; read color/spacing/radius/typography/layout for which value to choose.
make_kit:
  include: true
  category: foundations
  order: 10
---

# Kiva Tailwind

## Source of truth

The canonical definition of Kiva's Tailwind setup is the **preset itself** — [`@kiva/kv-tokens/configs/tailwind.config.js`](../../configs/tailwind.config.js) — and the design tokens it compiles from. Unlike the design-intent skills (color, spacing, etc.), which describe Figma intent that code may temporarily lag, this skill describes **shipped mechanics**: how the preset reshapes Tailwind and how to author against it.

This skill deliberately **does not enumerate class values**. Exact scales drift as tokens change, and listing them here would duplicate the per-topic skills and the config. For specific values, read the config or the relevant sub-skill of the
**kiva-design-system** skill (in the kiva-design-system plugin):

- **color** / **color-themes** — which color token, what the themes are.
- **spacing** — which spacing token for a given relationship.
- **radius** — which corner radius per component.
- **typography** — which text style, the type scale.
- **layout** — the breakpoint/grid system and content placement.

Verify any specific class or value against the current config before depending on it.

## What the preset is (mental model)

Kiva does not ship a stylesheet you import — it ships a **Tailwind preset**: a partial `tailwind.config.js` that a consuming project merges into its own config via the `presets` array. Tailwind then generates utility classes from the merged result.

The preset is itself generated from design tokens. The full path a value travels:

```
tokens/*.json (DTCG)  →  Style Dictionary build  →  dist/js/tokens.js
        │                                                   │
        │                                                   ▼
        │                              configs/tailwind.config.js  (the preset)
        │                                                   │
        └──────────────► dist/css/tokens.css                ▼
            (themed CSS custom properties)     your project's tailwind.config.js
                                                  (presets: [tailwindConfig])
                                                            │
                                                            ▼
                                                  generated tw-* utilities
```

Two consequences worth internalizing up front:

1. **You author Tailwind utilities as normal** — the preset changes *which* utilities exist and what they resolve to, not *how* Tailwind works.
2. **Themable colors are not baked into the CSS at build time.** They compile to `var(--token)` references and are resolved at runtime from CSS custom properties (see [Color](#color-is-semantic-themable-and-runtime-resolved) below). This is the single biggest departure from stock Tailwind.

## Consuming the preset

This is the common case: a project that installs `@kiva/kv-tokens` and wants Kiva styling.

### 1. Install

```sh
npm i --save-dev @kiva/kv-tokens
```

### 2. Register the preset

```js
// tailwind.config.js
import { tailwindConfig } from '@kiva/kv-tokens';

export default {
	presets: [tailwindConfig],
	content: [
		// YOUR project's template globs — the preset does not set these for you
		'./src/**/*.{vue,js,ts}',
	],
};
```

Two equivalent import paths exist:

- `import { tailwindConfig } from '@kiva/kv-tokens'` — named export from the package index.
- `import tailwindConfig from '@kiva/kv-tokens/tailwind'` — the config file directly, via the `./tailwind` export.

Use either. **You own `content`** — Tailwind purges any class it can't find in your templates, so an incomplete `content` glob is the most common reason a Kiva class "doesn't show up."

### 3. Make themable colors resolve (required for color to render)

Themable color utilities (`tw-bg-primary`, `tw-text-primary`, …) emit `rgb(var(--bg-primary))`-style values. Those custom properties must exist on the page. The preset already injects the **default theme** onto `:root` via its base layer, so a project that registers the preset gets working colors out of the box.

To switch themes, swap the custom-property values for a subtree. In `@kiva/kv-components` this is done by `KvThemeProvider`; at the token layer, `@kiva/kv-tokens/css` ([`dist/css/tokens.css`](../../dist/css/tokens.css)) ships a `:root` block plus `[data-theme="…"]` blocks you can apply directly. See the **kiva-design-system** skill's color sub-skill for the theme catalog.

### 4. Safelist dynamically generated classes (only if you need it)

Tailwind only emits classes it can statically find in `content`. If you generate class names at runtime (e.g. a styleguide that renders every color name), build a `safelist`. `@kiva/kv-components` does this by resolving the preset and enumerating theme keys:

```js
import resolveConfig from 'tailwindcss/resolveConfig';
import { tailwindConfig as sharedConfig } from '@kiva/kv-tokens';

const { theme } = resolveConfig(sharedConfig);
// …walk theme.backgroundColor, theme.spacing, etc. to build a safelist array
```

Most projects do **not** need this — reach for it only when class names aren't present as literal strings in your source.

## Authoring with the Kiva preset

This section is the heart of the skill: how stock Tailwind v3 knowledge changes once the preset is in place. Each item is a rule, the reason, and what to do instead.

### Every utility carries the `tw-` prefix

The preset sets `prefix: 'tw-'`. Every generated class is prefixed: `tw-flex`, `tw-mb-2`, `tw-bg-primary`.

- The prefix sits **after** any variant: `hover:tw-bg-primary`, `md:tw-flex`, `dark:tw-text-primary` — not `tw-hover:...`.
- It sits **after** a negative sign: `-tw-mt-2`.
- Arbitrary values keep the prefix: `tw-mt-[3px]`.

If a class isn't taking effect, the missing `tw-` is the first thing to check. When porting markup from a stock-Tailwind project, every utility needs the prefix added.

### Color is semantic, themable, and runtime-resolved

The preset replaces Tailwind's default color palette. There are two families:

- **Themable (semantic) colors** — role-based names like `primary`, `secondary`, `action`, etc., available on text, background, border, ring, divide, placeholder, and gradient-stop utilities: `tw-text-primary`, `tw-bg-secondary`, `tw-border-primary`. These compile to `rgb(var(--…))` and change with the active theme. **This is what you should reach for by default.**
- **Static colors** — fixed palettes that do *not* change with theme: `brand`, `eco-green`, `marigold`, `desert-rose`, `stone`, `gray`, `social`, plus `black` / `white` / `transparent` / `current`. Use these only when a color must stay constant regardless of theme.

Opacity modifiers work on both: `tw-bg-primary/50` resolves to `rgba(var(--bg-primary), 0.5)`. Do **not** assume stock Tailwind color names exist — `tw-bg-gray-500` works (gray is a static palette) but `tw-bg-slate-500`, `tw-text-red-600`, etc. do not. For *which* token, see the **kiva-design-system** skill's color sub-skill.

### Spacing is an 8px scale with 4px half-steps

The spacing scale is token-driven: each whole step is **8px** (`tw-p-1` = 8px, `tw-m-2` = 16px), with `.5` half-steps at **4px** granularity (`tw-p-0.5` = 4px, `tw-gap-1.5` = 12px), running up to `16` (128px). This differs from stock Tailwind's 4px-per-step scale, so the *same number means a different size* — `tw-p-4` is 32px here, not 16px. Apply a scale token, never a raw pixel value; see the **kiva-design-system** skill's spacing sub-skill.

### Text sizing utilities don't exist — use semantic text styles

The preset **disables the `fontSize`, `lineHeight`, and `letterSpacing` core plugins.** That means these stock utilities are **not generated**:

- No `tw-text-xs` / `tw-text-lg` / `tw-text-2xl` (font-size scale)
- No `tw-leading-*` (line-height)
- No `tw-tracking-*` (letter-spacing)

Size, line-height, and letter-spacing are bundled into **semantic text-style utilities** instead — `tw-text-h1`, `tw-text-body`, `tw-text-caption`, and the 2026 styles (`tw-text-display`, `tw-text-headline`, `tw-text-title`, …). Note `tw-text-{color}` still works (color is a separate concern); only the *sizing* `tw-text-*` utilities are gone. So `tw-text-primary` (color) is valid; `tw-text-lg` (size) is not. Reach for a semantic style; see the **kiva-design-system** skill's typography sub-skill.

### Font weight tops out at `medium` (500)

Available weights are `light` (300), `normal` (400), and `medium` (500) — plus `book` as a legacy alias for 300. There is **no `tw-font-bold`** (700) or `tw-font-semibold`. Additionally, the base layer sets `strong` / `b` to normal weight (400), so bolding text requires an explicit weight utility and the design system's heaviest weight is `medium`.

### Border-radius is token-driven and `tw-rounded` ≠ pill

`tw-rounded` (the unsuffixed utility) resolves to **16px**, not a small radius, and `tw-rounded-full` is the pill/circle. This is a frequent porting bug from stock Tailwind. See the **kiva-design-system** skill's radius sub-skill for the full scale and the concentric-corner rules.

### Breakpoints are `md` / `lg` / `xl` (mobile-first, no `sm`)

The preset defines only three min-width screens — `md`, `lg`, `xl` — plus a `print` screen. There is **no `sm:` and no `2xl:`**. Unprefixed utilities are the mobile/base tier; the design system's smaller tiers (XS, SM in the layout skill) both fall under "no prefix" in Tailwind. Use `print:` to target print styles. For the grid and tier semantics, see the **kiva-design-system** skill's layout sub-skill.

### Z-index, shadow, and opacity are small named scales

- **z-index** uses semantic names (`tw-z-modal`, `tw-z-dropdown`, `tw-z-sticky`, `tw-z-toast`, …) rather than `tw-z-10` / `tw-z-50`. Pick by role.
- **box-shadow** ships only `tw-shadow` (default) and `tw-shadow-lg`. There is no `tw-shadow-md` / `tw-shadow-xl` scale.
- **opacity** utilities are limited (`tw-opacity-0`, `tw-opacity-10`, `tw-opacity-low`, `tw-opacity-full`) — the full `0–100` scale is not generated. (Color opacity *modifiers* like `tw-bg-primary/50` are unaffected and work normally.)

### The base layer styles bare HTML

The preset's plugin injects global element styles via `addBase`: web fonts, `body` typography and color, `h1`–`h5`, `small`, `code`, `blockquote`, links (`a`), `hr`, and input placeholders, plus a button focus reset. Two implications:

- Bare semantic HTML is already styled — don't re-apply utilities to recreate what the base layer provides.
- `h6` is **not** styled by the base layer, and `strong`/`b` are set to normal (400) weight. Don't assume browser defaults for those.

The `@tailwindcss/typography` plugin is included with Kiva overrides, so `tw-prose` is available for long-form rich text.

### Escape hatches

When no token fits, Tailwind's arbitrary-value syntax still works with the prefix (`tw-mt-[7px]`, `tw-bg-[#123456]`). Treat this as a last resort and a signal: a recurring need for an off-scale value is a design-system conversation, not a one-off. Prefer a token every time one exists.

## How the preset is compiled

Read this section when working **inside this monorepo** to change a value or understand where one comes from.

### Token authoring

Tokens are authored as [W3C DTCG](https://design-tokens.github.io/community-group/format/) JSON under [`tokens/`](../../tokens/):

- [`tokens/core/`](../../tokens/core/) — primitives (color, size/space/radius/border-width, typography, z-index, opacity).
- [`tokens/semantic/themes/`](../../tokens/semantic/themes/) — per-theme semantic tokens that reference primitives.

### Build pipeline

`npm run build` (also run automatically by the `prepare` lifecycle hook on install) does three things:

1. **Style Dictionary** ([`build/style-dictionary.config.js`](../../build/style-dictionary.config.js)) emits `dist/js/tokens.js` (flat named exports **and** a nested default export), `dist/css/tokens.css` (themed CSS custom properties as `R, G, B` triples so opacity composes), and `dist/scss/tokens.scss`.
2. **`build/build-dtcg.js`** deep-merges all source files into the single manifest `dist/dtcg/tokens.json`.
3. **`build/build.js`** copies fonts and emits the heading-underline SVG sprite.

`dist/` is gitignored but regenerated by `prepare`, so a fresh `npm install` leaves it ready for workspace consumers like `@kiva/kv-components`.

### How the config assembles the theme

[`configs/tailwind.config.js`](../../configs/tailwind.config.js) imports the generated `dist/js/tokens.js` plus two helper modules and builds the Tailwind `theme`:

- **[`configs/kivaColors.js`](../../configs/kivaColors.js)** — `buildColorChoices(category)` maps each semantic token name to a `withOpacity('--token')` function so utilities emit `rgb(var(--token))` / `rgba(var(--token), <opacity>)`. It also exports per-theme objects (`defaultTheme`, `greenLightTheme`, …) that are sets of CSS custom properties.
- **[`configs/kivaTypography.js`](../../configs/kivaTypography.js)** — text styles, web-font `@font-face` rules, and prose overrides.

The config then:

- Sets `prefix`, `screens`, `spacing`, `borderRadius`, `fontFamily`, `fontWeight`, `borderWidth`, `opacity`, `zIndex`, `boxShadow`, and static `colors` directly from token values.
- Disables `container`, `fontSize`, `letterSpacing`, and `lineHeight` core plugins.
- In `theme.extend`, wires themable color categories (`textColor`, `backgroundColor`, `borderColor`, …) to `buildColorChoices` output.
- Registers a custom plugin that: `addBase` for element styles and web fonts, injects `:root` = `defaultTheme` custom properties, and `addUtilities` for the semantic text styles (which inherit the `tw-` prefix → `tw-text-h1`, etc.).

### Changing a value safely

- **To change a token value** (a color, a spacing step, a radius), edit the relevant file under `tokens/`, then run `npm run build` to regenerate `dist/`. Do **not** hand-edit `dist/` — it is generated.
- **To change Tailwind structure** (add a utility category, adjust a base style, enable a core plugin), edit `configs/tailwind.config.js` directly.
- After either change, rebuild and verify against a consumer (e.g. run Storybook in `@kiva/kv-components`).
- Package exports (which subpath resolves to what) are documented in the [README](../../README.md#package-exports).

## Common mistakes

- Forgetting the **`tw-` prefix** on a utility (or writing `tw-hover:` instead of `hover:tw-`).
- Using **stock Tailwind color names** (`tw-bg-slate-500`, `tw-text-red-600`) that the preset doesn't define.
- Reaching for **`tw-text-lg` / `tw-leading-*` / `tw-tracking-*`** — disabled; use semantic text styles.
- Expecting **`tw-font-bold`** — the heaviest weight is `medium` (500).
- Treating **`tw-rounded`** as a small radius — it's 16px; use `tw-rounded-full` for pills.
- Assuming a **`sm:`** breakpoint or the full **opacity / shadow / z-index** numeric scales exist.
- Using **raw pixel values** instead of scale tokens; or assuming a spacing number matches stock Tailwind (`tw-p-4` is 32px here).
- An incomplete **`content`** glob (or missing `safelist` for runtime-generated classes), so Tailwind purges classes you expected.
- Hand-editing **`dist/`** instead of editing `tokens/` and rebuilding.

## Current code state (verify before depending)

This skill describes shipped mechanics, but specifics still change as tokens and the config evolve. Before relying on an exact class or value:

- **The preset is authoritative:** [`configs/tailwind.config.js`](../../configs/tailwind.config.js) defines exactly which utilities exist and what they resolve to. The token values feeding it live in [`tokens/`](../../tokens/) and the generated [`dist/js/tokens.js`](../../dist/js/tokens.js).
- **Disabled core plugins** (`container`, `fontSize`, `letterSpacing`, `lineHeight`) are the source of the "missing utility" surprises above — confirm the list in the config if a utility you expect is absent.
- **Semantic color and text-style names** are the categories most likely to gain or rename entries over time; treat the **kiva-design-system** skill's color and typography sub-skills as companions and cross-check the config.

When you find a divergence between this skill and the shipped preset, flag it — each instance is a data point for the design-system team.
