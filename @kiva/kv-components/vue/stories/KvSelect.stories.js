import KvSelect from '../KvSelect';

export default {
	title: 'Forms/KvSelect',
	component: KvSelect,
};

const Template = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvSelect,
	},
	data: () => ({
		exampleModel: 'example2',
	}),
	template: `
		<div>
			<label
				for="example-id"
				class="tw-text-h4 tw-block"
			>
				Choose an example
			</label>
			<kv-select
				id="example-id"
				:disabled="disabled"
				@change="onChange"
				v-model="exampleModel"
				class="tw-mt-2"
			>
					<option value="example1">Example one</option>
					<option value="example2">Example two</option>
					<option value="example3">Example three</option>
			</kv-select>
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

export const LabelHidden = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvSelect,
	},
	data: () => ({
		exampleModel: 'example1',
	}),
	template: `
		<div>
			<label
				for="example-id"
				class="tw-text-h4 tw-block tw-sr-only"
			>
				Choose an example
			</label>

			<kv-select
				id="example-id"
				:disabled="disabled"
				@change="onChange"
				v-model="exampleModel"
			>
				<option value="example1">Example one</option>
				<option value="example2">Example two</option>
				<option value="example3">Example three</option>
			</kv-select>
		</div>`,
	methods: {
		onChange(e) {
			console.log(e);
		},
	},
});

export const WidthSet = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvSelect,
	},
	data: () => ({
		exampleModel: 'example1',
	}),
	template: `
		<div class="w-full">
			<label
				for="example-id"
				class="tw-text-h4 tw-block"
			>
				Choose an example
			</label>

			<kv-select
				id="example-id"
				:disabled="disabled"
				@change="onChange"
				v-model="exampleModel"
				class="tw-mt-2 tw-w-full"
			>
				<option value="example1">Example one</option>
				<option value="example2">Example two</option>
				<option value="example3">Example three</option>
			</kv-select>
		</div>`,
	methods: {
		onChange(e) {
			console.log(e);
		},
	},
});
