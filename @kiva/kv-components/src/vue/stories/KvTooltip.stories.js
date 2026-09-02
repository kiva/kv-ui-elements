import KvButton from '../KvButton.vue';
import KvTextLink from '../KvTextLink.vue';
import KvTooltip from '../KvTooltip.vue';
import KvTooltipDocsMdx from './KvTooltipDocs.mdx';

const PLACEMENTS = ['top', 'bottom', 'left', 'right'];
const ACTIONS = ['none', 'large', 'small', 'link'];

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
		variant: 'light',
		placement: 'top',
		maxWidth: '250px',
	},
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'select' },
			description: 'Fixed neutral color. `dark` over light surfaces, `light` over dark surfaces.',
		},
		theme: {
			options: [
				undefined,
				'default',
				'ecoGreenLight',
				'ecoGreenDark',
				'ecoLightMarigold',
				'ecoStoneLight',
			],
			control: { type: 'select' },
			description: 'Deprecated. `ecoGreenDark` maps to `dark`, everything else maps to `light`.',
			table: { category: 'deprecated' },
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
			<kv-button id="my-cool-btn">Hover or Focus Me!</kv-button>
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

/**
 * Every content combination in the Figma component set — action x title, on both chips.
 * Hover or focus a trigger to see its tooltip. Placement is orthogonal and covered by
 * PlacementMatrix rather than crossed with this one.
 *
 * Hovering several tooltips with an action leaves them all open, and clicking one then
 * closes the rest. That is outside-click dismissal working: a click inside one tooltip
 * is outside every other one. Only this grid shows several at once.
 */
export const ContentMatrix = () => ({
	components: {
		KvButton,
		KvTextLink,
		KvTooltip,
	},
	data() {
		return {
			actions: ACTIONS,
			variants: ['dark', 'light'],
			titles: [true, false],
		};
	},
	methods: {
		buttonVariant(variant) {
			return variant === 'dark' ? 'secondary' : 'primary';
		},
		cellId(variant, action, hasTitle) {
			return `content-${variant}-${action}-${hasTitle ? 'title' : 'notitle'}`;
		},
		cellLabel(action, hasTitle) {
			const base = {
				none: 'Basic',
				large: 'Large button',
				small: 'Small button',
				link: 'Text link',
			}[action];
			return hasTitle ? `${base} + title` : base;
		},
	},
	template: `
		<div class="tw-p-8 tw-space-y-8">
			<p class="tw-text-small tw-text-gray-600 tw-bg-gray-100 tw-rounded-md tw-p-3">
				Tooltips with an action are persistent, so hovering several here leaves them all
				open at once. Clicking one then closes the others. That is the outside-click
				dismissal doing its job rather than a bug: a click inside one tooltip is a click
				outside every other one. Only this grid shows several at a time.
			</p>
			<div
				v-for="variant in variants"
				:key="variant"
				class="tw-p-8 tw-rounded-md"
				:class="variant === 'dark' ? 'tw-bg-white' : 'tw-bg-gray-800'"
			>
				<h3
					class="tw-text-h3 tw-font-medium tw-mb-6"
					:class="variant === 'dark' ? 'tw-text-gray-800' : 'tw-text-white'"
				>
					{{ variant === 'dark' ? 'Dark chip on a light surface' : 'Light chip on a dark surface' }}
				</h3>

				<div
					v-for="hasTitle in titles"
					:key="String(hasTitle)"
					class="tw-grid tw-grid-cols-4 tw-gap-x-6"
				>
					<div
						v-for="action in actions"
						:key="action"
						class="tw-flex tw-flex-col tw-justify-end tw-items-center"
						style="min-height: 280px;"
					>
						<kv-button
							:id="cellId(variant, action, hasTitle)"
							size="small"
							:variant="variant === 'dark' ? 'primary' : 'secondary'"
						>
							{{ cellLabel(action, hasTitle) }}
						</kv-button>
						<kv-tooltip
							:controller="cellId(variant, action, hasTitle)"
							:variant="variant"
							placement="top"
						>
							<template v-if="hasTitle" #title>Tooltip title</template>
							Tooltip body copy explains the control in one or two short sentences.
							<template v-if="action !== 'none'" #action>
								<kv-text-link v-if="action === 'link'" href="#">Learn more</kv-text-link>
								<kv-button
									v-else
									:variant="buttonVariant(variant)"
									:size="action === 'small' ? 'small' : 'default'"
								>
									Got it
								</kv-button>
							</template>
						</kv-tooltip>
					</div>
				</div>
			</div>
		</div>
	`,
});

/**
 * All four placements on both chips, with the arrow pointing back at the controller.
 * Hover or focus a trigger to see its tooltip.
 */
export const PlacementMatrix = () => ({
	components: {
		KvButton,
		KvTooltip,
	},
	data() {
		return {
			placements: PLACEMENTS,
			variants: ['dark', 'light'],
		};
	},
	template: `
		<div class="tw-p-8 tw-space-y-8">
			<div
				v-for="variant in variants"
				:key="variant"
				class="tw-p-8 tw-rounded-md"
				:class="variant === 'dark' ? 'tw-bg-white' : 'tw-bg-gray-800'"
			>
				<h3
					class="tw-text-h3 tw-font-medium tw-mb-6"
					:class="variant === 'dark' ? 'tw-text-gray-800' : 'tw-text-white'"
				>
					{{ variant === 'dark' ? 'Dark chip on a light surface' : 'Light chip on a dark surface' }}
				</h3>
				<!-- Two columns so left/right placements have room beside the trigger and
					popper does not flip them. -->
				<div class="tw-grid tw-grid-cols-2 tw-gap-x-12">
					<div
						v-for="placement in placements"
						:key="placement"
						class="tw-flex tw-items-center tw-justify-center"
						style="min-height: 260px;"
					>
						<kv-button
							:id="'placement-' + variant + '-' + placement"
							size="small"
							:variant="variant === 'dark' ? 'primary' : 'secondary'"
						>
							{{ placement }}
						</kv-button>
						<kv-tooltip
							:controller="'placement-' + variant + '-' + placement"
							:variant="variant"
							:placement="placement"
						>
							<template #title>Tooltip title</template>
							Tooltip body copy explains the control in one or two short sentences.
						</kv-tooltip>
					</div>
				</div>
			</div>
		</div>
	`,
});

/**
 * Filling the action slot makes a tooltip persistent: hover it, then move the pointer
 * in and act on the button. It will not close on mouseout the way the transient one
 * beside it does. `close` ends that viewing without retiring the tooltip, so hovering
 * the trigger again brings it back.
 */
export const Dismissal = () => ({
	components: {
		KvButton,
		KvTooltip,
	},
	data() {
		return { status: null, dismissCount: 0 };
	},
	methods: {
		onDismiss() {
			this.dismissCount += 1;
			this.status = `dismissed ${this.dismissCount}x — hover the trigger again, it comes back`;
		},
	},
	template: `
		<div class="tw-p-8">
			<div class="tw-grid tw-grid-cols-2 tw-gap-x-12" style="min-height: 320px;">
				<div class="tw-flex tw-flex-col tw-justify-end tw-items-center">
					<p class="tw-text-label tw-text-gray-600 tw-mb-4">Transient — closes on mouseout</p>
					<kv-button id="dismissal-transient" size="small">No action</kv-button>
					<kv-tooltip controller="dismissal-transient" variant="dark">
						<template #title>Tooltip title</template>
						Tooltip body copy explains the control in one or two short sentences.
					</kv-tooltip>
				</div>
				<div class="tw-flex tw-flex-col tw-justify-end tw-items-center">
					<p class="tw-text-label tw-text-gray-600 tw-mb-4">Persistent — the button is the dismissal</p>
					<kv-button id="dismissal-persistent" size="small">With action</kv-button>
					<kv-tooltip
						controller="dismissal-persistent"
						variant="dark"
						@dismiss="onDismiss"
					>
						<template #title>Annual goals</template>
						Set a goal to stay accountable and watch your impact grow.
						<template #action="{ close }">
							<kv-button variant="secondary" size="small" @click="close">Got it</kv-button>
						</template>
					</kv-tooltip>
				</div>
			</div>
			<p v-if="status" class="tw-text-small tw-text-gray-600 tw-mt-6">{{ status }}</p>
		</div>
	`,
});

/**
 * The two neutral chips shown on the surfaces they are meant for.
 */
export const Variants = () => ({
	components: {
		KvButton,
		KvTooltip,
	},
	template: `
		<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
			<div class="tw-bg-white tw-rounded-md tw-p-8" style="min-height: 260px;">
				<p class="tw-text-label tw-text-gray-600 tw-mb-4">Dark chip over a light surface</p>
				<kv-button id="variant-dark-btn">Hover or Focus</kv-button>
				<kv-tooltip controller="variant-dark-btn" variant="dark">
					<template #title>Tooltip title</template>
					Tooltip body copy explains the control in one or two short sentences.
				</kv-tooltip>
			</div>
			<div class="tw-bg-gray-800 tw-rounded-md tw-p-8" style="min-height: 260px;">
				<p class="tw-text-label tw-text-gray-300 tw-mb-4">Light chip over a dark surface</p>
				<kv-button id="variant-light-btn" variant="secondary">Hover or Focus</kv-button>
				<kv-tooltip controller="variant-light-btn" variant="light">
					<template #title>Tooltip title</template>
					Tooltip body copy explains the control in one or two short sentences.
				</kv-tooltip>
			</div>
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
				<h3 class="tw-text-h3 tw-font-medium tw-mb-2">Test Tooltip Placement</h3>
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
				<h3 class="tw-text-h3 tw-font-medium tw-mb-4">Tooltip Modifiers Examples</h3>
				<div class="tw-space-y-6">
					<!-- Custom padding modifier -->
					<div>
						<h4 class="tw-text-upper tw-font-medium tw-mb-2">Custom Padding (20px from edges)</h4>
						<kv-button id="padding-btn">
							Custom Padding
						</kv-button>
						<kv-tooltip
							controller="padding-btn"
							:variant="args.variant"
							:modifiers="{ preventOverflow: { padding: 20 } }"
							:key="args.placement"
						>
							<template #title>Custom Padding</template>
							This tooltip has 20px padding from viewport edges instead of the default 10px.
						</kv-tooltip>
					</div>

					<!-- Offset modifier -->
					<div>
						<h4 class="tw-text-upper tw-font-medium tw-mb-2">Custom Offset (shifted 20px)</h4>
						<kv-button id="offset-btn">
							Custom Offset
						</kv-button>
						<kv-tooltip
							controller="offset-btn"
							:variant="args.variant"
							:modifiers="{ offset: { offset: '0,20' } }"
							:key="args.placement"
						>
							<template #title>Custom Offset</template>
							This tooltip is offset by 20px from its normal position.
						</kv-tooltip>
					</div>

					<!-- Multiple modifiers -->
					<div>
						<h4 class="tw-text-upper tw-font-medium tw-mb-2">Multiple Modifiers (custom padding + offset)</h4>
						<kv-button id="multiple-btn">
							Multiple Modifiers
						</kv-button>
						<kv-tooltip
							controller="multiple-btn"
							:variant="args.variant"
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
				<h3 class="tw-text-h3 tw-font-medium tw-mb-4">Show/Hide Tooltip Programmatically</h3>
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
					:variant="args.variant"
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
