import { ref, shallowRef, nextTick } from 'vue';
import userEvent from '@testing-library/user-event';
import { useOutsidePointerDown } from '#utils/useOutsidePointerDown';
import withSetup from '../../utils/withSetup';

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

	it('calls onOutside for a press outside the root while active', async () => {
		const { root } = attachRoot();
		const onOutside = jest.fn();
		withSetup(() => useOutsidePointerDown(shallowRef(root), ref(true), onOutside));
		await userEvent.setup().click(document.body);
		expect(onOutside).toHaveBeenCalledTimes(1);
	});

	it('ignores a press inside the root', async () => {
		const { root, inside } = attachRoot();
		const onOutside = jest.fn();
		withSetup(() => useOutsidePointerDown(shallowRef(root), ref(true), onOutside));
		await userEvent.setup().click(inside);
		expect(onOutside).not.toHaveBeenCalled();
	});

	it('ignores every press while inactive', async () => {
		const { root } = attachRoot();
		const onOutside = jest.fn();
		withSetup(() => useOutsidePointerDown(shallowRef(root), ref(false), onOutside));
		await userEvent.setup().click(document.body);
		expect(onOutside).not.toHaveBeenCalled();
	});

	it('starts and stops listening as active changes', async () => {
		const { root } = attachRoot();
		const onOutside = jest.fn();
		const active = ref(false);
		withSetup(() => useOutsidePointerDown(shallowRef(root), active, onOutside));
		active.value = true;
		await nextTick();
		await userEvent.setup().click(document.body);
		expect(onOutside).toHaveBeenCalledTimes(1);
		active.value = false;
		await nextTick();
		await userEvent.setup().click(document.body);
		expect(onOutside).toHaveBeenCalledTimes(1);
	});

	it('stops listening on unmount', async () => {
		const { root } = attachRoot();
		const onOutside = jest.fn();
		const { app } = withSetup(() => useOutsidePointerDown(shallowRef(root), ref(true), onOutside));
		app.unmount();
		await userEvent.setup().click(document.body);
		expect(onOutside).not.toHaveBeenCalled();
	});
});
