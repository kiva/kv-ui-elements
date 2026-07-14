<template>
	<figure class="kv-stacked-bar-graph tw-m-0">
		<figcaption class="tw-sr-only">
			{{ ariaSummary }}
		</figcaption>

		<!-- Legend (always present for the series; identity is never color-alone) -->
		<ul
			v-if="series.length"
			class="kv-stacked-bar-graph__legend tw-flex tw-flex-wrap tw-gap-x-3 tw-gap-y-1 tw-mb-2 tw-p-0"
			aria-hidden="false"
		>
			<li
				v-for="s in resolvedSeries"
				:key="s.key"
				class="tw-flex tw-items-center tw-text-small tw-text-secondary"
			>
				<span
					class="kv-stacked-bar-graph__swatch tw-inline-block tw-mr-0.5 tw-rounded-sm"
					:style="{ backgroundColor: s.color }"
				></span>
				{{ s.label }}
			</li>
		</ul>

		<div class="kv-stacked-bar-graph__scroll tw-overflow-x-auto">
			<svg
				:viewBox="`0 0 ${chartWidth} ${chartHeight}`"
				:width="chartWidth"
				:height="chartHeight"
				class="kv-stacked-bar-graph__svg"
				preserveAspectRatio="xMinYMin meet"
			>
				<!-- Recessive gridlines + y-axis value labels (0 and max) -->
				<g
					class="kv-stacked-bar-graph__grid"
					aria-hidden="true"
				>
					<template
						v-for="tick in yTicks"
						:key="`grid-${tick.value}`"
					>
						<line
							:x1="padLeft"
							:x2="chartWidth - PAD_RIGHT"
							:y1="tick.y"
							:y2="tick.y"
							class="kv-stacked-bar-graph__gridline"
						/>
						<text
							:x="padLeft - 6"
							:y="tick.y + 3"
							text-anchor="end"
							class="kv-stacked-bar-graph__axis-label"
						>
							{{ formatValue(tick.value) }}
						</text>
					</template>
				</g>

				<!-- Bars -->
				<g
					v-for="(bar, barIndex) in bars"
					:key="`bar-${bar.label}`"
					class="kv-stacked-bar-graph__bar"
				>
					<rect
						v-for="seg in bar.segments"
						:key="`${bar.label}-${seg.seriesKey}`"
						:x="bar.x"
						:y="seg.y"
						:width="BAR_WIDTH"
						:height="seg.height"
						:fill="seg.color"
						class="kv-stacked-bar-graph__segment"
						aria-hidden="true"
					/>

					<!-- One focusable button per bar, carrying the whole-bar summary. -->
					<rect
						class="kv-stacked-bar-graph__hit"
						:x="bar.x"
						:y="bar.totalY"
						:width="BAR_WIDTH"
						:height="bar.height"
						role="button"
						tabindex="0"
						:aria-label="bar.ariaLabel"
						@click="$emit('bar-click', barIndex)"
						@keydown.enter.prevent="$emit('bar-click', barIndex)"
						@keydown.space.prevent="$emit('bar-click', barIndex)"
					>
						<title>{{ bar.ariaLabel }}</title>
					</rect>

					<!-- x-axis (period) label -->
					<text
						:x="bar.x + BAR_WIDTH / 2"
						:y="chartHeight - 8"
						text-anchor="middle"
						class="kv-stacked-bar-graph__axis-label"
						aria-hidden="true"
					>
						{{ bar.label }}
					</text>
					<!-- direct total label above every bar -->
					<text
						:x="bar.x + BAR_WIDTH / 2"
						:y="bar.totalY - 6"
						text-anchor="middle"
						class="kv-stacked-bar-graph__total-label"
						aria-hidden="true"
					>
						{{ formatValue(bar.total) }}
					</text>
				</g>
			</svg>
		</div>

		<p
			v-if="axisLabel"
			class="tw-text-center tw-text-small tw-text-tertiary tw-mt-1"
		>
			{{ axisLabel }}
		</p>
	</figure>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import type { PropType } from 'vue';
import { getChartColor } from '../utils/chartColors';

/** One stacked segment within a bar. */
export interface KvStackedBarSegment {
	seriesKey: string;
	value: number;
}

/** One bar (period) with its stacked segments, drawn bottom-up. */
export interface KvStackedBarPoint {
	label: string;
	segments: KvStackedBarSegment[];
}

/**
 * A series definition in fixed order (never cycled). `color` is an optional
 * override; when omitted it is assigned from the shared chart palette.
 */
export interface KvStackedBarSeries {
	key: string;
	label: string;
	color?: string;
}

