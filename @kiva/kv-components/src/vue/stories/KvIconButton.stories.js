import {
	mdiDotsVertical,
	mdiClose,
	mdiMenu,
	mdiPlus,
	mdiMinus,
	mdiChevronRight,
	mdiChevronLeft,
	mdiBookmark,
	mdiBookmarkOutline,
} from '@mdi/js';
import KvIconButton from '../KvIconButton.vue';
import KvIconButtonDocsMdx from './KvIconButtonDocs.mdx';

export default {
	title: 'KvIconButton',
	component: KvIconButton,
	parameters: {
		docs: {
			page: KvIconButtonDocsMdx,
		},
	},
	argTypes: {
		icon: {
			control: 'select',
			options: {
				'Dots Vertical': mdiDotsVertical,
				Close: mdiClose,
				Menu: mdiMenu,
				Plus: mdiPlus,
				Minus: mdiMinus,
				'Chevron Right': mdiChevronRight,
				'Chevron Left': mdiChevronLeft,
				'Bookmark Outline': mdiBookmarkOutline,
				Bookmark: mdiBookmark,
			},
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
		disabled: {
			control: 'boolean',
		},
		defaultBackground: {
			control: 'text',
		},
		hoverBackground: {
			control: 'text',
		},
		activeBackground: {
			control: 'text',
		},
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvIconButton },
	setup() { return { args }; },
	template: `
		<div class="tw-bg-secondary tw-rounded-md tw-p-6 tw-inline-block">
			<kv-icon-button
				:icon="args.icon"
				:size="args.size"
				:border-class="args.borderClass"
				:radius-class="args.radiusClass"
				:icon-class="args.iconClass"
				:disabled="args.disabled"
				:default-background="args.defaultBackground"
				:hover-background="args.hoverBackground"
				:active-background="args.activeBackground"
				@click="onClick"
			/>
		</div>
	`,
	methods: {
		onClick(e) { console.log('Icon button clicked', e); },
	},
});

// Size Variants
export const SizeVariants = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvIconButton },
	setup() { return { args }; },
	template: `
		<div class="tw-bg-secondary tw-rounded-md tw-p-6">
			<div class="tw-flex tw-gap-4 tw-items-center">
				<div class="tw-text-center">
					<kv-icon-button
						size="small"
						:icon="args.icon"
						:default-background="args.defaultBackground"
						@click="onClick"
					/>
					<p class="tw-text-small tw-mt-1">Small</p>
				</div>
				<div class="tw-text-center">
					<kv-icon-button
						size="medium"
						:icon="args.icon"
						:default-background="args.defaultBackground"
						@click="onClick"
					/>
					<p class="tw-text-small tw-mt-1">Medium</p>
				</div>
				<div class="tw-text-center">
					<kv-icon-button
						size="large"
						:icon="args.icon"
						:default-background="args.defaultBackground"
						@click="onClick"
					/>
					<p class="tw-text-small tw-mt-1">Large</p>
				</div>
			</div>
		</div>
	`,
	methods: {
		onClick(e) { console.log('Icon button clicked', e); },
	},
});
SizeVariants.args = {
	icon: mdiDotsVertical,
	defaultBackground: 'tw-bg-white',
};

// Icon Variants
export const RoundedSquare = Template.bind({});
RoundedSquare.args = {
	size: 'large',
	icon: mdiClose,
	defaultBackground: 'tw-bg-white',
	radiusClass: 'tw-rounded',
};

// With Border
export const WithBorder = Template.bind({});
WithBorder.args = {
	size: 'large',
	icon: mdiDotsVertical,
	borderClass: 'tw-border tw-border-1 tw-border-action',
};

// Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
	size: 'large',
	icon: mdiDotsVertical,
	disabled: true,
};

