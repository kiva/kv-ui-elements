import { mdiMapMarker } from '@mdi/js';

const LSE_LOAN_KEY = 'N/A';
const ECO_FRIENDLY_KEY = 'ECO-FRIENDLY';
const SUSTAINABLE_AG_KEY = 'SUSTAINABLE AG';
const SINGLE_PARENT_KEY = 'SINGLE PARENT';
const REFUGEE_KEY = 'REFUGEES/DISPLACED';

export default {
	props: {
		loanId: {
			type: Number,
			default: undefined,
		},
		loan: {
			type: Object,
			default: null,
		},
		customLoanDetails: {
			type: Boolean,
			default: false,
		},
		showTags: {
			type: Boolean,
			default: false,
		},
		categoryPageName: {
			type: String,
			default: '',
		},
		enableFiveDollarsNotes: {
			type: Boolean,
			default: false,
		},
		isAdding: {
			type: Boolean,
			default: false,
		},
		isVisitor: {
			type: Boolean,
			default: true,
		},
		basketItems: {
			type: Array,
			default: () => ([]),
		},
		isBookmarked: {
			type: Boolean,
			default: false,
		},
		kvTrackFunction: {
			type: Function,
			required: true,
		},
		photoPath: {
			type: String,
			required: true,
		},
		showViewLoan: {
			type: Boolean,
			default: false,
		},
		externalLinks: {
			type: Boolean,
			default: false,
		},
		route: {
			type: Object,
			default: undefined,
		},
		userBalance: {
			type: String,
			default: undefined,
		},
		getCookie: {
			type: Function,
			default: undefined,
		},
		setCookie: {
			type: Function,
			default: undefined,
		},
		fiveDollarsSelected: {
			type: Boolean,
			default: false,
		},
		customCallouts: {
			type: Array,
			default: () => ([]),
		},
	},
	data() {
		return {
			mdiMapMarker,
		};
	},
	computed: {
		tag() {
			return this.externalLinks ? 'a' : 'router-link';
		},
		readMorePath() {
			return this.customLoanDetails ? '' : `/lend/${this.loanId}`;
		},
		isLoading() {
			return !this.loanId || !this.loan;
		},
		borrowerName() {
			return this.loan?.name || '';
		},
		countryName() {
			return this.loan?.geocode?.country?.name || '';
		},
		city() {
			return this.loan?.geocode?.city || '';
		},
		state() {
			return this.loan?.geocode?.state || '';
		},
		distributionModel() {
			return this.loan?.distributionModel || '';
		},
		imageHash() {
			return this.loan?.image?.hash ?? '';
		},
		hasProgressData() {
			// Local resolver values for the progress bar load client-side
			return typeof this.loan?.unreservedAmount !== 'undefined'
				&& typeof this.loan?.fundraisingPercent !== 'undefined';
		},
		allDataLoaded() {
			return !this.isLoading && this.hasProgressData;
		},
		fundraisingPercent() {
			return this.loan?.fundraisingPercent ?? 0;
		},
		unreservedAmount() {
			const stringAmount = this.loan?.unreservedAmount ?? '0';
			// convert stringAmount to a number
			return Number(stringAmount);
		},
		formattedLocation() {
			if (this.distributionModel === 'direct') {
				const formattedString = `${this.city}, ${this.state}, ${this.countryName}`;
				return formattedString;
			}
			if (this.countryName === 'Puerto Rico') {
				const formattedString = `${this.city}, PR`;
				return formattedString;
			}
			return this.countryName;
		},
		loanUse() {
			return this.loan?.use ?? '';
		},
		loanStatus() {
			return this.loan?.status ?? '';
		},
		loanAmount() {
			return this.loan?.loanAmount ?? '0';
		},
		loanBorrowerCount() {
			return this.loan?.borrowerCount ?? 0;
		},
		loanCallouts() {
			const callouts = [];
			const activityName = this.loan?.activity?.name ?? '';
			const sectorName = this.loan?.sector?.name ?? '';
			const tags = this.loan?.tags?.filter((tag) => tag.charAt(0) === '#')
				.map((tag) => tag.substring(1)) ?? [];
			const themes = this.loan?.themes ?? [];
			const categories = {
				ecoFriendly: !!tags // eslint-disable-next-line max-len
					.filter((t) => t.toUpperCase() === ECO_FRIENDLY_KEY || t.toUpperCase() === SUSTAINABLE_AG_KEY).length,
				refugeesIdps: !!themes.filter((t) => t.toUpperCase() === REFUGEE_KEY).length,
				singleParents: !!tags.filter((t) => t.toUpperCase() === SINGLE_PARENT_KEY).length,
			};

			const isLseLoan = this.loan?.partnerName?.toUpperCase().includes(LSE_LOAN_KEY);

			// P1 Category
			// Exp limited to: Eco-friendly, Refugees and IDPs, Single Parents
			// Tag as first option for LSE loans
			if (isLseLoan && tags.length) {
				const position = Math.floor(Math.random() * tags.length);
				const tag = tags[position];
				callouts.push(tag);
			}

			if (!this.categoryPageName) {
				if (categories.ecoFriendly // eslint-disable-next-line max-len
					&& !callouts.find((c) => c.toUpperCase() === ECO_FRIENDLY_KEY || c.toUpperCase() === SUSTAINABLE_AG_KEY)) {
					callouts.push('Eco-friendly');
				} else if (categories.refugeesIdps) {
					callouts.push('Refugees and IDPs');
				} else if (categories.singleParents
					&& !callouts.find((c) => c.toUpperCase() === SINGLE_PARENT_KEY)) {
					callouts.push('Single Parent');
				}
			}

			// P2 Activity
			if (activityName && this.categoryPageName?.toUpperCase() !== activityName.toUpperCase()) {
				callouts.push(activityName);
			}

			// P3 Sector
			if (sectorName
				&& (activityName.toUpperCase() !== sectorName.toUpperCase())
				&& (sectorName.toUpperCase() !== this.categoryPageName?.toUpperCase())
				&& callouts.length < 2) {
				callouts.push(sectorName);
			}

			// P4 Tag
			if (!!tags.length && callouts.length < 2) {
				const position = Math.floor(Math.random() * tags.length);
				const tag = tags[position];
				if (!callouts.filter((c) => c.toUpperCase() === tag.toUpperCase()).length) {
					callouts.push(tag);
				}
			}

			// P5 Theme
			if (!!themes.length && callouts.length < 2) {
				const position = Math.floor(Math.random() * themes.length);
				const theme = themes[position];
				if (!callouts.filter((c) => c.toUpperCase() === theme.toUpperCase()).length
					&& theme.toUpperCase() !== this.categoryPageName?.toUpperCase()) {
					callouts.push(theme);
				}
			}

			// Only show one callout for LSE loans
			if (isLseLoan && callouts.length > 1) return [callouts.shift()];

			// Add all custom callouts if available
			callouts.push(...this.customCallouts);
			return callouts;
		},
	},
	methods: {
		showLoanDetails(e) {
			if (this.customLoanDetails) {
				e.preventDefault();
				this.$emit('show-loan-details');
			}
		},
		clickReadMore(target) {
			this.kvTrackFunction('Lending', 'click-Read more', target, this.loanId);
		},
	},
};
