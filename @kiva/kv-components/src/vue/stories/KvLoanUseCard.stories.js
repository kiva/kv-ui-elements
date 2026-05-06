import KvLoanUseCard from '../KvLoanUseCard.vue';

export default {
	title: 'Loan Display/KvLoanUseCard',
	component: KvLoanUseCard,
};

const nextWeek = new Date();
nextWeek.setDate(new Date().getDate() + 7);

const photoPath = 'https://www.kiva.org/img/';

const loan = {
	id: 1,
	name: 'Soluna',
	geocode: {
		city: 'Sincelejo',
		state: 'Sucre',
		country: {
			isoCode: 'CO',
			name: 'Colombia',
			region: 'South America',
			__typename: 'Country',
		},
		__typename: 'Geocode',
	},
	image: { hash: '9673d0722a7675b9b8d11f90849d9b44' },
	loanFundraisingInfo: {
		id: 1,
		fundedAmount: '2000.00',
		reservedAmount: '0.00',
	},
	use: 'to purchase food supplies, household goods, cleaning products, storage shelves, display racks, packaging materials, and a refrigerator for her shop.',
	status: 'fundraising',
	loanAmount: '2575.00',
	borrowerCount: 1,
	activity: {
		id: 41,
		name: 'Education',
		__typename: 'Activity',
	},
	sector: {
		id: 7,
		name: 'Retail',
		__typename: 'Sector',
	},
	themes: ['Refugees/Displaced'],
	plannedExpirationDate: nextWeek.toISOString(),
};

const taggedLoan = {
	...loan,
	matchRatio: 1,
	matchingText: 'Kiva Match Fund',
};

const story = (args, width = '408px') => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanUseCard },
		setup() { return { args: templateArgs, width }; },
		template: `
			<div style="width: ${width};">
				<kv-loan-use-card v-bind="args" />
			</div>
		`,
	});
	template.args = args;
	return template;
};

const baseArgs = {
	loan,
	loanId: loan.id,
	photoPath,
	externalLinks: true,
	customHref: 'https://www.kiva.org/lend/1',
};

export const Default = story(baseArgs);

export const Loading = story({
	...baseArgs,
	loan: undefined,
});

export const WithLoanTag = story({
	...baseArgs,
	loan: taggedLoan,
});
