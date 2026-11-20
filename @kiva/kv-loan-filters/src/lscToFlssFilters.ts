import type {
	AutolendLoanSearchCriteria,
	FlssRange,
	FundraisingLoanSearchFilterInput,
	IdNameFacet,
	LscConversion,
	LscFacets,
	LscRange,
	LscUnconverted,
} from './lscTypes';

const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const compact = <T>(list?: (T | null)[] | null): T[] => (list || [])
	.filter((value): value is T => value !== null && value !== undefined);

const anyOf = <T>(list?: (T | null)[] | null): { any: T[] } | undefined => {
	const values = compact(list);
	// processLsc emits {} for an empty list; omitting the key matches the same loans.
	return values.length ? { any: values } : undefined;
};

const toRange = (gte?: number, lte?: number): { range: FlssRange } | undefined => {
	if (gte === undefined && lte === undefined) return undefined;
	return { range: { ...(gte === undefined ? {} : { gte }), ...(lte === undefined ? {} : { lte }) } };
};

const nonZero = (value: unknown): number | undefined => (isFiniteNumber(value) && value !== 0 ? value : undefined);

const termRange = (range?: LscRange | null) => (range ? toRange(nonZero(range.min), nonZero(range.max)) : undefined);

const riskRange = (range?: LscRange | null) => {
	// The graph hides a stored 0–5 risk rating, which processLsc sends as lte: 5.
	if (!range) return { range: { lte: 5 } };
	// The graph pads a stored max of 0 to 5, so 0–5 means no bound was set.
	if (nonZero(range.min) === undefined && range.max === 5) return undefined;
	return termRange(range);
};

const rateRange = (range?: LscRange | null) => {
	// "All" is stored as 0/null, which processLsc sends as gte: 0; the graph hides it, so emit nothing.
	if (!range) return undefined;
	const min = isFiniteNumber(range.min) ? range.min : undefined;
	// The graph casts an unset max to 0, which can't sit above a positive min.
	const maxUnset = range.max === 0 && min !== undefined && min > 0;
	return toRange(min, isFiniteNumber(range.max) && !maxUnset ? range.max : undefined);
};

const toDistributionModel = (value?: string | null): { eq: 'DIRECT' | 'FIELDPARTNER' } | undefined => {
	if (value === 'direct') return { eq: 'DIRECT' };
	if (value === 'fieldPartner') return { eq: 'FIELDPARTNER' };
	return undefined;
};

const normalizeName = (name: string) => name.trim().toLowerCase();

const convertThemes = (names: (string | null)[] | null | undefined, themeFacets: IdNameFacet[] = []) => {
	const ids: number[] = [];
	const unconverted: LscUnconverted[] = [];
	compact(names).forEach((name) => {
		const facet = themeFacets.find((f) => normalizeName(f.name) === normalizeName(name));
		if (!facet) {
			unconverted.push({ field: 'theme', label: 'Attributes', value: name });
		} else if (!ids.includes(facet.id)) {
			ids.push(facet.id);
		}
	});
	return { themeId: ids.length ? { any: ids } : undefined, unconverted };
};

const withoutUndefined = <T extends object>(obj: T): T => Object.keys(obj)
	.reduce((acc, key) => (obj[key] === undefined ? acc : { ...acc, [key]: obj[key] }), {} as T);

/**
 * Converts an auto-lend profile's graph `loanSearchCriteria` into FLSS saved-search filters.
 *
 * Fields shared with subscription-service's `processLsc` produce the same keys, operators and bounds, except
 * where the graph's reshaping of the stored LSC makes that impossible (noted at each branch).
 *
 * @param lsc The graph `loanSearchCriteria` (`{ queryString, filters }`). Null or missing filters yield `[{}]`.
 * @param allFacets `themeFacets` resolves theme names to ids; the other facets are not read.
 * @returns `filters`: one group, ready to pass to `createFundraisingLoanSavedSearch`.
 * `changes`: keys whose saved search may match differently from the LSC.
 * `unconverted`: criteria present in the LSC that could not be carried over, ready to render.
 */
export default function lscToFlssFilters(
	lsc?: AutolendLoanSearchCriteria | null,
	allFacets?: LscFacets,
): LscConversion {
	const filters = lsc?.filters;
	if (!filters) return { filters: [{}], changes: [], unconverted: [] };

	const themes = convertThemes(filters.theme, allFacets?.themeFacets);

	const group = withoutUndefined<FundraisingLoanSearchFilterInput>({
		countryIsoCode: anyOf(filters.country),
		sectorId: anyOf(filters.sector),
		partnerId: anyOf(filters.partner),
		activityId: anyOf(filters.activity),
		tagId: anyOf(filters.loanTags),
		themeId: themes.themeId,
		gender: filters.gender && filters.gender !== 'both' ? { eq: filters.gender } : undefined,
		isIndividual: typeof filters.isGroup === 'boolean' ? { eq: !filters.isGroup } : undefined,
		distributionModel: toDistributionModel(filters.distributionModel),
		lenderRepaymentTerm: termRange(filters.lenderTerm),
		partnerRiskRating: riskRange(filters.riskRating),
		partnerDefaultRate: rateRange(filters.defaultRate),
		delinquencyRate: rateRange(filters.arrearsRate),
	});

	return { filters: [group], changes: [], unconverted: themes.unconverted };
}
