import KvCommentsReplyButton from '../KvCommentsReplyButton.vue';

export default {
	title: 'KvCommentsReplyButton',
	component: KvCommentsReplyButton,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvCommentsReplyButton },
		setup() { return { args: templateArgs }; },
		template: `
				<KvCommentsReplyButton v-bind="args" />
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({});

export const ReplyCount = story({ numberOfReplies: 6 });
