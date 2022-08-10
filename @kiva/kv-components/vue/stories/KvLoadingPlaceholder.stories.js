import KvLoadingPlaceholder from '../KvLoadingPlaceholder.vue';

export default {
	title: 'KvLoadingPlaceholder',
	component: KvLoadingPlaceholder,
};

const DefaultTemplate = () => ({
	components: { KvLoadingPlaceholder },
	template: `
		<div style="padding: 20px;">
			<kv-loading-placeholder style="width: 400px; height: 50px;" />
		</div>
	`,
});

export const Default = DefaultTemplate.bind({});
