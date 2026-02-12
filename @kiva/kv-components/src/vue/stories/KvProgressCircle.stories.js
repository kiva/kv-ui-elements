import KvProgressCircle from '../KvProgressCircle.vue';
import KvProgressCircleDocsMdx from './KvProgressCircleDocs.mdx';

export default {
	title: 'KvProgressCircle',
	component: KvProgressCircle,
	parameters: {
		docs: {
			page: KvProgressCircleDocsMdx,
			title: 'KvProgressCircle Docs',
		},
	},
	argTypes: {
		/**
		 * Value of the progress circle, between 0 and 100.
		 */
		value: {
			control: {
				type: 'range', min: 0, max: 100, step: 1,
			},
			description: 'Value of the progress circle, between 0 and 100.',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 'required' },
			},
		},
		/**
		 * Create an arc instead of a full circle. A percent (0-1).
		 */
		arcScale: {
			control: {
				type: 'range', min: 0, max: 1, step: 0.1,
			},
			description: 'Create an arc instead of a full circle. A percent (0-1).',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '1' },
			},
		},
		/**
		 * Degrees to rotate the circle, used in tandem with arcScale.
		 */
		rotate: {
			control: {
				type: 'range', min: 0, max: 360, step: 1,
			},
			description: 'Degrees to rotate the circle, used in tandem with arcScale.',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '0' },
			},
		},
		/**
		 * Stroke width as a percent of the circle.
		 */
		strokeWidth: {
			control: {
				type: 'range', min: 1, max: 50, step: 1,
			},
			description: 'Stroke width as a percent of the circle.',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '8' },
			},
		},
		/**
		 * Whether to show the value as a number.
		 */
		showNumber: {
			control: 'boolean',
			description: 'Whether to show the value as a number.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		/**
		 * Color of the progress circle (Tailwind color class suffix).
		 */
		color: {
			control: 'select',
			options: ['brand', 'action', 'caution', 'danger', 'primary', 'secondary'],
			description: 'Color of the progress circle (Tailwind color class suffix).',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'brand' },
			},
		},
	},
};

/**
 * Default story - Interactive playground for exploring all props.
 */
