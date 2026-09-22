import { ref } from 'vue';
import KvImageUpload from '../KvImageUpload.vue';

// Captures the latest emitted event as a formatted string so each story can display what the
// component emits. The File payload is summarized because File objects don't serialize to JSON.
function useEmittedLog() {
	const emittedData = ref('// interact with the uploader to see emitted events');
	const show = (event, payload) => {
		emittedData.value = JSON.stringify({ event, ...payload }, null, 2);
	};
	return {
		emittedData,
		onUploaded: ({ file }) => show('file-uploaded', {
			file: { name: file.name, type: file.type, size: file.size },
		}),
		onRemoved: () => show('file-removed', {}),
		onError: (error) => show('file-error', error),
	};
}

export default {
	title: 'Forms/KvImageUpload',
	component: KvImageUpload,
	argTypes: {
		shape: {
			control: 'select',
			options: ['square', 'circle'],
		},
		aspectRatio: { control: 'number' },
		maxSizeMb: { control: 'number' },
		previewSize: { control: 'number' },
		showEditIcon: { control: 'boolean' },
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvImageUpload },
	setup() {
		return { args, ...useEmittedLog() };
	},
	template: `
		<div style="width: 240px;">
			<kv-image-upload
				:image-url="args.imageUrl"
				:aspect-ratio="args.aspectRatio"
				:shape="args.shape"
				:max-size-mb="args.maxSizeMb"
				:max-dimension="args.maxDimension"
				:preview-size="args.previewSize"
				:show-edit-icon="args.showEditIcon"
				:image-alt="args.imageAlt"
				@file-uploaded="onUploaded"
				@file-removed="onRemoved"
				@file-error="onError"
			/>
			<div class="tw-font-mono tw-text-small tw-whitespace-pre-wrap tw-bg-secondary tw-p-1 tw-rounded tw-mt-2">{{ emittedData }}</div>
		</div>`,
});

export const Default = Template.bind({});
Default.args = {
	shape: 'square',
	aspectRatio: 1,
	maxSizeMb: 1,
	previewSize: 200,
	showEditIcon: false,
};

export const Circle = Template.bind({});
Circle.args = {
	...Default.args,
	shape: 'circle',
};

export const HeroFourThree = Template.bind({});
HeroFourThree.args = {
	...Default.args,
	aspectRatio: 4 / 3,
	maxSizeMb: 5,
	maxDimension: 2000,
	previewSize: 180,
};

export const WithImage = Template.bind({});
WithImage.args = {
	...Default.args,
	imageUrl: 'https://picsum.photos/seed/kiva/400/400',
};

// `showEditIcon` toggles the pencil in the BLANK state (before an image is selected).
// Once an image is present the pencil always shows regardless of this prop (see WithImage).
export const EditIconEnabled = Template.bind({});
EditIconEnabled.args = {
	...Default.args,
	shape: 'circle',
	showEditIcon: true,
};

const CustomFallbackTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvImageUpload },
	setup() {
		return { args, ...useEmittedLog() };
	},
	template: `
		<div style="width: 240px;">
			<kv-image-upload
				:shape="args.shape"
				:aspect-ratio="args.aspectRatio"
				@file-uploaded="onUploaded"
				@file-removed="onRemoved"
				@file-error="onError"
			>
				<template #fallback-image="{ isDraggingOver }">
					<div
						class="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full tw-border-2 tw-border-dashed"
						:class="[
							args.shape === 'circle' ? 'tw-rounded-full' : 'tw-rounded',
							isDraggingOver ? 'tw-bg-eco-green-1 tw-border-action' : 'tw-bg-secondary tw-border-transparent',
						]"
					>
						<span class="tw-text-small">{{ isDraggingOver ? 'Drop to upload' : 'Custom upload area' }}</span>
					</div>
				</template>
			</kv-image-upload>
			<div class="tw-font-mono tw-text-small tw-whitespace-pre-wrap tw-bg-secondary tw-p-1 tw-rounded tw-mt-2">{{ emittedData }}</div>
		</div>`,
});

