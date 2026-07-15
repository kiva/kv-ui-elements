import { ref } from 'vue';
import KvStackedBarGraph from '../KvStackedBarGraph.vue';
import KvStackedBarGraphDocsMdx from './KvStackedBarGraphDocs.mdx';

export default {
	title: 'Charts/KvStackedBarGraph',
	component: KvStackedBarGraph,
	parameters: {
		docs: {
			page: KvStackedBarGraphDocsMdx,
			title: 'KvStackedBarGraph Docs',
		},
	},
};

const Template = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvStackedBarGraph },
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<div style="max-width: 680px;">
			<kv-stacked-bar-graph v-bind="args" />
		</div>
	`,
});

const InteractiveTemplate = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvStackedBarGraph },
	setup() {
		const clicked = ref('none');
		const onBarClick = (index) => { clicked.value = index; };
		return { args: { ...templateArgs }, clicked, onBarClick };
	},
	template: `
		<div style="max-width: 680px;">
			<kv-stacked-bar-graph v-bind="args" @bar-click="onBarClick" />
			<p class="tw-mt-2 tw-text-small">Last clicked bar index: {{ clicked }}</p>
		</div>
	`,
});

const twoSeries = [
	{ key: 'user', label: 'Repaid to your account', color: '#26985D' },
	{ key: 'promo', label: 'Repaid to Kiva or sponsor', color: '#996210' },
];

const paletteSeries = [
	{ key: 'a', label: 'Series A' },
	{ key: 'b', label: 'Series B' },
];

const threeSeries = [
	{ key: 'principal', label: 'Principal' },
	{ key: 'interest', label: 'Interest' },
	{ key: 'fees', label: 'Fees' },
];

const twoSeriesPoints = [
	{ label: 'Jul 2026', segments: [{ seriesKey: 'user', value: 300 }, { seriesKey: 'promo', value: 100 }] },
	{ label: 'Aug 2026', segments: [{ seriesKey: 'user', value: 220 }, { seriesKey: 'promo', value: 60 }] },
	{ label: 'Sep 2026', segments: [{ seriesKey: 'user', value: 180 }, { seriesKey: 'promo', value: 40 }] },
];

const palettePoints = [
	{ label: 'Q1', segments: [{ seriesKey: 'a', value: 40 }, { seriesKey: 'b', value: 25 }] },
	{ label: 'Q2', segments: [{ seriesKey: 'a', value: 55 }, { seriesKey: 'b', value: 30 }] },
];

const singleSeriesPoints = [
	{ label: '2023', segments: [{ seriesKey: 'user', value: 120 }] },
	{ label: '2024', segments: [{ seriesKey: 'user', value: 180 }] },
	{ label: '2025', segments: [{ seriesKey: 'user', value: 90 }] },
];

const threeSeriesPoints = [
	{ label: 'Jan', segments: [{ seriesKey: 'principal', value: 200 }, { seriesKey: 'interest', value: 60 }, { seriesKey: 'fees', value: 20 }] },
	{ label: 'Feb', segments: [{ seriesKey: 'principal', value: 180 }, { seriesKey: 'interest', value: 55 }, { seriesKey: 'fees', value: 18 }] },
];

const manyBarsPoints = Array.from({ length: 12 }, (_, i) => ({
	label: `M${i + 1}`,
	segments: [
		{ seriesKey: 'user', value: 100 + (i * 15) },
		{ seriesKey: 'promo', value: 40 + ((i % 4) * 10) },
	],
}));

const usd = (value) => `$${Number(value).toLocaleString()}`;

export const Default = Template.bind();
Default.args = { points: twoSeriesPoints, series: twoSeries };

export const WithExplicitColors = Template.bind();
WithExplicitColors.args = {
	points: twoSeriesPoints,
	series: twoSeries,
	title: 'Estimated repayments by month',
	axisLabel: 'Estimated repayments by month',
};

export const CurrencyFormatted = Template.bind();
CurrencyFormatted.args = {
	points: twoSeriesPoints,
	series: twoSeries,
	formatValue: usd,
	axisLabel: 'Estimated repayments by month',
};

export const SingleSeries = Template.bind();
SingleSeries.args = {
	points: singleSeriesPoints,
	series: [{ key: 'user', label: 'People supported' }],
};

export const ThreeSeries = Template.bind();
ThreeSeries.args = { points: threeSeriesPoints, series: threeSeries };

export const PaletteColors = Template.bind();
PaletteColors.args = { points: palettePoints, series: paletteSeries };

export const ManyBars = Template.bind();
ManyBars.args = { points: manyBarsPoints, series: twoSeries, formatValue: usd };

export const Empty = Template.bind();
Empty.args = { points: [], series: twoSeries };

export const Interactive = InteractiveTemplate.bind();
Interactive.args = {
	points: twoSeriesPoints,
	series: twoSeries,
	formatValue: usd,
	barActionLabel: 'Select to view repayments for this month.',
};
