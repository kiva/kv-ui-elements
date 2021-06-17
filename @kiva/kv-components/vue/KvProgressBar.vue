<template>
	<div
		role="progressbar"
		class="tw-h-1 tw-w-full tw-rounded-full tw-bg-gray-300 tw-bg-opacity-low tw-overflow-hidden"
		:aria-label="ariaLabel"
		:aria-valuemin="min"
		:aria-valuemax="max"
		:aria-valuenow="value"
	>
		<div
			class="
				tw-h-1 tw-rounded-full tw-bg-brand
				tw-transition-all tw-duration-1000 tw-origin-left tw-ease-in
			"
			:style="{width: loaded ? `${value}%` : '0' }"
		>
		</div>
	</div>
</template>

<script>
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
