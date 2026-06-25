import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import KvButton from '#components/KvButton.vue';
import addVueRouter from '../../utils/addVueRouter';

describe('Default Button', () => {
	const renderTestButton = (options) => render(KvButton, addVueRouter({
		slots: { default: 'Test Button' },
		...options,
	}));

	it('renders as a button tag by default', () => {
		const { getByRole } = renderTestButton();
		getByRole('button', { name: 'Test Button' });
	});

	it('renders as an anchor tag when passed an href prop', () => {
		const { getByRole } = renderTestButton({
			props: { href: 'https://www.example.com/' },
		});
		const anchorEl = getByRole('link', { name: 'Test Button' });
		expect(anchorEl.href).toEqual('https://www.example.com/');
	});

	it('renders as an anchor tag when passed a route string', () => {
		const { getByRole } = renderTestButton({
			props: { to: '/home' },
		});
		const anchorEl = getByRole('link', { name: 'Test Button' });
		expect(anchorEl.href).toEqual('http://localhost/home');
	});

	it('renders as an anchor tag when passed a route object', () => {
		const { getByRole } = renderTestButton({
			props: {
				to: {
					path: 'test-route-with-query',
					query: {
						param1: 'a',
					},
				},
			},
		});
		const anchorEl = getByRole('link', { name: 'Test Button' });
		expect(anchorEl.href).toEqual('http://localhost/test-route-with-query?param1=a');
	});

	it('shows a ripple animation when clicked', async () => {
		const { getByText, getByTestId } = renderTestButton();
		const btnEl = getByText('Test Button');
		await fireEvent.click(btnEl);
		getByTestId('ripple');
	});

	it('passes through click events', async () => {
		const onClick = jest.fn();
		const { getByText } = render({
			template: `<div>
				<KvButton @click.prevent="onClick">Button tag</KvButton>
				<KvButton href="#test" @click.prevent="onClick">Anchor tag</KvButton>
				<KvButton to="/test" @click.native.prevent="onClick">Router-link</KvButton>
			</div>`,
			components: {
				KvButton,
			},
			methods: {
				onClick,
			},
		}, addVueRouter());

		// Click all the buttons and expect the onClick method to have been called 3 times
		await userEvent.click(getByText('Button tag'));
		await userEvent.click(getByText('Anchor tag'));
		await userEvent.click(getByText('Router-link'));
		expect(onClick.mock.calls.length).toBe(3);
	});

	it('when passed a loading prop, the button is disabled', () => {
		const { getByRole } = renderTestButton({
			props: { state: 'loading' },
		});
		const btnEl = getByRole('button', { name: 'Test Button' });
		expect(btnEl.disabled).toBeTruthy();
	});

	it('has no automated accessibility violations', async () => {
		const { container } = renderTestButton();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('renders the default size by default', () => {
		const { getByText } = renderTestButton();
		const innerEl = getByText('Test Button');
		// padding lives on the inner label span
		expect(innerEl).toHaveClass('tw-px-3');
		expect(innerEl).toHaveClass('tw-py-1');
		expect(innerEl).not.toHaveClass('tw-px-2');
		expect(innerEl).not.toHaveClass('tw-py-0.5');
		// default sets no explicit text style — it inherits
		expect(innerEl).not.toHaveClass('tw-text-button-link');
		expect(innerEl).not.toHaveClass('tw-text-label');
		// min-height and corner radius live on the outer span wrapper
		expect(innerEl.parentElement).toHaveClass('tw-min-h-6');
		expect(innerEl.parentElement).not.toHaveClass('tw-min-h-4');
		expect(innerEl.parentElement).toHaveClass('tw-rounded');
		expect(innerEl.parentElement).not.toHaveClass('tw-rounded-sm');
	});

	it('renders the default size when size is explicitly "default"', () => {
		const { getByText } = renderTestButton({ props: { size: 'default' } });
		const innerEl = getByText('Test Button');
		expect(innerEl).toHaveClass('tw-px-3');
		expect(innerEl.parentElement).toHaveClass('tw-min-h-6');
	});

	it('renders the small size (32px tall, 16px horizontal padding, smaller radius) when size is "small"', () => {
		const { getByText } = renderTestButton({ props: { size: 'small' } });
		const innerEl = getByText('Test Button');
		// 16px horizontal padding, smaller vertical padding
		expect(innerEl).toHaveClass('tw-px-2');
		expect(innerEl).toHaveClass('tw-py-0.5');
		expect(innerEl).not.toHaveClass('tw-px-3');
		expect(innerEl).not.toHaveClass('tw-py-1');
		// small uses the label text style
		expect(innerEl).toHaveClass('tw-text-label');
		expect(innerEl).not.toHaveClass('tw-text-button-link');
		// 32px min-height
		expect(innerEl.parentElement).toHaveClass('tw-min-h-4');
		expect(innerEl.parentElement).not.toHaveClass('tw-min-h-6');
		// smaller corner radius
		expect(innerEl.parentElement).toHaveClass('tw-rounded-sm');
		expect(innerEl.parentElement).not.toHaveClass('tw-rounded');
	});

	it('has no automated accessibility violations in the small size', async () => {
		const { container } = renderTestButton({ props: { size: 'small' } });
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
