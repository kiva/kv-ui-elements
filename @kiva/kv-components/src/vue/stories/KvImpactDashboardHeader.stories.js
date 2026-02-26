import KvImpactDashboardHeader from '../KvImpactDashboardHeader.vue';

export default {
	title: 'Page Frame/KvImpactDashboardHeader',
	component: KvImpactDashboardHeader,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvImpactDashboardHeader },
		template: `
			<div class="tw-bg-secondary tw-pb-7">
				<kv-impact-dashboard-header />
			</div>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story();
