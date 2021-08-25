import primitives from '@kiva/kv-tokens/primitives.json';
import KvButton from '../KvButton.vue';
import KvGrid from '../KvGrid.vue';
import KvPageContainer from '../KvPageContainer.vue';
import KvTextLink from '../KvTextLink.vue';
import KvThemeProvider from '../KvThemeProvider.vue';

const defaultTheme = primitives.colors.theme.DEFAULT;

const buildTailwindClasses = (prefix) => {
	let twPrefix = prefix;
	if (prefix === 'background') {
		twPrefix = 'bg';
	}
	return Object.keys(defaultTheme[prefix]).map((key) => `tw-${twPrefix}-${key}`);
};

export default {
	title: 'KvThemeProvider',
	component: KvThemeProvider,
	args: {
		theme: '',
		customTheme: null,
	},
	argTypes: {
		theme: {
			control: {
				type: 'select',
				options: ['', 'dark', 'mint'],
			},
		},
	},
};

const demoTemplate = `
	<div class="tw-p-4 tw-mb-8 tw-rounded tw-bg-primary tw-border tw-flex tw-flex-col tw-gap-4">
		<section>
			<p
				v-for="textVariable in textVariables"
				:key="textVariable"
				class="tw-text-h2 tw-mb-2"
				:class="textVariable"
			>
				<span>{{textVariable}}</span>
				<span class="tw-text-opacity-low" :class="textVariable">text-opacity-low</span>
			</p>
			<p>Body text: Voluptate culpa qui excepteur irure ad. Culpa commodo aliquip irure sunt do. Irure incididunt consequat reprehenderit ipsum mollit esse. Ex veniam nulla consequat deserunt fugiat est do in do sint sint ex.</p>
		</section>
		<kv-grid as="section" class="tw-grid-cols-2 tw-p-4 tw-gap-2" style="background-color: gray;">
			<template
				v-for="bgVariable in bgVariables"
			>
				<div

					class="tw-h-4"
					:class="bgVariable"
				>
					{{bgVariable}}
				</div>
				<div

					class="tw-h-4 tw-bg-opacity-low"
					:class="bgVariable"
				>
					{{bgVariable}}
				</div>
			</template>
		</kv-grid>
		<section>
			<ul>
				<li
					v-for="variant in ['primary', 'secondary', 'link', 'danger', 'ghost']"
					:key="variant"
					class="tw-mb-2"
				>
					<kv-button :variant="variant">
						Find a borrower
					</kv-button>
				</li>
			</ul>
		</section>
	</div>
`;

const Template = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvButton,
		KvGrid,
		KvPageContainer,
		KvTextLink,
		KvThemeProvider,
	},
	data() {
		return {
			bgVariables: buildTailwindClasses('background'),
			textVariables: buildTailwindClasses('text'),
			borderVariables: buildTailwindClasses('border'),
		};
	},
	template: `
		<kv-theme-provider :theme="theme" :custom-theme="customTheme">
			${demoTemplate}
		</kv-theme-provider>`,
});

export const Default = Template.bind({});

export const Dark = Template.bind({});
Dark.args = {
	theme: 'dark',
};

export const Mint = Template.bind({});
Mint.args = {
	theme: 'mint',
};

export const Custom = Template.bind({});
Custom.args = {
	theme: '',
	customTheme: {
		'--text-primary': '255, 0, 0',
		'--text-secondary': '0, 255, 255',
		'--text-action': '255, 255, 0',
		'--text-action-highlight': '255, 200, 0',
		'--bg-primary': '100, 199, 209',
		'--bg-secondary': '191, 255, 191',
		'--bg-action': '0, 0, 100',
		'--bg-action-highlight': '0, 0, 150',
	},
};