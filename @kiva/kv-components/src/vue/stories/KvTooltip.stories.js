import KvButton from '../KvButton.vue';
import KvTooltip from '../KvTooltip.vue';

export default {
	title: 'KvTooltip',
	component: KvTooltip,
	args: {
		theme: 'ecoStoneDark',
		placement: 'top',
		maxWidth: '250px',
	},
	argTypes: {
		theme: {
			options: [
				'default',
				'ecoGreenLight',
				'ecoGreenDark',
				'ecoLightMarigold',
				'ecoStoneLight',
				'ecoStoneDark',
				'mint',
				'dark',
			],
			control: { type: 'select' },
		},
		placement: {
			options: [
				'top',
				'bottom',
				'left',
				'right',
				'top-start',
				'top-end',
				'bottom-start',
				'bottom-end',
				'left-start',
				'left-end',
				'right-start',
				'right-end',
			],
			control: { type: 'select' },
		},
		maxWidth: {
			control: { type: 'text' },
		},
		modifiers: {
			control: { type: 'object' },
		},
		showTooltip: {
			control: { type: 'boolean' },
		},
	},
};

export const Default = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvButton,
		KvTooltip,
	},
	setup() { return { args }; },
	template: `
		<div class="tw-p-12" style="height: 600px;">
			<kv-button id="my-cool-btn">Hover of Focus Me!</kv-button>
			<kv-tooltip v-bind="args" max-width="600px" controller="my-cool-btn" :key="args.placement">
				<template #title>
					What is an Experimental Field Partner?
				</template>
				If a Field Partner is labeled as Experimental, this means that Kiva has
				required only a comparatively light level of due diligence and
				monitoring, in exchange for only allowing this Field Partner access to a
				small amount of funding through Kiva at any given time.
			</kv-tooltip>
		</div>
	`,
});

export const PlacementShowcase = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvButton,
		KvTooltip,
	},
	setup() { return { args }; },
	template: `
		<div class="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-p-14">
			<div class="tw-text-center">
				<h3 class="tw-text-lg tw-font-semibold tw-mb-2">Test Tooltip Placement</h3>
				<p class="tw-text-gray-600 tw-mb-2 tw-max-w-md">
					Use the placement control in the Storybook panel to change the tooltip position.
					Hover over the button to see the tooltip.
				</p>
				<kv-button id="placement-btn" class="tw-m-4">
					Hover Me!
				</kv-button>
				<kv-tooltip v-bind="args" controller="placement-btn" :key="args.placement">
					<template #title>{{ args.placement }} Placement</template>
					Tooltip is positioned using a "{{ args.placement }}" placement.
				</kv-tooltip>
			</div>
		</div>
	`,
});

export const ModifiersShowcase = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvButton,
		KvTooltip,
	},
	setup() { return { args }; },
	template: `
		<div class="tw-p-8 tw-space-y-8">
			<div>
				<h3 class="tw-text-lg tw-font-semibold tw-mb-4">Tooltip Modifiers Examples</h3>
				<div class="tw-space-y-6">
					<!-- Custom padding modifier -->
					<div>
						<h4 class="tw-font-medium tw-mb-2">Custom Padding (20px from edges)</h4>
						<kv-button id="padding-btn" class="tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-rounded">
							Custom Padding
						</kv-button>
						<kv-tooltip
							controller="padding-btn"
							:theme="args.theme"
							:modifiers="{ preventOverflow: { padding: 20 } }"
							:key="args.placement"
						>
							<template #title>Custom Padding</template>
							This tooltip has 20px padding from viewport edges instead of the default 10px.
						</kv-tooltip>
					</div>

					<!-- Offset modifier -->
					<div>
						<h4 class="tw-font-medium tw-mb-2">Custom Offset (shifted 20px)</h4>
						<kv-button id="offset-btn" class="tw-bg-purple-500 tw-text-white tw-px-4 tw-py-2 tw-rounded">
							Custom Offset
						</kv-button>
						<kv-tooltip
							controller="offset-btn"
							:theme="args.theme"
							:modifiers="{ offset: { offset: '0,20' } }"
							:key="args.placement"
						>
							<template #title>Custom Offset</template>
							This tooltip is offset by 20px from its normal position.
						</kv-tooltip>
					</div>

					<!-- Multiple modifiers -->
					<div>
						<h4 class="tw-font-medium tw-mb-2">Multiple Modifiers (custom padding + offset)</h4>
						<kv-button id="multiple-btn" class="tw-bg-red-500 tw-text-white tw-px-4 tw-py-2 tw-rounded">
							Multiple Modifiers
						</kv-button>
						<kv-tooltip
							controller="multiple-btn"
							:theme="args.theme"
							:modifiers="{
								preventOverflow: { padding: 30 },
								offset: { offset: '10,15' }
							}"
							:key="args.placement"
						>
							<template #title>Multiple Modifiers</template>
							This tooltip uses both custom padding (30px) and custom offset (10px, 15px).
						</kv-tooltip>
					</div>
				</div>
			</div>
		</div>
	`,
});

export const ToggleShowcase = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvButton,
		KvTooltip,
	},
	data() {
		return {
			tooltipVisible: false,
		};
	},
	setup() { return { args }; },
	methods: {
		handleToolTipVisible(isVisible) {
			if (this.tooltipVisible && !isVisible) {
				this.tooltipVisible = isVisible;
			}
		},
		toggleTooltip() {
			this.tooltipVisible = !this.tooltipVisible;
		},
	},
	template: `
		<div class="tw-p-12 tw-space-y-8">
			<div>
				<h3 class="tw-text-lg tw-font-semibold tw-mb-4">Show/Hide Tooltip Programmatically</h3>
				<p class="tw-text-gray-600 tw-mb-6 tw-max-w-lg">
					Use the toggle button to show/hide the tooltip without hovering.
					The tooltip can still be triggered by hovering over the target button as well.
				</p>

				<div class="tw-space-y-4">
					<!-- Target button with tooltip -->
					<div>
						<kv-button id="target-btn" class="tw-mr-4">
							Tooltip Target (hover me too!)
						</kv-button>
					</div>

					<!-- Toggle button -->
					<div>
						<kv-button
							@click="toggleTooltip"
						>
							{{ tooltipVisible ? 'Hide Tooltip' : 'Show Tooltip' }}
						</kv-button>
					</div>

					<!-- Status indicator -->
					<div class="tw-text-small tw-text-gray-600">
						<strong>Tooltip Status:</strong> {{ tooltipVisible ? 'Visible' : 'Hidden' }}
					</div>
				</div>

				<!-- The tooltip -->
				<kv-tooltip
					controller="target-btn"
					:theme="args.theme"
					:placement="args.placement"
					:show-tooltip="tooltipVisible"
					:max-width="args.maxWidth"
					@tool-tip-visible="handleToolTipVisible"
					:key="args.placement"
				>
					<template #title>Programmatically Controlled Tooltip</template>
					This tooltip is controlled by the showTooltip prop (currently {{ tooltipVisible ? 'true' : 'false' }}).
					You can also hover over the target button to show it normally!
				</kv-tooltip>
			</div>
		</div>
	`,
});
