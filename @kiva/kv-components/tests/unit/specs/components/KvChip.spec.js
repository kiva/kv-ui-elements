import { fireEvent, render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvChip from '#components/KvChip.vue';

const renderChip = (options = {}) => render(KvChip, {
	slots: { default: 'Chip label', ...options.slots },
	...options,
});

const chip = (container) => container.querySelector('button');

describe('KvChip', () => {
	it('has no accessibility violations', async () => {
		const { container } = renderChip();

		expect(await axe(container)).toHaveNoViolations();
	});

	it('renders its label', () => {
		const { getByText } = renderChip();

		getByText('Chip label');
	});

	it('is a button rather than a div wrapping one, so it is reachable by keyboard', () => {
		const { container } = renderChip();

		expect(container.firstElementChild.tagName).toBe('BUTTON');
		expect(chip(container)).toHaveAttribute('type', 'button');
	});

	describe('styling', () => {
		// Fixed rather than themable, per design: a chip looks the same on every surface.
		it('is outlined by default and fills on hover, with no themable colors', () => {
			const { container } = renderChip();

			expect(chip(container)).toHaveClass(
				'tw-bg-white',
				'hover:tw-bg-eco-green-1',
				'tw-text-eco-green-4',
				'tw-border',
				'tw-border-gray-300',
			);
			expect(chip(container).className).not.toMatch(/tw-(bg|text|border)-(primary|secondary|tertiary)\b/);
		});

		it('uses the small radius and the spec padding', () => {
			const { container } = renderChip();

			expect(chip(container)).toHaveClass('tw-rounded-sm', 'tw-px-2', 'tw-py-1', 'tw-gap-1');
		});
	});

	describe('click', () => {
		it('emits click-chip', async () => {
			const { container, emitted } = renderChip();

			await fireEvent.click(chip(container));

			expect(emitted()['click-chip']).toHaveLength(1);
		});

		// A consumer binding plain @click relies on it falling through to the root. That
		// only works while the root is the button itself.
		it('also fires an undeclared click listener bound by the consumer', async () => {
			const onClick = jest.fn();
			const { container } = renderChip({ attrs: { onClick } });

			await fireEvent.click(chip(container));

			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});
});
