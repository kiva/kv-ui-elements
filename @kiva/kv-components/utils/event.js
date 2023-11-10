import { onMounted, onUnmounted } from 'vue-demi';

export function useEventListener(target, event, callback) {
	onMounted(() => target.value.addEventListener(event, callback));
	onUnmounted(() => target.value.removeEventListener(event, callback));
}
