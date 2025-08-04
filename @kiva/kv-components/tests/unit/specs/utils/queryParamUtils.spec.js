import { hasExcludedQueryParams } from '#utils/loanSearch/queryParamUtils';

describe('hasExcludedQueryParams', () => {
	it('returns false if query has no excluded params', () => {
		const query = { foo: 'bar', baz: 'qux' };
		expect(hasExcludedQueryParams(query)).toBe(false);
	});

	it('returns true if query has one excluded param', () => {
		const query = { activity: 'lend', foo: 'bar' };
		expect(hasExcludedQueryParams(query)).toBe(true);
	});

	it('returns true if query has multiple excluded params', () => {
		const query = { city_state: 'CA', loanTags: 'tag', foo: 'bar' };
		expect(hasExcludedQueryParams(query)).toBe(true);
	});

	it('returns false for empty query', () => {
		expect(hasExcludedQueryParams({})).toBe(false);
	});

	it('returns true if all keys are excluded', () => {
		const query = {
			activity: 'a',
			city_state: 'b',
			loanTags: 'c',
			state: 'd',
			loanLimit: 'e',
		};
		expect(hasExcludedQueryParams(query)).toBe(true);
	});
});
