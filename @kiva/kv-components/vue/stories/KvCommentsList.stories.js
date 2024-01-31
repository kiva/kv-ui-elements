import KvCommentsList from '../KvCommentsList.vue';
import comments from '../../tests/fixtures/mockFeedActivityData';

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

export const Default = story({ comments });
