import KvGrid from '../KvGrid.vue';
import KvPageContainer from '../KvPageContainer.vue';

export default {
	title: 'BaseStyling',
};

export const Theming = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvPageContainer, KvGrid },
	template: `
	<kv-page-container>
		<h1 class="tw-mt-4">Theming</h1>
		<p>Note when making a custom theme, you must specify the colors in rgb format. E.g., <code>--text-color-primary: 255, 0, 0;</code></p>

		<section class="tw-mb-4 tw-p-4 tw-rounded tw-bg-primary">
			<h2 class="tw-text-h4 tw-mg-2">Default</h2>
			<h3 class="tw-text-h1 tw-text-color-primary">Primary <span class="tw-text-color-primary tw-text-opacity-low">low text-opacity</span></h3>
			<h3 class="tw-text-h2 tw-text-color-secondary">Secondary <span class="tw-text-color-secondary tw-text-opacity-low">low text-opacity</span></h3>
			<div class="tw-bg-secondary tw-p-4">
				<p>Voluptate culpa qui excepteur irure ad. Culpa commodo aliquip irure sunt do. Irure incididunt consequat reprehenderit ipsum mollit esse. Ex veniam nulla consequat deserunt fugiat est do in do sint sint ex.</p>
			</div>
			<div class="tw-bg-secondary tw-bg-opacity-low tw-p-4">
				<p>Voluptate culpa qui excepteur irure ad. Culpa commodo aliquip irure sunt do. Irure incididunt consequat reprehenderit ipsum mollit esse. Ex veniam nulla consequat deserunt fugiat est do in do sint sint ex.</p>
			</div>
		</section>

		<section class="tw-mb-4 tw-p-4 tw-rounded tw-bg-primary tw-theme-dark">
			<h2 class="tw-text-h4 tw-mg-2">Dark</h2>
			<h3 class="tw-text-h1 tw-text-color-primary">Primary <span class="tw-text-color-primary tw-text-opacity-low">low text-opacity</span></h3>
			<h3 class="tw-text-h2 tw-text-color-secondary">Secondary <span class="tw-text-color-secondary tw-text-opacity-low">low text-opacity</span></h3>
			<div class="tw-bg-secondary tw-p-4">
				<p>Voluptate culpa qui excepteur irure ad. Culpa commodo aliquip irure sunt do. Irure incididunt consequat reprehenderit ipsum mollit esse. Ex veniam nulla consequat deserunt fugiat est do in do sint sint ex.</p>
			</div>
			<div class="tw-bg-secondary tw-bg-opacity-low tw-p-4">
				<p>Voluptate culpa qui excepteur irure ad. Culpa commodo aliquip irure sunt do. Irure incididunt consequat reprehenderit ipsum mollit esse. Ex veniam nulla consequat deserunt fugiat est do in do sint sint ex.</p>
			</div>
		</section>

		<section class="tw-mb-4 tw-p-4 tw-rounded tw-bg-primary" style="
			--text-color-primary: 255, 0, 0;
			--text-color-secondary: 0, 255, 255;
			--bg-color-primary: 191, 229, 209;
			--bg-color-secondary: 191, 255, 191;
			color: rgb(var(--text-color-primary));
		">
			<h2 class="tw-text-h4 tw-mg-2">Custom</h2>
			<h3 class="tw-text-h1 tw-text-color-primary">Primary <span class="tw-text-color-primary tw-text-opacity-low">low text-opacity</span></h3>
			<h3 class="tw-text-h2 tw-text-color-secondary">Secondary <span class="tw-text-color-secondary tw-text-opacity-low">low text-opacity</span></h3>
			<div class="tw-bg-secondary tw-p-4">
				<p>Voluptate culpa qui excepteur irure ad. Culpa commodo aliquip irure sunt do. Irure incididunt consequat reprehenderit ipsum mollit esse. Ex veniam nulla consequat deserunt fugiat est do in do sint sint ex.</p>
			</div>
			<div class="tw-bg-secondary tw-bg-opacity-low tw-p-4">
				<p>Voluptate culpa qui excepteur irure ad. Culpa commodo aliquip irure sunt do. Irure incididunt consequat reprehenderit ipsum mollit esse. Ex veniam nulla consequat deserunt fugiat est do in do sint sint ex.</p>
			</div>
		</section>
	</kv-page-container>
	`,
});
