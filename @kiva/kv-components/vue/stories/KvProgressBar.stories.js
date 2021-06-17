import KvProgressBar from '../KvProgressBar.vue';

export default {
	title: 'KvProgressBar',
	component: KvProgressBar,
	args: {
		min: 0,
		max: 100,
		value: 50,
		ariaLabel: '',
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
			:aria-label="ariaLabel"
			:min="min"
			:max="max"
			:value="value"

		></kv-progress-bar>`,
});

export const Default = Template.bind({});
Default.args = {
	ariaLabel: 'Amount the loan has fundraised',
};
