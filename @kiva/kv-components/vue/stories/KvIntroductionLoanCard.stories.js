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
	loan: {
		...loan,
		loanFundraisingInfo: {
			fundedAmount: '200.00',
			isExpiringSoon: false,
			reservedAmount: '0.00',
		},
	},
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
		loanFundraisingInfo: {
			fundedAmount: '200.00',
			isExpiringSoon: false,
			reservedAmount: '0.00',
		},
	},
	kvTrackFunction,
	photoPath,
	loanCallouts: [{ label: 'callout 1' }, { label: 'callout 2' }, { label: 'callout 3' }],
});
