/**
 * @jest-environment node
 */
import {
	createSSRApp, defineComponent, h, ref, shallowRef,
} from 'vue';
import { renderToString } from '@vue/server-renderer'; // eslint-disable-line import/no-extraneous-dependencies
import { useOutsidePointerDown } from '#utils/useOutsidePointerDown';

function renderWithComposable(active: boolean) {
	const app = createSSRApp(defineComponent({
		setup() {
			useOutsidePointerDown(shallowRef<HTMLElement | null>(null), ref(active), () => {});
			return () => h('div');
		},
	}));
	return renderToString(app);
}

describe('useOutsidePointerDown without a DOM', () => {
	it('sets up while inactive without touching document', async () => {
		await expect(renderWithComposable(false)).resolves.toBe('<div></div>');
	});

	it('sets up while already active without touching document', async () => {
		await expect(renderWithComposable(true)).resolves.toBe('<div></div>');
	});
});
