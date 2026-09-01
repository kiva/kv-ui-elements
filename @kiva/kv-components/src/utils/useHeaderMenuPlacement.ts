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

	function registerGroup(el: HTMLElement): () => void {
		groups.add(el);
		observer?.observe(el);
		return () => {
			groups.delete(el);
			observer?.unobserve(el);
		};
	}

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

	onBeforeUnmount(() => {
		observer?.disconnect();
		observer = null;
	});

	return { registerGroup };
}
