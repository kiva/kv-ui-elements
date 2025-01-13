import KvLoadingPlaceholder from '#components/KvLoadingPlaceholder';

export default {
	title: 'KvLoadingPlaceholder',
	component: KvLoadingPlaceholder,
};

const DefaultTemplate = () => ({
	components: { KvLoadingPlaceholder },
	template: `
		<div style="padding: 20px;">
			<kv-loading-placeholder class="tw-py-1" :class="{ 'tw-px-1': true }" style="height: 50px;" :style="{ width: '400px' }" />
		</div>
	`,
});

export const Default = DefaultTemplate.bind({});
