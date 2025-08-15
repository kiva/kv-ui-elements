<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-start tw-font-medium">
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-about-us']"
			href="/about"
		>
			About us
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-partner-with-us']"
			href="/about/partner-with-us"
		>
			Partner with us
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-how-kiva-works']"
			href="/about/how"
		>
			How Kiva works
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-where-kiva-works']"
			href="/about/where-kiva-works"
		>
			Where Kiva works
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-impact']"
			href="/impact"
		>
			Impact
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-leadership']"
			href="/about/leadership"
		>
			Leadership
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-finances']"
			href="/about/finances"
		>
			Finances
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-press']"
			href="/about/press-center"
		>
			Press
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-due-diligence']"
			href="/about/due-diligence"
		>
			Due diligence
		</kv-header-menu-link>
	</nav>
</template>

<script>
import KvHeaderMenuLink from './KvHeaderMenuLink.vue';

export default {
	components: {
		KvHeaderMenuLink,
	},
};
</script>
