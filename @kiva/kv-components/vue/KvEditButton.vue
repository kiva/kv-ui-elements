<template>
	<div>
		<!-- Edit Button -->
		<KvButton
			variant="ghost"
			class="tw-rounded tw-border tw-border-black"
			aria-label="Edit"
			@click="showLightbox"
		>
			<KvMaterialIcon :icon="mdiPencil" />
		</KvButton>

		<!-- Lightbox -->
		<KvLightbox
			:visible="isLightboxVisible"
			:title="lightboxTitle"
			@lightbox-closed="hideLightbox"
		>
			<slot></slot>
		</KvLightbox>
	</div>
</template>

<script>
import { mdiPencil } from '@mdi/js';
import KvButton from './KvButton.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvLightbox from './KvLightbox.vue';

export default {
	components: {
		KvButton,
		KvMaterialIcon,
		KvLightbox,
	},
	props: {
		lightboxTitle: {
			type: String,
			default: 'Edit',
		},
	},
	data() {
		return {
			isLightboxVisible: false,
			mdiPencil,
		};
	},
	methods: {
		showLightbox() {
			this.isLightboxVisible = true;
		},
		hideLightbox() {
			this.isLightboxVisible = false;
		},
	},
};
</script>