// Chart geometry (SVG user units).
const PLOT_HEIGHT = 220;
const PAD_TOP = 16;
const PAD_BOTTOM = 26;
const PAD_RIGHT = 8;
const BAR_WIDTH = 30;
const BAR_GAP = 26;
// 2px surface gap between stacked segments (dataviz mark spec).
const SEGMENT_GAP = 2;
// Aim for roughly this many y-axis gridlines (matches the legacy Highcharts
// axis, which auto-drew several evenly-spaced rounded ticks with headroom).
const Y_AXIS_TARGET_TICKS = 5;

// Round a raw step up to a readable "nice" number (1, 2, or 5 × 10ⁿ) so axis
// labels land on round values (…, 100, 200, 500, …) like the legacy chart.
function niceStep(rawStep: number): number {
	const magnitude = 10 ** Math.floor(Math.log10(rawStep));
	const fraction = rawStep / magnitude;
	let niceFraction;
	if (fraction < 1.5) {
		niceFraction = 1;
	} else if (fraction < 3) {
		niceFraction = 2;
	} else if (fraction < 7) {
		niceFraction = 5;
	} else {
		niceFraction = 10;
	}
	return niceFraction * magnitude;
}

interface RenderSegment {
	seriesKey: string;
	color: string;
	y: number;
	height: number;
}

interface RenderBar {
	label: string;
	x: number;
	total: number;
	totalY: number;
	height: number;
	segments: RenderSegment[];
	ariaLabel: string;
}

export default {
	name: 'KvStackedBarGraph',
	props: {
		/**
		 * Bars to plot, in display order. Each point stacks its segments bottom-up.
		 * [{ label: 'Jul 2026', segments: [{ seriesKey: 'user', value: 340 }, …] }]
		 */
		points: {
			type: Array as PropType<KvStackedBarPoint[]>,
			required: true,
		},
		/**
		 * Series definitions in fixed order (never cycled). Each supplies a stable
		 * key, a legend label, and an optional `color` override.
		 * [{ key: 'user', label: 'Repaid to your account', color: '#26985D' }]
		 */
		series: {
			type: Array as PropType<KvStackedBarSeries[]>,
			required: true,
		},
		/** Formatter for values shown in axis labels, direct labels, and aria text. */
		formatValue: {
			type: Function as PropType<(value: number) => string>,
			default: (value: number): string => String(value),
		},
		/** Optional caption shown below the plot. */
		axisLabel: {
			type: String,
			default: '',
		},
		/** Accessible title summarising what the chart shows. */
		title: {
			type: String,
			default: '',
		},
		/**
		 * Optional call-to-action sentence appended to each bar's aria-label,
		 * e.g. "Select to view repayments for this month." Empty ⇒ no suffix.
		 */
		barActionLabel: {
			type: String,
			default: '',
		},
	},
	emits: ['bar-click'],
	setup(props) {
		const {
			points, series, formatValue, title, barActionLabel,
		} = toRefs(props);

		// Series with their resolved colors (override wins, else shared palette).
		const resolvedSeries = computed(() => series.value.map((s, i) => ({
			...s,
			color: getChartColor(i, s.color),
		})));
		const seriesColors = computed<Record<string, string>>(
			() => Object.fromEntries(resolvedSeries.value.map((s) => [s.key, s.color])),
		);
		const seriesLabels = computed<Record<string, string>>(
			() => Object.fromEntries(series.value.map((s) => [s.key, s.label])),
		);
		const seriesKeySet = computed(() => new Set(series.value.map((s) => s.key)));

		// Total only the segments that are actually drawn: those whose seriesKey is a
		// declared series and whose value is positive. Keeps the total label and
		// y-scale consistent with the rendered stack and the aria breakdown.
		const barTotals = computed(() => points.value.map(
			(p) => (p.segments || []).reduce(
				(sum, seg) => (seriesKeySet.value.has(seg.seriesKey) && Number(seg.value) > 0
					? sum + Number(seg.value)
					: sum),
				0,
			),
		));
		// Derive a "nice" y-axis: a rounded step and an upper bound at/above the
		// tallest bar, producing several evenly-spaced ticks (0, step, 2·step, …)
		// with headroom — the auto-tick behaviour the legacy Highcharts axis had.
		const axis = computed(() => {
			const rawMax = Math.max(...barTotals.value, 0);
			if (rawMax <= 0) {
				return { max: 1, ticks: [0] };
			}
			const step = niceStep(rawMax / Y_AXIS_TARGET_TICKS);
			const max = Math.ceil(rawMax / step) * step;
			const count = Math.round(max / step);
			const ticks = Array.from({ length: count + 1 }, (_, k) => k * step);
			return { max, ticks };
		});
		const yScale = computed(() => PLOT_HEIGHT / axis.value.max);
		const baselineY = computed(() => PAD_TOP + PLOT_HEIGHT);

		const padLeft = computed(() => {
			// Reserve room for the widest y-axis value label.
			const widest = formatValue.value(axis.value.max);
			return Math.max(40, 14 + widest.length * 7);
		});
		const chartHeight = computed(() => PAD_TOP + PLOT_HEIGHT + PAD_BOTTOM);
		const chartWidth = computed(() => {
			const count = Math.max(points.value.length, 1);
			return padLeft.value + count * (BAR_WIDTH + BAR_GAP) + PAD_RIGHT;
		});

		const yTicks = computed(() => axis.value.ticks.map((value) => ({
			value,
			y: baselineY.value - value * yScale.value,
		})));

		const bars = computed<RenderBar[]>(() => points.value.map((point, i) => {
			const total = barTotals.value[i];
			// Segments follow the fixed series order so colors never depend on rank.
			const orderedSegments = series.value
				.map((s) => (point.segments || []).find((seg) => seg.seriesKey === s.key))
				.filter((seg): seg is KvStackedBarSegment => !!seg && Number(seg.value) > 0);

			// Draw from the baseline upward in reverse series order, so the first
			// series renders at the TOP of the stack while the legend lists series
			// in prop order.
			let cursorBottom = baselineY.value;
			const segments: RenderSegment[] = [];
			for (let idx = orderedSegments.length - 1; idx >= 0; idx -= 1) {
				const seg = orderedSegments[idx];
				const rawHeight = Number(seg.value) * yScale.value;
				const isBottom = idx === orderedSegments.length - 1;
				const yTop = cursorBottom - rawHeight;
				// A 2px surface gap sits below every non-bottom segment.
				const height = isBottom ? rawHeight : Math.max(rawHeight - SEGMENT_GAP, 1);
				cursorBottom = yTop;
				segments.push({
					seriesKey: seg.seriesKey,
					color: seriesColors.value[seg.seriesKey],
					y: yTop,
					height,
				});
			}

			const totalY = baselineY.value - total * yScale.value;
			const breakdown = orderedSegments
				.map((seg) => `${seriesLabels.value[seg.seriesKey] || seg.seriesKey}: `
					+ `${formatValue.value(Number(seg.value))}`)
				.join(', ');
			const action = barActionLabel.value ? `. ${barActionLabel.value}` : '';
			return {
				label: point.label,
				x: padLeft.value + i * (BAR_WIDTH + BAR_GAP) + BAR_GAP / 2,
				total,
				totalY,
				height: baselineY.value - totalY,
				segments,
				ariaLabel: `${point.label} — total ${formatValue.value(total)}`
					+ `${breakdown ? `; ${breakdown}` : ''}${action}`,
			};
		}));

		const ariaSummary = computed(() => {
			if (title.value) {
				return title.value;
			}
			return `Stacked bar graph of ${points.value.length} periods across `
				+ `${series.value.length} series.`;
		});

		return {
			PAD_RIGHT,
			BAR_WIDTH,
			resolvedSeries,
			padLeft,
			chartHeight,
			chartWidth,
			yTicks,
			bars,
			ariaSummary,
		};
	},
};
</script>

