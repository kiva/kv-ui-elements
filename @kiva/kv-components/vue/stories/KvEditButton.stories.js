import KvEditButton from '../KvEditButton.vue';
import KvButton from '../KvButton.vue';

export default {
	title: 'KvEditButton',
	component: KvEditButton,
	argTypes: {
		visible: {
			control: 'boolean',
			defaultValue: false,
		},
		title: {
			control: 'text',
			defaultValue: 'Edit',
		},
		variant: {
			control: 'select',
			options: ['lightbox', 'alert'],
			defaultValue: 'lightbox',
		},
		preventClose: {
			control: 'boolean',
			defaultValue: false,
		},
	},
	args: {
		visible: false,
		title: '',
		variant: 'lightbox',
		preventClose: false,
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvEditButton, KvButton },
	template: `
		<div>
			<kv-edit-button v-bind="$props">
				<template>This is the content that will appear inside the lightbox when the edit button is clicked.</template>
				<template #header>
					<h3>
						Custom Header
					</h3>
				</template>
				<template #controls="{ hideLightbox }">
					<kv-button variant="ghost" @click="hideLightbox" ref="dontDoItRef">Cancel</kv-button>
					<kv-button variant="danger" @click="hideLightbox" ref="doItRef">Delete</kv-button>
				</template>
			</kv-edit-button>
		</div>
	`,
	data() {
		return {
			isLightboxVisible: args.visible,
		};
	},
});

export const EditButtonWithLightbox = DefaultTemplate.bind({});
EditButtonWithLightbox.args = {
	title: 'Edit Item Details',
};
