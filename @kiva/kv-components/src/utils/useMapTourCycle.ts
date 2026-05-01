import {
	ref,
	watch,
	onBeforeUnmount,
	type Ref,
} from 'vue';

export interface MapTourCycleOptions {
	/** Delay before the first pan begins (ms). */
	initialDelay?: number;
	/** Duration of each pan animation (ms). Highlight + popup appear after this. */
	panDuration?: number;
	/** Time spent dwelling on each country after the pan settles (ms). */
	holdPerStep?: number;
	/** How long before the next pan begins to hide the current popup (ms). */
	popupHideBefore?: number;
	/** After the final country, time spent showing the full overview before fading (ms). */
	holdAll?: number;
	/** Duration of the highlight fade-out at the end of the cycle (ms). */
	fadeDuration?: number;
}

export interface MapTourCycleControls {
	/** -1 = overview view; 0..n-1 = focused on countries[panIdx]. */
	panIdx: Ref<number>;
	/** Set of country IDs that have been highlighted so far this cycle. */
	highlighted: Ref<Set<string>>;
	/** -1 = no popup; otherwise index in countries. */
	showPopupIdx: Ref<number>;
	/** Whether the tour is currently running. */
	isRunning: Ref<boolean>;
	/** Start (or restart) the cycle. Idempotent if already running. */
	start: () => void;
	/** Stop the cycle and reset state to the overview view with no highlights. */
	stop: () => void;
}

const DEFAULTS: Required<MapTourCycleOptions> = {
	initialDelay: 1000,
	panDuration: 1200,
	holdPerStep: 2000,
	popupHideBefore: 350,
	holdAll: 2000,
	fadeDuration: 500,
};

/**
 * Drives the scripted tour state for KvSimpleMap: pans through a list of
 * countries, accumulating highlights and surfacing a popup at each stop.
 *
 * Owns its own timer set and clears it on stop()/unmount. Component code
 * should treat panIdx/highlighted/showPopupIdx as read-only outputs and use
 * start()/stop() to drive the lifecycle.
 *
 * @param countries - Reactive list of countries to cycle through. The cycle
 *   is keyed by index, so passing a new array restarts from the beginning.
 * @param active - When true, the cycle runs (and restarts if `loop` is true);
 *   when false, the cycle stops and state resets.
 * @param loop - When true, the cycle restarts after the final country fades.
 * @param options - Override per-step timings (all in milliseconds).
 */
export function useMapTourCycle<T extends { id: string }>(
	countries: Ref<readonly T[]>,
	active: Ref<boolean>,
	loop: Ref<boolean>,
	options: MapTourCycleOptions = {},
): MapTourCycleControls {
	const opts = { ...DEFAULTS, ...options };

	const panIdx = ref(-1);
	const highlighted = ref<Set<string>>(new Set());
	const showPopupIdx = ref(-1);
	const isRunning = ref(false);

	let timers: ReturnType<typeof setTimeout>[] = [];

	function clearTimers() {
		timers.forEach((t) => clearTimeout(t));
		timers = [];
	}

	function reset() {
		panIdx.value = -1;
		highlighted.value = new Set();
		showPopupIdx.value = -1;
	}

	function schedule(fn: () => void, delay: number) {
		timers.push(setTimeout(fn, delay));
	}

	function runCycle() {
		const list = countries.value;
		if (!list.length) {
			isRunning.value = false;
			return;
		}

		const stepTime = opts.panDuration + opts.holdPerStep;

		list.forEach((country, i) => {
			const stepStart = opts.initialDelay + i * stepTime;

			// Pan to country; hide the previous popup during the pan
			schedule(() => {
				panIdx.value = i;
				showPopupIdx.value = -1;
			}, stepStart);

			// After the pan settles: highlight + show popup
			schedule(() => {
				highlighted.value = new Set([...highlighted.value, country.id]);
				showPopupIdx.value = i;
			}, stepStart + opts.panDuration);

			// Hide the popup just before the next pan begins
			schedule(() => {
				showPopupIdx.value = -1;
			}, stepStart + stepTime - opts.popupHideBefore);
		});

		const allShownAt = opts.initialDelay + list.length * stepTime;
		const cycleEnd = allShownAt + opts.holdAll + opts.fadeDuration;

		// Pan back to overview after the last country
		schedule(() => {
			panIdx.value = -1;
			showPopupIdx.value = -1;
		}, allShownAt);

		// Fade highlights out
		schedule(() => {
			highlighted.value = new Set();
		}, allShownAt + opts.holdAll);

		// Loop or finish
		schedule(() => {
			if (loop.value) {
				runCycle();
			} else {
				isRunning.value = false;
			}
		}, cycleEnd);
	}

	function start() {
		clearTimers();
		reset();
		isRunning.value = true;
		runCycle();
	}

	function stop() {
		clearTimers();
		reset();
		isRunning.value = false;
	}

	watch(
		active,
		(next) => {
			if (next) start();
			else stop();
		},
		{ immediate: true },
	);

	// Restart on countries reassignment while active.
	watch(countries, () => {
		if (active.value) start();
	});

	onBeforeUnmount(stop);

	return {
		panIdx,
		highlighted,
		showPopupIdx,
		isRunning,
		start,
		stop,
	};
}
