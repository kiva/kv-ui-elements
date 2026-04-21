import KvPieChartV2 from '../KvPieChartV2.vue';
import KvPieChartV2DocsMdx from './KvPieChartV2Docs.mdx';

const sampleValues = [
	{ label: 'Agriculture', value: 28 },
	{ label: 'Eco-friendly', value: 28 },
	{ label: 'Services', value: 17 },
	{ label: 'Water', value: 13 },
	{ label: 'Food', value: 12 },
	{ label: 'Other', value: 5 },
];

const fewValues = [
	{ label: 'Female', value: 75 },
	{ label: 'Male', value: 25 },
];

const manyValues = [
	{ label: 'Food', value: 575 },
	{ label: 'Retail', value: 377 },
	{ label: 'Agriculture', value: 285 },
	{ label: 'Services', value: 211 },
	{ label: 'Clothing', value: 183 },
	{ label: 'Arts', value: 65 },
	{ label: 'Housing', value: 65 },
	{ label: 'Education', value: 36 },
	{ label: 'Construction', value: 28 },
	{ label: 'Health', value: 27 },
	{ label: 'Transportation', value: 23 },
	{ label: 'Personal Use', value: 19 },
	{ label: 'Manufacturing', value: 13 },
	{ label: 'Entertainment', value: 10 },
	{ label: 'Wholesale', value: 5 },
];

const customColorValues = [
	{ label: 'Category A', value: 40, color: '#FF6B6B' },
	{ label: 'Category B', value: 30, color: '#4ECDC4' },
	{ label: 'Category C', value: 20 },
	{ label: 'Category D', value: 10 },
];

export default {
	title: 'Charts/KvPieChartV2',
	component: KvPieChartV2,
	parameters: {
		docs: {
			page: KvPieChartV2DocsMdx,
			title: 'KvPieChartV2 Docs',
		},
	},
	argTypes: {
		/**
		 * Chart data items. Each must have a label and numeric value; optional color override.
		 */
		values: {
			control: 'object',
			description: 'Chart data items. Each must have a label and numeric value; optional color override.',
			table: {
				type: { summary: 'KvPieChartV2Item[]' },
				defaultValue: { summary: '[]' },
			},
		},
		/**
		 * How values are displayed in legend pills.
		 */
		unit: {
			control: { type: 'radio' },
			options: ['percent', 'amount', 'count'],
			description: 'How values are displayed in legend pills.',
			table: {
				type: { summary: "'percent' | 'amount' | 'count'" },
				defaultValue: { summary: "'percent'" },
			},
		},
		/**
		 * Shows a skeleton donut ring when true.
		 */
		loading: {
			control: 'boolean',
			description: 'Shows a skeleton donut ring when true.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		/**
		 * Maximum number of visible segments before remaining items collapse into "Other".
		 */
		shownSegments: {
			control: { type: 'number', min: 1, max: 20 },
			description: 'Maximum number of visible segments before remaining items collapse into "Other".',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '5' },
			},
		},
		/**
		 * Donut ring thickness in SVG user units. The radius shrinks as this grows,
		 * so the outer edge always fits within the viewBox.
		 */
		strokeWidth: {
			control: {
				type: 'range', min: 8, max: 200, step: 2,
			},
			description: 'Donut ring thickness in SVG user units.',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '56' },
			},
		},
		/**
		 * Visual gap between adjacent segments, in SVG user units along the circumference.
		 */
		segmentGap: {
			control: {
				type: 'range', min: 0, max: 20, step: 1,
			},
			description: 'Visual gap between adjacent segments, in SVG user units along the circumference.',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '2' },
			},
		},
		/**
		 * Delay in milliseconds before the first segment starts animating in.
		 */
		initialDelay: {
			control: {
				type: 'range', min: 0, max: 5000, step: 100,
			},
			description: 'Delay in milliseconds before the first segment starts animating in.',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '1000' },
			},
		},
		/**
		 * Reverses the entrance animation (segments shrink back to 0).
		 */
		animateOut: {
			control: 'boolean',
			description: 'Reverses the entrance animation (segments shrink back to 0).',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
	},
};

