import { nextTick } from 'vue';
import { render, screen, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import KvLightbox from '#components/KvLightbox.vue';

// The backdrop ("screen") behind the lightbox
const getBackdrop = (container) => container.querySelector('.tw-z-modal');

const getCloseButton = () => screen.getByRole('button', { name: 'Close' });

const renderLightbox = (props = {}) => render(KvLightbox, {
	props: { title: 'Lightbox Title', visible: true, ...props },
});

const advanceTimers = async (ms) => {
	jest.advanceTimersByTime(ms);
	await nextTick();
};

const expectHidden = (button) => expect(button).toHaveClass('tw-invisible', 'tw-opacity-0');

const expectShown = (button) => {
	expect(button).not.toHaveClass('tw-invisible');
	expect(button).not.toHaveClass('tw-opacity-0');
};

describe('KvLightbox', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = render(KvLightbox,
			{
				props: { title: 'Lightbox Title' },
			});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('fire close emit once', async () => {
		const { emitted } = render(KvLightbox,
			{
				props: { title: 'Lightbox Title', visible: true },
			});

		const button = screen.getByRole('button');
		await userEvent.click(button);
		expect(emitted()).toHaveProperty('lightbox-closed');
		expect(emitted).toBeTruthy();
		expect(emitted.length).toBe(1); // Ensures it fired only once
	});

	it('closes on backdrop click by default', async () => {
		const { container, emitted } = renderLightbox();

		await fireEvent.click(getBackdrop(container));

		expect(emitted()['lightbox-closed']).toEqual([[{ type: 'background-click' }]]);
	});

	describe('preventBackgroundClose', () => {
		it('does not close on backdrop click', async () => {
			const { container, emitted } = renderLightbox({ preventBackgroundClose: true });

			await fireEvent.click(getBackdrop(container));

			expect(emitted()['lightbox-closed']).toBeUndefined();
		});

		it('still closes with the close X', async () => {
			const { emitted } = renderLightbox({ preventBackgroundClose: true });

			await fireEvent.click(getCloseButton());

			expect(emitted()['lightbox-closed']).toEqual([[{ type: 'close-x' }]]);
		});

		it('still closes with the ESC key', async () => {
			const { emitted } = renderLightbox({ preventBackgroundClose: true });

			await fireEvent.keyUp(document, { key: 'Escape' });

			expect(emitted()['lightbox-closed']).toHaveLength(1);
		});
	});

	describe('closeButtonShowDelay', () => {
		beforeEach(() => {
			jest.useFakeTimers();
		});

		afterEach(() => {
			jest.useRealTimers();
		});

		it('shows the close X immediately when the delay is 0', () => {
			renderLightbox();

			expectShown(getCloseButton());
		});

		it('adds no transition classes when the delay is 0', () => {
			renderLightbox();

			expect(getCloseButton()).not.toHaveClass('tw-transition-opacity');
		});

		it('fades the close X in, without motion for reduced-motion users', () => {
			renderLightbox({ closeButtonShowDelay: 3500 });

			expect(getCloseButton()).toHaveClass('tw-transition-opacity', 'motion-reduce:tw-transition-none');
		});

		it('hides the close X until the delay has passed', async () => {
			renderLightbox({ closeButtonShowDelay: 3500 });
			const closeButton = getCloseButton();

			expectHidden(closeButton);

			await advanceTimers(3499);
			expectHidden(closeButton);

			await advanceTimers(1);
			expectShown(closeButton);
		});

		it('restarts the delay when the lightbox is closed and reopened', async () => {
			const { rerender } = renderLightbox({ closeButtonShowDelay: 1000 });
			const closeButton = getCloseButton();

			await advanceTimers(1000);
			expectShown(closeButton);

			await rerender({ visible: false });
			await rerender({ visible: true });
			expectHidden(closeButton);

			await advanceTimers(999);
			expectHidden(closeButton);

			await advanceTimers(1);
			expectShown(closeButton);
		});

		it('does not reveal the close X from a timer started before closing', async () => {
			const { rerender } = renderLightbox({ closeButtonShowDelay: 1000 });

			await advanceTimers(600);
			await rerender({ visible: false });
			await rerender({ visible: true });

			// a timer left over from the first open would fire here
			await advanceTimers(400);
			expectHidden(getCloseButton());
		});

		it('keeps the close X visible when a delay is set while the lightbox is already open', async () => {
			const { rerender } = renderLightbox();

			await rerender({ closeButtonShowDelay: 3500 });

			expectShown(getCloseButton());
		});

		it('clears the pending timer on unmount', async () => {
			const { unmount } = renderLightbox({ closeButtonShowDelay: 1000 });

			unmount();

			expect(jest.getTimerCount()).toBe(0);
		});

		it('still closes with the ESC key during the delay', async () => {
			const { emitted } = renderLightbox({ closeButtonShowDelay: 3500 });

			await fireEvent.keyUp(document, { key: 'Escape' });

			expect(emitted()['lightbox-closed']).toHaveLength(1);
		});

		it('renders no close X when preventClose is set', () => {
			renderLightbox({ closeButtonShowDelay: 3500, preventClose: true });

			expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
		});
	});
});
