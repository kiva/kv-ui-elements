import { useHeaderBasicBreakpoint } from '#components/KvWwwHeaderBasic/composables/useHeaderBasicBreakpoint';

function setWidth(px: number) {
	Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: px });
}

describe('useHeaderBasicBreakpoint', () => {
	it('isMobile is true below the md breakpoint', () => {
		setWidth(500);
		const { isMobile, checkIsMobile } = useHeaderBasicBreakpoint();
		checkIsMobile();
		expect(isMobile.value).toBe(true);
	});

	it('isMobile is false at/above the md breakpoint', () => {
		setWidth(1200);
		const { isMobile, checkIsMobile } = useHeaderBasicBreakpoint();
		checkIsMobile();
		expect(isMobile.value).toBe(false);
	});
});
