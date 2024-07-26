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

export const Default = story({ callouts: [{ label: 'callout 1' }, { label: 'callout 2' }, { label: 'callout 3' }] });
