import city from '../city';
import { mockAllFacets } from './fixtures/mockLoanSearchData';

describe('city.ts', () => {
	describe('default', () => {
		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(city.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(city.getFlssFilter({ city: [] })).toEqual({});
			});

			it('should return filters', () => {
				expect(city.getFlssFilter({ city: ['test'] })).toEqual({ city: { any: ['test'] } });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				expect(city.getValidatedSearchState(undefined, mockAllFacets)).toEqual({ city: [] });
			});

			it('should handle missing', () => {
				expect(city.getValidatedSearchState({}, mockAllFacets)).toEqual({ city: [] });
			});

			it('should return value', () => {
				expect(city.getValidatedSearchState({ city: ['Atlanta'] }, mockAllFacets)).toEqual({ city: ['Atlanta'] });
			});
		});
	});
});
