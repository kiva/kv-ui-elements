<template>
	<figure
		class="pie-chart tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-gap-2"
		@mouseleave="activeSlice = null"
	>
		<!-- pie chart -->
		<div class="tw-relative tw-h-full">
			<div
				v-if="loading"
				class="pie-placeholder tw-h-full tw-p-2.5"
			>
				<div class="tw-overflow-hidden tw-rounded-full tw-h-full">
					<kv-loading-placeholder />
				</div>
			</div>
			<svg
				v-else
				class="tw-h-full"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				<path
					v-for="(slice, index) in slices"
					:key="index"
					class="tw-origin-center tw-transition-transform"
					:style="activeSlice === slice ? { transform: 'scale(1.1)' } : {}"
					:d="slice.path"
					:stroke="slice.color"
					:stroke-width="lineWidth"
					fill="none"
					@mouseenter="activeSlice = slice"
					@click="activeSlice = slice"
				/>
			</svg>
			<!-- active slice -->
			<div
				v-if="activeSlice"
				class="
					tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2
					tw-flex tw-flex-col tw-items-center tw-text-center"
				style="max-width: 8.5rem;"
			>
				<div class="tw-font-medium tw-line-clamp-4">
					{{ activeSlice.label }}
				</div>
				<div>
					{{ activeSlice.value }} ({{ activeSlicePercent }})
				</div>
			</div>
		</div>
		<!-- key -->
		<div
			style="width: 14rem; height: 85%;"
			class="tw-flex tw-flex-col tw-justify-between"
		>
			<ol class="tw-pl-4 md:tw-pl-0">
				<li
					v-for="(slice, index) in slices.slice(pageIndex * slicesPerPage, (pageIndex + 1) * slicesPerPage)"
					:key="index"
					class="tw-flex tw-items-center"
					@mouseenter="activeSlice = slice"
					@click="activeSlice = slice"
				>
					<div
						class="tw-w-2 tw-h-2 tw-mr-1 tw-rounded-full tw-flex-none"
						:style="{ backgroundColor: slice.color }"
					></div>
					<span class="tw-truncate">
						{{ slice.label }}
					</span>
				</li>
			</ol>
			<!-- paging controls -->
			<div
				v-if="pageCount > 1"
				class="tw-flex tw-justify-center md:tw-justify-start"
			>
				<button
					:disabled="pageIndex === 0"
					class="tw-font-medium tw-p-0.5 disabled:tw-opacity-low"
					@click="prevPage"
				>
					&lt;
				</button>
				{{ pageIndex + 1 }} / {{ pageCount }}
				<button
					:disabled="pageIndex === pageCount - 1"
					class="tw-font-medium tw-p-0.5 disabled:tw-opacity-low"
					@click="nextPage"
				>
					&gt;
				</button>
			</div>
		</div>
	</figure>
</template>

<script>
import numeral from 'numeral';
import { ref, toRefs, computed } from 'vue-demi';
import Alea from '../utils/Alea';
import KvLoadingPlaceholder from './KvLoadingPlaceholder.vue';

// convenience function to get point on circumference of a given circle (from https://codepen.io/grieve/pen/xwGMJp)
function circumPointFromAngle(cx, cy, r, a) {
	return [
		cx + r * Math.cos(a),
		cy + r * Math.sin(a),
	];
}

export default {
	name: 'PieChartFigure',
	components: {
		KvLoadingPlaceholder,
	},
	props: {
		loading: {
			type: Boolean,
			default: true,
		},
		values: {
			type: Array,
			default: () => ([]),
		},
	},
	setup(props) {
		const {
			values,
		} = toRefs(props);

		const svgSize = ref(32);
		const lineWidth = ref(5);
		const activeSlice = ref(null);
		const pageIndex = ref(0);
		const slicesPerPage = ref(10);

		const activeSlicePercent = computed(() => {
			return activeSlice.value ? numeral(activeSlice.value.percent).format('0.00%') : '';
		});

		const radius = computed(() => {
			return (svgSize.value / 2) - (lineWidth.value / 2) - 2;
		});

		const center = computed(() => {
			return svgSize.value / 2;
		});

		const pickColor = (index) => {
			const rng = new Alea('loans', index, 'kiva');
			let color = '#';
			for (let i = 0; i < 3; i += 1) {
				color += Math.floor(rng() * 256).toString(16).padStart(2, '0');
			}
			return color;
		};

		const slices = computed(() => {
			const slicesArr = [];
			// center point
			const cX = center.value;
			const cY = cX;
			// radius
			const r = radius.value;
			// starting angle
			let start = -0.25;
			// loop through each value and create a pie slice path
			for (let i = 0; i < values.value.length; i += 1) {
				const value = values.value[i];
				const end = start + value.percent;
				const [startX, startY] = circumPointFromAngle(cX, cY, r, start * Math.PI * 2);
				const [endX, endY] = circumPointFromAngle(cX, cY, r, end * Math.PI * 2);
				const largeArc = value.percent > 0.5 ? 1 : 0;
				// Draw just the outer arc of the slice
				const path = `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY}`;
				slicesArr.push({
					...value,
					path,
					color: pickColor(i),
				});
				start = end;
			}
			return slicesArr;
		});

		const pageCount = computed(() => {
			return Math.ceil(slices.value.length / slicesPerPage.value);
		});

		const prevPage = () => {
			if (pageIndex.value > 0) {
				pageIndex.value -= 1;
			}
		};
		const nextPage = () => {
			if (pageIndex.value < pageCount.value - 1) {
				pageIndex.value += 1;
			}
		};

		return {
			svgSize,
			lineWidth,
			activeSlice,
			pageIndex,
			slicesPerPage,
			activeSlicePercent,
			radius,
			center,
			slices,
			pageCount,
			prevPage,
			nextPage,
		};
	},
};
</script>

<style lang="postcss" scoped>
.pie-chart {
	height: 40rem;
	@screen md {
		height: 20rem;
	}
}

.pie-placeholder {
	width: 20rem;
}
</style>