export const Default = {
	args: {
		value: 65,
		arcScale: 1,
		rotate: 0,
		strokeWidth: 8,
		showNumber: false,
		color: 'brand',
	},
	render: (args) => ({
		components: { KvProgressCircle },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6 tw-inline-block">
				<KvProgressCircle
					v-bind="args"
					style="width: 200px;"
				/>
			</div>
		`,
	}),
};

/**
 * Component Overview - Shows key variants of the progress circle.
 */
export const ComponentOverview = {
	render: () => ({
		components: { KvProgressCircle },
		template: `
			<div class="tw-flex tw-items-center tw-gap-8 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
				<div class="tw-text-center">
					<KvProgressCircle :value="25" style="width: 100px;" />
					<p class="tw-text-small tw-mt-2 tw-text-secondary">25% Complete</p>
				</div>
				<div class="tw-text-center">
					<KvProgressCircle :value="50" style="width: 100px;" />
					<p class="tw-text-small tw-mt-2 tw-text-secondary">50% Complete</p>
				</div>
				<div class="tw-text-center">
					<KvProgressCircle :value="75" style="width: 100px;" />
					<p class="tw-text-small tw-mt-2 tw-text-secondary">75% Complete</p>
				</div>
				<div class="tw-text-center">
					<KvProgressCircle :value="100" style="width: 100px;" />
					<p class="tw-text-small tw-mt-2 tw-text-secondary">100% Complete</p>
				</div>
			</div>
		`,
	}),
};

/**
 * All Variations - Displays all color, size, and configuration variations.
 */
export const AllVariations = {
	render: () => ({
		components: { KvProgressCircle },
		template: `
			<div class="tw-space-y-8">
				<!-- Color Variations -->
				<div>
					<h3 class="tw-text-h4 tw-mb-4">Color Variations</h3>
					<div class="tw-flex tw-items-center tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
						<div class="tw-text-center">
							<KvProgressCircle :value="65" color="brand" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">brand</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="65" color="action" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">action</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="65" color="caution" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">caution</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="65" color="danger" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">danger</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="65" color="primary" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">primary</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="65" color="secondary" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">secondary</p>
						</div>
					</div>
				</div>

				<!-- Stroke Width Variations -->
				<div>
					<h3 class="tw-text-h4 tw-mb-4">Stroke Width Variations</h3>
					<div class="tw-flex tw-items-center tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
						<div class="tw-text-center">
							<KvProgressCircle :value="65" :strokeWidth="4" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">4px</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="65" :strokeWidth="8" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">8px (default)</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="65" :strokeWidth="16" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">16px</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="65" :strokeWidth="24" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">24px</p>
						</div>
					</div>
				</div>

				<!-- With Number Display -->
				<div>
					<h3 class="tw-text-h4 tw-mb-4">With Number Display</h3>
					<div class="tw-flex tw-items-center tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
						<div class="tw-text-center">
							<KvProgressCircle :value="25" :showNumber="true" style="width: 120px;" />
							<p class="tw-text-small tw-mt-2">25%</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="50" :showNumber="true" style="width: 120px;" />
							<p class="tw-text-small tw-mt-2">50%</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="75" :showNumber="true" style="width: 120px;" />
							<p class="tw-text-small tw-mt-2">75%</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="100" :showNumber="true" style="width: 120px;" />
							<p class="tw-text-small tw-mt-2">100%</p>
						</div>
					</div>
				</div>

				<!-- Arc Scale Variations -->
				<div>
					<h3 class="tw-text-h4 tw-mb-4">Arc Scale Variations</h3>
					<div class="tw-flex tw-items-center tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
						<div class="tw-text-center">
							<KvProgressCircle :value="65" :arcScale="1" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">Full circle (1)</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="65" :arcScale="0.75" :rotate="45" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">3/4 arc (0.75)</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="65" :arcScale="0.5" :rotate="90" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">Half arc (0.5)</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="65" :arcScale="0.25" :rotate="135" style="width: 80px;" />
							<p class="tw-text-small tw-mt-2">Quarter arc (0.25)</p>
						</div>
					</div>
				</div>
			</div>
		`,
	}),
};

/**
 * Progress States - Shows different progress values.
 */
export const ProgressStates = {
	render: () => ({
		components: { KvProgressCircle },
		template: `
			<div class="tw-flex tw-items-center tw-gap-8 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
				<div class="tw-text-center">
					<KvProgressCircle :value="0" style="width: 100px;" />
					<p class="tw-text-small tw-mt-2 tw-text-secondary">Empty (0%)</p>
				</div>
				<div class="tw-text-center">
					<KvProgressCircle :value="33" style="width: 100px;" />
					<p class="tw-text-small tw-mt-2 tw-text-secondary">In Progress (33%)</p>
				</div>
				<div class="tw-text-center">
					<KvProgressCircle :value="66" style="width: 100px;" />
					<p class="tw-text-small tw-mt-2 tw-text-secondary">Near Complete (66%)</p>
				</div>
				<div class="tw-text-center">
					<KvProgressCircle :value="100" color="action" style="width: 100px;" />
					<p class="tw-text-small tw-mt-2 tw-text-secondary">Complete (100%)</p>
				</div>
			</div>
		`,
	}),
};

/**
 * Arc Configurations - Demonstrates arc and rotation combinations.
 */
export const ArcConfigurations = {
	render: () => ({
		components: { KvProgressCircle },
		template: `
			<div class="tw-space-y-6">
				<div>
					<h4 class="tw-text-h4 tw-mb-4">Gauge-style Progress</h4>
					<div class="tw-flex tw-items-center tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
						<div class="tw-text-center">
							<KvProgressCircle :value="30" :arcScale="0.5" :rotate="90" style="width: 120px;" />
							<p class="tw-text-small tw-mt-2">Bottom gauge - 30%</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="60" :arcScale="0.5" :rotate="90" style="width: 120px;" />
							<p class="tw-text-small tw-mt-2">Bottom gauge - 60%</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="90" :arcScale="0.5" :rotate="90" style="width: 120px;" />
							<p class="tw-text-small tw-mt-2">Bottom gauge - 90%</p>
						</div>
					</div>
				</div>
				<div>
					<h4 class="tw-text-h4 tw-mb-4">Different Rotations</h4>
					<div class="tw-flex tw-items-center tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
						<div class="tw-text-center">
							<KvProgressCircle :value="50" :arcScale="0.75" :rotate="0" style="width: 100px;" />
							<p class="tw-text-small tw-mt-2">0° rotation</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="50" :arcScale="0.75" :rotate="90" style="width: 100px;" />
							<p class="tw-text-small tw-mt-2">90° rotation</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="50" :arcScale="0.75" :rotate="180" style="width: 100px;" />
							<p class="tw-text-small tw-mt-2">180° rotation</p>
						</div>
						<div class="tw-text-center">
							<KvProgressCircle :value="50" :arcScale="0.75" :rotate="270" style="width: 100px;" />
							<p class="tw-text-small tw-mt-2">270° rotation</p>
						</div>
					</div>
				</div>
			</div>
		`,
	}),
};

/**
 * Size Examples - Shows different sizing approaches.
 */
export const SizeExamples = {
	render: () => ({
		components: { KvProgressCircle },
		template: `
			<div class="tw-flex tw-items-end tw-gap-6 tw-flex-wrap tw-p-6 tw-bg-gray-50 tw-rounded-md">
				<div class="tw-text-center">
					<KvProgressCircle :value="65" style="width: 40px;" />
					<p class="tw-text-small tw-mt-2">40px</p>
				</div>
				<div class="tw-text-center">
					<KvProgressCircle :value="65" style="width: 80px;" />
					<p class="tw-text-small tw-mt-2">80px</p>
				</div>
				<div class="tw-text-center">
					<KvProgressCircle :value="65" style="width: 120px;" />
					<p class="tw-text-small tw-mt-2">120px</p>
				</div>
				<div class="tw-text-center">
					<KvProgressCircle :value="65" style="width: 160px;" />
					<p class="tw-text-small tw-mt-2">160px</p>
				</div>
				<div class="tw-text-center">
					<KvProgressCircle :value="65" style="width: 200px;" />
					<p class="tw-text-small tw-mt-2">200px</p>
				</div>
			</div>
		`,
	}),
};
