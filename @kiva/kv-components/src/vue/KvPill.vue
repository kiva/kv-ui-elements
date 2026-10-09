<template>
	<div
		class="tw-w-max tw-flex tw-items-center tw-text-label tw-rounded"
		:class="[variantClass, sizeClass]"
	>
		<slot name="icon"></slot>
		<span>
			<slot></slot>
		</span>
	</div>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';

const VARIANT_CLASSES = {
	default: { bg: 'tw-bg-secondary', text: 'tw-text-primary' },
	muted: { bg: 'tw-bg-gray-100', text: 'tw-text-primary' },
	light: { bg: 'tw-bg-primary', text: 'tw-text-primary' },
	urgent: { bg: 'tw-bg-danger-highlight', text: 'tw-text-danger-highlight' },
	caution: { bg: 'tw-bg-caution', text: 'tw-text-primary' },
};

export default {
	props: {
		/**
		 * Appearance of the pill
		 * `default, muted, light, urgent, caution`
		 */
		variant: {
			type: String,
			default: 'default',
			validator(value: string) {
				return Object.keys(VARIANT_CLASSES).includes(value);
			},
		},
		/**
		 * Size of the pill
		 * `default, small`
		 */
		size: {
			type: String,
			default: 'default',
			validator(value: string) {
				return ['default', 'small'].includes(value);
			},
		},
	},
	setup(props) {
		const { variant, size } = toRefs(props);

		const variantClass = computed(() => {
			const { bg, text } = VARIANT_CLASSES[variant.value] ?? VARIANT_CLASSES.default;
			return `${bg} ${text}`;
		});
		const sizeClass = computed(() => (size.value === 'small'
			? 'tw-px-1 tw-py-0.5 tw-gap-0.5'
			: 'tw-px-2 tw-py-1 tw-gap-1'));

		return {
			variantClass,
			sizeClass,
		};
	},
};
</script>
