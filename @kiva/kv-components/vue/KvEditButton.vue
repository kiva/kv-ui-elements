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
			:visible="visible"
			:title="title"
			:prevent-close="preventClose"
			:variant="variant"
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
		/**
		 * Appearance and role of the lightbox
		 * @values lightbox, alert
		 * */
		variant: {
			type: String,
			default: 'lightbox',
			validator(value) {
				return ['lightbox', 'alert'].includes(value);
			},
		},
		/**
		 * The title of the dialog which describes the dialog to screenreaders, and if no
		 * content is in the `header` slot, will be displayed at the top of the lightbox.
		 * */
		title: {
			type: String,
			required: true,
		},
		/**
		 * The dialog has no close X button, clicking the screen does not close,
		 * pressing ESC does not close.
		 * */
		preventClose: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'lightbox-opened',
		'lightbox-closed',
	],
	setup({ emit }) {
		const showLightbox = () => {
			this.visible = true;
			emit('lightbox-opened');
		};
		const hideLightbox = () => {
			this.visible = false;
			emit('lightbox-closed');
		};
		return {
			showLightbox,
			hideLightbox,
		};
	},
	data() {
		return {
			visible: false,
			mdiPencil,
		};
	},
};
</script>
