import KvLoanCallouts from '../KvLoanCallouts.vue';

export default {
	title: 'KvLoanCallouts',
	component: KvLoanCallouts,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanCallouts },
		template: `
			<kv-loan-callouts
				:callouts="callouts"
			/>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({ callouts: ['callout 1', 'callout 2', 'callout 3'] });
