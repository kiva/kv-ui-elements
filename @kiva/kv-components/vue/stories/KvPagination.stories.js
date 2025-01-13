import KvPagination from '#components/KvPagination';

export default {
	title: 'KvPagination',
	component: KvPagination,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvPagination },
		setup() { return { args: { ...templateArgs } }; },
		template: `<kv-pagination
				v-bind="args"
			/>`,
		methods: {
			kvTrackMock(
				category,
				action,
				label,
				property,
				value,
			) {
				console.log(category, action, label, property, value);
			},
		},
	});
	template.args = args;
	return template;
};

export const Default = story({ limit: 10, total: 0, trackEventCategory: 'blog-articles' });

export const FewerPages = story({ limit: 10, total: 30, trackEventCategory: 'blog-articles' });

export const MorePages = story({ limit: 10, total: 1000, trackEventCategory: 'blog-articles' });

export const SecondSelected = story({
	limit: 10, total: 1000, offset: 10, trackEventCategory: 'blog-articles',
});

export const ThirdSelected = story({
	limit: 10, total: 1000, offset: 20, trackEventCategory: 'blog-articles',
});

export const FourthSelected = story({
	limit: 10, total: 1000, offset: 30, trackEventCategory: 'blog-articles',
});

export const LastSelected = story({
	limit: 10, total: 1000, offset: 990, trackEventCategory: 'blog-articles',
});

export const SecondToLastSelected = story({
	limit: 10, total: 1000, offset: 980, trackEventCategory: 'blog-articles',
});

export const ThirdToLastSelected = story({
	limit: 10, total: 1000, offset: 970, trackEventCategory: 'blog-articles',
});

export const FourthToLastSelected = story({
	limit: 10, total: 1000, offset: 960, trackEventCategory: 'blog-articles',
});

export const MoreExtraPages = story({ limit: 10, total: 1000, extraPages: 6 });
