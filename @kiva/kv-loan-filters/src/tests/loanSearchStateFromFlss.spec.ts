import { readFileSync } from 'fs';
import { join } from 'path';
import flssToLoanSearchState from '../loanSearchStateFromFlss';
import filterUtils from '../filterUtils';
import { createMinMaxRange } from '../minMaxRangeUtils';

const savedSearches = JSON.parse(
	readFileSync(join(__dirname, 'fixtures', 'categorySavedSearches.json'), 'utf8'),
);

describe('loanSearchStateFromFlss.ts', () => {
	describe('flssToLoanSearchState', () => {
		it('should handle missing input', () => {
			expect(flssToLoanSearchState()).toEqual({});
			expect(flssToLoanSearchState({ filters: null, sortBy: null })).toEqual({});
			expect(flssToLoanSearchState({ filters: [{}] })).toEqual({});
		});

		it('should convert any, eq and range', () => {
			const result = flssToLoanSearchState({
				filters: [{
					sectorId: { any: [1, 2] },
					isIndividual: { eq: false },
					lenderRepaymentTerm: { range: { gte: 0, lte: 16 } },
				}],
			});

			expect(result).toEqual({
				sectorId: [1, 2],
				isIndividual: false,
				lenderRepaymentTerm: { min: 0, max: 16, __typename: 'MinMaxRange' },
			});
		});

		it('should keep falsy values', () => {
			const result = flssToLoanSearchState({
				filters: [{ isMatchable: { eq: false }, loanAmount: { range: { gte: 0, lte: 0 } } }],
			});

			expect(result).toEqual({
				isMatchable: false,
				loanAmount: { min: 0, max: 0, __typename: 'MinMaxRange' },
			});
		});

		it('should convert half open ranges', () => {
			expect(flssToLoanSearchState({ filters: [{ partnerDefaultRate: { range: { lte: 0.01 } } }] }))
				.toEqual({ partnerDefaultRate: { max: 0.01, __typename: 'MinMaxRange' } });
			expect(flssToLoanSearchState({ filters: [{ loanAmount: { range: { gte: 25 } } }] }))
				.toEqual({ loanAmount: { min: 25, __typename: 'MinMaxRange' } });
		});

		it('should convert gender from eq and any', () => {
			expect(flssToLoanSearchState({ filters: [{ gender: { eq: 'female' } }] })).toEqual({ gender: 'female' });
			expect(flssToLoanSearchState({ filters: [{ gender: { any: ['male', 'female'] } }] }))
				.toEqual({ gender: ['male', 'female'] });
		});

		it('should merge filter elements in order', () => {
			const result = flssToLoanSearchState({
				filters: [{ sectorId: { any: [1] }, city: { any: ['a'] } }, { sectorId: { any: [2] } }],
			});

			expect(result).toEqual({ sectorId: [2], city: ['a'] });
		});

		it('should add sortBy', () => {
			expect(flssToLoanSearchState({ filters: [], sortBy: 'popularityScore' })).toEqual({ sortBy: 'popularityScore' });
			expect(flssToLoanSearchState({ filters: [], sortBy: 'researchScore' })).toEqual({ sortBy: 'researchScore' });
		});

		it('should keep unknown keys as they are', () => {
			const newFilter = { any: [1] };

			expect(flssToLoanSearchState({ filters: [{ someNewKey: newFilter }] }).someNewKey).toBe(newFilter);
		});

		it('should keep unknown operators as they are', () => {
			const filters = [{
				sectorId: { ne: [3] },
				themeId: { any: [1], none: [2] },
				loanAmount: { range: { gt: 5 } },
				gender: { none: ['male'] },
			}];

			expect(flssToLoanSearchState({ filters })).toEqual(filters[0]);
		});

		it('should keep values it cannot convert as they are', () => {
			const filters = [{ sectorId: { any: 1 }, loanAmount: { range: { gte: 'a' } }, isMatchable: 'true' }];

			expect(flssToLoanSearchState({ filters })).toEqual(filters[0]);
		});
	});

	describe('category saved searches', () => {
		const slugs = Object.keys(savedSearches);

		it('should have the snapshot', () => {
			expect(slugs.length).toBe(150);
		});

		it.each(slugs)('should convert every filter of %s', (slug) => {
			const { filters, sortBy } = savedSearches[slug];
			const state = flssToLoanSearchState({ filters, sortBy });

			filters.forEach((filter) => {
				Object.entries(filter).forEach(([key, modifier]) => {
					expect(state[key]).not.toBe(modifier);
				});
			});
			expect(state.sortBy ?? null).toBe(sortBy);
		});

		it('should convert known categories', () => {
			const convert = (slug) => flssToLoanSearchState(savedSearches[slug]);

			expect(convert('women')).toEqual({ gender: 'female' });
			expect(convert('ending-soon')).toEqual({
				daysUntilExpiration: { min: 0, max: 7, __typename: 'MinMaxRange' },
				sortBy: 'expiringSoon',
			});
			expect(convert('recommended-by-lenders').partnerDefaultRate)
				.toEqual({ max: 0.01, __typename: 'MinMaxRange' });
		});
	});

	describe('round trip with getFlssFilter', () => {
		const samples = {
			activityId: [1, 2],
			amountLeft: createMinMaxRange(1, 500),
			city: ['San Jose'],
			dafEligible: false,
			daysUntilExpiration: createMinMaxRange(0, 7),
			distributionModel: 'DIRECT',
			flexibleFundraisingEnabled: true,
			gender: 'female',
			isIndividual: false,
			isMatchable: true,
			keywordSearch: 'water tank',
			lenderRepaymentTerm: createMinMaxRange(0, 16),
			loanAmount: createMinMaxRange(25, 100),
			partnerAvgProfitability: createMinMaxRange(0, 10),
			partnerDefaultRate: { max: 0.01, __typename: 'MinMaxRange' },
			partnerId: [1, 2],
			partnerRiskRating: createMinMaxRange(1, 5),
			postalCode: ['80011'],
			countryIsoCode: ['US', 'GU'],
			sectorId: [1],
			state: ['WI'],
			tagId: [9, 8],
			themeId: [9],
			trusteeId: [4],
		};
		const noFlssFilter = ['category', 'pageLimit', 'pageOffset', 'sortBy'];

		it('should have a sample for every module that produces an FLSS filter', () => {
			const stateKeys = filterUtils.keys
				.map((key) => filterUtils.filters[key].stateKey)
				.filter((key) => !noFlssFilter.includes(key));

			expect(Object.keys(samples).sort()).toEqual([...stateKeys].sort());
		});

		it.each(Object.keys(samples))('should round trip %s', (key) => {
			const module = filterUtils.keys
				.map((k) => filterUtils.filters[k])
				.find((m) => m.stateKey === key);
			const state = { [key]: samples[key] };

			expect(flssToLoanSearchState({ filters: [module.getFlssFilter(state)] })).toEqual(state);
		});

		it('should round trip gender arrays', () => {
			const state = { gender: ['female', 'male'] };
			const filters = [filterUtils.filters.genders.getFlssFilter(state)];

			expect(flssToLoanSearchState({ filters })).toEqual(state);
		});
	});
});
