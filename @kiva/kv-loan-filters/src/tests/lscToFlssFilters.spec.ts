import { readFileSync } from 'fs';
import { join } from 'path';
import lscToFlssFilters from '../lscToFlssFilters';
import autolendLscSelection from '../lscSelection';

const fixtures = JSON.parse(readFileSync(join(__dirname, 'fixtures', 'autolendLsc.json'), 'utf8'));
const group = (filters, facets?) => lscToFlssFilters({ filters }, facets).filters[0];
const RISK_ALL = { partnerRiskRating: { range: { lte: 5 } } };
const themeFacets = [{ id: 1, name: 'Green' }, { id: 42, name: 'Water and Sanitation' }];

describe('lscToFlssFilters', () => {
	describe('subscription-service fixtures', () => {
		it('matches processLsc for the active example, except its empty modifiers', () => {
			const { sectorId, partnerId, ...expected } = fixtures.active.processLsc;
			expect(sectorId).toEqual({});
			expect(partnerId).toEqual({});
			expect(lscToFlssFilters(fixtures.active.lsc)).toEqual({ filters: [expected], changes: [], unconverted: [] });
		});

		it('matches processLsc for the passive example', () => {
			expect(lscToFlssFilters(fixtures.passive.lsc))
				.toEqual({ filters: [fixtures.passive.processLsc], changes: [], unconverted: [] });
		});

		it('drops zero term and risk bounds', () => {
			expect(group({ riskRating: { min: 0, max: 5 }, lenderTerm: null })).toEqual({});
		});

		it('passes country ISO codes through', () => {
			expect(group({ country: ['UG', 'KE', 'AG'] }).countryIsoCode).toEqual({ any: ['UG', 'KE', 'AG'] });
		});

		it('converts the remaining options', () => {
			expect(group({
				distributionModel: 'direct', isGroup: true, gender: 'nonbinary', activity: [6], theme: ['Water and Sanitation'],
			}, { themeFacets })).toEqual({
				distributionModel: { eq: 'DIRECT' },
				isIndividual: { eq: false },
				gender: { eq: 'nonbinary' },
				activityId: { any: [6] },
				themeId: { any: [42] },
				...RISK_ALL,
			});
		});

		it('omits a both distribution model', () => {
			expect(group({ distributionModel: 'both' })).toEqual(RISK_ALL);
		});
	});

	describe('empty input', () => {
		it.each([undefined, null, {}, { filters: null }])('returns one empty group for %p', (lsc) => {
			expect(lscToFlssFilters(lsc)).toEqual({ filters: [{}], changes: [], unconverted: [] });
		});

		it('treats an absent risk rating as the stored 0–5 default', () => {
			expect(group({})).toEqual(RISK_ALL);
		});

		it('omits empty, null and both values', () => {
			expect(group({
				country: [], sector: null, partner: [null], gender: 'both', isGroup: null, distributionModel: null,
			})).toEqual(RISK_ALL);
		});
	});

	describe('lists', () => {
		it('maps each list field and skips null entries', () => {
			expect(group({
				sector: [1, null, 2], partner: [3], activity: [4], loanTags: [5],
			})).toEqual({
				sectorId: { any: [1, 2] },
				partnerId: { any: [3] },
				activityId: { any: [4] },
				tagId: { any: [5] },
				...RISK_ALL,
			});
		});

		it('maps isGroup false to individual loans', () => {
			expect(group({ isGroup: false }).isIndividual).toEqual({ eq: true });
		});
	});

	describe('ranges', () => {
		it.each([
			[{ min: 6, max: 0 }, { gte: 6 }],
			[{ min: 0, max: 24 }, { lte: 24 }],
		])('lenderTerm %p → %p', (lenderTerm, range) => {
			expect(group({ lenderTerm }).lenderRepaymentTerm).toEqual({ range });
		});

		it.each([
			[{ min: 2, max: 5 }, { range: { gte: 2, lte: 5 } }],
			[{ min: 0, max: 3 }, { range: { lte: 3 } }],
			[{ min: 0, max: 5 }, undefined],
		])('riskRating %p → %p', (riskRating, expected) => {
			expect(group({ riskRating }).partnerRiskRating).toEqual(expected);
		});

		it.each([
			[{ min: 0, max: 0.02 }, { gte: 0, lte: 0.02 }],
			[{ min: null, max: 0.02 }, { lte: 0.02 }],
			[{ min: 0.05, max: 0 }, { gte: 0.05 }],
		])('defaultRate and arrearsRate %p → %p', (value, range) => {
			const result = group({ defaultRate: value, arrearsRate: value });
			expect(result.partnerDefaultRate).toEqual({ range });
			expect(result.delinquencyRate).toEqual({ range });
		});

		it('omits default rate and delinquency when absent', () => {
			const result = group({});
			expect(result.partnerDefaultRate).toBeUndefined();
			expect(result.delinquencyRate).toBeUndefined();
		});
	});

	describe('themes', () => {
		it('matches names case-insensitively and lists unmatched names', () => {
			const result = lscToFlssFilters({ filters: { theme: [' green ', 'Green', 'Unknown', null] } }, { themeFacets });
			expect(result.filters[0].themeId).toEqual({ any: [1] });
			expect(result.unconverted).toEqual([{ field: 'theme', label: 'Attributes', value: 'Unknown' }]);
		});

		it('lists every theme when no facets are given', () => {
			const result = lscToFlssFilters({ filters: { theme: ['Green'] } });
			expect(result.filters[0].themeId).toBeUndefined();
			expect(result.unconverted).toEqual([{ field: 'theme', label: 'Attributes', value: 'Green' }]);
		});
	});

	it('does not mutate its input', () => {
		const filters = { sector: [1], riskRating: { min: 2, max: 5 }, theme: ['Green'] };
		[filters.sector, filters.riskRating, filters.theme, filters].forEach((o) => Object.freeze(o));
		expect(() => lscToFlssFilters(Object.freeze({ filters }), { themeFacets })).not.toThrow();
	});

	describe('beyond processLsc', () => {
		it('maps the keyword and records a change', () => {
			const result = lscToFlssFilters({ queryString: '  solar  ', filters: {} });
			expect(result.filters[0].keywordSearch).toEqual({ eq: 'solar' });
			expect(result.changes.map((c) => c.key)).toEqual(['keywordSearch']);
			expect(result.changes[0].note).toEqual(expect.any(String));
		});

		it('omits a blank keyword', () => {
			expect(lscToFlssFilters({ queryString: '   ', filters: {} }).filters[0].keywordSearch).toBeUndefined();
		});

		it('keeps the keyword when filters are null, without the risk default', () => {
			const result = lscToFlssFilters({ queryString: 'solar', filters: null });
			expect(result.filters).toEqual([{ keywordSearch: { eq: 'solar' } }]);
			expect(result.changes.map((c) => c.key)).toEqual(['keywordSearch']);
		});

		it('maps trustees, profitability, borrower cost, DAF and currency loss', () => {
			expect(group({
				trustee: [7],
				profitability: { min: -10, max: 0 },
				avgBorrowerCost: { min: 0, max: 20 },
				dafEligible: true,
				currencyLossPossible: false,
			})).toEqual({
				trusteeId: { any: [7] },
				partnerAvgProfitability: { range: { gte: -10, lte: 0 } },
				partnerAvgBorrowerCost: { range: { gte: 0, lte: 20 } },
				dafEligible: { eq: true },
				isCurrencyLossPossible: { eq: false },
				...RISK_ALL,
			});
		});

		it('omits dafEligible false and currencyLossPossible true', () => {
			expect(group({ dafEligible: false, currencyLossPossible: true })).toEqual(RISK_ALL);
		});

		it('splits cities and states, and lists entries it cannot split', () => {
			const result = lscToFlssFilters({
				filters: { cityState: ['Portland,OR', 'St. Louis MO', 'San Francisco, CA', 'Salem,OR', 'Nowhere'] },
			});
			expect(result.filters[0].city).toEqual({ any: ['Portland', 'St. Louis', 'San Francisco', 'Salem'] });
			expect(result.filters[0].state).toEqual({ any: ['OR', 'MO', 'CA'] });
			expect(result.unconverted).toEqual([{ field: 'cityState', label: 'Cities', value: 'Nowhere' }]);
			expect(result.changes.map((c) => c.key)).toEqual(['city']);
		});

		it('reads city_state when cityState is empty', () => {
			expect(group({ cityState: null, city_state: ['Austin,TX'] }).city).toEqual({ any: ['Austin'] });
		});

		it('drops fields that are not converted', () => {
			const result = lscToFlssFilters({
				sortBy: 'popularity',
				filters: {
					isMatched: true,
					matcherAccountId: [1],
					expiringSoon: true,
					excludeNonRated: true,
					loanLimit: 25,
					status: 'fundraising',
					loanIds: [1],
					lenderFavorite: 3,
					hasResearchScore: true,
					anonymizationLevel: ['none'],
				},
			});
			expect(result).toEqual({ filters: [RISK_ALL], changes: [], unconverted: [] });
		});

		it('reads only fields the exported selection asks for', () => {
			const read = new Set<string>();
			const track = (target) => new Proxy(target, {
				get: (obj, key) => {
					if (typeof key === 'string') read.add(key);
					return obj[key];
				},
			});
			lscToFlssFilters(track({ queryString: 'x', filters: track({ riskRating: { min: 1, max: 2 } }) }));
			read.delete('filters');
			read.forEach((key) => expect(autolendLscSelection).toMatch(new RegExp(`\\b${key}\\b`)));
			expect(read.size).toBeGreaterThan(15);
		});
	});
});
