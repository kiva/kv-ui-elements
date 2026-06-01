import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import MyKivaMenu from '#components/KvWwwHeaderBasic/MyKivaMenu.vue';

expect.extend(toHaveNoViolations);
const global = { provide: { $kvTrackEvent: () => {} } };

describe('MyKivaMenu', () => {
	it('has no accessibility violations', async () => {
		const { container } = render(MyKivaMenu, { props: { loggedIn: true, myDashboardUrl: '/mykiva' }, global });
		expect(await axe(container)).toHaveNoViolations();
	});

	it('links to the dashboard url', () => {
		const { getByText } = render(MyKivaMenu, { props: { loggedIn: true, myDashboardUrl: '/mykiva' }, global });
		// The "My Dashboard" link targets the host-provided dashboard url.
		expect(getByText('My Dashboard').getAttribute('href')).toBe('/mykiva');
	});

	it('shows Borrower and Trustee dashboards only for those roles', () => {
		const { queryByText, getByText } = render(MyKivaMenu, {
			props: {
				loggedIn: true, myDashboardUrl: '/mykiva', isBorrower: true, isTrustee: false,
			},
			global,
		});
		expect(getByText(/borrower dashboard/i)).toBeTruthy();
		expect(queryByText(/trustee dashboard/i)).toBeNull();
	});
});
