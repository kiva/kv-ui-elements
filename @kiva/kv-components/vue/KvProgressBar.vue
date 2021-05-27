<template>
	<div
		role="progressbar"
		aria-label="progress meter"
		class="h-1 w-full rounded-full bg-gray-300 bg-opacity-low overflow-hidden"
	>
		<div
			:max="max"
			:value="value"
			class="h-1 rounded-full transition-all duration-1000 origin-left ease-in bg-brand"
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
