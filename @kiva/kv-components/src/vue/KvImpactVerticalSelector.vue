<template>
	<div>
		<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3">
			<kv-card-frame
				v-for="category in formattedCategories"
				:key="category.id"
				:bg-color-class="selectedCategory === category.id ? 'tw-bg-secondary' : 'tw-bg-white'"
				:border-class="
					selectedCategory === category.id
						? 'tw-border-2 tw-border-action'
						: 'tw-border-2 tw-border-transparent'"
				class="
					tw-transition-all tw-duration-200 hover:tw-shadow-lg
				"
				@click="selectCategory(category.id)"
			>
				<div
					:class="cardContainerClasses"
				>
					<kv-contentful-img
						v-if="category?.contentfulImage"
						:class="imageClasses"
						:alt="`${category.name} image`"
						:contentful-src="category.contentfulImage"
						:width="imageWidth"
					/>
					<img
						v-else-if="category?.customImage"
						:class="imageClasses"
						:alt="`${category.name} image`"
						:src="category.customImage"
						:width="imageWidth"
					>
					<div :class="textContainerClasses">
						<p class="tw-mb-0.5 tw-font-medium">
							{{ category.name }}
						</p>
						<p class="tw-text-small">
							{{ category.description }}
						</p>
						<p
							v-if="isCategoryExisting(category.id)"
							class="tw-text-small tw-py-1 tw-px-2 tw-mt-1 tw-bg-brand-200 tw-rounded tw-inline-block"
						>
							{{ existingCategoryMessage }}
						</p>
					</div>
				</div>
			</kv-card-frame>
		</div>
		<p
			v-if="formattedCategories.length === 0"
			class="tw-text-gray-500 tw-italic"
		>
			No categories available
		</p>
	</div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import KvCardFrame from './KvCardFrame.vue';
import KvContentfulImg from './KvContentfulImg.vue';

export default {
	components: {
		KvCardFrame,
		KvContentfulImg,
	},
	props: {
		// Expects an array of categories from our API
		categoryList: {
			type: Array,
			default: () => [],
		},
		// Expects a list of category ids to hide from the selector
		hiddenCategories: {
			type: Array,
			default: () => [],
		},
		imageWidth: {
			type: Number,
			default: 64,
		},
		// Category id to pre-select when component mounts
		preSelectedCategory: {
			type: String,
			default: null,
		},
		// Use compact horizontal layout on tablet and up (keeps image to the left)
		useCompactCard: {
			type: Boolean,
			default: false,
		},
		// Array of category ids that the user has already selected
		existingCategories: {
			type: Array,
			default: () => [],
		},
		// Message to show for categories that are in the existingCategories list
		existingCategoryMessage: {
			type: String,
			default: 'Already selected',
		},
	},
	emits: ['category-selected'],
	setup(props, { emit }) {
		// Track the currently selected category
		const selectedCategory = ref(null);

		// Function to select a category and emit the event
		const selectCategory = (categoryId) => {
			selectedCategory.value = categoryId;
			emit('category-selected', categoryId);
		};

		// Set pre-selected category on mount
		onMounted(() => {
			if (props.preSelectedCategory) {
				selectCategory(props.preSelectedCategory);
			}
		});

		const extractContentfulCategoryIcon = (category) => {
			if (category.contentfulEntry) {
				// Target a content entry with `category-icon` in the field key
				const categoryIconField = category?.contentfulEntry?.entry?.fields?.content?.find(
					(field) => field?.fields?.key?.includes('category-icon'),
				);
				// take the first contentLight entry and find the attached file url
				return categoryIconField?.fields?.contentLight?.[0]?.fields?.file?.url ?? null;
			}
			return null;
		};

		// Computed CSS classes based on useCompactCard prop
		const cardContainerClasses = computed(() => {
			if (props.useCompactCard) {
				return 'tw-p-2 md:tw-p-3 tw-flex tw-flex-row tw-items-center tw-cursor-pointer';
			}
			return 'tw-p-2 tw-flex tw-flex-row md:tw-flex-col tw-items-center tw-cursor-pointer';
		});

		const imageClasses = computed(() => {
			if (props.useCompactCard) {
				return 'tw-shrink-0 tw-mr-2';
			}
			return 'tw-shrink-0 tw-mr-2 md:tw-mr-0 md:tw-mb-2';
		});

		const textContainerClasses = computed(() => {
			if (props.useCompactCard) {
				return '';
			}
			return 'md:tw-text-center';
		});

		// Function to check if a category is already selected
		const isCategoryExisting = (categoryId) => {
			return props.existingCategories.includes(categoryId);
		};

		// Filter out hidden categories and format the data
		const formattedCategories = computed(() => {
			if (!props.categoryList || props.categoryList.length === 0) {
				return [];
			}

			return props.categoryList
				.filter((category) => !props.hiddenCategories.includes(category.id))
				.map((category) => ({
					id: category.id,
					name: category.name,
					description: category.description,
					customImage: category.customImage || null,
					contentfulImage: extractContentfulCategoryIcon(category) || null,
				}));
		});

		return {
			selectedCategory,
			formattedCategories,
			selectCategory,
			cardContainerClasses,
			imageClasses,
			textContainerClasses,
			isCategoryExisting,
		};
	},
};
</script>
