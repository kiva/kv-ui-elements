import {
	getIsoCodes,
	isoToCountryName,
	mapIsoCodesToCountryNames,
	sortRegions,
	transformIsoCodes,
} from '../countryUtils';
import {
	mockTransformedMiddleEast,
	mockTransformedChile,
	mockTransformedColombia,
	mockTransformedSouthAmerica,
	mockTransformedRegions,
} from './fixtures/mockLoanSearchData';

describe('countryUtils.ts', () => {
	describe('sortRegions', () => {
		it('should handle empty', () => {
			expect(sortRegions([])).toEqual([]);
		});

		it('should sort', () => {
			const regions = [
				mockTransformedSouthAmerica([mockTransformedColombia(), mockTransformedChile()]),
				mockTransformedMiddleEast(),
			];
			expect(sortRegions(regions)).toEqual(mockTransformedRegions);
		});
	});

	describe('isoToCountryName', () => {
		it('should return corresponding country name', () => {
			const mappedName = isoToCountryName('JO', mockTransformedMiddleEast().countries as never[]);
			expect(mappedName).toBe('Jordan');
		});

		it('should return null if no matching country name', () => {
			const mappedName = isoToCountryName('MS', mockTransformedMiddleEast().countries as never[]);
			expect(mappedName).toBe(null);
		});
	});

	describe('mapIsoCodesToCountryNames', () => {
		const targetIsos = ['JO', 'CL', 'CO'];

		it('should return an empty object if no ISO codes are passed', () => {
			expect(mapIsoCodesToCountryNames(undefined, mockTransformedRegions)).toEqual({});
			expect(mapIsoCodesToCountryNames([], mockTransformedRegions)).toEqual({});
		});

		it('should return an empty object if no regions are passed', () => {
			expect(mapIsoCodesToCountryNames(targetIsos, undefined)).toEqual({});
			expect(mapIsoCodesToCountryNames(targetIsos, [])).toEqual({});
		});

		it('should return region keyed object with array of country names', () => {
			const selectedCountries = mapIsoCodesToCountryNames(targetIsos, mockTransformedRegions);
			expect(selectedCountries).toEqual({
				'Middle East': ['Jordan'],
				'South America': ['Chile', 'Colombia'],
			});
		});
	});

	describe('getIsoCodes', () => {
		it('should handle empty', () => {
			expect(getIsoCodes([], {})).toEqual([]);
			expect(getIsoCodes([], { test: 'test' })).toEqual([]);
		});

		it('should return codes', () => {
			expect(getIsoCodes(mockTransformedRegions, { 'South America': ['Chile'] })).toEqual(['CL']);
			expect(getIsoCodes(mockTransformedRegions, {
				'Middle East': ['Jordan'],
				'South America': ['Chile'],
			}).sort()).toEqual(['JO', 'CL'].sort());
		});
	});

	describe('transformIsoCodes', () => {
		it('should handle empty', () => {
			expect(transformIsoCodes([])).toEqual([]);
		});

		it('should filter, transform, and sort', () => {
			const mockCountryFacets = [
				{
					country: {
						name: 'Zambia',
						isoCode: 'ZM',
						numLoansFundraising: 100,
						region: 'Africa',
					},
				},
				{
					country: {
						name: 'Colombia',
						isoCode: 'CO',
						numLoansFundraising: 100,
						region: 'South America',
					},
				},
				{
					country: {
						name: 'Chile',
						isoCode: 'CL',
						numLoansFundraising: 100,
						region: 'South America',
					},
				},
				{
					country: {
						name: 'Jordan',
						isoCode: 'JO',
						numLoansFundraising: 100,
						region: 'Middle East',
					},
				},
			];

			const filteredIsoCodes = [{ key: 'JO', value: 44 }, { key: 'CO', value: 152 }, { key: 'CL', value: 20 }];

			const result = transformIsoCodes(filteredIsoCodes, mockCountryFacets as never);

			expect(result).toEqual(mockTransformedRegions);
		});

		it('should transform ISO codes case insensitive', () => {
			const mockCountryFacets = [
				{
					country: {
						name: 'Zambia',
						isoCode: 'zm',
						numLoansFundraising: 100,
						region: 'Africa',
					},
				},
				{
					country: {
						name: 'Colombia',
						isoCode: 'co',
						numLoansFundraising: 100,
						region: 'South America',
					},
				},
				{
					country: {
						name: 'Chile',
						isoCode: 'cl',
						numLoansFundraising: 100,
						region: 'South America',
					},
				},
				{
					country: {
						name: 'Jordan',
						isoCode: 'jo',
						numLoansFundraising: 100,
						region: 'Middle East',
					},
				},
			];

			const filteredIsoCodes = [{ key: 'JO', value: 44 }, { key: 'CO', value: 152 }, { key: 'CL', value: 20 }];

			const result = transformIsoCodes(filteredIsoCodes, mockCountryFacets as never);

			expect(result).toEqual(mockTransformedRegions);
		});
	});
});
