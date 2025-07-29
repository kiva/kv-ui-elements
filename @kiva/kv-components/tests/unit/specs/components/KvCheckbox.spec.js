import { render, fireEvent } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvCheckbox from '#components/KvCheckbox.vue';

describe('KvCheckbox', () => {
	it('renders with a role of "checkbox"', () => {
		const { getByRole } = render(KvCheckbox, {
			slots: { default: 'Test Checkbox' },
		});
		const checkboxEl = getByRole('checkbox', { name: 'Test Checkbox' });

		expect(checkboxEl).toBeDefined();
	});

	it('renders round variant with a role of "checkbox"', () => {
		const { getByRole } = render(KvCheckbox, {
			props: { variant: 'round' },
			slots: { default: 'Round Checkbox' },
		});
		const checkboxEl = getByRole('checkbox', { name: 'Round Checkbox' });

		expect(checkboxEl).toBeDefined();
	});

	it('can\'t be toggled when the disabled prop is true (round)', async () => {
		const { getByLabelText } = render(KvCheckbox, {
			props: { disabled: true, variant: 'round' },
			slots: { default: 'Round Checkbox' },
		});
		const checkboxEl = getByLabelText('Round Checkbox');

		expect(checkboxEl.checked).toEqual(false);
		await checkboxEl.click();
		expect(checkboxEl.checked).toEqual(false);
	});

	it('works with v-model (round)', async () => {
		const TestComponent = {
			template:
                `<div>
                    <KvCheckbox v-model="checkboxValue" variant="round">Round Checkbox</KvCheckbox>
                    <button @click="checkboxValue = false">reset</button>
                    <span>The checkbox value is {{ checkboxValue }}</span>
                </div>`,
			components: { KvCheckbox },
			data: () => ({ checkboxValue: false }),
		};
		const { getByLabelText, getByText } = render(TestComponent);
		const checkboxEl = getByText('Round Checkbox');
		const checkboxInput = getByLabelText('Round Checkbox');

		expect(getByText('The checkbox value is false')).toBeDefined();
		expect(checkboxInput.checked).toEqual(false);

		await fireEvent.click(checkboxEl);
		expect(getByText('The checkbox value is true')).toBeDefined();
		expect(checkboxInput.checked).toEqual(true);

		await fireEvent.click(getByText('reset'));
		expect(getByText('The checkbox value is false')).toBeDefined();
		expect(checkboxInput.checked).toEqual(false);
	});

	it('applies parent event listeners to the input element (round)', async () => {
		const onInput = jest.fn();
		const TestComponent = {
			template: '<KvCheckbox variant="round" @input="onInput">Round Checkbox</KvCheckbox>',
			components: { KvCheckbox },
			methods: { onInput },
		};
		const { getByText } = render(TestComponent);

		const checkboxEl = getByText('Round Checkbox');
		await fireEvent.click(checkboxEl);
		expect(onInput.mock.calls.length).toBe(1);
	});

	it('applies parent attributes to the input element (round)', async () => {
		const TestComponent = {
			template: '<KvCheckbox variant="round" name="test-round-checkbox">Round Checkbox</KvCheckbox>',
			components: { KvCheckbox },
		};
		const { getByRole } = render(TestComponent);

		const checkboxEl = getByRole('checkbox');
		expect(checkboxEl.name).toBe('test-round-checkbox');
	});

	it('applies parent styles to the root element (round)', async () => {
		const TestComponent = {
			template: '<KvCheckbox variant="round" style="padding-top:1234px">Round Checkbox</KvCheckbox>',
			components: { KvCheckbox },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.style.paddingTop).toEqual('1234px');
	});

	it('applies parent classes to the root element (round)', async () => {
		const TestComponent = {
			template: '<KvCheckbox variant="round" class="test-class">Round Checkbox</KvCheckbox>',
			components: { KvCheckbox },
		};
		const { container } = render(TestComponent);

		expect(container.firstChild.classList).toContain('test-class');
	});

	it('has no automated accessibility violations (round)', async () => {
		const { container } = render(KvCheckbox, {
			props: { variant: 'round' },
			slots: { default: 'Round Checkbox' },
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
