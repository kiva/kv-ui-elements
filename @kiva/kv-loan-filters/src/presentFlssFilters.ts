import type {
	IdNameFacet,
	LscChange,
	LscFacets,
	PresentedCriterion,
} from './lscTypes';

const LABELS: [string, string][] = [
	['countryIsoCode', 'Countries'],
	['sectorId', 'Sectors'],
	['partnerId', 'Lending partners'],
	['themeId', 'Attributes'],
	['gender', 'Gender'],
	['isIndividual', 'Borrower type'],
	['partnerRiskRating', 'Risk rating'],
	['lenderRepaymentTerm', 'Loan term'],
	['partnerDefaultRate', 'Default rate'],
	['delinquencyRate', 'Delinquency rate'],
	['distributionModel', 'Distribution model'],
	['tagId', 'Tags'],
	['activityId', 'Activities'],
	['keywordSearch', 'Keyword'],
	['trusteeId', 'Trustees'],
	['city', 'Cities'],
	['state', 'States'],
	['partnerAvgProfitability', 'Average profitability'],
	['partnerAvgBorrowerCost', 'Average borrower cost'],
	['dafEligible', 'DAF eligible'],
	['isCurrencyLossPossible', 'Currency loss possible'],
];

const OPERATORS = ['any', 'all', 'eq', 'range', 'ne', 'none'];

const FRACTION_KEYS = ['partnerDefaultRate', 'delinquencyRate'];

const PERCENT_KEYS = ['partnerAvgProfitability', 'partnerAvgBorrowerCost'];

const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const hasOwn = (obj: object, key: string) => Object.prototype.hasOwnProperty.call(obj, key);

const idFacets = (key: string, allFacets: LscFacets): IdNameFacet[] | undefined => {
	switch (key) {
		case 'sectorId': return allFacets.sectorFacets;
		case 'partnerId': return allFacets.partnerFacets;
		case 'themeId': return allFacets.themeFacets;
		case 'tagId': return allFacets.tagFacets;
		default: return undefined;
	}
};

const facetName = (key: string, value: unknown, allFacets: LscFacets): string | null | undefined => {
	if (key === 'countryIsoCode') {
		return allFacets.countryFacets?.find((facet) => facet?.country?.isoCode === value)?.country?.name;
	}
	return idFacets(key, allFacets)?.find((facet) => facet?.id === value)?.name;
};

const formatValue = (key: string, value: unknown, allFacets: LscFacets): string => {
	const name = facetName(key, value, allFacets);
	if (name) return name;
	if (key === 'gender' && typeof value === 'string') return value.charAt(0).toUpperCase() + value.slice(1);
	if (key === 'isIndividual' && typeof value === 'boolean') return value ? 'Individuals' : 'Groups';
	if (key === 'distributionModel' && value === 'DIRECT') return 'Direct';
	if (key === 'distributionModel' && value === 'FIELDPARTNER') return 'Field partner';
	if (typeof value === 'boolean') return value ? 'Yes' : 'No';
	return String(value);
};

const formatBound = (key: string, value: number) => {
	if (FRACTION_KEYS.includes(key)) return `${Number((value * 100).toFixed(2))}%`;
	if (PERCENT_KEYS.includes(key)) return `${value}%`;
	return String(value);
};

const formatRange = (key: string, range: unknown): string | undefined => {
	if (!range || typeof range !== 'object') return undefined;
	const { gte, lte } = range as Record<string, unknown>;
	const unit = key === 'lenderRepaymentTerm' ? ' months' : '';
	const low = isFiniteNumber(gte) ? formatBound(key, gte) : undefined;
	const high = isFiniteNumber(lte) ? formatBound(key, lte) : undefined;
	if (low !== undefined && high !== undefined) return `${low} to ${high}${unit}`;
	if (low !== undefined) return `${low}${unit} or more`;
	if (high !== undefined) return `${high}${unit} or less`;
	return undefined;
};

const operandValues = (key: string, operator: string, operand: unknown, allFacets: LscFacets): string[] => {
	if (operator === 'range') {
		const text = formatRange(key, operand);
		return text === undefined ? [] : [text];
	}
	return (Array.isArray(operand) ? operand : [operand])
		.filter((value) => value !== null && value !== undefined)
		.map((value) => formatValue(key, value, allFacets));
};

const operatorLabel = (label: string, operator: string) => {
	if (operator === 'none' || operator === 'ne') return `Excluded ${label.toLowerCase()}`;
	if (operator === 'all') return `${label} (all of)`;
	return label;
};

/**
 * Presents one FLSS filter group as ordered, human-readable criteria.
 *
 * Criteria follow the auto-lend settings page's order, then the remaining known filters, then any unknown keys in
 * input order, labelled with the raw key. Operators the converter never emits (`all`, `ne`, `none`) are shown with a
 * qualifier ("Excluded tags") rather than dropped, so existing saved searches can be shown too. A modifier with
 * several operators yields one criterion per operator.
 *
 * @param filters One group, e.g. `lscToFlssFilters(...).filters[0]` or a saved search's `filters[0]`.
 * @param allFacets Resolves country, sector, partner, theme and tag names. Unknown ids, and filters without facets
 * (activities, trustees), fall back to the raw value as a string.
 * @param changes `lscToFlssFilters`'s `changes`; each criterion carries the notes for its key.
 * @returns `{ key, label, values, note? }` per criterion. Rates are percentages, loan term is in months, and
 * booleans and enums are words.
 */
export default function presentFlssFilters(
	filters?: Record<string, Record<string, unknown>> | null,
	allFacets?: LscFacets | null,
	changes?: LscChange[] | null,
): PresentedCriterion[] {
	if (!filters) return [];
	const facets = allFacets || {};
	const keys = Object.keys(filters);
	const ordered: [string, string][] = [
		...LABELS.filter(([key]) => keys.includes(key)),
		...keys.filter((key) => !LABELS.some(([known]) => known === key)).map((key): [string, string] => [key, key]),
	];

	return ordered.reduce((criteria: PresentedCriterion[], [key, label]) => {
		const modifier = filters[key];
		if (!modifier || typeof modifier !== 'object') return criteria;
		const notes = (changes || []).filter((change) => change.key === key).map((change) => change.note);
		const presented = OPERATORS
			.filter((operator) => hasOwn(modifier, operator))
			.map((operator) => ({
				key,
				label: operatorLabel(label, operator),
				values: operandValues(key, operator, modifier[operator], facets),
			}))
			.filter((criterion) => criterion.values.length)
			.map((criterion) => (notes.length ? { ...criterion, note: notes.join(' ') } : criterion));
		return [...criteria, ...presented];
	}, []);
}
