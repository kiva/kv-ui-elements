import { ref } from 'vue';
import { useHeaderMenuState } from '#utils/useHeaderMenuState';
import type { PointerType } from '#utils/usePointerType';

function createState(pointerType: PointerType | null = 'mouse') {
	return useHeaderMenuState(ref<PointerType | null>(pointerType));
}

describe('useHeaderMenuState', () => {
	it('starts with nothing toggled', () => {
		expect(createState().toggledId.value).toBeNull();
	});

	it('toggle marks a group toggled and toggling the same group again clears it', () => {
		const state = createState();
		state.toggle('panel-a');
		expect(state.toggledId.value).toBe('panel-a');
		state.toggle('panel-a');
		expect(state.toggledId.value).toBeNull();
	});

	it('toggle switches straight from one toggled group to another', () => {
		const state = createState();
		state.toggle('panel-a');
		state.toggle('panel-b');
		expect(state.toggledId.value).toBe('panel-b');
	});

	it('close clears whichever group is toggled and is a no-op otherwise', () => {
		const state = createState();
		state.close();
		expect(state.toggledId.value).toBeNull();
		state.toggle('panel-a');
		state.close();
		expect(state.toggledId.value).toBeNull();
	});

	it('exposes the pointer type it was given and follows its changes', () => {
		const pointerType = ref<PointerType | null>(null);
		const state = useHeaderMenuState(pointerType);
		expect(state.pointerType.value).toBeNull();
		pointerType.value = 'touch';
		expect(state.pointerType.value).toBe('touch');
	});
});
