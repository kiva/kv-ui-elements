import KvCheckbox from '../KvCheckbox.vue';

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

export const SquareDisabledBlur = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCheckbox },
	data: () => ({
		checkedBlur: true,
		uncheckedBlur: false,
		checkedNoBlur: true,
		uncheckedNoBlur: false,
	}),
	template: `
	<div>
	  <h3>Square Variant - Disabled with Blur</h3>
	  <kv-checkbox
		variant="square"
		:valid="valid"
		v-model="checkedBlur"
		:disabled="true"
		:blurOnDisabled="true"
		@change="onChange"
		@focus="onFocus"
	  >
		Checked (blur): {{checkedBlur}}
	  </kv-checkbox>
	  <kv-checkbox
		variant="square"
		:valid="valid"
		v-model="uncheckedBlur"
		:disabled="true"
		:blurOnDisabled="true"
		@change="onChange"
		@focus="onFocus"
	  >
		Unchecked (blur): {{uncheckedBlur}}
	  </kv-checkbox>
	  <h3>Square Variant - Disabled without Blur</h3>
	  <kv-checkbox
		variant="square"
		:valid="valid"
		v-model="checkedNoBlur"
		:disabled="true"
		:blurOnDisabled="false"
		@change="onChange"
		@focus="onFocus"
	  >
		Checked (no blur): {{checkedNoBlur}}
	  </kv-checkbox>
	  <kv-checkbox
		variant="square"
		:valid="valid"
		v-model="uncheckedNoBlur"
		:disabled="true"
		:blurOnDisabled="false"
		@change="onChange"
		@focus="onFocus"
	  >
		Unchecked (no blur): {{uncheckedNoBlur}}
	  </kv-checkbox>
	</div>
  `,
});

export const RoundVariant = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCheckbox },
	data: () => ({
		checkboxChecked: true,
		checkboxUnchecked: false,
	}),
	template: `
			<div>
				<kv-checkbox
					variant="round"
					:valid="valid"
					v-model="checkboxChecked"
					@change="onChange"
					@focus="onFocus"
				>
					Round Checkbox (checked): {{checkboxChecked}}
				</kv-checkbox>
				<kv-checkbox
					variant="round"
					:valid="valid"
					v-model="checkboxUnchecked"
					@change="onChange"
					@focus="onFocus"
				>
					Round Checkbox (unchecked): {{checkboxUnchecked}}
				</kv-checkbox>
			</div>
		`,
});

export const RoundDisabledBlur = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCheckbox },
	data: () => ({
		checkedBlur: true,
		uncheckedBlur: false,
		checkedNoBlur: true,
		uncheckedNoBlur: false,
	}),
	template: `
	<div>
	  <h3>Round Variant - Disabled with Blur</h3>
	  <kv-checkbox
		variant="round"
		:valid="valid"
		v-model="checkedBlur"
		:disabled="true"
		:blurOnDisabled="true"
		@change="onChange"
		@focus="onFocus"
	  >
		Checked (blur): {{checkedBlur}}
	  </kv-checkbox>
	  <kv-checkbox
		variant="round"
		:valid="valid"
		v-model="uncheckedBlur"
		:disabled="true"
		:blurOnDisabled="true"
		@change="onChange"
		@focus="onFocus"
	  >
		Unchecked (blur): {{uncheckedBlur}}
	  </kv-checkbox>
	  <h3>Round Variant - Disabled without Blur</h3>
	  <kv-checkbox
		variant="round"
		:valid="valid"
		v-model="checkedNoBlur"
		:disabled="true"
		:blurOnDisabled="false"
		@change="onChange"
		@focus="onFocus"
	  >
		Checked (no blur): {{checkedNoBlur}}
	  </kv-checkbox>
	  <kv-checkbox
		variant="round"
		:valid="valid"
		v-model="uncheckedNoBlur"
		:disabled="true"
		:blurOnDisabled="false"
		@change="onChange"
		@focus="onFocus"
	  >
		Unchecked (no blur): {{uncheckedNoBlur}}
	  </kv-checkbox>
	</div>
  `,
});
export const ArrayModel = ArrayModelTemplate.bind({});
