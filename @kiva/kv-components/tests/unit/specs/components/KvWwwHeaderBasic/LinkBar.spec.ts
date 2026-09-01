import { render, fireEvent, createEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import LinkBar from '#components/KvWwwHeaderBasic/LinkBar.vue';

expect.extend(toHaveNoViolations);

// Stubs the DOM APIs the Lend menu's KvTabs calls that jsdom does not implement.
Element.prototype.scrollIntoView = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

// Stubs the globally-registered kv-track-event directive.
const global = {
	provide: { $kvTrackEvent: () => {} },
	directives: { 'kv-track-event': {} },
};

type RenderResult = ReturnType<typeof render>;

// Renders LinkBar with a spy wired to the injected $kvTrackEvent so menu tracking can be asserted.
function renderWithTracking(props = {}) {
	const track = jest.fn();
	const utils = render(LinkBar, {
		props,
		global: { ...global, provide: { $kvTrackEvent: track } },
	});
	return { track, ...utils };
}

// One entry per menu trigger button; getTrigger locates the button carrying aria-expanded.
const TRIGGER_CASES: Array<{
	name: string;
	props: Record<string, unknown>;
	getTrigger: (utils: RenderResult) => HTMLElement;
}> = [
	{ name: 'hamburger', props: {}, getTrigger: (utils) => utils.getByLabelText('Open menu') },
	{ name: 'Lend chevron', props: {}, getTrigger: (utils) => utils.getByLabelText('Lend menu') },
	{ name: 'About', props: {}, getTrigger: (utils) => utils.getByRole('button', { name: /about/i }) },
	{ name: 'avatar', props: { loggedIn: true }, getTrigger: (utils) => utils.getByTestId('header-avatar-menu') },
];

describe('LinkBar', () => {
	afterEach(() => {
		jest.useRealTimers();
	});

	it('has no accessibility violations (visitor)', async () => {
		const { container } = render(LinkBar, { props: { loggedIn: false }, global });
		expect(await axe(container)).toHaveNoViolations();
	});

	it('has no accessibility violations with a menu open', async () => {
		const { container, getByRole, findByText } = render(LinkBar, { props: { loggedIn: false }, global });
		await fireEvent.touchStart(getByRole('button', { name: /about/i }));
		await findByText('How Kiva works');
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

	it.each(TRIGGER_CASES)('toggles the $name menu open and closed with repeated taps', async ({ props, getTrigger }) => {
		const utils = render(LinkBar, { props, global });
		const trigger = getTrigger(utils);
		await fireEvent.touchStart(trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('true');
		await fireEvent.touchStart(trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
	});

	it.each(TRIGGER_CASES)('toggles the $name menu with clicks and keyboard activation', async ({ props, getTrigger }) => {
		const utils = render(LinkBar, { props, global });
		const trigger = getTrigger(utils);
		await fireEvent.click(trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('true');
		await fireEvent.click(trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
	});

	it('toggles a menu with real mouse clicks', async () => {
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await fireEvent(about, new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1 }));
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await fireEvent(about, new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1 }));
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('closes the open menu when a different trigger is tapped', async () => {
		const { getByRole, getByLabelText } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		const hamburger = getByLabelText('Open menu');
		await fireEvent.touchStart(about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await fireEvent.touchStart(hamburger);
		expect(about.getAttribute('aria-expanded')).toBe('false');
		expect(hamburger.getAttribute('aria-expanded')).toBe('true');
	});

	it('keeps Lend as a real link to /lend-by-category', () => {
		const { getByText } = render(LinkBar, { props: { loggedIn: false }, global });
		expect(getByText('Lend').getAttribute('href')).toBe('/lend-by-category');
	});

	it('toggles the Lend menu with taps on the Lend link and never lets a tap navigate', async () => {
		const { getByText, getByLabelText } = render(LinkBar, { props: { loggedIn: false }, global });
		const lendLink = getByText('Lend');
		const chevron = getByLabelText('Lend menu');
		const firstTap = createEvent.touchStart(lendLink);
		await fireEvent(lendLink, firstTap);
		expect(firstTap.defaultPrevented).toBe(true);
		expect(chevron.getAttribute('aria-expanded')).toBe('true');
		const secondTap = createEvent.touchStart(lendLink);
		await fireEvent(lendLink, secondTap);
		expect(secondTap.defaultPrevented).toBe(true);
		expect(chevron.getAttribute('aria-expanded')).toBe('false');
	});

	it('mounts a menu panel only on first approach of its group', async () => {
		const { queryByText, findByText, getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		expect(queryByText('How Kiva works')).toBeNull();
		await fireEvent.touchStart(getByRole('button', { name: /about/i }));
		expect(await findByText('How Kiva works')).toBeTruthy();
	});

	it('closes the menu on Escape and returns focus to the trigger', async () => {
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await fireEvent.click(about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await fireEvent.keyDown(about, { key: 'Escape' });
		expect(about.getAttribute('aria-expanded')).toBe('false');
		expect(document.activeElement).toBe(about);
	});

	it('closes the menu when focus leaves its group', async () => {
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await fireEvent.click(about);
		const group = about.closest('.menu-group') as HTMLElement;
		await fireEvent.focusOut(group, { relatedTarget: document.body });
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('keeps the menu open while focus moves within its group', async () => {
		const { getByRole, findByText } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		// focusin mounts the panel; the keyboard click then opens it.
		await fireEvent.focusIn(about);
		await fireEvent.click(about);
		const insideLink = await findByText('How Kiva works');
		const group = about.closest('.menu-group') as HTMLElement;
		await fireEvent.focusOut(group, { relatedTarget: insideLink });
		expect(about.getAttribute('aria-expanded')).toBe('true');
	});

	it('clears the open menu when the backdrop is tapped', async () => {
		const { container, getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await fireEvent.touchStart(about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await fireEvent.pointerDown(container.querySelector('.backdrop') as HTMLElement);
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('clears the open menu when empty bar space is tapped', async () => {
		const { container, getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await fireEvent.touchStart(about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await fireEvent.pointerDown(container.querySelector('.link-bar') as HTMLElement);
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('clears the open menu when anything outside a menu panel is tapped, including the search bar', async () => {
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await fireEvent.touchStart(about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await fireEvent.pointerDown(getByRole('searchbox'));
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('clears a click-opened menu when the mouse presses outside it, without relying on focus', async () => {
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await fireEvent.click(about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await fireEvent.pointerDown(document.body);
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('keeps the menu open when the mouse presses inside its panel', async () => {
		const { getByRole, findByText } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await fireEvent.click(about);
		await fireEvent.pointerDown(await findByText('How Kiva works'));
		expect(about.getAttribute('aria-expanded')).toBe('true');
	});

	it('always references the panel from aria-controls, before and after the panel content mounts', async () => {
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		const panelId = about.getAttribute('aria-controls') as string;
		expect(document.getElementById(panelId)).not.toBeNull();
		await fireEvent.click(about);
		expect(about.getAttribute('aria-controls')).toBe(panelId);
	});

	it('tracks explicit opens for each menu', async () => {
		const {
			track, getByRole, getByLabelText, getByTestId,
		} = renderWithTracking({ loggedIn: true });
		await fireEvent.touchStart(getByRole('button', { name: /about/i }));
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-About-menu', 'About');
		await fireEvent.touchStart(getByLabelText('Lend menu'));
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-Lend-menu', 'Lend');
		await fireEvent.touchStart(getByTestId('header-avatar-menu'));
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

	it('tracks the mobile menu close however it closes, including Escape', async () => {
		const { track, getByLabelText } = renderWithTracking({ loggedIn: false });
		const hamburger = getByLabelText('Open menu');
		await fireEvent.click(hamburger);
		await fireEvent.keyDown(hamburger, { key: 'Escape' });
		expect(track).toHaveBeenCalledWith('TopNav', 'close-Mobile-menu', 'Mobile');
	});

	it('tracks a hover open once the intent delay elapses', async () => {
		jest.useFakeTimers();
		const { track, getByRole } = renderWithTracking({ loggedIn: false });
		const group = getByRole('button', { name: /about/i }).closest('.menu-group') as HTMLElement;
		await fireEvent.pointerEnter(group);
		jest.advanceTimersByTime(100);
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-About-menu', 'About');
	});

	it('does not track a hover open when the pointer leaves before the delay', async () => {
		jest.useFakeTimers();
		const { track, getByRole } = renderWithTracking({ loggedIn: false });
		const group = getByRole('button', { name: /about/i }).closest('.menu-group') as HTMLElement;
		await fireEvent.pointerEnter(group);
		await fireEvent.pointerLeave(group);
		jest.advanceTimersByTime(200);
		expect(track).not.toHaveBeenCalled();
	});

	it('tracks a hover open followed by a click on the same menu only once', async () => {
		jest.useFakeTimers();
		const { track, getByRole } = renderWithTracking({ loggedIn: false });
		const about = getByRole('button', { name: /about/i });
		await fireEvent.pointerEnter(about.closest('.menu-group') as HTMLElement);
		jest.advanceTimersByTime(100);
		await fireEvent.click(about);
		expect(track).toHaveBeenCalledTimes(1);
	});

	it('does not arm hover tracking for touch pointers', async () => {
		jest.useFakeTimers();
		const { track, getByRole } = renderWithTracking({ loggedIn: false });
		const group = getByRole('button', { name: /about/i }).closest('.menu-group') as HTMLElement;
		const touchEnter = new Event('pointerenter');
		Object.defineProperty(touchEnter, 'pointerType', { value: 'touch' });
		await fireEvent(group, touchEnter);
		jest.advanceTimersByTime(200);
		expect(track).not.toHaveBeenCalled();
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
});
