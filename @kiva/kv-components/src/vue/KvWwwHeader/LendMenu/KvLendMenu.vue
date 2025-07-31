<template>
	<div>
		<kv-lend-list-menu class="lg:tw-hidden" />
		<kv-lend-mega-menu class="tw-hidden lg:tw-block" />
	</div>
</template>

<script>
import KvLendListMenu from './KvLendListMenu.vue';
import KvLendMegaMenu from './KvLendMegaMenu.vue';

export default {
	components: {
		KvLendListMenu,
		KvLendMegaMenu,
	},
};
</script>
