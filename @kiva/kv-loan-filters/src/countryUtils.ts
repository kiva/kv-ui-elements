import orderBy from 'lodash.orderby';

/**
 * Sorts the provided regions and countries of regions
 *
 * @param regions The regions to sort
 * @returns New sorted array
 */
export const sortRegions = (regions) => {
	const sorted = orderBy(regions, 'region');

	// eslint-disable-next-line no-param-reassign
	sorted.forEach((region) => { region.countries = orderBy(region.countries, 'name'); });

	return sorted;
};

/**
 * Map isoCode to country name
 *
 * @param isoCode The code to map
 * @param countryList The country list to search
 * @returns The country name
 */
export const isoToCountryName = (isoCode, countryList = []) => {
	const isoMatch = countryList.find((country) => country.isoCode === isoCode);
	return isoMatch?.name ?? null;
};

/**
 * Map isoCode List to region keyed object with country name array
 *
 * @param isoCodes The codes to map
 * @param regions The regions to use when mapping
 * @returns The mapped country names
 */
export const mapIsoCodesToCountryNames = (isoCodes, regions) => {
	if (!isoCodes || !regions) return {};

	const mappedIsos = regions.reduce((regionObject, region) => {
		const countryNames = isoCodes.filter(
			(iso) => region?.countries?.find((country) => country.isoCode === iso),
		).map((iso) => {
			return isoToCountryName(iso, region?.countries);
		});
		return countryNames.length ? { ...regionObject, [region.region]: countryNames } : { ...regionObject };
	}, {});

	return mappedIsos;
};

/**
 * Builds a flattened list of the ISO codes of the provided regions with countries
 *
 * @param regions All of the regions with countries
 * @param selectedCountries An object where the props are regions and values are countries
 * @returns Flat list of the ISO codes
 */
export const getIsoCodes = (regions, selectedCountries): string[] => {
	return Object.keys(selectedCountries).reduce((prev, current) => {
		const codes = regions
			.find((r) => r.region === current)?.countries
			.filter((c) => selectedCountries[current].includes(c.name))
			.map((c) => c.isoCode);
		return [...prev, ...(codes || [])];
	}, []);
};

/**
 * Transforms ISO codes into regions usable by the filters
 *
 * @param countryFacets The ISO codes from FLSS
 * @param allCountryFacets The countries from lend API
 * @returns Regions with lists of countries
 */
export const transformIsoCodes = (filteredIsoCodes, allCountryFacets = []) => {
	const transformed = [];

	filteredIsoCodes.forEach(({ key: isoCode, value: numLoansFundraising }) => {
		// Create company object based on country defined by lend API
		const lookupCountry = allCountryFacets.find(({ country }) => {
			// Case insensitive matching just in case lend and FLSS APIs have different casing
			return country.isoCode.toUpperCase() === isoCode.toUpperCase();
		});
		if (!lookupCountry) return;
		const country = { ...lookupCountry.country, isoCode, numLoansFundraising };

		// Find existing transformed region or add a new region
		const region = transformed.find((t) => t.region === country.region);
		if (region) {
			region.countries.push(country);
			region.numLoansFundraising += numLoansFundraising;
		} else {
			transformed.push({ region: country.region, countries: [country], numLoansFundraising });
		}
	});

	return sortRegions(transformed);
};
