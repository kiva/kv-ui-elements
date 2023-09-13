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
		const { getByText } = renderComponent({ props: { lightboxTitle: 'Custom Title' } });
		getByText('Custom Title');
	});

	it('has no automated accessibility violations', async () => {
		const { container } = renderComponent();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
