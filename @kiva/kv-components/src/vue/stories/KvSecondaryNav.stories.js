import KvSecondaryNav from '../KvSecondaryNav.vue';
import KivaUsLogo from './assets/KivaUS_white.png';

export default {
	title: 'Page Frame/KvSecondaryNav',
	component: KvSecondaryNav,
	argTypes: {
		theme: {
			control: 'select',
			options: [
				'default',
				'greenLight',
				'greenDark',
				'marigoldLight',
				'stoneLight',
			],
		},
	},
	args: {
		heading: 'Due Diligence',
		headingImage: {},
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
			<KvSecondaryNav :headingLink="headingLink" :heading="heading" :headingImage="headingImage" :links="links" :linkAlignment="linkAlignment" :theme="theme" />
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

export const ComponentOverview = Template.bind({});
ComponentOverview.args = {
	theme: 'default',
};

const AllVariationsTemplate = () => ({
	components: { KvSecondaryNav },
	setup() {
		const sampleLinks = [
			{
				text: 'Overview', href: '#', isActive: false, isExternal: false,
			},
			{
				text: 'Documents', href: '#', isActive: false, isExternal: false,
			},
			{
				text: 'Team', href: '#', isActive: false, isExternal: false,
			},
		];
		const themes = ['default', 'greenLight', 'greenDark', 'marigoldLight', 'stoneLight'];
		return { sampleLinks, themes };
	},
	template: `
		<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
			<div v-for="themeName in themes" :key="themeName">
				<KvSecondaryNav
					:heading="themeName"
					:links="sampleLinks"
					link-alignment="right"
					:theme="themeName"
				/>
			</div>
		</div>
	`,
});

export const AllVariations = AllVariationsTemplate.bind({});

export const GreenLight = Template.bind({});
GreenLight.args = {
	theme: 'greenLight',
};

export const GreenDark = Template.bind({});
GreenDark.args = {
	theme: 'greenDark',
};

export const MarigoldLight = Template.bind({});
MarigoldLight.args = {
	theme: 'marigoldLight',
};

export const StoneLight = Template.bind({});
StoneLight.args = {
	theme: 'stoneLight',
};

export const WithHeadingImage = Template.bind({});
WithHeadingImage.args = {
	theme: 'greenDark',
	heading: 'Kiva US',
	headingImage: {
		url: KivaUsLogo,
		alt: 'Kiva US',
	},
};

export const Centered = Template.bind({});
Centered.args = {
	linkAlignment: 'center',
};

export const LeftAlignment = Template.bind({});
LeftAlignment.args = {
	linkAlignment: 'left',
};
