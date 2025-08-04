<template>
	<div
		class="
				tw-inline-flex
				tw-pl-1.5 md:tw-pl-0
				tw-w-full
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
			@keydown.enter="runSearch(displayTerm)"
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
			<kv-material-icon
				class="tw-w-3 tw-h-3"
				:icon="mdiMagnify"
			/>
		</div>
		<!-- cancel search -->
		<button
			v-kv-track-event="['TopNav', 'click-cancel-search']"
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
import { ref } from 'vue';
import { useSiteSearch } from '#utils/siteSearch';
import { mdiMagnify } from '@mdi/js';
import KvMaterialIcon from '../KvMaterialIcon.vue';

export default {
	components: {
		KvMaterialIcon,
	},
	emits: [
		'close-search',
	],
	setup(props, { emit }) {
		const {
			searchInput,
			displayTerm,
			runSearch,
			getSuggestions,
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
			mdiMagnify,

			closeSearch,
			displayTerm,
			onOpen,
			searchInput,
			searchExitVisible,
			runSearch,
			getSuggestions,
		};
	},
};
</script>