export const CustomFallback = CustomFallbackTemplate.bind({});
CustomFallback.args = {
	...Default.args,
};

// The drag-overlay slot renders above the preview as well as the placeholder, which is what
// lets an uploader that already holds an image offer "drop to replace". It only renders while a
// file is over the component, and only when this slot is filled.
const DragOverlayTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvImageUpload },
	setup() {
		return { args, ...useEmittedLog() };
	},
	template: `
		<div style="width: 240px;">
			<kv-image-upload
				:image-url="args.imageUrl"
				:shape="args.shape"
				:aspect-ratio="args.aspectRatio"
				:max-size-mb="args.maxSizeMb"
				:preview-size="args.previewSize"
				@file-uploaded="onUploaded"
				@file-removed="onRemoved"
				@file-error="onError"
			>
				<template #drag-overlay="{ hasImage }">
					<div
						class="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full tw-bg-black tw-opacity-low"
						:class="args.shape === 'circle' ? 'tw-rounded-full' : 'tw-rounded'"
					></div>
					<div class="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center">
						<span class="tw-text-label tw-text-white">
							{{ hasImage ? 'Drop to replace' : 'Drop to upload' }}
						</span>
					</div>
				</template>
			</kv-image-upload>
			<div class="tw-font-mono tw-text-small tw-whitespace-pre-wrap tw-bg-secondary tw-p-1 tw-rounded tw-mt-2">{{ emittedData }}</div>
		</div>`,
});

// Drag a photo over the preview: the overlay reads "Drop to replace" because an image is present.
export const DropToReplace = DragOverlayTemplate.bind({});
DropToReplace.args = {
	...Default.args,
	imageUrl: 'https://picsum.photos/seed/kiva/400/400',
};

// The same slot on an empty uploader, where `hasImage` is false.
export const DropToReplaceEmpty = DragOverlayTemplate.bind({});
DropToReplaceEmpty.args = {
	...Default.args,
};

// A dropped file runs the same validation as a picked one. `maxSizeMb` is tiny here, so dropping
// any real photo emits a `file-error` into the log below — previously a rejected drop did nothing
// at all, because the input's `accept` filter swallowed it without an event.
export const DropRejection = Template.bind({});
DropRejection.args = {
	...Default.args,
	maxSizeMb: 0.001,
};

// Drags that carry no files are ignored, so an uploader can sit inside a list whose items are
// themselves draggable without the two gestures colliding. Drag the chip over the uploader: no
// highlight, no events. Drag a file over it: both.
const NonFileDragTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvImageUpload },
	setup() {
		return { args, ...useEmittedLog() };
	},
	template: `
		<div style="width: 240px;">
			<div
				draggable="true"
				class="tw-inline-block tw-bg-brand-100 tw-border tw-border-tertiary tw-rounded tw-px-1 tw-py-0.5 tw-mb-2 tw-cursor-grab tw-text-small"
			>
				Drag me over the uploader
			</div>
			<kv-image-upload
				:shape="args.shape"
				:aspect-ratio="args.aspectRatio"
				:max-size-mb="args.maxSizeMb"
				:preview-size="args.previewSize"
				@file-uploaded="onUploaded"
				@file-removed="onRemoved"
				@file-error="onError"
			/>
			<div class="tw-font-mono tw-text-small tw-whitespace-pre-wrap tw-bg-secondary tw-p-1 tw-rounded tw-mt-2">{{ emittedData }}</div>
		</div>`,
});

export const IgnoresNonFileDrag = NonFileDragTemplate.bind({});
IgnoresNonFileDrag.args = {
	...Default.args,
};

// The dashed drag highlight follows the shape, so it stays circular on an avatar uploader.
export const CircleDragging = Template.bind({});
CircleDragging.args = {
	...Default.args,
	shape: 'circle',
	previewSize: 160,
};
