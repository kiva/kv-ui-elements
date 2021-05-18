import KvSelect from '../KvSelect.vue';

export default {
	title: 'KvSelect',
	component: KvSelect,
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: ['default'],
			},
		},
		state: {
			control: {
				type: 'select',
				options: ['', 'disabled'],
				defaultValue: null,
			},
		},
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvSelect },
	data: () => ({
		exampleModel: 'example1',
	}),
	template: `
		<kv-select
			:id="id"
			:variant="variant"
			:state="state"
			@change="onChange"
			v-model="exampleModel"
		>
				<option class="px-3 py-2" value="example1">Example one</option>
				<option class="px-3 py-2" value="example2">Example two</option>
				<option class="px-3 py-2" value="example3">Example three</option>
		</kv-select>`,
	methods: {
		onChange(e) { console.log(e); },
	},
});

const VariantTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvSelect },
	data: () => ({
		exampleModel: 'example1',
	}),
	template: `
		<kv-select
			:id="id"
			:variant="variant"
			:state="state"
			@change="onChange"
			v-model="exampleModel"
		>
				<option class="px-3 py-2" value="example1">Example one</option>
				<option class="px-3 py-2" value="example2">Example two</option>
				<option class="px-3 py-2" value="example3">Example three</option>
		</kv-select>`,
	methods: {
		onChange(e) { console.log(e); },
	},
});

export const VariantDefault = Template.bind({});
VariantDefault.args = {
	variant: 'default',
};

// States
export const StateDisabled = VariantTemplate.bind({});
StateDisabled.args = {
	state: 'disabled',
};

export const withLabel = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvSelect },
	data: () => ({
		exampleModel: 'example1',
	}),
	template: `
		<div>
			<label
				:for="id"
				class="text-h4 block"
			>
				This is a label
			</label>

			<kv-select
				v-model="exampleModel"
				:id="id"
				class="mt-2"
			>
				<option value="example1">Example one</option>
				<option value="example2">Example two</option>
				<option value="example3">Example three</option>
			</kv-select>
		</div>
	`,
});

export const withSetWidth = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvSelect },
	data: () => ({
		exampleModel: 'example1',
		widthClass: 'w-16',
	}),
	template: `
		<div
			:id="id"
			:class="widthClass"
		>
			<label
				:for="id"
				class="uppercase text-small"
			>
				This is a label
			</label>

			<kv-select
				:id="id"
				class="mt-2 w-full"
				v-model="exampleModel"
			>
				<option class="px-3 py-2" value="example1">Example one</option>
				<option class="px-3 py-2" value="example2">Example two</option>
				<option class="px-3 py-2" value="example3">Example three</option>
			</kv-select>
		</div>
	`,
});
