import { watch, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';

/**
 * Calls `onOutside` for any pointerdown outside `rootRef` while `active` is true. The document
 * listener exists only while active.
 */
export function useOutsidePointerDown(
	rootRef: Ref<HTMLElement | null>,
	active: Ref<boolean>,
	onOutside: () => void,
): void {
	function onPointerDown(event: Event): void {
		if (event.target instanceof Node && rootRef.value?.contains(event.target)) return;
		onOutside();
	}

	function remove(): void {
		document.removeEventListener('pointerdown', onPointerDown);
	}

	watch(active, (isActive) => {
		if (isActive) document.addEventListener('pointerdown', onPointerDown);
		else remove();
	}, { immediate: true });

	onBeforeUnmount(remove);
}
