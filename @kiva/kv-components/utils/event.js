import { onMounted, onUnmounted } from 'vue-demi';

export function useEventListener(target, event, callback) {
	onMounted(() => target.addEventListener(event, callback));
	onUnmounted(() => target.removeEventListener(event, callback));
}
