import KvButton from '../KvButton.vue';
import KvGrid from '../KvGrid.vue';
import KvPageContainer from '../KvPageContainer.vue';
import KvTextLink from '../KvTextLink.vue';

export default {
	title: 'Base Styling/Theming',
};

const textVariables = [
	'tw-text-color-primary',
	'tw-text-color-primary-inverse',
	'tw-text-color-secondary',
	'tw-text-color-tertiary',
	'tw-text-color-action',
	'tw-text-color-action-highlight',
	'tw-text-color-danger',
	'tw-text-color-danger-highlight',
];

const bgVariables = [
	'tw-bg-primary',
	'tw-bg-primary-inverse',
	'tw-bg-secondary',
	'tw-bg-tertiary',
	'tw-bg-action',
	'tw-bg-action-highlight',
	'tw-bg-danger',
	'tw-bg-danger-highlight',
	'tw-bg-caution',
];

const demoTemplate = `
	<section class="tw-p-4 tw-mb-8 tw-rounded tw-bg-primary tw-border tw-flex tw-flex-col tw-gap-4">
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
	</section>
`;

export const Theming = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvButton,
		KvGrid,
		KvPageContainer,
		KvTextLink,
	},
	data() {
		return {
			textVariables,
			bgVariables,
		};
	},
	methods: {
		generateClass(token, prefix) {
			return `tw-${prefix}-${token}`;
		},
	},
	template: `
	<kv-page-container>
		<h1 class="tw-mt-4">Theming</h1>
		<p>Note when making a custom theme, you must specify the colors in rgb format. E.g., <code>--text-color-primary: 255, 0, 0;</code></p>
			${demoTemplate}

		<p>For a dark theme, add <code>.tw-theme-dark</code> class.</p>
		<div class="tw-theme-dark">
			${demoTemplate}
		</div>

		<p>For a one-off theme, add CSS custom properties to an inline style tag. You must use RGB values so tailwind's text and background opacity classes will still work.:
		<code>.tw-theme-dark</code> class.</p>
		<div style="
			--text-color-primary: 255, 0, 0;
			--text-color-secondary: 0, 255, 255;
			--text-color-action: 255, 255, 0;
			--text-color-action-highlight: 255, 200, 0;
			--bg-color-primary: 191, 229, 209;
			--bg-color-secondary: 191, 255, 191;
			--bg-color-secondary: 191, 255, 191;
			--bg-color-action: 0, 0, 100;
			--bg-color-action-highlight: 0, 0, 150;
			color: rgb(var(--text-color-primary));
		">
			<h2 class="tw-text-h4 tw-mb-1">Custom</h2>
			${demoTemplate}
		</div>
	</kv-page-container>
	`,
});
