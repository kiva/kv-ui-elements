<template>
	<button
		type="button"
		class="
			tw-inline-flex
			tw-items-center
			tw-gap-1
			tw-whitespace-nowrap
			tw-select-none
			tw-cursor-pointer
			tw-rounded-sm
			tw-border
			tw-px-2
			tw-py-1
			tw-text-base
			tw-bg-white
			hover:tw-bg-eco-green-1
			tw-text-eco-green-4
			tw-border-gray-300
		"
		@click="handleClick"
	>
		<slot></slot>
		<kv-material-icon
			:icon="mdiClose"
			class="tw-w-2 tw-h-2 tw-shrink-0"
			:from-sprite="true"
		/>
	</button>
</template>
<script lang="ts">
import { mdiClose } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	name: 'KvChip',
	components: { KvMaterialIcon },
	emits: [
		'click-chip',
	],
	setup() {
		return {
			mdiClose,
		};
	},
	methods: {
		handleClick() {
			this.$emit('click-chip');
		},
	},
};
</script>
