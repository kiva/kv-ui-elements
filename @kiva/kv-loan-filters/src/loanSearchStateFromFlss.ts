const ANY_KEYS = [
	'activityId',
	'city',
	'countryIsoCode',
	'matcherAccountIds',
	'partnerId',
	'postalCode',
	'sectorId',
	'state',
	'tagId',
	'themeId',
	'trusteeId',
];

const EQ_KEYS = [
	'dafEligible',
	'distributionModel',
	'flexibleFundraisingEnabled',
	'isIndividual',
	'isMatchable',
	'keywordSearch',
];

const RANGE_KEYS = [
	'amountLeft',
	'daysUntilExpiration',
	'lenderRepaymentTerm',
	'loanAmount',
	'partnerAvgProfitability',
	'partnerDefaultRate',
	'partnerRiskRating',
];

const GENDER_KEY = 'gender';

const isPlainObject = (value) => !!value && typeof value === 'object' && !Array.isArray(value);

const hasOnlyKeys = (value, keys: string[]) => Object.keys(value).every((k) => keys.includes(k));

const isNumber = (value) => typeof value === 'number' && !Number.isNaN(value);

const convertRange = (range) => {
	if (!isPlainObject(range) || !hasOnlyKeys(range, ['gte', 'lte'])) return undefined;
	if (!isNumber(range.gte) && !isNumber(range.lte)) return undefined;
	if (('gte' in range && !isNumber(range.gte)) || ('lte' in range && !isNumber(range.lte))) return undefined;

	return {
		...('gte' in range && { min: range.gte }),
		...('lte' in range && { max: range.lte }),
		__typename: 'MinMaxRange',
	};
};

/**
 * Converts one FLSS filter modifier to its loan search state value
 *
 * @param key The filter key
 * @param modifier The FLSS modifier, e.g. `{ any: [1] }`
 * @returns `{ value }` when converted, `undefined` when the key or operator is not recognized
 */
const convertModifier = (key: string, modifier) => {
	if (!isPlainObject(modifier)) return undefined;
	const operators = Object.keys(modifier);
	if (operators.length !== 1) return undefined;
	const [operator] = operators;

	if (ANY_KEYS.includes(key) && operator === 'any' && Array.isArray(modifier.any)) {
		return { value: modifier.any };
	}
	if (EQ_KEYS.includes(key) && operator === 'eq') {
		return { value: modifier.eq };
	}
	if (RANGE_KEYS.includes(key) && operator === 'range') {
		const value = convertRange(modifier.range);
		return value ? { value } : undefined;
	}
	if (key === GENDER_KEY && (operator === 'eq' || operator === 'any')) {
		return { value: modifier[operator] };
	}

	return undefined;
};

/**
 * Converts a category saved search, in FLSS format, to loan search state.
 * Keys and operators that are not recognized are kept as they are.
 *
 * @param savedSearch.filters The FLSS filters, e.g. `[{ sectorId: { any: [1] } }]`
 * @param savedSearch.sortBy The FLSS sort
 * @returns The loan search state
 */
const flssToLoanSearchState = (
	{ filters, sortBy }: { filters?: unknown[] | null, sortBy?: string | null } = {},
) => {
	const state: Record<string, unknown> = {};

	(filters ?? []).forEach((filter) => {
		if (!isPlainObject(filter)) return;

		Object.entries(filter).forEach(([key, modifier]) => {
			state[key] = convertModifier(key, modifier)?.value ?? modifier;
		});
	});

	if (sortBy) state.sortBy = sortBy;

	return state;
};

export default flssToLoanSearchState;
