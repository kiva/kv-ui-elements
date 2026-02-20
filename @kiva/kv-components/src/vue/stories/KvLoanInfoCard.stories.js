import KvLoanInfoCard from '../KvLoanInfoCard.vue';
import KvCarousel from '../KvCarousel.vue';
import KvLoanInfoCardDocsMdx from './KvLoanInfoCardDocs.mdx';

export default {
	title: 'KvLoanInfoCard',
	component: KvLoanInfoCard,
	parameters: {
		docs: {
			page: KvLoanInfoCardDocsMdx,
			title: 'KvLoanInfoCard Docs',
		},
	},
	argTypes: {
		loanId: {
			control: 'number',
			description: 'The ID of the loan',
		},
		loan: {
			control: 'object',
			description: 'The loan data object containing borrower info, geocode, and financing details',
		},
		customLoanDetails: {
			control: 'boolean',
			description: 'Whether to use custom loan details modal behavior',
		},
		kvTrackFunction: {
			control: false,
			description: 'Analytics tracking function (required)',
		},
		photoPath: {
			control: 'text',
			description: 'Base path for borrower photos (required)',
		},
		externalLinks: {
			control: 'boolean',
			description: 'Whether links should open externally (href vs router-link)',
		},
		useFullWidth: {
			control: 'boolean',
			description: 'Whether the card should expand to full width of container',
		},
		largeCard: {
			control: 'boolean',
			description: 'Whether to render the larger card variant with different aspect ratio',
		},
		errorMsg: {
			control: 'text',
			description: 'Error message to display',
		},
		primaryLinkText: {
			control: 'text',
			description: 'Text for the primary call-to-action link',
		},
		customHref: {
			control: 'text',
			description: 'Custom href for the card link (overrides default loan path)',
		},
	},
};

// Original story helper function (preserved)
const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanInfoCard },
		setup() { return { args: templateArgs }; },
		template: `
			<div style="width: 600px;">
				<kv-loan-info-card
				v-bind="args"
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

const photoPath = 'https://www.kiva.org/img/';

// Component Overview - Simple examples showing key card variations
export const ComponentOverview = {
	render: () => ({
		components: { KvLoanInfoCard },
		data() {
			return {
				loan,
				kvTrackFunction,
				photoPath,
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-flex tw-gap-6 tw-items-start tw-justify-center tw-flex-wrap">
					<div>
						<kv-loan-info-card
							:loan-id="loan.id"
							:loan="loan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							style="width: 280px;"
						/>
						<p class="tw-text-small tw-mt-2">Standard Card</p>
					</div>
					<div>
						<kv-loan-info-card
							:loan-id="loan.id"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							style="width: 280px;"
						/>
						<p class="tw-text-small tw-mt-2">Loading State</p>
					</div>
					<div>
						<kv-loan-info-card
							:loan-id="loan.id"
							:loan="loan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							large-card
							style="width: 280px;"
						/>
						<p class="tw-text-small tw-mt-2">Large Card</p>
					</div>
				</div>
			</div>
		`,
		methods: {
			showLoanDetails() {
				console.log('show-loan-details');
			},
		},
	}),
};

