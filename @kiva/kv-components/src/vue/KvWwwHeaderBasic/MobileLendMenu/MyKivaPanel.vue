<template>
	<ul class="tw-font-medium">
		<li>
			<a
				v-if="favorites > 0"
				v-kv-track-event="['TopNav','click-Lend-Favorites']"
				:href="`/lend?lenderFavorite=${userId}`"
				class="lend-link"
			>
				Saved loans
			</a>
			<span
				v-else
				class="tw-block tw-py-1 tw-text-tertiary"
			>Saved loans</span>
		</li>
		<li v-if="hasSearches">
			<kv-accordion-item id="mobile-lend-menu-saved-searches-panel">
				<template #header>
					<p class="tw-font-medium">
						Saved searches
					</p>
				</template>
				<kv-lend-menu-search-list :searches="searches" />
			</kv-accordion-item>
		</li>
		<li v-else>
			<span class="tw-block tw-py-1 tw-text-tertiary">Saved searches</span>
		</li>
		<li>
			<a
				v-kv-track-event="['TopNav','click-Lend-Countries_Not_Lent']"
				:href="countriesNotLentToUrl"
				class="lend-link"
			>
				Countries I haven't lent to
			</a>
		</li>
	</ul>
</template>

<script lang="ts">
import { computed, type PropType } from 'vue';
import KvAccordionItem from '#components/KvAccordionItem.vue';
import KvLendMenuSearchList, {
	type LendMenuSearch,
} from '#components/KvWwwHeader/LendMenu/KvLendMenuSearchList.vue';

export default {
	name: 'MyKivaPanel',
	components: { KvAccordionItem, KvLendMenuSearchList },
	props: {
		userId: {
			type: Number,
			default: null,
		},
		favorites: {
			type: Number,
			default: 0,
		},
		searches: {
			type: Array as PropType<LendMenuSearch[]>,
			default: () => [],
		},
		countriesNotLentToUrl: {
			type: String,
			default: '/lend/countries-not-lent',
		},
	},
	setup(props) {
		const hasSearches = computed(() => props.searches.length > 0);
		return { hasSearches };
	},
};
</script>

<style lang="postcss" scoped>
.lend-link {
	@apply tw-text-primary hover:tw-text-action tw-block tw-w-full tw-py-1 tw-no-underline hover:tw-underline;
}
</style>
