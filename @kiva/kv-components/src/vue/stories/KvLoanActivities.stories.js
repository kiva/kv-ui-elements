import KvLoanActivities from '../KvLoanActivities.vue';

export default {
	title: 'Loan Display/KvLoanActivities',
	component: KvLoanActivities,
};

const loan = {
	id: 1998250,
	distributionModel: 'partner', // direct, partner, both
	geocode: {
		city: 'Cranston',
		state: 'RI',
		country: {
			name: 'Malawi',
			isoCode: 'MW',
		},
	},
	image: {
		hash: 'd5ad26cd7acc24317edc1c04c6250074',
	},
	name: 'Microloan Foundation Malawi',
	sector: {
		name: 'Services',
	},
	whySpecial: 'It helps Lending Partners withstand negative economic impacts of the COVID-19 pandemic.',
	userProperties: {
		lentTo: null,
	},
	use: 'this Lending Partner provide loans to women in rural Malawi during the COVID-19 crisis.',
	status: 'fundraising',
	loanAmount: '250000.00',
	borrowerCount: 1,
	anonymizationLevel: 'none',
	fullLoanUse: 'A loan of $250,000 helps this Lending Partner provide loans to women in rural Malawi during the COVID-19 crisis.',
	fundraisingPercent: 0.75,
	unreservedAmount: '600',
	loanFundraisingInfo: {
		fundedAmount: '218950.00',
		reservedAmount: '0.00',
		isExpiringSoon: false,
	},
	lenders: {
		totalCount: 7,
	},
	plannedExpirationDate: '2020-09-10T19:30:13Z',
	matchingText: 'LISC',
	matchRatio: 2,
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

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanActivities },
		setup() { return { args: { ...templateArgs } }; },
		template: `
		<div style="max-width: 400px;">
			<KvLoanActivities
				v-bind="args"
			/>
		</div>`,
	});
	template.args = args;
	return template;
};

export const Default = story({ loan, combinedActivities, kvTrackFunction });
