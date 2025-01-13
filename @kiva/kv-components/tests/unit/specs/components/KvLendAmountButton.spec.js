import { render } from '@testing-library/vue';
import KvLendAmountButton from '#components/KvLendAmountButton';

describe('KvLendAmountButton', () => {
	it('should display amount with a number input', async () => {
		const { getByText } = render(KvLendAmountButton,
			{
				provide: {
					apollo: {
						query: () => Promise.resolve({}),
					},
				},
				props: { amountLeft: 20.00 },
			});

		// Expect the button to exist and have correct amount
		const buttonElement = getByText('Lend $20');
		expect(buttonElement).toBeDefined();
	});

	it('should display amount with a string input', async () => {
		const { getByText } = render(KvLendAmountButton,
			{
				provide: {
					apollo: {
						query: () => Promise.resolve({}),
					},
				},
				props: { amountLeft: '20.00' },
			});

		// Expect the button to exist and have correct amount
		const buttonElement = getByText('Lend $20');
		expect(buttonElement).toBeDefined();
	});
});
