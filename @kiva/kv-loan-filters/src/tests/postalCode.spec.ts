import postalCode from '../postalCode';
import { mockAllFacets } from './fixtures/mockLoanSearchData';

describe('postalCode.ts', () => {
	describe('default', () => {
		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(postalCode.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(postalCode.getFlssFilter({ postalCode: [] })).toEqual({});
			});

			it('should return filters', () => {
				expect(postalCode.getFlssFilter({ postalCode: [1] })).toEqual({ postalCode: { any: [1] } });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				expect(postalCode.getValidatedSearchState(undefined, mockAllFacets)).toEqual({ postalCode: [] });
			});

			it('should handle missing', () => {
				expect(postalCode.getValidatedSearchState({}, mockAllFacets)).toEqual({ postalCode: [] });
			});

			it('should return value', () => {
				expect(postalCode.getValidatedSearchState({ postalCode: ['90210'] }, mockAllFacets)).toEqual({ postalCode: ['90210'] });
			});
		});
	});
});
