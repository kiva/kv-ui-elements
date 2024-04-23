import { mdiLightningBolt } from '@mdi/js';
import KvLightbox from '../KvLightbox.vue';
import KvMaterialIcon from '../KvMaterialIcon.vue';
import KvButton from '../KvButton.vue';
import KvToast from '../KvToast.vue';

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
		visible: true,
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
				<p class="tw-font-serif">Et id excepteur cillum quis. Culpa dolore eiusmod ex officia ea deserunt. Aliquip velit deserunt Lorem nisi mollit aliquip esse quis. Lorem aliquip ex id reprehenderit irure cillum elit aliqua laboris fugiat aliquip irure. Nostrud irure est anim qui eu in eu quis cupidatat. Fugiat officia aliqua laborum in incididunt tempor anim ex velit qui magna. Cillum minim commodo pariatur ex cillum sit.</p>
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

const VeryShortTemplate = (args, { argTypes }) => ({
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
				<p class="tw-mb-2">The lightbox content is very short.</p>
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

const VeryLongTemplate = (args, { argTypes }) => ({
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
				<p class="tw-mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptatum quod illum minima alias quae non architecto ipsum sunt repudiandae eius ipsa commodi adipisci nam, magni praesentium error, deleniti impedit!
				Qui sint repudiandae incidunt odit distinctio neque repellendus, soluta culpa. Vero rem, odit laudantium autem quis facilis ratione omnis aut voluptas, velit vitae adipisci? Magni iure animi doloribus illum soluta.
				Enim aspernatur non accusantium aut minima, quos maxime? Perferendis suscipit enim laborum, recusandae fugit praesentium fugiat animi cumque voluptatum voluptate labore dolore quaerat libero esse quasi magnam tempore id autem.
				Nisi voluptas architecto dolores aut perspiciatis itaque, est reprehenderit tempora. Animi dicta laudantium repudiandae facere atque omnis voluptatem, incidunt ipsum, accusantium minima aspernatur modi soluta molestiae neque quam doloremque nemo.
				Neque delectus quidem sapiente facere consequuntur maiores molestiae vel! Quidem, veniam. Libero labore voluptatibus id corporis molestias cumque magnam maiores praesentium laborum? Voluptate, porro eum. Recusandae earum rerum quis quos.
				Cupiditate ea quas non ut adipisci illum dolorem eligendi sequi quod, doloribus suscipit assumenda ullam aliquid ad repudiandae dignissimos optio, possimus molestiae voluptate vel! Esse fuga praesentium maxime animi nihil.
				Sint, est? Maiores commodi adipisci minus itaque nisi dolorum, velit fugiat est quia saepe ipsum quo nobis mollitia repellendus facilis, quos hic facere! Tenetur sint corporis dignissimos molestias saepe ipsa?
				Excepturi, praesentium quisquam veritatis quaerat eligendi explicabo vitae sit minima recusandae. Dolorum molestiae, vero nulla eum sunt exercitationem dolore ipsum quos ea doloribus reprehenderit aliquam quibusdam vel veniam ex quis.
				Corporis, neque cum pariatur saepe inventore sunt, maiores sed deserunt beatae quasi non sint vitae error incidunt odio nam amet quisquam! Mollitia, suscipit earum. Molestiae nesciunt fugit ea cupiditate rerum?
				Placeat, atque sit unde sunt fugit reprehenderit tenetur provident similique odio accusamus, suscipit quod doloribus aliquam animi quia quae laboriosam natus aspernatur repellendus tempore itaque expedita! Optio adipisci amet excepturi!</p>
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

export const ShortContentLightbox = VeryShortTemplate.bind({});
ShortContentLightbox.args = {
	title: 'Short Lightbox Title',
};

export const LongContentLightbox = VeryLongTemplate.bind({});
LongContentLightbox.args = {
	title: 'Long Lightbox Title',
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

const ToastInLightboxTemplate = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvToast,
		KvButton,
		KvLightbox,
	},
	template: `
		<div>
			<kv-button @click="isLightboxVisible = true;">Show lightbox</kv-button>

			<kv-lightbox
				:visible="isLightboxVisible"
				title="Toast in Lightbox"
				@lightbox-closed="isLightboxVisible = false"
			>
				<p>Click the button below to show a toast.</p>
				<template #controls>
					<kv-button @click="showToast(message, type, persist)">Show Toast</kv-button>
				</template>
			</kv-lightbox>

			<!-- div below is a kludge for storybook docs -->
			<div class="tw-fixed tw-z-toast tw-inset-0 tw-pointer-events-none">
				<div class="tw-fixed tw-left-0 tw-right-0 tw-top-2 tw-pointer-events-auto">
					<kv-toast ref="toastRef" @close="onClose" />
				</div>
			</div>
		</div>
	`,
	data() {
		return {
			isLightboxVisible: false,
		};
	},
	methods: {
		showToast(messageInput, type, persistInput) {
			this.$refs.toastRef.show(messageInput, type, persistInput);
		},
		onClose() {
		},
	},
});
export const toastInLightbox = ToastInLightboxTemplate.bind({});
toastInLightbox.args = { type: 'confirmation', message: 'This is a toast in a lightbox.' };
