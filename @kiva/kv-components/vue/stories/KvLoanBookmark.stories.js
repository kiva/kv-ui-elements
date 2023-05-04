import KvLoanBookmark from '../KvLoanBookmark.vue';

export default {
	title: 'KvLoanBookmark',
	component: KvLoanBookmark,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanBookmark },
		template: `
			<kv-loan-bookmark :is-bookmarked="isBookmarked" />
		`,
	});
	template.args = args;
	return template;
};

export const Bookmarked = story({ isBookmarked: true });

export const NotBookmarked = story();
