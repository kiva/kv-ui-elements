import KvInlineActivityFeed from '../KvInlineActivityFeed.vue';

const activities = [
	{
		lender: {
			id: 723174,
			name: 'TonyB',
			image: {
				url: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg',
			},
		},
		amountLent: '25.00',
	},
	{
		lender: {
			id: 723174,
			name: 'Roger',
			image: {
				url: '',
			},
		},
		amountLent: '25.00',
	},
	{
		lender: {
			id: 723174,
			name: 'Anonymous',
			image: {
				url: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg',
			},
		},
		amountLent: '25.00',
	},
	{
		lender: {
			id: 723174,
			name: 'Default user',
			image: {
				url: 'https://www-0.development.kiva.org/img/s100/4d844ac2c0b77a8a522741b908ea5c32.jpg',
			},
		},
		amountLent: '25.00',
	},
	{
		lender: {
			id: 723174,
			name: 'Jessica',
			image: {
				url: 'https://www-0.development.kiva.org/img/s100/6b1a24092be3aaa22216874e644a4acf.jpg',
			},
		},
		amountLent: '25.00',
	},
];

export default {
	title: 'Components/KvInlineActivityFeed',
	component: KvInlineActivityFeed,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvInlineActivityFeed },
		setup() { return { args: templateArgs }; },
		template: `
			<div style="max-width: 1200px;">
				<KvInlineActivityFeed v-bind="args" />
			</div>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({ activities });
