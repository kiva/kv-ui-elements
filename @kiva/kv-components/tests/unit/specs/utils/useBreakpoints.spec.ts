import { useBreakpoints } from '#utils/useBreakpoints';

function setWidth(px: number) {
	Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: px });
}

describe('useBreakpoints', () => {
	it('isMobile is true below the md breakpoint', () => {
		setWidth(500);
		const { isMobile, checkIsMobile } = useBreakpoints();
		checkIsMobile();
		expect(isMobile.value).toBe(true);
	});

	it('isMobile is false at/above the md breakpoint', () => {
		setWidth(1200);
		const { isMobile, checkIsMobile } = useBreakpoints();
		checkIsMobile();
		expect(isMobile.value).toBe(false);
	});
});
