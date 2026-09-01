import {
	createApp, defineComponent, h, type App,
} from 'vue';
import { useHoverIntent } from '#utils/useHoverIntent';

// Runs the composable inside a real component instance so its lifecycle hooks attach to an
// active instance instead of warning.
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

describe('useHoverIntent', () => {
	afterEach(() => {
		jest.useRealTimers();
	});

	it('settles once enter has gone the full delay without a leave', () => {
		jest.useFakeTimers();
		const { result } = withSetup(() => useHoverIntent(100));
		result.enter();
		jest.advanceTimersByTime(99);
		expect(result.settled.value).toBe(false);
		jest.advanceTimersByTime(1);
		expect(result.settled.value).toBe(true);
	});

	it('does not settle when leave happens before the delay', () => {
		jest.useFakeTimers();
		const { result } = withSetup(() => useHoverIntent(100));
		result.enter();
		result.leave();
		jest.advanceTimersByTime(200);
		expect(result.settled.value).toBe(false);
	});

	it('unsettles on leave and restarts the delay on the next enter', () => {
		jest.useFakeTimers();
		const { result } = withSetup(() => useHoverIntent(100));
		result.enter();
		jest.advanceTimersByTime(100);
		expect(result.settled.value).toBe(true);
		result.leave();
		expect(result.settled.value).toBe(false);
		result.enter();
		jest.advanceTimersByTime(50);
		expect(result.settled.value).toBe(false);
		jest.advanceTimersByTime(50);
		expect(result.settled.value).toBe(true);
	});

	it('drops a pending timer on unmount', () => {
		jest.useFakeTimers();
		const { result, app } = withSetup(() => useHoverIntent(100));
		result.enter();
		app.unmount();
		jest.advanceTimersByTime(200);
		expect(result.settled.value).toBe(false);
	});
});
