import KvSwitch from '../KvSwitch';

export default {
	title: 'Forms/KvSwitch',
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
		switchExampleModel: false,
	}),
	template: `
		<div>
			<kv-switch
				:disabled="disabled"
				v-model="switchExampleModel"
				@change="onChange"
			>
				Switch is switched: {{switchExampleModel}}
			</kv-switch>
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

export const WithoutVModel = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvSwitch,
	},
	data: () => ({
		switchExampleModel: false,
	}),
	template: `
		<div>
			<kv-switch
				:modelValue="switchExampleModel"
				@update:modelValue="(val) => switchExampleModel = val"
				:disabled="disabled"
			>
				Switch is switched: {{switchExampleModel}}
			</kv-switch>
		</div>`,
});
