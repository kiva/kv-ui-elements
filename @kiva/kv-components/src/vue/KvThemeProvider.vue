<template>
	<div
		:style="{
			...theme,
			color: 'rgb(var(--text-primary))',
		}"
	>
		<slot></slot>
	</div>
</template>

<script>
/**
 * A wrapper component that sets CSS custom properties to theme its children.
 * Most of the time you'll be importing a predefined theme from kv-tokens.
 *
 * @usage
 * ```
 * import {
 *   darkTheme,
 *   darkGreenTheme,
 *   mintTheme,
 *   defaultTheme
 * } from '@kiva/kv-tokens/configs/kivaColors';
 * ...
 * data() { return { darkTheme }; }
 * ...
 * <kv-theme-provider :theme="darkTheme">...</kv-theme-provider>
 * ```
 *
 * */
export default {
	props: {
		/**
		 * An object containing CSS custom properties set to RGB values.
		 *
		 * For custom theming, see all available custom properties set to white in RGB, below
		 * @usage
		 * ```
		 * {
		 *    --text-primary: '255, 255, 255',
		 *    --text-primary-inverse: '255, 255, 255',
		 *    --text-secondary: '255, 255, 255',
		 *    --text-tertiary: '255, 255, 255',
		 *    --text-action: '255, 255, 255',
		 *    --text-action-highlight: '255, 255, 255',
		 *    --text-danger: '255, 255, 255',
		 *    --text-danger-highlight: '255, 255, 255',
		 *
		 *    --bg-primary: '255, 255, 255',
		 *    --bg-primary-inverse: '255, 255, 255',
		 *    --bg-secondary: '255, 255, 255',
		 *    --bg-tertiary: '255, 255, 255',
		 *    --bg-action: '255, 255, 255',
		 *    --bg-action-highlight: '255, 255, 255',
		 *    --bg-danger: '255, 255, 255',
		 *    --bg-danger-highlight: '255, 255, 255',
		 *    --bg-caution: '255, 255, 255',
		 *
		 *    --border-primary: '255, 255, 255',
		 *    --border-primary-inverse: '255, 255, 255',
		 *    --border-secondary: '255, 255, 255',
		 *    --border-tertiary: '255, 255, 255',
		 *    --border-action: '255, 255, 255',
		 *    --border-action-highlight: '255, 255, 255',
		 *    --border-danger: '255, 255, 255',
		 *    --border-danger-highlight: '255, 255, 255',
		 *
		 *    --heading-underline-primary: url('/kvui/heading-underline.svg#FFFFFF'),
		 * }
		 * ```
		 *
		 * */
		theme: {
			type: Object,
			default: null,
		},
	},
};
</script>

<style lang="postcss">
/* heading underline styling, intentionally not scoped */
.tw-text-jumbo u,
.tw-text-h1 u,
.tw-text-h2 u,
.tw-text-h3 u,
h1 u,
h2 u,
h3 u {
  text-decoration: none;
  box-decoration-break: clone;
  background-image: var(--heading-underline-primary);
  background-repeat: no-repeat;
  background-position: left bottom;
}
.tw-text-jumbo u {
	background-size: 100% 0.75rem;
	padding-bottom: 0.375rem;
}
.tw-text-h1 u,
h1 u {
  background-size: 100% 0.75rem;
  padding-bottom: 0.375rem;
}
.tw-text-h2 u,
h2 u {
  background-size: 100% 0.375rem;
  padding-bottom: 0.125rem;
}
.tw-text-h3 u,
h3 u {
  background-size: 100% 0.375rem;
  padding-bottom: 0.2rem;
}
@screen lg {
	.tw-text-jumbo u {
		background-size: 100% 1rem;
		padding-bottom: 0.375rem;
	}
}
</style>
