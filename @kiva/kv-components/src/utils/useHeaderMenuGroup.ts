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
	// eslint-disable-next-line no-unused-vars
	onClick(event: Event): void;
}

export interface HeaderMenuGroupOptions {
	// Id of the group's panel element; also identifies the group in the shared toggled state.
	panelId: Ref<string>;
	// The group's root element, containing the trigger(s) and the panel.
	rootRef: Ref<HTMLElement | null>;
	menus: HeaderMenuState;
	placement?: HeaderMenuPlacement | null;
}

/**
 * Behavior of one menu group in KvWwwHeaderBasic's link bar. `toggled` is true while this group is
 * the one the user toggled open in the shared HeaderMenuState; `expanded` is true while the group
 * is toggled or a mouse hover has outlasted the intent delay, and is what the trigger's
 * aria-expanded reports and what the open/close transitions follow. Also owns the lazy-mount
 * `approached` flag, dismissal (outside pointerdown, focus leaving the group, Escape) and placement
 * registration. `toggle` accepts the activating event: from a link it toggles only for touch
 * pointers, preventing the navigation, and otherwise lets the link navigate.
 */
export function useHeaderMenuGroup({
	panelId, rootRef, menus, placement,
}: HeaderMenuGroupOptions) {
	const approached = ref(false);
	const hover = useHoverIntent(MENU_OPEN_DELAY_MS);
	let unregisterPlacement: (() => void) | undefined;

	// True while this group is the one recorded as toggled in the shared state.
	const toggled = computed(() => menus.toggledId.value === panelId.value);
	// True while toggled or while a mouse hover has outlasted the intent delay.
	const expanded = computed(() => toggled.value || hover.settled.value);

	// Marks the group approached and flips its toggled state. From a link, only for touch pointers, preventing the navigation.
	function toggle(event?: Event): void {
		const link = event?.currentTarget instanceof HTMLAnchorElement && event.currentTarget.hasAttribute('href');
		if (link) {
			if (menus.pointerType.value !== 'touch') return;
			event.preventDefault();
		}
		approached.value = true;
		menus.toggle(panelId.value);
	}

	// Clears the toggled state when this group holds it.
	function close(): void {
		if (toggled.value) menus.close();
	}

	useOutsidePointerDown(rootRef, toggled, close);

	// Marks the group approached; for non-touch pointers, clears any other toggled group and starts the hover intent timer.
	function onPointerEnter(event: PointerEvent): void {
		approached.value = true;
		if (event.pointerType === 'touch') return;
		if (!toggled.value) menus.close();
		hover.enter();
	}

	// Cancels hover intent.
	function onPointerLeave(): void {
		hover.leave();
	}

	// Marks the group approached.
	function onFocusIn(): void {
		approached.value = true;
	}

	// Clears the toggled state when focus moves to an element outside the group.
	function onFocusOut(event: FocusEvent): void {
		if (!(event.relatedTarget instanceof Element)) return;
		if (rootRef.value?.contains(event.relatedTarget)) return;
		close();
	}

	// On Escape while toggled, clears the toggled state and focuses the trigger.
	function onKeydown(event: KeyboardEvent): void {
		if (event.key !== 'Escape' || !toggled.value) return;
		close();
		rootRef.value?.querySelector<HTMLElement>('[aria-expanded]')?.focus();
	}

	// Attributes and click handler for the trigger button.
	const trigger = computed<TriggerAttrs>(() => ({
		'aria-expanded': expanded.value,
		'aria-controls': panelId.value,
		onClick: toggle,
	}));

	// Registers the root for placement and marks the group approached if the pointer is already over it.
	onMounted(() => {
		const root = rootRef.value;
		if (!root) return;
		unregisterPlacement = placement?.registerGroup(root);
		if (root.matches(':hover')) approached.value = true;
	});

	// Unregisters from placement and clears this group's toggled state.
	onBeforeUnmount(() => {
		unregisterPlacement?.();
		close();
	});

	return {
		approached,
		toggled,
		expanded,
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
