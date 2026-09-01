import { ref, onBeforeUnmount } from 'vue';

/**
 * Hover-intent timer: `settled` turns true once `enter()` has gone `delayMs` without a `leave()`,
 * and false again on `leave()`.
 */
export function useHoverIntent(delayMs: number) {
	const settled = ref(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	function enter(): void {
		clearTimeout(timer);
		timer = setTimeout(() => { settled.value = true; }, delayMs);
	}

	function leave(): void {
		clearTimeout(timer);
		settled.value = false;
	}

	onBeforeUnmount(() => clearTimeout(timer));

	return { settled, enter, leave };
}
