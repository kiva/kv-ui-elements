import KvLoanUse from '../KvLoanUse.vue';

export default {
	title: 'Loan Display/KvLoanUse',
	component: KvLoanUse,
};

const story = (args, { width } = {}) => {
	const loanUse = `
			<kv-loan-use
				v-bind="args"
			/>
		`;
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanUse },
		setup() { return { args: { ...templateArgs } }; },
		// Only a story that asks for a width gets a wrapper; the rest render exactly as before.
		template: width ? `<div style="width: ${width};">${loanUse}</div>` : loanUse,
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

export const ShowReadMoreFitsLines = story({
	use: 'buy raw materials such as thread, sequins, pearls and other embroidery supplies in large '
		+ 'quantities so that she can take on bigger orders from her regular customers.',
	loanAmount: '375.00',
	status: 'fundraising',
	name: 'Arfa',
	country: 'Pakistan',
	boldName: true,
	distributionModel: 'partner',
	showReadMore: true,
	maxLines: 3,
}, { width: '256px' });
