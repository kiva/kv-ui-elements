import { mdiLightningBolt } from '@mdi/js';
import KvLightbox from '../KvLightbox.vue';
import KvMaterialIcon from '../KvMaterialIcon.vue';
import KvButton from '../KvButton.vue';

export default {
	title: 'KvLightbox',
	component: KvLightbox,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: ['lightbox', 'alert'],
			},
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
	components: { KvLightbox, KvButton },
	template: `
		<div>
			<kv-button @click="isLightboxVisible = true;">Show {{variant}}</kv-button>
			<p>The lightbox is visible: {{isLightboxVisible}}</p>

			<kv-lightbox
				:visible="isLightboxVisible"
				:title="title"
				:variant="variant"
				:prevent-close="preventClose"
				@lightbox-closed="isLightboxVisible = false"
			>
				<p class="tw-mb-2">Lorem ipsum aliquip labore commodo anim elit amet cupidatat do ex ipsum. Consectetur excepteur ea anim velit reprehenderit qui aliquip ullamco aliquip irure dolor ex. Occaecat excepteur enim eu incididunt ut consectetur aliqua magna et. Reprehenderit duis ex excepteur sit et cupidatat cillum cillum adipisicing ut adipisicing minim ad.</p>
				<p>Et id excepteur cillum quis. Culpa dolore eiusmod ex officia ea deserunt. Aliquip velit deserunt Lorem nisi mollit aliquip esse quis. Lorem aliquip ex id reprehenderit irure cillum elit aliqua laboris fugiat aliquip irure. Nostrud irure est anim qui eu in eu quis cupidatat. Fugiat officia aliqua laborum in incididunt tempor anim ex velit qui magna. Cillum minim commodo pariatur ex cillum sit.</p>
				<template #controls>
					<kv-button variant="secondary" @click="isLightboxVisible = false" ref="dontDoItRef">Don't do it!</kv-button>
					<kv-button @click="isLightboxVisible = false" ref="doItRef">Do it!</kv-button>
				</template>
			</kv-lightbox>
		</div>
	`,
	data() {
		return {
			isLightboxVisible: args.visible,
		};
	},
});

const AlertTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvLightbox, KvButton },
	template: `
		<div>
			<kv-button variant="danger" @click="isLightboxVisible = true;">Show {{variant}}</kv-button>
			<p>The lightbox is visible: {{isLightboxVisible}}</p>

			<kv-lightbox
				:visible="isLightboxVisible"
				:title="title"
				:variant="variant"
				:prevent-close="preventClose"
				@lightbox-closed="isLightboxVisible = false"
			>
				<p>The credit card will be removed from our data base and will no longer be used for subscriptions or auto-deposit.</p>
				<template #controls>
					<kv-button variant="ghost" @click="isLightboxVisible = false" ref="dontDoItRef">Cancel</kv-button>
					<kv-button variant="danger" @click="isLightboxVisible = false" ref="doItRef">Delete</kv-button>
				</template>
			</kv-lightbox>
		</div>
	`,
	data() {
		return {
			isLightboxVisible: args.visible,
		};
	},
});

export const Lightbox = DefaultTemplate.bind({});
Lightbox.args = {
	title: 'Lightbox Title',
};

export const Alert = AlertTemplate.bind({});
Alert.args = {
	title: 'Delete credit card?',
	variant: 'alert',
};

export const PreventClose = DefaultTemplate.bind({});
PreventClose.args = {
	title: 'Prevent Close',
	preventClose: true,
};

export const CustomHeader = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvLightbox, KvButton, KvMaterialIcon },
	template: `
		<div>
			<kv-button @click="isLightboxVisible = true;">Show {{variant}}</kv-button>
			<p>The lightbox is visible: {{isLightboxVisible}}</p>

			<kv-lightbox
				:visible="isLightboxVisible"
				title="Make sure you put a title here for screenreaders"
				@lightbox-closed="isLightboxVisible = false"
			>
				<template #header>
					<h2 class="tw-text-h2">Special typography title here</h2>
					<div class="tw-flex tw-items-center tw-mt-1">
						<kv-material-icon
							class="tw-h-2"
							:icon="mdiLightningBolt"
						/>
						<p class="tw-text-h4">Special subhead text</p>
					</div>
				</template>
				<p>Lorem ipsum aliquip labore commodo anim elit amet cupidatat do ex ipsum. Consectetur excepteur ea anim velit reprehenderit qui aliquip ullamco aliquip irure dolor ex. Occaecat excepteur enim eu incididunt ut consectetur aliqua magna et. Reprehenderit duis ex excepteur sit et cupidatat cillum cillum adipisicing ut adipisicing minim ad.</p>
				<p>Et id excepteur cillum quis. Culpa dolore eiusmod ex officia ea deserunt. Aliquip velit deserunt Lorem nisi mollit aliquip esse quis. Lorem aliquip ex id reprehenderit irure cillum elit aliqua laboris fugiat aliquip irure. Nostrud irure est anim qui eu in eu quis cupidatat. Fugiat officia aliqua laborum in incididunt tempor anim ex velit qui magna. Cillum minim commodo pariatur ex cillum sit.</p>
				<template #controls>
					<kv-button variant="danger" @click="isLightboxVisible = false" ref="dontDoItRef">Don't do it!</kv-button>
					<kv-button variant="secondary" @click="isLightboxVisible = false" ref="doItRef">Do it!</kv-button>
				</template>
			</kv-lightbox>
		</div>
	`,
	data() {
		return {
			isLightboxVisible: args.visible,
			mdiLightningBolt,
		};
	},
});

const InformationalTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvLightbox, KvButton },
	template: `
		<div>
			<kv-button @click="isLightboxVisible = true;">Show {{variant}}</kv-button>
			<p>The lightbox is visible: {{isLightboxVisible}}</p>

			<kv-lightbox
				:visible="isLightboxVisible"
				:title="title"
				:variant="variant"
				:prevent-close="preventClose"
				@lightbox-closed="isLightboxVisible = false"
			>
				<p>Lorem ipsum aliquip labore commodo anim elit amet cupidatat do ex ipsum. Consectetur excepteur ea anim velit reprehenderit qui aliquip ullamco aliquip irure dolor ex. Occaecat excepteur enim eu incididunt ut consectetur aliqua magna et. Reprehenderit duis ex excepteur sit et cupidatat cillum cillum adipisicing ut adipisicing minim ad.</p>
				<p>Et id excepteur cillum quis. Culpa dolore eiusmod ex officia ea deserunt. Aliquip velit deserunt Lorem nisi mollit aliquip esse quis. Lorem aliquip ex id reprehenderit irure cillum elit aliqua laboris fugiat aliquip irure. Nostrud irure est anim qui eu in eu quis cupidatat. Fugiat officia aliqua laborum in incididunt tempor anim ex velit qui magna. Cillum minim commodo pariatur ex cillum sit.</p>
			</kv-lightbox>
		</div>
	`,
	data() {
		return {
			isLightboxVisible: args.visible,
		};
	},
});

export const Informational = InformationalTemplate.bind({});
Informational.args = {
	title: 'Lightbox Title',
};
