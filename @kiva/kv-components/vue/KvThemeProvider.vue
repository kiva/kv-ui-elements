<template>
	<div
		class="tw-bg-primary"
		:style="{
			...themeStyles,
			color: 'rgb(var(--text-primary))',
		}"
	>
		<slot></slot>
	</div>
</template>

<script>
import { kivaThemes } from '@kiva/kv-tokens/configs/kivaColors';

/**
 *
 * All available themable CSS custom properties, set to white, below
 *
 * ```
 * {
 *    --text-primary: '255, 255, 255',
 *    --text-primary-inverse: '255, 255, 255',
 *    --text-secondary: '255, 255, 255',
 *    --text-tertiary: '255, 255, 255',
 *    --text-accent: '255, 255, 255',
 *    --text-action: '255, 255, 255',
 *    --text-action-highlight: '255, 255, 255',
 *    --text-danger: '255, 255, 255',
 *    --text-danger-highlight: '255, 255, 255',
 *
 *    --bg-primary: '255, 255, 255',
 *    --bg-primary-inverse: '255, 255, 255',
 *    --bg-secondary: '255, 255, 255',
 *    --bg-tertiary: '255, 255, 255',
 *    --bg-accent: '255, 255, 255',
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
 *    --border-accent: '255, 255, 255',
 *    --border-action: '255, 255, 255',
 *    --border-action-highlight: '255, 255, 255',
 *    --border-danger: '255, 255, 255',
 *    --border-danger-highlight: '255, 255, 255',
 * }
 * ```
 * */

export default {
	props: {
		/**
		 * An pre-defined theme object coming from kivaColors
		 * */
		theme: {
			type: String,
			default: '',
		},
		/**
		 * An object containing CSS custom properties
		 * */
		customTheme: {
			type: Object,
			default: null,
		},
	},
	computed: {
		themeStyles() {
			if (this.theme === 'dark') {
				return kivaThemes.dark;
			}
			if (this.theme === 'mint') {
				return kivaThemes.mint;
			}
			if (this.customTheme) {
				return this.customTheme;
			}
			return {};
		},
	},
};
</script>
