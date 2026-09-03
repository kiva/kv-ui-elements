import { fireEvent, render, waitFor } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvTooltip from '#components/KvTooltip.vue';

const CONTROLLER_ID = 'tooltip-controller';

// KvPopper sets tabIndex on its reference during mount, so the controller has to be in
// the document before the tooltip renders.
const renderTooltip = (props = {}, options = {}) => {
	const controller = document.createElement('button');
	controller.id = CONTROLLER_ID;
	document.body.appendChild(controller);

	return render(KvTooltip, {
		props: { controller: CONTROLLER_ID, ...props },
		slots: { default: 'Tooltip body copy', ...options.slots },
	});
};

const pane = (container) => container.querySelector('.tooltip-pane');

// KvPopper emits show/hide as soon as it flips, independent of the CSS transition, which
// never resolves in jsdom.
const visibility = (utils) => (utils.emitted()['tool-tip-visible'] ?? []).map(([v]) => v);

describe('KvTooltip', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it.each(['light', 'dark'])('has no accessibility violations on the %s chip', async (variant) => {
		const { container } = renderTooltip({ variant }, {
			slots: { title: 'Tooltip title', action: '<button>Got it</button>' },
		});

		expect(await axe(container)).toHaveNoViolations();
	});

	describe('variant', () => {
		it('renders the light chip by default', () => {
			const { container } = renderTooltip();

			expect(pane(container)).toHaveClass('tooltip-pane--light', 'tw-bg-white', 'tw-text-gray-800');
		});

		it('renders the dark chip when asked for', () => {
			const { container } = renderTooltip({ variant: 'dark' });

			expect(pane(container)).toHaveClass('tooltip-pane--dark', 'tw-bg-gray-800', 'tw-text-white');
		});
	});

	describe('deprecated theme prop', () => {
		it('maps ecoGreenDark to the dark chip', () => {
			const { container } = renderTooltip({ theme: 'ecoGreenDark' });

			expect(pane(container)).toHaveClass('tooltip-pane--dark');
		});

		it.each([
			'default',
			'ecoGreenLight',
			'ecoLightMarigold',
			'ecoStoneLight',
		])('maps %s to the light chip', (theme) => {
			const { container } = renderTooltip({ theme });

			expect(pane(container)).toHaveClass('tooltip-pane--light');
		});

		it('lets variant win when both are passed', () => {
			const { container } = renderTooltip({ theme: 'ecoGreenDark', variant: 'light' });

			expect(pane(container)).toHaveClass('tooltip-pane--light');
		});
	});

	describe('slots', () => {
		it('renders body copy', () => {
			const { getByText } = renderTooltip();

			getByText('Tooltip body copy');
		});

		it('omits the title and action areas when those slots are empty', () => {
			const { container } = renderTooltip();

			expect(container.querySelector('.tooltip-action')).toBeNull();
			expect(container.querySelectorAll('.tw-p-2\\.5 > div')).toHaveLength(1);
		});

		it('renders the title and action slots when provided', () => {
			const { container, getByText } = renderTooltip({}, {
				slots: { title: 'Tooltip title', action: '<button>Got it</button>' },
			});

			getByText('Tooltip title');
			getByText('Got it');
			expect(container.querySelector('.tooltip-action')).not.toBeNull();
		});

		it('pins the default theme on the action area so buttons ignore the page theme', () => {
			const { container } = renderTooltip({ variant: 'dark' }, {
				slots: { action: '<button>Got it</button>' },
			});

			const action = container.querySelector('.tooltip-action');
			expect(action.style.getPropertyValue('--bg-action')).toBe('39, 106, 67');
		});
	});

	describe('showTooltip', () => {
		it.each([
			['without an action', {}],
			['with an action', { action: '<button>Got it</button>' }],
		])('opens and closes a tooltip %s', async (_label, slots) => {
			const utils = renderTooltip({ showTooltip: false }, { slots });

			await utils.rerender({ controller: CONTROLLER_ID, showTooltip: true });
			await waitFor(() => expect(visibility(utils)).toContain(true));

			await utils.rerender({ controller: CONTROLLER_ID, showTooltip: false });

			await waitFor(() => expect(visibility(utils)).toEqual([true, false]));
		});
	});

	describe('dismissal', () => {
		const dismissibleSlot = {
			action: `
				<template #action="{ close }">
					<button type="button" @click="close">Got it</button>
				</template>
			`,
		};

		it('hands a close function to the action slot', () => {
			const { getByText } = renderTooltip({}, { slots: dismissibleSlot });

			getByText('Got it');
		});

		it('emits dismiss when the action slot closes it', async () => {
			const { emitted, getByText } = renderTooltip({}, { slots: dismissibleSlot });

			await fireEvent.click(getByText('Got it'));

			expect(emitted().dismiss).toHaveLength(1);
		});

		it('keeps the tooltip mounted so it can be viewed again', async () => {
			const { container, getByText } = renderTooltip({}, { slots: dismissibleSlot });

			await fireEvent.click(getByText('Got it'));

			expect(container.querySelector('.tooltip-pane')).not.toBeNull();
		});

		it('lets the action do its own work alongside closing', async () => {
			const onAcknowledge = jest.fn();
			const controller = document.createElement('button');
			controller.id = CONTROLLER_ID;
			document.body.appendChild(controller);

			// A wrapper owns the handler, because slot content compiles in the parent scope.
			const { getByText } = render({
				components: { KvTooltip },
				props: { onAcknowledge: { type: Function, required: true } },
				template: `
					<kv-tooltip controller="${CONTROLLER_ID}">
						Tooltip body copy
						<template #action="{ close }">
							<button type="button" @click="onAcknowledge(); close();">Got it</button>
						</template>
					</kv-tooltip>
				`,
			}, { props: { onAcknowledge } });

			await fireEvent.click(getByText('Got it'));

			expect(onAcknowledge).toHaveBeenCalledTimes(1);
		});
	});

	// KvLightbox, KvCartModal and KvSideSheet all close on a document keyup Escape in the
	// bubble phase, so a tooltip inside one must not let a single press close both.
	describe('inside a modal', () => {
		const overlayClose = jest.fn();
		const overlayKeyUp = (e) => { if (e.key === 'Escape') overlayClose(); };

		beforeEach(() => document.addEventListener('keyup', overlayKeyUp));
		afterEach(() => {
			document.removeEventListener('keyup', overlayKeyUp);
			overlayClose.mockClear();
		});

		const openTooltip = async (slots) => {
			const utils = renderTooltip({}, { slots });
			await fireEvent.mouseOver(document.getElementById(CONTROLLER_ID));
			await waitFor(() => expect(visibility(utils)).toContain(true));
			return utils;
		};

		it.each([
			['transient', {}],
			['persistent', { action: '<button>Got it</button>' }],
		])('Escape closes an open %s tooltip and leaves the modal open', async (_label, slots) => {
			const utils = await openTooltip(slots);

			await fireEvent.keyUp(document.body, { key: 'Escape' });

			await waitFor(() => expect(visibility(utils)).toEqual([true, false]));
			expect(overlayClose).not.toHaveBeenCalled();
		});

		it('lets a second Escape through to the modal', async () => {
			const utils = await openTooltip({ action: '<button>Got it</button>' });
			await fireEvent.keyUp(document.body, { key: 'Escape' });
			await waitFor(() => expect(visibility(utils)).toEqual([true, false]));

			await fireEvent.keyUp(document.body, { key: 'Escape' });

			expect(overlayClose).toHaveBeenCalledTimes(1);
		});

		it('does not intercept Escape when no tooltip is open', async () => {
			renderTooltip();

			await fireEvent.keyUp(document.body, { key: 'Escape' });

			expect(overlayClose).toHaveBeenCalledTimes(1);
		});

		it('only intercepts Escape, not other keys', async () => {
			const onOtherKey = jest.fn();
			document.addEventListener('keyup', onOtherKey);
			await openTooltip({});

			await fireEvent.keyUp(document.body, { key: 'a' });

			expect(onOtherKey).toHaveBeenCalled();
			document.removeEventListener('keyup', onOtherKey);
		});
	});
});