/**
 * Default story - Interactive playground for exploring all props.
 */
export const Default = {
	args: {
		values: sampleValues,
		unit: 'percent',
		loading: false,
		shownSegments: 5,
		strokeWidth: 56,
		segmentGap: 2,
		initialDelay: 1000,
		animateOut: false,
	},
	render: (args) => ({
		components: { KvPieChartV2 },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6 tw-inline-block">
				<div style="max-width: 262px;">
					<KvPieChartV2 v-bind="args" />
				</div>
			</div>
		`,
	}),
};

/**
 * Component Overview - Key visual variants at a glance.
 */
export const ComponentOverview = {
	render: () => ({
		components: { KvPieChartV2 },
		setup() {
			return { sampleValues, fewValues, manyValues };
		},
		template: `
			<div class="tw-flex tw-items-start tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">Default (6 items)</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="fewValues" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">Few items</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="manyValues" :shown-segments="5" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">Many items (Other pill)</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="[]" :loading="true" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">Loading skeleton</p>
				</div>
			</div>
		`,
	}),
};

/**
 * All Variations - Every prop axis shown in organized groups.
 */
export const AllVariations = {
	render: () => ({
		components: { KvPieChartV2 },
		setup() {
			return {
				sampleValues, manyValues, customColorValues,
			};
		},
		template: `
			<div class="tw-space-y-8">
				<div>
					<h3 class="tw-text-h4 tw-mb-4">Unit Formats</h3>
					<div class="tw-flex tw-items-start tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
						<div style="width: 262px;">
							<KvPieChartV2 :values="sampleValues" unit="percent" />
							<p class="tw-text-small tw-mt-2 tw-text-center">percent</p>
						</div>
						<div style="width: 262px;">
							<KvPieChartV2 :values="sampleValues" unit="amount" />
							<p class="tw-text-small tw-mt-2 tw-text-center">amount</p>
						</div>
						<div style="width: 262px;">
							<KvPieChartV2 :values="sampleValues" unit="count" />
							<p class="tw-text-small tw-mt-2 tw-text-center">count</p>
						</div>
					</div>
				</div>

				<div>
					<h3 class="tw-text-h4 tw-mb-4">Ring Thickness</h3>
					<div class="tw-flex tw-items-start tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
						<div style="width: 262px;">
							<KvPieChartV2 :values="sampleValues" :stroke-width="24" />
							<p class="tw-text-small tw-mt-2 tw-text-center">strokeWidth: 24</p>
						</div>
						<div style="width: 262px;">
							<KvPieChartV2 :values="sampleValues" :stroke-width="56" />
							<p class="tw-text-small tw-mt-2 tw-text-center">strokeWidth: 56 (default)</p>
						</div>
						<div style="width: 262px;">
							<KvPieChartV2 :values="sampleValues" :stroke-width="100" />
							<p class="tw-text-small tw-mt-2 tw-text-center">strokeWidth: 100</p>
						</div>
					</div>
				</div>

				<div>
					<h3 class="tw-text-h4 tw-mb-4">Segment Gap</h3>
					<div class="tw-flex tw-items-start tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
						<div style="width: 262px;">
							<KvPieChartV2 :values="sampleValues" :segment-gap="0" />
							<p class="tw-text-small tw-mt-2 tw-text-center">segmentGap: 0</p>
						</div>
						<div style="width: 262px;">
							<KvPieChartV2 :values="sampleValues" :segment-gap="2" />
							<p class="tw-text-small tw-mt-2 tw-text-center">segmentGap: 2 (default)</p>
						</div>
						<div style="width: 262px;">
							<KvPieChartV2 :values="sampleValues" :segment-gap="10" />
							<p class="tw-text-small tw-mt-2 tw-text-center">segmentGap: 10</p>
						</div>
					</div>
				</div>

				<div>
					<h3 class="tw-text-h4 tw-mb-4">Data Density</h3>
					<div class="tw-flex tw-items-start tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
						<div style="width: 262px;">
							<KvPieChartV2 :values="[{ label: 'Total', value: 100 }]" />
							<p class="tw-text-small tw-mt-2 tw-text-center">Single value</p>
						</div>
						<div style="width: 262px;">
							<KvPieChartV2 :values="manyValues" :shown-segments="4" />
							<p class="tw-text-small tw-mt-2 tw-text-center">Many values, shownSegments: 4</p>
						</div>
						<div style="width: 262px;">
							<KvPieChartV2 :values="customColorValues" />
							<p class="tw-text-small tw-mt-2 tw-text-center">Custom color overrides</p>
						</div>
					</div>
				</div>
			</div>
		`,
	}),
};

/**
 * Loading State - Skeleton ring while data is unavailable.
 */
export const LoadingState = {
	render: () => ({
		components: { KvPieChartV2 },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6 tw-inline-block">
				<div style="width: 262px;">
					<KvPieChartV2 :values="[]" :loading="true" />
				</div>
			</div>
		`,
	}),
};

