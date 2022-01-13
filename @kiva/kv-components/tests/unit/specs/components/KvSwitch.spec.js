import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvSwitch from '../../../../vue/KvSwitch.vue';

expect.extend(toHaveNoViolations);

describe('KvSwitch', () => {
	it('renders with a role of "switch"', () => {
		const { getByRole } = render(KvSwitch, {
			slots: { default: 'Test Switch' },
		});
		const switchEl = getByRole('switch');

		expect(switchEl).toBeDefined();
	});

	it('toggles the switch when the label is clicked', async () => {
		const { getByText, getByLabelText } = render(KvSwitch, {
			slots: { default: 'Test Switch' },
		});
		const switchEl = getByText('Test Switch');
		const switchInput = getByLabelText('Test Switch');

		expect(switchInput.checked).toEqual(false);
		await fireEvent.click(switchEl);
		expect(switchInput.checked).toEqual(true);
	});

	it('can\'t be toggled when the disabled prop is true', async () => {
		const { getByText, getByLabelText } = render(KvSwitch, {
			props: { disabled: true },
			slots: { default: 'Test Switch' },
		});
		const switchEl = getByText('Test Switch');
		const switchInput = getByLabelText('Test Switch');

		expect(switchInput.checked).toEqual(false);
		await fireEvent.click(switchEl);
		expect(switchInput.checked).toEqual(false);
	});

	it('emits a change event when toggled', async () => {
		const { getByText, emitted } = render(KvSwitch, {
			slots: { default: 'Test Switch' },
		});
		const switchEl = getByText('Test Switch');

		await fireEvent.click(switchEl);
		expect(emitted().change[0]).toEqual([true]);

		await fireEvent.click(switchEl);
		expect(emitted().change[1]).toEqual([false]);
		expect(emitted().change.length).toBe(2);
	});

	it('has no automated accessibility violations', async () => {
		const { container } = render(KvSwitch, {
			slots: { default: 'Test Switch' },
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
