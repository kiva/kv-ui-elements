import KvCommentsContainer from '../KvCommentsContainer.vue';
import activityFeed from '../../tests/fixtures/mockFeedActivityData';

export default {
	title: 'KvCommentsContainer',
	component: KvCommentsContainer,
};

const TEST_USER_NAME = 'Jess';
const TEST_USER_IMAGE = 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg';

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvCommentsContainer },
		setup() { return { args: templateArgs }; },
		provide: {
			fetchLenderInfo: () => Promise.resolve({
				name: TEST_USER_NAME,
				image: { url: TEST_USER_IMAGE },
			}),
		},
		template: `
			<div style="max-width: 800px;">
				<KvCommentsContainer v-bind="args" />
			</div>
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
		userDisplayName: TEST_USER_NAME,
		userImageUrl: TEST_USER_IMAGE,
		userPublicId: 'Jess1234',
	},
);
