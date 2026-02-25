import KvCommentsHeartButton from '../KvCommentsHeartButton.vue';

export default {
	title: 'Comments/KvCommentsHeartButton',
	component: KvCommentsHeartButton,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvCommentsHeartButton },
		setup() { return { args: templateArgs }; },
		template: `
				<KvCommentsHeartButton v-bind="args" />
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({});

export const IsSmall = story({ isSmall: true });

export const IsLiked = story({ isLiked: true });
