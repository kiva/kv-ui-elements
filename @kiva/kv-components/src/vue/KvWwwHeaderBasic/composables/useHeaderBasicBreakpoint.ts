import { ref, onMounted, onBeforeUnmount } from 'vue';
import tokens from '@kiva/kv-tokens';
import { throttle } from '#utils/throttle';

// Extracted from KvWwwHeader.vue: tracks whether the viewport is below the `md` breakpoint (734px).
export function useHeaderBasicBreakpoint() {
	const isMobile = ref(false);

	function checkIsMobile(): void {
		isMobile.value = (window?.innerWidth ?? 0) < tokens.breakpoints.md;
	}

	const checkIsMobileThrottled = throttle(checkIsMobile, 100);

	onMounted(() => {
		checkIsMobile();
		window.addEventListener('resize', checkIsMobileThrottled);
	});
	onBeforeUnmount(() => {
		window.removeEventListener('resize', checkIsMobileThrottled);
	});

	return { isMobile, checkIsMobile };
}
