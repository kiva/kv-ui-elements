import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvTextInput from '../../../../vue/KvTextInput.vue';

expect.extend(toHaveNoViolations);

const KvTextInputTemplate = {
	components: { KvTextInput },
	template: `
		<div>
			<label for="kv-text-input">Label</label>
			<kv-text-input id="kv-text-input" />
		</div>
	`,
};

describe('KvTextInput', () => {
	it('renders with a role of "textbox"', () => {
		const { getByRole } = render(KvTextInputTemplate);
		const textInputEl = getByRole('textbox');

		expect(textInputEl).toBeDefined();
	});

	it('updates the value when text is entered', async () => {
		const { getByRole } = render(KvTextInputTemplate);
		const textInputEl = getByRole('textbox');

		expect(textInputEl.value).toEqual('');
		await userEvent.type(textInputEl, 'abc 123');
		expect(textInputEl.value).toEqual('abc 123');
	});

	it('can\'t be input when the disabled prop is true', async () => {
		const { getByRole } = render(KvTextInput, {
			props: {
				disabled: true,
				id: 'foo',
			},
		});
		const textInputEl = getByRole('textbox');

		expect(textInputEl.disabled).toBeTruthy();
		expect(textInputEl.value).toEqual('');
		await userEvent.type(textInputEl, 'abc 123');
		expect(textInputEl.value).toEqual('');
	});

	it('works with v-model', async () => {
		const TestComponent = {
			template:
				`<div>
					<label for="text-input">Text input</label>
					<KvTextInput v-model="textValue" id="text-input" />
					<button @click="textValue = 'abc'">reset</button>
					<span>The text value is {{ textValue }}</span>
				</div>`,
			components: { KvTextInput },
			data: () => ({ textValue: 'abc' }),
		};
		const { getByRole, getByText } = render(TestComponent);
		const textInputEl = getByRole('textbox');

		// Check that the value is 'abc' initially
		expect(getByText('The text value is abc')).toBeDefined();
		expect(textInputEl.value).toEqual('abc');

		// Type 'def' in the text input and expect the value to be 'abcdef' now
		await userEvent.type(textInputEl, 'def');
		expect(getByText('The text value is abcdef')).toBeDefined();
		expect(textInputEl.value).toEqual('abcdef');

		// Click the reset button and expect the value to be 'abc' again
		await fireEvent.click(getByText('reset'));
		expect(getByText('The text value is abc')).toBeDefined();
		expect(textInputEl.value).toEqual('abc');
	});

	it('applies parent event listeners to the input element', async () => {
		const onInput = jest.fn();
		const TestComponent = {
			template: '<KvTextInput id="test" @input="onInput" />',
			components: { KvTextInput },
			methods: { onInput },
		};
		const { getByRole } = render(TestComponent);

		const textInputEl = getByRole('textbox');
		await userEvent.type(textInputEl, 'a');
		expect(onInput.mock.calls.length).toBe(1);
	});

	it('applies parent attributes to the input element', async () => {
		const TestComponent = {
			template: '<KvTextInput id="test" name="test-text-input" />',
			components: { KvTextInput },
		};
		const { getByRole } = render(TestComponent);

		const textInputEl = getByRole('textbox');
		expect(textInputEl.name).toBe('test-text-input');
	});

	it('applies parent styles to the root element', async () => {
		const TestComponent = {
			template: '<KvTextInput id="test" style="padding-top:1234px" />',
			components: { KvTextInput },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.style.paddingTop).toEqual('1234px');
	});

	it('applies parent classes to the root element', async () => {
		const TestComponent = {
			template: '<KvTextInput id="test" class="test-class" />',
			components: { KvTextInput },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.classList).toContain('test-class');
	});

	it('has no automated accessibility violations', async () => {
		const { container } = render(KvTextInputTemplate);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it('clear button cleans the input value', async () => {
		const { getByRole } = render(KvTextInput, {
			props: {
				canClear: true,
				valid: true,
				id: 'foo',
			},
		});
		const textInputEl = getByRole('textbox');
		expect(textInputEl.value).toEqual('');
		await userEvent.type(textInputEl, 'abc 123');
		expect(textInputEl.value).toEqual('abc 123');
		const buttonInputEl = getByRole('button');
		expect(buttonInputEl).toBeDefined();
		await fireEvent.click(buttonInputEl);
		expect(textInputEl.value).toEqual('');
	});
});
