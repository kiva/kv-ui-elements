const unique = <T>(values: T[]): T[] => [...new Set(values)];

const splitQueryParam = (param): string[] => (Array.isArray(param) ? param : [param])
	.filter((p) => typeof p === 'string')
	.reduce((prev, p) => prev.concat(p.split(',')), []);

/**
 * Validates pass-through string filter values, which have no facets to check against
 *
 * @param values The filter values
 * @returns Trimmed, non-empty, unique strings
 */
export const getValidatedStrings = (values): string[] => {
	if (!Array.isArray(values)) return [];

	return unique(values
		.filter((v) => typeof v === 'string')
		.map((v) => v.trim())
		.filter((v) => v));
};

/**
 * Validates pass-through integer filter values, which have no facets to check against
 *
 * @param values The filter values
 * @returns Unique positive integers
 */
export const getValidatedIntegers = (values): number[] => {
	if (!Array.isArray(values)) return [];

	return unique(values.filter((v) => Number.isInteger(v) && v > 0));
};

/**
 * Gets pass-through string filter values from a comma-separated query param
 *
 * @param param The query param, a string or an array when repeated
 * @returns The validated strings
 */
export const getStringsFromQueryParam = (param): string[] => getValidatedStrings(splitQueryParam(param));

/**
 * Gets pass-through integer filter values from a comma-separated query param
 *
 * @param param The query param, a string or an array when repeated
 * @returns The validated integers
 */
export const getIntegersFromQueryParam = (param): number[] => getValidatedIntegers(
	splitQueryParam(param)
		.map((p) => p.trim())
		.filter((p) => /^\d+$/.test(p))
		.map((p) => parseInt(p, 10)),
);

/**
 * Gets one filter chip per pass-through value, labelled with the value itself
 *
 * @param values The filter values
 * @returns The filter chips
 */
export const getPassThroughChips = (values) => (Array.isArray(values) ? values : [])
	.map((v) => ({ id: v, name: String(v) }));
