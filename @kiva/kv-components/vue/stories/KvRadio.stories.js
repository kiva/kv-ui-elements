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
		radioExampleModel1: 'one',
	}),
	template: `
		<div class="tw-flex tw-flex-col tw-gap-3">
			<kv-radio
				:disabled="disabled"
				value="one"
				v-model="radioExampleModel1"
				@change="onChange"
				@focus="onFocus"
			>
				One
			</kv-radio>
			<kv-radio
				:disabled="true"
				value="two"
				v-model="radioExampleModel1"
				@change="onChange"
				@focus="onFocus"
			>
				Two
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="three"
				v-model="radioExampleModel1"
				@change="onChange"
				@focus="onFocus"
			>
				Three
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="four"
				v-model="radioExampleModel1"
				@change="onChange"
				@focus="onFocus"
			>
				Four
			</kv-radio>
			<p>Selected: {{radioExampleModel1}}</p>
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

const ManualTemplate = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvRadio,
	},
	data: () => ({
		radioExampleModel2: '',
	}),
	template: `
		<div>
			<kv-radio
				:disabled="disabled"
				value="one"
				name="my_group"
				:checked="radioExampleModel2 === 'one'"
				@change="(val) => radioExampleModel2 = val"
			>
				One
			</kv-radio>
			<kv-radio
				:disabled="true"
				value="two"
				name="my_group"
				:checked="radioExampleModel2 === 'two'"
				@change="(val) => radioExampleModel2 = val"
			>
				Two
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="three"
				name="my_group"
				:checked="radioExampleModel2 === 'three'"
				@change="(val) => radioExampleModel2 = val"
			>
				Three
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="four"
				name="my_group"
				:checked="radioExampleModel2 === 'four'"
				@change="(val) => radioExampleModel2 = val"
			>
				Four
			</kv-radio>
			<p>Selected: {{radioExampleModel2}}</p>
		</div>`,
});

export const Manual = ManualTemplate.bind({});
