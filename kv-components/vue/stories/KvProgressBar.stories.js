import KvProgressBar from '../KvProgressBar.vue';

export default {
	title: 'KvProgressBar',
	component: KvProgressBar,
	args: {
		value: 50,
		max: 100,
	},
	argTypes: {
		value: {
			control: 'range',
			options: {
				min: 0,
				max: 100,
			},
		},
		variant: {
			control: {
				type: 'select',
			},
			options: ['brand', 'black'],
		},
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvProgressBar },
	template: `
		<kv-progress-bar
			ref="progressBarRef"
			:max="max"
			:value="value"
			:variant="variant"
		></kv-progress-bar>`,
});

// Default
export const VariantBrand = Template.bind({});
VariantBrand.args = {
	variant: 'brand',
};

export const VariantBlack = Template.bind({});
VariantBlack.args = {
	variant: 'black',
};
