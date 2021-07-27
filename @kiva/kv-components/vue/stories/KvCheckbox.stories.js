import KvCheckbox from '../KvCheckbox.vue';

export default {
	title: 'Forms/KvCheckbox',
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
		checkboxExampleModel: false,
	}),
	template: `
		<div>
			<kv-checkbox
				:disabled="disabled"
				:checked="checked"
				v-model="checkboxExampleModel"
				@change="onChange"
				@focus="onFocus"
			>
				Checkbox is checked: {{checkboxExampleModel}}
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
