import KvCommentsContainer from '../KvCommentsContainer.vue';

export default {
	title: 'KvCommentsContainer',
	component: KvCommentsContainer,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvCommentsContainer },
		setup() { return { args: templateArgs }; },
		template: `
			<KvCommentsContainer v-bind="args" />
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({});

export const Activity = story({ activityId: 'asd' });
