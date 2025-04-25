import state from '../state';
import { mockAllFacets } from './fixtures/mockLoanSearchData';

describe('state.ts', () => {
	describe('default', () => {
		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(state.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(state.getFlssFilter({ state: [] })).toEqual({});
			});

			it('should return filters', () => {
				expect(state.getFlssFilter({ state: ['test'] })).toEqual({ state: { any: ['test'] } });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				expect(state.getValidatedSearchState(undefined, mockAllFacets)).toEqual({ state: [] });
			});

			it('should handle missing', () => {
				expect(state.getValidatedSearchState({}, mockAllFacets)).toEqual({ state: [] });
			});

			it('should return value', () => {
				expect(state.getValidatedSearchState({ state: ['California'] }, mockAllFacets)).toEqual({ state: ['California'] });
			});
		});
	});
});
