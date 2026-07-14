import { CHART_COLORS, getChartColor } from '#utils/chartColors';

describe('chartColors', () => {
	it('exposes the 14-color tiered palette in order', () => {
		expect(CHART_COLORS).toHaveLength(14);
		expect(CHART_COLORS[0]).toBe('#276A43'); // eco-green-3
		expect(CHART_COLORS[1]).toBe('#F4B539'); // marigold
		expect(CHART_COLORS[13]).toBe('#A24536'); // desert-rose-3
	});

	it('returns the palette color at a given index', () => {
		expect(getChartColor(7)).toBe('#996210'); // marigold-3
	});

	it('cycles when the index exceeds the palette length', () => {
		expect(getChartColor(14)).toBe('#276A43'); // wraps to 0
	});

	it('returns the override color when one is provided', () => {
		expect(getChartColor(0, '#FF0000')).toBe('#FF0000');
	});
});
