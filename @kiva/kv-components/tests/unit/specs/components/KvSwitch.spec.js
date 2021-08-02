import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvSwitch from '../../../../vue/KvSwitch.vue';

expect.extend(toHaveNoViolations);

describe('KvSwitch', () => {
	it('renders with a role of "switch"', () => {
		const { getByRole } = render(KvSwitch, {
			slots: { default: 'Test Switch' },
		});
		const switchEl = getByRole('switch', { name: 'Test Switch' });

		expect(switchEl).toBeDefined();
	});

	it('toggles the switch when the label is clicked', async () => {
		const { getByRole, getByLabelText } = render(KvSwitch, {
			slots: { default: 'Test Switch' },
		});
		const switchEl = getByRole('switch', { name: 'Test Switch' });
		const labelEl = getByLabelText('Test Switch');

		expect(switchEl.checked).toEqual(false);
		await labelEl.click();
		expect(switchEl.checked).toEqual(true);
	});

	it('can\'t be toggled when the disabled prop is true', async () => {
		const { getByRole, getByLabelText } = render(KvSwitch, {
			props: { disabled: true },
			slots: { default: 'Test Switch' },
		});
		const switchEl = getByRole('switch', { name: 'Test Switch' });
		const labelEl = getByLabelText('Test Switch');

		expect(switchEl.checked).toEqual(false);
		await labelEl.click();
		expect(switchEl.checked).toEqual(false);
	});

	it('emits a change event when toggled', async () => {
		const { getByRole, emitted } = render(KvSwitch, {
			slots: { default: 'Test Switch' },
		});
		const switchEl = getByRole('switch', { name: 'Test Switch' });

		await switchEl.click();
		expect(emitted().change[0]).toEqual([true]);

		await switchEl.click();
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
