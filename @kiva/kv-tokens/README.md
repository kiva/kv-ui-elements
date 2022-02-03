# kv-tokens

The package contains

-   A JSON file specifying the design definitions of Kiva's style guide.
-   A custom Tailwind configuration set to Kiva's style guide that can be used as a preset for your Tailwind v3 project.

## Install

`npm i --save-dev @kiva/kv-tokens`

## Using the Design Definitions

```js
const designTokens = require("@kiva/kv-tokens/primitives.json");

const primaryTextColor = designTokens.colors.theme.DEFAULT.text.primary;
```

## Using the Tailwind Preset

```js
// tailwind.config.js
module.exports = {
	presets: [require("@kiva/kv-tokens/configs/tailwind.config")],
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

## Contribution Guidelines

The Kiva UI project is bound by a [Code of Conduct](https://github.com/kiva/ui/blob/master/code_of_conduct.md).

Kiva welcomes outside contributions to our UI repository. If you have any ideas for a feature or improvement, create an issue and we can discuss whether it makes sense to create a pull request. Thanks for the help!
