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
 * } from '@kiva/kv-tokens/configs/kivaColors.cjs';
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
