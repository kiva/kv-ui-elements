import { render, fireEvent } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvSwitch from '#components/KvSwitch.vue';

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

	it('works with v-model', async () => {
		const TestComponent = {
			template:
				`<div>
					<KvSwitch v-model="switchValue">Test Switch</KvSwitch>
					<button @click="switchValue = false">reset</button>
					<span>The switch value is {{ switchValue }}</span>
				</div>`,
			components: { KvSwitch },
			data: () => ({ switchValue: false }),
		};
		const { getByLabelText, getByText } = render(TestComponent);
		const switchEl = getByText('Test Switch');
		const switchInput = getByLabelText('Test Switch');

		// Check that the value is `false` initially
		expect(getByText('The switch value is false')).toBeDefined();
		expect(switchInput.checked).toEqual(false);

		// Click the switch and expect the value to be `true` now
		await fireEvent.click(switchEl);
		expect(getByText('The switch value is true')).toBeDefined();
		expect(switchInput.checked).toEqual(true);

		// Click the reset button and expect the value to be `false` again
		await fireEvent.click(getByText('reset'));
		expect(getByText('The switch value is false')).toBeDefined();
		expect(switchInput.checked).toEqual(false);
	});

	it('applies parent event listeners to the input element', async () => {
		const onInput = jest.fn();
		const TestComponent = {
			template: '<KvSwitch @input="onInput">Test Switch</KvSwitch>',
			components: { KvSwitch },
			methods: { onInput },
		};
		const { getByText } = render(TestComponent);

		const switchEl = getByText('Test Switch');
		await fireEvent.click(switchEl);
		expect(onInput.mock.calls.length).toBe(1);
	});

	it('applies parent attributes to the input element', async () => {
		const TestComponent = {
			template: '<KvSwitch name="test-switch">Test Switch</KvSwitch>',
			components: { KvSwitch },
		};
		const { getByRole } = render(TestComponent);

		const switchEl = getByRole('switch');
		expect(switchEl.name).toBe('test-switch');
	});

	it('applies parent styles to the root element', async () => {
		const TestComponent = {
			template: '<KvSwitch style="padding-top:1234px">Test Switch</KvSwitch>',
			components: { KvSwitch },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.style.paddingTop).toEqual('1234px');
	});

	it('applies parent classes to the root element', async () => {
		const TestComponent = {
			template: '<KvSwitch class="test-class">Test Switch</KvSwitch>',
			components: { KvSwitch },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.classList).toContain('test-class');
	});

	it('renders the default 56x32 track with a 24px knob and travel', () => {
		const { container } = renderTestSwitch();
		const track = container.querySelector('label > div:first-of-type');
		const knob = container.querySelector('label > div:nth-of-type(2)');

		expect(track.classList).toContain('tw-w-7');
		expect(track.classList).toContain('tw-h-4');
		expect(knob.classList).toContain('tw-w-3');
		expect(knob.classList).toContain('tw-h-3');
		expect(knob.classList).toContain('peer-checked:tw-translate-x-3');
	});

	it('renders a 48x28 track with a 20px knob and travel when small', () => {
		const { container } = renderTestSwitch({ props: { size: 'small' } });
		const track = container.querySelector('label > div:first-of-type');
		const knob = container.querySelector('label > div:nth-of-type(2)');

		expect(track.classList).toContain('tw-w-6');
		expect(track.classList).toContain('tw-h-3.5');
		expect(knob.classList).toContain('tw-w-2.5');
		expect(knob.classList).toContain('tw-h-2.5');
		expect(knob.classList).toContain('peer-checked:tw-translate-x-2.5');
	});

	it('has no automated accessibility violations', async () => {
		const { container } = renderTestSwitch();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
