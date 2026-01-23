import KvUserAvatar from '../KvUserAvatar.vue';
import KvUserAvatarDocsMdx from './KvUserAvatarDocs.mdx';

export default {
	title: 'KvUserAvatar',
	component: KvUserAvatar,
	parameters: {
		docs: {
			page: KvUserAvatarDocsMdx,
			title: 'KvUserAvatar Docs',
		},
	},
	argTypes: {
		lenderName: {
			control: 'text',
			description: 'The name of the lender. Used for display letter and color randomization.',
		},
		lenderImageUrl: {
			control: 'text',
			description: 'URL to the lender\'s profile image.',
		},
		isSmall: {
			control: 'boolean',
			description: 'Whether to render a smaller avatar with adjusted styling.',
		},
		showCssPlaceholder: {
			control: 'boolean',
			description: 'Whether to use a CSS variable for the avatar URL before data is loaded.',
		},
		theme: {
			control: 'select',
			options: ['default', 'ecoGreenLight'],
			description: 'Visual theme for anonymous user display.',
		},
	},
};

// Component Overview - Simple examples of each avatar type
export const ComponentOverview = {
	render: () => ({
		components: { KvUserAvatar },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-flex tw-gap-8 tw-items-end">
					<div class="tw-text-center">
						<KvUserAvatar
							lender-name="Roger"
							lender-image-url="https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg"
							class="tw-w-6 tw-h-6"
						/>
						<p class="tw-text-small tw-text-secondary tw-mt-1">With Image</p>
					</div>
					<div class="tw-text-center">
						<KvUserAvatar
							lender-name="Sarah"
							lender-image-url=""
							class="tw-w-6 tw-h-6"
						/>
						<p class="tw-text-small tw-text-secondary tw-mt-1">Initial Letter</p>
					</div>
					<div class="tw-text-center">
						<KvUserAvatar
							lender-name="Anonymous"
							class="tw-w-6 tw-h-6"
						/>
						<p class="tw-text-small tw-text-secondary tw-mt-1">Anonymous</p>
					</div>
					<div class="tw-text-center">
						<KvUserAvatar
							lender-name="Anonymous"
							theme="ecoGreenLight"
							class="tw-w-6 tw-h-6"
						/>
						<p class="tw-text-small tw-text-secondary tw-mt-1">Eco Theme</p>
					</div>
				</div>
			</div>
		`,
	}),
};

// All Variations - Comprehensive view of all style and size variants
export const AllVariations = {
	render: () => ({
		components: { KvUserAvatar },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<!-- Size Variations -->
				<div class="tw-mb-8">
					<h3 class="tw-text-h4 tw-mb-4">Size Variations</h3>
					<div class="tw-flex tw-gap-6 tw-items-end">
						<div class="tw-text-center">
							<KvUserAvatar
								lender-name="Roger"
								lender-image-url="https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg"
								class="tw-w-8 tw-h-8"
							/>
							<p class="tw-text-small tw-text-secondary tw-mt-1">Large (8)</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar
								lender-name="Roger"
								lender-image-url="https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg"
								class="tw-w-6 tw-h-6"
							/>
							<p class="tw-text-small tw-text-secondary tw-mt-1">Medium (6)</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar
								lender-name="Roger"
								lender-image-url="https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg"
								class="tw-w-4 tw-h-4"
							/>
							<p class="tw-text-small tw-text-secondary tw-mt-1">Small (4)</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar
								lender-name="Roger"
								lender-image-url="https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg"
								is-small
								class="tw-w-3 tw-h-3"
							/>
							<p class="tw-text-small tw-text-secondary tw-mt-1">XSmall (3)</p>
						</div>
					</div>
				</div>

				<!-- Display Types -->
				<div class="tw-mb-8">
					<h3 class="tw-text-h4 tw-mb-4">Display Types</h3>
					<div class="tw-flex tw-gap-6 tw-items-end">
						<div class="tw-text-center">
							<KvUserAvatar
								lender-name="Emma"
								lender-image-url="https://www.kiva.org/img/w500h500/0a35ae21956f8a03818b597877492196.jpg"
								class="tw-w-6 tw-h-6"
							/>
							<p class="tw-text-small tw-text-secondary tw-mt-1">With Image</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar
								lender-name="Benjamin"
								lender-image-url=""
								class="tw-w-6 tw-h-6"
							/>
							<p class="tw-text-small tw-text-secondary tw-mt-1">Initial (B)</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar
								lender-name="Anonymous"
								class="tw-w-6 tw-h-6"
							/>
							<p class="tw-text-small tw-text-secondary tw-mt-1">Anonymous</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar
								lender-name=""
								lender-image-url=""
								class="tw-w-6 tw-h-6"
							/>
							<p class="tw-text-small tw-text-secondary tw-mt-1">No Data</p>
						</div>
					</div>
				</div>

				<!-- Theme Variations -->
				<div class="tw-mb-8">
					<h3 class="tw-text-h4 tw-mb-4">Theme Variations (Anonymous)</h3>
					<div class="tw-flex tw-gap-6 tw-items-end">
						<div class="tw-text-center">
							<KvUserAvatar
								lender-name="Anonymous"
								theme="default"
								class="tw-w-6 tw-h-6"
							/>
							<p class="tw-text-small tw-text-secondary tw-mt-1">Default Theme</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar
								lender-name="Anonymous"
								theme="ecoGreenLight"
								class="tw-w-6 tw-h-6"
							/>
							<p class="tw-text-small tw-text-secondary tw-mt-1">Eco Green Light</p>
						</div>
					</div>
				</div>

				<!-- Initial Letter Color Variations -->
				<div>
					<h3 class="tw-text-h4 tw-mb-4">Initial Letter Colors (Randomized by Name)</h3>
					<div class="tw-flex tw-gap-4 tw-items-end tw-flex-wrap">
						<div class="tw-text-center">
							<KvUserAvatar lender-name="Alice" class="tw-w-6 tw-h-6" />
							<p class="tw-text-small tw-text-secondary tw-mt-1">Alice</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar lender-name="Bob" class="tw-w-6 tw-h-6" />
							<p class="tw-text-small tw-text-secondary tw-mt-1">Bob</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar lender-name="Carol" class="tw-w-6 tw-h-6" />
							<p class="tw-text-small tw-text-secondary tw-mt-1">Carol</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar lender-name="David" class="tw-w-6 tw-h-6" />
							<p class="tw-text-small tw-text-secondary tw-mt-1">David</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar lender-name="Eva" class="tw-w-6 tw-h-6" />
							<p class="tw-text-small tw-text-secondary tw-mt-1">Eva</p>
						</div>
						<div class="tw-text-center">
							<KvUserAvatar lender-name="Frank" class="tw-w-6 tw-h-6" />
							<p class="tw-text-small tw-text-secondary tw-mt-1">Frank</p>
						</div>
					</div>
				</div>
			</div>
		`,
	}),
};

