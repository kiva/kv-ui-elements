export interface LscRange { min?: number | null; max?: number | null }

export interface LscFilters {
	activity?: (number | null)[] | null;
	arrearsRate?: LscRange | null;
	avgBorrowerCost?: LscRange | null;
	cityState?: (string | null)[] | null;
	'city_state'?: (string | null)[] | null;
	country?: (string | null)[] | null;
	currencyLossPossible?: boolean | null;
	dafEligible?: boolean | null;
	defaultRate?: LscRange | null;
	distributionModel?: string | null;
	gender?: string | null;
	isGroup?: boolean | null;
	lenderTerm?: LscRange | null;
	loanTags?: (number | null)[] | null;
	partner?: (number | null)[] | null;
	profitability?: LscRange | null;
	riskRating?: LscRange | null;
	sector?: (number | null)[] | null;
	theme?: (string | null)[] | null;
	trustee?: (number | null)[] | null;
	[key: string]: unknown;
}

export interface AutolendLoanSearchCriteria {
	queryString?: string | null;
	filters?: LscFilters | null;
	[key: string]: unknown;
}

export interface FlssRange { gte?: number; lte?: number }

export type FundraisingLoanSearchFilterInput = {
	activityId?: { any: number[] };
	city?: { any: string[] };
	countryIsoCode?: { any: string[] };
	dafEligible?: { eq: boolean };
	delinquencyRate?: { range: FlssRange };
	distributionModel?: { eq: 'DIRECT' | 'FIELDPARTNER' };
	gender?: { eq: string };
	isCurrencyLossPossible?: { eq: boolean };
	isIndividual?: { eq: boolean };
	keywordSearch?: { eq: string };
	lenderRepaymentTerm?: { range: FlssRange };
	partnerAvgBorrowerCost?: { range: FlssRange };
	partnerAvgProfitability?: { range: FlssRange };
	partnerDefaultRate?: { range: FlssRange };
	partnerId?: { any: number[] };
	partnerRiskRating?: { range: FlssRange };
	sectorId?: { any: number[] };
	state?: { any: string[] };
	tagId?: { any: number[] };
	themeId?: { any: number[] };
	trusteeId?: { any: number[] };
};

export interface LscChange { key: string; note: string }

export interface LscUnconverted { field: string; label: string; value: string }

export interface LscConversion {
	filters: FundraisingLoanSearchFilterInput[];
	changes: LscChange[];
	unconverted: LscUnconverted[];
}

export interface IdNameFacet { id: number; name: string }

export interface LscFacets {
	countryFacets?: { country: { isoCode: string; name: string } }[];
	sectorFacets?: IdNameFacet[];
	themeFacets?: IdNameFacet[];
	partnerFacets?: IdNameFacet[];
	tagFacets?: IdNameFacet[];
}

export interface PresentedCriterion { key: string; label: string; values: string[]; note?: string }
