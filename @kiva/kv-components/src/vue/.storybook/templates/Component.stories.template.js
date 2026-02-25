import {
	{{mdiIconImports}}
} from '@mdi/js';
import {{ComponentName}} from '../{{ComponentName}}.vue';
import {{ComponentName}}DocsMdx from './{{ComponentName}}Docs.mdx';

// IMPORTANT: {{folderPrefix}} must use an existing Storybook folder or ask for clarification
// Existing prefixes: Base Styling, Charts, Checkout, Comments, Components, Forms, Interface Elements, Loan Display, Page Frame
export default {
	title: '{{folderPrefix}}/{{ComponentName}}',
	component: {{ComponentName}},
	parameters: {
		docs: {
			page: {{ComponentName}}DocsMdx,
			title: '{{ComponentName}} Docs',
		},
	},
	argTypes: {
		{{argTypes}}
	},
};

// Component Overview - Simple examples of each type (CSF format)
export const ComponentOverview = {
	render: () => ({
		components: { {{ComponentName}} },
		{{dataSection}}
		{{setupSection}}
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				{{componentOverviewTemplate}}
			</div>
		`,
	}),
};

// All Variations - Comprehensive view of all style and functional variants
export const AllVariations = {
	render: () => ({
		components: { {{ComponentName}} },
		{{allVariationsDataSection}}
		{{allVariationsSetupSection}}
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				{{allVariationsTemplate}}
			</div>
		`,
	}),
};

{{additionalStories}}

// Default story - interactive playground
export const Default = {
	args: {
		{{defaultArgs}}
	},
	render: (args) => ({
		components: { {{ComponentName}} },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6 tw-inline-block">
				{{defaultTemplate}}
			</div>
		`,
		{{defaultMethods}}
	}),
};
