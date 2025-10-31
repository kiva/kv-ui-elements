<template>
	<div class="tw-h-full tw-w-full tw-p-2.5">
		<figure
			class="tw-w-full tw-relative"
			:style="{ height: graphHeight }"
		>
			<div
				class="tw-w-full tw-h-full tw-bg-marigold-2 tw-opacity-low"
				:style="{ clipPath: `polygon(${shade}, 100% 100%, 0% 100%)` }"
			></div>
			<div
				class="tw-absolute tw-top-0 tw-w-full tw-h-full tw-bg-marigold-2"
				:style="{ clipPath: `polygon(${line})` }"
			></div>
			<span
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
			></span>
			<template v-for="point in normalizedPoints">
				<span
					v-if="point.label"
					:key="point.label"
					class="tw-absolute"
					:style="{ left: `${point.x}%`, bottom: '-3rem', transform: 'translate(-50%, -50%)' }"
				>
					{{ point.label }}
				</span>
			</template>
		</figure>
		<h4
			v-if="axisLabel"
			class="tw-text-center"
			:class="{ 'tw-pt-1': !hasValueLabels, 'tw-pt-6': hasValueLabels }"
		>
			{{ axisLabel }}
		</h4>
	</div>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';

interface Point {
	value: number;
	label?: string;
	x?: number;
	y?: number;
}

export default {
	props: {
		/**
		 * Array of objects like [{ value: 10, label: '2014' }, { value: 20, label: '2015' }]
		 */
		points: {
			type: Array as () => Point[],
			required: true,
		},
		/**
		 * The optional label to show below the graph on the x-axis
		 */
		axisLabel: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const { points, axisLabel } = toRefs(props);

		// Get step to use on x-axis
		const xIncrement = Math.round(100 / (points.value.length - 1));

		// Find the largest value to be used as the scale of the graph
		const largestY = computed(() => {
			return points.value.reduce((prev, current) => {
				return prev > current.value ? prev : current.value;
			}, 0);
		});

		// Find the largest value to be used as the scale of the graph
		const hasValueLabels = computed(() => {
			return points.value.reduce((prev, current) => {
				return prev || !!current.label;
			}, false);
		});

		// Convert single values to points using increment and largest value
		const normalizedPoints = computed(() => {
			return points.value.reduce((prev, next, i) => {
				prev.push({
					x: i * xIncrement,
					y: 100 - ((next.value / largestY.value) * 100),
					label: next.label,
				});

				return prev;
			}, []);
		});

		// Used for drawing the shading under the line
		const shade = computed(() => (normalizedPoints.value.map(({ x, y }) => `${x}% ${y}%`).join(',')));

		// Used for drawing the line
		const line = computed(() => {
			const topLine = normalizedPoints.value.map(({ x, y }) => `${x}% ${y + 0.3}%`).join(',');
			const bottomLine = [...normalizedPoints.value].reverse().map(({ x, y }) => `${x}% ${y - 0.3}%`).join(',');
			return `${topLine}, ${bottomLine}`;
		});

		const graphHeight = computed(() => {
			const labelSpace = (axisLabel.value ? 2 : 0) + (hasValueLabels.value ? 2 : 0);

			return `calc(100% - ${labelSpace}rem)`;
		});

		return {
			hasValueLabels,
			graphHeight,
			normalizedPoints,
			shade,
			line,
		};
	},
};
</script>
