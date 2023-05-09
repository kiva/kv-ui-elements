import KvLendAmountButton from '../KvLendAmountButton.vue';

export default {
	title: 'KvLendAmountButton',
	component: KvLendAmountButton,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLendAmountButton },
		template: `
			<kv-lend-amount-button
				:loan-id="loanId"
				:show-now="showNow"
				:amount-left="amountLeft"
				:complete-loan="completeLoan"
			/>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story();

export const ShowNow = story({ showNow: true });

export const AmountLeft = story({ amountLeft: 5 });

export const CompleteLoan = story({ completeLoan: true });
