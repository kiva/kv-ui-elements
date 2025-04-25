import gql from 'graphql-tag';
import numeral from 'numeral';
import {
	computed,
	toRefs,
} from 'vue';

import { mdiMapMarker } from '@mdi/js';

const LSE_LOAN_KEY = 'N/A';
const ECO_FRIENDLY_KEY = 'ECO-FRIENDLY';
const SUSTAINABLE_AG_KEY = 'SUSTAINABLE AG';
const SINGLE_PARENT_KEY = 'SINGLE PARENT';
const REFUGEE_KEY = 'REFUGEES/DISPLACED';

const findCalloutData = (tags, tagName) => tags?.find((t) => t.name.replace('#', '').toUpperCase() === tagName.toUpperCase()) ?? {}; // eslint-disable-line max-len

export const LOAN_CALLOUTS_FRAGMENT = gql`
	fragment LoanCallouts on LoanBasic {
		id
		activity {
			id
			name
		}
		sector {
			id
			name
		}
		tags
		... on LoanPartner {
			partnerName
			themes
		}
	}
`;

export const LOAN_GEOCODE_FRAGMENT = gql`
	fragment LoanGeocode on LoanBasic {
		id
		geocode {
			city
			state
			country {
				name
				isoCode
			}
		}
	}
`;

export const LOAN_PROGRESS_FRAGMENT = gql`
	fragment LoanProgress on LoanBasic {
		id
		loanAmount
		loanFundraisingInfo {
			id
			fundedAmount
			reservedAmount
		}
	}
`;

