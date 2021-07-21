import KvRadio from '../KvRadio.vue';

export default {
	title: 'KvRadio',
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
		exampleModel: 'one',
		exampleModel2: 'three',
	}),
	template: `
		<div>
			<kv-radio
				:disabled="disabled"
				value="one"
				v-model="exampleModel"
				@change="onChange"
				@focus="onFocus"
			>
				One {{exampleModel}}
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="two"
				v-model="exampleModel"
				@change="onChange"
				@focus="onFocus"
			>
				Two {{exampleModel}}
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="three"
				v-model="exampleModel"
				@change="onChange"
				@focus="onFocus"
			>
				Three {{exampleModel}}
			</kv-radio>
			<br><br>


			<kv-radio
				:disabled="disabled"
				value="one"
				name="group2"
				:checked="exampleModel2 == 'one'"
				@change="onChange2"
				@focus="onFocus"
			>
				One {{exampleModel2}}
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="two"
				name="group2"
				:checked="exampleModel2 == 'two'"
				@change="onChange2"
				@focus="onFocus"
			>
				Two {{exampleModel2}}
			</kv-radio>
			<kv-radio
				:disabled="disabled"
				value="three"
				name="group2"
				:checked="exampleModel2 == 'three'"
				@change="onChange2"
				@focus="onFocus"
			>
				Three {{exampleModel2}}
			</kv-radio>
		</div>`,
	methods: {
		onChange(val) {
			console.log(val);
		},
		onChange2(val) {
			this.exampleModel2 = val;
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
