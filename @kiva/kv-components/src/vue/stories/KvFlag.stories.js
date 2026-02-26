import KvFlag from '../KvFlag.vue';

export default {
	title: 'Interface Elements/KvFlag',
	component: KvFlag,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvFlag },
		setup() { return { args: templateArgs }; },
		template: `
			<div style="width: 100px; height: 100px;">
				<suspense>
					<KvFlag v-bind="args" />
				</suspense>
			</div>
		`,
	});
	template.args = args;
	return template;
};

// SVG based on the country code
export const InlineSvg = story({ country: 'TO', name: 'Tonga' });
// SVG based on the country code with custom width
export const InlineSvgCustomWidth = story({ country: 'DE', name: 'Germany', widthOverride: '40px' });

// SVG Square based on the country code
export const SquareInlineSvg = story({
	country: 'ME',
	name: 'Montenegro',
	aspectRatio: '1x1',
	showName: true,
});
// SVG Square based on the country code with custom width
export const SquareInlineSvgCustomWidth = story({
	country: 'SA',
	name: 'Saudi Arabia',
	inlineSvg: true,
	widthOverride: '40px',
	aspectRatio: '1x1',
});
