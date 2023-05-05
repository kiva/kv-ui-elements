import KvLoanTag from '../KvLoanTag.vue';

export default {
	title: 'KvLoanTag',
	component: KvLoanTag,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanTag },
		template: `
			<kv-loan-tag
				:loan="loan"
				:kv-track-function="kvTrackFunction"
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

const kvTrackFunction = () => {};

export const EndingSoon = story({ loan: { plannedExpirationDate: tomorrow.toISOString() }, kvTrackFunction });

export const AlmostFunded = story({
	loan: {
		loanAmount: 199,
		plannedExpirationDate: nextWeek.toISOString(),
		loanFundraisingInfo: { fundedAmount: 50, reservedAmount: 50 },
	},
	kvTrackFunction,
});

export const Matched = story({
	loan: {
		matchingText: 'Ebay',
		matchRatio: 1,
		plannedExpirationDate: nextWeek.toISOString(),
		loanAmount: 199,
		loanFundraisingInfo: { fundedAmount: 0, reservedAmount: 0 },
	},
	kvTrackFunction,
});
