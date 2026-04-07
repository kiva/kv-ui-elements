import KvCompactLoanCard from '../KvCompactLoanCard.vue';
import KvCompactLoanCardDocsMdx from './KvCompactLoanCardDocs.mdx';

export default {
	title: 'Loan Display/KvCompactLoanCard',
	component: KvCompactLoanCard,
	parameters: {
		docs: {
			page: KvCompactLoanCardDocsMdx,
			title: 'KvCompactLoanCard Docs',
		},
	},
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvCompactLoanCard },
		setup() { return { args: templateArgs }; },
		template: `
			<div style="width: 380px; background: #27593cff; padding: 20px;">
				<kv-compact-loan-card v-bind="args" />
			</div>
		`,
	});
	template.args = args;
	return template;
};

const lightStory = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvCompactLoanCard },
		setup() { return { args: templateArgs }; },
		template: `
			<div style="width: 256px;">
				<kv-compact-loan-card
					v-bind="args"
					@refresh-button="refreshButtonHandler"
				/>
			</div>
		`,
		methods: {
			refreshButtonHandler() {
				console.log('refresh-button clicked');
			},
		},
	});
	template.args = args;
	return template;
};

const nextWeek = new Date();
nextWeek.setDate(new Date().getDate() + 7);

const TRUNCATE_WORDS_NUMBER = 10;

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

const combinedActivities = [
	{
		key: 'Mon Nov 13 2023',
		data: [
			{
				lenderName: 'Erica',
				lenderImage: 'https://www.development.kiva.org/img/s100/4d844ac2c0b77a8a522741b908ea5c32.jpg',
				text: 'Erica lent $5',
				date: '2023-11-13T10:51:10Z',
				type: 'LendingAction',
			},
		],
	},
	{
		key: 'Tue Nov 07 2023',
		data: [
			{
				lenderName: 'Joy',
				lenderImage: 'https://www.development.kiva.org/img/s100/4d844ac2c0b77a8a522741b908ea5c32.jpg',
				text: 'Joy left comment <span class="tw-italic">"I know him and his wife and they work hard to make everything they do the best. His farm and bake goods are amazing. He just keeps working harder and harder to do more and reach out to the community in everyway."</span>',
				date: '2023-11-08T02:37:56Z',
				type: 'Comment',
			},
			{
				lenderName: 'Joy',
				lenderImage: 'https://www.development.kiva.org/img/s100/4d844ac2c0b77a8a522741b908ea5c32.jpg',
				text: 'Joy lent $25',
				date: '2023-11-08T02:32:20Z',
				type: 'LendingAction',
			},
		],
	},
];

const kvTrackFunction = () => { };

const photoPath = 'https://www.kiva.org/img/';

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
			fundedAmount: '800.00',
			reservedAmount: '200.00',
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

export const LightViewLoanLoading = lightStory({
	loanId: loan.id,
	loan: undefined,
	kvTrackFunction,
	photoPath,
	showLightView: true,
	truncateWordsNumber: TRUNCATE_WORDS_NUMBER,
});

export const LightViewLoan = lightStory({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	showLightView: true,
	truncateWordsNumber: TRUNCATE_WORDS_NUMBER,
});

export const MatchedLightViewLoan = lightStory({
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
	showLightView: true,
	truncateWordsNumber: TRUNCATE_WORDS_NUMBER,
});

export const LightViewRefreshButton = lightStory({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	showLightView: true,
	showRefreshButton: true,
	truncateWordsNumber: TRUNCATE_WORDS_NUMBER,
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

export const TeamPick = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	isTeamPick: true,
	isVisitor: false,
});

export const TeamPickVisitor = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	isTeamPick: true,
	isVisitor: true,
});

export const ActivityFeed = story({
	loanId: loan.id,
	loan: {
		...loan,
		lenders: {
			totalCount: 7,
		},
	},
	kvTrackFunction,
	photoPath,
	combinedActivities,
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

export const SupportButton = story({
	loanId: loan.id,
	loan,
	primaryButtonText: 'Support',
	kvTrackFunction,
	photoPath,
});

export const SupportAgain = story({
	loanId: loan.id,
	loan: {
		...loan,
		userProperties: { lentTo: true },
	},
	primaryButtonText: 'Support',
	kvTrackFunction,
	photoPath,
});

export const CustomShowLoanDetails = story({
	loanId: loan.id,
	loan: {
		...loan,
		userProperties: { lentTo: true },
	},
	primaryButtonText: 'Support',
	kvTrackFunction,
	photoPath,
	customLoanDetails: true,
});

export const RemoveButton = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	basketItems: [{ id: loan.id, __typename: 'LoanReservation' }],
	secondaryButtonText: 'Remove Loan',
	secondaryButtonHandler: () => { },
});

