import { shallowRef } from 'vue';
import userEvent from '@testing-library/user-event';
import { usePointerType } from '#utils/usePointerType';
import withSetup from '../../utils/withSetup';

function stubMatchMedia(matches: boolean) {
	Object.defineProperty(window, 'matchMedia', {
		configurable: true,
		writable: true,
		value: jest.fn().mockReturnValue({ matches }),
	});
}

describe('usePointerType', () => {
	afterEach(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delete (window as any).matchMedia;
		document.body.innerHTML = '';
	});

	it('is null before mount so server markup carries no pointer type', () => {
		const root = document.createElement('div');
		const { pointerType } = usePointerType(shallowRef(root));
		expect(pointerType.value).toBeNull();
	});

	it('starts as mouse when the device can hover', () => {
		stubMatchMedia(false);
		const { result } = withSetup(() => usePointerType(shallowRef(document.createElement('div'))));
		expect(result.pointerType.value).toBe('mouse');
	});

	it('starts as touch when the device cannot hover', () => {
		stubMatchMedia(true);
		const { result } = withSetup(() => usePointerType(shallowRef(document.createElement('div'))));
		expect(result.pointerType.value).toBe('touch');
	});

	it('follows a touch tap and then a mouse movement inside the root', async () => {
		const user = userEvent.setup();
		const root = document.createElement('div');
		const child = document.createElement('button');
		root.appendChild(child);
		document.body.appendChild(root);
		const { result } = withSetup(() => usePointerType(shallowRef(root)));
		await user.pointer({ keys: '[TouchA]', target: child });
		expect(result.pointerType.value).toBe('touch');
		await user.hover(child);
		expect(result.pointerType.value).toBe('mouse');
	});

	it('stops listening on unmount', async () => {
		const root = document.createElement('div');
		document.body.appendChild(root);
		const { result, app } = withSetup(() => usePointerType(shallowRef(root)));
		app.unmount();
		await userEvent.setup().pointer({ keys: '[TouchA]', target: root });
		expect(result.pointerType.value).toBe('mouse');
	});
});
