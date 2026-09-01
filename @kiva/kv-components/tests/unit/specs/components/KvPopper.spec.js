import { fireEvent, render } from '@testing-library/vue';
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

// open() resolves a dynamic import of popper.js before it shows, so opening and
// closing both need a turn of the event loop rather than just a tick.
const settle = () => new Promise((resolve) => { setTimeout(resolve, 30); });

describe('KvPopper', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('opens when the controller is hovered', async () => {
		const { container, controller } = renderPopper();

		await fireEvent.mouseOver(controller);
		await settle();

		expect(isOpen(container)).toBe(true);
	});

	describe('transient (default)', () => {
		it('closes when the pointer leaves the controller', async () => {
			const { container, controller } = renderPopper();
			await fireEvent.mouseOver(controller);
			await settle();

			await fireEvent.mouseOut(controller);
			await settle();

			expect(isOpen(container)).toBe(false);
		});

		it('stays open while the pointer travels into the panel (WCAG 1.4.13)', async () => {
			const { container, controller } = renderPopper();
			await fireEvent.mouseOver(controller);
			await settle();

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
			await settle();

			await fireEvent.mouseOut(controller);
			await settle();

			expect(isOpen(container)).toBe(true);
		});

		it('does not close when focus leaves the controller, so the content is reachable by keyboard', async () => {
			const { container, controller } = renderPopper({ persistent: true });
			await fireEvent.focus(controller);
			await settle();

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
			await settle();

			await fireEvent.keyDown(document, { key: 'Escape' });
			await settle();

			expect(isOpen(container)).toBe(false);
		});

		it('closes on a click outside itself', async () => {
			const { container, controller } = renderPopper(props);
			await fireEvent.mouseOver(controller);
			await settle();

			await fireEvent(document.body, new Event('pointerdown', { bubbles: true }));
			await settle();

			expect(isOpen(container)).toBe(false);
		});

		it('stays open when the click is inside itself', async () => {
			const { container, controller } = renderPopper(props);
			await fireEvent.mouseOver(controller);
			await settle();

			await fireEvent(panel(container), new Event('pointerdown', { bubbles: true }));
			await settle();

			expect(isOpen(container)).toBe(true);
		});
	});

	it('returns focus to the controller when Escape is pressed from inside the panel', async () => {
		const { container, controller, getByText } = renderPopper({ persistent: true });
		await fireEvent.mouseOver(controller);
		await settle();
		getByText('Got it').focus();

		await fireEvent.keyDown(document, { key: 'Escape' });
		await settle();

		expect(isOpen(container)).toBe(false);
		expect(document.activeElement).toBe(controller);
	});
});
