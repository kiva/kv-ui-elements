import { render } from '@testing-library/vue';
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

	// it('toggles the switch when the label is clicked', async () => {
	// 	const { getByLabelText } = render(KvTextInput, {
	// 		slots: { default: 'Test Switch' },
	// 	});
	// 	const textInputEl = getByLabelText('Test Switch');

	// 	expect(textInputEl.checked).toEqual(false);
	// 	await textInputEl.click();
	// 	expect(textInputEl.checked).toEqual(true);
	// });

	// it('can\'t be input when the disabled prop is true', async () => {
	// 	const { getByRole } = render(KvTextInput, {
	// 		props: { disabled: true },
	// 	});
	// 	const textInputEl = getByRole('textbox');

	// 	expect(textInputEl.value).toEqual('');
	// 	await textInputEl.click();
	// 	expect(textInputEl.checked).toEqual(false);
	// });

	// it('emits a input event when text is entered', async () => {
	// 	const { getByLabelText, emitted } = render(KvTextInput, {
	// 		slots: { default: 'Test Switch' },
	// 	});
	// 	const textInputEl = getByLabelText('Test Switch');

	// 	await textInputEl.click();
	// 	expect(emitted().change[0]).toEqual([true]);

	// 	await textInputEl.click();
	// 	expect(emitted().change[1]).toEqual([false]);
	// 	expect(emitted().change.length).toBe(2);
	// });

	it('has no automated accessibility violations', async () => {
		const { container } = render(KvTextInputTemplate);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
