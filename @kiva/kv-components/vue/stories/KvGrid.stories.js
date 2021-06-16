import KvGrid from '../KvGrid.vue';
import KvPageContainer from '../KvPageContainer.vue';

export default {
	title: 'KvGrid',
	component: KvGrid,
	parameters: {
		layout: 'fullscreen',
	},
};

const TwelveColumnsTemplate = () => ({
	components: { KvGrid, KvPageContainer },
	template: `
		<div class="demo">
			<component is="style">
				.demo * { outline: 1px solid red !important; }
			</component>

			<kv-page-container>
				<h2 class="tw-mb-2">Twelve Even Columns</h2>
				<kv-grid class="tw-grid-cols-12">
					<div class="tw-bg-gray-300 tw-h-16">1</div>
					<div class="tw-bg-gray-300 tw-h-16">2</div>
					<div class="tw-bg-gray-300 tw-h-16">3</div>
					<div class="tw-bg-gray-300 tw-h-16">4</div>
					<div class="tw-bg-gray-300 tw-h-16">5</div>
					<div class="tw-bg-gray-300 tw-h-16">6</div>
					<div class="tw-bg-gray-300 tw-h-16">7</div>
					<div class="tw-bg-gray-300 tw-h-16">8</div>
					<div class="tw-bg-gray-300 tw-h-16">9</div>
					<div class="tw-bg-gray-300 tw-h-16">10</div>
					<div class="tw-bg-gray-300 tw-h-16">11</div>
					<div class="tw-bg-gray-300 tw-h-16">12</div>
				</kv-grid>
			</kv-page-container>
		</div>`,
});

const ResponsiveColumnsTemplate = () => ({
	components: { KvGrid, KvPageContainer },
	template: `
		<div class="demo">
			<component is="style">
				.demo * { outline: 1px solid red !important; }
			</component>

			<kv-page-container>
				<h2 class="tw-mb-2">Two on small, 3 on medium, 4 on large</h2>
				<kv-grid class="tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4">
					<div class="tw-bg-gray-300 tw-h-16">1</div>
					<div class="tw-bg-gray-300 tw-h-16">2</div>
					<div class="tw-bg-gray-300 tw-h-16">3</div>
					<div class="tw-bg-gray-300 tw-h-16">4</div>
					<div class="tw-bg-gray-300 tw-h-16">5</div>
					<div class="tw-bg-gray-300 tw-h-16">6</div>
					<div class="tw-bg-gray-300 tw-h-16">7</div>
					<div class="tw-bg-gray-300 tw-h-16">8</div>
					<div class="tw-bg-gray-300 tw-h-16">9</div>
					<div class="tw-bg-gray-300 tw-h-16">10</div>
					<div class="tw-bg-gray-300 tw-h-16">11</div>
					<div class="tw-bg-gray-300 tw-h-16">12</div>
				</kv-grid>
			</kv-page-container>
		</div>`,
});

const NestedTemplate = () => ({
	components: { KvGrid, KvPageContainer },
	template: `
		<div class="demo">
			<component is="style">
				.demo * { outline: 1px solid red !important; }
			</component>

			<kv-page-container>
				<h2 class="tw-mb-2">Nested</h2>
				<kv-grid class="tw-grid-cols-2">
					<div class="tw-bg-gray-300"><p>1</p></div>
					<div class="tw-bg-gray-300">
						<p>2</p>
						<p>The grid below is inside a grid column</p>
						<kv-grid class="tw-grid-cols-4">
							<div class="tw-bg-gray-300 tw-h-16">1</div>
							<div class="tw-bg-gray-300 tw-h-16">2</div>
							<div class="tw-bg-gray-300 tw-h-16">3</div>
							<div class="tw-bg-gray-300 tw-h-16">4</div>
						</kv-grid>
					</div>
				</kv-grid>
			</kv-page-container>
		</div>`,
});

export const TwelveColumns = TwelveColumnsTemplate.bind({});
export const ResponsiveColumns = ResponsiveColumnsTemplate.bind({});
export const Nested = NestedTemplate.bind({});
