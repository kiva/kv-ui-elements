<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-end lg:tw-hidden tw-font-medium">
		<kv-header-menu-link
			v-if="!loggedIn"
			v-kv-track-event="['TopNav', 'click-menu-Sign-in']"
			:href="loginUrl"
		>
			Sign in
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-Support-kiva']"
			href="/donate/supportus"
		>
			Support Kiva
		</kv-header-menu-link>
		<kv-header-menu-link
			v-if="!loggedIn"
			v-kv-track-event="['TopNav', 'click-menu-Borrow']"
			href="/borrow"
		>
			Borrow
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-About']"
			href="/about"
		>
			About
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-menu-Partner-with-us']"
			href="/about/partner-with-us"
		>
			Partner with us
		</kv-header-menu-link>
	</nav>
</template>

<script>
import KvHeaderMenuLink from './KvHeaderMenuLink.vue';

export default {
	components: {
		KvHeaderMenuLink,
	},
	props: {
		loggedIn: {
			type: Boolean,
			default: false,
		},
		loginUrl: {
			type: String,
			default: '/ui-login',
		},
	},
};
</script>