export function loanCardComputedProperties(props, hideUnitedStatesText = false) {
	const {
		externalLinks,
		customLoanDetails,
		loanId,
		loan,
		categoryPageName,
		customCallouts,
	} = toRefs(props);

	const tag = computed(() => (externalLinks.value ? 'a' : 'router-link'));
	const readMorePath = computed(() => (customLoanDetails.value ? '' : `/lend/${loanId.value}`));
	const isLoading = computed(() => !loanId.value || !loan.value);
	const borrowerName = computed(() => loan.value?.name || '');
	const countryName = computed(() => loan.value?.geocode?.country?.name || '');
	const countryCode = computed(() => loan.value?.geocode?.country?.isoCode || '');
	const city = computed(() => loan.value?.geocode?.city || '');
	const state = computed(() => loan.value?.geocode?.state || '');
	const distributionModel = computed(() => loan.value?.distributionModel || '');
	const imageHash = computed(() => loan.value?.image?.hash ?? '');
	const hasProgressData = computed(() => {
		return typeof loan.value?.loanAmount !== 'undefined'
			&& typeof loan.value?.loanFundraisingInfo?.fundedAmount !== 'undefined'
			&& typeof loan.value?.loanFundraisingInfo?.reservedAmount !== 'undefined';
	});

	const allDataLoaded = computed(() => !isLoading.value && hasProgressData.value);

	const formattedLocation = computed(() => {
		if (distributionModel.value === 'direct') {
			const countryText = hideUnitedStatesText && countryName.value.toLowerCase() === 'united states'
				? '' : `, ${countryName.value}`;
			return `${city.value}, ${state.value}${countryText}`;
		}
		if (countryName.value === 'Puerto Rico') {
			return `${city.value}, PR`;
		}
		return countryName.value;
	});

	const loanUse = computed(() => loan.value?.use ?? '');

	const loanStatus = computed(() => loan.value?.status ?? '');

	const loanAmount = computed(() => loan.value?.loanAmount ?? '0');
	const progressNumeral = computed(() => {
		return numeral(loan.value?.loanFundraisingInfo?.reservedAmount ?? '0')
			.add(loan.value?.loanFundraisingInfo?.fundedAmount ?? '0');
	});
	const fundraisingPercent = computed(() => {
		return progressNumeral.value.clone().divide(loanAmount.value).value();
	});
	const sharesAvailable = computed(() => {
		return hasProgressData.value && loanAmount.value - progressNumeral.value.value() > 0;
	});
	const unreservedAmount = computed(() => {
		if (!sharesAvailable.value) return '0';
		return numeral(loanAmount.value).subtract(progressNumeral.value.value()).format('0.00');
	});

	const loanBorrowerCount = computed(() => loan.value?.borrowerCount ?? 0);

	const loanCallouts = computed(() => {
		const callouts = [];

		const activityName = loan.value?.activity?.name ?? '';
		const activityId = loan.value?.activity?.id ?? null;
		const sectorName = loan.value?.sector?.name ?? '';
		const sectorId = loan.value?.sector?.id ?? null;
		const tags = loan.value?.tags?.filter((loantag) => loantag.charAt(0) === '#')
			.map((loantag) => loantag.substring(1)) ?? [];
		const themes = loan.value?.themes ?? [];
		const categories = {
			ecoFriendly: !!tags
				.filter((t) => t.toUpperCase() === ECO_FRIENDLY_KEY || t.toUpperCase() === SUSTAINABLE_AG_KEY).length,
			refugeesIdps: !!themes.filter((t) => t.toUpperCase() === REFUGEE_KEY).length,
			singleParents: !!tags.filter((t) => t.toUpperCase() === SINGLE_PARENT_KEY).length,
		};

		const isLseLoan = loan.value?.partnerName?.toUpperCase().includes(LSE_LOAN_KEY);

		const tagsData = loan.value?.tagsData ?? [];
		const themesData = loan.value?.themesData ?? [];

		// P1 Category
		// Exp limited to: Eco-friendly, Refugees and IDPs, Single Parents
		// Tag as first option for LSE loans
		if (isLseLoan && tags.length) {
			const position = Math.floor(Math.random() * tags.length);
			const p1Tag = tags[position];
			const tagData = findCalloutData(tagsData, p1Tag);
			const id = tagData?.id ?? null;
			callouts.push({ label: p1Tag, type: 'tag', id });
		}

		if (!categoryPageName.value) {
			if (categories.ecoFriendly
				// eslint-disable-next-line max-len
				&& !callouts.find((c) => c.label.toUpperCase() === ECO_FRIENDLY_KEY || c.label.toUpperCase() === SUSTAINABLE_AG_KEY)) {
				callouts.push({ label: 'Eco-friendly', type: 'tag', id: 9 });
			} else if (categories.refugeesIdps) {
				callouts.push({ label: 'Refugees and IDPs', type: 'attribute', id: 28 });
			} else if (categories.singleParents
				&& !callouts.find((c) => c.label.toUpperCase() === SINGLE_PARENT_KEY)) {
				callouts.push({ label: 'Single Parent', type: 'tag', id: 17 });
			}
		}

		// P2 Activity
		if (activityName && activityId && categoryPageName.value?.toUpperCase() !== activityName.toUpperCase()) {
			callouts.push({ id: activityId, label: activityName, type: 'activity' });
		}

		// P3 Sector
		if (sectorName && sectorId
			&& (activityName.toUpperCase() !== sectorName.toUpperCase())
			&& (sectorName.toUpperCase() !== categoryPageName.value?.toUpperCase())
			&& callouts.length < 2) {
			callouts.push({ id: sectorId, label: sectorName, type: 'sector' });
		}

		// P4 Tag
		if (!!tags.length && callouts.length < 2) {
			const position = Math.floor(Math.random() * tags.length);
			const p4Tag = tags[position];
			const tagData = findCalloutData(tagsData, p4Tag);
			const id = tagData?.id ?? null;
			if (!callouts.filter((c) => c.label.toUpperCase() === p4Tag.toUpperCase()).length) {
				callouts.push({ label: p4Tag, type: 'tag', id });
			}
		}

		// P5 Theme
		if (!!themes.length && callouts.length < 2) {
			const position = Math.floor(Math.random() * themes.length);
			const theme = themes[position];
			const themeData = findCalloutData(themesData, theme);
			const id = themeData?.id ?? null;
			if (!callouts.filter((c) => c.label.toUpperCase() === theme.toUpperCase()).length
				&& theme.toUpperCase() !== categoryPageName.value?.toUpperCase()) {
				callouts.push({ label: theme, type: 'attribute', id });
			}
		}

		// Only show one callout for LSE loans
		if (isLseLoan && callouts.length > 1) return [callouts.shift()];

		// Add all custom callouts if available
		const customTags = customCallouts.value?.map((c) => ({ label: c })) ?? [];
		callouts.push(...customTags);
		return callouts;
	});

	return {
		tag,
		readMorePath,
		isLoading,
		borrowerName,
		countryName,
		countryCode,
		city,
		state,
		distributionModel,
		imageHash,
		hasProgressData,
		allDataLoaded,
		fundraisingPercent,
		unreservedAmount,
		sharesAvailable,
		formattedLocation,
		loanUse,
		loanStatus,
		loanAmount,
		loanBorrowerCount,
		mdiMapMarker,
		loanCallouts,
	};
}

export function loanCardMethods(props, emit) {
	const {
		loanId,
		customLoanDetails,
		kvTrackFunction,
	} = toRefs(props);

	function clickReadMore(target, event) {
		kvTrackFunction.value('Lending', 'click-Read more', target, loanId.value);
		if (customLoanDetails.value) {
			event.preventDefault();
			emit('show-loan-details');
		}
	}

	return {
		clickReadMore,
	};
}
