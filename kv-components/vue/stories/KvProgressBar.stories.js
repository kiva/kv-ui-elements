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

		></kv-progress-bar>`,
});

// Default
export const Brand = Template.bind({});
