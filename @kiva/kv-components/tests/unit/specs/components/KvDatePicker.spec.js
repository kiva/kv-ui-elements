import { render, fireEvent } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvDatePicker from '#components/KvDatePicker.vue';

jest.mock('@vuepic/vue-datepicker', () => ({
	template: `
		<input
			aria-label="Gift date"
			:value="modelValue"
			@input="$emit('update:model-value', $event.target.value)"
		>
	`,
	props: {
		modelValue: {
			type: [Date, String, Number, Array],
			default: null,
		},
	},
}), { virtual: true });

describe('KvDatePicker', () => {
	it('renders the datepicker component with no automated accessibility violations', async () => {
		const { container, getByRole } = render(KvDatePicker);

		getByRole('textbox', { name: 'Gift date' });
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it('passes datepicker value changes through component events', async () => {
		const { emitted, getByRole } = render(KvDatePicker);

		await fireEvent.update(getByRole('textbox', { name: 'Gift date' }), '2026-06-15');

		expect(emitted()['update:model-value'][0]).toEqual(['2026-06-15']);
		expect(emitted().change[0]).toEqual(['2026-06-15']);
	});
});
