import {
	mdiPencil,
} from '@mdi/js';
import KvMaterialIcon from '../KvMaterialIcon.vue';
import KvPill from '../KvPill.vue';

export default {
	title: 'KvPill',
	component: KvPill,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		bgClass: '', roundedClass: '',
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvPill },
	setup() { return { args }; },
	template: `
		<kv-pill :bg-class="args.bgClass" :rounded-class="args.roundedClass">Your custom message goes here</kv-pill>
	`,
});

const IconTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvPill, KvMaterialIcon },
	setup() { return { args, mdiPencil }; },
	template: `
		<kv-pill :bg-class="args.bgClass" :rounded-class="args.roundedClass">
		<template #icon>
			<kv-material-icon
				class="tw-h-2 tw-w-2"
				:icon="mdiPencil"
			/>
		</template>
		Your custom message goes here</kv-pill>
	`,
});

export const Default = DefaultTemplate.bind({});

export const WithSecondaryBackground = DefaultTemplate.bind({});
WithSecondaryBackground.args = {
	bgClass: 'tw-bg-secondary',
};

export const WithRoundedClass = DefaultTemplate.bind({});
WithRoundedClass.args = {
	roundedClass: 'tw-rounded-full',
	bgClass: 'tw-bg-secondary',
};

export const WithBothClasses = DefaultTemplate.bind({});
WithBothClasses.args = {
	roundedClass: 'tw-rounded-full',
	bgClass: 'tw-bg-secondary',
};

export const WithIcon = IconTemplate.bind({});
WithIcon.args = {
	roundedClass: 'tw-rounded-full',
	bgClass: 'tw-bg-secondary',
};
