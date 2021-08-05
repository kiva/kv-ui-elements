import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvRadio from '../../../../vue/KvRadio.vue';

expect.extend(toHaveNoViolations);

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

	it('has no automated accessibility violations', async () => {
		const { container } = render(radioGroup);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
