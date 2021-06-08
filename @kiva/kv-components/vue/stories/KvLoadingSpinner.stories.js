import KvLoadingSpinner from '../KvLoadingSpinner.vue';

export default {
	title: 'KvLoadingSpinner',
	component: KvLoadingSpinner,
	argTypes: {
		size: {
			control: {
				type: 'select',
				options: ['small', 'medium', 'large'],
			},
		},
		color: {
			control: {
				type: 'select',
				options: ['brand', 'white', 'black'],
			},
		},
	},
};

// Single Loader
export const SingleLoader = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvLoadingSpinner },
	template: `
		<kv-loading-spinner
			:size="size"
			:color="color"
		/>`,
});

// All Variants
export const AllVariants = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvLoadingSpinner },
	template: `
		<div>
			<ul v-for="color in ['brand', 'white', 'black']" :key="color">
				<li
					v-for="size in ['small', 'medium', 'large']"
					:key="size"
					class="tw-mb-2"
				>
					<kv-loading-spinner
						:size="size"
						:color="color"
					/>
				</li>
			</ul>
		</div>`,
});
