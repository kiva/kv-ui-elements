import { useHoverIntent } from '#utils/useHoverIntent';
import withSetup from '../../utils/withSetup';

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
