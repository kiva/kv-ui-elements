<template>
	<div>
		<template v-if="isRegionsLoading">
			<kv-accordion-item
				v-for="i in 8"
				:id="`regions-panel-placeholder-${i}`"
				:key="i"
				:disabled="true"
			>
				<template #header>
					<kv-loading-placeholder style="height: 1rem; width: 8rem;" />
				</template>
			</kv-accordion-item>
		</template>
		<template v-else>
			<kv-accordion-item
				v-for="region in regions"
				:id="`mobile-lend-menu-${paramCase(region.name)}-panel`"
				:key="region.name"
				v-kv-track-event="['TopNav','click-Lend-Region', region.name]"
			>
				<template #header>
					<h3 class="tw-text-upper">
						{{ region.name }}
					</h3>
				</template>
				<kv-lend-menu-country-list :countries="region.countries" />
			</kv-accordion-item>
		</template>
	</div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import KvAccordionItem from '#components/KvAccordionItem.vue';
import KvLoadingPlaceholder from '#components/KvLoadingPlaceholder.vue';
import KvLendMenuCountryList from '#components/KvWwwHeader/LendMenu/KvLendMenuCountryList.vue';
import paramCase from '#utils/paramCase';

export interface Region {
	name: string;
	countries: { isoCode: string; name: string; count: number }[];
}

export default {
	name: 'RegionsPanel',
	components: { KvAccordionItem, KvLoadingPlaceholder, KvLendMenuCountryList },
	props: {
		regions: {
			type: Array as PropType<Region[]>,
			default: () => [],
		},
		isRegionsLoading: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		return { paramCase };
	},
};
</script>
