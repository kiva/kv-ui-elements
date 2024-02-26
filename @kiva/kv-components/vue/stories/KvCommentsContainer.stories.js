import KvCommentsContainer from '../KvCommentsContainer.vue';
import comments from '../../tests/fixtures/mockFeedActivityData';

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
			<div style="max-width: 800px;">
				<KvCommentsContainer v-bind="args" />
			</div>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({ comments });
