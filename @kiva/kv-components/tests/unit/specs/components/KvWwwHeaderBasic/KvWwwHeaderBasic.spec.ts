import { ref } from 'vue';
import {
	render, fireEvent, waitFor, within,
} from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvWwwHeaderBasic from '#components/KvWwwHeaderBasic/KvWwwHeaderBasic.vue';

expect.extend(toHaveNoViolations);
const global = { provide: { $kvTrackEvent: () => {} } };

const SAMPLE_SUGGESTIONS = [
	{ group: 'Sectors', label: 'Coffee', query: 'sector=1' },
	{ group: 'Countries and Territories', label: 'Peru', query: 'country=70' },
];

function createMockApollo() {
	return {
		query: jest.fn().mockResolvedValue({
			data: { lend: { loanSearchSuggestions: SAMPLE_SUGGESTIONS } },
		}),
	};
}

// Harness wires the header's load-search-data event to the exposed loadSearchSuggestions method,
// exactly as a host app does. Returns the mock apollo so tests can assert call counts.
function renderWithSearchHarness(props = {}) {
	const apollo = createMockApollo();
	const Harness = {
		components: { KvWwwHeaderBasic },
		setup() {
			const headerRef = ref(null);
			function onLoadSearchData() {
				headerRef.value?.loadSearchSuggestions?.(apollo);
			}
			return { headerRef, onLoadSearchData, harnessProps: props };
		},
		template: `
			<kv-www-header-basic
				ref="headerRef"
				v-bind="harnessProps"
				@load-search-data="onLoadSearchData"
			/>
		`,
	};
	return { apollo, ...render(Harness, { global }) };
}

// Suggestion labels are rendered with <mark> wrapping the matched substring (see markMatches), which
// splits the label across elements. This matcher matches a result button by its combined textContent.
function resultText(label: string) {
	return (_content: string, node: Element | null) => node?.tagName === 'SPAN'
		&& node.textContent === label;
}

