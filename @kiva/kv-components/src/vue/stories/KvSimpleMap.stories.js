import KvSimpleMap from '../KvSimpleMap.vue';
import KvSimpleMapDocsMdx from './KvSimpleMapDocs.mdx';

const KIVA_MARKETS = [
	{ id: 'KE', name: 'Kenya', loanCount: 54 },
	{ id: 'PE', name: 'Peru', loanCount: 12 },
	{ id: 'KH', name: 'Cambodia', loanCount: 1 },
	{ id: 'SN', name: 'Senegal', loanCount: 7 },
	{ id: 'TZ', name: 'Tanzania', loanCount: 4 },
];

// A broader sample that exercises every loan-count tier. Used by
// ComponentOverview / AllVariations to illustrate the eco-green ramp.
const TIERED_MARKETS = [
	{ id: 'KE', name: 'Kenya', loanCount: 54 }, // tier 4 (15+)
	{ id: 'PE', name: 'Peru', loanCount: 12 }, // tier 3 (9–14)
	{ id: 'KH', name: 'Cambodia', loanCount: 6 }, // tier 2 (4–8)
	{ id: 'SN', name: 'Senegal', loanCount: 2 }, // tier 1 (1–3)
	{ id: 'TZ', name: 'Tanzania', loanCount: 1 }, // tier 1, singular "loan"
	{ id: 'CO', name: 'Colombia', loanCount: 9 }, // tier 3
	{ id: 'PH', name: 'Philippines', loanCount: 18 }, // tier 4
	{ id: 'UG', name: 'Uganda', loanCount: 4 }, // tier 2
];

export default {
	title: 'Components/KvSimpleMap',
	component: KvSimpleMap,
	args: {
		countries: KIVA_MARKETS,
		autoplay: false,
		loop: true,
		allowDragging: true,
		showZoomControls: true,
		zoomFactor: 2.0,
		popupPlacement: 'top',
		popupOffset: 0,
	},
	argTypes: {
		countries: {
			control: 'object',
			description: 'Countries to make interactive and (when autoplay is on) tour through.',
		},
		autoplay: {
			control: 'boolean',
			description: 'Run a scripted tour through `countries`.',
		},
		loop: {
			control: 'boolean',
			description: 'Repeat the tour indefinitely (only applies when `autoplay` is true).',
		},
		allowDragging: {
			control: 'boolean',
			description: 'Allow click-and-drag to pan.',
		},
		showZoomControls: {
			control: 'boolean',
			description: 'Show the + / − zoom buttons.',
		},
		zoomFactor: {
			control: {
				type: 'range', min: 1, max: 4, step: 0.1,
			},
			description: 'Multiplier applied to the base scale when focusing on a country during the tour.',
		},
		minZoom: { control: 'number' },
		maxZoom: { control: 'number' },
		zoomStep: { control: 'number' },
		aspectRatio: { control: 'number' },
		width: { control: 'number' },
		height: { control: 'number' },
		highlightColor: { control: 'color' },
		baseColor: { control: 'color' },
		oceanColor: { control: 'color' },
		loanCountTiers: {
			control: 'object',
			description: 'Four ascending lower-bounds bucketing countries into eco-green tiers 1–4.',
		},
		popupPlacement: {
			control: 'select',
			options: ['top', 'bottom-right'],
			description: 'Where to place the hover/tour popup relative to the country.',
		},
		popupOffset: {
			control: 'number',
			description: 'Pixel gap between popup and country edge. Negatives let the popup overlap the country.',
		},
		// Tour timing knobs — grouped under a Storybook table category.
		initialDelay: { control: 'number', table: { category: 'Tour timing' } },
		panDuration: { control: 'number', table: { category: 'Tour timing' } },
		holdPerStep: { control: 'number', table: { category: 'Tour timing' } },
		popupHideBefore: { control: 'number', table: { category: 'Tour timing' } },
		holdAll: { control: 'number', table: { category: 'Tour timing' } },
		fadeDuration: { control: 'number', table: { category: 'Tour timing' } },
	},
	parameters: {
		docs: {
			page: KvSimpleMapDocsMdx,
			title: 'KvSimpleMap Docs',
		},
		chromatic: {
			// Animations + dynamic transforms — relax visual diff threshold like KvMap does.
			diffThreshold: 0.75,
		},
	},
};

