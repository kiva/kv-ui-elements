import {
	ref,
	watch,
	onUnmounted,
	type Ref,
} from 'vue';

/**
 * Cubic ease-in-out function.
 */
export function easeInOutCubic(t: number): number {
	return t < 0.5
		? 4 * t * t * t
		: 1 - (-2 * t + 2) ** 3 / 2;
}

/**
 * Composable that animates a number from 0 to a target value (or back to 0)
 * using requestAnimationFrame with cubic ease-in-out easing.
 *
 * @param target - Reactive ref of the target number to animate toward
 * @param active - Reactive ref controlling animation direction (true = animate to target, false = animate to 0)
 * @param duration - Animation duration in milliseconds (default: 500)
 * @returns Object with displayValue ref containing the current animated number
 */
export function useCountUp(target: Ref<number>, active: Ref<boolean>, duration = 500) {
	const displayValue = ref(0);
	let rafId: number | null = null;
	let startTime: number | null = null;
	let startValue = 0;

	function animate(endValue: number) {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
		}
		startTime = null;
		startValue = displayValue.value;

		function step(timestamp: number) {
			if (startTime === null) {
				startTime = timestamp;
			}
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const eased = easeInOutCubic(progress);

			displayValue.value = Math.round(startValue + (endValue - startValue) * eased);

			if (progress < 1) {
				rafId = requestAnimationFrame(step);
			} else {
				rafId = null;
			}
		}

		rafId = requestAnimationFrame(step);
	}

	watch(active, (isActive) => {
		animate(isActive ? target.value : 0);
	}, { immediate: true });

	watch(target, (newTarget) => {
		if (active.value) {
			animate(newTarget);
		}
	});

	onUnmounted(() => {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
		}
	});

	return { displayValue };
}
