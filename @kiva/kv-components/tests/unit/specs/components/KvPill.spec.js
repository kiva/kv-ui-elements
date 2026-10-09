import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvPill from '#components/KvPill.vue';

const renderPill = (options = {}) => render(KvPill, {
	slots: { default: 'Pill label' },
	...options,
});

describe('KvPill', () => {
	it('renders the default slot', () => {
		const { getByText } = renderPill();
		getByText('Pill label');
	});

	it('renders the icon slot', () => {
		const { getByTestId } = renderPill({
			slots: {
				default: 'Pill label',
				icon: '<span data-testid="icon"></span>',
			},
		});
		getByTestId('icon');
	});

	it('applies default variant and size classes', () => {
		const { container } = renderPill();
		expect(container.firstChild).toHaveClass('tw-bg-secondary', 'tw-text-primary', 'tw-px-2', 'tw-py-1', 'tw-rounded');
	});

	it.each([
		['muted', 'tw-bg-gray-100', 'tw-text-primary'],
		['light', 'tw-bg-primary', 'tw-text-primary'],
		['urgent', 'tw-bg-danger-highlight', 'tw-text-danger-highlight'],
		['caution', 'tw-bg-caution', 'tw-text-primary'],
	])('applies %s variant classes', (variant, bg, text) => {
		const { container } = renderPill({ props: { variant } });
		expect(container.firstChild).toHaveClass(bg, text);
	});

	it('applies small size classes', () => {
		const { container } = renderPill({ props: { size: 'small' } });
		expect(container.firstChild).toHaveClass('tw-px-1', 'tw-py-0.5', 'tw-gap-0.5');
	});

	it('has no automated accessibility violations', async () => {
		const { container } = renderPill();
		expect(await axe(container)).toHaveNoViolations();
	});
});
