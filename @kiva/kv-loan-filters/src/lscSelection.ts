/**
 * Every `loanSearchCriteria` field `lscToFlssFilters` reads. Interpolate it inside `loanSearchCriteria { … }`.
 * A field left out of the query is indistinguishable from an unset criterion, so the conversion would drop it.
 */
const autolendLscSelection = `
	queryString
	filters {
		activity
		arrearsRate { min max }
		avgBorrowerCost { min max }
		city_state
		cityState
		country
		currencyLossPossible
		dafEligible
		defaultRate { min max }
		distributionModel
		gender
		isGroup
		lenderTerm { min max }
		loanTags
		partner
		profitability { min max }
		riskRating { min max }
		sector
		theme
		trustee
	}
`;

export default autolendLscSelection;
