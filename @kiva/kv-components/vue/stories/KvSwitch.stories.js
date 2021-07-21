import KvToggle from '../KvToggle.vue';

export default {
	title: 'KvToggle',
	component: KvToggle,
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
		KvToggle,
	},
	data: () => ({
		exampleModel: false,
	}),
	template: `
		<div>
			<kv-toggle :disabled="disabled" v-model="exampleModel" @change="onChange">Test Toggle {{exampleModel}}</kv-toggle>
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
