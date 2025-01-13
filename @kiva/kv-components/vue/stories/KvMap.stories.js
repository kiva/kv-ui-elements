import KvMap from '#components/KvMap';
import mockLenderCountries from '../../tests/fixtures/mockLenderCountries';

export default {
	title: 'KvMap',
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
			image: 'https://www-kiva-org.freetls.fastly.net/img/w80h80fz50/e60a3d61ff052d60991c5d6bbf4a45d3.jpg',
			location: [-77.032, 38.913],
		},
		{
			image: 'https://www-kiva-org.freetls.fastly.net/img/w80h80fz50/6101929097c6e5de48232a4d1ae3b71c.jpg',
			location: [41.402, 7.160],
		},
		{
			image: 'https://www-kiva-org.freetls.fastly.net/img/w80h80fz50/11e018ee3d8b9c5adee459c16a29d264.jpg',
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
