import KvUserAvatar from '../KvUserAvatar.vue';

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
			<KvUserAvatar v-bind="args" class="tw-w-6 tw-h-6"/>
			<br/>
			<KvUserAvatar v-bind="args" class="tw-w-3 tw-h-3" is-small />
		`,
	});
	template.args = args;
	return template;
};

const cssPlaceholderStory = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvUserAvatar },
		setup() {
			const style = [];
			if (args.lenderImageUrl) {
				style.push(`--user-avatar: url(${args.lenderImageUrl}) / "Lender avatar via CSS"`);
				style.push('--user-avatar-legacy-display: none');
			} else {
				style.push('--user-avatar-display: none');
			}
			return {
				args: templateArgs,
				style,
			};
		},
		template: `
			<div class="tw-relative" :style="style">
				<KvUserAvatar
					v-bind="args"
					class="tw-w-6 tw-h-6"
					show-css-placeholder
				/>
				<br/>
				<KvUserAvatar
					v-bind="args"
					class="tw-w-3 tw-h-3"
					is-small
					show-css-placeholder
				/>
			</div>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	lenderName: 'Roger',
});

export const CssPlaceholder = cssPlaceholderStory({
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	showCssPlaceholder: true,
});

export const NoImage = story({
	lenderImageUrl: '',
	lenderName: 'Roger',
});

export const NoImageCssPlaceholder = cssPlaceholderStory({
	lenderImageUrl: '',
	showCssPlaceholder: true,
});

export const Anonymous = story({
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	lenderName: 'Anonymous',
});

export const GreenLightTheme = story({
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	lenderName: 'Anonymous',
	theme: 'ecoGreenLight',
});
export const LegacyDefaultImage = story({
	lenderImageUrl: 'https://www.kiva.org/img/s100/4d844ac2c0b77a8a522741b908ea5c32.jpg',
	lenderName: 'Default Profile',
});

const multipleAvatarStory = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvUserAvatar },
		setup() { return { args: templateArgs }; },
		template: `
			<div class="tw-flex tw-items-center">
				<KvUserAvatar
					v-for="(lender, index) in args.lendersImages"
					:key="index"
					:lender-image-url="lender.lenderImageUrl"
					:lender-name="lender.lenderName"
					class="tw-w-6 tw-h-6"
				/>
			</div>
		`,
	});
	template.args = args;
	return template;
};

export const Multiple = multipleAvatarStory({
	lendersImages: [
		{
			lenderImageUrl: 'https://www.kiva.org/img/w500h500/0a35ae21956f8a03818b597877492196.jpg',
			lenderName: 'Emma',
		},
		{
			lenderImageUrl: 'https://www.kiva.org/img/w500h500/957d6191b6f7b33f64fc49bab14bf108.jpg',
			lenderName: 'Oliver',
		},
		{
			lenderImageUrl: 'https://www.kiva.org/img/w500h500/f0012a5353a2fe29d66364dc1d4e49ff.jpg',
			lenderName: 'John',
		},
	],
});

export const Fallback = story();
