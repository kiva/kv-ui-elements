import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import VueRouter from 'vue-router';
import KvTextLink from '../../../../vue/KvTextLink.vue';

const router = new VueRouter();

expect.extend(toHaveNoViolations);

describe('Default Button', () => {
	it('renders as a button tag by default', () => {
		const { getByRole } = render(KvTextLink, {
			slots: { default: 'Test Button' },
		});
		getByRole('button', { name: 'Test Button' });
	});

	it('renders as an anchor tag when passed an href prop', () => {
		const { getByRole } = render(KvTextLink, {
			props: { href: 'https://www.example.com/' },
			slots: { default: 'Test Button' },
		});
		const anchorEl = getByRole('link', { name: 'Test Button' });
		expect(anchorEl.href).toEqual('https://www.example.com/');
	});

	it('renders as an anchor tag when passed a route string', () => {
		const { getByRole } = render(KvTextLink, {
			props: { to: '/home' },
			slots: { default: 'Test Button' },
			routes:	router,
		});
		const anchorEl = getByRole('link', { name: 'Test Button' });
		expect(anchorEl.href).toEqual('http://localhost/#/home');
	});

	it('renders as an anchor tag when passed a route object', () => {
		const { getByRole } = render(KvTextLink, {
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

	it('has no automated accessibility violations', async () => {
		const { container } = render(KvTextLink, {
			slots: { default: 'Test Button' },
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
