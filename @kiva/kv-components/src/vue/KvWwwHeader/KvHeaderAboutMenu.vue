<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-start tw-font-medium tw-px-2.5">
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-About-About us']"
			href="/about"
		>
			About us
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-About-Partner with us']"
			href="/about/partner-with-us"
		>
			Partner with us
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-About-How Kiva works']"
			href="/about/how"
		>
			How Kiva works
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-About-Where Kiva works']"
			href="/about/where-kiva-works"
		>
			Where Kiva works
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-About-Impact']"
			href="/impact"
		>
			Impact
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-About-Leadership']"
			href="/about/leadership"
		>
			Leadership
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-About-Finances']"
			href="/about/finances"
		>
			Finances
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-About-Press']"
			href="/about/press-center"
		>
			Press
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-About-Due diligence']"
			href="/about/due-diligence"
		>
			Due diligence
		</kv-header-menu-link>
	</nav>
</template>

<script lang="ts">
import KvHeaderMenuLink from './KvHeaderMenuLink.vue';

export default {
	components: {
		KvHeaderMenuLink,
	},
};
</script>
