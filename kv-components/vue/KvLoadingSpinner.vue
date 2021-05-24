<template>
	<svg
		class="animate-spin-eased"
		:class="{
			'h-3 w-3'
				: size === 'small',
			'h-4 w-4'
				: size === 'medium',
			'h-8 w-8'
				: size === 'large',
			'text-brand'
				: color === 'brand',
			'text-white'
				: color === 'white',
			'text-black'
				: color === 'black',
		}"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<g
			clip-path="url(#clip0)"
			stroke-width="2"
		>
			<circle
				class="stroke-current text-gray-300 opacity-low"
				cx="12"
				cy="12"
				r="8"
				transform="rotate(135 12 12)"
			/>
			<path
				d="M17.447 17.866c3.24-3.24 3.334-8.399.21-11.523-3.125-3.124-8.284-3.03-11.524.21"
				stroke="currentColor"
				stroke-linecap="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0">
				<path
					fill="#fff"
					d="M0 0h24v24H0z"
				/>
			</clipPath>
		</defs>
	</svg>
</template>

<script>
/**
 * Animated SVG Loading Spinner with variable size and color.
 */

export default {
	props: {
		/**
		 * The size of the loading spinner.
		 * 'small', 'medium', or 'large'
		 * */
		size: {
			type: String,
			default: 'medium',
			validator(value) {
				return ['small', 'medium', 'large'].includes(value);
			},
		},
		/**
		 * The color of the loading spinner.
		 * 'brand', 'white', or 'black'
		 * */
		color: {
			type: String,
			default: 'brand',
			validator(value) {
				return ['brand', 'white', 'black'].includes(value);
			},
		},
	},
};
</script>
