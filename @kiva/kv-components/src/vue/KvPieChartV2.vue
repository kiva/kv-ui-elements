<template>
	<figure
		class="kv-pie-chart-v2 tw-flex tw-flex-col tw-items-center tw-gap-1"
		aria-label="Pie chart"
	>
		<!-- Donut chart SVG -->
		<div class="tw-px-2">
			<svg
				viewBox="0 0 262 262"
				fill="none"
				class="tw-w-full"
				role="img"
				aria-hidden="true"
			>
				<!-- Skeleton ring -->
				<circle
					v-if="loading || !hasData"
					:cx="CX"
					:cy="CY"
					:r="radius"
					:stroke="LOADING_BG_COLOR"
					:stroke-width="strokeWidth"
					fill="none"
					class="skeleton-ring tw-opacity-0"
					:class="{ 'skeleton-ring--hidden': animatedIn }"
				/>

				<!-- Colored segments -->
				<circle
					v-for="segment in visibleSegments"
					:key="segment.label"
					:cx="CX"
					:cy="CY"
					:r="radius"
					:stroke="segment.color"
					:stroke-width="strokeWidth"
					fill="none"
					:stroke-dasharray="`${segment.dashLength} ${circumference * 2}`"
					:transform="`rotate(${segment.startDeg}, ${CX}, ${CY})`"
					class="segment-circle"
					:style="{
						strokeDashoffset: segment.isVisible ? 0 : segment.dashLength,
						transitionDelay: `${segment.delay}ms`,
					}"
				/>

				<!-- "Other" segment -->
				<circle
					v-if="otherSegment"
					:cx="CX"
					:cy="CY"
					:r="radius"
					:stroke="OTHER_SEGMENT_BG_COLOR"
					:stroke-width="strokeWidth"
					fill="none"
					:stroke-dasharray="`${otherSegment.dashLength} ${circumference * 2}`"
					:transform="`rotate(${otherSegment.startDeg}, ${CX}, ${CY})`"
					class="segment-circle"
					:style="{
						strokeDashoffset: otherSegment.isVisible ? 0 : otherSegment.dashLength,
						transitionDelay: `${otherSegment.delay}ms`,
					}"
				/>
			</svg>
		</div>

		<!-- Legend: 2-column grid -->
		<div
			v-if="hasData && !loading"
			class="tw-flex tw-flex-wrap tw-justify-center tw-gap-0.5 tw-w-full tw-pt-0.5"
		>
			<!-- Visible segment pills -->
			<div
				v-for="(segment, index) in visibleSegments"
				:key="segment.label"
				class="
					tw-bg-gray-100
					tw-flex tw-gap-0.5 tw-items-center
					tw-px-1 tw-py-0.5
					tw-rounded-xs
				"
			>
				<div class="tw-flex tw-gap-0.5 tw-items-center tw-min-w-0 tw-overflow-hidden">
					<span
						class="tw-shrink-0 tw-w-1 tw-h-1 tw-rounded-full legend-dot"
						:style="{
							backgroundColor: segment.isVisible ? segment.color : '#d1d5db',
							transitionDelay: `${segment.delay}ms`,
						}"
					></span>
					<span
						class="
							tw-font-medium tw-text-small tw-text-primary
							tw-whitespace-nowrap tw-truncate
						"
					>
						{{ segment.label }}
					</span>
				</div>
				<span
					class="
						tw-font-light tw-text-small tw-text-primary
						tw-text-right tw-shrink-0 tw-tabular-nums
					"
					:style="{ minWidth: valueMinWidth }"
				>
					{{ formatDisplayValue(index) }}
				</span>
			</div>

			<!-- "Other" pill -->
			<button
				v-if="otherItems.length > 0"
				class="
					tw-bg-gray-100
					tw-flex tw-gap-0.5 tw-items-center
					tw-px-1 tw-py-0.5
					tw-rounded-xs
					tw-cursor-pointer
					tw-border-0
					tw-text-left
				"
				type="button"
				@click="showOtherLightbox = true"
			>
				<div class="tw-flex tw-gap-0.5 tw-items-center tw-shrink-0">
					<span
						class="tw-shrink-0 tw-w-1 tw-h-1 tw-rounded-full legend-dot"
						:style="{
							backgroundColor: otherSegment?.isVisible ? '#C4C4C4' : '#d1d5db',
							transitionDelay: `${otherSegment?.delay ?? 0}ms`,
						}"
					></span>
					<span class="tw-font-medium tw-text-small tw-text-primary tw-whitespace-nowrap">
						Other
					</span>
				</div>
				<span
					class="
						tw-font-light tw-text-small tw-text-primary
						tw-text-right tw-shrink-0 tw-tabular-nums
					"
					:style="{ minWidth: valueMinWidth }"
				>
					{{ formatOtherDisplayValue() }}
				</span>
			</button>
		</div>

		<!-- "Other" lightbox -->
		<kv-lightbox
			v-if="hasData && !loading"
			:visible="showOtherLightbox"
			title="Other"
			@lightbox-closed="showOtherLightbox = false"
		>
			<div class="tw-grid tw-grid-cols-2 tw-grid-flow-row tw-gap-0.5">
				<div
					v-for="item in allItemsWithColors"
					:key="item.label"
					class="
						tw-bg-gray-100
						tw-flex tw-gap-0.5 tw-items-center
						tw-px-1 tw-py-0.5
						tw-rounded-xs
						tw-justify-between
						tw-w-full
					"
				>
					<div class="tw-flex tw-gap-0.5 tw-items-center tw-shrink-0 tw-overflow-hidden">
						<span
							class="tw-shrink-0 tw-w-1 tw-h-1 tw-rounded-full"
							:style="{ backgroundColor: item.color }"
						></span>
						<span
							class="
								tw-font-medium tw-text-small tw-text-primary
								tw-whitespace-nowrap tw-truncate
							"
						>
							{{ item.label }}
						</span>
					</div>
					<span
						class="
							tw-font-light tw-text-small tw-text-primary
							tw-text-right tw-shrink-0 tw-tabular-nums
						"
						style="min-width: 2.8ch;"
					>
						{{ formatItemValue(item) }}
					</span>
				</div>
			</div>
		</kv-lightbox>
	</figure>
