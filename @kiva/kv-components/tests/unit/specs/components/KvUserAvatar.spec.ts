import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvUserAvatar from '#components/KvUserAvatar.vue';

expect.extend(toHaveNoViolations);

const CUSTOM_IMAGE = 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg';
// One of the three monolith-era defaults isLegacyPlaceholderAvatar knows about.
const DEFAULT_AVATAR_IMAGE = 'https://www.kiva.org/img/s100/4d844ac2c0b77a8a522741b908ea5c32.jpg';

const KIVA_K = 'svg[viewBox="0 0 25 37"]';

// The shimmer is v-show'd, so "not rendered" and "rendered but hidden" both count as not shown.
function shimmerIsShown(container: Element): boolean {
	const el = container.querySelector('.loading-placeholder') as HTMLElement | null;
	return !!el && el.style.display !== 'none';
}

describe('KvUserAvatar', () => {
	describe('by default', () => {
		it('renders the initial letter for a lender with no image', () => {
			const { getByText, queryByTestId } = render(KvUserAvatar, { props: { lenderName: 'Roger' } });
			expect(getByText('R')).toBeTruthy();
			expect(queryByTestId('user-avatar-icon')).toBeNull();
		});

		it('renders the Kiva K for an anonymous lender', () => {
			const { container, queryByTestId } = render(KvUserAvatar, { props: { lenderName: 'Anonymous' } });
			expect(container.querySelector(KIVA_K)).toBeTruthy();
			expect(queryByTestId('user-avatar-icon')).toBeNull();
		});

		it('renders the initial letter when the stored image is a Kiva default', () => {
			const { getByText, queryByTestId } = render(KvUserAvatar, {
				props: { lenderName: 'Roger', lenderImageUrl: DEFAULT_AVATAR_IMAGE },
			});
			expect(getByText('R')).toBeTruthy();
			expect(queryByTestId('user-avatar-icon')).toBeNull();
		});
	});

	describe('with showCssPlaceholder', () => {
		// The ESI case: the CSS variable carries the image because the prop cannot. An <img> with an
		// empty src never fires load, so isImageLoading would otherwise stay true forever and the
		// shimmer would sit beside the ESI avatar rather than ahead of it.
		it('does not show its own shimmer beside the ESI avatar', () => {
			const { container } = render(KvUserAvatar, {
				props: { showCssPlaceholder: true, lenderImageUrl: '' },
			});
			expect(shimmerIsShown(container)).toBe(false);
		});

		it('still binds the ESI variables so CSS can paint the avatar before hydration', () => {
			const { container, getByAltText } = render(KvUserAvatar, {
				props: { showCssPlaceholder: true, lenderImageUrl: '' },
			});
			const wrapper = getByAltText('Image of lender').parentElement as HTMLElement;
			expect(wrapper.style.display).toBe('var(--user-avatar-display, block)');
			expect(container.innerHTML).toContain('var(--user-avatar)');
		});
	});

	describe('without showCssPlaceholder', () => {
		it('shows the shimmer while a real image is still loading', () => {
			const { container } = render(KvUserAvatar, {
				props: { lenderName: 'Roger', lenderImageUrl: CUSTOM_IMAGE },
			});
			expect(shimmerIsShown(container)).toBe(true);
		});
	});

	describe('with useIconFallback', () => {
		it('renders the avatar icon instead of the initial letter', () => {
			const { getByTestId, queryByText } = render(KvUserAvatar, {
				props: { lenderName: 'Roger', useIconFallback: true },
			});
			expect(getByTestId('user-avatar-icon')).toBeTruthy();
			expect(queryByText('R')).toBeNull();
		});

		it('renders the avatar icon when the stored image is a Kiva default', () => {
			const { getByTestId, queryByAltText } = render(KvUserAvatar, {
				props: { lenderName: 'Roger', lenderImageUrl: DEFAULT_AVATAR_IMAGE, useIconFallback: true },
			});
			expect(getByTestId('user-avatar-icon')).toBeTruthy();
			expect(queryByAltText('Image of lender')).toBeNull();
		});

		it('renders the avatar icon instead of the Kiva K for an anonymous lender', () => {
			const { container, getByTestId } = render(KvUserAvatar, {
				props: { lenderName: 'Anonymous', useIconFallback: true },
			});
			expect(getByTestId('user-avatar-icon')).toBeTruthy();
			expect(container.querySelector(KIVA_K)).toBeNull();
		});

		it('keeps an anonymous lender anonymous even when a custom image exists', () => {
			const { getByTestId, queryByAltText } = render(KvUserAvatar, {
				props: { lenderName: 'Anonymous', lenderImageUrl: CUSTOM_IMAGE, useIconFallback: true },
			});
			expect(getByTestId('user-avatar-icon')).toBeTruthy();
			expect(queryByAltText('Image of lender')).toBeNull();
		});

		it('still renders a custom image', () => {
			const { getByAltText, queryByTestId } = render(KvUserAvatar, {
				props: { lenderName: 'Roger', lenderImageUrl: CUSTOM_IMAGE, useIconFallback: true },
			});
			expect(getByAltText('Image of lender')).toBeTruthy();
			expect(queryByTestId('user-avatar-icon')).toBeNull();
		});

		// tw-font-serif is the half of avatarClass that survives the icon swap in the markup, so it is
		// the reliable marker for "the randomized letter styling was applied".
		it('swaps the randomized letter styling for the icon', () => {
			const { container, getByTestId } = render(KvUserAvatar, {
				props: { lenderName: 'Roger', useIconFallback: true },
			});
			expect(getByTestId('user-avatar-icon').querySelector('svg')).toBeTruthy();
			expect(container.firstChild as HTMLElement).not.toHaveClass('tw-font-serif');
		});

		it('leaves the randomized styling in place when a custom image renders', () => {
			const { container } = render(KvUserAvatar, {
				props: { lenderName: 'Roger', lenderImageUrl: CUSTOM_IMAGE, useIconFallback: true },
			});
			expect(container.firstChild as HTMLElement).toHaveClass('tw-font-serif');
		});

		it('has no accessibility violations', async () => {
			const { container } = render(KvUserAvatar, {
				props: { lenderName: 'Roger', useIconFallback: true },
			});
			expect(await axe(container)).toHaveNoViolations();
		});
	});
});
