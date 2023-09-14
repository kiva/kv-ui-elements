import KvLineGraph from '../KvLineGraph.vue';

export default {
	title: 'KvLineGraph',
	component: KvLineGraph,
};

const Template = (_args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvLineGraph,
	},
	template: `
		<div style="height: 500px; width: 500px;">
			<kv-line-graph :points="points" />
		</div>
	`,
});

export const Default = Template.bind();
Default.args = {
	points: [
		{ value: 10 },
		{ value: 20 },
		{ value: 50 },
		{ value: 60 },
		{ value: 80 },
	],
};
