import { render, fireEvent } from '@testing-library/vue';
import KvHeaderLinkBar from '#components/KvWwwHeader/KvHeaderLinkBar.vue';

// kv-track-event directive is registered globally in the host apps; stub it so render doesn't warn.
function renderWithTracking(props = {}) {
	const track = jest.fn();
	const utils = render(KvHeaderLinkBar, {
		props,
		global: {
			provide: { $kvTrackEvent: track },
			directives: { 'kv-track-event': {} },
		},
	});
	return { track, ...utils };
}

describe('KvHeaderLinkBar hover triggers', () => {
	it('opens the About dropdown on a real mouse hover', async () => {
		const { track, getByTestId } = renderWithTracking({ loggedIn: false });
		await fireEvent.pointerEnter(getByTestId('header-about'), { pointerType: 'mouse' });
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-About-menu', 'About');
	});

	it('opens the avatar menu on a real mouse hover', async () => {
		const { track, getByTestId } = renderWithTracking({ loggedIn: true, balance: 7 });
		await fireEvent.pointerEnter(getByTestId('header-avatar-menu'), { pointerType: 'mouse' });
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-Avatar-menu', 'Avatar');
	});

	// After a tap, browsers fire a compatibility mouseenter — a plain MouseEvent with no
	// pointerType. Listening on pointerenter means it never reaches the handler, so a tap that
	// closed a menu cannot be immediately reopened by the synthetic event that follows it.
	it('ignores the compatibility mouseenter a browser fires after a tap', async () => {
		const { track, getByTestId } = renderWithTracking({ loggedIn: true, balance: 7 });
		await fireEvent.mouseEnter(getByTestId('header-avatar-menu'));
		expect(track).not.toHaveBeenCalled();
	});

	it('does not open the avatar menu when the pointer is a touch rather than a mouse', async () => {
		const { track, getByTestId } = renderWithTracking({ loggedIn: true, balance: 7 });
		await fireEvent.pointerEnter(getByTestId('header-avatar-menu'), { pointerType: 'touch' });
		expect(track).not.toHaveBeenCalled();
	});

	it('does not open the About dropdown when the pointer is a touch rather than a mouse', async () => {
		const { track, getByTestId } = renderWithTracking({ loggedIn: false });
		await fireEvent.pointerEnter(getByTestId('header-about'), { pointerType: 'touch' });
		expect(track).not.toHaveBeenCalled();
	});

	it('still opens the avatar menu on tap', async () => {
		const { track, getByTestId } = renderWithTracking({ loggedIn: true, balance: 7 });
		await fireEvent.touchStart(getByTestId('header-avatar-menu'));
		expect(track).toHaveBeenCalledWith('TopNav', 'hover-Avatar-menu', 'Avatar');
	});
});
