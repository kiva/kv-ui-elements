<template>
	<kv-theme-provider
		tag="div"
		class="tw-bg-primary"
	>
		<nav
			class="tw-font-medium tw-relative"
			:style="{ height: HEADER_HEIGHT }"
		>
			<kv-page-container class="tw-h-full" />
		</nav>
	</kv-theme-provider>
</template>

<script lang="ts">
import KvThemeProvider from '#components/KvThemeProvider.vue';
import KvPageContainer from '#components/KvPageContainer.vue';

const HEADER_HEIGHT = '4rem';

export default {
	name: 'KvWwwHeaderBasic',
	components: { KvThemeProvider, KvPageContainer },
	setup() {
		return { HEADER_HEIGHT };
	},
};
</script>
