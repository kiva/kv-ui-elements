import {
	createApp,
	defineComponent,
	h,
	ref,
	nextTick,
	type App,
} from 'vue';
import { useCountUp } from '#utils/useCountUp';

// Run a composable inside a real component instance so lifecycle hooks
// (onUnmounted, etc.) attach to an active instance instead of warning.
function withSetup<T>(composable: () => T): { result: T; app: App } {
	let result!: T;
	const app = createApp(defineComponent({
		setup() {
			result = composable();
			return () => h('div');
		},
	}));
	app.mount(document.createElement('div'));
	return { result, app };
}

let rafCallbacks: Array<(ts: number) => void> = [];
let rafId = 0;

beforeEach(() => {
	rafCallbacks = [];
	rafId = 0;
	jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
		rafId += 1;
		rafCallbacks.push(cb);
		return rafId;
	});
	jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
});

afterEach(() => {
	jest.restoreAllMocks();
});

function flushRaf(frames: number, startTime = 0, timeStep = 100) {
	for (let i = 0; i < frames; i += 1) {
		const cbs = [...rafCallbacks];
		rafCallbacks = [];
		cbs.forEach((cb) => cb(startTime + i * timeStep));
	}
}

describe('useCountUp', () => {
	it('should return 0 when not active', () => {
		const target = ref(100);
		const active = ref(false);
		const { result: { displayValue }, app } = withSetup(() => useCountUp(target, active));
		expect(displayValue.value).toBe(0);
		app.unmount();
	});

	it('should start animation when active becomes true', async () => {
		const target = ref(50);
		const active = ref(false);
		const { app } = withSetup(() => useCountUp(target, active, 500));

		active.value = true;
		await nextTick();

		// rAF should have been requested
		expect(window.requestAnimationFrame).toHaveBeenCalled();
		app.unmount();
	});

	it('should reach the target value when animation completes', async () => {
		const target = ref(100);
		const active = ref(false);
		const { result: { displayValue }, app } = withSetup(() => useCountUp(target, active, 500));

		active.value = true;
		await nextTick();

		// Simulate enough frames to complete the animation (duration = 500ms)
		flushRaf(1, 0); // first frame sets start time
		flushRaf(1, 600); // second frame at t=600ms > duration, progress = 1

		expect(displayValue.value).toBe(100);
		app.unmount();
	});

	it('should animate back to 0 when active becomes false', async () => {
		const target = ref(50);
		const active = ref(true);
		const { result: { displayValue }, app } = withSetup(() => useCountUp(target, active, 500));

		await nextTick();
		// Complete the animation forward
		flushRaf(1, 0);
		flushRaf(1, 600);
		expect(displayValue.value).toBe(50);

		// Now deactivate
		active.value = false;
		await nextTick();

		// Complete the animation back to 0
		flushRaf(1, 0);
		flushRaf(1, 600);
		expect(displayValue.value).toBe(0);
		app.unmount();
	});
});
