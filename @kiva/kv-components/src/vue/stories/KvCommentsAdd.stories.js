import KvCommentsAdd from '../KvCommentsAdd.vue';

export default {
	title: 'KvCommentsAdd',
	component: KvCommentsAdd,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvCommentsAdd },
		setup() { return { args: templateArgs }; },
		template: `
			<div style="max-width: 800px;">
				<KvCommentsAdd v-bind="args" />
			</div>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({});

export const UserName = story({
	userDisplayName: 'User',
});

export const UserInfo = story({
	userImageUrl: 'https://via.placeholder.com/50x50',
	userDisplayName: 'User',
});