export const ContributorsAndAmount = story({
	loanId: loan.id,
	loan: {
		...loan,
		lenders: {
			totalCount: 7,
		},
	},
	kvTrackFunction,
	photoPath,
	showContributors: true,
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

export const CustomHref = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	externalLinks: true,
	customHref: 'https://www.kiva.org',
});

export const BusinessAndWebsite = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	businessName: 'Business Name',
	website: 'https://www.kiva.org',
	showLoanUse: false,
	showTags: false,
	customHref: '/lend-classic/1?minimal=false',
});

export const HiddenLoanUse = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	showLoanUse: false,
});

/**
 * Default story - Interactive playground for exploring all props.
 */
export const Default = {
	args: {
		loanId: loan.id,
		loan,
		kvTrackFunction,
		photoPath,
		showTags: true,
		showLoanUse: true,
		showViewLoan: false,
		showLightView: false,
		isAdding: false,
		isVisitor: true,
		externalLinks: false,
		primaryButtonText: 'Lend',
	},
	render: (args) => ({
		components: { KvCompactLoanCard },
		setup() { return { args }; },
		template: `
			<div style="width: 380px; background: #27593cff; padding: 20px;">
				<kv-compact-loan-card v-bind="args" />
			</div>
		`,
	}),
};

/**
 * Component Overview - Shows the standard loan card appearance.
 */
export const ComponentOverview = {
	render: () => ({
		components: { KvCompactLoanCard },
		setup() {
			return {
				loan,
				kvTrackFunction,
				photoPath,
			};
		},
		template: `
			<div style="width: 380px; background: #27593cff; padding: 20px;">
				<kv-compact-loan-card
					:loan-id="loan.id"
					:loan="loan"
					:kv-track-function="kvTrackFunction"
					:photo-path="photoPath"
					:show-tags="true"
				/>
			</div>
		`,
	}),
};

/**
 * All Variations - Grid showing key variations of the component.
 */
export const AllVariations = {
	render: () => ({
		components: { KvCompactLoanCard },
		setup() {
			const matchedLoan = {
				...loan,
				matchingText: 'Matched by Ebay',
				matchRatio: 1,
				loanFundraisingInfo: {
					id: loan.id,
					fundedAmount: '200.00',
					isExpiringSoon: false,
					reservedAmount: '0.00',
				},
			};
			const almostFundedLoan = {
				...loan,
				loanFundraisingInfo: {
					id: loan.id,
					fundedAmount: '950.00',
					isExpiringSoon: false,
					reservedAmount: '0.00',
				},
			};
			const fullyReservedLoan = {
				...loan,
				loanFundraisingInfo: {
					id: loan.id,
					fundedAmount: '800.00',
					reservedAmount: '200.00',
				},
			};
			const usLoan = {
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
			};
			return {
				loan,
				matchedLoan,
				almostFundedLoan,
				fullyReservedLoan,
				usLoan,
				kvTrackFunction,
				photoPath,
			};
		},
		template: `
			<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
				<div>
					<p class="tw-text-small tw-mb-2 tw-text-secondary">Standard with Tags</p>
					<div style="width: 380px; background: #27593cff; padding: 20px;">
						<kv-compact-loan-card
							:loan-id="loan.id"
							:loan="loan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							:show-tags="true"
						/>
					</div>
				</div>
				<div>
					<p class="tw-text-small tw-mb-2 tw-text-secondary">Matched Loan</p>
					<div style="width: 380px; background: #27593cff; padding: 20px;">
						<kv-compact-loan-card
							:loan-id="matchedLoan.id"
							:loan="matchedLoan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							:show-tags="true"
						/>
					</div>
				</div>
				<div>
					<p class="tw-text-small tw-mb-2 tw-text-secondary">Almost Funded</p>
					<div style="width: 380px; background: #27593cff; padding: 20px;">
						<kv-compact-loan-card
							:loan-id="almostFundedLoan.id"
							:loan="almostFundedLoan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							:show-tags="true"
						/>
					</div>
				</div>
				<div>
					<p class="tw-text-small tw-mb-2 tw-text-secondary">All Shares Reserved</p>
					<div style="width: 380px; background: #27593cff; padding: 20px;">
						<kv-compact-loan-card
							:loan-id="fullyReservedLoan.id"
							:loan="fullyReservedLoan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
						/>
					</div>
				</div>
				<div>
					<p class="tw-text-small tw-mb-2 tw-text-secondary">US Direct Loan</p>
					<div style="width: 380px; background: #27593cff; padding: 20px;">
						<kv-compact-loan-card
							:loan-id="usLoan.id"
							:loan="usLoan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
						/>
					</div>
				</div>
				<div>
					<p class="tw-text-small tw-mb-2 tw-text-secondary">Light View</p>
					<div style="width: 256px;">
						<kv-compact-loan-card
							:loan-id="loan.id"
							:loan="loan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							:show-light-view="true"
							:truncate-words-number="10"
						/>
					</div>
				</div>
			</div>
		`,
	}),
};
