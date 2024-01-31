import KvCommentsListItem from '../KvCommentsListItem.vue';
import comments from '../../tests/fixtures/mockFeedActivityData';

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

export const Default = story({ comment: comments.activities[1] });

export const WithChildren = story({ comment: comments.activities[0] });
