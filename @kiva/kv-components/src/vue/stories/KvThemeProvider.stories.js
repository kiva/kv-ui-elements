import primitives, {
	defaultTheme,
	greenLightTheme,
	greenDarkTheme,
	marigoldLightTheme,
	stoneLightTheme,
} from '@kiva/kv-tokens';
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

const TEXT_BACKGROUNDS = {
	'tw-text-primary-inverse': 'tw-bg-primary-inverse',
	'tw-text-caution': 'tw-bg-caution',
	'tw-text-caution-highlight': 'tw-bg-caution-highlight',
	'tw-text-danger': 'tw-bg-danger',
	'tw-text-danger-highlight': 'tw-bg-danger-highlight',
};

const TEXT_BACKGROUNDS_TERTIARY_ON_SECONDARY = {
	...TEXT_BACKGROUNDS,
	'tw-text-tertiary': 'tw-bg-secondary',
};

export default {
	title: 'Base Styling/KvThemeProvider',
	component: KvThemeProvider,
	args: {
		theme: 'default',
		customTheme: null,
	},
	argTypes: {
		theme: {
			control: 'select',
			options: ['default', 'greenLight', 'greenDark', 'marigoldLight', 'stoneLight'],
			mapping: {
				default: defaultTheme,
				greenLight: greenLightTheme,
				greenDark: greenDarkTheme,
				marigoldLight: marigoldLightTheme,
				stoneLight: stoneLightTheme,
			},
		},
	},
	parameters: {
		textBackgrounds: TEXT_BACKGROUNDS,
	},
};

const demoTemplate = `
	<div class="tw-p-4 tw-mb-8 tw-rounded tw-bg-primary tw-border tw-flex tw-flex-col tw-gap-4">
		<section>
			<p
				v-for="textVariable in textVariables"
				:key="textVariable"
				class="tw-text-h2 tw-mb-2"
				:class="[textVariable, textBackgrounds[textVariable]]"
			>
				{{ textVariable }}
			</p>
			<h1 class="tw-text-jumbo tw-mb-2">Jumbo: The quick <u>brown fox</u> jumped <u>over the lazy dog</u></h1>
			<h1 class="tw-mb-2">H1: The quick <u>brown fox</u> jumped <u>over the lazy dog</u></h1>
			<h2 class="tw-mb-2">H2: The quick <u>brown fox</u> jumped <u>over the lazy dog</u></h2>
			<h3 class="tw-mb-2">H3: The quick <u>brown fox</u> jumped <u>over the lazy dog</u></h3>
			<p>Body text: Voluptate culpa qui excepteur irure ad. Culpa commodo aliquip irure sunt do. Irure incididunt consequat reprehenderit ipsum mollit esse. Ex veniam nulla consequat deserunt fugiat est do in do sint sint ex.</p>
		</section>
		<kv-grid as="section" class="tw-grid-cols-2 tw-p-4 tw-gap-2">
			<template
				v-for="bgVariable in bgVariables"
				:key="bgVariable"
			>
				<div
					class="tw-h-4"
					:class="bgVariable"
				></div>
				<div class="tw-flex tw-items-center">
					{{ bgVariable }}
				</div>
			</template>
		</kv-grid>
		<kv-grid as="section" class="tw-grid-cols-2 tw-p-4 tw-gap-2">
			<div
				v-for="borderVariable in borderVariables"
				:key="borderVariable"
				class="tw-border-2 tw-h-4"
				:class="borderVariable"
			>
				{{ borderVariable }}
			</div>
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

const Template = (templateArgs, {
	argTypes,
	parameters,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvButton,
		KvGrid,
		KvPageContainer,
		KvTextLink,
		KvThemeProvider,
	},
	setup() { return { args: { ...templateArgs } }; },
	data() {
		return {
			bgVariables: buildTailwindClasses('background'),
			textVariables: buildTailwindClasses('text'),
			borderVariables: buildTailwindClasses('border'),
			textBackgrounds: parameters.textBackgrounds,
			defaultTheme,
		};
	},
	template: `
		<kv-theme-provider v-bind="args">
			${demoTemplate}
		</kv-theme-provider>`,
});

export const Default = Template.bind({});

export const GreenLight = Template.bind({});
GreenLight.args = {
	theme: 'greenLight',
};
GreenLight.parameters = {
	textBackgrounds: TEXT_BACKGROUNDS_TERTIARY_ON_SECONDARY,
};

export const GreenDark = Template.bind({});
GreenDark.args = {
	theme: 'greenDark',
};

export const MarigoldLight = Template.bind({});
MarigoldLight.args = {
	theme: 'marigoldLight',
};
MarigoldLight.parameters = {
	textBackgrounds: TEXT_BACKGROUNDS_TERTIARY_ON_SECONDARY,
};

export const StoneLight = Template.bind({});
StoneLight.args = {
	theme: 'stoneLight',
};
StoneLight.parameters = {
	textBackgrounds: TEXT_BACKGROUNDS_TERTIARY_ON_SECONDARY,
};
