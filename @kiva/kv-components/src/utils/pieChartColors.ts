import kvTokensPrimitives from '@kiva/kv-tokens';
import { CHART_COLORS, getChartColor } from './chartColors';

const { colors } = kvTokensPrimitives;

export const LOADING_BG_COLOR: string = colors.gray[200]; // #E0E0E0
export const OTHER_SEGMENT_BG_COLOR: string = colors.gray[300]; // #C4C4C4

/**
 * The chart palette now lives in chartColors.ts so it can be shared across
 * chart components. These aliases preserve the existing pie-chart API.
 */
export const PIE_CHART_COLORS: string[] = CHART_COLORS;
export const getPieChartColor: (index: number, customColor?: string) => string = getChartColor;
