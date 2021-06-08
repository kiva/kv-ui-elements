import KvContentfulImg from '../KvContentfulImg.vue';

export default {
	title: 'KvContentfulImg',
	component: KvContentfulImg,
	args: {
		contentfulSrc: 'https://images.ctfassets.net/j0p9a6ql0rn7/2TWV32iioxapwjn26ZpigZ/84ac39a1396d6be9eea472cf8791faa7/Cynthia.png',
		fallbackFormat: 'jpg',
		width: 200,
		height: null,
		alt: null,
		loading: 'lazy',
		sourceSizes: null,
	},
	argTypes: {
		fallbackFormat: {
			control: {
				type: 'select',
				options: ['jpg', 'png', 'webp'],
			},
		},
		loading: {
			control: {
				type: 'select',
				options: ['lazy', 'eager'],
			},
		},
		fit: {
			control: {
				type: 'select',
				options: ['pad', 'fill', 'scale', 'crop', 'thumb'],
			},
		},
		focus: {
			control: {
				type: 'select',
				options: ['center', 'top', 'right', 'left', 'bottom', 'top_right', 'top_left', 'bottom_right', 'bottom_left', 'face', 'faces'],
			},
		},
	},
};

export const Default = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvContentfulImg,
	},
	template: `
		<kv-contentful-img
			:contentful-src="contentfulSrc"
			:fallback-format="fallbackFormat"
			:width="width"
			:height="height"
			:alt="alt"
			:loading="loading"
			:fit="fit"
			:focus="focus"
		/>
	`,
});

export const ResponsiveImageSet = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvContentfulImg,
	},
	template: `
		<kv-contentful-img
			:contentful-src="contentfulSrc"
			:fallback-format="fallbackFormat"
			:alt="alt"
			:loading="loading"
			:height="540"
			:source-sizes="sourceSizes"
			:fit="fit"
			:focus="focus"
		/>
	`,
});
ResponsiveImageSet.args = {
	fit: 'fill',
	focus: 'face',
	sourceSizes: [
		{
			width: 1920,
			height: 650,
			media: 'min-width: 1441px',
		},
		{
			width: 1440,
			height: 620,
			media: 'min-width: 1025px',
		},
		{
			width: 1024,
			height: 441,
			media: 'min-width: 681px',
		},
		{
			width: 680,
			height: 372,
			media: 'min-width: 481px',
		},
		{
			width: 480,
			height: 540,
			media: 'min-width: 0px',
		},
	],
	contentfulSrc: 'https://images.ctfassets.net/j0p9a6ql0rn7/7mY5ZujL9UfbluRkVkHgkX/5ec83a74e7c1dc387f3fa35af34f5243/mg-hppromo-1-wxga-retina.jpg',
};

export const AdaptiveImageSet = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvContentfulImg,
	},
	template: `
		<kv-contentful-img
			:contentful-src="contentfulSrc"
			:fallback-format="fallbackFormat"
			:alt="alt"
			:loading="loading"
			:height="540"
			:source-sizes="sourceSizes"
		/>
	`,
});
AdaptiveImageSet.args = {
	sourceSizes: [
		{
			width: 1186,
			height: 948,
			media: 'min-width: 1025px',
			url: '//images.ctfassets.net/j0p9a6ql0rn7/V0FQ3TmvSVVX5zXCX9l9A/363cf644709b838f2e3478facd0a6959/wrd2021-hero-lg-2x.jpg',
		},
		{
			width: 670,
			height: 915,
			media: 'min-width: 735px',
			url: '//images.ctfassets.net/j0p9a6ql0rn7/2co41o2KujCSIIAIFc63DH/4fe9fe22b521a590911704e2c42a6cfc/wrd2021-hero-med-2x.jpg',
		},
		{
			width: 670,
			height: 914,
			media: 'min-width: 0px',
			url: '//images.ctfassets.net/j0p9a6ql0rn7/28iKvNatAphyTreO5XQM8V/70246776d7b24ddcc638af696ca10bad/wrd2021-hero-sm-2x.jpg',
		},
	],
	contentfulSrc: '//images.ctfassets.net/j0p9a6ql0rn7/V0FQ3TmvSVVX5zXCX9l9A/363cf644709b838f2e3478facd0a6959/wrd2021-hero-lg-2x.jpg',
};
