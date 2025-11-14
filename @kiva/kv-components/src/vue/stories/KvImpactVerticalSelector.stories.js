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
		imageWidth: {
			control: 'number',
		},
		useCompactCard: {
			control: 'boolean',
		},
		existingCategories: {
			control: 'object',
		},
		existingCategoryMessage: {
			control: 'text',
		},
	},
	args: {
		categoryList: impactVerticalDataMock,
		hiddenCategories: [],
		preSelectedCategory: null,
		imageWidth: 64,
		useCompactCard: false,
		existingCategories: [],
		existingCategoryMessage: 'Already selected',
	},
};

const customCategoryImageSample = [
	[
		{
			id: '28fe587c-f6f4-4329-b4ed-ac094b2c14b3',
			name: 'Climate-threatened people',
			description: 'Fund those on the front lines of the climate crisis.',
			customImage: 'https://www.kiva.org/img/s100/baa07b4416e1ff92ce68574598f866e7.webp',
			contentfulImage: null,
		},
		{
			id: '486bca95-7425-42ee-baf7-960eef7b3d0c',
			name: 'Refugees',
			description: 'Transform the future for refugees',
			customImage: 'https://www.kiva.org/img/s100/3beeea89cdfb331fa86dfdcbd042fdcf.webp',
			contentfulImage: null,
		},
		{
			id: '87ec8472-5cd7-49a7-a565-3f0b03e42a32',
			name: 'Marginalized U.S. entrepreneurs',
			description:
				'Let\'s build a thriving, fair economy, one entrepreneur at a time.',
			customImage: 'https://www.kiva.org/img/s100/a4fca24ac900a01bb8f81eb8d01af215.webp',
			contentfulImage: null,
		},
	],
];

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
				:image-width="imageWidth"
				:use-compact-card="useCompactCard"
				:existing-categories="existingCategories"
				:existing-category-message="existingCategoryMessage"
				@category-selected="onCategorySelected"
			/>
		</div>
	`,
	data() {
		return {
			categoryList: args.categoryList,
			hiddenCategories: args.hiddenCategories,
			preSelectedCategory: args.preSelectedCategory,
			imageWidth: args.imageWidth,
			useCompactCard: args.useCompactCard,
			existingCategories: args.existingCategories,
			existingCategoryMessage: args.existingCategoryMessage,
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
	imageWidth: 100,
};

export const CustomCategoryImage = Template.bind({});
CustomCategoryImage.args = {
	categoryList: customCategoryImageSample[0],
	imageWidth: 100,
};

export const CompactCard = Template.bind({});
CompactCard.args = {
	useCompactCard: true,
	imageWidth: 80,
};

export const CompactCardWithCustomImages = Template.bind({});
CompactCardWithCustomImages.args = {
	categoryList: customCategoryImageSample[0],
	useCompactCard: true,
	imageWidth: 80,
};

export const WithExistingCategories = Template.bind({});
WithExistingCategories.args = {
	existingCategories: ['28fe587c-f6f4-4329-b4ed-ac094b2c14b3', '914823b9-b4e3-4980-8811-09dbe0f19860'],
	existingCategoryMessage: "You've already set up this fund",
	useCompactCard: true,
	imageWidth: 80,
};
