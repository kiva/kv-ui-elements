import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KvLendCta from '#components/KvLendCta.vue';

describe('KvLendCta', () => {
	it('tracks the selected amount when the lend amount dropdown changes', async () => {
		const kvTrackFunction = jest.fn();
		const { getByRole } = render(KvLendCta, {
			props: {
				loan: { id: 1 },
				unreservedAmount: '500',
				isLoading: false,
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
			1,
		);
	});
});
