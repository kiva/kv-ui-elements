import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvLoadingText from '#components/KvLoadingText.vue';

describe('KvLoadingText', () => {
	it('has no accessibility violations', async () => {
		const { container } = render(KvLoadingText, { props: { lines: 3 } });
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('renders a single line by default', () => {
		const { container } = render(KvLoadingText);
		expect(container.querySelectorAll('.kv-loading-text-line')).toHaveLength(1);
	});

	it.each([1, 2, 4, 12])('renders %i line(s)', (lines) => {
		const { container } = render(KvLoadingText, { props: { lines } });
		expect(container.querySelectorAll('.kv-loading-text-line')).toHaveLength(lines);
	});

	it.each([0, -3, 0.5, Number.NaN])('renders a single line when lines is %p', (lines) => {
		const { container } = render(KvLoadingText, { props: { lines } });
		expect(container.querySelectorAll('.kv-loading-text-line')).toHaveLength(1);
	});

	it.each([[2.7, 2], [4.2, 4]])('rounds a lines value of %p down to %i line(s)', (lines, expected) => {
		const { container } = render(KvLoadingText, { props: { lines } });
		expect(container.querySelectorAll('.kv-loading-text-line')).toHaveLength(expected);
	});

	it('shortens only the last line when rendering more than one line', () => {
		const { container } = render(KvLoadingText, { props: { lines: 3 } });
		const shortened = container.querySelectorAll('.kv-loading-text-line.extra-line');
		expect(shortened).toHaveLength(2);
		expect(shortened[shortened.length - 1]).toBe(container.querySelectorAll('.kv-loading-text-line')[2]);
	});

	it('does not shorten the line when rendering a single line', () => {
		const { container } = render(KvLoadingText);
		expect(container.querySelectorAll('.kv-loading-text-line.extra-line')).toHaveLength(0);
	});

	it('applies a class passed to the component to its root element', () => {
		const { container } = render(KvLoadingText, {
			attrs: { class: 'tw-text-h2' },
			props: { lines: 2 },
		});
		const root = container.querySelector('.kv-loading-text');
		expect(root.classList.contains('tw-text-h2')).toBe(true);
	});

	it('renders a shimmer placeholder inside every line', () => {
		const { container } = render(KvLoadingText, { props: { lines: 3 } });
		container.querySelectorAll('.kv-loading-text-line').forEach((line) => {
			expect(line.querySelector('.kv-loading-text-placeholder')).not.toBeNull();
		});
	});
});
