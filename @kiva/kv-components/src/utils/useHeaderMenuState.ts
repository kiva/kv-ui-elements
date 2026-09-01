import { ref, readonly } from 'vue';
import type { InjectionKey, Ref } from 'vue';

export interface HeaderMenuState {
	// Panel id of the group that is explicitly expanded, if any.
	expandedId: Readonly<Ref<string | null>>;
	// eslint-disable-next-line no-unused-vars
	toggle(id: string): void;
	close(): void;
}

export const HEADER_MENU_STATE: InjectionKey<HeaderMenuState> = Symbol('headerMenuState');

/**
 * The one piece of menu state shared across KvWwwHeaderBasic's menu groups: which group, if any,
 * is explicitly expanded. LinkBar provides it under HEADER_MENU_STATE; each HeaderMenuGroup
 * injects it and derives its own aria-expanded binding from it.
 */
export function useHeaderMenuState(): HeaderMenuState {
	const expandedId = ref<string | null>(null);

	function toggle(id: string): void {
		expandedId.value = expandedId.value === id ? null : id;
	}

	function close(): void {
		expandedId.value = null;
	}

	return { expandedId: readonly(expandedId), toggle, close };
}
