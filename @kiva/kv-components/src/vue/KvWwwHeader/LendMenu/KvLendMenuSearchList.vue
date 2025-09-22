<template>
	<ul class="tw-font-book">
		<li
			v-for="search in searches"
			:key="search.id"
		>
			<a
				class="tw-text-primary hover:tw-text-action tw-block tw-w-full tw-py-1"
				:href="search.url"
			>{{ search.name }}</a>
		</li>
		<li>
			<a
				class="tw-text-primary hover:tw-text-action tw-block tw-w-full tw-py-1"
				href="/lend/saved-search"
			>
				Manage saved searches
			</a>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		searches: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
