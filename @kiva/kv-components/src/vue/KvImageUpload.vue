<template>
	<div class="tw-flex tw-flex-col">
		<div
			class="kv-image-upload tw-relative"
			:class="shapeClass"
			:style="containerStyle"
		>
			<img
				v-if="previewImage"
				:src="previewImage"
				:alt="imageAlt"
				class="tw-w-full tw-h-full tw-object-cover"
				:class="shapeClass"
			>
			<!--
				Default empty-state placeholder (overridable via the fallback-image slot).
				Presentational only: the transparent input below owns click/keyboard and the
				accessible name, so this is a <div>, not a focusable <button>.
			-->
			<slot
				v-else
				name="fallback-image"
			>
				<div
					class="kv-image-upload__placeholder tw-w-full tw-h-full tw-bg-eco-green-1 tw-p-0.5"
					:class="shapeClass"
				>
					<div
						class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-0.5
							tw-w-full tw-h-full tw-border-2 tw-border-dashed tw-border-black"
						:class="shapeClass"
					>
						<kv-material-icon
							:icon="mdiCameraPlusOutline"
							class="tw-w-3.5"
						/>
						<span class="tw-text-label">
							Add a photo
						</span>
					</div>
				</div>
			</slot>

			<!--
				Transparent, full-area native file input: provides click, drag-drop and
				keyboard (Tab + Enter/Space) for free, with a proper accessible name.
			-->
			<input
				ref="fileInput"
				type="file"
				:accept="acceptAttr"
				:aria-label="inputLabel"
				class="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-opacity-0 tw-cursor-pointer"
				@change="handleFileChange"
			>

			<button
				v-if="previewImage || showEditIcon"
				class="image-upload-icon edit-icon tw-absolute tw-bottom-1 tw-right-1 tw-p-1 tw-z-10"
				type="button"
				aria-hidden="true"
				tabindex="-1"
				@click.stop="openFileInput"
			>
				<kv-material-icon
					:icon="mdiPencil"
					class="tw-w-2"
				/>
			</button>
			<button
				v-if="previewImage"
				class="image-upload-icon remove-icon tw-absolute tw-top-1 tw-right-1 tw-p-1 tw-z-10"
				type="button"
				aria-label="Remove Image"
				@click.stop="removeImage"
			>
				<kv-material-icon
					:icon="mdiClose"
					class="tw-w-2"
				/>
			</button>
		</div>

		<div
			v-if="localErrorMessage"
			class="error-message tw-text-danger-highlight tw-mt-1 tw-text-small"
			role="alert"
		>
			{{ localErrorMessage }}
		</div>
	</div>
</template>

<script lang="ts">
import {
	computed,
	ref,
	toRefs,
	watch,
} from 'vue';
import { mdiPencil, mdiClose, mdiCameraPlusOutline } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';
import {
	validateImageFile,
	cropResizeImageToDataUrl,
	DEFAULT_ACCEPTED_IMAGE_TYPES,
} from '../utils/imageUtils';

