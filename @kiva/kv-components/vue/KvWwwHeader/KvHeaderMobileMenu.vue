<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-end lg:tw-hidden tw-font-medium">
		<kv-header-menu-link
			v-if="!loggedIn"
			:href="loginUrl"
		>
			Sign in
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/donate/supportus"
		>
			Support Kiva
		</kv-header-menu-link>
		<kv-header-menu-link
			v-if="!loggedIn"
			href="/borrow"
		>
			Borrow
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/about"
		>
			About us
		</kv-header-menu-link>
		<kv-header-menu-link
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
