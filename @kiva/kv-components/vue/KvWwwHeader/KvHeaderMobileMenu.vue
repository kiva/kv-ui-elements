<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-end lg:tw-hidden tw-font-medium">
		<a
			v-if="!loggedIn"
			class="tw-py-1.5 tw-cursor-pointer"
		>
			Sign in
		</a>
		<a
			class="tw-py-1.5 tw-cursor-pointer"
		>
			Support Kiva
		</a>
		<a
			v-if="!loggedIn"
			class="tw-py-1.5 tw-cursor-pointer"
		>
			Borrow
		</a>
		<a
			class="tw-py-1.5 tw-cursor-pointer"
		>
			About us
		</a>
		<a
			class="tw-py-1.5 tw-cursor-pointer"
		>
			Partner with us
		</a>
	</nav>
</template>

<script>
export default {
	props: {
		loggedIn: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
