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
		{ x: 0, y: 80 },
		{ x: 25, y: 65 },
		{ x: 50, y: 45 },
		{ x: 75, y: 30 },
		{ x: 100, y: 20 },
	],
};
