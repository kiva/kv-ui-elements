<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-end lg:tw-hidden tw-font-medium">
		<kv-header-menu-link
			v-if="!loggedIn"
			href=""
		>
			Sign in
		</kv-header-menu-link>
		<kv-header-menu-link
			href=""
		>
			Support Kiva
		</kv-header-menu-link>
		<kv-header-menu-link
			v-if="!loggedIn"
			href=""
		>
			Borrow
		</kv-header-menu-link>
		<kv-header-menu-link
			href=""
		>
			About us
		</kv-header-menu-link>
		<kv-header-menu-link
			href=""
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
	},
};
</script>
