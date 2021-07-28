import KvRadio from '../KvRadio.vue';

export default {
	title: 'Forms/KvRadio',
	component: KvRadio,
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
		KvRadio,
	},
	data: () => ({
		radioExampleModel: 'one',
	}),
	template: `
		<div class="tw-flex tw-flex-col tw-gap-2">
			<kv-radio
				:disabled="disabled"
				value="one"
				v-model="radioExampleModel"
				@change="onChange"
				@focus="onFocus"
			>
				One radio button: {{radioExampleModel}}
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="two"
				v-model="radioExampleModel"
				@change="onChange"
				@focus="onFocus"
			>
				Two radio button: {{radioExampleModel}}
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="three"
				v-model="radioExampleModel"
				@change="onChange"
				@focus="onFocus"
			>
				Three radio button: {{radioExampleModel}}
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="four"
				v-model="radioExampleModel"
				@change="onChange"
				@focus="onFocus"
			>
				Four is long lorem ipsum nulla duis velit occaecat consectetur pariatur enim eu nostrud. <a href="https://placeholder.com">Irure et cupidatat</a> veniam sit enim proident exercitation ut Lorem do. Commodo ad veniam commodo est amet pariatur: {{checkboxExampleModel3}}
			</kv-radio>
		</div>`,
	methods: {
		onChange(val) {
			console.log(val);
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

export const WithoutVModel = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvRadio,
	},
	data: () => ({
		radioExampleModel: '',
	}),
	template: `
		<div class="tw-flex tw-flex-col tw-gap-2">
			<kv-radio
				:disabled="disabled"
				value="one"
				name="my_group"
				:checked="radioExampleModel === 'one'"
				@change="(val) => radioExampleModel = val"
			>
				One radio button: {{radioExampleModel}}
			</kv-radio>
			<kv-radio
				:disabled="true"
				value="two"
				name="my_group"
				:checked="radioExampleModel === 'two'"
				@change="(val) => radioExampleModel = val"
			>
				Two radio button: {{radioExampleModel}}
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="three"
				name="my_group"
				:checked="radioExampleModel === 'three'"
				@change="(val) => radioExampleModel = val"
			>
				Three radio button: {{radioExampleModel}}
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="four"
				name="my_group"
				:checked="radioExampleModel === 'four'"
				@change="(val) => radioExampleModel = val"
			>
				Four is long lorem ipsum nulla duis velit occaecat consectetur pariatur enim eu nostrud. <a href="https://placeholder.com">Irure et cupidatat</a> veniam sit enim proident exercitation ut Lorem do. Commodo ad veniam commodo est amet pariatur
			</kv-radio>
		</div>`,
});