// Display Types - Shows each avatar state
export const DisplayTypes = {
	render: () => ({
		components: { KvUserAvatar },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-flex tw-gap-8 tw-items-center">
					<div class="tw-text-center">
						<KvUserAvatar
							lender-name="Roger"
							lender-image-url="https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg"
							class="tw-w-6 tw-h-6"
						/>
						<p class="tw-text-small tw-text-secondary tw-mt-2">User with profile image</p>
					</div>
					<div class="tw-text-center">
						<KvUserAvatar
							lender-name="Sarah"
							lender-image-url=""
							class="tw-w-6 tw-h-6"
						/>
						<p class="tw-text-small tw-text-secondary tw-mt-2">User without image (shows initial)</p>
					</div>
					<div class="tw-text-center">
						<KvUserAvatar
							lender-name="Anonymous"
							class="tw-w-6 tw-h-6"
						/>
						<p class="tw-text-small tw-text-secondary tw-mt-2">Anonymous user (Kiva K logo)</p>
					</div>
				</div>
			</div>
		`,
	}),
};

// Legacy Placeholder Detection
export const LegacyPlaceholderHandling = {
	render: () => ({
		components: { KvUserAvatar },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<p class="tw-text-secondary tw-mb-4">Legacy placeholder images are automatically detected and replaced with the initial letter display.</p>
				<div class="tw-flex tw-gap-8 tw-items-center">
					<div class="tw-text-center">
						<KvUserAvatar
							lender-name="Default Profile"
							lender-image-url="https://www.kiva.org/img/s100/4d844ac2c0b77a8a522741b908ea5c32.jpg"
							class="tw-w-6 tw-h-6"
						/>
						<p class="tw-text-small tw-text-secondary tw-mt-2">Legacy placeholder detected</p>
					</div>
					<div class="tw-text-center">
						<KvUserAvatar
							lender-name="Roger"
							lender-image-url="https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg"
							class="tw-w-6 tw-h-6"
						/>
						<p class="tw-text-small tw-text-secondary tw-mt-2">Real user image</p>
					</div>
				</div>
			</div>
		`,
	}),
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
