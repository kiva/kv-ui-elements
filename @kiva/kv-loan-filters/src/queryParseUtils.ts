import { isNumber } from './numberUtils';
import { createMinMaxRange } from './minMaxRangeUtils';

/**
 * Returns the enum name property based on the query param
 *
 * @param param The query param
 * @param facets Facets from the API
 * @param queryMap Maps query values to expected values
 * @returns The valid enum value
 */
export const getEnumNameFromQueryParam = (param, facets, queryMap?) => {
	if (param) {
		if (queryMap) {
			Object.keys(queryMap).forEach((key) => {
				if (queryMap[key] === param) {
					// eslint-disable-next-line no-param-reassign
					param = key;
				}
			});
		}

		return facets?.find((f) => f.name.toUpperCase() === param.toUpperCase())?.name;
	}
};

/**
 * Gets boolean value based on string query param
 *
 * @param param The query param to parse
 * @returns The boolean value
 */
export const getBooleanValueFromQueryParam = (param?) => {
	const lowerParam = param?.toLowerCase();

	// eslint-disable-next-line no-nested-ternary
	return lowerParam === 'true' ? true : (lowerParam === 'false' ? false : null);
};

/**
 * Gets the min max range object based on string query param
 *
 * @param param The query param to parse
 * @returns The min max range object
 */
export const getMinMaxRangeFromQueryParam = (param?) => {
	if (!param) return;

	const minMaxSplit = param?.split(',');

	if (minMaxSplit.length === 2 && isNumber(minMaxSplit[0]) && isNumber(minMaxSplit[1])) {
		return createMinMaxRange(+minMaxSplit[0], +minMaxSplit[1]);
	}
};

/**
 * Returns IDs based on the query param. Handles FLSS/legacy and Algolia formats.
 *
 * @param param The query param
 * @param names Facet names from the APIs
 * @param facets Facets from the APIs
 * @returns Valid IDs based on the query param
 */
export const getIdsFromQueryParam = (param?, names?, facets?) => {
	if (!param) return;

	// Handles FLSS and legacy query params, such as "1" and "1,2" AND chained theme names
	if (param.includes(',') || isNumber(param)) {
		return param.split(',').reduce((prev, current) => {
			const name = current.toUpperCase();
			if (names?.includes(name)) {
				const facet = facets?.find((s) => s.name.toUpperCase() === name);

				if (facet) {
					prev.push(facet.id);
				}
			} else if (isNumber(current)) {
				return [...prev, parseInt(current, 10)];
			}

			return prev;
		}, []);
	}

	// Handles Algolia query params, such as "Arts" and "Arts~Clothing" AND single theme names
	return param.split('~').reduce((prev, current) => {
		const name = current.toUpperCase();

		if (names?.includes(name)) {
			const facet = facets?.find((s) => s.name.toUpperCase() === name);

			if (facet) {
				prev.push(facet.id);
			}
		}

		return prev;
	}, []);
};