/**
 * Unit Formats - Side-by-side comparison of the three display modes.
 */
export const UnitFormats = {
	render: () => ({
		components: { KvPieChartV2 },
		setup() {
			return { sampleValues };
		},
		template: `
			<div class="tw-flex tw-items-start tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" unit="percent" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">percent</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" unit="amount" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">amount</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" unit="count" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">count</p>
				</div>
			</div>
		`,
	}),
};

/**
 * Ring Thickness - strokeWidth scales inward so outer diameter stays constant.
 */
export const RingThickness = {
	render: () => ({
		components: { KvPieChartV2 },
		setup() {
			return { sampleValues };
		},
		template: `
			<div class="tw-flex tw-items-start tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" :stroke-width="16" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">16 (thin)</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" :stroke-width="56" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">56 (default)</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" :stroke-width="120" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">120 (thick)</p>
				</div>
			</div>
		`,
	}),
};

/**
 * Segment Gap - Visual spacing between adjacent segments.
 */
export const SegmentGap = {
	render: () => ({
		components: { KvPieChartV2 },
		setup() {
			return { sampleValues };
		},
		template: `
			<div class="tw-flex tw-items-start tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" :segment-gap="0" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">No gap</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" :segment-gap="2" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">2 (default)</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" :segment-gap="10" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">10 (wide)</p>
				</div>
			</div>
		`,
	}),
};

/**
 * Data Density - Single value, few items, and overflow into "Other".
 */
export const DataDensity = {
	render: () => ({
		components: { KvPieChartV2 },
		setup() {
			return { fewValues, manyValues };
		},
		template: `
			<div class="tw-flex tw-items-start tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
				<div style="width: 262px;">
					<KvPieChartV2 :values="[{ label: 'Total', value: 100 }]" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">Single value</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="fewValues" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">Few items</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="manyValues" :shown-segments="4" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">Many items (click Other)</p>
				</div>
			</div>
		`,
	}),
};

/**
 * Custom Colors - Partial or full color overrides per item.
 */
export const CustomColors = {
	render: () => ({
		components: { KvPieChartV2 },
		setup() {
			return { customColorValues };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6 tw-inline-block">
				<div style="width: 262px;">
					<KvPieChartV2 :values="customColorValues" />
				</div>
			</div>
		`,
	}),
};

/**
 * Animation Timing - Initial delay options including no delay.
 */
export const AnimationTiming = {
	render: () => ({
		components: { KvPieChartV2 },
		setup() {
			return { sampleValues };
		},
		template: `
			<div class="tw-flex tw-items-start tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" :initial-delay="0" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">initialDelay: 0</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" :initial-delay="1000" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">initialDelay: 1000 (default)</p>
				</div>
				<div style="width: 262px;">
					<KvPieChartV2 :values="sampleValues" :initial-delay="2500" />
					<p class="tw-text-small tw-mt-2 tw-text-center tw-text-secondary">initialDelay: 2500</p>
				</div>
			</div>
		`,
	}),
};
