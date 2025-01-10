import KvCheckbox from '../KvCheckbox';

export default {
	title: 'Forms/KvCheckbox',
	component: KvCheckbox,
	args: {
		checked: false,
		disabled: false,
		valid: true,
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
				:valid="valid"
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

export const Invalid = Template.bind({});
Invalid.args = {
	valid: false,
};

export const WithoutVModel = (args, {
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
				:modelValue="checkboxExampleModel"
				@change="(val) => checkboxExampleModel = val"
				:disabled="disabled"
			>
				Checkbox is checked: {{checkboxExampleModel}}
			</kv-checkbox>
		</div>`,
});

export const Multiple = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvCheckbox,
	},
	data: () => ({
		checkboxExampleModel1: false,
		checkboxExampleModel2: false,
		checkboxExampleModel3: false,
		checkboxExampleModel4: false,
	}),
	template: `
		<div class="tw-flex tw-flex-col tw-gap-2">
			<kv-checkbox
				:modelValue="checkboxExampleModel1"
				@change="(val) => checkboxExampleModel1 = val"
			>
				One is checked: {{checkboxExampleModel1}}
			</kv-checkbox>
			<kv-checkbox
				:modelValue="checkboxExampleModel2"
				@change="(val) => checkboxExampleModel2 = val"
				:disabled="true"
			>
				Two is checked: {{checkboxExampleModel2}}
			</kv-checkbox>
			<kv-checkbox
				:modelValue="checkboxExampleModel3"
				@change="(val) => checkboxExampleModel3 = val"
			>
				Three is checked: {{checkboxExampleModel3}}
			</kv-checkbox>
			<kv-checkbox
				:modelValue="checkboxExampleModel4"
				@change="(val) => checkboxExampleModel4 = val"
			>
				Four is long lorem ipsum nulla duis velit occaecat consectetur pariatur enim eu nostrud. <a href="https://placeholder.com">Irure et cupidatat</a> veniam sit enim proident exercitation ut Lorem do. Commodo ad veniam commodo est amet pariatur: {{checkboxExampleModel4}}
			</kv-checkbox>
		</div>`,
});

const ArrayModelTemplate = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvCheckbox,
	},
	data: () => ({
		checkboxExampleModel: ['item1', 'item2'],
	}),
	template: `
	<div class="tw-flex tw-flex-col tw-gap-2">
			<kv-checkbox
				value="item1"
				v-model="checkboxExampleModel"
				@change="onChange"
			>
				item1
			</kv-checkbox>
			<kv-checkbox
				value="item2"
				v-model="checkboxExampleModel"
				@change="onChange"
			>
				item2
			</kv-checkbox>
			<kv-checkbox
				value="item3"
				v-model="checkboxExampleModel"
				@change="onChange"
			>
				item3
			</kv-checkbox>
			<div>Checked items: <span v-for="item in checkboxExampleModel" :key="item">{{item}} </span></div>
		</div>`,
	methods: {
		onChange(e) {
			console.log(e);
		},
	},
});
export const ArrayModel = ArrayModelTemplate.bind({});
