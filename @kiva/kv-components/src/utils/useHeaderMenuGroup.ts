import {
	ref, computed, onMounted, onBeforeUnmount,
} from 'vue';
import type { Ref } from 'vue';
import { MENU_OPEN_DELAY_MS } from '#utils/headerMenuTiming';
import { useHoverIntent } from '#utils/useHoverIntent';
import { useOutsidePointerDown } from '#utils/useOutsidePointerDown';
import type { HeaderMenuState } from '#utils/useHeaderMenuState';
import type { HeaderMenuPlacement } from '#utils/useHeaderMenuPlacement';

/**
 * Attributes and listeners for a menu group's trigger button; spread onto it with v-bind.
 */
export interface TriggerAttrs {
	'aria-expanded': boolean;
	'aria-controls': string;
	onClick(): void;
	// eslint-disable-next-line no-unused-vars
	onTouchstart(event: TouchEvent): void;
}

export interface HeaderMenuGroupOptions {
	// Id of the group's panel element; also identifies the group in the shared expanded state.
	panelId: Ref<string>;
	// The group's root element, containing the trigger(s) and the panel.
	rootRef: Ref<HTMLElement | null>;
	menus: HeaderMenuState;
	placement?: HeaderMenuPlacement | null;
}

/**
 * Behavior of one menu group in KvWwwHeaderBasic's link bar: explicit expanded state derived from
 * the shared HeaderMenuState, lazy-mount `approached` flag, hover intent, dismissal (outside
 * pointerdown, focus leaving the group, Escape) and placement registration. `opened` is true while
 * the group is expanded or a hover has outlasted the intent delay.
 */
export function useHeaderMenuGroup({
	panelId, rootRef, menus, placement,
}: HeaderMenuGroupOptions) {
	const approached = ref(false);
	const hover = useHoverIntent(MENU_OPEN_DELAY_MS);
	let unregisterPlacement: (() => void) | undefined;

	const expanded = computed(() => menus.expandedId.value === panelId.value);
	const opened = computed(() => expanded.value || hover.settled.value);

	function toggle(): void {
		approached.value = true;
		menus.toggle(panelId.value);
	}

	function close(): void {
		if (expanded.value) menus.close();
	}

	useOutsidePointerDown(rootRef, expanded, close);

	function onPointerEnter(event: PointerEvent): void {
		approached.value = true;
		if (event.pointerType === 'touch') return;
		if (!expanded.value) menus.close();
		hover.enter();
	}

	function onPointerLeave(): void {
		hover.leave();
	}

	function onFocusIn(): void {
		approached.value = true;
	}

	function onFocusOut(event: FocusEvent): void {
		if (event.relatedTarget instanceof Node && rootRef.value?.contains(event.relatedTarget)) return;
		close();
	}

	function onKeydown(event: KeyboardEvent): void {
		if (event.key !== 'Escape' || !expanded.value) return;
		close();
		rootRef.value?.querySelector<HTMLElement>('[aria-expanded]')?.focus();
	}

	const trigger = computed<TriggerAttrs>(() => ({
		'aria-expanded': expanded.value,
		'aria-controls': panelId.value,
		onClick: toggle,
		onTouchstart: (event) => {
			event.preventDefault();
			toggle();
		},
	}));

	onMounted(() => {
		if (rootRef.value) unregisterPlacement = placement?.registerGroup(rootRef.value);
	});

	onBeforeUnmount(() => {
		unregisterPlacement?.();
		close();
	});

	return {
		approached,
		expanded,
		opened,
		trigger,
		toggle,
		close,
		onPointerEnter,
		onPointerLeave,
		onFocusIn,
		onFocusOut,
		onKeydown,
	};
}
