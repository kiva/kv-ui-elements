import {
	mdiDotsVertical,
	mdiHeart,
	mdiClose,
	mdiMenu,
	mdiPlus,
	mdiMinus,
	mdiChevronRight,
	mdiChevronLeft,
} from '@mdi/js';
import KvIconButton from '../KvIconButton.vue';

export default {
	title: 'KvIconButton',
	component: KvIconButton,
	argTypes: {
		icon: {
			control: 'select',
			options: {
				'Dots Vertical': mdiDotsVertical,
				Heart: mdiHeart,
				Close: mdiClose,
				Menu: mdiMenu,
				Plus: mdiPlus,
				Minus: mdiMinus,
				'Chevron Right': mdiChevronRight,
				'Chevron Left': mdiChevronLeft,
			},
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
		disabled: {
			control: 'boolean',
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
				@click="onClick"
			/>
		</div>
	`,
	methods: {
		onClick(e) { console.log('Icon button clicked', e); },
	},
});

// Size Variants
export const Small = Template.bind({});
Small.args = {
	size: 'small',
	icon: mdiDotsVertical,
};

export const Medium = Template.bind({});
Medium.args = {
	size: 'medium',
	icon: mdiDotsVertical,
};

export const Large = Template.bind({});
Large.args = {
	size: 'large',
	icon: mdiDotsVertical,
};

// Icon Variants
export const CloseIcon = Template.bind({});
CloseIcon.args = {
	size: 'large',
	icon: mdiClose,
	radiusClass: 'tw-rounded',
};

// With Border
export const WithBorder = Template.bind({});
WithBorder.args = {
	size: 'large',
	icon: mdiDotsVertical,
	borderClass: 'tw-border-2 tw-border-action',
};

// Rounded Variants
export const FullyRounded = Template.bind({});
FullyRounded.args = {
	size: 'large',
	icon: mdiPlus,
	radiusClass: 'tw-rounded-full',
	borderClass: 'tw-border tw-border-tertiary',
};

// Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
	size: 'large',
	icon: mdiDotsVertical,
	disabled: true,
};

// Multiple Buttons
export const MultipleSizes = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvIconButton },
	setup() { return { args }; },
	template: `
		<div class="tw-bg-secondary tw-rounded-md tw-p-6 tw-inline-block">
			<div class="tw-flex tw-gap-2 tw-items-center">
				<kv-icon-button
					size="small"
					:icon="args.icon"
				/>
				<kv-icon-button
					size="medium"
					:icon="args.icon"
				/>
				<kv-icon-button
					size="large"
					:icon="args.icon"
				/>
			</div>
		</div>
	`,
});
MultipleSizes.args = {
	icon: mdiHeart,
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
						<kv-icon-button size="small" :icon="args.icon" />
					</div>
					<p class="tw-text-small tw-mt-1">Small (16px)</p>
				</div>
				<div class="tw-text-center">
					<div class="tw-border tw-border-dashed tw-border-tertiary tw-inline-block">
						<kv-icon-button size="medium" :icon="args.icon" />
					</div>
					<p class="tw-text-small tw-mt-1">Medium (20px)</p>
				</div>
				<div class="tw-text-center">
					<div class="tw-border tw-border-dashed tw-border-tertiary tw-inline-block">
						<kv-icon-button size="large" :icon="args.icon" />
					</div>
					<p class="tw-text-small tw-mt-1">Large (24px)</p>
				</div>
			</div>
		</div>
	`,
});
TouchTargetVisualization.args = {
	icon: mdiDotsVertical,
};
