import KvButton from '../KvButton.vue';
import KvTooltip from '../KvTooltip.vue';
import KvTooltipDocsMdx from './KvTooltipDocs.mdx';

export default {
	title: 'Interface Elements/KvTooltip',
	component: KvTooltip,
	parameters: {
		docs: {
			page: KvTooltipDocsMdx,
			title: 'KvTooltip Documentation',
		},
	},
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

// ComponentOverview - Simple examples showing key use cases
export const ComponentOverview = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvButton,
		KvTooltip,
	},
	setup() { return { args }; },
	template: `
		<div class="tw-bg-gray-50 tw-rounded-md tw-p-8 tw-space-y-8">
			<div class="tw-space-y-3">
				<p class="tw-text-small tw-text-gray-600 tw-font-medium">Basic Tooltip</p>
				<div>
					<kv-button id="basic-tooltip-btn">Hover or Focus</kv-button>
					<kv-tooltip controller="basic-tooltip-btn" theme="ecoStoneDark">
						This is a simple tooltip with just content
					</kv-tooltip>
				</div>
			</div>

			<div class="tw-space-y-3">
				<p class="tw-text-small tw-text-gray-600 tw-font-medium">Tooltip with Title</p>
				<div>
					<kv-button id="title-tooltip-btn">What is this?</kv-button>
					<kv-tooltip controller="title-tooltip-btn" theme="ecoStoneDark">
						<template #title>Tooltip Title</template>
						This tooltip includes both a title and descriptive content
					</kv-tooltip>
				</div>
			</div>

			<div class="tw-space-y-3">
				<p class="tw-text-small tw-text-gray-600 tw-font-medium">Different Placement</p>
				<div>
					<kv-button id="placement-tooltip-btn">Bottom Tooltip</kv-button>
					<kv-tooltip controller="placement-tooltip-btn" theme="ecoStoneDark" placement="bottom">
						<template #title>Bottom Placement</template>
						This tooltip appears below the button
					</kv-tooltip>
				</div>
			</div>

			<div class="tw-space-y-3">
				<p class="tw-text-small tw-text-gray-600 tw-font-medium">Custom Width</p>
				<div>
					<kv-button id="width-tooltip-btn">Wide Tooltip</kv-button>
					<kv-tooltip controller="width-tooltip-btn" theme="ecoStoneDark" max-width="400px">
						<template #title>Extended Tooltip Content</template>
						This tooltip has a custom max-width of 400px, allowing for more detailed
						explanations without wrapping too tightly. Perfect for longer descriptions.
					</kv-tooltip>
				</div>
			</div>
		</div>
	`,
});

// AllVariations - Comprehensive showcase of all tooltip variations
export const AllVariations = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvButton,
		KvTooltip,
	},
	setup() { return { args }; },
	template: `
		<div class="tw-bg-gray-50 tw-rounded-md tw-p-8 tw-space-y-12">
			<!-- Placement Variations -->
			<div>
				<h3 class="tw-text-h3 tw-font-medium tw-mb-6">Placement Variations</h3>
				<div class="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-6">
					<div class="tw-text-center">
						<p class="tw-text-small tw-mb-2">Top</p>
						<kv-button id="var-top" class="tw-w-full">Hover</kv-button>
						<kv-tooltip controller="var-top" placement="top" theme="ecoStoneDark">
							Top placement
						</kv-tooltip>
					</div>
					<div class="tw-text-center">
						<p class="tw-text-small tw-mb-2">Bottom</p>
						<kv-button id="var-bottom" class="tw-w-full">Hover</kv-button>
						<kv-tooltip controller="var-bottom" placement="bottom" theme="ecoStoneDark">
							Bottom placement
						</kv-tooltip>
					</div>
					<div class="tw-text-center">
						<p class="tw-text-small tw-mb-2">Left</p>
						<kv-button id="var-left" class="tw-w-full">Hover</kv-button>
						<kv-tooltip controller="var-left" placement="left" theme="ecoStoneDark">
							Left placement
						</kv-tooltip>
					</div>
					<div class="tw-text-center">
						<p class="tw-text-small tw-mb-2">Right</p>
						<kv-button id="var-right" class="tw-w-full">Hover</kv-button>
						<kv-tooltip controller="var-right" placement="right" theme="ecoStoneDark">
							Right placement
						</kv-tooltip>
					</div>
				</div>
			</div>

			<!-- Theme Variations -->
			<div>
				<h3 class="tw-text-h3 tw-font-medium tw-mb-6">Theme Variations</h3>
				<div class="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-6">
					<div class="tw-text-center">
						<p class="tw-text-small tw-mb-2">Default</p>
						<kv-button id="theme-default" class="tw-w-full">Hover</kv-button>
						<kv-tooltip controller="theme-default" theme="default">
							Default theme
						</kv-tooltip>
					</div>
					<div class="tw-text-center">
						<p class="tw-text-small tw-mb-2">Eco Stone Dark</p>
						<kv-button id="theme-stone-dark" class="tw-w-full">Hover</kv-button>
						<kv-tooltip controller="theme-stone-dark" theme="ecoStoneDark">
							Stone Dark
						</kv-tooltip>
					</div>
					<div class="tw-text-center">
						<p class="tw-text-small tw-mb-2">Eco Green Light</p>
						<kv-button id="theme-green-light" class="tw-w-full">Hover</kv-button>
						<kv-tooltip controller="theme-green-light" theme="ecoGreenLight">
							Green Light
						</kv-tooltip>
					</div>
					<div class="tw-text-center">
						<p class="tw-text-small tw-mb-2">Mint</p>
						<kv-button id="theme-mint" class="tw-w-full">Hover</kv-button>
						<kv-tooltip controller="theme-mint" theme="mint">
							Mint theme
						</kv-tooltip>
					</div>
				</div>
			</div>

			<!-- Content Variations -->
			<div>
				<h3 class="tw-text-h3 tw-font-medium tw-mb-6">Content Variations</h3>
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
					<div class="tw-text-center">
						<p class="tw-text-small tw-mb-2">Content Only</p>
						<kv-button id="content-only" class="tw-w-full">Hover</kv-button>
						<kv-tooltip controller="content-only" theme="ecoStoneDark">
							Simple tooltip content
						</kv-tooltip>
					</div>
					<div class="tw-text-center">
						<p class="tw-text-small tw-mb-2">With Title</p>
						<kv-button id="with-title" class="tw-w-full">Hover</kv-button>
						<kv-tooltip controller="with-title" theme="ecoStoneDark">
							<template #title>Title Here</template>
							Description content
						</kv-tooltip>
					</div>
					<div class="tw-text-center">
						<p class="tw-text-small tw-mb-2">Long Content</p>
						<kv-button id="long-content" class="tw-w-full">Hover</kv-button>
						<kv-tooltip controller="long-content" theme="ecoStoneDark" max-width="300px">
							<template #title>Extended Information</template>
							This is a longer tooltip that demonstrates how content wraps
							when it exceeds the maximum width constraint.
						</kv-tooltip>
					</div>
				</div>
			</div>
		</div>
	`,
});

