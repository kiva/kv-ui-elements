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
		radioExampleModel2: 'three',
	}),
	template: `
		<div>
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
				:disabled="disabled"
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
			{{radioExampleModel1}}
			<br><br>

			<kv-radio
				:disabled="disabled"
				value="one"
				name="group2"
				:checked="radioExampleModel2 == 'one'"
				@change="onChange2"
				@focus="onFocus"
			>
				One
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="two"
				name="group2"
				:checked="radioExampleModel2 == 'two'"
				@change="onChange2"
				@focus="onFocus"
			>
				Two
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="three"
				name="group2"
				:checked="radioExampleModel2 == 'three'"
				@change="onChange2"
				@focus="onFocus"
			>
				Three
			</kv-radio>
			{{radioExampleModel2}}
		</div>`,
	methods: {
		onChange(val) {
			console.log(val);
		},
		onChange2(val) {
			this.radioExampleModel2 = val;
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
