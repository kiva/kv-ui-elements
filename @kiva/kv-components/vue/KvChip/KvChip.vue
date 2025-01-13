<template>
	<div class="tw-inline-flex">
		<button
			class="
			tw-bg-secondary
			hover:tw-bg-tertiary
			tw-items-center
			tw-flex
			tw-flex-row
			tw-cursor-pointer
			tw-whitespace-nowrap
			tw-rounded
			tw-h-2
			tw-py-2
			tw-px-2
			tw-select-none
			"
			@click="handleClick"
		>
			<div
				class="tw-text-base tw-pr-1"
			>
				<slot></slot>
			</div>
			<kv-material-icon
				:icon="mdiClose"
				class="tw-w-2 tw-h-2"
				:from-sprite="true"
			/>
		</button>
	</div>
</template>
<script>
import { mdiClose } from '@mdi/js';
import KvMaterialIcon from '#components/KvMaterialIcon';

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
