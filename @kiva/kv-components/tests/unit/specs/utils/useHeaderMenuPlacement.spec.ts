import { shallowRef } from 'vue';
import { useHeaderMenuPlacement } from '#utils/useHeaderMenuPlacement';
import withSetup from '../../utils/withSetup';

type ResizeCallback = () => void;

// Records observe/unobserve calls and lets a test fire the observer callback.
class FakeResizeObserver {
	static instances: FakeResizeObserver[] = [];

	callback: ResizeCallback;

	observe = jest.fn();

	unobserve = jest.fn();

	disconnect = jest.fn();

	constructor(callback: ResizeCallback) {
		this.callback = callback;
		FakeResizeObserver.instances.push(this);
	}
}

function rect(left: number, width: number, height = 64): DOMRect {
	return {
		left, width, height, right: left + width, top: 0, bottom: height, x: left, y: 0, toJSON: () => ({}),
	} as DOMRect;
}

// Builds a nav containing the bar root with two direct children, and makes the nav the root's
// offset parent since jsdom lays nothing out.
function buildBar() {
	const nav = document.createElement('nav');
	const root = document.createElement('div');
	const childA = document.createElement('div');
	const childB = document.createElement('div');
	root.append(childA, childB);
	nav.appendChild(root);
	document.body.appendChild(nav);
	Object.defineProperty(root, 'offsetParent', { configurable: true, value: nav });
	nav.getBoundingClientRect = () => rect(100, 800);
	return {
		nav, root, childA, childB,
	};
}

function addGroup(parent: HTMLElement, left: number, width: number): HTMLElement {
	const group = document.createElement('div');
	group.getBoundingClientRect = () => rect(left, width);
	parent.appendChild(group);
	return group;
}

describe('useHeaderMenuPlacement', () => {
	const RealResizeObserver = globalThis.ResizeObserver;

	afterEach(() => {
		globalThis.ResizeObserver = RealResizeObserver;
		FakeResizeObserver.instances = [];
		document.body.innerHTML = '';
	});

	it('observes the nav and each direct child of the bar on mount', () => {
		globalThis.ResizeObserver = FakeResizeObserver as unknown as typeof ResizeObserver;
		const {
			nav, root, childA, childB,
		} = buildBar();
		withSetup(() => useHeaderMenuPlacement(shallowRef(root)));
		const [observer] = FakeResizeObserver.instances;
		expect(observer.observe).toHaveBeenCalledWith(nav);
		expect(observer.observe).toHaveBeenCalledWith(childA);
		expect(observer.observe).toHaveBeenCalledWith(childB);
	});

	it('writes the nav height on the bar and the trigger geometry on registered groups', () => {
		globalThis.ResizeObserver = FakeResizeObserver as unknown as typeof ResizeObserver;
		const { root, childA } = buildBar();
		const group = addGroup(childA, 300, 50);
		const { result } = withSetup(() => useHeaderMenuPlacement(shallowRef(root)));
		result.registerGroup(group);
		FakeResizeObserver.instances[0].callback();
		expect(root.style.getPropertyValue('--nav-height')).toBe('64px');
		expect(group.style.getPropertyValue('--trigger-gap-left')).toBe('225px');
		expect(group.style.getPropertyValue('--trigger-gap-right')).toBe('575px');
		expect(group.style.getPropertyValue('--trigger-width')).toBe('50px');
	});

	it('observes a group when it registers and stops observing and writing to it when it unregisters', () => {
		globalThis.ResizeObserver = FakeResizeObserver as unknown as typeof ResizeObserver;
		const { root, childA } = buildBar();
		const group = addGroup(childA, 300, 50);
		const { result } = withSetup(() => useHeaderMenuPlacement(shallowRef(root)));
		const unregister = result.registerGroup(group);
		const [observer] = FakeResizeObserver.instances;
		expect(observer.observe).toHaveBeenCalledWith(group);
		unregister();
		expect(observer.unobserve).toHaveBeenCalledWith(group);
		group.getBoundingClientRect = () => rect(400, 60);
		observer.callback();
		expect(group.style.getPropertyValue('--trigger-width')).toBe('');
	});

	it('re-measures each time the observer fires', () => {
		globalThis.ResizeObserver = FakeResizeObserver as unknown as typeof ResizeObserver;
		const { nav, root, childA } = buildBar();
		const group = addGroup(childA, 300, 50);
		const { result } = withSetup(() => useHeaderMenuPlacement(shallowRef(root)));
		result.registerGroup(group);
		const [observer] = FakeResizeObserver.instances;
		observer.callback();
		expect(group.style.getPropertyValue('--trigger-gap-left')).toBe('225px');
		nav.getBoundingClientRect = () => rect(0, 1000, 112);
		group.getBoundingClientRect = () => rect(500, 50);
		observer.callback();
		expect(root.style.getPropertyValue('--nav-height')).toBe('112px');
		expect(group.style.getPropertyValue('--trigger-gap-left')).toBe('525px');
		expect(group.style.getPropertyValue('--trigger-gap-right')).toBe('475px');
	});

	it('measures once on mount when ResizeObserver is unavailable', () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delete (globalThis as any).ResizeObserver;
		const { root } = buildBar();
		withSetup(() => useHeaderMenuPlacement(shallowRef(root)));
		expect(root.style.getPropertyValue('--nav-height')).toBe('64px');
	});

	it('writes nothing when the bar has no offset parent', () => {
		globalThis.ResizeObserver = FakeResizeObserver as unknown as typeof ResizeObserver;
		const { root } = buildBar();
		Object.defineProperty(root, 'offsetParent', { configurable: true, value: null });
		withSetup(() => useHeaderMenuPlacement(shallowRef(root)));
		expect(FakeResizeObserver.instances).toHaveLength(0);
		expect(root.style.getPropertyValue('--nav-height')).toBe('');
	});

	it('disconnects the observer on unmount', () => {
		globalThis.ResizeObserver = FakeResizeObserver as unknown as typeof ResizeObserver;
		const { root } = buildBar();
		const { app } = withSetup(() => useHeaderMenuPlacement(shallowRef(root)));
		app.unmount();
		expect(FakeResizeObserver.instances[0].disconnect).toHaveBeenCalledTimes(1);
	});
});
