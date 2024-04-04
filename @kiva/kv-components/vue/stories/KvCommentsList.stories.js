import KvCommentsList from '../KvCommentsList.vue';
import { publicLenderId, comments } from '../../tests/fixtures/mockCommentsData';

export default {
	title: 'KvCommentsList',
	component: KvCommentsList,
};
const TEST_USER_NAME = 'Jess';
const TEST_USER_IMAGE = 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg';

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvCommentsList },
		setup() { return { args: templateArgs }; },
		provide: {
			fetchLenderInfo: () => Promise.resolve({
				name: TEST_USER_NAME,
				image: { url: TEST_USER_IMAGE },
			}),
		},
		template: `
			<KvCommentsList v-bind="args" />
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({ comments });

export const UserData = story(
	{
		comments,
		userDisplayName: TEST_USER_NAME,
		userImageUrl: TEST_USER_IMAGE,
		userPublicId: publicLenderId,
	},
);
