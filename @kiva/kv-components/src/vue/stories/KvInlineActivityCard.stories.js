import KvInlineActivityCard from '../KvInlineActivityCard.vue';

export default {
	title: 'KvInlineActivityCard',
	component: KvInlineActivityCard,
};

const story = (args) => {
	const template = (templateArgs, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvInlineActivityCard },
		setup() { return { args: templateArgs }; },
		template: `
			<div style="max-width: 200px;">
				<KvInlineActivityCard v-bind="args" />
			</div>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({
	activity: {
		lender: {
			image: {
				url: 'https://www.development.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
			},
			name: 'Roger',
		},
		amountLent: '125.00',
	},
});

export const NoImage = story({
	activity: {
		lender: {
			image: {
				url: '',
			},
			name: 'Roger',
		},
		amountLent: '75.00',
	},
});

export const Anonymous = story({
	activity: {
		lender: {
			image: {
				url: 'https://www.development.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
			},
			name: 'Anonymous',
		},
		amountLent: '5.00',
	},
});

export const DefaultProfile = story({
	activity: {
		lender: {
			image: {
				url: 'https://www.development.kiva.org/img/s100/4d844ac2c0b77a8a522741b908ea5c32.jpg',
			},
			name: 'Default Profile',
		},
		amountLent: '25.00',
	},
});
