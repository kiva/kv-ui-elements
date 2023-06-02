<template>
	<form
		class="tw-grid tw-gap-1.5 tw-mb-2"
		@submit.prevent
	>
		<div class="tw-text-right tw-hidden md:tw-block tw-mb-1 tw-pr-2">
			Locations
		</div>
		<fieldset
			v-for="option in displayedRegions"
			:key="option.region"
			class="md:tw-border-b tw-border-tertiary md:tw-pb-1 md:tw-mb-1"
		>
			<legend class="tw-w-full md:tw-mb-1">
				<button
					class="tw-transition-all tw-flex tw-items-center md:tw-justify-between tw-w-full"
					@click="toggleRegion(option.region)"
				>
					<kv-material-icon
						:icon="isOpenRegion(option.region) ? mdiChevronDown : mdiChevronRight"
						class="tw-h-1.5 tw-w-1.5 md:tw-h-3 md:tw-w-3 tw-mr-1 tw-transition-all md:tw-order-2"
					/>
					<span class="md:tw-order-1 md:tw-text-subhead md:tw-flex tw-items-center">
						<span class="tw-w-4 tw-text-action tw-text-base tw-text-right tw-mr-1 tw-hidden md:tw-inline">
							{{ numberByRegion(option.region) !== 0 ? `(${numberByRegion(option.region)})` :'' }}
						</span>
						{{ getItemLabel(option) }} <span class="md:tw-hidden">{{ getNumberLoans(option) }}</span>
					</span>
				</button>
			</legend>
			<menu
				v-if="isOpenRegion(option.region)"
				class="tw-flex tw-flex-col tw-gap-1.5 tw-my-1.5"
			>
				<li class="md:tw-hidden">
					<button
						class="tw-text-link"
						@click="toggleSelectAll(getItems(option.countries))"
					>
						{{ isAllSelected(getItems(option.countries)) ? 'Deselect' : 'Select' }} all
					</button>
				</li>
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-1.5 md:tw-gap-2.5 md:tw-pl-5">
					<li class="tw-hidden md:tw-block">
						<kv-checkbox
							v-model="allSelectedModel"
							:value="`selected-all-${option.region}`"
							@change="toggleSelectAll(getItems(option.countries))"
						>
							{{ isAllSelected(getItems(option.countries)) ? 'Deselect' : 'Select' }} all
						</kv-checkbox>
					</li>
					<li
						v-for="(item, i) in getItems(option.countries)"
						:key="i"
					>
						<kv-checkbox
							v-model="selected"
							:value="item.value"
							:disabled="item.disabled"
							@change="updateLocation"
						>
							{{ item.title }} ({{ item.numberLoans }})
						</kv-checkbox>
					</li>
				</div>
			</menu>
		</fieldset>
		<div class="tw-hidden md:tw-flex tw-gap-2 tw-justify-end tw-mt-1.5">
			<button @click="resetCountries">
				Reset country selection
			</button>

			<kv-button
				@click="closeModal"
			>
				See {{ totalLoans }} loans
			</kv-button>
		</div>
	</form>
</template>

<script>
import {
	ref,
	toRefs,
	watch,
} from 'vue-demi';
import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvCheckbox from './KvCheckbox.vue';
import KvButton from './KvButton.vue';

export default {
	components: {
		KvMaterialIcon,
		KvCheckbox,
		KvButton,
	},
	props: {
		/**
		 * The regions with countries used to build the checkbox lists. Expected format:
		 * [{
		 *   region: 'region',
		 *   numLoansFundraising: 1,
		 *   countries: [{
		 *     name: 'name',
		 *     isoCode: 'US',
		 *     numLoansFundraising: 1,
		 *   }]
		 * }]
		 */
		regions: {
			type: Array,
			default: undefined,
		},
		activeIsoCodes: {
			type: Array,
			default: () => [],
		},
		totalLoans: {
			type: Number,
			default: 0,
		},
	},
	emits: [
		'updated',
		'close-modal',
	],
	setup(props, { emit }) {
		const { regions, activeIsoCodes } = toRefs(props);
		const displayedRegions = ref(regions);
		const openRegions = ref([]);
		const selected = ref(activeIsoCodes.value);
		const allSelectedModel = ref([]);

		const getItemLabel = (item) => {
			return `${item.name || item.region}`;
		};

		const getNumberLoans = (item) => {
			const countLabel = typeof item.numLoansFundraising !== 'undefined' ? ` (${item.numLoansFundraising})` : '';

			return `${countLabel}`;
		};

		const toggleRegion = (region) => {
			const existingIndex = openRegions.value.indexOf(region);
			if (existingIndex === -1) {
				openRegions.value.push(region);
			} else {
				openRegions.value.splice(existingIndex, 1);
			}
		};

		const isOpenRegion = (region) => {
			return openRegions.value.includes(region);
		};

		const getItems = (countries) => {
			// Disable checkboxes based on whether the current applied filters have loans fundraising for that country
			return countries.map((c) => ({
				value: c.isoCode,
				title: getItemLabel(c),
				numberLoans: c.numLoansFundraising,
				disabled: c.numLoansFundraising === 0,
			}));
		};

		const isAllSelected = (countries) => {
			return countries.every((country) => selected.value.includes(country.value));
		};

		const updateLocation = (evt) => {
			emit('updated', evt);
		};

		const toggleSelectAll = (countries) => {
			const isAll = isAllSelected(countries);
			countries.forEach((country) => {
				const index = selected.value.indexOf(country.value);
				const exists = index !== -1;
				if (isAll) {
					if (exists) selected.value.splice(index, 1);
				} else if (!exists) selected.value.push(country.value);
			});
			updateLocation(selected.value);
		};

		const resetCountries = () => {
			selected.value = [];
			updateLocation(selected.value);
		};

		const closeModal = () => {
			emit('close-modal');
		};

		const numberByRegion = (region) => {
			let total = 0;
			const regionData = regions.value.filter((regionItem) => {
				return regionItem.region === region;
			});
			const { countries } = regionData[0];

			for (let i = 0; i < countries.length; i += 1) {
				const country = countries[i];
				if (selected.value.includes(country.isoCode)) {
					total += 1;
				}
			}

			return total;
		};

		watch(activeIsoCodes, (val) => {
			if (selected.value.sort().toString() !== val.sort().toString()) {
				selected.value = val;
				updateLocation(selected.value);
			}
		});

		return {
			mdiChevronRight,
			mdiChevronDown,
			displayedRegions,
			getItemLabel,
			getNumberLoans,
			getItems,
			toggleSelectAll,
			toggleRegion,
			isOpenRegion,
			isAllSelected,
			selected,
			allSelectedModel,
			updateLocation,
			resetCountries,
			closeModal,
			numberByRegion,
		};
	},
};
</script>
