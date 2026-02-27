import kvTokensPrimitives from '@kiva/kv-tokens';
import {
	getCoordinatesBetween,
	getLoansIntervals,
	getCountryColor,
	computeMapCenter,
	computeMapZoom,
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

		it('should return #BFE5D1 gray as default base color', () => {
			const result = getCountryColor(0, mockLenderCountries, kvTokensPrimitives, '#BFE5D1');
			expect(result).toBe('#BFE5D1');
		});
	});

	describe('computeMapCenter', () => {
		it('should return { lat: 0, long: 0 } for empty array', () => {
			expect(computeMapCenter([])).toStrictEqual({ lat: 0, long: 0 });
		});

		it('should return the single point coordinates for single item array', () => {
			const data = [{ lat: 45.5, long: -122.6 }];
			expect(computeMapCenter(data)).toStrictEqual({ lat: 45.5, long: -122.6 });
		});

		it('should return the average of multiple points', () => {
			const data = [
				{ lat: 0, long: 0 },
				{ lat: 10, long: 20 },
			];
			expect(computeMapCenter(data)).toStrictEqual({ lat: 5, long: 10 });
		});

		it('should handle negative coordinates', () => {
			const data = [
				{ lat: -10, long: -20 },
				{ lat: 10, long: 20 },
			];
			expect(computeMapCenter(data)).toStrictEqual({ lat: 0, long: 0 });
		});

		it('should handle multiple countries', () => {
			const data = [
				{ lat: 40, long: -100 },
				{ lat: 50, long: -90 },
				{ lat: 30, long: -110 },
			];
			expect(computeMapCenter(data)).toStrictEqual({ lat: 40, long: -100 });
		});
	});

	describe('computeMapZoom', () => {
		it('should return 2 for empty array', () => {
			expect(computeMapZoom([])).toBe(2);
		});

		it('should return 5 for single item array', () => {
			const data = [{ lat: 45.5, long: -122.6 }];
			expect(computeMapZoom(data)).toBe(5);
		});

		it('should return 6 for points with small span (< 1 degree)', () => {
			const data = [
				{ lat: 45.5, long: -122.6 },
				{ lat: 45.6, long: -122.7 },
			];
			expect(computeMapZoom(data)).toBe(6);
		});

		it('should return 5 for points in same region (< 10 degrees)', () => {
			const data = [
				{ lat: 45, long: -122 },
				{ lat: 50, long: -118 },
			];
			expect(computeMapZoom(data)).toBe(5);
		});

		it('should return lower zoom for widely spread points', () => {
			const data = [
				{ lat: -30, long: -120 },
				{ lat: 50, long: 100 },
			];
			const zoom = computeMapZoom(data);
			expect(zoom).toBeGreaterThanOrEqual(1);
			expect(zoom).toBeLessThanOrEqual(6);
		});

		it('should return zoom level within bounds (1-6)', () => {
			const data = [
				{ lat: 0, long: 0 },
				{ lat: 20, long: 30 },
				{ lat: 40, long: 60 },
			];
			const zoom = computeMapZoom(data);
			expect(zoom).toBeGreaterThanOrEqual(1);
			expect(zoom).toBeLessThanOrEqual(6);
		});
	});
});
