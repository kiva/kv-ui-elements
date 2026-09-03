import { defineComponent, provide, ref } from 'vue';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import HeaderMenuGroup from '#components/KvWwwHeaderBasic/HeaderMenuGroup.vue';
import { useHeaderMenuState, HEADER_MENU_STATE } from '#utils/useHeaderMenuState';
import type { PointerType } from '#utils/usePointerType';

// Hosts one group under a provided menu state, with a trigger button and a panel button bound to
// the panel slot's close.
function renderGroup() {
	const state = useHeaderMenuState(ref<PointerType | null>('mouse'));
	const onOpen = jest.fn();
	const onClose = jest.fn();
	const Host = defineComponent({
		components: { HeaderMenuGroup },
		setup() {
			provide(HEADER_MENU_STATE, state);
			return { onOpen, onClose };
		},
		template: `
			<header-menu-group panel-id="panel-x" @open="onOpen" @close="onClose">
				<template #default="{ trigger }">
					<button v-bind="trigger" type="button">Open</button>
				</template>
				<template #panel="{ close }">
					<button type="button" @click="close">Done</button>
				</template>
			</header-menu-group>
		`,
	});
	const utils = render(Host);
	return {
		...utils, state, onOpen, onClose, trigger: utils.getByRole('button', { name: 'Open' }),
	};
}

describe('HeaderMenuGroup', () => {
	afterEach(() => {
		jest.useRealTimers();
	});

	it('emits open when the trigger expands it and close when the trigger collapses it', async () => {
		const user = userEvent.setup();
		const { trigger, onOpen, onClose } = renderGroup();
		await user.pointer({ keys: '[TouchA]', target: trigger });
		expect(onOpen).toHaveBeenCalledTimes(1);
		expect(onClose).not.toHaveBeenCalled();
		await user.pointer({ keys: '[TouchA]', target: trigger });
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('collapses and emits close when the panel slot calls close', async () => {
		const user = userEvent.setup();
		const { trigger, getByRole, onClose } = renderGroup();
		await user.pointer({ keys: '[TouchA]', target: trigger });
		await user.pointer({ keys: '[TouchA]', target: getByRole('button', { name: 'Done' }) });
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('emits open once for a mouse hover that outlasts the intent delay, and close when it ends', async () => {
		jest.useFakeTimers();
		const user = userEvent.setup({ delay: null });
		const { trigger, onOpen, onClose } = renderGroup();
		const group = trigger.closest('.menu-group') as HTMLElement;
		await user.hover(group);
		jest.advanceTimersByTime(100);
		expect(onOpen).toHaveBeenCalledTimes(1);
		await user.unhover(group);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('emits close and clears the shared state when unmounted while toggled', async () => {
		const {
			trigger, unmount, state, onClose,
		} = renderGroup();
		await userEvent.setup().pointer({ keys: '[TouchA]', target: trigger });
		unmount();
		expect(onClose).toHaveBeenCalledTimes(1);
		expect(state.toggledId.value).toBeNull();
	});

	it('renders the panel element before the group is approached and its content only after', async () => {
		const { trigger, queryByRole } = renderGroup();
		expect(document.getElementById('panel-x')).not.toBeNull();
		expect(queryByRole('button', { name: 'Done' })).toBeNull();
		await userEvent.setup().pointer({ keys: '[TouchA]', target: trigger });
		expect(queryByRole('button', { name: 'Done' })).not.toBeNull();
	});
});
