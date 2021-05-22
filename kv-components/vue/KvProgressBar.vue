<template>
	<div
		role="progressbar"
		:aria-valuemin="0"
		:aira-valuemax="max"
		:aira-valuenow="value"
		:onLoad="animateProgressBar"
		class="h-1 w-full rounded-full bg-gray-300"
	>
		<div
			class="h-1 rounded-full absolute w-1/2"
			:class="{
				'bg-brand'
					: variant === 'brand',
				'bg-gray-800'
					: variant === 'black',
			}"
		>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		/**
		 * The max value to display on bar
		 * */
		max: {
			type: String,
			default: '100',
		},
		/**
		 * The min value to display on bar
		 * */
		value: {
			type: String,
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
		return {};
	},
	methods: {
		animateProgressBar() {
			console.log('animateProgressBar triggered');
		},
	},

};

</script>
