import KvSecondaryNav from '../KvSecondaryNav.vue';

export default {
	title: 'KvSecondaryNav',
	component: KvSecondaryNav,
	args: {
		heading: 'Due Diligence',
		links: [
			{
				text: 'Overview',
				href: '#',
				isActive: true,
			},
			{
				text: 'Documents',
				href: '#',
				isActive: false,
			},
			{
				text: 'Team',
				href: '#',
				isActive: false,
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
		<div style="height: 300vh; overflow: auto;position:relative;">
			<KvSecondaryNav :heading="heading" :links="links" :linkAlignment="linkAlignment" :theme="theme" />
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
