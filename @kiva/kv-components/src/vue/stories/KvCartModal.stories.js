import KvCartModal from '../KvCartModal.vue';
import KvButton from '../KvButton.vue';

export default {
	title: 'KvCartModal',
	component: KvCartModal,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		visible: false,
		title: '',
		preventClose: false,
		basketCount: 1,
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCartModal, KvButton },
	setup() { return { args }; },
	template: `
		<div>
			<kv-button @click="isVisible = true;">Show cart modal</kv-button>
			<p>The lightbox is visible: {{isVisible}}</p>

			<kv-cart-modal
				v-bind="args"
				:visible="isVisible"
				@cart-modal-closed="isVisible = false"
			>
			</kv-cart-modal>
		</div>
	`,
	data() {
		return {
			isVisible: args.visible,
		};
	},
});

export const Lightbox = DefaultTemplate.bind({});
Lightbox.args = {
	title: 'Added to Basket',
};

const ContentSlotTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCartModal, KvButton },
	setup() { return { args }; },
	template: `
		<div>
			<kv-button @click="isVisible = true;">Show cart modal</kv-button>
			<p>The lightbox is visible: {{isVisible}}</p>

			<kv-cart-modal
				v-bind="args"
				:visible="isVisible"
				@cart-modal-closed="isVisible = false"
			>
				<template #content>
					<div style="text-align: center; width: 100%;">
						<h2>{{title}}</h2>
						<p>Some content</p>
					</div>
				</template>
			</kv-cart-modal>
		</div>
	`,
	data() {
		return {
			isVisible: args.visible,
		};
	},
});

export const ContentSlot = ContentSlotTemplate.bind({});
ContentSlot.args = {
	title: 'Added to Basket',
};
