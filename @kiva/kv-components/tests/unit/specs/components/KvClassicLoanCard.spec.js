import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvClassicLoanCard from '../../../../vue/KvClassicLoanCard.vue';

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
});
