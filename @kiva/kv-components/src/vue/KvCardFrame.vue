<template>
	<kv-theme-provider
		:theme="themeStyle"
		class="kv-tailwind"
	>
		<div :class="['kv-card-frame tw-overflow-hidden', bgColorClass, radiusClass, shadowClass, borderClass]">
			<slot></slot>
		</div>
	</kv-theme-provider>
</template>

<script>
import { computed } from 'vue';

import {
	defaultTheme,
	greenLightTheme,
	greenDarkTheme,
	marigoldLightTheme,
	stoneLightTheme,
	stoneDarkTheme,
} from '@kiva/kv-tokens';

import KvThemeProvider from './KvThemeProvider.vue';

export default {
	components: {
		KvThemeProvider,
	},
	props: {
		bgColorClass: {
			type: String,
			default: 'tw-bg-primary',
		},
		borderClass: {
			type: String,
			default: '',
		},
		radiusClass: {
			type: String,
			default: 'tw-rounded',
		},
		shadowClass: {
			type: String,
			default: 'tw-shadow-lg',
		},
		theme: {
			type: String,
			default: 'default',
			validator(value) {
				return [
					'default', 'greenLight', 'greenDark', 'marigoldLight', 'stoneLight', 'stoneDark',
				].includes(value);
			},
		},
	},
	setup(props) {
		const themeStyle = computed(() => {
			switch (props.theme) {
				case 'default':
					return defaultTheme;
				case 'greenDark':
					return greenDarkTheme;
				case 'greenLight':
					return greenLightTheme;
				case 'marigoldLight':
					return marigoldLightTheme;
				case 'stoneLight':
					return stoneLightTheme;
				case 'stoneDark':
					return stoneDarkTheme;
				default:
					return defaultTheme;
			}
		});

		return { themeStyle };
	},
};
</script>

<style scoped></style>