const Template = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvSimpleMap },
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<kv-simple-map
			class="tw-rounded tw-overflow-hidden"
			v-bind="args"
		/>
	`,
});

// Default is the interactive playground for the Controls panel — written in
// CSF3 so the `args` proxy stays reactive when control values change.
// (The CSF2 Template.bind() pattern above snapshots args at first mount,
// which is fine for the fixed-scenario stories but breaks live controls.)
export const Default = {
	args: {},
	render: (args) => ({
		components: { KvSimpleMap },
		setup() { return { args }; },
		template: `
			<kv-simple-map
				class="tw-rounded tw-overflow-hidden"
				v-bind="args"
			/>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: 'Static interactive map. Hover a Kiva-market country to see its popup; click and drag to pan; use the + / − buttons to zoom.',
			},
		},
	},
};

export const Autoplay = Template.bind({});
Autoplay.args = {
	autoplay: true,
};
Autoplay.parameters = {
	docs: {
		description: {
			story: 'Scripted tour cycling through the supplied countries. Drag and zoom controls are suspended while the tour runs.',
		},
	},
};

export const AutoplayNoLoop = Template.bind({});
AutoplayNoLoop.args = {
	autoplay: true,
	loop: false,
};
AutoplayNoLoop.parameters = {
	docs: {
		description: {
			story: 'Tour runs once and stops on the overview view; manual controls do not re-enable (autoplay still owns the camera).',
		},
	},
};

export const NarrowContainer = Template.bind({});
NarrowContainer.args = {
	width: 393,
	height: 460,
	zoomFactor: 2.4,
	autoplay: true,
};
NarrowContainer.parameters = {
	docs: {
		description: {
			story: 'Mobile-style narrow container. The world is centred vertically; tour uses a higher zoomFactor for impact.',
		},
	},
};

export const FixedDimensions = Template.bind({});
FixedDimensions.args = {
	width: 600,
	height: 300,
};
FixedDimensions.parameters = {
	docs: {
		description: {
			story: 'Explicit width and height override the responsive container.',
		},
	},
};

export const NoInteractivity = Template.bind({});
NoInteractivity.args = {
	allowDragging: false,
	showZoomControls: false,
};
NoInteractivity.parameters = {
	docs: {
		description: {
			story: 'Static display — no drag, no zoom buttons. Hover popups still work.',
		},
	},
};

export const NameOnly = Template.bind({});
NameOnly.args = {
	countries: KIVA_MARKETS.map(({ id, name }) => ({ id, name })),
};
NameOnly.parameters = {
	docs: {
		description: {
			story: 'Countries with only a name field — popup omits the loan-count line.',
		},
	},
};

export const PopupBottomRight = Template.bind({});
PopupBottomRight.args = {
	popupPlacement: 'bottom-right',
	popupOffset: 0,
};
PopupBottomRight.parameters = {
	docs: {
		description: {
			story: 'Alternate popup placement: top-left of the popup hugs the country\'s bottom-right bbox corner instead of floating centred above.',
		},
	},
};

export const CustomPopupSlot = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvSimpleMap },
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<kv-simple-map
			class="tw-rounded tw-overflow-hidden"
			v-bind="args"
		>
			<template #popup="{ country }">
				<div style="background: #2AA967; color: white; padding: 8px 14px; border-radius: 999px; font-weight: 600; box-shadow: 0 2px 12px rgba(0,0,0,0.2); white-space: nowrap;">
					{{ country.name }} · {{ country.loanCount }}
				</div>
			</template>
		</kv-simple-map>
	`,
});
CustomPopupSlot.args = {
	autoplay: true,
};
CustomPopupSlot.parameters = {
	docs: {
		description: {
			story: 'Slot override replaces the default popup card entirely.',
		},
	},
};

// ── Documentation stories (CSF3) ──────────────────────────────────────────────
// Required by docs/component-stories-checklist.md alongside the existing
// behavior stories above.

export const ComponentOverview = {
	render: () => ({
		components: { KvSimpleMap },
		setup() {
			return { TIERED_MARKETS };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8 tw-space-y-6">
				<div>
					<p class="tw-text-small tw-mb-3">
						Static interactive map. Hover any country to see its name; Kiva-market
						countries colour-code by loan-count tier and show their counts in the popup.
					</p>
					<kv-simple-map :countries="TIERED_MARKETS" class="tw-rounded tw-overflow-hidden" />
				</div>
				<div>
					<p class="tw-text-small tw-mb-3">
						Autoplay tour — pans and zooms through the supplied countries.
					</p>
					<kv-simple-map :countries="TIERED_MARKETS" :autoplay="true" class="tw-rounded tw-overflow-hidden" />
				</div>
			</div>
		`,
	}),
};
ComponentOverview.parameters = {
	docs: {
		description: {
			story: 'Two top-level uses of the component: static interactive map and autoplay tour.',
		},
	},
};

