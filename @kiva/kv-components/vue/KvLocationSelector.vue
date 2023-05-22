<template>
	<form
		class="tw-grid tw-gap-1.5 tw-mb-2"
		:class="`tw-grid-cols-${numberColumns}`"
		@submit.prevent
	>
		<fieldset
			v-for="option in displayedRegions"
			:key="option.region"
		>
			<legend>
				<button
					class="tw-transition-all"
					@click="toggleRegion(option.region)"
				>
					<kv-material-icon
						:icon="isOpenRegion(option.region) ? mdiChevronDown : mdiChevronRight"
						class="tw-h-1.5 tw-w-1.5 tw-mr-1 tw-transition-all"
					/>
					{{ getItemLabel(option) }}
				</button>
			</legend>
			<menu
				v-if="isOpenRegion(option.region)"
				class="tw-flex tw-flex-col tw-gap-1.5 tw-my-1"
			>
				<li>
					<button
						class="tw-text-link"
						@click="toggleSelectAll(getItems(option.countries))"
					>
						{{ isAllSelected(getItems(option.countries)) ? 'Deselect' : 'Select' }} all
					</button>
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
						{{ item.title }}
					</kv-checkbox>
				</li>
			</menu>
		</fieldset>
	</form>
</template>

<script>
import {
	ref,
	toRefs,
} from 'vue-demi';
import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvCheckbox from './KvCheckbox.vue';

export default {
	components: {
		KvMaterialIcon,
		KvCheckbox,
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
		numberColumns: {
			type: Number,
			default: 1,
		},
	},
	emits: [
		'updated',
	],
	setup(props, { emit }) {
		const { regions, activeIsoCodes } = toRefs(props);
		const displayedRegions = ref(regions);
		const openRegions = ref([]);
		const selected = ref(activeIsoCodes.value);

		const getItemLabel = (item) => {
			const countLabel = typeof item.numLoansFundraising !== 'undefined' ? ` (${item.numLoansFundraising})` : '';

			return `${item.name || item.region}${countLabel}`;
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

		return {
			mdiChevronRight,
			mdiChevronDown,
			displayedRegions,
			getItemLabel,
			getItems,
			toggleSelectAll,
			toggleRegion,
			isOpenRegion,
			isAllSelected,
			selected,
			updateLocation,
		};
	},
};
</script>
