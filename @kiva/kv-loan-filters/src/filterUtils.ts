import pageOffset, { facetsKey as pageOffsetKey } from './pageOffset';
import pageLimit, { facetsKey as pageLimitKey } from './pageLimit';
import genders, { facetsKey as gendersKey } from './genders';
import isIndividual, { facetsKey as isIndividualKey } from './isIndividual';
import keywordSearch, { facetsKey as keywordSearchKey } from './keywordSearch';
import sortOptions, { facetsKey as sortOptionsKey } from './sortOptions';
import regions, { facetsKey as regionsKey } from './regions';
import sectors, { facetsKey as sectorsKey } from './sectors';
import themes, { facetsKey as themesKey } from './themes';
import tags, { facetsKey as tagsKey } from './tags';
import lenderRepaymentTerms, { facetsKey as lenderRepaymentTermsKey } from './lenderRepaymentTerms';
import distributionModels, { facetsKey as distributionModelsKey } from './distributionModels';
import partners, { facetsKey as partnersKey } from './partners';
import partnerRiskRating, { facetsKey as partnerRiskRatingKey } from './partnerRiskRating';
import partnerDefaultRate, { facetsKey as partnerDefaultRateKey } from './partnerDefaultRate';
import partnerAvgProfitability, { facetsKey as partnerAvgProfitabilityKey } from './partnerAvgProfitability';
import activities, { facetsKey as activitiesKey } from './activities';
import isMatchable, { facetsKey as isMatchableKey } from './isMatchable';
import categories, { facetsKey as categoriesKey } from './categories';

const filters = {
	[pageOffsetKey]: pageOffset,
	[pageLimitKey]: pageLimit,
	[gendersKey]: genders,
	[isIndividualKey]: isIndividual,
	[keywordSearchKey]: keywordSearch,
	[sortOptionsKey]: sortOptions,
	[regionsKey]: regions,
	[sectorsKey]: sectors,
	[themesKey]: themes,
	[tagsKey]: tags,
	[lenderRepaymentTermsKey]: lenderRepaymentTerms,
	[distributionModelsKey]: distributionModels,
	[partnersKey]: partners,
	[partnerRiskRatingKey]: partnerRiskRating,
	[partnerDefaultRateKey]: partnerDefaultRate,
	[partnerAvgProfitabilityKey]: partnerAvgProfitability,
	[activitiesKey]: activities,
	[isMatchableKey]: isMatchable,
	[categoriesKey]: categories,
};

export default {
	filters,
	keys: Object.keys(filters) as (keyof(typeof filters))[],
};
