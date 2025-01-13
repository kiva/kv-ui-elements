import KvUserAvatar from '#components/KvUserAvatar';

export default {
	title: 'KvUserAvatar',
	component: KvUserAvatar,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvUserAvatar },
		setup() { return { args: templateArgs }; },
		template: `
			<KvUserAvatar v-bind="args" />
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({
	lenderImageUrl: 'https://www.development.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	lenderName: 'Roger',
});

export const NoImage = story({
	lenderImageUrl: '',
	lenderName: 'Roger',
});

export const Anonymous = story({
	lenderImageUrl: 'https://www.development.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	lenderName: 'Anonymous',
});

export const DefaultProfile = story({
	lenderImageUrl: 'https://www.development.kiva.org/img/s100/4d844ac2c0b77a8a522741b908ea5c32.jpg',
	lenderName: 'Default Profile',
});

export const IsSmall = story({
	lenderImageUrl: 'https://www.development.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	lenderName: 'Roger',
	isSmall: true,
});

export const Fallback = story();
