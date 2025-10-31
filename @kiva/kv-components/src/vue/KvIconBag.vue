<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<defs>
			<mask
				v-if="count > 0"
				:id="`countMask-${count}`"
			>
				<rect
					width="100%"
					height="100%"
					fill="#fff"
				/>
				<text
					x="12"
					y="17"
					fill="#000"
					style="font-size: 9px; font-weight: 631; text-anchor: middle;"
				>{{ count }}</text>
			</mask>
		</defs>
		<!-- eslint-disable max-len -->
		<path
			d="M12,3A3,3 0 0,1 15,6H9A3,3 0 0,1 12,3M19,6H17A5,5 0 0,0 12,1A5,5 0 0,0 7,6H5C3.89,6 3,6.89 3,8V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V8C21,6.89 20.1,6 19,6Z"
			fill="currentColor"
			:mask="`url(#countMask-${count})`"
		/>
	</svg>
</template>

<script>
export default {
	props: {
		count: {
			type: Number,
			default: 0,
		},
	},
};
</script>
