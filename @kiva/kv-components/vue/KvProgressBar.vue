<template>
	<div
		role="progressbar"
		aria-label="progress meter"
		class="tw-h-1 tw-w-full tw-rounded-full tw-bg-gray-300 tw-bg-opacity-low tw-overflow-hidden"
	>
		<div
			:max="max"
			:value="value"
			class="
				tw-h-1 tw-rounded-full tw-bg-brand
				tw-transition-all tw-duration-1000 tw-origin-left tw-ease-in
			"
			:style="{width: loaded ? `${value}%` : '0' }"
			:aria-valuemax="max"
			:aria-valuenow="value"
			aria-valuemin="0"
		>
		</div>
	</div>
</template>

<script>
export default {
	props: {
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
