import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import addVueRouter from '../../utils/addVueRouter';
import KvButton from '../../../../vue/KvButton';

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
});
