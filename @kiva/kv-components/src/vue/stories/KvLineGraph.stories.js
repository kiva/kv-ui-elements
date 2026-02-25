import KvLineGraph from '../KvLineGraph.vue';

export default {
	title: 'Charts/KvLineGraph',
	component: KvLineGraph,
};

const Template = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvLineGraph,
	},
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<div style="height: 500px; width: 500px;">
			<kv-line-graph v-bind="args" />
		</div>
	`,
});

const points = [
	{ value: 10 },
	{ value: 20 },
	{ value: 50 },
	{ value: 60 },
	{ value: 80 },
];

const pointsWithLabels = [
	{ value: 10, label: '2014' },
	{ value: 20, label: '2015' },
	{ value: 50, label: '2016' },
	{ value: 60, label: '2017' },
	{ value: 80, label: '2018' },
];

export const Default = Template.bind();
Default.args = { points };

export const AxisLabel = Template.bind();
AxisLabel.args = {
	points,
	axisLabel: 'People supported over time',
};

export const ValueLabels = Template.bind();
ValueLabels.args = { points: pointsWithLabels };

export const AllLabels = Template.bind();
AllLabels.args = {
	points: pointsWithLabels,
	axisLabel: 'People supported over time',
};
