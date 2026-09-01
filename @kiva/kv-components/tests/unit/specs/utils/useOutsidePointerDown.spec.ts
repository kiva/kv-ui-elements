import {
	createApp, defineComponent, h, ref, nextTick, type App,
} from 'vue';
import { fireEvent } from '@testing-library/dom';
import { useOutsidePointerDown } from '#utils/useOutsidePointerDown';

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

// Builds a root element with one child, both attached to the document so events reach it.
function attachRoot(): { root: HTMLElement; inside: HTMLElement } {
	const root = document.createElement('div');
	const inside = document.createElement('button');
	root.appendChild(inside);
	document.body.appendChild(root);
	return { root, inside };
}

describe('useOutsidePointerDown', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('calls onOutside for a pointerdown outside the root while active', () => {
		const { root } = attachRoot();
		const onOutside = jest.fn();
		withSetup(() => useOutsidePointerDown(ref(root), ref(true), onOutside));
		fireEvent.pointerDown(document.body);
		expect(onOutside).toHaveBeenCalledTimes(1);
	});

	it('ignores a pointerdown inside the root', () => {
		const { root, inside } = attachRoot();
		const onOutside = jest.fn();
		withSetup(() => useOutsidePointerDown(ref(root), ref(true), onOutside));
		fireEvent.pointerDown(inside);
		expect(onOutside).not.toHaveBeenCalled();
	});

	it('ignores every pointerdown while inactive', () => {
		const { root } = attachRoot();
		const onOutside = jest.fn();
		withSetup(() => useOutsidePointerDown(ref(root), ref(false), onOutside));
		fireEvent.pointerDown(document.body);
		expect(onOutside).not.toHaveBeenCalled();
	});

	it('starts and stops listening as active changes', async () => {
		const { root } = attachRoot();
		const onOutside = jest.fn();
		const active = ref(false);
		withSetup(() => useOutsidePointerDown(ref(root), active, onOutside));
		active.value = true;
		await nextTick();
		fireEvent.pointerDown(document.body);
		expect(onOutside).toHaveBeenCalledTimes(1);
		active.value = false;
		await nextTick();
		fireEvent.pointerDown(document.body);
		expect(onOutside).toHaveBeenCalledTimes(1);
	});

	it('stops listening on unmount', () => {
		const { root } = attachRoot();
		const onOutside = jest.fn();
		const { app } = withSetup(() => useOutsidePointerDown(ref(root), ref(true), onOutside));
		app.unmount();
		fireEvent.pointerDown(document.body);
		expect(onOutside).not.toHaveBeenCalled();
	});
});
