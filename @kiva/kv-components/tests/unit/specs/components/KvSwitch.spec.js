import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import addListeners from '../../utils/addListeners';
import KvSwitch from '../../../../vue/KvSwitch.vue';

expect.extend(toHaveNoViolations);

describe('KvSwitch', () => {
	const renderTestSwitch = (options) => render(KvSwitch, {
		slots: { default: 'Test Switch' },
		...options,
	});

	it('renders with a role of "switch"', () => {
		const { getByRole } = renderTestSwitch();
		const switchEl = getByRole('switch');

		expect(switchEl).toBeDefined();
	});

	it('toggles the switch when the label is clicked', async () => {
		const { getByText, getByLabelText } = renderTestSwitch();
		const switchEl = getByText('Test Switch');
		const switchInput = getByLabelText('Test Switch');

		expect(switchInput.checked).toEqual(false);
		await fireEvent.click(switchEl);
		expect(switchInput.checked).toEqual(true);
	});

	it('can\'t be toggled when the disabled prop is true', async () => {
		const { getByText, getByLabelText } = renderTestSwitch({
			props: { disabled: true },
		});
		const switchEl = getByText('Test Switch');
		const switchInput = getByLabelText('Test Switch');

		expect(switchInput.checked).toEqual(false);
		await fireEvent.click(switchEl);
		expect(switchInput.checked).toEqual(false);
	});

	it('emits a change event when toggled', async () => {
		const { getByText, emitted } = renderTestSwitch();
		const switchEl = getByText('Test Switch');

		await fireEvent.click(switchEl);
		expect(emitted().change[0]).toEqual([true]);

		await fireEvent.click(switchEl);
		expect(emitted().change[1]).toEqual([false]);
		expect(emitted().change.length).toBe(2);
	});

	it('applies parent event listeners to the input element', async () => {
		const onInput = jest.fn();
		const { getByText } = renderTestSwitch(addListeners({}, { input: onInput }));

		const switchEl = getByText('Test Switch');
		await fireEvent.click(switchEl);
		expect(onInput.mock.calls.length).toBe(1);
	});

	it('has no automated accessibility violations', async () => {
		const { container } = renderTestSwitch();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
