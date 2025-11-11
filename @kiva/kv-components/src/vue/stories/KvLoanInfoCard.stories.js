import KvLoanInfoCard from '../KvLoanInfoCard.vue';

export default {
	title: 'KvLoanInfoCard',
	component: KvLoanInfoCard,
};

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
