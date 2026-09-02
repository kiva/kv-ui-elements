import { watch, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';

/**
 * Calls `onOutside` for any pointerdown outside `rootRef` while `active` is true. The document
 * listener exists only while active, and only after mount.
 */
export function useOutsidePointerDown(
	rootRef: Ref<HTMLElement | null>,
	active: Ref<boolean>,
	onOutside: () => void,
): void {
	// Calls onOutside unless the press landed inside the root.
	function onPointerDown(event: Event): void {
		if (event.target instanceof Node && rootRef.value?.contains(event.target)) return;
		onOutside();
	}

	// Adds the document listener.
	function add(): void {
		document.addEventListener('pointerdown', onPointerDown);
	}

	// Removes the document listener.
	function remove(): void {
		document.removeEventListener('pointerdown', onPointerDown);
	}

	// Listens only while active.
	watch(active, (isActive) => (isActive ? add() : remove()));

	// Starts listening when already active at mount.
	onMounted(() => {
		if (active.value) add();
	});

	// Stops listening.
	onBeforeUnmount(remove);
}
