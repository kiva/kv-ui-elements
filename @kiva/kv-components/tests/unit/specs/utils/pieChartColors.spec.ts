import { PIE_CHART_COLORS, getPieChartColor } from '#utils/pieChartColors';

describe('pieChartColors', () => {
	describe('PIE_CHART_COLORS', () => {
		it('should have 14 colors in the palette', () => {
			expect(PIE_CHART_COLORS).toHaveLength(14);
		});

		it('should have tier 1 bold colors first', () => {
			expect(PIE_CHART_COLORS[0]).toBe('#276A43'); // eco-green-3
			expect(PIE_CHART_COLORS[1]).toBe('#F4B539'); // marigold
			expect(PIE_CHART_COLORS[2]).toBe('#C45F4F'); // desert-rose
			expect(PIE_CHART_COLORS[3]).toBe('#2E3BAD'); // custom blue
			expect(PIE_CHART_COLORS[4]).toBe('#874FFF'); // custom purple
			expect(PIE_CHART_COLORS[5]).toBe('#635544'); // stone-3
			expect(PIE_CHART_COLORS[6]).toBe('#4AB67E'); // brand-500
			expect(PIE_CHART_COLORS[7]).toBe('#996210'); // marigold-3
		});

		it('should have tier 2 lighter colors after', () => {
			expect(PIE_CHART_COLORS[8]).toBe('#78C79F'); // eco-green-2
			expect(PIE_CHART_COLORS[9]).toBe('#F8CD69'); // marigold-2
			expect(PIE_CHART_COLORS[10]).toBe('#E0988D'); // desert-rose-2
			expect(PIE_CHART_COLORS[11]).toBe('#AA9E8D'); // stone-2
			expect(PIE_CHART_COLORS[12]).toBe('#95D4B3'); // brand-300
			expect(PIE_CHART_COLORS[13]).toBe('#A24536'); // desert-rose-3
		});
	});

	describe('getPieChartColor', () => {
		it('should return the color at the given index', () => {
			expect(getPieChartColor(0)).toBe('#276A43');
			expect(getPieChartColor(7)).toBe('#996210');
		});

		it('should cycle colors when index exceeds palette length', () => {
			expect(getPieChartColor(14)).toBe('#276A43'); // wraps to index 0
			expect(getPieChartColor(15)).toBe('#F4B539'); // wraps to index 1
			expect(getPieChartColor(28)).toBe('#276A43'); // wraps twice
		});

		it('should return the custom color when provided', () => {
			expect(getPieChartColor(0, '#FF0000')).toBe('#FF0000');
		});

		it('should use palette color when custom color is undefined', () => {
			expect(getPieChartColor(0, undefined)).toBe('#276A43');
		});
	});
});
