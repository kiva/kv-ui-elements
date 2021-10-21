import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import VueRouter from 'vue-router';
import KvButton from '../../../../vue/KvButton.vue';

const router = new VueRouter();

expect.extend(toHaveNoViolations);

describe('Default Button', () => {
	it('renders as a button tag by default', () => {
		const { getByRole } = render(KvButton, {
			slots: { default: 'Test Button' },
		});
		getByRole('button', { name: 'Test Button' });
	});

	it('renders as an anchor tag when passed an href prop', () => {
		const { getByRole } = render(KvButton, {
			props: { href: 'https://www.example.com/' },
			slots: { default: 'Test Button' },
		});
		const anchorEl = getByRole('link', { name: 'Test Button' });
		expect(anchorEl.href).toEqual('https://www.example.com/');
	});

	it('renders as an anchor tag when passed a route string', () => {
		const { getByRole } = render(KvButton, {
			props: { to: '/home' },
			slots: { default: 'Test Button' },
			routes:	router,
		});
		const anchorEl = getByRole('link', { name: 'Test Button' });
		expect(anchorEl.href).toEqual('http://localhost/#/home');
	});

	it('renders as an anchor tag when passed a route object', () => {
		const { getByRole } = render(KvButton, {
			props: {
				to: {
					path: 'test-route-with-query',
					query: {
						param1: 'a',
					},
				},
			},
			slots: { default: 'Test Button' },
			routes:	router,
		});
		const anchorEl = getByRole('link', { name: 'Test Button' });
		expect(anchorEl.href).toEqual('http://localhost/#/test-route-with-query?param1=a');
	});

	it('shows a ripple animation when clicked', async () => {
		const { getByText, getByTestId } = render(KvButton, {
			slots: { default: 'Test Button' },
		});
		const btnEl = getByText('Test Button');
		await fireEvent.click(btnEl);
		getByTestId('ripple');
	});

	it('when passed a loading prop, the button is disabled', () => {
		const { getByRole } = render(KvButton, {
			props: { state: 'loading' },
			slots: { default: 'Test Button' },
		});
		const btnEl = getByRole('button', { name: 'Test Button' });
		expect(btnEl.disabled).toBeTruthy();
	});

	it('has no automated accessibility violations', async () => {
		const { container } = render(KvButton, {
			slots: { default: 'Test Button' },
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
