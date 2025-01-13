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
	mdiTimerSandComplete,
} from '@mdi/js';

import KvMaterialIcon from '#components/KvMaterialIcon';

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

export const Common = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<div class="tw-flex tw-gap-1">
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
					mdiTimerSandComplete,
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
			mdiTimerSandComplete,
		};
	},
});

export const Colored = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<div>
			<p class="tw-mb-2">Use text-color to set the icon color</p>
			<kv-material-icon
				:icon="mdiCheck"
				class="tw-text-action"
			/>
			<kv-material-icon
				:icon="mdiAlertCircleOutline"
				class="tw-text-danger"
			/>
		</div>`,
	data() {
		return {
			mdiAlertCircleOutline,
			mdiCheck,
		};
	},
});

export const InlineWithText = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<a href="#" class="tw-inline-flex">
			<span class="tw-text-h4">He went thataway</span>
			<kv-material-icon class="tw-w-2.5" :icon="mdiChevronRight" />
		</a>`,
	data() {
		return {
			mdiChevronRight,
		};
	},
});

export const Sizing = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<div>
			<p class="tw-mb-2">Icons can be sized using any of the standard sizing classes (.tw-w-2, .tw-w-3, .tw-w-full, etc.). By default they are 24 x 24 (.tw-w-3).</p>
			<kv-material-icon class="tw-bg-secondary tw-w-2" :icon="mdiChevronRight" />
			<kv-material-icon class="tw-bg-secondary tw-w-4" :icon="mdiChevronRight" />
			<kv-material-icon class="tw-bg-secondary tw-w-8" :icon="mdiChevronRight" />
			<kv-material-icon class="tw-bg-secondary tw-w-16" :icon="mdiChevronRight" />
		</div>`,
	data() {
		return {
			mdiChevronRight,
		};
	},
});

export const WithAccessibleText = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<div>
			<p class="tw-mb-2">If you don't include text and your icon is not decorative, be sure to include screen-reader text</p>
			<button class="tw-rounded-sm tw-bg-secondary hover:tw-bg-tertiary tw-p-1 tw-inline-flex">
				<kv-material-icon class="tw-w-3" :icon="mdiClose" />
				<span class="tw-sr-only">Close modal</span>
			</button>
		</div>`,
	data() {
		return {
			mdiClose,
		};
	},
});

export const StarsDemo = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvMaterialIcon },
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<div class="tw-flex">
			<button
				v-for="i in 5"
				:key="i"
				@click="rating = i"
				class="hover:tw-text-action-highlight"
			>
				<kv-material-icon :icon="getStarIcon(i)"/>
				<span class="tw-sr-only">Set rating to {{i}}</span>
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
