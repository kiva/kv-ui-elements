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

export const MultiMatching = story({
	loan: {
		id: 1,
		plannedExpirationDate: nextWeek.toISOString(),
		loanAmount: 199,
		loanFundraisingInfo: { fundedAmount: 0, reservedAmount: 0 },
		simultaneousMatching: [
			{ managedAccountId: 1, ratio: 1, displayName: 'PG&E' },
			{ managedAccountId: 2, ratio: 1, displayName: 'US Bank' },
		],
	},
	enableMultiMatching: true,
});

// 3 organizations each with a match ratio of 1 => "4x match by 3 organizations"
// (1 base match + 1 + 1 + 1). The tooltip shows "2x matching by ..." per organization.
export const MultiMatching3Orgs = story({
	loan: {
		id: 1,
		plannedExpirationDate: nextWeek.toISOString(),
		loanAmount: 199,
		loanFundraisingInfo: { fundedAmount: 0, reservedAmount: 0 },
		simultaneousMatching: [
			{ managedAccountId: 1, ratio: 1, displayName: 'PG&E' },
			{ managedAccountId: 2, ratio: 1, displayName: 'US Bank' },
			{ managedAccountId: 3, ratio: 1, displayName: 'Bank Of America' },
		],
	},
	enableMultiMatching: true,
});

// Organizations with match ratios above 1 => "5x match by 2 organizations"
// (1 base match + 2 + 2). The tooltip shows "3x matching by ..." per organization.
export const MultiMatchingHigherRatio = story({
	loan: {
		id: 1,
		plannedExpirationDate: nextWeek.toISOString(),
		loanAmount: 199,
		loanFundraisingInfo: { fundedAmount: 0, reservedAmount: 0 },
		simultaneousMatching: [
			{ managedAccountId: 1, ratio: 2, displayName: 'PG&E' },
			{ managedAccountId: 2, ratio: 2, displayName: 'US Bank' },
		],
	},
	enableMultiMatching: true,
});

export const MultiMatching1Org = story({
	loan: {
		id: 1,
		plannedExpirationDate: nextWeek.toISOString(),
		loanAmount: 199,
		loanFundraisingInfo: { fundedAmount: 0, reservedAmount: 0 },
		simultaneousMatching: [
			{ managedAccountId: 1, ratio: 1, displayName: 'Bank Of America' },
		],
	},
	enableMultiMatching: true,
});

export const MultiMatchingAnonymous = story({
	loan: {
		id: 1,
		plannedExpirationDate: nextWeek.toISOString(),
		loanAmount: 199,
		loanFundraisingInfo: { fundedAmount: 0, reservedAmount: 0 },
		simultaneousMatching: [
			{ managedAccountId: 1, ratio: 1, displayName: null },
			{ managedAccountId: 2, ratio: 1, displayName: 'US Bank' },
		],
	},
	enableMultiMatching: true,
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
