<template>
	<div
		v-if="country"
		:class="`kv-flag kv-flag--${aspectRatio}`"
		:style="{ maxWidth: spriteWidth, minWidth: spriteWidth }"
	>
		<div
			class="
				kv-flag__wrapper
				kv-flag-svg
				tw-bg-gray-100
				tw-relative
				tw-overflow-hidden
				tw-h-0
				tw-w-full
				tw-border
				tw-border-gray-600
				!tw-bg-cover
			"
			:class="classes"
			:style="{ backgroundImage: `url(${svgUrl})` }"
		>
			<span class="tw-sr-only">Flag of {{ name }}</span>
		</div>
		<span
			v-if="showName"
			class="tw-text-h4 tw-my-2"
		>{{ name }}</span>
	</div>
</template>

<script lang="ts">
const imgImport = import.meta.glob<Record<string, string>>('./flags/**/*.svg', { query: '?url', eager: true });
const flagUrl = (country: string, aspectRatio: string) => {
	return imgImport[`./flags/${aspectRatio}/${country.toLowerCase()}.svg`].default;
};

export default {
	name: 'KvFlag',
	props: {
		/**
		 * 2 letter ISO country code of the flag to show
		* */
		country: {
			type: String,
			required: true,
		},
		/**
		 * Name of the country of the flag
		* */
		name: {
			type: String,
			required: true,
		},
		/**
		 * Aspect Ratio of the flag image
		 * `4x3, 1x1`
		* */
		aspectRatio: {
			type: String,
			default: '4x3',
			validator: (value: string) => ['4x3', '1x1'].includes(value),
		},
		/**
		 * Show the name of the country next to the flag
		 */
		showName: {
			type: Boolean,
			default: false,
		},
		/**
		 * Override the width of the flag
		 */
		widthOverride: {
			type: String,
			default: null,
		},
		/**
		 * Hide the border around the flag
		 */
		hideBorder: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		spriteWidth() {
			if (this.widthOverride) {
				return this.widthOverride;
			}
			return '100%';
		},
		classes() {
			return {
				[`fi-${this.country.toLowerCase()}`]: true,
				'tw-border-0': this.hideBorder,
			};
		},
		svgUrl() {
			return flagUrl(this.country, this.aspectRatio);
		},
	},
};
</script>

<style lang="postcss" scoped>
.kv-flag__wrapper {
	line-height: 0;
	background-size: contain;
	background-position: 50%;
	background-repeat: no-repeat;
}

.kv-flag--4x3 .kv-flag__wrapper.kv-flag-svg {
	padding-bottom: 71%;
}

.kv-flag--1x1 .kv-flag__wrapper.kv-flag-svg {
	padding-bottom: 96%;
}
</style>
