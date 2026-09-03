import { ref, readonly } from 'vue';
import type { InjectionKey, Ref } from 'vue';
import type { PointerType } from '#utils/usePointerType';

export interface HeaderMenuState {
	// Panel id of the group the user toggled open, if any.
	toggledId: Readonly<Ref<string | null>>;
	// Type of the pointer most recently used over the bar; null before mount.
	pointerType: Readonly<Ref<PointerType | null>>;
	// eslint-disable-next-line no-unused-vars
	toggle(id: string): void;
	close(): void;
}

export const HEADER_MENU_STATE: InjectionKey<HeaderMenuState> = Symbol('headerMenuState');

/**
 * Menu state shared across KvWwwHeaderBasic's menu groups: which group, if any, the user toggled
 * open, and the current pointer type. LinkBar provides it under HEADER_MENU_STATE; each
 * HeaderMenuGroup injects it and derives its own toggled state from it.
 */
export function useHeaderMenuState(pointerType: Readonly<Ref<PointerType | null>>): HeaderMenuState {
	const toggledId = ref<string | null>(null);

	// Records `id` as toggled, or clears it when it is already the toggled one.
	function toggle(id: string): void {
		toggledId.value = toggledId.value === id ? null : id;
	}

	// Clears the toggled group.
	function close(): void {
		toggledId.value = null;
	}

	return {
		toggledId: readonly(toggledId), pointerType, toggle, close,
	};
}
