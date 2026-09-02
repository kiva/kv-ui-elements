import { nextTick } from 'vue';
import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import LinkBar from '#components/KvWwwHeaderBasic/LinkBar.vue';

expect.extend(toHaveNoViolations);

// Stubs scrollIntoView and ResizeObserver, which jsdom lacks.
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
type User = ReturnType<typeof userEvent.setup>;

// A single-finger tap: touch pointer down and up, followed by the browser's compatibility click.
function tap(user: User, target: HTMLElement) {
	return user.pointer({ keys: '[TouchA]', target });
}

// Opens a menu as a keyboard user does: focus the trigger and press Enter.
async function openWithKeyboard(user: User, trigger: HTMLElement) {
	trigger.focus();
	await user.keyboard('{Enter}');
}

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
		const user = userEvent.setup();
		const { container, getByRole, findByText } = render(LinkBar, { props: { loggedIn: false }, global });
		await tap(user, getByRole('button', { name: /about/i }));
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
		const user = userEvent.setup();
		const utils = render(LinkBar, { props, global });
		const trigger = getTrigger(utils);
		await tap(user, trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('true');
		await tap(user, trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
	});

	it.each(TRIGGER_CASES)('toggles the $name menu with keyboard activation', async ({ props, getTrigger }) => {
		const user = userEvent.setup();
		const utils = render(LinkBar, { props, global });
		const trigger = getTrigger(utils);
		await openWithKeyboard(user, trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('true');
		await user.keyboard('{Enter}');
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
	});

	it('opens a menu on mouse click and keeps it open under the pointer until the mouse leaves', async () => {
		jest.useFakeTimers();
		const user = userEvent.setup({ delay: null });
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await user.click(about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		jest.advanceTimersByTime(100);
		await user.click(about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await user.unhover(about.closest('.menu-group') as HTMLElement);
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('closes the open menu when a different trigger is tapped', async () => {
		const user = userEvent.setup();
		const { getByRole, getByLabelText } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		const hamburger = getByLabelText('Open menu');
		await tap(user, about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await tap(user, hamburger);
		expect(about.getAttribute('aria-expanded')).toBe('false');
		expect(hamburger.getAttribute('aria-expanded')).toBe('true');
	});

	it('toggles the Lend menu with taps on the Lend link and never lets a tap navigate', async () => {
		const user = userEvent.setup();
		const { getByText, getByLabelText } = render(LinkBar, { props: { loggedIn: false }, global });
		const lendLink = getByText('Lend');
		const chevron = getByLabelText('Lend menu');
		const clicks: MouseEvent[] = [];
		document.addEventListener('click', (event) => clicks.push(event as MouseEvent));
		await tap(user, lendLink);
		expect(clicks[0].defaultPrevented).toBe(true);
		expect(chevron.getAttribute('aria-expanded')).toBe('true');
		await tap(user, lendLink);
		expect(clicks[1].defaultPrevented).toBe(true);
		expect(chevron.getAttribute('aria-expanded')).toBe('false');
	});

	it('lets a mouse click on the Lend link navigate to /lend-by-category', async () => {
		jest.useFakeTimers();
		const user = userEvent.setup({ delay: null });
		const { getByText, getByLabelText } = render(LinkBar, { props: { loggedIn: false }, global });
		const lendLink = getByText('Lend');
		const clicks: MouseEvent[] = [];
		document.addEventListener('click', (event) => clicks.push(event as MouseEvent));
		await user.click(lendLink);
		expect(clicks[0].defaultPrevented).toBe(false);
		expect(lendLink.getAttribute('href')).toBe('/lend-by-category');
		expect(getByLabelText('Lend menu').getAttribute('aria-expanded')).toBe('false');
	});

	it('records the current pointer type on the bar, starting as mouse and following touch input', async () => {
		const user = userEvent.setup();
		const { container, getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const bar = container.querySelector('.link-bar') as HTMLElement;
		await nextTick();
		expect(bar.getAttribute('data-pointer')).toBe('mouse');
		await tap(user, getByRole('button', { name: /about/i }));
		expect(bar.getAttribute('data-pointer')).toBe('touch');
	});

	it('mounts a menu panel only on first approach of its group', async () => {
		const user = userEvent.setup();
		const { queryByText, findByText, getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		expect(queryByText('How Kiva works')).toBeNull();
		await user.hover(getByRole('button', { name: /about/i }).closest('.menu-group') as HTMLElement);
		expect(await findByText('How Kiva works')).toBeTruthy();
	});

	it('closes the menu on Escape and returns focus to the trigger', async () => {
		const user = userEvent.setup();
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await openWithKeyboard(user, about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await user.keyboard('{Escape}');
		expect(about.getAttribute('aria-expanded')).toBe('false');
		expect(document.activeElement).toBe(about);
	});

	it('closes the menu when focus leaves its group', async () => {
		const user = userEvent.setup();
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await openWithKeyboard(user, about);
		await user.tab({ shift: true });
		expect(about.closest('.menu-group')?.contains(document.activeElement)).toBe(false);
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('keeps the menu open when focus is lost to nothing', async () => {
		const user = userEvent.setup();
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await openWithKeyboard(user, about);
		await fireEvent.focusOut(about.closest('.menu-group') as HTMLElement, { relatedTarget: null });
		expect(about.getAttribute('aria-expanded')).toBe('true');
	});

	it('keeps the menu open while focus moves within its group', async () => {
		const user = userEvent.setup();
		const { getByRole, findByText } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await openWithKeyboard(user, about);
		await findByText('How Kiva works');
		await user.tab();
		expect(about.closest('.menu-group')?.contains(document.activeElement)).toBe(true);
		expect(about.getAttribute('aria-expanded')).toBe('true');
	});

	it('clears the open menu when the backdrop is tapped', async () => {
		const user = userEvent.setup();
		const { container, getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await tap(user, about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await tap(user, container.querySelector('.backdrop') as HTMLElement);
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('clears the open menu when empty bar space is tapped', async () => {
		const user = userEvent.setup();
		const { container, getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await tap(user, about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await tap(user, container.querySelector('.link-bar') as HTMLElement);
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('clears the open menu when anything outside a menu panel is tapped, including the search bar', async () => {
		const user = userEvent.setup();
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await tap(user, about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await tap(user, getByRole('searchbox'));
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('clears a click-opened menu when the mouse presses outside it, without relying on focus', async () => {
		const user = userEvent.setup();
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await user.click(about);
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await user.click(document.body);
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('keeps the menu open when a press lands on plain panel content', async () => {
		const user = userEvent.setup();
		const { getByRole, findByText } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await tap(user, about);
		const panel = (await findByText('How Kiva works')).closest('.menu-panel') as HTMLElement;
		await tap(user, panel);
		expect(about.getAttribute('aria-expanded')).toBe('true');
	});

	it('closes a menu when a link inside its panel is activated', async () => {
		const user = userEvent.setup();
		const { getByRole, findByText } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await tap(user, about);
		await tap(user, await findByText('How Kiva works'));
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('always references the panel from aria-controls, before and after the panel content mounts', async () => {
		const user = userEvent.setup();
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		const panelId = about.getAttribute('aria-controls') as string;
		expect(document.getElementById(panelId)).not.toBeNull();
		await tap(user, about);
		expect(about.getAttribute('aria-controls')).toBe(panelId);
	});

	it('tracks explicit opens for each menu', async () => {
		const user = userEvent.setup();
		const {
			track, getByRole, getByLabelText, getByTestId,
		} = renderWithTracking({ loggedIn: true });
		await tap(user, getByRole('button', { name: /about/i }));
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-About-menu', 'About');
		await tap(user, getByLabelText('Lend menu'));
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-Lend-menu', 'Lend');
		await tap(user, getByTestId('header-avatar-menu'));
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-User-menu', 'User');
	});

	it('tracks open then close events for the mobile menu', async () => {
		const user = userEvent.setup();
		const { track, getByLabelText } = renderWithTracking({ loggedIn: false });
		const hamburger = getByLabelText('Open menu');
		await tap(user, hamburger);
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-Mobile-menu', 'Mobile');
		await tap(user, hamburger);
		expect(track).toHaveBeenCalledWith('TopNav', 'close-Mobile-menu', 'Mobile');
	});

	it('tracks the mobile menu close however it closes, including Escape', async () => {
		const user = userEvent.setup();
		const { track, getByLabelText } = renderWithTracking({ loggedIn: false });
		await openWithKeyboard(user, getByLabelText('Open menu'));
		await user.keyboard('{Escape}');
		expect(track).toHaveBeenCalledWith('TopNav', 'close-Mobile-menu', 'Mobile');
	});

	it('reports aria-expanded true on the trigger while a hover open is showing the panel', async () => {
		jest.useFakeTimers();
		const user = userEvent.setup({ delay: null });
		const { getByRole } = render(LinkBar, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		const group = about.closest('.menu-group') as HTMLElement;
		await user.hover(group);
		jest.advanceTimersByTime(100);
		await nextTick();
		expect(about.getAttribute('aria-expanded')).toBe('true');
		await user.unhover(group);
		expect(about.getAttribute('aria-expanded')).toBe('false');
	});

	it('tracks a hover open once the intent delay elapses', async () => {
		jest.useFakeTimers();
		const user = userEvent.setup({ delay: null });
		const { track, getByRole } = renderWithTracking({ loggedIn: false });
		await user.hover(getByRole('button', { name: /about/i }).closest('.menu-group') as HTMLElement);
		jest.advanceTimersByTime(100);
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-About-menu', 'About');
	});

	it('does not track a hover open when the pointer leaves before the delay', async () => {
		jest.useFakeTimers();
		const user = userEvent.setup({ delay: null });
		const { track, getByRole } = renderWithTracking({ loggedIn: false });
		const group = getByRole('button', { name: /about/i }).closest('.menu-group') as HTMLElement;
		await user.hover(group);
		await user.unhover(group);
		jest.advanceTimersByTime(200);
		expect(track).not.toHaveBeenCalled();
	});

	it('tracks a hover open followed by a click on the same menu only once', async () => {
		jest.useFakeTimers();
		const user = userEvent.setup({ delay: null });
		const { track, getByRole } = renderWithTracking({ loggedIn: false });
		const about = getByRole('button', { name: /about/i });
		await user.hover(about.closest('.menu-group') as HTMLElement);
		jest.advanceTimersByTime(100);
		await user.click(about);
		expect(track).toHaveBeenCalledTimes(1);
	});

	it('does not arm hover tracking for touch pointers', async () => {
		jest.useFakeTimers();
		const user = userEvent.setup({ delay: null });
		const { track, getByRole } = renderWithTracking({ loggedIn: false });
		await tap(user, getByRole('button', { name: /about/i }).closest('.menu-group') as HTMLElement);
		jest.advanceTimersByTime(200);
		expect(track).not.toHaveBeenCalled();
	});

	it('emits login-click with the native MouseEvent when the login link is clicked', async () => {
		const user = userEvent.setup();
		const { emitted, getByTestId } = render(LinkBar, { props: { loggedIn: false }, global });
		await user.click(getByTestId('header-login'));
		expect(emitted()['login-click']).toHaveLength(1);
		expect(emitted()['login-click'][0][0]).toBeInstanceOf(MouseEvent);
	});

	it('tracks the login click exactly once', async () => {
		const user = userEvent.setup();
		const { track, getByTestId } = renderWithTracking({ loggedIn: false });
		await user.click(getByTestId('header-login'));
		expect(track).toHaveBeenCalledTimes(1);
		expect(track).toHaveBeenCalledWith('TopNav', 'click-Log-in');
	});

	it('tracks the login click even when a host intercepts the navigation', async () => {
		const { track, getByTestId } = renderWithTracking({
			loggedIn: false,
			onLoginClick: (event: MouseEvent) => event.preventDefault(),
		});
		await userEvent.setup().click(getByTestId('header-login'));
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