</template>

<script lang="ts">
import {
	ref,
	computed,
	toRefs,
	onMounted,
	onUnmounted,
	watch,
} from 'vue';
import type { PropType } from 'vue';
import { getPieChartColor, LOADING_BG_COLOR, OTHER_SEGMENT_BG_COLOR } from '../utils/pieChartColors';
import { easeInOutCubic } from '../utils/useCountUp';
import KvLightbox from './KvLightbox.vue';

/**
 * A data item for the pie chart.
 */
export interface KvPieChartV2Item {
	/** Display label for this segment */
	label: string;
	/** Numeric value for this segment */
	value: number;
	/** Optional color override (hex string). If omitted, assigned from palette. */
	color?: string;
}

export type PieChartUnit = 'percent' | 'amount' | 'count';

// ── Donut geometry ──
// The donut renders inside a fixed 262x262 viewBox. The radius is derived from
// strokeWidth so the ring's outer edge always lands on the viewBox boundary —
// thicker rings grow inward toward center rather than overflowing the SVG.
const VIEWBOX = 262;
const CX = VIEWBOX / 2;
const CY = VIEWBOX / 2;

// ── Animation timing ──
// STAGGER and GROW_DURATION are intentionally equal so each segment finishes
// as the next one begins. CSS .segment-circle transition (500ms) must match
// GROW_DURATION; update both together if you change one.
const STAGGER = 500;
const GROW_DURATION = 500;

interface ComputedSegment {
	label: string;
	value: number;
	percent: number;
	color: string;
	dashLength: number;
	startDeg: number;
	delay: number;
	isVisible: boolean;
}

