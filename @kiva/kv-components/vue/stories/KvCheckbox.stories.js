import KvCheckbox from '../KvCheckbox.vue';

export default {
	title: 'KvCheckbox',
	component: KvCheckbox,
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
		KvCheckbox,
	},
	data: () => ({
		exampleModel: false,
	}),
	template: `
		<div>
			<kv-checkbox
				:disabled="disabled"
				:checked="checked"
				v-model="exampleModel"
				@change="onChange"
				@focus="onFocus"
			>
				Test Toggle {{exampleModel}}
			</kv-checkbox>
		</div>`,
	methods: {
		onChange(e) {
			console.log(e);
		},
		onFocus(e) {
			console.log(e);
		},
	},
});

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true,
};
