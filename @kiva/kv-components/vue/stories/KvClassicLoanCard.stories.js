import KvClassicLoanCard from '../KvClassicLoanCard.vue';

export default {
	title: 'KvClassicLoanCard',
	component: KvClassicLoanCard,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvClassicLoanCard },
		template: `
			<div style="width: 600px;">
				<kv-classic-loan-card
					:loanId="loanId"
					:loan="loan"
					:custom-loan-details="customLoanDetails"
					:use-full-width="useFullWidth"
					:show-tags="showTags"
					:category-page-name="categoryPageName"
					:enable-five-dollars-notes="enableFiveDollarsNotes"
					:large-card="largeCard"
					:is-adding="isAdding"
					:is-visitor="isVisitor"
					:basket-items="basketItems"
					:is-bookmarked="isBookmarked"
					:kv-track-function="kvTrackFunction"
					:photo-path="photoPath"
					:show-view-loan="showViewLoan"
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
	fundraisingPercent: 0.5,
	unreservedAmount: '500.00',
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
		unreservedAmount: undefined,
		fundraisingPercent: undefined,
	},
	kvTrackFunction,
	photoPath,
});

export const UseFullWidth = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	useFullWidth: true,
});

export const ShowTags = story({
	loanId: loan.id,
	loan: {
		...loan,
		loanFundraisingInfo: {
			fundedAmount: '950.00',
			isExpiringSoon: false,
			reservedAmount: '0.00',
		},
	},
	kvTrackFunction,
	photoPath,
	showTags: true,
});

export const Matched = story({
	loanId: loan.id,
	loan: {
		...loan,
		matchingText: 'Matched by Ebay',
		matchRatio: 1,
		loanFundraisingInfo: {
			fundedAmount: '200.00',
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
		unreservedAmount: '0.00',
		fundraisingPercent: 1,
	},
	kvTrackFunction,
	photoPath,
}, false, { unreservedAmount: '0.00', fundraisingPercent: 1 });

export const InBasket = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	basketItems: [{ id: loan.id, __typename: 'LoanReservation' }],
});

export const LargeCardLoading = story({
	loanId: loan.id,
	loan: undefined,
	kvTrackFunction,
	photoPath,
	largeCard: true,
});

export const LargeCard = story({
	loanId: loan.id,
	loan,
	showTags: true,
	largeCard: true,
	kvTrackFunction,
	photoPath,
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

export const ViewLoan = story({
	loanId: loan.id,
	loan,
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
	kvTrackFunction,
	photoPath,
});
