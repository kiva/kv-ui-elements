<template>
	<figure class="tw-w-full tw-h-full tw-relative">
		<div
			class="tw-w-full tw-h-full tw-bg-marigold-2 tw-opacity-low"
			:style="{ clipPath: `polygon(${shade}, 100% 100%, 0% 100%)` }"
		></div>
		<div
			class="tw-absolute tw-top-0 tw-w-full tw-h-full tw-bg-marigold-2"
			:style="{ clipPath: `polygon(${line})` }"
		></div>
		<div
			v-for="point in points"
			:key="point.x"
			class="
				tw-absolute
				tw-w-2
				tw-h-2
				tw-border
				tw-border-white
				tw-bg-marigold-2
				tw-rounded-full
			"
			:style="{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }"
		></div>
	</figure>
</template>

<script>
import { computed, toRefs } from 'vue-demi';

export default {
	props: {
		/**
		 * Array of objects like { x: 4, y: 54 }, where the x and y values have been normalized to 0-100.
		 * The origin point is the top left corner, so you may need to invert the y values (100 - y).
		 */
		points: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		const { points } = toRefs(props);

		const reversePoints = computed(() => ([...points.value].reverse()));

		const shade = computed(() => (points.value.map(({ x, y }) => `${x}% ${y}%`).join(',')));

		const line = computed(() => {
			const topLine = points.value.map(({ x, y }) => `${x}% ${y + 0.25}%`).join(',');
			const bottomLine = reversePoints.value.map(({ x, y }) => `${x}% ${y - 0.25}%`).join(',');
			return `${topLine}, ${bottomLine}`;
		});

		return {
			reversePoints,
			shade,
			line,
		};
	},
};
</script>
