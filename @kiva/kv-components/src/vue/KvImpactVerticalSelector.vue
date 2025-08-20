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
					class="
						tw-p-2 tw-flex tw-flex-row md:tw-flex-col
						tw-items-center tw-cursor-pointer
					"
				>
					<kv-loading-placeholder
						class="tw-mr-2 md:tw-mr-0 md:tw-mb-2 tw-rounded-sm tw-shrink-0"
						:style="{ height: '64px', width: '64px' }"
					/>
					<div class="md:tw-text-center">
						<p class="tw-mb-0.5 tw-font-medium">
							{{ category.name }}
						</p>
						<p class="tw-text-small">
							{{ category.description }}
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
import KvLoadingPlaceholder from './KvLoadingPlaceholder.vue';

export default {
	components: {
		KvCardFrame,
		KvLoadingPlaceholder,
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
		// Category id to pre-select when component mounts
		preSelectedCategory: {
			type: String,
			default: null,
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
				}));
		});

		return {
			selectedCategory,
			formattedCategories,
			selectCategory,
		};
	},
};
</script>
