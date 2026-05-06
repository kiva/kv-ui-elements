import { fireEvent, render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvLoanUseCard from '#components/KvLoanUseCard.vue';

const nextWeek = new Date();
nextWeek.setDate(new Date().getDate() + 7);

const photoPath = 'https://www.kiva.org/img/';
const loan = {
	id: 1,
	name: 'Soluna',
	geocode: {
		city: 'Sincelejo',
		state: 'Sucre',
		country: {
			isoCode: 'CO',
			name: 'Colombia',
			region: 'South America',
			__typename: 'Country',
		},
		__typename: 'Geocode',
	},
	image: { hash: '9673d0722a7675b9b8d11f90849d9b44' },
	loanFundraisingInfo: {
		id: 1,
		fundedAmount: '1000.00',
		reservedAmount: '0.00',
	},
	use: 'to purchase food supplies, household goods, cleaning products, storage shelves, display racks, packaging materials, and a refrigerator for her shop.',
	status: 'fundraising',
	loanAmount: '2000.00',
	borrowerCount: 1,
	activity: {
		id: 41,
		name: 'Education',
		__typename: 'Activity',
	},
	sector: {
		id: 7,
		name: 'Retail',
		__typename: 'Sector',
	},
	themes: ['Refugees/Displaced'],
	plannedExpirationDate: nextWeek.toISOString(),
};

const longUse = 'to deliver 24/7 clean energy access through solar micro-grids, expand maintenance staffing, buy replacement batteries, support customer training, improve reliable electricity service for families and small businesses, and stock spare parts for urgent repairs.';

const renderComponent = (props = {}) => render(KvLoanUseCard, {
	props: {
		loanId: loan.id,
		loan,
		photoPath,
		externalLinks: true,
		customHref: 'https://www.kiva.org/lend/1',
		kvTrackFunction: () => {},
		...props,
	},
});

describe('KvLoanUseCard', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = renderComponent();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('truncates the loan use statement at 200 characters and exposes the full statement on hover', () => {
		const { getByTestId, queryByText } = renderComponent({
			loan: {
				...loan,
				use: longUse,
			},
		});

		const statement = getByTestId('loan-use-statement');

		expect(statement.textContent.length).toBeLessThanOrEqual(200);
		expect(statement.textContent).toContain('...');
		expect(statement).toHaveAttribute('title', expect.stringContaining(longUse));
		expect(queryByText(/read more/i)).toBeNull();
	});

	it('renders a loan tag when tags are enabled and loan tag data exists', () => {
		const { getByText } = renderComponent({
			loan: {
				...loan,
				matchRatio: 1,
				matchingText: 'Kiva Match Fund',
			},
		});

		expect(getByText('2x matching by Kiva Match Fund')).toBeDefined();
	});

	it('does not render a loan tag when tags are disabled', () => {
		const { queryByText } = renderComponent({
			showTags: false,
			loan: {
				...loan,
				matchRatio: 1,
				matchingText: 'Kiva Match Fund',
			},
		});

		expect(queryByText('2x matching by Kiva Match Fund')).toBeNull();
	});

	it('renders the loading state when loan data is missing', () => {
		const { getByTestId } = renderComponent({ loan: undefined });

		expect(getByTestId('loan-use-card')).toHaveAttribute('aria-busy', 'true');
	});

	it('emits selected amount updates from the amount dropdown', async () => {
		const { emitted, getAllByLabelText } = renderComponent();
		const select = getAllByLabelText('Lend amount')
			.find((element) => element.tagName === 'SELECT');

		await fireEvent.update(select, '50');

		expect(emitted()['update:selected-amount'][0]).toEqual(['50']);
	});
});
