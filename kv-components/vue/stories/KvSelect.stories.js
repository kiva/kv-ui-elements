import KvSelect from '../KvSelect.vue';

export default {
	title: 'KvSelect',
	component: KvSelect,
};

export const Default = () => ({
	components: { KvSelect },
	data: () => ({
		exampleModel: 'example3',
	}),
	template: `
		<div>
			<label></label>
			<kv-select v-model="exampleModel">
				<option class="px-3 py-2" value="example1">Example one</option>
				<option class="px-3 py-2" value="example2">Example two</option>
				<option class="px-3 py-2" value="example3">Example three</option>
			</kv-select>
		</div>
	`,
});

export const Disabled = () => ({
	components: {
		KvSelect,
	},
	data: () => ({
		exampleModel: 'example2',
	}),
	template: `
		<div>
			<label></label>
			<kv-select disabled v-model="exampleModel">
				<option value="example1">Example one</option>
				<option value="example2">Example two</option>
				<option value="example3">Example three</option>
			</kv-select>
		</div>
	`,
});

export const withLabel = () => ({
	components: {
		KvSelect,
	},
	data: () => ({
		exampleModel: 'example1',
	}),
	props: {
		id: {
			type: String,
			default: 'thisDropdown',
		},
		labelText: {
			type: String,
			default: 'This is a label',
		},
	},
	template: `
		<div>
			<label :for="id" class="uppercase text-small pb-4">{{ labelText }}</label>
			<kv-select :id="id" v-model="exampleModel" class="mt-2">
				<option value="example1">Example one</option>
				<option value="example2">Example two</option>
				<option value="example3">Example three</option>
			</kv-select>
		</div>
	`,
});

export const withSetWidth = () => ({
	components: { KvSelect },
	data: () => ({
		exampleModel: 'example3',
	}),
	template: `
		<div>
			<label></label>
			<kv-select :width="" v-model="exampleModel">
				<option class="px-3 py-2" value="example1">Example one</option>
				<option class="px-3 py-2" value="example2">Example two</option>
				<option class="px-3 py-2" value="example3">Example three</option>
			</kv-select>
		</div>
	`,
});
