<template>
	<div class="tw-flex tw-flex-col">
		<div
			class="kv-image-upload tw-relative"
			:class="[shapeClass, { 'kv-image-upload--dragging': isDraggingOver }]"
			:style="containerStyle"
			@dragenter="onDragEnter"
			@dragover="onDragOver"
			@dragleave="onDragLeave"
			@drop="onDrop"
		>
			<img
				v-if="previewImage"
				:src="previewImage"
				:alt="imageAlt"
				class="tw-w-full tw-h-full tw-object-cover"
				:class="shapeClass"
			>
			<!--
				Default empty-state placeholder (overridable via the fallback-image slot, which
				receives `isDraggingOver` so custom content can show its own drop affordance).
				Presentational only: the transparent input below owns click/keyboard and the
				accessible name, so this is a <div>, not a focusable <button>.
			-->
			<slot
				v-else
				name="fallback-image"
				:is-dragging-over="isDraggingOver"
			>
				<div
					class="kv-image-upload__placeholder tw-w-full tw-h-full tw-bg-eco-green-1 tw-p-0.5"
					:class="shapeClass"
				>
					<div
						class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-0.5
							tw-w-full tw-h-full tw-border-2 tw-border-dashed"
						:class="[shapeClass, isDraggingOver ? 'tw-border-action' : 'tw-border-black']"
					>
						<kv-material-icon
							:icon="mdiCameraPlusOutline"
							class="tw-w-3.5"
						/>
						<span class="tw-text-label">
							{{ isDraggingOver ? 'Drop to upload' : 'Add a photo' }}
						</span>
					</div>
				</div>
			</slot>

			<!--
				Transparent, full-area native file input: provides click and keyboard
				(Tab + Enter/Space) for free, with a proper accessible name. Drops are handled
				on the container rather than left to this input, so a dropped file runs the same
				validation and emits the same events as one chosen through the picker.
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
				class="image-upload-icon edit-icon tw-absolute tw-bottom-1 tw-right-1 tw-p-1 tw-z-1"
				:class="{ 'image-upload-icon--circle': isCircle }"
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
				class="image-upload-icon remove-icon tw-absolute tw-top-1 tw-right-1 tw-p-1 tw-z-1"
				:class="{ 'image-upload-icon--circle': isCircle }"
				type="button"
				aria-label="Remove Image"
				@click.stop="removeImage"
			>
				<kv-material-icon
					:icon="mdiClose"
					class="tw-w-2"
				/>
			</button>

			<!--
				Optional "drop to replace" overlay, for the one state no slot could otherwise
				reach: a drag over an existing preview. Deliberately not rendered in the empty
				state — fallback-image owns that entirely and receives isDraggingOver, so letting
				this render there too would stack two competing treatments.
				It must never take pointer events: appearing under the cursor mid-drag would
				churn the dragenter/dragleave pairs and flicker the state.
			-->
			<div
				v-if="isDraggingOver && previewImage && $slots['drag-overlay']"
				class="tw-absolute tw-inset-0 tw-z-2 tw-pointer-events-none"
				:class="shapeClass"
			>
				<slot name="drag-overlay"></slot>
			</div>
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
		const { imageUrl } = toRefs(props);

		const previewImage = ref<string>(imageUrl.value || '');
		const fileInput = ref<HTMLInputElement | null>(null);
		const isDraggingOver = ref(false);
		// dragenter/dragleave also fire when the pointer crosses a descendant, so counting the
		// pairs keeps the highlight steady instead of flickering on every child boundary.
		let dragEnterCount = 0;

		watch(imageUrl, (newValue) => {
			previewImage.value = newValue || '';
		});

		const isCircle = computed(() => props.shape === 'circle');
		const shapeClass = computed(() => (isCircle.value ? 'tw-rounded-full' : 'tw-rounded'));
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
			emit('file-removed');
		};

		const processFile = async (file: File) => {
			const { valid, error } = validateImageFile(file, {
				maxSizeMb: props.maxSizeMb,
				acceptedFileTypes: props.acceptedFileTypes as string[],
			});
			if (!valid && error) {
				emit('file-error', error);
				return;
			}
			try {
				previewImage.value = await cropResizeImageToDataUrl(file, {
					aspectRatio: props.aspectRatio,
					maxDimension: props.maxDimension,
				});
				emit('file-uploaded', { file });
			} catch {
				const message = 'Failed to read file';
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

		// Ignore drags carrying no files, so the component can sit inside an element-reordering
		// drag without the two gestures colliding.
		const dragHasFiles = (event: DragEvent) => Array.from(event.dataTransfer?.types ?? []).includes('Files');

		const onDragEnter = (event: DragEvent) => {
			if (!dragHasFiles(event)) {
				return;
			}
			dragEnterCount += 1;
			isDraggingOver.value = true;
		};

		const onDragOver = (event: DragEvent) => {
			if (!dragHasFiles(event)) {
				return;
			}
			// Marks the container as a valid drop target; without it the browser rejects the
			// drop and opens the file in the tab instead.
			event.preventDefault();
			const { dataTransfer } = event;
			if (dataTransfer) {
				dataTransfer.dropEffect = 'copy';
			}
		};

		const onDragLeave = (event: DragEvent) => {
			if (!dragHasFiles(event)) {
				return;
			}
			dragEnterCount = Math.max(0, dragEnterCount - 1);
			if (dragEnterCount === 0) {
				isDraggingOver.value = false;
			}
		};

		const onDrop = (event: DragEvent) => {
			if (!dragHasFiles(event)) {
				return;
			}
			// Cancels the file input's own drop handling so the file takes one path only.
			event.preventDefault();
			dragEnterCount = 0;
			isDraggingOver.value = false;
			const file = event.dataTransfer?.files?.[0];
			if (file) {
				processFile(file);
			}
		};

		return {
			mdiPencil,
			mdiClose,
			mdiCameraPlusOutline,
			fileInput,
			previewImage,
			isCircle,
			isDraggingOver,
			shapeClass,
			acceptAttr,
			inputLabel,
			containerStyle,
			openFileInput,
			removeImage,
			handleFileChange,
			onDragEnter,
			onDragOver,
			onDragLeave,
			onDrop,
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

/* Circle variant: opaque white background with a small drop shadow. */
.image-upload-icon--circle {
	@apply tw-bg-white tw-shadow;
}
</style>
