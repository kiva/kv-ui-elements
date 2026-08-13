import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvHeaderLinkBar from '#components/KvWwwHeader/KvHeaderLinkBar.vue';

expect.extend(toHaveNoViolations);
const global = { provide: { $kvTrackEvent: () => {} } };

// Renders KvHeaderLinkBar with a spy wired to the injected $kvTrackEvent so hover/tap tracking can
// be asserted.
function renderWithTracking(props = {}) {
	const track = jest.fn();
	const utils = render(KvHeaderLinkBar, { props, global: { provide: { $kvTrackEvent: track } } });
	return { track, ...utils };
}

describe('KvHeaderLinkBar', () => {
	it('has no accessibility violations (logged in)', async () => {
		const { container } = render(KvHeaderLinkBar, { props: { loggedIn: true, balance: 7 }, global });
		expect(await axe(container)).toHaveNoViolations();
	});

	// Regression test: this menu used to gate hover on navigator.maxTouchPoints, which Chrome and
	// Firefox report inconsistently for identical hardware, silently breaking hover in whichever
	// browser reports a nonzero value. A plain mouseenter (no prior touch) must always open the menu.
	it('opens the MyKiva menu when hovering the avatar', async () => {
		const { track, getByTestId, emitted } = renderWithTracking({ loggedIn: true, balance: 7 });
		await fireEvent.mouseEnter(getByTestId('header-avatar-menu'));
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-Avatar-menu', 'Avatar');
		expect(emitted()['item-hover']).toBeTruthy();
	});

	it('suppresses the synthetic mouseenter that follows a touch tap so it does not re-toggle the menu', async () => {
		const { track, getByTestId } = renderWithTracking({ loggedIn: true, balance: 7 });
		const avatar = getByTestId('header-avatar-menu');
		await fireEvent.touchStart(avatar);
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-Avatar-menu', 'Avatar');
		track.mockClear();
		await fireEvent.mouseEnter(avatar);
		expect(track).not.toHaveBeenCalled();
	});
});
