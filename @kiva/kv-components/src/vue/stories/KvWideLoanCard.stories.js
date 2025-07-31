import KvWideLoanCard from '../KvWideLoanCard.vue';

export default {
	title: 'KvWideLoanCard',
	component: KvWideLoanCard,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvWideLoanCard },
		setup() { return { args: { ...templateArgs } }; },
		template: `
		<div style="max-width: 800px;">
			<kv-wide-loan-card
				v-bind="args"
			/>
		</div>
	`,
	});
	template.args = args;
	return template;
};

const nextWeek = new Date();
nextWeek.setDate(new Date().getDate() + 7);

const loan = {
	id: 1,
	name: 'Alan',
	geocode: {
		city: 'Lyantonde',
		state: 'Central Region',
		country: {
			isoCode: 'UG',
			name: 'Uganda',
			region: 'Africa',
			__typename: 'Country',
		},
		__typename: 'Geocode',
	},
	image: { hash: '9673d0722a7675b9b8d11f90849d9b44' },
	loanFundraisingInfo: {
		id: 1,
		fundedAmount: '250.00',
		reservedAmount: '250.00',
	},
	use: 'to purchase heifers to increase headcount of cattle and sales of organic milk.',
	status: 'fundraising',
	loanAmount: '1000.00',
	borrowerCount: 1,
	activity: {
		id: 61,
		name: 'Dairy',
		__typename: 'Activity',
	},
	sector: {
		id: 1,
		name: 'Agriculture',
		__typename: 'Sector',
	},
	plannedExpirationDate: nextWeek.toISOString(),
};

const kvTrackFunction = () => { };

const photoPath = 'https://www-kiva-org.freetls.fastly.net/img/';

export const Loading = story({
	loanId: loan.id,
	loan: undefined,
	kvTrackFunction,
	photoPath,
});

export const PartialLoading = story({
	loanId: loan.id,
	loan: {
		...loan,
		loanFundraisingInfo: undefined,
	},
	kvTrackFunction,
	photoPath,
});

export const ShowTags = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	showTags: true,
});

export const CustomCallouts = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	showTags: true,
	customCallouts: ['Loan Length: 15mo'],
});

export const CustomCalloutsWrap = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	showTags: true,
	customCallouts: ['Loan Length: 15mo', 'Long Dairy Processing'],
});

export const Matched = story({
	loanId: loan.id,
	loan: {
		...loan,
		matchingText: 'Matched by Ebay',
		matchRatio: 1,
		loanFundraisingInfo: {
			id: loan.id,
			fundedAmount: '200.00',
			isExpiringSoon: false,
			reservedAmount: '0.00',
		},
	},
	kvTrackFunction,
	photoPath,
	showTags: true,
});

export const AlmostFunded = story({
	loanId: loan.id,
	loan: {
		...loan,
		loanFundraisingInfo: {
			id: loan.id,
			fundedAmount: '950.00',
			isExpiringSoon: false,
			reservedAmount: '0.00',
		},
	},
	kvTrackFunction,
	photoPath,
});

export const AlmostFundedShowTags = story({
	loanId: loan.id,
	loan: {
		...loan,
		loanFundraisingInfo: {
			id: loan.id,
			fundedAmount: '950.00',
			isExpiringSoon: false,
			reservedAmount: '0.00',
		},
	},
	kvTrackFunction,
	photoPath,
	showTags: true,
});

export const AllSharesReserved = story({
	loanId: loan.id,
	loan: {
		...loan,
		loanFundraisingInfo: {
			id: loan.id,
			fundedAmount: '200.00',
			reservedAmount: '800.00',
		},
	},
	kvTrackFunction,
	photoPath,
});

export const InBasket = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	basketItems: [{ id: loan.id, __typename: 'LoanReservation' }],
});

export const LongCallouts = story({
	loanId: loan.id,
	loan: {
		...loan,
		activity: { id: 1, name: 'Longer activity name test that will be longer than 50% of the card' },
	},
	showTags: true,
	kvTrackFunction,
	photoPath,
});

export const LseLoan = story({
	loanId: loan.id,
	loan: {
		...loan,
		partnerName: 'N/A, direct to Novulis',
		tags: [
			'user_favorite',
			'#Woman-Owned Business',
			'#Animals',
			'#Repeat Borrower',
			'#Supporting Family',
			'#Eco-friendly',
			'#Single parent',
		],
	},
	kvTrackFunction,
	photoPath,
	showTags: true,
});

export const Bookmarked = story({
	loanId: loan.id,
	loan,
	isBookmarked: true,
	isVisitor: false,
	kvTrackFunction,
	photoPath,
});

export const Adding = story({
	loanId: loan.id,
	loan,
	isAdding: true,
	kvTrackFunction,
	photoPath,
});

export const FiveDollarNotes = story({
	loanId: loan.id,
	loan,
	enableFiveDollarsNotes: true,
	kvTrackFunction,
	photoPath,
});

export const FiveDollarsSelected = story({
	loanId: loan.id,
	loan,
	enableFiveDollarsNotes: true,
	fiveDollarsSelected: true,
	kvTrackFunction,
	photoPath,
});

export const ViewLoan = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	showViewLoan: true,
});

export const ViewLoanFunded = story({
	loanId: loan.id,
	loan: {
		...loan,
		loanFundraisingInfo: {
			id: loan.id,
			fundedAmount: loan.loanAmount,
			reservedAmount: '0.00',
		},
	},
	kvTrackFunction,
	photoPath,
	showViewLoan: true,
});

export const LendAgain = story({
	loanId: loan.id,
	loan: {
		...loan,
		userProperties: { lentTo: true },
	},
	customLoanDetails: true,
	kvTrackFunction,
	photoPath,
});

export const HugeLentAmount = story({
	loanId: loan.id,
	loan: {
		...loan,
		loanFundraisingInfo: {
			id: loan.id,
			fundedAmount: '150.00',
			reservedAmount: '0.00',
		},
	},
	kvTrackFunction,
	photoPath,
	isVisitor: false,
});
