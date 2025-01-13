import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import KvSelect from '#components/KvSelect';

describe('KvSelect', () => {
	it('renders with a role of "select"', () => {
		const { getByRole } = render(KvSelect, {
			slots: { default: 'Test Select' },
			props: { id: 'test' },
		});
		const selectEl = getByRole('combobox');

		expect(selectEl).toBeDefined();
	});

	it('works with v-model', async () => {
		const TestComponent = {
			template:
				`<div>
					<label for="test-select">Test select</label>
					<KvSelect id="test-select" v-model="selectValue">
						<option value="a">A</option>
						<option value="b">B</option>
						<option value="c">C</option>
					</KvSelect>
					<button @click="selectValue = 'b'">reset</button>
					<span>The select value is {{ selectValue }}</span>
				</div>`,
			components: { KvSelect },
			data: () => ({ selectValue: 'b' }),
		};
		const { getByRole, getByText } = render(TestComponent);
		const selectEl = getByRole('combobox');

		// Check that the value is 'b' initially
		expect(getByText('The select value is b')).toBeDefined();
		expect(selectEl.value).toEqual('b');

		// Click the switch and expect the value to be `true` now
		await userEvent.selectOptions(selectEl, 'C');
		expect(getByText('The select value is c')).toBeDefined();
		expect(selectEl.value).toEqual('c');

		// Click the reset button and expect the value to be `false` again
		await fireEvent.click(getByText('reset'));
		expect(getByText('The select value is b')).toBeDefined();
		expect(selectEl.value).toEqual('b');
	});

	it('applies parent event listeners to the input element', async () => {
		const onChange = jest.fn();
		const TestComponent = {
			template:
				`<KvSelect id="test" @change="onChange">
					<option>A</option>
					<option>B</option>
				</KvSelect>`,
			components: { KvSelect },
			methods: { onChange },
		};
		const { getByRole } = render(TestComponent);

		const selectEl = getByRole('combobox');
		await userEvent.selectOptions(selectEl, 'B');
		expect(onChange.mock.calls.length).toBe(1);
	});

	it('applies parent attributes to the input element', async () => {
		const TestComponent = {
			template: '<KvSelect id="test" name="test-select"></KvSelect>',
			components: { KvSelect },
		};
		const { getByRole } = render(TestComponent);

		const selectEl = getByRole('combobox');
		expect(selectEl.name).toBe('test-select');
	});

	it('applies parent styles to the root element', async () => {
		const TestComponent = {
			template: '<KvSelect id="test" style="padding-top:1234px"></KvSelect>',
			components: { KvSelect },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.style.paddingTop).toEqual('1234px');
	});

	it('applies parent classes to the root element', async () => {
		const TestComponent = {
			template: '<KvSelect id="test" class="test-class"></KvSelect>',
			components: { KvSelect },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.classList).toContain('test-class');
	});

	it('has no automated accessibility violations', async () => {
		const TestComponent = {
			template:
				`<div>
					<label for="test-select">Test select</label>
					<KvSelect id="test-select">options</KvSelect>
				</div>`,
			components: { KvSelect },
		};
		const { container } = render(TestComponent);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
