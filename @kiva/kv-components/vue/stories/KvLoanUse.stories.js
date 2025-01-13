import KvLoanUse from '#components/KvLoanUse';

export default {
	title: 'KvLoanUse',
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
