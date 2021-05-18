import {
	mdiAlertCircleOutline,
	mdiArrowDown,
	mdiArrowBottomLeft,
	mdiArrowLeft,
	mdiArrowTopLeft,
	mdiArrowUp,
	mdiArrowTopRight,
	mdiArrowRight,
	mdiArrowBottomRight,
	mdiCart,
	mdiCheck,
	mdiChevronLeft,
	mdiChevronRight,
	mdiChevronDown,
	mdiChevronUp,
	mdiClose,
	mdiMagnify,
	mdiStar,
	mdiStarOutline,
} from '@mdi/js';

import KvMaterialIcon from '../KvMaterialIcon.vue';

export default {
	title: 'KvMaterialIcon',
	component: KvMaterialIcon,
	argTypes: {
		icon: {
			control: {
				disable: true,
			},
		},
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<kv-material-icon
			:icon="icon"
		/>`,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
	icon: mdiCart,
};

export const Common = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<div class="flex gap-1">
			<kv-material-icon
				v-for="(icon, i) in [
					mdiAlertCircleOutline,
					mdiArrowDown,
					mdiArrowBottomLeft,
					mdiArrowLeft,
					mdiArrowTopLeft,
					mdiArrowUp,
					mdiArrowTopRight,
					mdiArrowRight,
					mdiArrowBottomRight,
					mdiChevronLeft,
					mdiChevronRight,
					mdiChevronDown,
					mdiChevronUp,
					mdiClose,
					mdiMagnify,
				]"
				:key="i"
				:icon="icon"
			/>
		</div>
	`,
	data() {
		return {
			mdiAlertCircleOutline,
			mdiArrowDown,
			mdiArrowBottomLeft,
			mdiArrowLeft,
			mdiArrowTopLeft,
			mdiArrowUp,
			mdiArrowTopRight,
			mdiArrowRight,
			mdiArrowBottomRight,
			mdiChevronLeft,
			mdiChevronRight,
			mdiChevronDown,
			mdiChevronUp,
			mdiClose,
			mdiMagnify,
		};
	},
});

export const Colored = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<div>
			<p class="mb-2">Use text-color to set the icon color</p>
			<kv-material-icon
				:icon="mdiCheck"
				class="text-brand-500"
			/>
			<kv-material-icon
				:icon="mdiAlertCircleOutline"
				class="text-danger"
			/>
		</div>`,
	data() {
		return {
			mdiAlertCircleOutline,
			mdiCheck,
		};
	},
});

export const InlineWithText = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<a href="#" class="inline-flex">
			<span class="text-h4">He went thataway</span>
			<kv-material-icon class="w-2.5" :icon="mdiChevronRight" />
		</a>`,
	data() {
		return {
			mdiChevronRight,
		};
	},
});

export const Sizing = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<div>
			<p class="mb-2">Icons can be sized using any of the standard sizing classes (.w-2, .w-3, .w-full, etc.). By default they are 24 x 24 (.w-3).</p>
			<kv-material-icon class="bg-gray-100 w-2" :icon="mdiChevronRight" />
			<kv-material-icon class="bg-gray-100 w-4" :icon="mdiChevronRight" />
			<kv-material-icon class="bg-gray-100 w-8" :icon="mdiChevronRight" />
			<kv-material-icon class="bg-gray-100 w-16" :icon="mdiChevronRight" />
		</div>`,
	data() {
		return {
			mdiChevronRight,
		};
	},
});

export const WithAccessibleText = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<div>
			<p class="mb-2">If you don't include text and your icon is not decorative, be sure to include screen-reader text</p>
			<button class="rounded-sm bg-gray-100 hover:bg-gray-300 p-1 inline-flex">
				<kv-material-icon class="w-3" :icon="mdiClose" />
				<span class="sr-only">Close modal</span>
			</button>
		</div>`,
	data() {
		return {
			mdiClose,
		};
	},
});

export const StarsDemo = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	template: `
		<div class="flex">
			<button
				v-for="i in 5"
				:key="i"
				@click="rating = i"
				class="text-black hover:text-action-700"
			>
				<kv-material-icon :icon="getStarIcon(i)"/>
				<span class="sr-only">Set rating to {{i}}</span>
			</button>
		</div>`,
	data() {
		return {
			rating: 2,
			mdiStar,
			mdiStarOutline,
		};
	},
	methods: {
		getStarIcon(index) {
			return this.rating >= index ? this.mdiStar : this.mdiStarOutline;
		},
	},
});
