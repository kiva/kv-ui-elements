import { render, fireEvent } from '@testing-library/vue';
import { axe } from 'jest-axe';
import { nextTick } from 'vue';
import addVueRouter from '../../utils/addVueRouter';
import KvEditButton from '../../../../vue/KvEditButton.vue';

describe('KvEditButton', () => {
	const renderComponent = (options) => render(KvEditButton, addVueRouter(options));

	it('renders the edit button', () => {
		const { getByRole } = renderComponent();
		getByRole('button', { name: /edit/i });
	});

	it('shows the lightbox when the edit button is clicked', async () => {
		const { getByRole } = renderComponent();
		const button = getByRole('button', { name: /edit/i });
		await fireEvent.click(button);
		expect(getByRole('dialog')).toBeVisible();
	});

	it('closes the lightbox when the close event is emitted', async () => {
		const { getByRole, queryByRole } = renderComponent();
		const button = getByRole('button', { name: /edit/i });
		await fireEvent.click(button);
		await fireEvent.keyUp(document, { key: 'Escape', code: 'Escape' });
		await nextTick();
		expect(queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('renders a custom title for the lightbox if provided', () => {
		const { getByText } = renderComponent({ props: { title: 'Custom Title' } });
		getByText('Custom Title');
	});

	it('has no automated accessibility violations', async () => {
		const { container } = renderComponent();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('renders content in the default slot of the lightbox', async () => {
		const customContent = 'Custom Content for Body';
		const { getByText, getByRole } = renderComponent({
			slots: { default: customContent },
		});
		const button = getByRole('button', { name: /edit/i });
		await fireEvent.click(button);
		expect(getByText(customContent)).toBeVisible();
	});

	it('renders content in the header slot of the lightbox', async () => {
		const customHeader = 'Custom Header Content';
		const { getByText, getByRole } = renderComponent({
			slots: { header: customHeader },
		});
		const button = getByRole('button', { name: /edit/i });
		await fireEvent.click(button);
		expect(getByText(customHeader)).toBeVisible();
	});

	it('renders content in the controls slot of the lightbox', async () => {
		const customControls = 'Custom Controls Content';
		const { getByText, getByRole } = renderComponent({
			slots: { controls: customControls },
		});
		const button = getByRole('button', { name: /edit/i });
		await fireEvent.click(button);
		expect(getByText(customControls)).toBeVisible();
	});
});
