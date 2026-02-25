import KvProgressBar from '../KvProgressBar.vue';

export default {
	title: 'Interface Elements/KvProgressBar',
	component: KvProgressBar,
	args: {
		min: 0,
		max: 100,
		value: 50,
		ariaLabel: 'Amount the loan has fundraised',
		variant: 'primary',
		bgVariant: 'secondary',
	},
};

const Template = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvProgressBar },
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<kv-progress-bar
			v-bind="args"
		></kv-progress-bar>`,
});

export const Default = Template.bind({});
Default.args = {};

// Variants
export const VariantCaution = Template.bind({});
VariantCaution.args = {
	variant: 'caution',
};

export const VariantDanger = Template.bind({});
VariantDanger.args = {
	variant: 'danger',
};

export const VariantGhost = Template.bind({});
VariantGhost.args = {
	variant: 'ghost',
};

export const BgVariantTertiary = Template.bind({});
BgVariantTertiary.args = {
	bgVariant: 'tertiary',
};
