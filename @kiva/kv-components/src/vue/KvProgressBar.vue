<template>
	<div
		class="
			tw-h-1 tw-w-full tw-rounded-full tw-overflow-hidden tw-relative
		"
		:class="backgroundVariant"
		role="progressbar"
		:aria-label="label"
		:aria-valuemin="min"
		:aria-valuemax="max"
		:aria-valuenow="value"
	>
		<div
			class="
				tw-h-1 tw-w-full tw-absolute tw--left-full tw-rounded-full
				tw-transition-all tw-duration-1000 tw-origin-left tw-ease-out
			"
			:class="variantClass"
			:style="{transform: loaded ? `translateX(${percent}%)` : 'translateX(0)' }"
		>
		</div>
	</div>
</template>

<script lang="ts">
/**
 * Horizontal progress bar which communicates to the user the progress of a particular process
 */
import {
	ref,
	toRefs,
	computed,
	onMounted,
	nextTick,
} from 'vue';

export default {
	props: {
		/**
		 * The words to announce to screenreaders describing what this progress represents
		 * e.g., "Percent the loan has funded"
		 * */
		label: {
			type: String,
			required: true,
		},
		/**
		 * The min value of the progress bar
		 * */
		min: {
			type: Number,
			default: 0,
		},
		/**
		 * The max value of the progress bar
		 * */
		max: {
			type: Number,
			default: 100,
		},
		/**
		 * The current value to display
		 * */
		value: {
			type: Number,
			default: 0,
			required: true,
		},
		/**
		 * Appearance of the progress bar
		 * `primary (default), ghost, danger, caution
		 * */
		variant: {
			type: String,
			default: 'primary',
			validator(value: string) {
				return ['primary', 'ghost', 'danger', 'caution'].includes(value);
			},
		},
		/**
		 * Appearance of the progress bar background
		 * `secondary (default), tertiary
		 * */
		bgVariant: {
			type: String,
			default: 'secondary',
			validator(value: string) {
				return ['secondary', 'tertiary'].includes(value);
			},
		},
	},
	setup(props) {
		const {
			min,
			max,
			value,
			variant,
			bgVariant,
		} = toRefs(props);
		const loaded = ref(false);

		const percent = computed(() => {
			const percentValue = ((value.value - min.value) / (max.value - min.value)) * 100;
			const rounded = Math.round(percentValue * 10) / 10; // Keep percents to 1 decimal places 12.3%
			const clamped = Math.min(Math.max(rounded, 0), 100); // Always between 0 and 100%
			return clamped;
		});

		const variantClass = computed(() => {
			switch (variant.value) {
				case 'ghost':
					return 'tw-bg-tertiary';
				case 'danger':
					return 'tw-bg-danger';
				case 'caution':
					return 'tw-bg-caution';
				default:
					return 'tw-bg-brand';
			}
		});

		const backgroundVariant = computed(() => {
			switch (bgVariant.value) {
				case 'tertiary':
					return 'tw-bg-tertiary';
				default:
					return 'tw-bg-secondary';
			}
		});

		const animateProgressBar = () => {
			loaded.value = true;
		};

		onMounted(async () => {
			await nextTick();
			animateProgressBar();
		});

		return {
			loaded,
			percent,
			animateProgressBar,
			variantClass,
			backgroundVariant,
		};
	},
};
</script>
