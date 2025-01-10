import { render, fireEvent } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvRadio from '../../../../vue/KvRadio';

const radioGroup = {
	components: { KvRadio },
	data() { return { testModel: 'foo' }; },
	slots: { default: 'Test Radio' },
	template: `
		<fieldset>
			<kv-radio
				value="foo"
				v-model="testModel"
			>
				foo
			</kv-radio>
			<kv-radio
				value="bar"
				v-model="testModel"
			>
				bar
			</kv-radio>
			<kv-radio
				value="baz"
				v-model="testModel"
			>
				baz
			</kv-radio>
		</fieldset>
	`,
};

describe('KvRadio', () => {
	it('renders with a role of "radio"', () => {
		const { getByRole } = render(KvRadio, {
			props: { value: 'foo' },
			slots: { default: 'Test Radio' },
		});
		const radioEl = getByRole('radio');
		expect(radioEl).toBeDefined();
	});

	it('can\'t be toggled when the disabled prop is true', async () => {
		const { getByLabelText } = render(KvRadio, {
			props: {
				value: 'foo',
				disabled: true,
			},
			slots: { default: 'Test Radio' },
		});
		const radioEl = getByLabelText('Test Radio');

		expect(radioEl.checked).toEqual(false);
		await radioEl.click();
		expect(radioEl.checked).toEqual(false);
	});

	it('emits a change event when toggled', async () => {
		const { getByLabelText, emitted } = render(KvRadio, {
			props: { value: 'foo' },
			slots: { default: 'Test Radio' },
		});
		const radioEl = getByLabelText('Test Radio');
		await radioEl.click();
		expect(emitted().change[0]).toEqual(['foo']);
	});

	it('One radio element can be checked at a time', async () => {
		const { getAllByRole, getByLabelText } = render(radioGroup);
		const radioEls = getAllByRole('radio');
		expect(radioEls[0].value).toBe('foo');
		expect(radioEls[1].value).toBe('bar');
		expect(radioEls[2].value).toBe('baz');

		expect(radioEls[0].checked).toBe(true);
		expect(radioEls[1].checked).toBe(false);
		expect(radioEls[2].checked).toBe(false);

		const barEl = getByLabelText('baz');
		await barEl.click();

		expect(radioEls[0].checked).toBe(false);
		expect(radioEls[1].checked).toBe(false);
		expect(radioEls[2].checked).toBe(true);
	});

	it('works with v-model', async () => {
		const TestComponent = {
			template:
				`<fieldset>
					<KvRadio v-model="radioValue" value="foo">Foo</KvRadio>
					<KvRadio v-model="radioValue" value="bar">Bar</KvRadio>
					<KvRadio v-model="radioValue" value="baz">Baz</KvRadio>
					<button @click="radioValue = 'baz'">choose baz</button>
					<button @click="radioValue = ''">reset</button>
					<span>The radio value is {{ radioValue }}</span>
				</fieldset>`,
			components: { KvRadio },
			data: () => ({ radioValue: 'bar' }),
		};
		const { getByLabelText, getByText } = render(TestComponent);
		const radioFoo = getByLabelText('Foo');
		const radioBar = getByLabelText('Bar');
		const radioBaz = getByLabelText('Baz');

		// Check that the value is 'bar' initially
		expect(getByText('The radio value is bar')).toBeDefined();
		expect(radioFoo.checked).toBe(false);
		expect(radioBar.checked).toBe(true);
		expect(radioBaz.checked).toBe(false);

		// Click the 'Foo' radio and expect the value to be 'foo' now
		await fireEvent.click(radioFoo);
		expect(getByText('The radio value is foo')).toBeDefined();
		expect(radioFoo.checked).toBe(true);
		expect(radioBar.checked).toBe(false);
		expect(radioBaz.checked).toBe(false);

		// Click the 'choose baz' button and expect the value to be 'baz' now
		await fireEvent.click(getByText('choose baz'));
		expect(getByText('The radio value is baz')).toBeDefined();
		expect(radioFoo.checked).toBe(false);
		expect(radioBar.checked).toBe(false);
		expect(radioBaz.checked).toBe(true);

		// Click the reset button and expect the value to be blank now
		await fireEvent.click(getByText('reset'));
		expect(getByText('The radio value is')).toBeDefined();
		expect(radioFoo.checked).toBe(false);
		expect(radioBar.checked).toBe(false);
		expect(radioBaz.checked).toBe(false);
	});

	it('applies parent event listeners to the input element', async () => {
		const onInput = jest.fn();
		const TestComponent = {
			template: '<KvRadio @input="onInput" value="foo">Foo</KvRadio>',
			components: { KvRadio },
			methods: { onInput },
		};
		const { getByRole } = render(TestComponent);

		const radioEl = getByRole('radio');
		await fireEvent.click(radioEl);
		expect(onInput.mock.calls.length).toBe(1);
	});

	it('applies parent attributes to the input element', async () => {
		const TestComponent = {
			template: '<KvRadio name="test-radio" value="foo">Foo</KvRadio>',
			components: { KvRadio },
		};
		const { getByRole } = render(TestComponent);

		const radioEl = getByRole('radio');
		expect(radioEl.name).toBe('test-radio');
	});

	it('applies parent styles to the root element', async () => {
		const TestComponent = {
			template: '<KvRadio style="padding-top:1234px" value="foo">Foo</KvRadio>',
			components: { KvRadio },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.style.paddingTop).toEqual('1234px');
	});

	it('applies parent classes to the root element', async () => {
		const TestComponent = {
			template: '<KvRadio class="test-class" value="foo">Foo</KvRadio>',
			components: { KvRadio },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.classList).toContain('test-class');
	});

	it('has no automated accessibility violations', async () => {
		const { container } = render(radioGroup);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
