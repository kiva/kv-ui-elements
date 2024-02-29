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

export const UserData = story(
	{
		comments,
		userDisplayName: 'Jess',
		userImageUrl: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg',
		userPublicId: 'Jess1234',
	},
);
