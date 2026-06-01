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

	it('renders the basket as a count panel with the word "Basket" for logged-in users', () => {
		const { getByTestId } = render(LinkBar, {
			props: { loggedIn: true, basketCount: 3 }, global,
		});
		const basket = getByTestId('header-basket');
		expect(basket.textContent).toContain('3');
		expect(basket.textContent).toContain('Basket');
	});

	it('renders the Kiva home logo link in the bar', () => {
		const { getByLabelText } = render(LinkBar, { props: { loggedIn: false }, global });
		const logo = getByLabelText('Kiva home');
		expect(logo).toBeTruthy();
		expect(logo.getAttribute('href')).toBe('/');
	});
});