// ThemeShowcase - All available themes in one view
export const ThemeShowcase = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvButton,
		KvTooltip,
	},
	setup() { return { args }; },
	template: `
		<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
			<h3 class="tw-text-h3 tw-font-medium tw-mb-6">All Available Themes</h3>
			<div class="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-8">
				<div class="tw-text-center">
					<p class="tw-text-small tw-mb-3 tw-font-medium">default</p>
					<kv-button id="showcase-default" class="tw-w-full">Hover Me</kv-button>
					<kv-tooltip controller="showcase-default" theme="default">
						<template #title>Default Theme</template>
						Standard Kiva branding
					</kv-tooltip>
				</div>

				<div class="tw-text-center">
					<p class="tw-text-small tw-mb-3 tw-font-medium">ecoGreenLight</p>
					<kv-button id="showcase-green-light" class="tw-w-full">Hover Me</kv-button>
					<kv-tooltip controller="showcase-green-light" theme="ecoGreenLight">
						<template #title>Eco Green Light</template>
						Light green theme
					</kv-tooltip>
				</div>

				<div class="tw-text-center">
					<p class="tw-text-small tw-mb-3 tw-font-medium">ecoGreenDark</p>
					<kv-button id="showcase-green-dark" class="tw-w-full">Hover Me</kv-button>
					<kv-tooltip controller="showcase-green-dark" theme="ecoGreenDark">
						<template #title>Eco Green Dark</template>
						Dark green theme
					</kv-tooltip>
				</div>

				<div class="tw-text-center">
					<p class="tw-text-small tw-mb-3 tw-font-medium">ecoLightMarigold</p>
					<kv-button id="showcase-marigold" class="tw-w-full">Hover Me</kv-button>
					<kv-tooltip controller="showcase-marigold" theme="ecoLightMarigold">
						<template #title>Eco Marigold</template>
						Warm marigold theme
					</kv-tooltip>
				</div>

				<div class="tw-text-center">
					<p class="tw-text-small tw-mb-3 tw-font-medium">ecoStoneLight</p>
					<kv-button id="showcase-stone-light" class="tw-w-full">Hover Me</kv-button>
					<kv-tooltip controller="showcase-stone-light" theme="ecoStoneLight">
						<template #title>Eco Stone Light</template>
						Light stone theme
					</kv-tooltip>
				</div>

				<div class="tw-text-center">
					<p class="tw-text-small tw-mb-3 tw-font-medium">ecoStoneDark</p>
					<kv-button id="showcase-stone-dark" class="tw-w-full">Hover Me</kv-button>
					<kv-tooltip controller="showcase-stone-dark" theme="ecoStoneDark">
						<template #title>Eco Stone Dark</template>
						Dark stone theme (default)
					</kv-tooltip>
				</div>

				<div class="tw-text-center">
					<p class="tw-text-small tw-mb-3 tw-font-medium">mint</p>
					<kv-button id="showcase-mint" class="tw-w-full">Hover Me</kv-button>
					<kv-tooltip controller="showcase-mint" theme="mint">
						<template #title>Mint Theme</template>
						Fresh mint theme
					</kv-tooltip>
				</div>

				<div class="tw-text-center">
					<p class="tw-text-small tw-mb-3 tw-font-medium">dark</p>
					<kv-button id="showcase-dark" class="tw-w-full">Hover Me</kv-button>
					<kv-tooltip controller="showcase-dark" theme="dark">
						<template #title>Dark Theme</template>
						High contrast dark theme
					</kv-tooltip>
				</div>
			</div>
		</div>
	`,
});

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
