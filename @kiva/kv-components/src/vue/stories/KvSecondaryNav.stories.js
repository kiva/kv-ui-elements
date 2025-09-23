import KvSecondaryNav from '../KvSecondaryNav.vue';

export default {
	title: 'KvSecondaryNav',
	component: KvSecondaryNav,
	args: {
		heading: 'Due Diligence',
		headingLink: {
			href: 'https://www.kiva.org',
			isExternal: true,
		},
		links: [
			{
				text: 'Overview',
				href: 'https://www.kiva.org',
				isActive: false,
				isExternal: true,
			},
			{
				text: 'Documents',
				href: '#',
				isActive: false,
				isExternal: false,
			},
			{
				text: 'Team',
				href: '#',
				isActive: false,
				isExternal: false,
			},
		],
		linkAlignment: 'right',
		theme: 'default',
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvSecondaryNav },
	setup() {
		return args;
	},
	template: `
		<div style="height: 80vh; overflow: auto;position:relative;">
			<KvSecondaryNav :headingLink="headingLink" :heading="heading" :links="links" :linkAlignment="linkAlignment" :theme="theme" />
			Testing content
		</div>
	`,
	data() {
		return {
			...args,
		};
	},
});

export const Default = Template.bind({});
Default.args = {
	theme: 'default',
};

export const Dark = Template.bind({});
Dark.args = {
	theme: 'dark',
};

export const Centered = Template.bind({});
Centered.args = {
	linkAlignment: 'center',
};

export const LeftAlignment = Template.bind({});
LeftAlignment.args = {
	linkAlignment: 'left',
};
