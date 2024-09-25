import primitives from '@kiva/kv-tokens/primitives.json';
import {
	defaultTheme,
	greenLightTheme,
	greenDarkTheme,
	marigoldLightTheme,
	stoneLightTheme,
	stoneDarkTheme,
	darkTheme,
	darkGreenTheme,
	mintTheme,
	darkMintTheme,
	darkStoneTheme,
} from '@kiva/kv-tokens/configs/kivaColors.cjs';
import KvButton from '../KvButton.vue';
import KvGrid from '../KvGrid.vue';
import KvPageContainer from '../KvPageContainer.vue';
import KvTextLink from '../KvTextLink.vue';
import KvThemeProvider from '../KvThemeProvider.vue';

const defaultThemeTokens = primitives.colors.theme.DEFAULT;

const buildTailwindClasses = (prefix) => {
	let twPrefix = prefix;
	if (prefix === 'background') {
		twPrefix = 'bg';
	}
	return Object.keys(defaultThemeTokens[prefix]).map((key) => `tw-${twPrefix}-${key}`);
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
				options: ['', 'dark', 'darkGreen', 'mint'],
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
			<h1 class="tw-text-jumbo tw-mb-2">Jumbo: The quick <u>brown fox</u> jumped <u>over the lazy dog</u></h1>
			<h1 class="tw-mb-2">H1: The quick <u>brown fox</u> jumped <u>over the lazy dog</u></h1>
			<h2 class="tw-mb-2">H2: The quick <u>brown fox</u> jumped <u>over the lazy dog</u></h2>
			<h3 class="tw-mb-2">H3: The quick <u>brown fox</u> jumped <u>over the lazy dog</u></h3>
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
		<kv-grid as="section" class="tw-grid-cols-2 tw-p-4 tw-gap-2">
			<template
				v-for="borderVariable in borderVariables"
			>
				<div
					class="tw-border-2 tw-h-4"
					:class="borderVariable"
				>
					{{ borderVariable }}
				</div>
				<div
					class="tw-border-2 tw-h-4 tw-border-opacity-low"
					:class="borderVariable"
				>
					{{ borderVariable }}
				</div>
			</template>
		</kv-grid>
		<section>
			<ul>
				<li
					v-for="variant in ['primary', 'secondary', 'link', 'danger', 'caution', 'ghost']"
					:key="variant"
					class="tw-mb-2"
				>
					<kv-button :variant="variant">
						{{ variant }}
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
			defaultTheme,
			darkTheme,
			mintTheme,
			darkMintTheme,
			darkStoneTheme,
		};
	},
	template: `
		<kv-theme-provider :theme="theme">
			${demoTemplate}
		</kv-theme-provider>`,
});

export const Default = Template.bind({});

export const GreenLight = Template.bind({});
GreenLight.args = {
	theme: greenLightTheme,
};

export const GreenDark = Template.bind({});
GreenDark.args = {
	theme: greenDarkTheme,
};

export const MarigoldLight = Template.bind({});
MarigoldLight.args = {
	theme: marigoldLightTheme,
};

export const StoneLight = Template.bind({});
StoneLight.args = {
	theme: stoneLightTheme,
};

export const StoneDark = Template.bind({});
StoneDark.args = {
	theme: stoneDarkTheme,
};

export const Dark = Template.bind({});
Dark.args = {
	theme: darkTheme,
};

export const Mint = Template.bind({});
Mint.args = {
	theme: mintTheme,
};

export const DarkGreen = Template.bind({});
DarkGreen.args = {
	theme: darkGreenTheme,
};

export const DarkMint = Template.bind({});
DarkMint.args = {
	theme: darkMintTheme,
};

export const Custom = Template.bind({});
Custom.args = {
	theme: {
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

export const DarkStone = Template.bind({});
DarkStone.args = {
	theme: darkStoneTheme,
};
