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
