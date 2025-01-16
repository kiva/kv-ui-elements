import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvTextLink from '#components/KvTextLink.vue';
import addVueRouter from '../../utils/addVueRouter';

describe('Default Button', () => {
	const renderTestTextLink = (options) => render(KvTextLink, addVueRouter({
		slots: { default: 'Test Text Link' },
		...options,
	}));

	it('renders as a button tag by default', () => {
		const { getByRole } = renderTestTextLink();
		getByRole('button', { name: 'Test Text Link' });
	});

	it('renders as an anchor tag when passed an href prop', () => {
		const { getByRole } = renderTestTextLink({
			props: { href: 'https://www.example.com/' },
		});
		const anchorEl = getByRole('link', { name: 'Test Text Link' });
		expect(anchorEl.href).toEqual('https://www.example.com/');
	});

	it('renders as an anchor tag when passed a route string', () => {
		const { getByRole } = renderTestTextLink({
			props: { to: '/home' },
		});
		const anchorEl = getByRole('link', { name: 'Test Text Link' });
		expect(anchorEl.href).toEqual('http://localhost/home');
	});

	it('renders as an anchor tag when passed a route object', () => {
		const { getByRole } = renderTestTextLink({
			props: {
				to: {
					path: 'test-route-with-query',
					query: {
						param1: 'a',
					},
				},
			},
		});
		const anchorEl = getByRole('link', { name: 'Test Text Link' });
		expect(anchorEl.href).toEqual('http://localhost/test-route-with-query?param1=a');
	});

	it('has no automated accessibility violations', async () => {
		const { container } = renderTestTextLink();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