// All Variations - Comprehensive view of card variants and states
export const AllVariations = {
	render: () => ({
		components: { KvLoanInfoCard },
		data() {
			const usLoan = {
				...loan,
				id: 2,
				name: 'Sarah',
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
				usLoan,
				kvTrackFunction,
				photoPath,
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
					<!-- Standard Card -->
					<div class="tw-mb-2">
						<h3 class="tw-my-2">Standard Card</h3>
						<kv-loan-info-card
							:loan-id="loan.id"
							:loan="loan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							@show-loan-details="() => console.log('show-loan-details')"
						/>
					</div>

					<!-- Large Card -->
					<div class="tw-mb-2">
						<h3 class="tw-my-2">Large Card</h3>
						<kv-loan-info-card
							:loan-id="loan.id"
							:loan="loan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							large-card
							@show-loan-details="() => console.log('show-loan-details')"
						/>
					</div>

					<!-- Full Width Card -->
					<div class="tw-mb-2">
						<h3 class="tw-my-2">Full Width</h3>
						<kv-loan-info-card
							:loan-id="loan.id"
							:loan="loan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							use-full-width
							@show-loan-details="() => console.log('show-loan-details')"
						/>
					</div>

					<!-- Loading State -->
					<div class="tw-mb-2">
						<h3 class="tw-my-2">Loading State</h3>
						<kv-loan-info-card
							:loan-id="loan.id"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
						/>
					</div>

					<!-- Large Card Loading -->
					<div class="tw-mb-2">
						<h3 class="tw-my-2">Large Card Loading</h3>
						<kv-loan-info-card
							:loan-id="loan.id"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							large-card
						/>
					</div>

					<!-- US Loan -->
					<div class="tw-mb-2">
						<h3 class="tw-my-2">US Loan (Direct)</h3>
						<kv-loan-info-card
							:loan-id="usLoan.id"
							:loan="usLoan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							@show-loan-details="() => console.log('show-loan-details')"
						/>
					</div>

					<!-- Custom Link Text -->
					<div class="tw-mb-2">
						<h3 class="tw-my-2">Custom Link Text</h3>
						<kv-loan-info-card
							:loan-id="loan.id"
							:loan="loan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							primary-link-text="View borrower"
							@show-loan-details="() => console.log('show-loan-details')"
						/>
					</div>

					<!-- External Links -->
					<div class="tw-mb-2">
						<h3 class="tw-my-2">External Links</h3>
						<kv-loan-info-card
							:loan-id="loan.id"
							:loan="loan"
							:kv-track-function="kvTrackFunction"
							:photo-path="photoPath"
							external-links
							custom-href="https://www.kiva.org"
							@show-loan-details="() => console.log('show-loan-details')"
						/>
					</div>
				</div>
			</div>
		`,
	}),
};

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

export const UseFullWidth = story({
	loanId: loan.id,
	loan,
	kvTrackFunction,
	photoPath,
	useFullWidth: true,
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

// Loan variations with longer "use" statements for carousel debugging
const loanVariations = [
	{
		...loan,
	},
	{
		...loan,
		id: 2,
		name: 'Maria',
		loanAmount: '2500.00',
		loanFundraisingInfo: { id: 1, fundedAmount: '1250.00', reservedAmount: '100.00' },
	},
	{
		...loan,
		id: 3,
		name: 'Joseph',
		use: 'to buy farming equipment including a new irrigation system, seeds for seasonal crops, fertilizers, and to repair his storage facility.',
		loanAmount: '3000.00',
		loanFundraisingInfo: { id: 2, fundedAmount: '750.00', reservedAmount: '250.00' },
	},
	{
		...loan,
		id: 4,
		name: 'Chen',
		geocode: {
			city: 'Kunming',
			state: 'Yunnan',
			country: {
				isoCode: 'CN',
				name: 'China',
				region: 'Asia',
				__typename: 'Country',
			},
			__typename: 'Geocode',
		},
		use: 'to purchase tea processing equipment and packaging materials for his family tea farm.',
		loanAmount: '5000.00',
		loanFundraisingInfo: { id: 4, fundedAmount: '2000.00', reservedAmount: '500.00' },
	},
	{
		...loan,
		id: 5,
		name: 'Rosa',
		geocode: {
			city: 'Lima',
			state: 'Lima Province',
			country: {
				isoCode: 'PE',
				name: 'Peru',
				region: 'South America',
				__typename: 'Country',
			},
			__typename: 'Geocode',
		},
		use: 'to buy ingredients and kitchen equipment for her catering business specializing in traditional Peruvian cuisine, including a commercial refrigerator, gas stove, and serving dishes for large events.',
		loanAmount: '4200.00',
		loanFundraisingInfo: { id: 5, fundedAmount: '3800.00', reservedAmount: '200.00' },
	},
];

export const CarouselMultipleCards = () => ({
	components: {
		KvCarousel,
		KvLoanInfoCard,
	},
	data() {
		return {
			loanVariations,
			kvTrackFunction,
			photoPath,
		};
	},
	template: `
		<kv-carousel
			:embla-options="{ loop: false }"
			:multiple-slides-visible="true"
			slides-to-scroll="visible"
			style="max-width: 1072px;"
			class="tw-w-full"
		>
			<template #slide2>
				<kv-loan-info-card
					:loan-id="loanVariations[1].id"
					:loan="loanVariations[1]"
					:kv-track-function="kvTrackFunction"
					:photo-path="photoPath"
				/>
			</template>
			<template #slide3>
				<kv-loan-info-card
					:loan-id="loanVariations[2].id"
					:loan="loanVariations[2]"
					:kv-track-function="kvTrackFunction"
					:photo-path="photoPath"
				/>
			</template>
			<template #slide4>
				<kv-loan-info-card
					:loan-id="loanVariations[3].id"
					:loan="loanVariations[3]"
					:kv-track-function="kvTrackFunction"
					:photo-path="photoPath"
				/>
			</template>
			<template #slide5>
				<kv-loan-info-card
					:loan-id="loanVariations[4].id"
					:loan="loanVariations[4]"
					:kv-track-function="kvTrackFunction"
					:photo-path="photoPath"
				/>
			</template>
		</kv-carousel>
	`,
});
