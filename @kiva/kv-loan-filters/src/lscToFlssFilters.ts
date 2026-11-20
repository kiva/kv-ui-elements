import type {
	AutolendLoanSearchCriteria,
	FlssRange,
	FundraisingLoanSearchFilterInput,
	IdNameFacet,
	LscChange,
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
	// A stored max of 0 with a non-zero min also arrives as 5, so it becomes lte: 5 where processLsc has no max.
	return termRange(range);
};

const rateRange = (range?: LscRange | null) => {
	// The graph hides a range whose bounds are both 0 or null, so there is nothing to emit.
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

const convertThemes = (names: (string | null)[] | null | undefined, themeFacets?: IdNameFacet[] | null) => {
	const ids: number[] = [];
	const unconverted: LscUnconverted[] = [];
	compact(names).forEach((name) => {
		const facet = (themeFacets || []).find((f) => !!f?.name && normalizeName(f.name) === normalizeName(name));
		if (!facet) {
			unconverted.push({ field: 'theme', label: 'Attributes', value: name });
		} else if (!ids.includes(facet.id)) {
			ids.push(facet.id);
		}
	});
	return { themeId: ids.length ? { any: ids } : undefined, unconverted };
};

const unique = <T>(values: T[]): T[] => values.filter((value, index) => values.indexOf(value) === index);

const TRAILING_STATE = /^(.+?)\s+([A-Za-z]{2})$/;

const splitCityState = (entry: string): [string, string] | undefined => {
	const comma = entry.lastIndexOf(',');
	if (comma >= 0) {
		const city = entry.slice(0, comma).trim();
		const state = entry.slice(comma + 1).trim().toUpperCase();
		return city && state ? [city, state] : undefined;
	}
	// The monolith also stores "City ST" entries without a comma.
	const match = entry.match(TRAILING_STATE);
	return match ? [match[1].trim(), match[2].toUpperCase()] : undefined;
};

const convertCityStates = (entries: (string | null)[] | null | undefined) => {
	const cities: string[] = [];
	const states: string[] = [];
	const unconverted: LscUnconverted[] = [];
	compact(entries).map((entry) => entry.trim()).filter(Boolean).forEach((entry) => {
		const parts = splitCityState(entry);
		if (!parts) {
			unconverted.push({ field: 'cityState', label: 'Cities', value: entry });
			return;
		}
		cities.push(parts[0]);
		states.push(parts[1]);
	});
	return {
		city: cities.length ? { any: unique(cities) } : undefined,
		state: states.length ? { any: unique(states) } : undefined,
		unconverted,
	};
};

const KEYWORD_NOTE = 'Keyword matching in a saved search may differ from the legacy loan search.';
const CITY_NOTE = 'Matches any listed city in any listed state, not only the listed city and state pairs.';

const withoutUndefined = <T extends object>(obj: T): T => Object.keys(obj)
	.reduce((acc, key) => (obj[key] === undefined ? acc : { ...acc, [key]: obj[key] }), {} as T);

/**
 * Converts an auto-lend profile's graph `loanSearchCriteria` into FLSS saved-search filters.
 *
 * Fields that subscription-service's `processLsc` converts produce the same keys, operators and bounds, except where
 * the graph's reshaping of the stored LSC prevents it. Fields `processLsc` reports as failures are converted as a
 * best guess, since those lenders lend today with every criterion applied.
 *
 * Adjustments:
 * - Loan term and risk rating drop bounds of 0. Risk rating "All" (stored 0–5, hidden by the graph) becomes
 *   `lte: 5`, as in `processLsc`; a stored max of 0 with a non-zero min arrives padded to 5 and is kept as `lte: 5`.
 * - Default rate, delinquency, profitability and borrower cost keep a min of 0, and treat a max of 0 above a
 *   positive min as unset. The graph hides a range whose bounds are both 0 or null, so "All" (stored 0/null) and a
 *   0% max (0/0) emit nothing. For default rate and delinquency, `processLsc` emits `gte: 0` (or `gte: 0, lte: 0`)
 *   there, which FLSS also uses to exclude loans without partner stats, such as direct loans.
 * - Empty lists are omitted where `processLsc` emits an empty modifier (`{}`).
 * - Theme names resolve to ids through `allFacets.themeFacets`. Unmatched names go to `unconverted`.
 * - `queryString` becomes `keywordSearch`, with a `changes` note: FLSS keyword matching may differ.
 * - `cityState` entries split into separate `city` and `state` lists, with a `changes` note: any listed city matches
 *   in any listed state. Entries that don't split go to `unconverted`.
 *
 * Dropped without an `unconverted` entry:
 * - Not criteria: `sortBy`, `loanLimit` (a profile setting), `status`, `loanIds`, `lenderFavorite`.
 * - Dropped by subscription-service before conversion, so these lenders aren't matched on them today: `isMatched`,
 *   `matcherAccountId` (the monolith's expansion of "matched only"), `expiringSoon`, `excludeNonRated` (no FLSS
 *   filter). FLSS `isMatchable: { eq: true }` is the candidate if "matched only" is ever converted.
 * - Search-only, never stored on an LSC: `hasResearchScore`, `anonymizationLevel`.
 * - Never returned by the graph, so undetectable: amount, borrower age, states, zips, social performance badges,
 *   `noTrustee`.
 *
 * Query the criteria with `autolendLscSelection`: a field missing from the query reads as unset.
 *
 * @param lsc The graph `loanSearchCriteria` (`{ queryString, filters }`).
 * @param allFacets `themeFacets` resolves theme names to ids; the other facets are not read.
 * @returns `filters`: one group, ready to pass to `createFundraisingLoanSavedSearch`. `[{}]` when nothing converts.
 * `changes`: keys whose saved search may match differently from the LSC.
 * `unconverted`: criteria present in the LSC that could not be carried over, ready to render.
 */
export default function lscToFlssFilters(
	lsc?: AutolendLoanSearchCriteria | null,
	allFacets?: LscFacets | null,
): LscConversion {
	const keyword = typeof lsc?.queryString === 'string' ? lsc.queryString.trim() : '';
	const keywordSearch = keyword ? { eq: keyword } : undefined;
	const changes: LscChange[] = keywordSearch ? [{ key: 'keywordSearch', note: KEYWORD_NOTE }] : [];

	const filters = lsc?.filters;
	// Without a filters object there is no stored LSC row, so no 0–5 risk default either.
	if (!filters) return { filters: [withoutUndefined({ keywordSearch })], changes, unconverted: [] };

	const themes = convertThemes(filters.theme, allFacets?.themeFacets);
	// The graph resolver populates the deprecated city_state rather than cityState.
	const cityStates = convertCityStates(compact(filters.cityState).length ? filters.cityState : filters.city_state);
	if (cityStates.city) changes.push({ key: 'city', note: CITY_NOTE });

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
		// For these two, processLsc sends a hidden "All" as gte: 0, which also excludes loans without partner stats.
		partnerDefaultRate: rateRange(filters.defaultRate),
		delinquencyRate: rateRange(filters.arrearsRate),
		keywordSearch,
		trusteeId: anyOf(filters.trustee),
		partnerAvgProfitability: rateRange(filters.profitability),
		partnerAvgBorrowerCost: rateRange(filters.avgBorrowerCost),
		dafEligible: filters.dafEligible === true ? { eq: true } : undefined,
		isCurrencyLossPossible: filters.currencyLossPossible === false ? { eq: false } : undefined,
		city: cityStates.city,
		state: cityStates.state,
	});

	return { filters: [group], changes, unconverted: [...themes.unconverted, ...cityStates.unconverted] };
}
