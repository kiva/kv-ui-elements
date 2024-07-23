import KvFlag from '../KvFlag.vue';

export default {
	title: 'Components/KvFlag',
	component: KvFlag,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvFlag },
		setup() { return { args: templateArgs }; },
		template: `
			<div style="width: 100px; height: 100px;">
				<KvFlag v-bind="args" />
			</div>
		`,
	});
	template.args = args;
	return template;
};

// SVG based on the country code
export const InlineSvg = story({ country: 'TO' });
// SVG based on the country code with custom width
export const InlineSvgCustomWidth = story({ country: 'DE', widthOverride: '40px' });

// SVG Sqaure based on the country code
export const SquareInlineSvg = story({ country: 'ME', aspectRatio: '1x1', showName: true });
// SVG Sqaure based on the country code with custom width
export const SquareInlineSvgCustomWidth = story({
	country: 'SA',
	inlineSvg: true,
	widthOverride: '40px',
	aspectRatio: '1x1',
});
