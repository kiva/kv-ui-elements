import presentFlssFilters from '../presentFlssFilters';

const allFacets = {
	countryFacets: [{ country: { isoCode: 'KE', name: 'Kenya' } }],
	sectorFacets: [{ id: 1, name: 'Agriculture' }],
	themeFacets: [{ id: 42, name: 'Water and Sanitation' }],
};

describe('presentFlssFilters', () => {
	it.each([undefined, null, {}])('returns nothing for %p', (filters) => {
		expect(presentFlssFilters(filters)).toEqual([]);
	});

	it('orders criteria like the settings page, then the rest, then unknown keys', () => {
		const result = presentFlssFilters({
			somethingNew: { eq: 'x' },
			tagId: { any: [5] },
			partnerRiskRating: { range: { lte: 5 } },
			countryIsoCode: { any: ['KE'] },
		}, allFacets);
		expect(result.map((c) => c.label)).toEqual(['Countries', 'Risk rating', 'Tags', 'somethingNew']);
		expect(result[3].values).toEqual(['x']);
	});

	it('resolves names from facets and falls back to raw values', () => {
		const result = presentFlssFilters({
			countryIsoCode: { any: ['KE', 'ZZ'] },
			sectorId: { any: [1, 99] },
			themeId: { any: [42] },
			activityId: { any: [6] },
		}, allFacets);
		expect(result).toEqual([
			{ key: 'countryIsoCode', label: 'Countries', values: ['Kenya', 'ZZ'] },
			{ key: 'sectorId', label: 'Sectors', values: ['Agriculture', '99'] },
			{ key: 'themeId', label: 'Attributes', values: ['Water and Sanitation'] },
			{ key: 'activityId', label: 'Activities', values: ['6'] },
		]);
	});

	it('formats enums, booleans and ranges', () => {
		const result = presentFlssFilters({
			gender: { eq: 'nonbinary' },
			isIndividual: { eq: false },
			partnerRiskRating: { range: { gte: 2, lte: 5 } },
			lenderRepaymentTerm: { range: { lte: 24 } },
			partnerDefaultRate: { range: { gte: 0, lte: 0.07 } },
			delinquencyRate: { range: { lte: 0.035 } },
			distributionModel: { eq: 'FIELDPARTNER' },
			partnerAvgProfitability: { range: { gte: -10, lte: 0 } },
			partnerAvgBorrowerCost: { range: { gte: 3 } },
			dafEligible: { eq: true },
			isCurrencyLossPossible: { eq: false },
		});
		expect(result.map(({ label, values }) => `${label}: ${values.join(', ')}`)).toEqual([
			'Gender: Nonbinary',
			'Borrower type: Groups',
			'Risk rating: 2 to 5',
			'Loan term: 24 months or less',
			'Default rate: 0% to 7%',
			'Delinquency rate: 3.5% or less',
			'Distribution model: Field partner',
			'Average profitability: -10% to 0%',
			'Average borrower cost: 3% or more',
			'DAF eligible: Yes',
			'Currency loss possible: No',
		]);
	});

	it('handles operators the converter does not emit', () => {
		const result = presentFlssFilters({ gender: { any: ['female', 'male'] }, tagId: { none: [3] } });
		expect(result).toEqual([
			{ key: 'gender', label: 'Gender', values: ['Female', 'Male'] },
			{ key: 'tagId', label: 'Excluded tags', values: ['3'] },
		]);
	});

	it('tolerates null facets, facet entries, names and changes', () => {
		const facets = {
			countryFacets: [null, { country: { isoCode: 'KE', name: null } }],
			sectorFacets: [null, { id: 1, name: null }],
		} as unknown as typeof allFacets;
		const filters = { countryIsoCode: { any: ['KE'] }, sectorId: { any: [1] } };
		expect(presentFlssFilters(filters, null, null).map((c) => c.values)).toEqual([['KE'], ['1']]);
		expect(presentFlssFilters(filters, facets).map((c) => c.values)).toEqual([['KE'], ['1']]);
	});

	it('attaches change notes by key', () => {
		const result = presentFlssFilters(
			{ keywordSearch: { eq: 'solar' } },
			{},
			[{ key: 'keywordSearch', note: 'May differ.' }],
		);
		expect(result).toEqual([{
			key: 'keywordSearch', label: 'Keyword', values: ['solar'], note: 'May differ.',
		}]);
	});
});
