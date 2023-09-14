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
			v-for="point in normalizedPoints"
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
		 * Array of objects like [{ value: 10 }, { value: 20 }]
		 */
		points: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		const { points } = toRefs(props);

		// Get step to use on x-axis
		const xIncrement = Math.round(100 / (points.value.length - 1));

		// Find the largest value to be used as the scale of the graph
		const largestY = computed(() => {
			return points.value.reduce((prev, current) => {
				return prev > current.value ? prev : current.value;
			}, 0);
		});

		// Convert single values to points using increment and largest value
		const normalizedPoints = computed(() => {
			return points.value.reduce((prev, next, i) => {
				prev.push({
					x: i * xIncrement,
					y: 100 - ((next.value / largestY.value) * 100),
				});

				return prev;
			}, []);
		});

		// Used for drawing the shading under the line
		const shade = computed(() => (normalizedPoints.value.map(({ x, y }) => `${x}% ${y}%`).join(',')));

		// Used for drawing the line
		const line = computed(() => {
			const topLine = normalizedPoints.value.map(({ x, y }) => `${x}% ${y + 0.25}%`).join(',');
			const bottomLine = [...normalizedPoints.value].reverse().map(({ x, y }) => `${x}% ${y - 0.25}%`).join(',');
			return `${topLine}, ${bottomLine}`;
		});

		return {
			normalizedPoints,
			shade,
			line,
		};
	},
};
</script>