export default {
	name: 'KvPieChartV2',
	components: {
		KvLightbox,
	},
	props: {
		/**
		 * Chart data items. Each must have a label and numeric value.
		 */
		values: {
			type: Array as PropType<KvPieChartV2Item[]>,
			default: () => [],
		},
		/**
		 * How values are displayed in legend pills.
		 * @values percent, amount, count
		 */
		unit: {
			type: String as PropType<PieChartUnit>,
			default: 'percent',
			validator: (value: string) => ['percent', 'amount', 'count'].includes(value),
		},
		/**
		 * Shows a skeleton donut ring when true.
		 */
		loading: {
			type: Boolean,
			default: false,
		},
		/**
		 * Maximum number of visible segments before remaining items collapse into "Other".
		 */
		shownSegments: {
			type: Number,
			default: 5,
		},
		/**
		 * Donut ring thickness in SVG user units (viewBox is 262x262). The radius
		 * shrinks as this grows, so the outer edge always fits within the viewBox.
		 */
		strokeWidth: {
			type: Number,
			default: 56,
		},
		/**
		 * Visual gap between adjacent segments, in SVG user units along the ring's
		 * circumference. Set to 0 for no gap.
		 */
		segmentGap: {
			type: Number,
			default: 2,
		},
		/**
		 * Delay in milliseconds before the first segment starts animating in.
		 * Subsequent segments stagger from this baseline.
		 */
		initialDelay: {
			type: Number,
			default: 1000,
		},
		/**
		 * When changed from false to true, plays the reverse sweep-out animation.
		 */
		animateOut: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const {
			values,
			unit,
			loading,
			shownSegments,
			strokeWidth,
			segmentGap,
			initialDelay,
			animateOut,
		} = toRefs(props);

		const showOtherLightbox = ref(false);
		const animatedIn = ref(false);

		// Derived donut geometry. Radius shrinks as strokeWidth grows so the ring's
		// outer edge always sits on the viewBox boundary.
		const radius = computed(() => Math.max((VIEWBOX - strokeWidth.value) / 2, 1));
		const circumference = computed(() => 2 * Math.PI * radius.value);

		// Sort values descending by value
		const sortedValues = computed(() => {
			return [...values.value].sort((a, b) => b.value - a.value);
		});

		const total = computed(() => {
			return sortedValues.value.reduce((sum, item) => sum + item.value, 0);
		});

		const hasData = computed(() => values.value.length > 0);

		// Top N items shown as individual segments
		const topItems = computed(() => {
			return sortedValues.value.slice(0, shownSegments.value);
		});

		// Items collapsed into "Other" (used to compute the Other segment + pill).
		const otherItems = computed(() => {
			const items = sortedValues.value.slice(shownSegments.value);
			return items.map((item, i) => ({
				...item,
				color: getPieChartColor(shownSegments.value + i, item.color),
			}));
		});

		// All items (visible + collapsed) with assigned colors, used in the lightbox.
		const allItemsWithColors = computed(() => {
			return sortedValues.value.map((item, i) => ({
				...item,
				color: getPieChartColor(i, item.color),
			}));
		});

		const otherTotal = computed(() => {
			return otherItems.value.reduce((sum, item) => sum + item.value, 0);
		});

		const otherPercent = computed(() => {
			return total.value > 0 ? otherTotal.value / total.value : 0;
		});

		// Compute geometry for visible segments
		const visibleSegments = computed<ComputedSegment[]>(() => {
			let cumPct = 0;
			return topItems.value.map((item, i) => {
				const percent = total.value > 0 ? item.value / total.value : 0;
				const dashLength = Math.max(percent * circumference.value - segmentGap.value, 0);
				const startDeg = cumPct * 360 - 90;
				cumPct += percent;

				return {
					label: item.label,
					value: item.value,
					percent,
					color: getPieChartColor(i, item.color),
					dashLength,
					startDeg,
					delay: initialDelay.value + i * STAGGER,
					isVisible: animatedIn.value && !animateOut.value,
				};
			});
		});

		// Compute "Other" segment geometry
		const otherSegment = computed<ComputedSegment | null>(() => {
			if (otherItems.value.length === 0) return null;

			let cumPct = 0;
			topItems.value.forEach((item) => {
				cumPct += total.value > 0 ? item.value / total.value : 0;
			});

			const dashLength = Math.max(otherPercent.value * circumference.value - segmentGap.value, 0);
			const startDeg = cumPct * 360 - 90;
			const segIndex = topItems.value.length;

			return {
				label: 'Other',
				value: otherTotal.value,
				percent: otherPercent.value,
				color: '#C4C4C4',
				dashLength,
				startDeg,
				delay: initialDelay.value + segIndex * STAGGER,
				isVisible: animatedIn.value && !animateOut.value,
			};
		});

		// ── Count-up animation state ──
		// Reactive array of display values for each segment + "Other"
		const displayValues = ref<number[]>([]);
		const countUpTimers: ReturnType<typeof setTimeout>[] = [];
		const countUpRafs: number[] = [];

		// Get the target display value for a segment
		const getDisplayTarget = (segment: ComputedSegment) => {
			return unit.value === 'percent'
				? Math.round(segment.percent * 100)
				: segment.value;
		};

		// Animate a single value from startVal to endVal at a given index
		const animateCountUp = (index: number, startVal: number, endVal: number) => {
			let startTime: number | null = null;

			function step(timestamp: number) {
				if (startTime === null) startTime = timestamp;
				const elapsed = timestamp - startTime;
				const progress = Math.min(elapsed / GROW_DURATION, 1);
				const eased = easeInOutCubic(progress);
				const current = Math.round(startVal + (endVal - startVal) * eased);
				displayValues.value[index] = current;
				if (progress < 1) {
					countUpRafs[index] = requestAnimationFrame(step);
				}
			}

			countUpRafs[index] = requestAnimationFrame(step);
		};

		// Start all count-ups with staggered delays
		const startCountUps = (reverse = false) => {
			// Clear previous timers/rafs
			countUpTimers.forEach(clearTimeout);
			countUpTimers.length = 0;
			countUpRafs.forEach(cancelAnimationFrame);
			countUpRafs.length = 0;

			const allSegments = [
				...visibleSegments.value,
				...(otherSegment.value ? [otherSegment.value] : []),
			];

			// Ensure displayValues array matches segment count
			while (displayValues.value.length < allSegments.length) {
				displayValues.value.push(0);
			}

			allSegments.forEach((seg, i) => {
				const target = getDisplayTarget(seg);
				const { delay } = seg;
				const timer = setTimeout(() => {
					if (reverse) {
						animateCountUp(i, displayValues.value[i], 0);
					} else {
						animateCountUp(i, 0, target);
					}
				}, delay);
				countUpTimers.push(timer);
			});
		};

		// Format a display value based on unit type
		const formatDisplayValue = (index: number) => {
			const val = displayValues.value[index] ?? 0;
			switch (unit.value) {
				case 'percent':
					return `${val}%`;
				case 'amount':
					return `$${val.toLocaleString()}`;
				case 'count':
				default:
					return `${val.toLocaleString()}`;
			}
		};

		const formatItemValue = (item: { value: number }) => {
			const percent = total.value > 0 ? item.value / total.value : 0;
			switch (unit.value) {
				case 'percent':
					return `${Math.round(percent * 100)}%`;
				case 'amount':
					return `$${item.value.toLocaleString()}`;
				case 'count':
				default:
					return `${item.value.toLocaleString()}`;
			}
		};

		const formatOtherDisplayValue = () => {
			const otherIndex = visibleSegments.value.length;
			return formatDisplayValue(otherIndex);
		};

		// Reserve enough width for the widest final formatted value so pills
		// don't shift during the count-up animation.
		const valueMinWidth = computed(() => {
			const allSegments = [
				...visibleSegments.value,
				...(otherSegment.value ? [otherSegment.value] : []),
			];
			let maxLen = 0;
			allSegments.forEach((seg) => {
				const target = getDisplayTarget(seg);
				let formatted: string;
				switch (unit.value) {
					case 'percent':
						formatted = `${target}%`;
						break;
					case 'amount':
						formatted = `$${target.toLocaleString()}`;
						break;
					default:
						formatted = `${target.toLocaleString()}`;
				}
				if (formatted.length > maxLen) maxLen = formatted.length;
			});
			return `${maxLen}ch`;
		});

		// Trigger animation on mount or when loading completes.
		// Double rAF ensures the browser paints the initial state (segments
		// hidden) before flipping `animatedIn`, so the CSS transition fires.
		const triggerAnimateIn = () => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					animatedIn.value = true;
					startCountUps(false);
				});
			});
		};

		onMounted(() => {
			if (!loading.value && hasData.value) {
				triggerAnimateIn();
			}
		});

		watch(loading, (isLoading) => {
			if (!isLoading && hasData.value) {
				triggerAnimateIn();
			}
		});

		watch(animateOut, (shouldAnimateOut) => {
			if (shouldAnimateOut) {
				animatedIn.value = false;
				startCountUps(true);
			}
		});

		onUnmounted(() => {
			countUpTimers.forEach(clearTimeout);
			countUpRafs.forEach(cancelAnimationFrame);
		});

		return {
			// Constants
			CX,
			CY,
			radius,
			circumference,
			LOADING_BG_COLOR,
			OTHER_SEGMENT_BG_COLOR,
			// State
			showOtherLightbox,
			animatedIn,
			displayValues,
			// Computed
			hasData,
			visibleSegments,
			otherSegment,
			otherItems,
			allItemsWithColors,
			valueMinWidth,
			// Methods
			formatDisplayValue,
			formatItemValue,
			formatOtherDisplayValue,
		};
	},
};
</script>

<style lang="postcss" scoped>
.segment-circle {
	transition: stroke-dashoffset 500ms ease-in-out;
}

.skeleton-ring {
	transition: opacity 500ms ease-in-out;
}

.legend-dot {
	transition: background-color 500ms ease-in-out;
}
</style>
