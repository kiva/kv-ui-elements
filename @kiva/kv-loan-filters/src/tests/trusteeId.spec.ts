import trusteeId from '../trusteeId';
import { mockAllFacets } from './fixtures/mockLoanSearchData';

describe('trusteeId.ts', () => {
	describe('default', () => {
		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(trusteeId.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(trusteeId.getFlssFilter({ trusteeId: [] })).toEqual({});
			});

			it('should return filters', () => {
				expect(trusteeId.getFlssFilter({ trusteeId: [2] })).toEqual({ trusteeId: { any: [2] } });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				expect(trusteeId.getValidatedSearchState(undefined, mockAllFacets)).toEqual({ trusteeId: [] });
			});

			it('should handle missing', () => {
				expect(trusteeId.getValidatedSearchState({}, mockAllFacets)).toEqual({ trusteeId: [] });
			});

			it('should return value', () => {
				expect(trusteeId.getValidatedSearchState({ trusteeId: [2] }, mockAllFacets)).toEqual({ trusteeId: [2] });
			});
		});
	});
});
