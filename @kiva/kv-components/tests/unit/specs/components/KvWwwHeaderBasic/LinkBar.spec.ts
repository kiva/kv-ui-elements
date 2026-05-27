import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import LinkBar from '#components/KvWwwHeaderBasic/LinkBar.vue';

expect.extend(toHaveNoViolations);
const global = { provide: { $kvTrackEvent: () => {} } };

describe('LinkBar', () => {
	it('has no accessibility violations (visitor)', async () => {
		const { container } = render(LinkBar, { props: { loggedIn: false }, global });
		expect(await axe(container)).toHaveNoViolations();
	});

	it('shows Borrow and Log In for visitors', () => {
		const { getByText } = render(LinkBar, { props: { loggedIn: false }, global });
		expect(getByText(/borrow/i)).toBeTruthy();
		expect(getByText(/log in/i)).toBeTruthy();
	});

	it('hides Borrow and shows the balance for logged-in users', () => {
		const { queryByText, getByText } = render(LinkBar, {
			props: { loggedIn: true, balance: 7, basketCount: 1 }, global,
		});
		expect(queryByText(/^borrow$/i)).toBeNull();
		expect(getByText(/\$7/)).toBeTruthy();
	});

	it('always shows Partner', () => {
		const { getByText } = render(LinkBar, { props: { loggedIn: true }, global });
		expect(getByText(/partner/i)).toBeTruthy();
	});
});
