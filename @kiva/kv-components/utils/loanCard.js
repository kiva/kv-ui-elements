import {
	computed,
	toRefs,
} from 'vue-demi';

import { mdiMapMarker } from '@mdi/js';

const LSE_LOAN_KEY = 'N/A';
const ECO_FRIENDLY_KEY = 'ECO-FRIENDLY';
const SUSTAINABLE_AG_KEY = 'SUSTAINABLE AG';
const SINGLE_PARENT_KEY = 'SINGLE PARENT';
const REFUGEE_KEY = 'REFUGEES/DISPLACED';

const findCalloutData = (tags, tagName) => tags?.find((t) => t.name.toUpperCase() === tagName.toUpperCase()) ?? {};

export function loanCardComputedProperties(props) {
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
	const city = computed(() => loan.value?.geocode?.city || '');
	const state = computed(() => loan.value?.geocode?.state || '');
	const distributionModel = computed(() => loan.value?.distributionModel || '');
	const imageHash = computed(() => loan.value?.image?.hash ?? '');
	const hasProgressData = computed(() => {
		return typeof loan.value?.unreservedAmount !== 'undefined'
			&& typeof loan.value?.fundraisingPercent !== 'undefined';
	});

	const allDataLoaded = computed(() => !isLoading.value && hasProgressData.value);

	const fundraisingPercent = computed(() => loan.value?.fundraisingPercent ?? 0);

	const unreservedAmount = computed(() => {
		const stringAmount = loan.value?.unreservedAmount ?? '0';
		return Number(stringAmount);
	});

	const formattedLocation = computed(() => {
		if (distributionModel.value === 'direct') {
			return `${city.value}, ${state.value}, ${countryName.value}`;
		}
		if (countryName.value === 'Puerto Rico') {
			return `${city.value}, PR`;
		}
		return countryName.value;
	});

	const loanUse = computed(() => loan.value?.use ?? '');

	const loanStatus = computed(() => loan.value?.status ?? '');

	const loanAmount = computed(() => loan.value?.loanAmount ?? '0');

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
				callouts.push({ label: 'Eco-friendly' });
			} else if (categories.refugeesIdps) {
				callouts.push({ label: 'Refugees and IDPs' });
			} else if (categories.singleParents
				&& !callouts.find((c) => c.label.toUpperCase() === SINGLE_PARENT_KEY)) {
				callouts.push({ label: 'Single Parent' });
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
				callouts.push({ label: theme, type: 'theme', id });
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
		city,
		state,
		distributionModel,
		imageHash,
		hasProgressData,
		allDataLoaded,
		fundraisingPercent,
		unreservedAmount,
		formattedLocation,
		loanUse,
		loanStatus,
		loanAmount,
		loanBorrowerCount,
		mdiMapMarker,
		loanCallouts,
	};
}

export function loanCardMethods(props) {
	const {
		loanId,
		customLoanDetails,
		kvTrackFunction,
	} = toRefs(props);

	function showLoanDetails(e) {
		if (customLoanDetails.value) {
			e.preventDefault();
			this.$emit('show-loan-details');
		}
	}

	function clickReadMore(target) {
		kvTrackFunction.value('Lending', 'click-Read more', target, loanId.value);
	}

	return {
		showLoanDetails,
		clickReadMore,
	};
}
