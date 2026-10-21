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

	describe('defaultLoanShareAmount', () => {
		const lendAmount = (getByRole) => getByRole('combobox', { name: 'Lend amount' }).value;

		it('opens on $25 with no preference', () => {
			const { getByRole } = renderCta();
			expect(lendAmount(getByRole)).toBe('25');
		});

		it('opens on the preferred amount', () => {
			const { getByRole } = renderCta({ defaultLoanShareAmount: 100 });
			expect(lendAmount(getByRole)).toBe('100');
		});

		it('rounds the preference down to an option', () => {
			const { getByRole } = renderCta({
				unreservedAmount: '850.00',
				isVisitor: false,
				defaultLoanShareAmount: 550,
			});
			expect(lendAmount(getByRole)).toBe('500');
		});

		it('ignores a preference below the smallest option', () => {
			const { getByRole } = renderCta({ defaultLoanShareAmount: 10 });
			expect(lendAmount(getByRole)).toBe('25');
		});

		it('applies a preference that arrives after mount', async () => {
			const { getByRole, rerender } = renderCta();
			await rerender({ defaultLoanShareAmount: 100 });
			expect(lendAmount(getByRole)).toBe('100');
		});

		it('applies a preference set before the loan amount loads', async () => {
			const { getByRole, rerender } = renderCta({ unreservedAmount: '', defaultLoanShareAmount: 100 });
			await rerender({ unreservedAmount: '500' });
			expect(lendAmount(getByRole)).toBe('100');
		});

		it('does not override the lender\'s choice', async () => {
			const { getByRole, rerender } = renderCta();
			await userEvent.selectOptions(getByRole('combobox', { name: 'Lend amount' }), '75');
			await rerender({ defaultLoanShareAmount: 100 });
			expect(lendAmount(getByRole)).toBe('75');
		});

		it('wins over fiveDollarsSelected', () => {
			const { getByRole } = renderCta({
				enableFiveDollarsNotes: true,
				fiveDollarsSelected: true,
				defaultLoanShareAmount: 50,
			});
			expect(lendAmount(getByRole)).toBe('50');
		});

		it('emits the resolved amount on lend', async () => {
			const { getByRole, emitted } = renderCta({ defaultLoanShareAmount: 100 });
			await userEvent.click(getByRole('button', { name: 'Lend' }));
			expect(emitted()['add-to-basket'][0]).toEqual(['100']);
		});

		describe('preset amounts', () => {
			const renderPreset = (props = {}) => renderCta({
				showPresetAmounts: true,
				unreservedAmount: '150.00',
				...props,
			});
			const dropdownValues = (getAllByRole) => getAllByRole('combobox', { name: 'Lend amount' })
				.map((combobox) => combobox.value);
			const selectedButtons = (container) => container.querySelectorAll('.selected-option');

			it('selects the matching button', () => {
				const { getByRole, getAllByRole } = renderPreset({ defaultLoanShareAmount: 50 });
				expect(getByRole('button', { name: '$50' })).toHaveClass('selected-option');
				dropdownValues(getAllByRole).forEach((value) => expect(value).toBe('Other'));
			});

			it('selects the dropdown when no button matches', () => {
				const { getAllByRole, container } = renderPreset({ defaultLoanShareAmount: 100 });
				dropdownValues(getAllByRole).forEach((value) => expect(value).toBe('100'));
				expect(selectedButtons(container)).toHaveLength(0);
			});

			it('still resets to Other when the amount loads with no preference', async () => {
				const { rerender, container } = renderPreset({ unreservedAmount: '' });
				await rerender({ unreservedAmount: '150.00' });
				expect(selectedButtons(container)).toHaveLength(0);
			});

			it('keeps the preference when the loan amount loads', async () => {
				const { getByRole, rerender } = renderPreset({ unreservedAmount: '', defaultLoanShareAmount: 50 });
				await rerender({ unreservedAmount: '150.00' });
				expect(getByRole('button', { name: '$50' })).toHaveClass('selected-option');
			});

			it('respects maxAmount', () => {
				const { getByRole, queryAllByRole } = renderPreset({
					unreservedAmount: '500',
					maxAmount: '100',
					defaultLoanShareAmount: 200,
				});
				expect(getByRole('button', { name: '$100' })).toHaveClass('selected-option');
				expect(queryAllByRole('combobox')).toHaveLength(0);
			});

			it('moves the preference to its button when a later maxAmount turns it into one', async () => {
				const { getByRole, rerender } = renderPreset({ unreservedAmount: '500', defaultLoanShareAmount: 100 });
				await rerender({ maxAmount: '100' });
				expect(getByRole('button', { name: '$100' })).toHaveClass('selected-option');
			});

			it('never selects an amount over the cap for a preference above maxAmount', () => {
				const { getAllByRole } = renderPreset({
					unreservedAmount: '5000.00',
					isVisitor: false,
					maxAmount: '1500.00',
					defaultLoanShareAmount: 5000,
				});
				dropdownValues(getAllByRole).forEach((value) => expect(value).toBe('1,000'));
			});

			it('emits the preferred amount on Support', async () => {
				const { getAllByRole, emitted } = renderPreset({ defaultLoanShareAmount: 100 });
				await userEvent.click(getAllByRole('button', { name: 'Support John' })[0]);
				expect(emitted()['add-to-basket'][0]).toEqual(['100']);
			});
		});
	});
});
