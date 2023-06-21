import activities from '../activities';

describe('activities.ts', () => {
	describe('default', () => {
		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(activities.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(activities.getFlssFilter({ activityId: [] })).toEqual({});
			});

			it('should return filters', () => {
				expect(activities.getFlssFilter({ activityId: [1] })).toEqual({ activityId: { any: [1] } });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				expect(activities.getValidatedSearchState(undefined)).toEqual({ activityId: [] });
			});

			it('should handle missing', () => {
				expect(activities.getValidatedSearchState({})).toEqual({ activityId: [] });
			});

			it('should return value', () => {
				expect(activities.getValidatedSearchState({ activityId: [3] })).toEqual({ activityId: [3] });
			});
		});
	});
});
