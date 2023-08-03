import KvProgressBar from '../KvProgressBar.vue';

export default {
	title: 'KvProgressBar',
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

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvProgressBar },
	template: `
		<kv-progress-bar
			:aria-label="ariaLabel"
			:min="min"
			:max="max"
			:value="value"
			:variant="variant"
			:bg-variant="bgVariant"

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
