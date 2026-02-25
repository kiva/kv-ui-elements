import KvLoanCallouts from '../KvLoanCallouts.vue';

export default {
	title: 'Loan Display/KvLoanCallouts',
	component: KvLoanCallouts,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanCallouts },
		setup() { return { args: { ...templateArgs } }; },
		template: `
			<kv-loan-callouts
				v-bind="args"
			/>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({ callouts: [{ label: 'callout 1' }, { label: 'callout 2' }, { label: 'callout 3' }] });
