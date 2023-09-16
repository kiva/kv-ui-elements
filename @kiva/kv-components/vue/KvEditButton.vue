<template>
	<!-- Edit Button -->
	<KvButton
		variant="secondary"
		aria-label="Edit"
		class="tw-w-7 tw-h-10"
	>
		<KvMaterialIcon
			class="tw-w-3 tw-h-3"
			:icon="mdiPencil"
		/>
	</KvButton>
</template>

<script>
import { mdiPencil } from '@mdi/js';
import KvButton from './KvButton.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	components: {
		KvButton,
		KvMaterialIcon,
	},
	setup() {
		return {
			mdiPencil,
		};
	},
};
</script>
