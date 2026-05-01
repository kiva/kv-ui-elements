import {
	createApp,
	defineComponent,
	h,
	ref,
	nextTick,
	type App,
} from 'vue';
import { useMapTourCycle } from '#utils/useMapTourCycle';

// Run the composable inside a real component instance so its lifecycle hooks
// attach to an active instance instead of warning.
function withSetup<T>(composable: () => T): { result: T; app: App; el: HTMLElement } {
	let result!: T;
	const el = document.createElement('div');
	const app = createApp(defineComponent({
		setup() {
			result = composable();
			return () => h('div');
		},
	}));
	app.mount(el);
	return { result, app, el };
}

interface TestCountry { id: string; }
const COUNTRIES: TestCountry[] = [
	{ id: 'KE' },
	{ id: 'PE' },
	{ id: 'KH' },
];

const FAST_OPTS = {
	initialDelay: 100,
	panDuration: 100,
	holdPerStep: 100,
	popupHideBefore: 20,
	holdAll: 100,
	fadeDuration: 50,
};

describe('useMapTourCycle', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('starts in overview state with no highlights and no popup', () => {
		const countries = ref(COUNTRIES);
		const active = ref(false);
		const loop = ref(true);
		const { result } = withSetup(() => useMapTourCycle(countries, active, loop, FAST_OPTS));

		expect(result.panIdx.value).toBe(-1);
		expect(result.highlighted.value.size).toBe(0);
		expect(result.showPopupIdx.value).toBe(-1);
		expect(result.isRunning.value).toBe(false);
	});

	it('does not start the cycle when active is false', () => {
		const countries = ref(COUNTRIES);
		const active = ref(false);
		const loop = ref(true);
		const { result } = withSetup(() => useMapTourCycle(countries, active, loop, FAST_OPTS));

		jest.advanceTimersByTime(1000);
		expect(result.panIdx.value).toBe(-1);
		expect(result.isRunning.value).toBe(false);
	});

	it('pans to first country after initialDelay when active', () => {
		const countries = ref(COUNTRIES);
		const active = ref(true);
		const loop = ref(false);
		const { result } = withSetup(() => useMapTourCycle(countries, active, loop, FAST_OPTS));

		expect(result.isRunning.value).toBe(true);
		expect(result.panIdx.value).toBe(-1);

		jest.advanceTimersByTime(FAST_OPTS.initialDelay);
		expect(result.panIdx.value).toBe(0);
		expect(result.showPopupIdx.value).toBe(-1);
	});

	it('shows popup + highlight after panDuration on each step', () => {
		const countries = ref(COUNTRIES);
		const active = ref(true);
		const loop = ref(false);
		const { result } = withSetup(() => useMapTourCycle(countries, active, loop, FAST_OPTS));

		// Reach the first country
		jest.advanceTimersByTime(FAST_OPTS.initialDelay + FAST_OPTS.panDuration);
		expect(result.panIdx.value).toBe(0);
		expect(result.showPopupIdx.value).toBe(0);
		expect(result.highlighted.value.has('KE')).toBe(true);
	});

	it('accumulates highlights across multiple stops', () => {
		const countries = ref(COUNTRIES);
		const active = ref(true);
		const loop = ref(false);
		const { result } = withSetup(() => useMapTourCycle(countries, active, loop, FAST_OPTS));

		const stepTime = FAST_OPTS.panDuration + FAST_OPTS.holdPerStep;
		// Advance through all three countries' "settled" moments
		jest.advanceTimersByTime(FAST_OPTS.initialDelay + 2 * stepTime + FAST_OPTS.panDuration);

		expect(result.highlighted.value.has('KE')).toBe(true);
		expect(result.highlighted.value.has('PE')).toBe(true);
		expect(result.highlighted.value.has('KH')).toBe(true);
	});

	it('stops at overview when loop is false', () => {
		const countries = ref(COUNTRIES);
		const active = ref(true);
		const loop = ref(false);
		const { result } = withSetup(() => useMapTourCycle(countries, active, loop, FAST_OPTS));

		const stepTime = FAST_OPTS.panDuration + FAST_OPTS.holdPerStep;
		const totalDuration = FAST_OPTS.initialDelay
			+ COUNTRIES.length * stepTime
			+ FAST_OPTS.holdAll
			+ FAST_OPTS.fadeDuration
			+ 50;

		jest.advanceTimersByTime(totalDuration);

		expect(result.panIdx.value).toBe(-1);
		expect(result.highlighted.value.size).toBe(0);
		expect(result.isRunning.value).toBe(false);
	});

	it('restarts the cycle when loop is true', () => {
		const countries = ref(COUNTRIES);
		const active = ref(true);
		const loop = ref(true);
		const { result } = withSetup(() => useMapTourCycle(countries, active, loop, FAST_OPTS));

		const stepTime = FAST_OPTS.panDuration + FAST_OPTS.holdPerStep;
		const cycleDuration = FAST_OPTS.initialDelay
			+ COUNTRIES.length * stepTime
			+ FAST_OPTS.holdAll
			+ FAST_OPTS.fadeDuration;

		// Run one full cycle and then a bit more
		jest.advanceTimersByTime(cycleDuration + FAST_OPTS.initialDelay);

		// Should be back into a new cycle, not stopped
		expect(result.isRunning.value).toBe(true);
		expect(result.panIdx.value).toBe(0);
	});

	it('stops and resets when active flips to false mid-cycle', async () => {
		const countries = ref(COUNTRIES);
		const active = ref(true);
		const loop = ref(true);
		const { result } = withSetup(() => useMapTourCycle(countries, active, loop, FAST_OPTS));

		jest.advanceTimersByTime(FAST_OPTS.initialDelay + FAST_OPTS.panDuration);
		expect(result.highlighted.value.size).toBeGreaterThan(0);

		active.value = false;
		await nextTick();

		expect(result.panIdx.value).toBe(-1);
		expect(result.highlighted.value.size).toBe(0);
		expect(result.showPopupIdx.value).toBe(-1);
		expect(result.isRunning.value).toBe(false);
	});

	it('handles an empty countries list without scheduling timers', () => {
		const countries = ref<TestCountry[]>([]);
		const active = ref(true);
		const loop = ref(true);
		const { result } = withSetup(() => useMapTourCycle(countries, active, loop, FAST_OPTS));

		jest.advanceTimersByTime(1000);
		expect(result.panIdx.value).toBe(-1);
		expect(result.isRunning.value).toBe(false);
	});

	it('cleans up timers on unmount', () => {
		const countries = ref(COUNTRIES);
		const active = ref(true);
		const loop = ref(true);
		const { result, app } = withSetup(() => useMapTourCycle(countries, active, loop, FAST_OPTS));

		jest.advanceTimersByTime(FAST_OPTS.initialDelay);
		expect(result.panIdx.value).toBe(0);

		app.unmount();

		// Advancing further should not throw or update reactive state
		jest.advanceTimersByTime(10000);
		expect(result.panIdx.value).toBe(-1);
	});
});
