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
				<template #fallback-image>
					<div
						class="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full tw-bg-secondary"
						:class="args.shape === 'circle' ? 'tw-rounded-full' : 'tw-rounded'"
					>
						<span class="tw-text-small">Custom upload area</span>
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
