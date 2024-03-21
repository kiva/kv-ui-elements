import KvCommentsListItem from '../KvCommentsListItem.vue';
import comments from '../../tests/fixtures/mockFeedActivityData';

export default {
	title: 'KvCommentsListItem',
	component: KvCommentsListItem,
};

const TEST_USER_NAME = 'Jess';
const TEST_USER_IMAGE = 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg';

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvCommentsListItem },
		setup() { return { args: templateArgs }; },
		provide: {
			fetchLenderInfo: () => Promise.resolve({
				name: TEST_USER_NAME,
				image: { url: TEST_USER_IMAGE },
			}),
		},
		template: `
			<KvCommentsListItem v-bind="args" />
		`,
	});
	template.args = args;
	return template;
};

const comment = comments[0];
const childComments = comments[0];

export const Default = story({ comment });

export const ChildComments = story({ comment: childComments });

export const UserData = story(
	{
		comment: childComments,
		userDisplayName: TEST_USER_NAME,
		userImageUrl: TEST_USER_IMAGE,
		userPublicId: 'Jess1234',
	},
);
