import KvLoanProgressGroup from '../KvLoanProgressGroup.vue';

export default {
	title: 'KvLoanProgressGroup',
	component: KvLoanProgressGroup,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanProgressGroup },
		template: `
			<div style="width: 200px">
				<kv-loan-progress-group
					:money-left="moneyLeft"
					:progress-percent="progressPercent"
				/>
			</div>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story();

export const LowAmount = story({ moneyLeft: 5, progressPercent: 0.9 });

export const HighAmount = story({ moneyLeft: 150, progressPercent: 0.5 });
