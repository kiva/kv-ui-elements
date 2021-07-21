import KvSwitch from '../KvSwitch.vue';

export default {
	title: 'KvSwitch',
	component: KvSwitch,
	args: {
		checked: false,
		disabled: false,
	},
};

const Template = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvSwitch,
	},
	data: () => ({
		exampleModel: false,
	}),
	template: `
		<div>
			<kv-switch :disabled="disabled" v-model="exampleModel" @change="onChange">Test Toggle {{exampleModel}}</kv-switch>
		</div>`,
	methods: {
		onChange(e) {
			console.log(e);
		},
	},
});

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true,
};
