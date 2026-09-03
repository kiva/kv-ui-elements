import { ref, onBeforeUnmount } from 'vue';

/**
 * Hover-intent timer: `settled` turns true once `enter()` has gone `delayMs` without a `leave()`,
 * and false again on `leave()`.
 */
export function useHoverIntent(delayMs: number) {
	const settled = ref(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	// Restarts the delay timer; `settled` turns true when it fires.
	function enter(): void {
		clearTimeout(timer);
		timer = setTimeout(() => { settled.value = true; }, delayMs);
	}

	// Cancels the timer and clears `settled`.
	function leave(): void {
		clearTimeout(timer);
		settled.value = false;
	}

	// Drops a pending timer.
	onBeforeUnmount(() => clearTimeout(timer));

	return { settled, enter, leave };
}