<style lang="postcss" scoped>
/*
 * Tailwind (@apply) is used for everything the kv-tokens preset exposes a
 * utility for. A few SVG-paint properties have no token and stay raw CSS:
 * the recessive gridline/hover opacities (0.25 / 0.85 aren't on the opacity
 * scale), stroke + stroke-width, the 11px axis type (the preset disables the
 * default font-size scale), and the 600 total-label weight.
 */
.kv-stacked-bar-graph__svg {
	@apply tw-max-w-full tw-h-auto;
}

.kv-stacked-bar-graph__swatch {
	width: 12px;
	height: 12px;
}

.kv-stacked-bar-graph__segment {
	@apply tw-pointer-events-none tw-transition-opacity;
}

/* Hover/focus affordance is driven by the whole-bar hit target. */
.kv-stacked-bar-graph__bar:hover .kv-stacked-bar-graph__segment,
.kv-stacked-bar-graph__bar:focus-within .kv-stacked-bar-graph__segment {
	opacity: 0.85;
}

.kv-stacked-bar-graph__hit {
	@apply tw-cursor-pointer;

	fill: transparent;
}

.kv-stacked-bar-graph__hit:focus {
	@apply tw-outline-none;
}

.kv-stacked-bar-graph__hit:focus-visible {
	stroke: rgb(var(--text-primary));
	stroke-width: 2;
}

.kv-stacked-bar-graph__gridline {
	stroke: rgb(var(--text-tertiary));
	stroke-width: 1;
	opacity: 0.25;
}

/* fill-current + text token keeps the axis type theme-aware via KvThemeProvider. */
.kv-stacked-bar-graph__axis-label {
	@apply tw-fill-current tw-text-tertiary;

	font-size: 11px;
}

.kv-stacked-bar-graph__total-label {
	@apply tw-fill-current tw-text-secondary;

	font-size: 11px;
	font-weight: 600;
}
</style>
