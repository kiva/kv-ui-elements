import KvSelect from '../KvSelect.vue';

export default {
	title: 'KvSelect',
	component: KvSelect,
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvSelect },
	data: () => ({
		id: 'example',
		exampleModel: 'example1',
	}),
	template: `
		<div>
			<label
				for="example-id"
				class="text-h4 block"
			>
				Choose an example
			</label>
			<kv-select
				id="example-id"
				:disabled="disabled"
				@change="onChange"
				v-model="exampleModel"
				class="mt-2"
			>
					<option class="px-3 py-2" value="example1">Example one</option>
					<option class="px-3 py-2" value="example2">Example two</option>
					<option class="px-3 py-2" value="example3">Example three</option>
			</kv-select>
		</div>`,
	methods: {
		onChange(e) { console.log(e); },
	},
});

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true,
};

export const LabelHidden = (args, { argTypes }) => ({
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
				class="text-h4 block sr-only"
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
});

export const WidthSet = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvSelect },
	data: () => ({
		exampleModel: 'example1',
	}),
	template: `
		<div class="w-full">
			<label
				for="example-id"
				class="text-h4 block"
			>
				Choose an example
			</label>

			<kv-select
				id="example-id"
				:disabled="disabled"
				@change="onChange"
				v-model="exampleModel"
				class="mt-2 w-full"
			>
				<option class="px-3 py-2" value="example1">Example one</option>
				<option class="px-3 py-2" value="example2">Example two</option>
				<option class="px-3 py-2" value="example3">Example three</option>
			</kv-select>
		</div>`,
});
