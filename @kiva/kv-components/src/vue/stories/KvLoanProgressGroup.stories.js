import KvLoanProgressGroup from '../KvLoanProgressGroup.vue';

export default {
	title: 'Loan Display/KvLoanProgressGroup',
	component: KvLoanProgressGroup,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanProgressGroup },
		setup() { return { args: { ...templateArgs } }; },
		template: `
			<div style="width: 200px">
				<kv-loan-progress-group
					v-bind="args"
				/>
			</div>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story();

export const LowAmount = story({ moneyLeft: '5', progressPercent: 0.9 });

export const HighAmount = story({ moneyLeft: '150', progressPercent: 0.5 });
