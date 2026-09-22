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
		acceptedFileTypes: { control: 'object' },
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
				:accepted-file-types="args.acceptedFileTypes"
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

// The drag-overlay slot covers an existing preview, which is the one state fallback-image cannot
// reach. It renders only while a file is over an uploader that already holds an image — for the
// empty state, use fallback-image and its `isDraggingOver` prop (see CustomFallback).
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
				<template #drag-overlay>
					<div
						class="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full tw-bg-black tw-opacity-low"
						:class="args.shape === 'circle' ? 'tw-rounded-full' : 'tw-rounded'"
					></div>
					<div class="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center">
						<span class="tw-text-label tw-text-white">Drop to replace</span>
					</div>
				</template>
			</kv-image-upload>
			<div class="tw-font-mono tw-text-small tw-whitespace-pre-wrap tw-bg-secondary tw-p-1 tw-rounded tw-mt-2">{{ emittedData }}</div>
		</div>`,
});

// Drag a photo over the preview to see the overlay. On an empty uploader this slot renders
// nothing at all, by design — CustomFallback shows how the empty state does it instead.
export const DropToReplace = DragOverlayTemplate.bind({});
DropToReplace.args = {
	...Default.args,
	imageUrl: 'https://picsum.photos/seed/kiva/400/400',
};

// Why this story exists: it is the one case where owning the drop changes observable behaviour.
//
// This uploader accepts PNG only. Click it and the file dialog will not even offer a JPEG — the
// input's `accept` attribute filters the picker. Drag a JPEG onto it instead and you get a
// `file-error` in the log below, reading "File format not supported".
//
// Before the container took over the drop, that same drag produced nothing at all: the browser
// applies `accept` to drops too, so the file was discarded with no `change` event and therefore
// no way for a consumer to tell the user why nothing happened. Confirming that silent-discard is
// the main thing worth checking here against a released build.
//
// Note this is specific to type. An oversized file was never filtered by `accept`, so it always
// reached `processFile` and always reported a size error, dropped or picked.
export const DropRejection = Template.bind({});
DropRejection.args = {
	...Default.args,
	acceptedFileTypes: ['image/png'],
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
