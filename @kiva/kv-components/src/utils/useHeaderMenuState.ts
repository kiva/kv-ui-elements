import {
	ref, reactive, onMounted, onBeforeUnmount,
} from 'vue';
import type { Ref } from 'vue';

// Hover-intent open delay: the menu stylesheets' transition delays (via v-bind) and the hover
// analytics timer below both derive from it.
export const MENU_OPEN_DELAY_MS = 100;

// Duration of the closing fade; a closed panel hides once the close grace plus this fade elapse.
export const MENU_CLOSE_FADE_MS = 100;

export interface HeaderMenuStateOptions {
	groupIds: string[];
	rootRef: Ref<HTMLElement | null>;
	// eslint-disable-next-line no-unused-vars
	trackOpen?(id: string): void;
	// eslint-disable-next-line no-unused-vars
	trackClose?(id: string): void;
}

/**
 * Menu open/close state for KvWwwHeaderBasic's link bar. One piece of state exists — which
 * trigger, if any, is explicitly open — and its only rendered form is the aria-expanded binding
 * the menu stylesheet selects on. Also owns the lazy-mount `approached` flags, the outside-tap
 * document listener, and the open-tracking dedupe feeding trackOpen/trackClose.
 */
export function useHeaderMenuState({
	groupIds, rootRef, trackOpen, trackClose,
}: HeaderMenuStateOptions) {
	// Which trigger, if any, is explicitly open.
	const expandedItem = ref<string | null>(null);

	// Menu groups whose panel has been mounted (first pointerenter/focusin/touchstart on the group).
	const approached = reactive<Record<string, boolean>>(
		Object.fromEntries(groupIds.map((id) => [id, false])),
	);

	const triggerRefs: Record<string, Ref<HTMLElement | null>> = Object.fromEntries(
		groupIds.map((id) => [id, ref<HTMLElement | null>(null)]),
	);

	// Open-tracking dedupe flags: set when a group's open has been counted, cleared on hover-out
	// and on every close path.
	const counted: Record<string, boolean> = Object.fromEntries(groupIds.map((id) => [id, false]));
	const hoverTimers: Record<string, ReturnType<typeof setTimeout> | undefined> = {};

	function trackMenuOpenOnce(id: string): void {
		if (counted[id]) return;
		counted[id] = true;
		trackOpen?.(id);
	}

	function isExpanded(id: string): 'true' | 'false' {
		return expandedItem.value === id ? 'true' : 'false';
	}

	function clearExpanded(): void {
		if (!expandedItem.value) return;
		counted[expandedItem.value] = false;
		expandedItem.value = null;
	}

	function toggleExpanded(id: string): void {
		if (expandedItem.value === id) {
			trackClose?.(id);
			clearExpanded();
		} else {
			if (expandedItem.value) counted[expandedItem.value] = false;
			trackMenuOpenOnce(id);
			expandedItem.value = id;
		}
	}

	// Taps anywhere but a menu panel dismiss the open menu; taps inside a menu group are left
	// to that group's trigger toggle.
	function onDocumentTouchStart(event: Event): void {
		if (!expandedItem.value) return;
		const target = event.target instanceof Element ? event.target : null;
		const within = target?.closest('.menu-panel, .menu-group');
		if (within && rootRef.value?.contains(within)) return;
		clearExpanded();
	}

	function approachGroup(id: string): void {
		approached[id] = true;
	}

	// Hover opens are counted by a per-group timer matching the CSS open delay; leaving the
	// group before it fires cancels the count, and leaving at all re-arms it. Hovering a group
	// also clears any other group's explicitly-expanded state.
	function onGroupMouseEnter(id: string): void {
		if (expandedItem.value && expandedItem.value !== id) clearExpanded();
		clearTimeout(hoverTimers[id]);
		hoverTimers[id] = setTimeout(() => {
			if (expandedItem.value !== id) trackMenuOpenOnce(id);
		}, MENU_OPEN_DELAY_MS);
	}

	function onGroupMouseLeave(id: string): void {
		clearTimeout(hoverTimers[id]);
		hoverTimers[id] = undefined;
		if (expandedItem.value !== id) counted[id] = false;
	}

	function onGroupKeydown(id: string, event: KeyboardEvent): void {
		if (event.key !== 'Escape' || expandedItem.value !== id) return;
		clearExpanded();
		triggerRefs[id]?.value?.focus();
	}

	function onGroupFocusOut(id: string, event: FocusEvent): void {
		const group = event.currentTarget as HTMLElement;
		if (event.relatedTarget instanceof Node && group.contains(event.relatedTarget)) return;
		if (expandedItem.value === id) clearExpanded();
	}

	function menuGroupEvents(id: string) {
		return {
			pointerenter: () => approachGroup(id),
			focusin: () => approachGroup(id),
			touchstart: () => approachGroup(id),
			mouseenter: () => onGroupMouseEnter(id),
			mouseleave: () => onGroupMouseLeave(id),
			keydown: (event: KeyboardEvent) => onGroupKeydown(id, event),
			focusout: (event: FocusEvent) => onGroupFocusOut(id, event),
		};
	}

	onMounted(() => {
		document.addEventListener('touchstart', onDocumentTouchStart);
	});

	onBeforeUnmount(() => {
		document.removeEventListener('touchstart', onDocumentTouchStart);
		Object.values(hoverTimers).forEach((timer) => clearTimeout(timer));
	});

	return {
		expandedItem,
		approached,
		triggerRefs,
		isExpanded,
		clearExpanded,
		toggleExpanded,
		menuGroupEvents,
	};
}
