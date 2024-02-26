import KvCommentsList from '../KvCommentsList.vue';
import activityFeed from '../../tests/fixtures/mockFeedActivityData';

export default {
	title: 'KvCommentsList',
	component: KvCommentsList,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvCommentsList },
		setup() { return { args: templateArgs }; },
		template: `
			<KvCommentsList v-bind="args" />
		`,
	});
	template.args = args;
	return template;
};

const comments = activityFeed.results[0].latest_reactions;

export const Default = story({ comments });
