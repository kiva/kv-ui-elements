# kv-tokens

The package contains

-   Design token definitions authored as [W3C DTCG](https://design-tokens.github.io/community-group/format/) JSON.
-   A [Style Dictionary](https://styledictionary.com) build that emits JS, CSS, and SCSS artifacts from those tokens.
-   A custom Tailwind configuration set to Kiva's style guide that can be used as a preset for your Tailwind project.

## Install

`npm i --save-dev @kiva/kv-tokens`

## Using the Design Definitions

```js
import designTokens from '@kiva/kv-tokens';

const primaryTextColor = designTokens.colors.theme.DEFAULT.text.primary;
```

You can also import the generated tokens module directly (flat named exports plus the nested default):

```js
import tokens, { colorBrandDefault } from '@kiva/kv-tokens/tokens';
```

## Using the Tailwind Preset

```js
// tailwind.config.js
import { tailwindConfig } from "@kiva/kv-tokens";

export default {
	presets: [tailwindConfig],
	// Project-specific customizations
	theme: {
		//...
	},
	content: [
		//...
	],
	// ...
};
```

See the [Tailwind documentation](https://tailwindcss.com/docs/configuration#presets) for more information on using a preset.

### Notable Config Differences

Our Tailwind config has some differences to the standard install. Notably

-   All Tailwind classes are prefixed with "tw-". E.g., `tw-mb-1` instead of `mb-1`.
-   Themable color names instead of the default Tailwind colors. E.g., `tw-bg-primary` instead of `tw-bg-gray-500`.
    See our [Storybook](https://main--608b4cf87f686c00213841b1.chromatic.com/?path=/docs/base-styling-primitives--primitives) for possible names.
-   Our spacing scale is based on 8px rather Tailwind's default 4px.

## Package Exports

| Subpath                        | Resolves to                 | Use for                                   |
| ------------------------------ | --------------------------- | ----------------------------------------- |
| `@kiva/kv-tokens`              | `index.js`                  | Default: tokens object + theme/tailwind helpers |
| `@kiva/kv-tokens/tokens`       | `dist/js/tokens.js`         | Generated JS tokens (flat + nested)       |
| `@kiva/kv-tokens/tailwind`     | `configs/tailwind.config.js`| Tailwind preset                           |
| `@kiva/kv-tokens/css`          | `dist/css/tokens.css`       | Themed CSS custom properties              |
| `@kiva/kv-tokens/scss`         | `dist/scss/tokens.scss`     | SCSS `$variable` map                      |

## Editing Tokens

Tokens live under [`tokens/`](tokens/) as DTCG JSON:

-   [`tokens/core/`](tokens/core/) — primitive values (colors, sizes, typography, z-index, opacity).
-   [`tokens/semantic/themes/`](tokens/semantic/themes/) — themed semantic tokens referencing primitives.

To update a token, edit the relevant JSON file and run:

```sh
npm run build
```

This invokes Style Dictionary (via [`build/style-dictionary.config.js`](build/style-dictionary.config.js)) to regenerate the `dist/js/`, `dist/css/`, and `dist/scss/` artifacts, then runs [`build/build.js`](build/build.js) to copy fonts and emit the heading-underline SVG sprite.

### How the Build Works

Custom Style Dictionary formats and transforms live in [`build/formats/`](build/formats/) and [`build/transforms/`](build/transforms/):

-   `kiva/js-tokens` — emits both flat named exports (`colorBrandDefault`) and a nested default export that matches the runtime shape used by `kivaColors.js`, `kivaTypography.js`, and `tailwind.config.js`.
-   `kiva/css-themes` — emits a `:root` block for the default theme plus `[data-theme="..."]` blocks for each variant. Colors become RGB triples (`R, G, B`) so consumers can compose opacity with `rgb(var(--text-primary) / 50%)`.
-   `kiva/dimension-to-number` — unwraps DTCG `{ value, unit }` dimension objects back to raw numbers for JS consumers.

## Migrating from v3.x

-   **The legacy `tw-exported-vars.scss` artifact (at `dist/kvui/tw-exported-vars.scss`) is no longer generated.** Import SCSS variables from `@kiva/kv-tokens/scss` instead.
-   **SCSS variable names have changed** to Style Dictionary's kebab-case convention. For example, `$colors-brand-default` is now `$color-brand-default`. Full paths are generated from the token tree.
-   **The hand-authored `primitives.js` has been removed.** The default export of `@kiva/kv-tokens` still resolves to the same nested shape (e.g. `designTokens.colors.theme.DEFAULT.text.primary`), so existing JS/Vue imports continue to work unchanged.
-   **Token edits now flow through `tokens/*.json`.** If you previously patched `primitives.js` directly, move those values into the appropriate JSON file under `tokens/core/` or `tokens/semantic/themes/`.

## Contribution Guidelines

The Kiva UI project is bound by a [Code of Conduct](https://github.com/kiva/ui/blob/master/code_of_conduct.md).

Kiva welcomes outside contributions to our UI repository. If you have any ideas for a feature or improvement, create an issue and we can discuss whether it makes sense to create a pull request. Thanks for the help!
