import mockLenderCountries from '#fixtures/mockLenderCountries';
import KvMap from '../KvMap.vue';

export default {
	title: 'Components/KvMap',
	component: KvMap,
	args: {
		autoZoomDelay: 1000,
		height: null,
		initialZoom: null,
		lat: 37.700091,
		long: -123.013243,
		mapId: 0,
		useLeaflet: false,
		width: null,
		zoomLevel: 4,
		advancedAnimation: {},
		showTooltips: true,
		optimizeInitialMapZoom: false,
	},
	parameters: {
		chromatic: {
			// Default threshold is 0.63 (0 is most strict, 1 is least strict)
			// Increase threshold to 0.75 to allow for more variation in the map
			diffThreshold: 0.75,
		},
	},
};

const Template = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMap },
	setup() { return { args: { ...templateArgs } }; },
	template: `<kv-map
		class="tw-rounded tw-overflow-hidden"
		v-bind="args"
	/>`,
});

export const Default = Template.bind({});
Default.args = {
	initialZoom: null,
	mapId: 1,
	zoomLevel: 14,
};

export const AutoZoom = Template.bind({});
AutoZoom.args = {
	initialZoom: 1,
	lat: -0.023559,
	long: 37.906193,
	mapId: 2,
	zoomLevel: 4,
};

export const FixedDimensions = Template.bind({});
FixedDimensions.args = {
	initialZoom: null,
	height: 250,
	mapId: 3,
	width: 250,
	zoomLevel: 14,
};

export const Leaflet = Template.bind({});
Leaflet.args = {
	initialZoom: null,
	lat: -0.023559,
	long: 37.906193,
	mapId: 4,
	useLeaflet: true,
	zoomLevel: 6,
};

export const AdvancedAnimation = Template.bind({});
const advancedAnimation = {
	borrowerPoints: [
		{
			image: 'https://www.kiva.org/img/w80h80fz50/e60a3d61ff052d60991c5d6bbf4a45d3.webp',
			location: [-77.032, 38.913],
		},
		{
			image: 'https://www.kiva.org/img/w80h80fz50/6101929097c6e5de48232a4d1ae3b71c.webp',
			location: [41.402, 7.160],
		},
		{
			image: 'https://www.kiva.org/img/w80h80fz50/11e018ee3d8b9c5adee459c16a29d264.webp',
			location: [-73.356596, 3.501],
		},
	],
};
AdvancedAnimation.args = {
	initialZoom: null,
	mapId: 5,
	useLeaflet: false,
	zoomLevel: 2,
	height: 600,
	width: 1000,
	lat: 21.096,
	long: -31.690,
	advancedAnimation,
};

export const LoansMap = Template.bind({});
LoansMap.args = {
	autoZoomDelay: 500,
	aspectRatio: 1.8,
	mapId: 6,
	lat: 30,
	long: 1,
	zoomLevel: 2,
	useLeaflet: true,
	showZoomControl: true,
	allowDragging: true,
	showLabels: false,
	countriesData: mockLenderCountries,
	showFundraisingLoans: true,
};

export const highlightedCountry = Template.bind({});
highlightedCountry.args = {
	autoZoomDelay: 500,
	aspectRatio: 1.8,
	mapId: 7,
	lat: 23,
	long: -102,
	zoomLevel: 5,
	useLeaflet: true,
	showZoomControl: true,
	allowDragging: true,
	showLabels: false,
	countriesData: [
		{
			label: 'Mexico',
			value: 100,
			lat: 23,
			long: -102,
			isoCode: 'MX',
			numLoansFundraising: 48,
		},
	],
	showFundraisingLoans: false,
	showTooltips: false,
	defaultBaseColor: '#BFE5D1',
};

// Subsets of mockLenderCountries for optimizeInitialMapZoom demos
const singleCountry = mockLenderCountries.filter((c) => c.isoCode === 'KE');
const eastAfricaCountries = mockLenderCountries.filter((c) => ['KE', 'TZ', 'EG'].includes(c.isoCode));
const globalSpreadCountries = mockLenderCountries.filter((c) => ['US', 'PE', 'PH', 'KE', 'MN'].includes(c.isoCode));

export const OptimizedZoomSingleCountry = Template.bind({});
OptimizedZoomSingleCountry.args = {
	height: 450,
	width: 600,
	lat: null,
	long: null,
	aspectRatio: 1.8,
	mapId: 8,
	useLeaflet: true,
	showZoomControl: true,
	allowDragging: true,
	showLabels: false,
	countriesData: singleCountry,
	optimizeInitialMapZoom: true,
};
OptimizedZoomSingleCountry.parameters = {
	docs: {
		description: {
			story: 'Single country (Kenya) - automatically centers on Kenya with zoom level 4.',
		},
	},
};

export const OptimizedZoomRegional = Template.bind({});
OptimizedZoomRegional.args = {
	height: 450,
	width: 600,
	lat: null,
	long: null,
	aspectRatio: 1.8,
	mapId: 9,
	useLeaflet: true,
	showZoomControl: true,
	allowDragging: true,
	showLabels: false,
	countriesData: eastAfricaCountries,
	optimizeInitialMapZoom: true,
};
OptimizedZoomRegional.parameters = {
	docs: {
		description: {
			story: 'Regional countries (Kenya, Tanzania, Egypt) - centers on East Africa with moderate zoom.',
		},
	},
};

export const OptimizedZoomGlobal = Template.bind({});
OptimizedZoomGlobal.args = {
	height: 450,
	width: 600,
	lat: null,
	long: null,
	aspectRatio: 1.8,
	mapId: 10,
	useLeaflet: true,
	showZoomControl: true,
	allowDragging: true,
	showLabels: false,
	countriesData: globalSpreadCountries,
	optimizeInitialMapZoom: true,
};
OptimizedZoomGlobal.parameters = {
	docs: {
		description: {
			story: 'Globally spread countries (US, Peru, Philippines, Kenya, Mongolia) - zooms out to show all.',
		},
	},
};

export const OptimizedZoomWithExplicitOverride = Template.bind({});
OptimizedZoomWithExplicitOverride.args = {
	height: 450,
	width: 600,
	aspectRatio: 1.8,
	lat: 0,
	long: 0,
	mapId: 11,
	useLeaflet: true,
	showZoomControl: true,
	allowDragging: true,
	showLabels: false,
	countriesData: eastAfricaCountries,
	optimizeInitialMapZoom: true,
};
OptimizedZoomWithExplicitOverride.parameters = {
	docs: {
		description: {
			story: 'Explicit lat/long (0, 0) overrides computed center, but zoom is still optimized from countriesData.',
		},
	},
};
