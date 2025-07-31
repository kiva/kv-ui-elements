import activities, { facetsKey as activitiesKey } from './activities';
import amountLeft, { facetsKey as amountLeftKey } from './amountLeft';
import categories, { facetsKey as categoriesKey } from './categories';
import city, { facetsKey as cityKey } from './city';
import dafEligible, { facetsKey as dafEligibleKey } from './dafEligible';
import daysUntilExpiration, { facetsKey as daysUntilExpirationKey } from './daysUntilExpiration';
import distributionModels, { facetsKey as distributionModelsKey } from './distributionModels';
import flexibleFundraisingEnabled, { facetsKey as flexibleFundraisingEnabledKey } from './flexibleFundraisingEnabled';
import genders, { facetsKey as gendersKey } from './genders';
import isIndividual, { facetsKey as isIndividualKey } from './isIndividual';
import isMatchable, { facetsKey as isMatchableKey } from './isMatchable';
import keywordSearch, { facetsKey as keywordSearchKey } from './keywordSearch';
import lenderRepaymentTerms, { facetsKey as lenderRepaymentTermsKey } from './lenderRepaymentTerms';
import loanAmount, { facetsKey as loanAmountKey } from './loanAmount';
import pageLimit, { facetsKey as pageLimitKey } from './pageLimit';
import pageOffset, { facetsKey as pageOffsetKey } from './pageOffset';
import partnerAvgProfitability, { facetsKey as partnerAvgProfitabilityKey } from './partnerAvgProfitability';
import partnerDefaultRate, { facetsKey as partnerDefaultRateKey } from './partnerDefaultRate';
import partnerRiskRating, { facetsKey as partnerRiskRatingKey } from './partnerRiskRating';
import partners, { facetsKey as partnersKey } from './partners';
import postalCode, { facetsKey as postalCodeKey } from './postalCode';
import regions, { facetsKey as regionsKey } from './regions';
import sectors, { facetsKey as sectorsKey } from './sectors';
import sortOptions, { facetsKey as sortOptionsKey } from './sortOptions';
import state, { facetsKey as stateKey } from './state';
import tags, { facetsKey as tagsKey } from './tags';
import themes, { facetsKey as themesKey } from './themes';
import trusteeId, { facetsKey as trusteeIdKey } from './trusteeId';

const filters = {
	[activitiesKey]: activities,
	[amountLeftKey]: amountLeft,
	[categoriesKey]: categories,
	[cityKey]: city,
	[dafEligibleKey]: dafEligible,
	[daysUntilExpirationKey]: daysUntilExpiration,
	[distributionModelsKey]: distributionModels,
	[flexibleFundraisingEnabledKey]: flexibleFundraisingEnabled,
	[gendersKey]: genders,
	[isIndividualKey]: isIndividual,
	[isMatchableKey]: isMatchable,
	[keywordSearchKey]: keywordSearch,
	[lenderRepaymentTermsKey]: lenderRepaymentTerms,
	[loanAmountKey]: loanAmount,
	[pageLimitKey]: pageLimit,
	[pageOffsetKey]: pageOffset,
	[partnerAvgProfitabilityKey]: partnerAvgProfitability,
	[partnerDefaultRateKey]: partnerDefaultRate,
	[partnerRiskRatingKey]: partnerRiskRating,
	[partnersKey]: partners,
	[postalCodeKey]: postalCode,
	[regionsKey]: regions,
	[sectorsKey]: sectors,
	[sortOptionsKey]: sortOptions,
	[stateKey]: state,
	[tagsKey]: tags,
	[themesKey]: themes,
	[trusteeIdKey]: trusteeId,
};

export default {
	filters,
	keys: Object.keys(filters) as (keyof(typeof filters))[],
};
