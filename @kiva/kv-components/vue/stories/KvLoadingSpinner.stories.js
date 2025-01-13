import KvLoadingSpinner from '#components/KvLoadingSpinner';

export default {
	title: 'KvLoadingSpinner',
	component: KvLoadingSpinner,
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
		color: {
			control: 'select',
			options: ['brand', 'white', 'black'],
		},
	},
};

// Single Loader
export const SingleLoader = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvLoadingSpinner },
	setup() { return { args }; },
	template: `
		<kv-loading-spinner
			:size="args.size"
			:color="args.color"
		/>`,
});

// All Variants
export const AllVariants = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvLoadingSpinner },
	setup() { return { args }; },
	template: `
		<div>
			<ul v-for="color in ['brand', 'white', 'black']" :key="color">
				<li
					v-for="size in ['small', 'medium', 'large']"
					:key="size"
					class="tw-mb-2"
				>
					<kv-loading-spinner
						:size="args.size"
						:color="args.color"
					/>
				</li>
			</ul>
		</div>`,
});
