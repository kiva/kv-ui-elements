import KvProgressBar from '../KvProgressBar.vue';

export default {
	title: 'KvProgressBar',
	component: KvProgressBar,
	args: {
		value: '30',
		max: '100',
	},
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: ['brand', 'black'],
			},
		},
		value: {
			control: 'range',
			options: {
				min: 0,
				max: 100,
				// ????
				step: 1,
			},
		},

	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvProgressBar },
	template: `
		<kv-progress-bar
			class="w-full"
		>
			<div
				:max="min"
				:value="value"
				:variant="variant"
			></div>
		</kv-progress-bar>`,
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
