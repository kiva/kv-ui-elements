import kvTokensPrimitives from '@kiva/kv-tokens/primitives.json';
import {
	getCoordinatesBetween,
	getLoansIntervals,
	getCountryColor,
} from '#utils/mapUtils';
import mockLenderCountries from '../../../fixtures/mockLenderCountries';

describe('mapUtils', () => {
	describe('getCoordinatesBetween', () => {
		it('should return empty array if inputs are invalid', () => {
			expect(getCoordinatesBetween([100, 88], undefined, 10)).toStrictEqual([]);
			expect(getCoordinatesBetween(undefined, undefined, 10)).toStrictEqual([]);
			expect(getCoordinatesBetween(undefined, undefined, 0)).toStrictEqual([]);
			expect(getCoordinatesBetween(undefined, [-89, -89], 0)).toStrictEqual([]);
		});

		it('should return an array of steps', () => {
			expect(getCoordinatesBetween([0, 0], [100, 100], 10)).toStrictEqual(
				[[0, 0], [10, 10], [20, 20], [30, 30], [40, 40], [50, 50], [60, 60], [70, 70], [80, 80], [100, 100]],
			);
			expect(getCoordinatesBetween([0, 0], [100, 100], 3)).toStrictEqual(
				[[0, 0], [33.333333333333336, 33.333333333333336], [100, 100]],
			);
			expect(getCoordinatesBetween([0, 0], [100, 101], 2)).toStrictEqual(
				[[0, 0], [100, 101]],
			);
		});

		it('should handle negative numbers', () => {
			expect(getCoordinatesBetween([-10, -30], [-90, -45.123], 3)).toStrictEqual(
				[[-10, -30], [-36.66666666666667, -35.041], [-90, -45.123]],
			);
		});

		it('last item should be our exact endpoint', () => {
			expect(getCoordinatesBetween([0, 0], [100, -180], 3)).toStrictEqual(
				[[0, 0], [33.333333333333336, -60], [100, -180]],
			);
		});

		it('should handle long decimals', () => {
			expect(getCoordinatesBetween([0.123, 0.999], [100.123, 101.666], 3)).toStrictEqual(
				[[0.123, 0.999], [33.45633333333333, 34.55466666666667], [100.123, 101.666]],
			);
		});
	});

	describe('getLoansIntervals', () => {
		it('should return array of length 1 if max number is smaller than number of interval', () => {
			const result = getLoansIntervals(1, 5, 6);
			expect(result.length).toStrictEqual(1);
		});

		it('should dont overlap results', () => {
			const result = getLoansIntervals(1, 30, 6);
			expect(result[0][1]).not.toBe(result[1][0]);
		});

		it('should have a difference by one between intervals', () => {
			const result = getLoansIntervals(1, 120, 6);
			expect(result[0][1]).toBe(result[1][0] - 1);
		});
	});

	describe('getCountryColor', () => {
		it('should return #C4C4C4 gray as default color', () => {
			const result = getCountryColor(0, mockLenderCountries, kvTokensPrimitives);
			expect(result).toBe('#C4C4C4');
		});
	});
});
