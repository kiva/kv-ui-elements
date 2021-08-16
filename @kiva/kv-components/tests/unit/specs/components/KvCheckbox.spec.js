import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvCheckbox from '../../../../vue/KvCheckbox.vue';

expect.extend(toHaveNoViolations);

describe('KvCheckbox', () => {
	it('renders with a role of "checkbox"', () => {
		const { getByRole } = render(KvCheckbox, {
			slots: { default: 'Test Checkbox' },
		});
		const checkboxEl = getByRole('checkbox', { name: 'Test Checkbox' });

		expect(checkboxEl).toBeDefined();
	});

	it('can\'t be toggled when the disabled prop is true', async () => {
		const { getByLabelText } = render(KvCheckbox, {
			props: { disabled: true },
			slots: { default: 'Test Checkbox' },
		});
		const checkboxEl = getByLabelText('Test Checkbox');

		expect(checkboxEl.checked).toEqual(false);
		await checkboxEl.click();
		expect(checkboxEl.checked).toEqual(false);
	});

	it('emits a change event when toggled', async () => {
		const { getByLabelText, emitted } = render(KvCheckbox, {
			slots: { default: 'Test Checkbox' },
		});
		const checkboxEl = getByLabelText('Test Checkbox');

		await checkboxEl.click();
		expect(emitted().change[0]).toEqual([true]);

		await checkboxEl.click();
		expect(emitted().change[1]).toEqual([false]);
		expect(emitted().change.length).toBe(2);
	});

	it('has no automated accessibility violations', async () => {
		const { container } = render(KvCheckbox, {
			slots: { default: 'Test Checkbox' },
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
