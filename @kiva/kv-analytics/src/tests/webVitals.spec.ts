import {
	onCLS,
	onFCP,
	onINP,
	onLCP,
	onTTFB,
} from 'web-vitals';
import collectWebVitals from '../webVitals';

jest.mock('web-vitals', () => ({
	onCLS: jest.fn(),
	onFCP: jest.fn(),
	onINP: jest.fn(),
	onLCP: jest.fn(),
	onTTFB: jest.fn(),
}));

describe('@kiva/kv-analytics collectWebVitals', () => {
	let mockTrackEvent: jest.Mock;

	beforeEach(() => {
		mockTrackEvent = jest.fn();
		collectWebVitals(mockTrackEvent);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('subscribes to every core web vital', () => {
		[onCLS, onFCP, onINP, onLCP, onTTFB].forEach((subscribe) => {
			expect(subscribe).toHaveBeenCalledTimes(1);
			expect(subscribe).toHaveBeenCalledWith(expect.any(Function));
		});
	});

	it('should collect and track CLS metric', () => {
		const handler = (onCLS as jest.Mock).mock.calls[0][0];

		handler({ name: 'CLS', id: 'test-cls-id', delta: 0.05 });

		expect(mockTrackEvent).toHaveBeenCalledWith(
			'web vitals',
			'report',
			'CLS',
			'test-cls-id',
			50, // 0.05 * 1000 rounded
		);
	});

	it('should collect and track FCP metric', () => {
		const handler = (onFCP as jest.Mock).mock.calls[0][0];

		handler({ name: 'FCP', id: 'test-fcp-id', delta: 1234.56 });

		expect(mockTrackEvent).toHaveBeenCalledWith(
			'web vitals',
			'report',
			'FCP',
			'test-fcp-id',
			1235, // rounded
		);
	});

	it('should collect and track INP metric', () => {
		const handler = (onINP as jest.Mock).mock.calls[0][0];

		handler({ name: 'INP', id: 'test-inp-id', delta: 100.7 });

		expect(mockTrackEvent).toHaveBeenCalledWith(
			'web vitals',
			'report',
			'INP',
			'test-inp-id',
			101, // rounded
		);
	});

	it('should collect and track LCP metric', () => {
		const handler = (onLCP as jest.Mock).mock.calls[0][0];

		handler({ name: 'LCP', id: 'test-lcp-id', delta: 2500.3 });

		expect(mockTrackEvent).toHaveBeenCalledWith(
			'web vitals',
			'report',
			'LCP',
			'test-lcp-id',
			2500, // rounded
		);
	});

	it('should collect and track TTFB metric', () => {
		const handler = (onTTFB as jest.Mock).mock.calls[0][0];

		handler({ name: 'TTFB', id: 'test-ttfb-id', delta: 150.9 });

		expect(mockTrackEvent).toHaveBeenCalledWith(
			'web vitals',
			'report',
			'TTFB',
			'test-ttfb-id',
			151, // rounded
		);
	});

	it('should multiply CLS value by 1000 for precision', () => {
		const handler = (onCLS as jest.Mock).mock.calls[0][0];

		handler({ name: 'CLS', id: 'cls-precision-test', delta: 0.123 });

		expect(mockTrackEvent).toHaveBeenCalledWith(
			'web vitals',
			'report',
			'CLS',
			'cls-precision-test',
			123, // 0.123 * 1000
		);
	});
});