describe('KvWwwHeaderBasic', () => {
	it('has no accessibility violations (visitor)', async () => {
		const { container } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		expect(await axe(container)).toHaveNoViolations();
	});

	it('renders a navigation landmark and the Kiva logo home link', () => {
		const { getByRole } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		expect(getByRole('navigation')).toBeTruthy();
	});

	it('re-emits load-search-data from the search bar', async () => {
		const { emitted } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		// load-search-data is forwarded; assert the event channel exists once focus occurs in integration.
		expect(emitted()).toBeDefined();
	});

	it('does not render its own bottom border on the nav (host owns the border)', () => {
		const { getByRole } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		const nav = getByRole('navigation');
		expect(nav.className).not.toContain('tw-border-b');
		expect(nav.className).not.toContain('tw-border-tertiary');
	});

	it('builds search URLs from the page origin when appOrigin is omitted', async () => {
		const { getByRole, emitted } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		const input = getByRole('searchbox');
		await fireEvent.update(input, 'coffee');
		await fireEvent.keyDown(input, { key: 'Enter' });
		const payload = emitted()['search-submit'][0][0] as { url: string };
		expect(payload.url).toBe(`${window.location.origin}/lend/filter`);
	});

	it('lets an explicit appOrigin prop override the derived origin', async () => {
		const { getByRole, emitted } = render(KvWwwHeaderBasic, {
			props: { loggedIn: false, appOrigin: 'https://www.kiva.org' },
			global,
		});
		const input = getByRole('searchbox');
		await fireEvent.update(input, 'coffee');
		await fireEvent.keyDown(input, { key: 'Enter' });
		const payload = emitted()['search-submit'][0][0] as { url: string };
		expect(payload.url).toBe('https://www.kiva.org/lend/filter');
	});

	it('fetches suggestions via loadSearchSuggestions and surfaces them in the search bar', async () => {
		const { apollo, getByRole, findByText } = renderWithSearchHarness();
		const input = getByRole('searchbox');
		await fireEvent.focus(input); // triggers load-search-data -> harness calls loadSearchSuggestions
		await new Promise((r) => { setTimeout(r, 0); }); // let apollo.query resolve + re-index
		await fireEvent.update(input, 'coff');
		expect(await findByText(resultText('Coffee'))).toBeTruthy();
		expect(apollo.query).toHaveBeenCalledTimes(1);
	});

	it('does not re-run the suggestions query on subsequent focus (run-once)', async () => {
		const { apollo, getByRole } = renderWithSearchHarness();
		const input = getByRole('searchbox');
		await fireEvent.focus(input);
		await new Promise((r) => { setTimeout(r, 0); });
		await fireEvent.blur(input);
		await fireEvent.focus(input);
		await new Promise((r) => { setTimeout(r, 0); });
		expect(apollo.query).toHaveBeenCalledTimes(1);
	});

	it('falls back to the searchSuggestions prop when nothing has been fetched', async () => {
		const { getByRole, findByText } = render(KvWwwHeaderBasic, {
			props: { searchSuggestions: [{ group: 'Sectors', label: 'Education', query: 'sector=8' }] },
			global,
		});
		const input = getByRole('searchbox');
		await fireEvent.focus(input);
		await fireEvent.update(input, 'educ');
		expect(await findByText(resultText('Education'))).toBeTruthy();
	});

	it('opens a menu through the full header when its trigger is tapped', async () => {
		const { getByRole, findByText } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		const about = getByRole('button', { name: /about/i });
		await userEvent.setup().pointer({ keys: '[TouchA]', target: about });
		expect(about.getAttribute('aria-expanded')).toBe('true');
		expect(await findByText('How Kiva works')).toBeTruthy();
	});

	it('forwards useEsiAvatar through to the link bar', () => {
		const { getByTestId } = render(KvWwwHeaderBasic, {
			props: { loggedIn: true, isUserDataLoading: true, useEsiAvatar: true },
			global,
		});
		expect(getByTestId('header-avatar-esi')).toBeTruthy();
		expect(getByTestId('header-avatar-icon')).toBeTruthy();
	});

	it('leaves the link bar on the grey skeleton when useEsiAvatar is not set', () => {
		const { getByTestId, queryByTestId } = render(KvWwwHeaderBasic, {
			props: { loggedIn: true, isUserDataLoading: true },
			global,
		});
		expect(getByTestId('header-avatar-skeleton')).toBeTruthy();
		expect(queryByTestId('header-avatar-esi')).toBeNull();
	});

	it('forwards login-click from the link bar to the host', async () => {
		const { emitted, getByTestId } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
		await fireEvent.click(getByTestId('header-login'));
		expect(emitted()['login-click']).toHaveLength(1);
		expect(emitted()['login-click'][0][0]).toBeInstanceOf(MouseEvent);
	});

	describe('major gifts experiment', () => {
		// The host flips show-major-gifts-exp on in the browser after the header has already been
		// server-rendered in its control state, so both arms have to be correct from the same markup.
		function renderArm(showMajorGiftsExp: boolean, props = {}) {
			const trackEvent = jest.fn();
			const utils = render(KvWwwHeaderBasic, {
				props: { loggedIn: false, showMajorGiftsExp, ...props },
				global: { provide: { $kvTrackEvent: trackEvent } },
			});
			return { trackEvent, ...utils };
		}

		it('has no accessibility violations in the experiment arm', async () => {
			const { container } = renderArm(true);
			expect(await axe(container)).toHaveNoViolations();
		});

		it('omits the Major gifts link in the control arm', () => {
			const { queryByTestId } = renderArm(false);
			expect(queryByTestId('header-major-gifts')).toBeNull();
		});

		it('renders the Major gifts link in the experiment arm', () => {
			const { getByTestId } = renderArm(true);
			expect(getByTestId('header-major-gifts')).toHaveAttribute('href', '/lp/major-gifts');
		});

		it('tracks the Major gifts click like the other top-level nav links', async () => {
			const { getByTestId, trackEvent } = renderArm(true);
			await fireEvent.click(getByTestId('header-major-gifts'));
			expect(trackEvent).toHaveBeenCalledWith('TopNav', 'click-Major-Gifts');
		});

		it('labels the support button "Support Kiva" in the control arm', () => {
			const { getByTestId } = renderArm(false);
			expect(getByTestId('header-support-kiva')).toHaveTextContent('Support Kiva');
		});

		it('labels the support button "Give" in the experiment arm', () => {
			const { getByTestId } = renderArm(true);
			expect(getByTestId('header-support-kiva')).toHaveTextContent('Give');
		});

		// Agreed on the ticket (comment 406971): the copy changes but the event does not, so a single
		// event count covers both arms rather than splitting the metric across two action names.
		it('keeps the click-Support-Kiva event when the button reads "Give"', async () => {
			const { getByTestId, trackEvent } = renderArm(true);
			await fireEvent.click(getByTestId('header-support-kiva'));
			expect(trackEvent).toHaveBeenCalledWith('TopNav', 'click-Support-Kiva');
		});

		it('keeps the support button pointing at the donate form in the experiment arm', () => {
			const { getByTestId } = renderArm(true);
			expect(getByTestId('header-support-kiva')).toHaveAttribute('href', '/donate/supportus');
		});
	});

	describe('major gifts experiment (mobile drawer)', () => {
		// The desktop right cluster keeps its own "Partner with us"/"Support Kiva" in the DOM at every
		// breakpoint (CSS hides them), so every assertion here is scoped to the drawer panel.
		async function openDrawer(showMajorGiftsExp: boolean) {
			const { container, getByLabelText } = render(KvWwwHeaderBasic, {
				props: { loggedIn: false, showMajorGiftsExp },
				global,
			});
			await fireEvent.click(getByLabelText('Open menu'));
			const panel = container.querySelector('#header-basic-menu-drawer') as HTMLElement;
			const drawer = within(panel);
			await drawer.findByText('Partner with us');
			return drawer;
		}

		it('omits the Major gifts link and keeps "Support Kiva" in the control arm', async () => {
			const drawer = await openDrawer(false);
			expect(drawer.queryByText('Major gifts')).toBeNull();
			expect(drawer.getByText('Support Kiva')).toBeTruthy();
		});

		it('renders Major gifts and "Give" in the experiment arm', async () => {
			const drawer = await openDrawer(true);
			expect(drawer.getByText('Major gifts')).toHaveAttribute('href', '/lp/major-gifts');
			expect(drawer.getByText('Give')).toBeTruthy();
			expect(drawer.queryByText('Support Kiva')).toBeNull();
		});

		it('orders Major gifts between Give and Borrow', async () => {
			const drawer = await openDrawer(true);
			const labels = drawer.getAllByRole('link').map((a) => a.textContent?.trim());
			expect(labels).toEqual(['Partner with us', 'Give', 'Major gifts', 'Borrow']);
		});

		it('sizes the drawer links to match the mobile Lend menu tabs', async () => {
			const drawer = await openDrawer(false);
			expect(drawer.getByText('Partner with us')).toHaveClass('tw-text-title');
		});

		// 24px between the links, 20px off the About accordion above them (8px per scale unit).
		it('spaces the primary drawer links 24px apart, clear of the About section', async () => {
			const drawer = await openDrawer(false);
			expect(drawer.getByRole('navigation')).toHaveClass('tw-gap-3', 'tw-pt-2.5');
		});
	});

	describe('mobile drawer content readiness', () => {
		// The drawer panel opens from CSS the instant the hamburger is clicked, while its content is
		// an async chunk. Without a head start the tap opens a full-screen empty white panel, so the
		// drawer mounts its content as soon as the viewport is narrow enough to show the hamburger.
		const originalWidth = window.innerWidth;

		function setWidth(width: number) {
			Object.defineProperty(window, 'innerWidth', { value: width, configurable: true });
		}

		afterEach(() => setWidth(originalWidth));

		function drawerLinks(container: Element) {
			const panel = container.querySelector('#header-basic-menu-drawer') as HTMLElement;
			return within(panel).queryByText('Partner with us');
		}

		it('mounts the drawer content at mobile widths without waiting for a click', async () => {
			setWidth(375);
			const { container } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
			await waitFor(() => expect(drawerLinks(container)).not.toBeNull());
		});

		it('leaves the drawer content unmounted at desktop widths', () => {
			setWidth(1200);
			const { container } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
			expect(drawerLinks(container)).toBeNull();
		});

		it('mounts the drawer content when the window is resized down to mobile', async () => {
			setWidth(1200);
			const { container } = render(KvWwwHeaderBasic, { props: { loggedIn: false }, global });
			expect(drawerLinks(container)).toBeNull();
			setWidth(375);
			await fireEvent(window, new Event('resize'));
			await waitFor(() => expect(drawerLinks(container)).not.toBeNull());
		});
	});
});
