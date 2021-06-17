<template>
	<div
		class="
			tw-h-1 tw-w-full tw-rounded-full tw-overflow-hidden tw-relative
			tw-bg-gray-300 tw-bg-opacity-low
		"
		role="progressbar"
		:aria-label="ariaLabel"
		:aria-valuemin="min"
		:aria-valuemax="max"
		:aria-valuenow="value"
	>
		<div
			class="
				tw-h-1 tw-w-full tw-absolute tw--left-full tw-rounded-full tw-bg-brand
				tw-transition-all tw-duration-1000 tw-origin-left tw-ease-out
			"
			:style="{transform: loaded ? `translateX(${percent}%)` : 'translateX(0)' }"
		>
		</div>
	</div>
</template>

<script>
/**
 * Horizontal progress bar which communicates to the user the progress of a particular process
 */

export default {
	props: {
		/**
		 * The words to announce to screenreaders describing what this progress represents
		 * e.g., "Percent the loan has funded"
		 * */
		ariaLabel: {
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
	},
	data() {
		return {
			loaded: false,
		};
	},
	computed: {
		percent() {
			const percent = ((this.value - this.min) / (this.max - this.min)) * 100;
			const rounded = Math.round(percent * 10) / 10; // Keep percents to 1 demical places (12.3%)
			const clamped = Math.min(Math.max(rounded, 0), 100); // Always between 0 and 100%
			return clamped;
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.animateProgressBar();
		});
	},
	methods: {
		animateProgressBar() {
			this.loaded = true;
		},
	},
};
</script>
