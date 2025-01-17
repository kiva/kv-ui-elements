import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvClassicLoanCard from '#components/KvClassicLoanCard.vue';

const nextWeek = new Date();
nextWeek.setDate(new Date().getDate() + 7);
const kvTrackFunction = () => { };

const photoPath = 'https://www-kiva-org.freetls.fastly.net/img/';
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

describe('KvClassicLoanCard', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = render(KvClassicLoanCard,
			{
				props: {
					loanId: loan.id,
					loan: {
						...loan,
						unreservedAmount: undefined,
						fundraisingPercent: undefined,
					},
					kvTrackFunction,
					photoPath,
					externalLinks: true,
				},
			});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('location should be formatted correctly for PR', async () => {
		const { getByText } = render(KvClassicLoanCard,
			{
				props: {
					loanId: loan.id,
					loan: {
						...loan,
						unreservedAmount: undefined,
						fundraisingPercent: undefined,
						geocode: {
							city: 'Rincon',
							country: {
								name: 'Puerto Rico',
							},
						},
					},
					kvTrackFunction,
					photoPath,
					externalLinks: true,
				},
			});

		const countryTagElement = getByText('Rincon, PR');
		expect(countryTagElement).toBeDefined();
	});

	it('location should be formatted correctly for Kiva US', async () => {
		const { getByText } = render(KvClassicLoanCard,
			{
				props: {
					loanId: loan.id,
					loan: {
						...loan,
						distributionModel: 'direct',
						geocode: {
							city: 'Boulder',
							state: 'Colorado',
							country: {
								name: 'United States',
							},
						},
					},
					kvTrackFunction,
					photoPath,
					externalLinks: true,
				},
			});

		const countryTagElement = getByText('Boulder, Colorado, United States');
		expect(countryTagElement).toBeDefined();
	});

	it('location should be formatted correctly for partner loans', async () => {
		const { getByText } = render(KvClassicLoanCard,
			{
				props: {
					loanId: loan.id,
					loan: {
						...loan,
						distributionModel: 'partner',
						geocode: {
							country: {
								name: 'Uganda',
							},
						},
					},
					kvTrackFunction,
					photoPath,
					externalLinks: true,
				},
			});

		const countryTagElement = getByText('Uganda');
		expect(countryTagElement).toBeDefined();
	});

	it('activity feed should be showed correctly', () => {
		const { getByText, getByRole } = render(KvClassicLoanCard,
			{
				props: {
					loanId: loan.id,
					loan: {
						...loan,
						loanFundraisingInfo: {
							fundedAmount: '950.00',
							isExpiringSoon: false,
							reservedAmount: '0.00',
						},
						lenders: {
							totalCount: 7,
						},
					},
					kvTrackFunction,
					photoPath,
					combinedActivities,
				},
			});

		const activityText = getByText('7 lenders lent $950.');
		const activityBtn = getByRole('button', { name: 'See all activity' });
		expect(activityText).toBeDefined();
		expect(activityBtn).toBeDefined();
	});
});
