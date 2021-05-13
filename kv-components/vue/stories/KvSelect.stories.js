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
		<kv-select v-model="exampleModel">
			<option class="px-3 py-2" value="example1">Example one</option>
			<option class="px-3 py-2" value="example2">Example two</option>
			<option class="px-3 py-2" value="example3">Example three</option>
		</kv-select>
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
		<kv-select disabled v-model="exampleModel">
			<option value="example1">Example one</option>
			<option value="example2">Example two</option>
			<option value="example3">Example three</option>
		</kv-select>
	`,
});
