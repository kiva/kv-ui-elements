import { onMounted, onBeforeUnmount } from 'vue';
import type { InjectionKey, Ref } from 'vue';

export interface HeaderMenuPlacement {
	// Adds a menu group to the placement pass; the returned function removes it again.
	// eslint-disable-next-line no-unused-vars
	registerGroup(el: HTMLElement): () => void;
}

export const HEADER_MENU_PLACEMENT: InjectionKey<HeaderMenuPlacement> = Symbol('headerMenuPlacement');

/**
 * Placement pass for KvWwwHeaderBasic's menus: writes --nav-height on the bar and
 * --trigger-gap-left/right plus --trigger-width on each registered menu group, measured against
 * the nav (the bar's offset parent). One ResizeObserver watches the nav, the bar's direct children
 * and each registered group. LinkBar provides the result under HEADER_MENU_PLACEMENT; each
 * HeaderMenuGroup registers its root on mount.
 */
export function useHeaderMenuPlacement(rootRef: Ref<HTMLElement | null>): HeaderMenuPlacement {
	const groups = new Set<HTMLElement>();
	let observer: ResizeObserver | null = null;

	// Reads the nav and group rectangles, then writes --nav-height on the bar and the --trigger-* variables on each group.
	function measure(): void {
		const root = rootRef.value;
		const nav = root?.offsetParent;
		if (!root || !(nav instanceof HTMLElement)) return;
		const navRect = nav.getBoundingClientRect();
		const groupRects = Array.from(groups, (group) => [group, group.getBoundingClientRect()] as const);
		root.style.setProperty('--nav-height', `${navRect.height}px`);
		groupRects.forEach(([group, rect]) => {
			const centerX = rect.left + rect.width / 2;
			group.style.setProperty('--trigger-gap-left', `${centerX - navRect.left}px`);
			group.style.setProperty('--trigger-gap-right', `${navRect.right - centerX}px`);
			group.style.setProperty('--trigger-width', `${rect.width}px`);
		});
	}

	// Adds the group to the measured set and observes it; the returned function reverses both.
	function registerGroup(el: HTMLElement): () => void {
		groups.add(el);
		observer?.observe(el);
		return () => {
			groups.delete(el);
			observer?.unobserve(el);
		};
	}

	// Creates the observer over the nav, the bar's direct children and the groups registered so far, then measures once.
	onMounted(() => {
		const root = rootRef.value;
		const nav = root?.offsetParent;
		if (typeof ResizeObserver !== 'undefined' && root && nav instanceof HTMLElement) {
			observer = new ResizeObserver(measure);
			observer.observe(nav);
			Array.from(root.children).forEach((child) => observer?.observe(child));
			groups.forEach((group) => observer?.observe(group));
		}
		measure();
	});

	// Disconnects the observer.
	onBeforeUnmount(() => {
		observer?.disconnect();
		observer = null;
	});

	return { registerGroup };
}
