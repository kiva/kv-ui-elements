import KvLoadingPlaceholder from '../KvLoadingPlaceholder.vue';

export default {
	title: 'KvLoadingPlaceholder',
	component: KvLoadingPlaceholder,
};

const DefaultTemplate = () => ({
	components: { KvLoadingPlaceholder },
	template: `
		<div style="width: 400px; padding: 20px;">
			<kv-loading-placeholder class="tw-p-1" style="height: 50px;" />
		</div>
	`,
});

export const Default = DefaultTemplate.bind({});
