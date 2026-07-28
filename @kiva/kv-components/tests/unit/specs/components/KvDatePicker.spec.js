import { render, fireEvent } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvDatePicker from '#components/KvDatePicker.vue';

jest.mock('@vuepic/vue-datepicker', () => ({
	template: `
		<div>
			<input
				aria-label="Gift date"
				:value="modelValue"
				@input="$emit('update:model-value', $event.target.value)"
			>
			<span class="dp__input_icon"><slot name="input-icon" /></span>
		</div>
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

	// The calendar icon must carry intrinsic dimensions (not rely on the library's main.css)
	// so it cannot flash at full width before that CSS loads in a lazily loaded route chunk.
	it('renders a calendar icon with intrinsic size so it cannot flash before CSS loads', () => {
		const { container } = render(KvDatePicker);

		const icon = container.querySelector('.dp__input_icon svg');
		expect(icon).not.toBeNull();
		expect(icon.style.width).toBe('1rem');
		expect(icon.style.height).toBe('1rem');
	});

	it('lets a consumer override the calendar icon via the input-icon slot', () => {
		const { container } = render(KvDatePicker, {
			slots: { 'input-icon': '<span data-testid="custom-icon">x</span>' },
		});

		expect(container.querySelector('[data-testid="custom-icon"]')).not.toBeNull();
	});
});
