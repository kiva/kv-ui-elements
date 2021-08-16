import { render } from '@testing-library/vue';
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

	it('has no automated accessibility violations', async () => {
		const { container } = render(KvTextInputTemplate);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
