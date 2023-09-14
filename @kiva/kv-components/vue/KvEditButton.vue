<template>
	<div>
		<!-- Edit Button -->
		<KvButton
			variant="secondary"
			aria-label="Edit"
			class="tw-w-7 tw-h-10"
			@click="showLightbox"
		>
			<KvMaterialIcon
				class="tw-w-3 tw-h-3"
				:icon="mdiPencil"
			/>
		</KvButton>

		<!-- Lightbox -->
		<KvLightbox
			:visible="isVisible"
			:title="title"
			:prevent-close="preventClose"
			:variant="variant"
			@lightbox-closed="hideLightbox"
		>
			<template #header>
				<slot name="header"></slot>
			</template>

			<!-- default slot (body) -->
			<slot></slot>

			<!-- controls slot -->
			<template #controls>
				<slot
					name="controls"
					:hideLightbox="hideLightbox"
				></slot>
			</template>
		</KvLightbox>
	</div>
</template>

<script>
import { ref } from 'vue-demi';
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
			default: '',
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
	setup(_, { emit }) {
		const isVisible = ref(false);

		const showLightbox = () => {
			isVisible.value = true;
			emit('lightbox-opened');
		};

		const hideLightbox = () => {
			isVisible.value = false;
			emit('lightbox-closed');
		};

		return {
			mdiPencil,
			isVisible,
			showLightbox,
			hideLightbox,
		};
	},
};
</script>
