import KvPageContainer from '../KvPageContainer.vue';

export default {
	title: 'Page Frame/KvPageContainer',
	component: KvPageContainer,
	parameters: {
		layout: 'fullscreen',
	},
};

const DefaultTemplate = () => ({
	components: { KvPageContainer },
	template: `
		<div class="demo">
			<component is="style">
				.demo * { outline: 1px solid red !important; }
			</component>

			<kv-page-container>
				<p>I'm constrained!</p>
			</kv-page-container>
		</div>`,
});

const BreakingOutTemplate = () => ({
	components: { KvPageContainer },
	template: `
		<div class="demo">
			<component is="style">
				.demo * { outline: 1px solid red !important; }
			</component>

			<div>
				<kv-page-container>
					<p>I'm constrained!</p>
				</kv-page-container>

				<img
					class="tw-w-full"
					src="https://via.placeholder.com/2000x400">

				<kv-page-container>
					<p>I'm constrained!</p>
				</kv-page-container>
			</div>
		</div>`,
});

export const Default = DefaultTemplate.bind({});
export const BreakingOut = BreakingOutTemplate.bind({});
