import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KvLendCta from '#components/KvLendCta.vue';

const renderCta = (props = {}) => render(KvLendCta, {
	props: {
		loan: { id: 1, name: 'John', borrowerCount: 1 },
		unreservedAmount: '500',
		isLoading: false,
		kvTrackFunction: jest.fn(),
		...props,
	},
});

const optionValues = (combobox) => [...combobox.querySelectorAll('option')].map((option) => option.value);

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

	describe('maxAmount', () => {
		it('caps preset buttons under the cap', () => {
			const { getByRole, queryAllByRole } = renderCta({
				showPresetAmounts: true,
				unreservedAmount: '525.00',
				maxAmount: '90.00',
			});

			['$25', '$50', '$75'].forEach((name) => expect(getByRole('button', { name })).toBeInTheDocument());
			expect(queryAllByRole('button', { name: '$100' })).toHaveLength(0);
			expect(queryAllByRole('combobox')).toHaveLength(0);
		});

		it('shows the single lend button for a $25 cap', () => {
			const { getByRole, queryAllByRole } = renderCta({
				showPresetAmounts: true,
				unreservedAmount: '525.00',
				maxAmount: '25.00',
			});

			expect(getByRole('button', { name: 'Lend $25' })).toBeInTheDocument();
			expect(queryAllByRole('combobox')).toHaveLength(0);
		});

		it('lends what is left on a stranded loan with a $25 cap', () => {
			const { getByRole } = renderCta({
				showPresetAmounts: true,
				unreservedAmount: '12.00',
				maxAmount: '25.00',
			});

			expect(getByRole('button', { name: 'Lend $12' })).toBeInTheDocument();
		});

		it('leaves large options in place without a cap', () => {
			const { getAllByRole } = renderCta({
				showPresetAmounts: true,
				unreservedAmount: '5000.00',
				isVisitor: false,
			});

			getAllByRole('combobox', { name: 'Lend amount' })
				.forEach((combobox) => expect(optionValues(combobox)).toContain('5,000'));
		});

		it('caps comma-formatted options', () => {
			const { getAllByRole } = renderCta({
				showPresetAmounts: true,
				unreservedAmount: '5000.00',
				isVisitor: false,
				maxAmount: '1500.00',
			});

			getAllByRole('combobox', { name: 'Lend amount' }).forEach((combobox) => {
				const amounts = optionValues(combobox).filter((value) => value !== 'Other');
				expect(amounts).toContain('1,000');
				expect(amounts.filter((value) => Number(value.replace(/,/g, '')) > 1500)).toEqual([]);
			});
		});
	});
});
