import { render, fireEvent } from '@testing-library/vue';
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

	it('works with v-model', async () => {
		const TestComponent = {
			template:
				`<div>
					<KvCheckbox v-model="checkboxValue">Test Checkbox</KvCheckbox>
					<button @click="checkboxValue = false">reset</button>
					<span>The checkbox value is {{ checkboxValue }}</span>
				</div>`,
			components: { KvCheckbox },
			data: () => ({ checkboxValue: false }),
		};
		const { getByLabelText, getByText } = render(TestComponent);
		const checkboxEl = getByText('Test Checkbox');
		const checkboxInput = getByLabelText('Test Checkbox');

		// Check that the value is `false` initially
		expect(getByText('The checkbox value is false')).toBeDefined();
		expect(checkboxInput.checked).toEqual(false);

		// Click the checkbox and expect the value to be `true` now
		await fireEvent.click(checkboxEl);
		expect(getByText('The checkbox value is true')).toBeDefined();
		expect(checkboxInput.checked).toEqual(true);

		// Click the reset button and expect the value to be `false` again
		await fireEvent.click(getByText('reset'));
		expect(getByText('The checkbox value is false')).toBeDefined();
		expect(checkboxInput.checked).toEqual(false);
	});

	it('applies parent event listeners to the input element', async () => {
		const onInput = jest.fn();
		const TestComponent = {
			template: '<KvCheckbox @input="onInput">Test Checkbox</KvCheckbox>',
			components: { KvCheckbox },
			methods: { onInput },
		};
		const { getByText } = render(TestComponent);

		const checkboxEl = getByText('Test Checkbox');
		await fireEvent.click(checkboxEl);
		expect(onInput.mock.calls.length).toBe(1);
	});

	it('applies parent attributes to the input element', async () => {
		const TestComponent = {
			template: '<KvCheckbox name="test-checkbox">Test Checkbox</KvCheckbox>',
			components: { KvCheckbox },
		};
		const { getByRole } = render(TestComponent);

		const checkboxEl = getByRole('checkbox');
		expect(checkboxEl.name).toBe('test-checkbox');
	});

	it('applies parent styles to the root element', async () => {
		const TestComponent = {
			template: '<KvCheckbox style="padding-top:1234px">Test Checkbox</KvCheckbox>',
			components: { KvCheckbox },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.style.paddingTop).toEqual('1234px');
	});

	it('applies parent classes to the root element', async () => {
		const TestComponent = {
			template: '<KvCheckbox class="test-class">Test Checkbox</KvCheckbox>',
			components: { KvCheckbox },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.classList).toContain('test-class');
	});

	it('has no automated accessibility violations', async () => {
		const { container } = render(KvCheckbox, {
			slots: { default: 'Test Checkbox' },
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
