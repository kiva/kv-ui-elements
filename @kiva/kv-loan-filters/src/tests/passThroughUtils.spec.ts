import {
	getIntegersFromQueryParam,
	getPassThroughChips,
	getStringsFromQueryParam,
	getValidatedIntegers,
	getValidatedStrings,
} from '../passThroughUtils';

describe('passThroughUtils.ts', () => {
	describe('getValidatedStrings', () => {
		it('should return empty for non arrays', () => {
			expect(getValidatedStrings(undefined)).toEqual([]);
			expect(getValidatedStrings(null)).toEqual([]);
			expect(getValidatedStrings('CO')).toEqual([]);
		});

		it('should trim, drop empty and non strings, and dedupe', () => {
			expect(getValidatedStrings([' San Jose ', '', '  ', 1, null, 'San Jose', 'Fresno']))
				.toEqual(['San Jose', 'Fresno']);
		});

		it('should keep case', () => {
			expect(getValidatedStrings(['CO', 'California'])).toEqual(['CO', 'California']);
		});
	});

	describe('getValidatedIntegers', () => {
		it('should return empty for non arrays', () => {
			expect(getValidatedIntegers(undefined)).toEqual([]);
			expect(getValidatedIntegers(12)).toEqual([]);
		});

		it('should keep positive integers only and dedupe', () => {
			expect(getValidatedIntegers([12, 12, 0, -3, 4.5, '7', NaN, 1487001])).toEqual([12, 1487001]);
		});

		it('should drop values outside the GraphQL Int range', () => {
			expect(getValidatedIntegers([2147483647, 2147483648])).toEqual([2147483647]);
			expect(getIntegersFromQueryParam('99999999999999999999,5')).toEqual([5]);
		});
	});

	describe('getStringsFromQueryParam', () => {
		it('should handle missing and null', () => {
			expect(getStringsFromQueryParam(undefined)).toEqual([]);
			expect(getStringsFromQueryParam(null)).toEqual([]);
			expect(getStringsFromQueryParam('')).toEqual([]);
		});

		it('should split on commas and clean values', () => {
			expect(getStringsFromQueryParam('San Jose,, ,Fresno,San Jose')).toEqual(['San Jose', 'Fresno']);
		});

		it('should handle repeated params', () => {
			expect(getStringsFromQueryParam(['CO', 'WI,CA', null])).toEqual(['CO', 'WI', 'CA']);
		});
	});

	describe('getIntegersFromQueryParam', () => {
		it('should handle missing and null', () => {
			expect(getIntegersFromQueryParam(undefined)).toEqual([]);
			expect(getIntegersFromQueryParam(null)).toEqual([]);
		});

		it('should keep positive integers only', () => {
			expect(getIntegersFromQueryParam('abc,12,-3,4.5, 7 ,12')).toEqual([12, 7]);
		});

		it('should handle repeated params', () => {
			expect(getIntegersFromQueryParam(['1', '2,3'])).toEqual([1, 2, 3]);
		});
	});

	describe('getPassThroughChips', () => {
		it('should return empty for missing values', () => {
			expect(getPassThroughChips(undefined)).toEqual([]);
			expect(getPassThroughChips(null)).toEqual([]);
		});

		it('should return one chip per value', () => {
			expect(getPassThroughChips(['CO', 'WI'])).toEqual([{ id: 'CO', name: 'CO' }, { id: 'WI', name: 'WI' }]);
			expect(getPassThroughChips([1487001])).toEqual([{ id: 1487001, name: '1487001' }]);
		});
	});
});
