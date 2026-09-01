import { onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';

/**
 * Placement pass for KvWwwHeaderBasic's menus: writes --nav-height on the bar and
 * --trigger-gap-left/right plus --trigger-width on each .menu-group, measured against the nav
 * (the bar's offset parent). One ResizeObserver watching the nav, the right cluster, and each
 * group keeps the variables fresh; refreshPlacement() re-collects the observed groups.
 */
export function useHeaderMenuPlacement(rootRef: Ref<HTMLElement | null>) {
	let placementObserver: ResizeObserver | null = null;

	function measurePlacement(): void {
		const root = rootRef.value;
		const nav = root?.offsetParent;
		if (!root || !(nav instanceof HTMLElement)) return;
		const navRect = nav.getBoundingClientRect();
		root.style.setProperty('--nav-height', `${navRect.height}px`);
		root.querySelectorAll<HTMLElement>('.menu-group').forEach((group) => {
			const rect = group.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			group.style.setProperty('--trigger-gap-left', `${centerX - navRect.left}px`);
			group.style.setProperty('--trigger-gap-right', `${navRect.right - centerX}px`);
			group.style.setProperty('--trigger-width', `${rect.width}px`);
		});
	}

	function observePlacement(): void {
		if (!placementObserver) return;
		const root = rootRef.value;
		const nav = root?.offsetParent;
		if (!root || !(nav instanceof HTMLElement)) return;
		placementObserver.disconnect();
		placementObserver.observe(nav);
		const rightCluster = root.querySelector('.link-bar__right');
		if (rightCluster) placementObserver.observe(rightCluster);
		root.querySelectorAll('.menu-group').forEach((group) => placementObserver?.observe(group));
	}

	function refreshPlacement(): void {
		observePlacement();
		measurePlacement();
	}

	onMounted(() => {
		if (typeof ResizeObserver !== 'undefined') {
			placementObserver = new ResizeObserver(measurePlacement);
			observePlacement();
		}
		measurePlacement();
	});

	onBeforeUnmount(() => {
		placementObserver?.disconnect();
		placementObserver = null;
	});

	return { refreshPlacement };
}