export const AllVariations = {
	render: () => ({
		components: { KvSimpleMap },
		setup() {
			return { TIERED_MARKETS };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8">
					<div>
						<h4 class="tw-text-h4 tw-mb-2">Loan-count tiers</h4>
						<p class="tw-text-small tw-mb-3">
							Countries fill by loan count: tier 1 (1–3), tier 2 (4–8), tier 3 (9–14), tier 4 (15+).
							Hover lifts loan-bearing countries to eco-green; loan-less countries hover gray-300.
						</p>
						<kv-simple-map :countries="TIERED_MARKETS" class="tw-rounded tw-overflow-hidden" />
					</div>
					<div>
						<h4 class="tw-text-h4 tw-mb-2">Popup placement: top (default)</h4>
						<p class="tw-text-small tw-mb-3">
							Popup sits centred above the country and auto-flips below if it would clip the top edge.
						</p>
						<kv-simple-map :countries="TIERED_MARKETS" popup-placement="top" class="tw-rounded tw-overflow-hidden" />
					</div>
					<div>
						<h4 class="tw-text-h4 tw-mb-2">Popup placement: bottom-right</h4>
						<p class="tw-text-small tw-mb-3">
							Top-left of the popup hugs the country's bottom-right bbox corner.
						</p>
						<kv-simple-map
							:countries="TIERED_MARKETS"
							popup-placement="bottom-right"
							:popup-offset="0"
							class="tw-rounded tw-overflow-hidden"
						/>
					</div>
					<div>
						<h4 class="tw-text-h4 tw-mb-2">Autoplay (looping)</h4>
						<p class="tw-text-small tw-mb-3">
							Scripted tour cycles indefinitely. Click or drag the map to exit; resume with the play button.
						</p>
						<kv-simple-map :countries="TIERED_MARKETS" :autoplay="true" class="tw-rounded tw-overflow-hidden" />
					</div>
					<div>
						<h4 class="tw-text-h4 tw-mb-2">Autoplay (one-shot)</h4>
						<p class="tw-text-small tw-mb-3">
							Tour runs once and stops on the overview. Manual pan/zoom and the play button become available.
						</p>
						<kv-simple-map
							:countries="TIERED_MARKETS"
							:autoplay="true"
							:loop="false"
							class="tw-rounded tw-overflow-hidden"
						/>
					</div>
					<div>
						<h4 class="tw-text-h4 tw-mb-2">Narrow / mobile container</h4>
						<p class="tw-text-small tw-mb-3">
							Responsive container with a higher zoomFactor for small viewports.
						</p>
						<kv-simple-map
							:countries="TIERED_MARKETS"
							:width="393"
							:height="460"
							:zoom-factor="2.4"
							:autoplay="true"
							class="tw-rounded tw-overflow-hidden"
						/>
					</div>
					<div>
						<h4 class="tw-text-h4 tw-mb-2">Static / non-interactive</h4>
						<p class="tw-text-small tw-mb-3">
							Drag and zoom controls disabled. Hover popups still work.
						</p>
						<kv-simple-map
							:countries="TIERED_MARKETS"
							:allow-dragging="false"
							:show-zoom-controls="false"
							class="tw-rounded tw-overflow-hidden"
						/>
					</div>
					<div>
						<h4 class="tw-text-h4 tw-mb-2">Name-only countries</h4>
						<p class="tw-text-small tw-mb-3">
							Country entries without a loanCount fall back to gray base fill; popup shows the name only.
						</p>
						<kv-simple-map
							:countries="TIERED_MARKETS.map(({ id, name }) => ({ id, name }))"
							class="tw-rounded tw-overflow-hidden"
						/>
					</div>
				</div>
			</div>
		`,
	}),
};
AllVariations.parameters = {
	docs: {
		description: {
			story: 'Comprehensive showcase of placement, autoplay, sizing, interactivity, and tier-color variants.',
		},
	},
};
