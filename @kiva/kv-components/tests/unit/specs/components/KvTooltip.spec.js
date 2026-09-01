import { fireEvent, render } from '@testing-library/vue';
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
			expect(action).toHaveClass('tooltip-action--dark');
			expect(action.style.getPropertyValue('--bg-action')).toBe('39, 106, 67');
		});
	});

	describe('dismissal', () => {
		// The action slot's content is the dismissal, so it is handed a close function.
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

		it('unmounts the tooltip when the action slot closes it', async () => {
			const { container, getByText } = renderTooltip({}, { slots: dismissibleSlot });

			await fireEvent.click(getByText('Got it'));

			expect(container.querySelector('.tooltip-pane')).toBeNull();
		});

		it('emits dismiss when the action slot closes it', async () => {
			const { emitted, getByText } = renderTooltip({}, { slots: dismissibleSlot });

			await fireEvent.click(getByText('Got it'));

			expect(emitted().dismiss).toHaveLength(1);
		});

		it('returns focus to the controller so it is not stranded on removed content', async () => {
			const { getByText } = renderTooltip({}, { slots: dismissibleSlot });

			await fireEvent.click(getByText('Got it'));

			expect(document.activeElement).toBe(document.getElementById(CONTROLLER_ID));
		});

		it('does not reopen on a later hover once dismissed', async () => {
			const { container, getByText } = renderTooltip({}, { slots: dismissibleSlot });
			await fireEvent.click(getByText('Got it'));

			await fireEvent.mouseOver(document.getElementById(CONTROLLER_ID));

			expect(container.querySelector('.tooltip-pane')).toBeNull();
		});
	});
});
