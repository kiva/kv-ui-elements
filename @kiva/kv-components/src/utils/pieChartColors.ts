import kvTokensPrimitives from '@kiva/kv-tokens';

const { colors } = kvTokensPrimitives;

export const LOADING_BG_COLOR: string = colors.gray[200]; // #E0E0E0
export const OTHER_SEGMENT_BG_COLOR: string = colors.gray[300]; // #C4C4C4
/**
 * Tiered chart color palette drawn from kv-tokens design primitives.
 * Tier 1 (indices 0-7): Bold primary colors for maximum visual distinction.
 * Tier 2 (indices 8-13): Lighter variants for datasets with more segments.
 * Colors cycle when the dataset exceeds palette length.
 */
export const PIE_CHART_COLORS: string[] = [
	// Tier 1 — Bold primaries
	colors['eco-green']['3'], // #276A43
	colors.marigold.DEFAULT, // #F4B539
	colors['desert-rose'].DEFAULT, // #C45F4F
	'#2E3BAD', // Custom blue for contrast
	'#874FFF', // Custom purple for contrast
	colors.stone['3'], // #635544
	colors.brand['500'], // #4AB67E
	colors.marigold['3'], // #996210
	// Tier 2 — Lighter variants
	colors['eco-green']['2'], // #78C79F
	colors.marigold['2'], // #F8CD69
	colors['desert-rose']['2'], // #E0988D
	colors.stone['2'], // #AA9E8D
	colors.brand['300'], // #95D4B3
	colors['desert-rose']['3'], // #A24536
];

/**
 * Get the chart color for a given index, with optional override.
 * Cycles through the palette when index exceeds palette length.
 */
export function getPieChartColor(index: number, customColor?: string): string {
	if (customColor) {
		return customColor;
	}
	return PIE_CHART_COLORS[index % PIE_CHART_COLORS.length];
}