// Touch Target Visualization
export const TouchTargetVisualization = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvIconButton },
	setup() { return { args }; },
	template: `
		<div class="tw-bg-secondary tw-rounded-md tw-p-6">
			<p class="tw-text-primary tw-mb-4 tw-text-small">
				The dashed border shows the 44px minimum touch target area.
				The visual circle is sized according to the size prop.
			</p>
			<div class="tw-flex tw-gap-4 tw-items-center">
				<div class="tw-text-center">
					<div class="tw-border tw-border-dashed tw-border-tertiary tw-inline-block">
						<kv-icon-button size="small" :icon="args.icon" :default-background="args.defaultBackground" @click="onClick" />
					</div>
					<p class="tw-text-small tw-mt-1">Small (16px)</p>
				</div>
				<div class="tw-text-center">
					<div class="tw-border tw-border-dashed tw-border-tertiary tw-inline-block">
						<kv-icon-button size="medium" :icon="args.icon" :default-background="args.defaultBackground" @click="onClick" />
					</div>
					<p class="tw-text-small tw-mt-1">Medium (20px)</p>
				</div>
				<div class="tw-text-center">
					<div class="tw-border tw-border-dashed tw-border-tertiary tw-inline-block">
						<kv-icon-button size="large" :icon="args.icon" :default-background="args.defaultBackground" @click="onClick" />
					</div>
					<p class="tw-text-small tw-mt-1">Large (24px)</p>
				</div>
			</div>
		</div>
	`,
	methods: {
		onClick(e) { console.log('Icon button clicked', e); },
	},
});
TouchTargetVisualization.args = {
	icon: mdiDotsVertical,
	defaultBackground: 'tw-bg-white',
};

// Background States Demo
export const BackgroundStatesDemo = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvIconButton },
	setup() { return { args }; },
	template: `
		<div class="tw-bg-secondary tw-rounded-md tw-p-6">
			<div class="tw-space-y-6">
				<div>
					<h3 class="tw-text-h3 tw-mb-2">Bare State</h3>
					<p class="tw-text-secondary tw-text-small tw-mb-3">No background in any state</p>
					<div class="tw-flex tw-gap-2">
						<kv-icon-button
							size="small"
							:icon="args.icon"
							default-background="bare"
							hover-background="bare"
							active-background="bare"
							@click="onClick"
						/>
						<kv-icon-button
							size="medium"
							:icon="args.icon"
							default-background="bare"
							hover-background="bare"
							active-background="bare"
							@click="onClick"
						/>
						<kv-icon-button
							size="large"
							:icon="args.icon"
							default-background="bare"
							hover-background="bare"
							active-background="bare"
							@click="onClick"
						/>
					</div>
				</div>

				<div>
					<h3 class="tw-text-h3 tw-mb-2">Default State</h3>
					<p class="tw-text-secondary tw-text-small tw-mb-3">Bare default, gray-200 hover, gray-300 active</p>
					<div class="tw-flex tw-gap-2">
						<kv-icon-button
							size="small"
							:icon="args.icon"
							default-background="tw-bg-white"
							hover-background="hover:tw-bg-gray-200"
							active-background="active:tw-bg-gray-300"
							@click="onClick"
						/>
						<kv-icon-button
							size="medium"
							:icon="args.icon"
							default-background="tw-bg-white"
							hover-background="hover:tw-bg-gray-200"
							active-background="active:tw-bg-gray-300"
							@click="onClick"
						/>
						<kv-icon-button
							size="large"
							:icon="args.icon"
							default-background="tw-bg-white"
							hover-background="hover:tw-bg-gray-200"
							active-background="active:tw-bg-gray-300"
							@click="onClick"
						/>
					</div>
				</div>

				<div>
					<h3 class="tw-text-h3 tw-mb-2">Primary State</h3>
					<p class="tw-text-secondary tw-text-small tw-mb-3">Brand green backgrounds</p>
					<div class="tw-flex tw-gap-2">
						<kv-icon-button
							size="small"
							:icon="args.icon"
							icon-class="tw-text-primary-inverse"
							default-background="tw-bg-brand-500"
							hover-background="hover:tw-bg-brand-600"
							active-background="active:tw-bg-brand-700"
							@click="onClick"
						/>
						<kv-icon-button
							size="medium"
							:icon="args.icon"
							icon-class="tw-text-primary-inverse"
							default-background="tw-bg-brand-500"
							hover-background="hover:tw-bg-brand-600"
							active-background="active:tw-bg-brand-700"
							@click="onClick"
						/>
						<kv-icon-button
							size="large"
							:icon="args.icon"
							icon-class="tw-text-primary-inverse"
							default-background="tw-bg-brand-500"
							hover-background="hover:tw-bg-brand-600"
							active-background="active:tw-bg-brand-700"
							@click="onClick"
						/>
					</div>
				</div>

				<div>
					<h3 class="tw-text-h3 tw-mb-2">Secondary State</h3>
					<p class="tw-text-secondary tw-text-small tw-mb-3">White background with border</p>
					<div class="tw-flex tw-gap-2">
						<kv-icon-button
							size="small"
							:icon="args.icon"
							default-background="tw-bg-white"
							hover-background="hover:tw-bg-gray-100"
							active-background="active:tw-bg-gray-200"
							border-class="tw-border tw-border-tertiary"
							@click="onClick"
						/>
						<kv-icon-button
							size="medium"
							:icon="args.icon"
							default-background="tw-bg-white"
							hover-background="hover:tw-bg-gray-100"
							active-background="active:tw-bg-gray-200"
							border-class="tw-border tw-border-tertiary"
							@click="onClick"
						/>
						<kv-icon-button
							size="large"
							:icon="args.icon"
							default-background="tw-bg-white"
							hover-background="hover:tw-bg-gray-100"
							active-background="active:tw-bg-gray-200"
							border-class="tw-border tw-border-tertiary"
							@click="onClick"
						/>
					</div>
				</div>
			</div>
		</div>
	`,
	methods: {
		onClick(e) { console.log('Icon button clicked', e); },
	},
});
BackgroundStatesDemo.args = {
	icon: mdiClose,
};

