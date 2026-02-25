import KvLoanUse from '../KvLoanUse.vue';

export default {
	title: 'Loan Display/KvLoanUse',
	component: KvLoanUse,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanUse },
		setup() { return { args: { ...templateArgs } }; },
		template: `
			<kv-loan-use
				v-bind="args"
			/>
		`,
	});
	template.args = args;
	return template;
};

export const Anonymous = story({ anonymizationLevel: 'full' });

export const Partner = story({
	use: 'buy supplies.',
	loanAmount: '1000.00',
	status: 'fundraising',
	name: 'Bob Smith',
	distributionModel: 'partner',
});

export const Direct = story({
	use: 'buy supplies.',
	loanAmount: '1000.00',
	status: 'fundraising',
	name: 'Bob Smith',
});

export const Group = story({
	use: 'buy supplies.',
	loanAmount: '1000.00',
	status: 'fundraising',
	name: 'Farm Organization',
	borrowerCount: 2,
});

export const WhySpecial = story({
	use: 'buy supplies.',
	loanAmount: '1000.00',
	status: 'fundraising',
	name: 'Bob Smith',
	whySpecial: 'It supports organic farming and includes a lower interest rate.',
});

export const BoldName = story({
	use: 'buy supplies.',
	loanAmount: '1000.00',
	status: 'fundraising',
	name: 'Bob Smith',
	boldName: true,
});

export const BoldNameWithCountry = story({
	use: 'buy supplies.',
	loanAmount: '1000.00',
	status: 'fundraising',
	name: 'Bob Smith',
	boldName: true,
	country: 'Kenya',
});

export const IndicativeHelpText = story({
	use: 'buy supplies.',
	loanAmount: '1000.00',
	status: 'fundraising',
	name: 'Bob Smith',
	hideLoanAmount: true,
	useIndicativeHelpText: true,
	whySpecial: 'It supports organic farming and includes a lower interest rate.',
});

export const ShowReadMore = story({
	use: 'buy supplies.',
	loanAmount: '1000.00',
	status: 'fundraising',
	name: 'Bob Smith',
	whySpecial: 'It supports organic farming and includes a lower interest rate.',
	showReadMore: true,
	truncateWordsNumber: 8,
});
