import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';

// https://w3c.github.io/pointerevents/#dom-pointerevent-pointertype
export type PointerType = 'mouse' | 'pen' | 'touch';

/**
 * Tracks the type of the pointer most recently used over `rootRef`. Starts from the device's
 * hover capability on mount (no hover means touch) and follows every pointerdown and pointermove
 * inside the root after that. Null until mounted, so server markup carries no pointer type.
 */
export function usePointerType(rootRef: Ref<HTMLElement | null>) {
	const pointerType = ref<PointerType | null>(null);

	// Records the event's pointer type when it differs from the current one.
	function onPointer(event: Event): void {
		const type = (event as PointerEvent).pointerType as PointerType | undefined;
		if (type && type !== pointerType.value) pointerType.value = type;
	}

	// Seeds the type from the hover media query and listens for pointer events inside the root.
	onMounted(() => {
		const hoverless = typeof window.matchMedia === 'function' && window.matchMedia('(hover: none)').matches;
		pointerType.value = hoverless ? 'touch' : 'mouse';
		rootRef.value?.addEventListener('pointerdown', onPointer, { capture: true, passive: true });
		rootRef.value?.addEventListener('pointermove', onPointer, { capture: true, passive: true });
	});

	// Removes the root listeners.
	onBeforeUnmount(() => {
		rootRef.value?.removeEventListener('pointerdown', onPointer, { capture: true });
		rootRef.value?.removeEventListener('pointermove', onPointer, { capture: true });
	});

	return { pointerType };
}