// Toggleable Button
export const ToggleableButton = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvIconButton },
	setup() { return { args }; },
	template: `
		<div class="tw-bg-secondary tw-rounded-md tw-p-6">
			<div class="tw-space-y-4">
				<p class="tw-text-primary tw-text-small tw-mb-3">
					Click the bookmark icon to toggle between saved (filled) and unsaved (outline) states.
				</p>
				<div class="tw-flex tw-gap-2 tw-items-center">
					<kv-icon-button
						size="small"
						:icon="args.icon"
						:active-icon="args.activeIcon"
						:active-icon-class="args.activeIconClass"
						:default-background="args.defaultBackground"
						:hover-background="args.hoverBackground"
						:active-background="args.activeBackground"
						toggleable
						v-model="isToggledSmall"
						@click="onClick"
					/>
					<kv-icon-button
						size="medium"
						:icon="args.icon"
						:active-icon="args.activeIcon"
						:active-icon-class="args.activeIconClass"
						:default-background="args.defaultBackground"
						:hover-background="args.hoverBackground"
						:active-background="args.activeBackground"
						toggleable
						v-model="isToggledMedium"
						@click="onClick"
					/>
					<kv-icon-button
						size="large"
						:icon="args.icon"
						:active-icon="args.activeIcon"
						:active-icon-class="args.activeIconClass"
						:default-background="args.defaultBackground"
						:hover-background="args.hoverBackground"
						:active-background="args.activeBackground"
						toggleable
						v-model="isToggledLarge"
						@click="onClick"
					/>
				</div>
			</div>
		</div>
	`,
	data() {
		return {
			isToggledSmall: false,
			isToggledMedium: false,
			isToggledLarge: false,
		};
	},
	methods: {
		onClick(e) { console.log('Icon button clicked', e); },
	},
});
ToggleableButton.args = {
	icon: mdiBookmarkOutline,
	activeIcon: mdiBookmark,
	activeIconClass: 'tw-text-marigold-2',
	defaultBackground: 'tw-bg-white',
	hoverBackground: 'hover:tw-bg-gray-100',
	activeBackground: 'active:tw-bg-gray-200',
};
