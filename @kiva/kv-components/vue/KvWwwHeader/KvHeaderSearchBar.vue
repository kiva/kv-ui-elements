<template>
	<div
		class="
			tw-inline-flex
			tw-pl-1.5 md:tw-pl-0
		"
	>
		<input
			ref="searchInput"
			v-model="displayTerm"
			type="text"
			placeholder="Search"
			class="
				tw-peer tw-flex-1 tw-min-w-0
				tw-my-1.5 tw-px-1 tw-rounded-r
				tw-bg-tertiary
				placeholder-shown:tw-bg-secondary focus:tw-outline-none
				placeholder:tw-text-gray-300
				placeholder:tw-font-medium
				tw-transition-colors tw-duration-100
			"
		>
		<!-- search icon (inert) -->
		<div
			class="
				tw-flex-none tw-order-first
				tw-inline-flex tw-items-center
				tw-my-1.5 tw-p-0.5 tw-rounded-l
				tw-bg-tertiary peer-placeholder-shown:tw-bg-secondary
				tw-transition-colors tw-duration-100
			"
		>
			<kv-icon-search class="tw-w-3 tw-h-3" />
		</div>
		<!-- cancel search -->
		<button
			class="tw-px-2.5 tw-transition-opacity"
			:class="{
				'tw-opacity-full tw-duration-300': searchExitVisible,
				'tw-opacity-0 tw-duration-100': !searchExitVisible,
			}"
			@click="closeSearch"
		>
			Cancel
		</button>
	</div>
</template>

<script>
import {
	ref,
} from 'vue-demi';
import { useSiteSearch } from '../../utils/siteSearch';
import KvIconSearch from '../KvIconSearch.vue';

export default {
	components: {
		KvIconSearch,
	},
	emits: [
		'close-search',
	],
	setup(props, { emit }) {
		const {
			searchInput,
			displayTerm,
		} = useSiteSearch();

		const searchExitVisible = ref(false);

		const onOpen = () => {
			searchExitVisible.value = true;
			searchInput.value?.focus();
		};

		const closeSearch = () => {
			searchExitVisible.value = false;
			emit('close-search');
		};

		return {
			closeSearch,
			displayTerm,
			onOpen,
			searchInput,
			searchExitVisible,
		};
	},
};
</script>
