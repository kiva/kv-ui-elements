import KvIntroductionLoanCard from '../KvIntroductionLoanCard.vue';

export default {
	title: 'KvIntroductionLoanCard',
	component: KvIntroductionLoanCard,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvIntroductionLoanCard },
		template: `
			<div style="width: 600px;">
				<kv-introduction-loan-card
					:loanId="loanId"
					:loan="loan"
					:category-page-name="categoryPageName"
					:custom-callouts="customCallouts"
					:kv-track-function="kvTrackFunction"
					:photo-path="photoPath"
					:is-visitor="isVisitor"
					@show-loan-details="showLoanDetails"
				/>
			</div>
		`,
		methods: {
			showLoanDetails() {
				console.log('show-loan-details');
			},
		},
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
	fundraisingPercent: 0.5,
	unreservedAmount: '500.00',
	use: 'to purchase heifers to increase headcount of cattle and sales of organic milk. The profits from the loan will be used wisely.',
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
	tags: [
		'user_favorite',
		'#Woman-Owned Business',
		'#Animals',
		'#Repeat Borrower',
		'#Supporting Family',
		'#Eco-friendly',
		'#Single parent',
	],
};

const kvTrackFunction = () => { };

const photoPath = 'https://www-kiva-org.freetls.fastly.net/img/';

export const Default = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
});

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
		unreservedAmount: undefined,
		fundraisingPercent: undefined,
	},
	kvTrackFunction,
	photoPath,
});

export const Matched = story({
	loanId: loan.id,
	loan: {
		...loan,
		matchingText: 'Ebay',
		matchRatio: 1,
	},
	kvTrackFunction,
	photoPath,
});

export const LseLoan = story({
	loanId: loan.id,
	loan: {
		...loan,
		partnerName: 'N/A, direct to Novulis',
	},
	kvTrackFunction,
	photoPath,
});

export const AlmostFunded = story({
	loanId: loan.id,
	loan: {
		...loan,
		loanAmount: '100.00',
		unreservedAmount: '10.00',
		fundraisingPercent: 0.9,
		loanFundraisingInfo: {
			fundedAmount: '90.00',
			reservedAmount: '0.00',
		},
	},
	kvTrackFunction,
	photoPath,
});

const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);

export const ExpiringSoon = story({
	loanId: loan.id,
	loan: {
		...loan,
		plannedExpirationDate: tomorrow.toISOString(),
	},
	kvTrackFunction,
	photoPath,
});

export const Funded = story({
	loanId: loan.id,
	loan: {
		...loan,
		unreservedAmount: '0.00',
	},
	kvTrackFunction,
	photoPath,
});

export const LongName = story({
	loanId: loan.id,
	loan: {
		...loan,
		name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
	},
	kvTrackFunction,
	photoPath,
});

export const USLoan = story({
	loanId: loan.id,
	loan: {
		...loan,
		geocode: {
			city: 'Kittanning',
			state: 'PA',
			country: {
				isoCode: 'US',
				name: 'United States',
				region: 'North America',
				__typename: 'Country',
			},
			__typename: 'Geocode',
		},
		distributionModel: 'direct',
	},
	kvTrackFunction,
	photoPath,
});

export const Bookmark = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	isVisitor: false,
});
