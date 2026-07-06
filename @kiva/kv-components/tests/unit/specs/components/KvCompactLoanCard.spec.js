import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KvCompactLoanCard from '#components/KvCompactLoanCard.vue';

const loan = {
	id: 1,
	loanAmount: '1000.00',
	loanFundraisingInfo: {
		id: 1,
		fundedAmount: '250.00',
		reservedAmount: '250.00',
	},
};

describe('KvCompactLoanCard', () => {
	it('tracks the selected amount when the lend amount dropdown changes', async () => {
		const kvTrackFunction = jest.fn();
		const { getByRole } = render(KvCompactLoanCard, {
			props: {
				variant: 'post-goal',
				loan,
				photoPath: 'https://www.kiva.org/img/',
				kvTrackFunction,
			},
		});

		const dropdown = getByRole('combobox', { name: 'Lend amount' });
		await userEvent.selectOptions(dropdown, '25');

		expect(kvTrackFunction).toHaveBeenCalledWith(
			'Lending',
			'Modify lend amount',
			'25',
			1,
		);
	});
});
