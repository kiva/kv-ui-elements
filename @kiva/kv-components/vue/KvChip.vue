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
			tw-mr-2
			tw-mb-2
			tw-select-none
			"
			@click="handleClick"
		>
			<div>
				<div
					v-if="!email"
					class="tw-text-small"
				>
					{{ title }}
				</div>
				<div
					v-else
					class="tw-text-h4"
				>
					{{ title }}
				</div>
			</div>
			<div class="tw-ml-2 tw-pt-1 tw-text-right">
				<kv-material-icon
					:icon="closeButton"
					class="tw-w-2 tw-h-2 tw-fill-gray-600"
					:from-sprite="true"
				/>
			</div>
		</button>
	</div>
</template>
<script>
import { mdiClose } from '@mdi/js';
import { computed } from 'vue-demi';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	name: 'KvChip',
	components: { KvMaterialIcon },
	props: {
		title: {
			type: String,
			default: '',
		},
		email: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'click-chip',
	],
	setup() {
		const closeButton = computed(() => mdiClose);
		return {
			closeButton,
		};
	},
	methods: {
		handleClick() {
			this.$emit('click-chip');
		},
	},
};
</script>
