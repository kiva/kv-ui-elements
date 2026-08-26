import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import LinkBar from '#components/KvWwwHeaderBasic/LinkBar.vue';

expect.extend(toHaveNoViolations);
const global = { provide: { $kvTrackEvent: () => {} } };

// Renders LinkBar with a spy wired to the injected $kvTrackEvent so hover/tap tracking can be asserted.
function renderWithTracking(props = {}) {
	const track = jest.fn();
	const utils = render(LinkBar, { props, global: { provide: { $kvTrackEvent: track } } });
	return { track, ...utils };
}

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

	it('always shows Partner with us', () => {
		const { getByText } = render(LinkBar, { props: { loggedIn: true }, global });
		expect(getByText(/partner with us/i)).toBeTruthy();
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

	it('shows the basket for logged-out users when the basket has items', () => {
		const { getByTestId } = render(LinkBar, {
			props: { loggedIn: false, basketCount: 2 }, global,
		});
		const basket = getByTestId('header-basket');
		expect(basket.getAttribute('href')).toBe('/basket');
		expect(basket.style.display).not.toBe('none');
		expect(basket.textContent).toContain('2');
	});

	it('hides the basket for logged-out users when the basket is empty', () => {
		const { getByTestId } = render(LinkBar, {
			props: { loggedIn: false, basketCount: 0 }, global,
		});
		// v-show keeps the element mounted but hidden when there is nothing in the basket.
		expect(getByTestId('header-basket').style.display).toBe('none');
	});

	it('tracks a hover event when the Lend dropdown opens', async () => {
		const { track, container } = renderWithTracking({ loggedIn: false });
		const lend = container.querySelector('a.link-bar__lend') as HTMLElement;
		await fireEvent.mouseEnter(lend);
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-Lend-menu', 'Lend');
	});

	it('tracks a hover event when the About dropdown opens', async () => {
		const { track, container } = renderWithTracking({ loggedIn: false });
		const about = Array.from(container.querySelectorAll('a'))
			.find((a) => a.textContent?.trim() === 'About') as HTMLElement;
		await fireEvent.mouseEnter(about);
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-About-menu', 'About');
	});

	it('tracks a hover event when the logged-in user menu opens', async () => {
		const { track, getByTestId } = renderWithTracking({ loggedIn: true, balance: 7 });
		await fireEvent.mouseEnter(getByTestId('header-avatar-menu'));
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-User-menu', 'User');
	});

	it('tracks open then close events for the mobile menu', async () => {
		const { track, getByLabelText } = renderWithTracking({ loggedIn: false });
		const hamburger = getByLabelText('Open menu');
		await fireEvent.touchStart(hamburger);
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-Mobile-menu', 'Mobile');
		await fireEvent.touchStart(hamburger);
		expect(track).toHaveBeenCalledWith('TopNav', 'close-Mobile-menu', 'Mobile');
	});

	it('emits login-click with the native MouseEvent when the login link is clicked', async () => {
		const { emitted, getByTestId } = render(LinkBar, { props: { loggedIn: false }, global });
		await fireEvent.click(getByTestId('header-login'));
		expect(emitted()['login-click']).toHaveLength(1);
		expect(emitted()['login-click'][0][0]).toBeInstanceOf(MouseEvent);
	});

	it('tracks the login click exactly once', async () => {
		const { track, getByTestId } = renderWithTracking({ loggedIn: false });
		await fireEvent.click(getByTestId('header-login'));
		expect(track).toHaveBeenCalledTimes(1);
		expect(track).toHaveBeenCalledWith('TopNav', 'click-Log-in');
	});

	it('tracks the login click even when a host intercepts the navigation', async () => {
		const { track, getByTestId } = renderWithTracking({
			loggedIn: false,
			onLoginClick: (event: MouseEvent) => event.preventDefault(),
		});
		await fireEvent.click(getByTestId('header-login'));
		expect(track).toHaveBeenCalledTimes(1);
		expect(track).toHaveBeenCalledWith('TopNav', 'click-Log-in');
	});

	// Dispatching an event we own is what proves the host receives the *native* event rather than a
	// copy: only then does the host's preventDefault() actually cancel the anchor's navigation.
	it('lets a host cancel the navigation by calling preventDefault on the emitted event', () => {
		const { getByTestId } = render(LinkBar, {
			props: { loggedIn: false, onLoginClick: (event: MouseEvent) => event.preventDefault() },
			global,
		});
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		getByTestId('header-login').dispatchEvent(event);
		expect(event.defaultPrevented).toBe(true);
	});

	it('leaves the login navigation intact when the host does not intercept the click', () => {
		const { getByTestId } = render(LinkBar, {
			props: { loggedIn: false, loginUrl: '/custom-login' },
			global,
		});
		const link = getByTestId('header-login');
		expect(link.getAttribute('href')).toBe('/custom-login');
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		link.dispatchEvent(event);
		expect(event.defaultPrevented).toBe(false);
	});

	it('hooks the basket link to --basket-display while the basket is loading', () => {
		const { getByTestId } = render(LinkBar, {
			props: { loggedIn: false, basketCount: 0, isBasketDataLoading: true }, global,
		});
		expect(getByTestId('header-basket').style.display).toBe('var(--basket-display, flex)');
	});

	it('leaves the basket link without an inline display once the basket has loaded', () => {
		const { getByTestId } = render(LinkBar, {
			props: { loggedIn: false, basketCount: 2, isBasketDataLoading: false }, global,
		});
		expect(getByTestId('header-basket').style.display).toBe('');
	});

	it('hooks the logged-in cluster to --user-loading-display while user data is loading', () => {
		const { getByTestId } = render(LinkBar, {
			props: { loggedIn: true, isUserDataLoading: true }, global,
		});
		expect(getByTestId('header-avatar-menu').style.display)
			.toBe('var(--user-loading-display, flex)');
	});

	it('leaves the logged-in cluster without an inline display once user data has loaded', () => {
		const { getByTestId } = render(LinkBar, {
			props: { loggedIn: true, isUserDataLoading: false, balance: 25 }, global,
		});
		expect(getByTestId('header-avatar-menu').style.display).toBe('');
	});

	it('does not bind the avatar variables to the generic loading placeholder', () => {
		const { getByTestId } = render(LinkBar, {
			props: { loggedIn: true, isUserDataLoading: true }, global,
		});
		const cluster = getByTestId('header-avatar-menu');
		expect(cluster.outerHTML).not.toContain('--user-avatar-display');
		expect(cluster.outerHTML).not.toContain('--user-avatar-legacy-display');
	});
});
