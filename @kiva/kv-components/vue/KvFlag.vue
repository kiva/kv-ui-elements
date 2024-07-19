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
				fib
      "
			:class="`fi-${country.toLowerCase()}`"
		>
			<span class="tw-sr-only">{{ countryName }}</span>
		</div>
		<span
			v-if="showName"
			class="tw-text-h4 tw-my-2"
		>{{ getNameByCode(country) }}</span>
	</div>
</template>

<script>
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
		 * Aspect Ratio of the flag image
		 * `4x3, 1x1`
		* */
		aspectRatio: {
			type: String,
			default: '4x3',
		},
		showName: {
			type: Boolean,
			default: false,
		},
		widthOverride: {
			type: String,
			default: null,
		},
	},
	async setup() {
		const countryList = await import('../../../node_modules/flag-icons/country.json');

		return {
			countryList,
		};
	},
	computed: {
		spriteWidth() {
			if (this.widthOverride) {
				return this.widthOverride;
			}
			return '100%';
		},
		countryName() {
			return `Flag of ${this.getNameByCode(this.country)}`;
		},
	},
	methods: {
		getNameByCode(code) {
			const uppercaseCode = code?.toLowerCase() ?? '';
			return this.countryList?.default?.find((country) => country.code === uppercaseCode)?.name ?? '';
		},
	},
};
</script>

<style lang="postcss" scoped>
@import "../../../node_modules/flag-icons/css/flag-icons.min.css";

.kv-flag__wrapper {
  line-height: 0;
}

.kv-flag--4x3 .kv-flag__wrapper.kv-flag-svg {
  padding-bottom: 71%;
}

.kv-flag--1x1 .kv-flag__wrapper.kv-flag-svg {
  padding-bottom: 96%;
}
</style>
