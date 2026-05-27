import { ref, shallowRef, type CSSProperties } from 'vue';
import { debounce } from '#utils/debounce';

/**
 * Dropdown/drawer open-close coordination extracted from KvWwwHeader.vue.
 * `setMenu` is debounced (mirrors the original `onHover`) so brief hover gaps don't flicker the menu.
 * The orchestrator calls `markMounted()` on mount so menus aren't opened during SSR/hydration.
 */
export function useHeaderBasicMenuState() {
	const activeHeaderItem = ref<string | null>(null);
	const menuOpen = ref(false);
	const menuComponent = shallowRef<unknown>(null);
	const menuItem = ref<string | null>(null);
	const menuPosition = ref<CSSProperties>({ left: 0, position: 'relative' });
	const isComponentMount = ref(false);

	const setMenu = debounce((item?: string, menu?: unknown, targetPosition?: CSSProperties) => {
		// Defer until the host component has mounted.
		if (!isComponentMount.value) return;
		if (menu) {
			menuItem.value = item ?? null;
			// Avoid recalculating menuPosition when hovering within the already-open menu.
			if (menuComponent.value !== menu) {
				menuPosition.value = { left: 0, position: 'relative' };
			}
			menuComponent.value = menu;
			menuOpen.value = true;
			if (targetPosition) {
				menuPosition.value = { ...targetPosition, position: 'absolute' };
			}
		} else if (menuOpen.value) {
			menuOpen.value = false;
			menuComponent.value = null;
		}
	}, 100);

	function markMounted(): void {
		isComponentMount.value = true;
	}

	return {
		activeHeaderItem, menuOpen, menuComponent, menuItem, menuPosition, setMenu, markMounted,
	};
}
