import KvBorrowerImage from '../KvBorrowerImage';

export default {
	title: 'KvBorrowerImage',
	component: KvBorrowerImage,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvBorrowerImage },
		setup() { return { args: { ...templateArgs } }; },
		template: `
			<div style="width: 336px;">
				<kv-borrower-image v-bind="args"/>
			</div>
		`,
	});
	template.args = args;
	return template;
};

const props = {
	alt: 'Photo of Borrower',
	aspectRatio: 0.75,
	defaultImage: { width: 336 },
	hash: '9673d0722a7675b9b8d11f90849d9b44',
	images: [
		{
			width: 336,
			viewSize: 1024,
		},
		{
			width: 336,
			viewSize: 768,
		},
		{
			width: 416,
			viewSize: 480,
		},
		{
			width: 374,
			viewSize: 414,
		},
		{
			width: 335,
			viewSize: 375,
		},
		{
			width: 300,
		},
	],
	photoPath: 'https://www-kiva-org.freetls.fastly.net/img/',
};

export const Default = story(props);

export const Square = story({
	...props,
	aspectRatio: 1,
	defaultImage: { width: 300 },
});
