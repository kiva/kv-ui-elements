import KvCommentsListItem from '../KvCommentsListItem.vue';
import activityFeed from '../../tests/fixtures/mockFeedActivityData';

export default {
	title: 'KvCommentsListItem',
	component: KvCommentsListItem,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvCommentsListItem },
		setup() { return { args: templateArgs }; },
		template: `
			<KvCommentsListItem v-bind="args" />
		`,
	});
	template.args = args;
	return template;
};

const comment = activityFeed.results[0].latest_reactions.comment[1];
const childComments = activityFeed.results[0].latest_reactions.comment[0];

export const Default = story({ comment });

export const ChildComments = story({ comment: childComments });

export const UserData = story(
	{
		comment: childComments,
		userDisplayName: 'Jess',
		userImageUrl: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg',
		userPublicId: 'Jess1234',
	},
);
