import KvLoanTag from '../KvLoanTag.vue';
import KvCountdownTimer from '../KvCountdownTimer.vue';

export default {
	title: 'Loan Display/KvLoanTag',
	component: KvLoanTag,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: {
			KvLoanTag,
			KvCountdownTimer,
		},
		setup() { return { args: { ...templateArgs } }; },
		template: `
			<kv-loan-tag
				v-bind="args"
			/>
		`,
	});
	template.args = args;
	return template;
};

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const nextWeek = new Date();
nextWeek.setDate(new Date().getDate() + 7);

export const EndingSoon = story({ loan: { plannedExpirationDate: tomorrow.toISOString() } });

export const AlmostFunded = story({
	loan: {
		loanAmount: 199,
		plannedExpirationDate: nextWeek.toISOString(),
		loanFundraisingInfo: { fundedAmount: 50, reservedAmount: 50 },
	},
});

export const Matched = story({
	loan: {
		matchingText: 'Ebay',
		matchRatio: 1,
		plannedExpirationDate: nextWeek.toISOString(),
		loanAmount: 199,
		loanFundraisingInfo: { fundedAmount: 0, reservedAmount: 0 },
	},
});

export const LseLoan = story({
	loan: {
		matchingText: 'Ebay',
		matchRatio: 1,
		plannedExpirationDate: nextWeek.toISOString(),
		loanAmount: 199,
		loanFundraisingInfo: { fundedAmount: 0, reservedAmount: 0 },
		partnerName: 'N/A, direct to Novulis',
	},
});
