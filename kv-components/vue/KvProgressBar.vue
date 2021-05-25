<template>
	<div
		role="progressbar"
		class="h-1 w-full rounded-full bg-gray-300 overflow-hidden"
	>
		<div
			ref="progressBarRef"
			:max="max"
			:value="value"
			class="h-1 rounded-full transition-all duration-1000 origin-left ease-in"
			:class="{
				'bg-brand' : variant === 'brand',
				'bg-gray-800' : variant === 'black'
			}"
			:style="{width: loaded ? `${value}%` : '0' }"
			:aria-valuemax="value"
			:aria-valuenow="max"
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
		/**
		 * Appearance of the button
		 * `brand (default), black`
		 * */
		variant: {
			type: String,
			default: 'brand',
			validator(value) {
				return ['brand', 'black'].includes(value);
			},
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