export default {
	components: {
		KvMaterialIcon,
	},
	props: {
		/**
		 * URL of an initial image to preview.
		 */
		imageUrl: {
			type: String,
			default: '',
		},
		/**
		 * Target crop aspect ratio (width / height). `1` = square, `4 / 3` ≈ 1.333.
		 */
		aspectRatio: {
			type: Number,
			default: 1,
		},
		/**
		 * Preview shape. `square (default), circle`
		 */
		shape: {
			type: String,
			default: 'square',
			validator(value: string) {
				return ['square', 'circle'].includes(value);
			},
		},
		/**
		 * Maximum allowed file size, in megabytes.
		 */
		maxSizeMb: {
			type: Number,
			default: 1,
		},
		/**
		 * Output resolution used when generating the preview.
		 */
		maxDimension: {
			type: Number,
			default: 1000,
		},
		/**
		 * Maximum rendered preview size, in pixels (height; width follows aspectRatio).
		 * Note: the parent element must supply a width; this component sets only
		 * max-width/max-height + aspect-ratio and will not stretch to fill a sizeless container.
		 */
		previewSize: {
			type: Number,
			default: 200,
		},
		/**
		 * Accepted MIME types for both the file input and validation.
		 */
		acceptedFileTypes: {
			type: Array,
			default: () => [...DEFAULT_ACCEPTED_IMAGE_TYPES],
		},
		/**
		 * Whether to show the edit (pencil) affordance in the blank state, before an image is
		 * selected. Off by default. Once an image is present the edit icon always shows
		 * (bottom-right, below the remove icon), regardless of this prop.
		 */
		showEditIcon: {
			type: Boolean,
			default: false,
		},
		/**
		 * Alt text for the preview image.
		 */
		imageAlt: {
			type: String,
			default: 'Image preview',
		},
		/**
		 * Externally-driven error message to display.
		 */
		errorMessage: {
			type: String,
			default: '',
		},
	},
	emits: [
		/**
		 * Emitted with `{ file }` when a valid file is selected or dropped.
		 */
		'file-uploaded',
		/**
		 * Emitted when the current image is removed.
		 */
		'file-removed',
		/**
		 * Emitted with `{ type, message }` when validation or processing fails.
		 */
		'file-error',
	],
	setup(props, { emit }) {
		const {
			imageUrl,
			errorMessage,
		} = toRefs(props);

		const previewImage = ref<string>(imageUrl.value || '');
		const localErrorMessage = ref<string>('');
		const fileInput = ref<HTMLInputElement | null>(null);

		watch(imageUrl, (newValue) => {
			previewImage.value = newValue || '';
			localErrorMessage.value = '';
		});

		watch(errorMessage, (newValue) => {
			localErrorMessage.value = newValue;
		});

		const shapeClass = computed(() => (props.shape === 'circle' ? 'tw-rounded-full' : 'tw-rounded'));
		const acceptAttr = computed(() => (props.acceptedFileTypes as string[]).join(','));
		const inputLabel = computed(() => (previewImage.value ? 'Change image' : 'Upload image'));
		const containerStyle = computed(() => ({
			aspectRatio: String(props.aspectRatio),
			maxHeight: `${props.previewSize}px`,
			maxWidth: `${props.previewSize * props.aspectRatio}px`,
		}));

		const openFileInput = () => {
			fileInput.value?.click();
		};

		const removeImage = () => {
			previewImage.value = '';
			localErrorMessage.value = '';
			emit('file-removed');
		};

		const processFile = async (file: File) => {
			const { valid, error } = validateImageFile(file, {
				maxSizeMb: props.maxSizeMb,
				acceptedFileTypes: props.acceptedFileTypes as string[],
			});
			if (!valid && error) {
				localErrorMessage.value = error.message;
				emit('file-error', error);
				return;
			}
			try {
				previewImage.value = await cropResizeImageToDataUrl(file, {
					aspectRatio: props.aspectRatio,
					maxDimension: props.maxDimension,
				});
				localErrorMessage.value = '';
				emit('file-uploaded', { file });
			} catch {
				const message = 'Failed to read file';
				localErrorMessage.value = message;
				emit('file-error', { type: 'other', message });
			}
		};

		const handleFileChange = (event: Event) => {
			const target = event.target as HTMLInputElement;
			const file = target.files?.[0];
			if (!file) {
				return;
			}
			processFile(file);
			target.value = '';
		};

		return {
			mdiPencil,
			mdiClose,
			mdiCameraPlusOutline,
			fileInput,
			previewImage,
			shapeClass,
			acceptAttr,
			inputLabel,
			containerStyle,
			localErrorMessage,
			openFileInput,
			removeImage,
			handleFileChange,
		};
	},
};
</script>

<style lang="postcss" scoped>
.image-upload-icon {
	background-color: rgba(255, 255, 255, 0.75);
	border-radius: 9px;
	@apply tw-rounded-sm tw-flex tw-justify-center tw-items-center;
}
</style>
