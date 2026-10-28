import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import vm from 'vm';

/**
 * Guards the browser bundle (`@kiva/kv-analytics/browser`) that mcp-web-publisher inlines and the
 * monolith loads as a classic script. It must run without a module loader, so it is built here into
 * a temp dir and evaluated the way a browser would, instead of asserting on the committed config.
 */
describe('@kiva/kv-analytics browser bundle', () => {
	const packageDir = path.resolve(__dirname, '../..');
	let outDir: string;
	let bundle: string;

	beforeAll(() => {
		outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kv-analytics-browser-'));
		execSync(`npx tsup --config tsup.browser.config.ts --out-dir ${outDir}`, {
			cwd: packageDir,
			stdio: 'pipe',
		});
		bundle = fs.readFileSync(path.join(outDir, 'browser.global.js'), 'utf8');
	}, 60000);

	afterAll(() => {
		fs.rmSync(outDir, { recursive: true, force: true });
	});

	// Runs the bundle as a classic script in its own global scope, as a browser would, and returns
	// the `kvAnalytics` global it declares. jsdom's performance lacks the entry APIs web-vitals
	// reads on subscribe, so they are stubbed as an empty timeline.
	const loadBundle = () => {
		const performance = {
			getEntriesByType: () => [],
			getEntriesByName: () => [],
			now: () => 0,
			timeOrigin: 0,
		};
		const context = {
			window: undefined as unknown,
			self: undefined as unknown,
			document,
			navigator,
			performance,
			console,
			setTimeout,
			clearTimeout,
			addEventListener: window.addEventListener.bind(window),
			removeEventListener: window.removeEventListener.bind(window),
		};
		context.window = context;
		context.self = context;
		vm.runInNewContext(bundle, context);
		return (context as { kvAnalytics?: any }).kvAnalytics;
	};

	it('has no runtime module loading, so it works as a classic script', () => {
		expect(bundle).not.toMatch(/\brequire\(/);
		expect(bundle).not.toMatch(/\bimport\(/);
		expect(bundle).not.toMatch(/^\s*(import|export)\b/m);
	});

	it('inlines web-vitals instead of leaving it external', () => {
		// web-vitals subscribes to layout-shift entries for CLS; the string only exists if it was bundled.
		expect(bundle).toContain('layout-shift');
	});

	it('exposes the package API on the kvAnalytics global', () => {
		const api = loadBundle();

		expect(typeof api.collectWebVitals).toBe('function');
		expect(typeof api.trackEvent).toBe('function');
		expect(typeof api.trackPageView).toBe('function');
		expect(typeof api.initAnalytics).toBe('function');
	});

	it('collectWebVitals accepts an external tracker without throwing', () => {
		const api = loadBundle();
		const trackEvent = jest.fn();

		expect(() => api.collectWebVitals(trackEvent)).not.toThrow();
	});
});
