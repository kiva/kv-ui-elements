<template>
	<ul class="tw-whitespace-nowrap tw-font-medium">
		<li
			v-for="country in countries"
			:key="country.isoCode"
			class="country-list-item"
		>
			<a
				v-if="country.count > 0"
				v-kv-track-event="['TopNav', 'click-Lend-Country', country.name]"
				:href="`/lend/filter?country=${country.isoCode}`"
				class="tw-text-primary hover:tw-text-action-highlight tw-block tw-w-full tw-py-1"
			>
				{{ country.name }} ({{ country.count }})
			</a>
			<span
				v-else
				class="tw-block tw-py-1 tw-text-tertiary"
			>
				{{ country.name }} (0)
			</span>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'CountryList',
	props: {
		countries: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="postcss" scoped>

.country-list-item {
	width: 11rem;
}

</style>
