import KvLoanBookmark from '../KvLoanBookmark.vue';

export default {
	title: 'KvLoanBookmark',
	component: KvLoanBookmark,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanBookmark },
		setup() { return { args: { ...templateArgs } }; },
		template: `
			<kv-loan-bookmark v-bind="args" />
		`,
	});
	template.args = args;
	return template;
};

export const Bookmarked = story({ isBookmarked: true });

export const NotBookmarked = story();
