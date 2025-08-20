import KvImpactVerticalSelector from '../KvImpactVerticalSelector.vue';
import impactVerticalDataMock from '../../mock-data/impact-vertical-data-mock';

export default {
	title: 'KvImpactVerticalSelector',
	component: KvImpactVerticalSelector,
	argTypes: {
		categoryList: {
			control: 'object',
		},
		hiddenCategories: {
			control: 'object',
		},
		preSelectedCategory: {
			control: 'text',
		},
	},
	args: {
		categoryList: impactVerticalDataMock,
		hiddenCategories: [],
		preSelectedCategory: null,
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvImpactVerticalSelector,
	},
	setup() { return { args }; },
	template: `
		<div class="tw-p-2">
			<kv-impact-vertical-selector
				:category-list="categoryList"
				:hidden-categories="hiddenCategories"
				:pre-selected-category="preSelectedCategory"
				@category-selected="onCategorySelected"
			/>
		</div>
	`,
	data() {
		return {
			categoryList: args.categoryList,
			hiddenCategories: args.hiddenCategories,
			preSelectedCategory: args.preSelectedCategory,
			selectedCategoryId: null,
		};
	},
	methods: {
		onCategorySelected(categoryId) {
			console.log('Category selected:', categoryId);
			this.selectedCategoryId = categoryId;
		},
	},
});

export const Default = Template.bind({});

export const WithHiddenCategories = Template.bind({});
WithHiddenCategories.args = {
	hiddenCategories: ['28fe587c-f6f4-4329-b4ed-ac094b2c14b3', '914823b9-b4e3-4980-8811-09dbe0f19860'], // Hide Climate-threatened people and Education categories
};

export const WithPreSelectedCategory = Template.bind({});
WithPreSelectedCategory.args = {
	preSelectedCategory: '28fe587c-f6f4-4329-b4ed-ac094b2c14b3',
};
