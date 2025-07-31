# kv-components

A library of accessible UI components that adhere to Kiva's Design System. Currently built using Vue 2.

## Using these Components

1. [Install tailwind](https://tailwindcss.com/docs/installation) into your project
2. Install components and design definitions:
   `npm install @kiva/kv-components && npm install @kiva/kv-tokens --save-dev`
3. Add our Tailwind config as a [preset](https://tailwindcss.com/docs/configuration#presets) in your tailwind.config.js

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

4. Import and use the components in your Vue 2 project

```vue
<template>
	<div>
		<h2 class="tw-text-secondary">Test Title</h2>
		<kv-button>Lend today</kv-button>
	</div>
</template>

<script>
import KvButton from "kv-ui-elements/kv-components/vue/KvButton.vue";
export default {
	components: {
		KvButton,
	},
};
</script>
```

## Developing Components using Storybook

Pull down the project and fire up [Storybook](https://storybook.js.org/) locally

```sh
git clone git@github.com:kiva/kv-ui-elements.git
cd kv-ui-elements
npm install
cd @kiva/kv-components
npm run storybook
```

### Writing Stories

-   Write stories in the [CSF format](https://storybook.js.org/docs/vue/writing-stories/introduction)
-   Build stories (permutations) that describe the intended look and feel given the components set of inputs (props or slots)
-   Use JsHint to document all props, slots and events so Storybook docs will pick them up

### Additional Resources

-   https://storybook.js.org/tutorials/design-systems-for-developers

### Recommended VSCode Extensions

-   [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Tests

`npm run test`

## Contribution Guidelines

The Kiva UI project is bound by a [Code of Conduct](https://github.com/kiva/ui/blob/master/code_of_conduct.md).

Kiva welcomes outside contributions to our UI repository. If you have any ideas for a feature or improvement, create an issue and we can discuss whether it makes sense to create a pull request. Thanks for the help!
