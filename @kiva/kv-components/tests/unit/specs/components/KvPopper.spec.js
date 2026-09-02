import { fireEvent, render, waitFor } from '@testing-library/vue';
import KvPopper from '#components/KvPopper.vue';

const CONTROLLER_ID = 'popper-controller';

const renderPopper = (props = {}) => {
	const controller = document.createElement('button');
	controller.id = CONTROLLER_ID;
	document.body.appendChild(controller);

	const utils = render(KvPopper, {
		props: { controller: CONTROLLER_ID, closeDelay: 0, ...props },
		slots: { default: '<button type="button">Got it</button>' },
	});

	return { ...utils, controller };
};

const panel = (container) => container.querySelector('.tw-absolute');
const isOpen = (container) => {
	const el = panel(container);
	return !!el && el.style.display !== 'none';
};

// open() awaits a dynamic import, so a state change is never same-tick. Fixed waits are
// only safe for asserting something did NOT change, and must outlast the close delay.
const waitForState = (container, open) => waitFor(() => expect(isOpen(container)).toBe(open));
const settle = () => new Promise((resolve) => { setTimeout(resolve, 250); });

describe('KvPopper', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('opens when the controller is hovered', async () => {
		const { container, controller } = renderPopper();

		await fireEvent.mouseOver(controller);

		await waitForState(container, true);
	});

	describe('transient (default)', () => {
		it('closes when the pointer leaves the controller', async () => {
			const { container, controller } = renderPopper();
			await fireEvent.mouseOver(controller);
			await waitForState(container, true);

			await fireEvent.mouseOut(controller);

			await waitForState(container, false);
		});

		it('stays open while the pointer travels into the panel (WCAG 1.4.13)', async () => {
			const { container, controller } = renderPopper();
			await fireEvent.mouseOver(controller);
			await waitForState(container, true);

			await fireEvent.mouseOut(controller);
			await fireEvent.mouseOver(panel(container));
			await settle();

			expect(isOpen(container)).toBe(true);
		});
	});

	describe('persistent', () => {
		it('does not close when the pointer leaves the controller', async () => {
			const { container, controller } = renderPopper({ persistent: true });
			await fireEvent.mouseOver(controller);
			await waitForState(container, true);

			await fireEvent.mouseOut(controller);
			await settle();

			expect(isOpen(container)).toBe(true);
		});

		it('does not close when focus leaves the controller, so the content is reachable by keyboard', async () => {
			const { container, controller } = renderPopper({ persistent: true });
			await fireEvent.focus(controller);
			await waitForState(container, true);

			await fireEvent.blur(controller);
			await settle();

			expect(isOpen(container)).toBe(true);
		});
	});

	describe.each([
		['transient', {}],
		['persistent', { persistent: true }],
	])('dismissal while %s', (_label, props) => {
		it('closes on Escape', async () => {
			const { container, controller } = renderPopper(props);
			await fireEvent.mouseOver(controller);
			await waitForState(container, true);

			await fireEvent.keyUp(document.body, { key: 'Escape' });

			await waitForState(container, false);
		});

		it('closes on a click outside itself', async () => {
			const { container, controller } = renderPopper(props);
			await fireEvent.mouseOver(controller);
			await waitForState(container, true);

			await fireEvent(document.body, new Event('pointerdown', { bubbles: true }));

			await waitForState(container, false);
		});

		it('stays open when the click is inside itself', async () => {
			const { container, controller } = renderPopper(props);
			await fireEvent.mouseOver(controller);
			await waitForState(container, true);

			await fireEvent(panel(container), new Event('pointerdown', { bubbles: true }));
			await settle();

			expect(isOpen(container)).toBe(true);
		});
	});

	it('claims Escape in the capture phase so an enclosing overlay does not also close', async () => {
		const onOverlayEscape = jest.fn();
		document.addEventListener('keyup', onOverlayEscape);
		const { container, controller } = renderPopper();
		await fireEvent.mouseOver(controller);
		await waitForState(container, true);

		await fireEvent.keyUp(document.body, { key: 'Escape' });

		await waitForState(container, false);
		expect(onOverlayEscape).not.toHaveBeenCalled();
		document.removeEventListener('keyup', onOverlayEscape);
	});

	it('re-reads persistent when it changes after mount', async () => {
		const { container, controller, rerender } = renderPopper({ persistent: true });
		await fireEvent.mouseOver(controller);
		await waitForState(container, true);

		await rerender({ controller: CONTROLLER_ID, closeDelay: 0, persistent: false });
		await fireEvent.mouseOut(controller);

		await waitForState(container, false);
	});

	it('survives a click after its controller has left the DOM', async () => {
		const { controller } = renderPopper();
		await fireEvent.mouseOver(controller);
		controller.remove();

		expect(() => {
			document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
		}).not.toThrow();
	});

	it('returns focus to the controller when Escape is pressed from inside the panel', async () => {
		const { container, controller, getByText } = renderPopper({ persistent: true });
		await fireEvent.mouseOver(controller);
		await waitForState(container, true);
		getByText('Got it').focus();

		await fireEvent.keyUp(document.body, { key: 'Escape' });

		await waitForState(container, false);
		expect(document.activeElement).toBe(controller);
	});
});
