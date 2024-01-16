import KvVotingCard from '../KvVotingCard.vue';

export default {
	title: 'KvVotingCard',
	component: KvVotingCard,
};

const Template = (args) => ({
	components: { KvVotingCard },
	setup() {
		return { args };
	},
	template: '<kv-voting-card v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
	borrowerName: 'Jacqueline',
	country: 'Rwanda',
	category: 'Women-owned retail businesses',
	aspectRatio: 0.75,
	hash: '9673d0722a7675b9b8d11f90849d9b44',
	images: [
		{ width: 336, viewSize: 1024 },
		{ width: 336, viewSize: 768 },
		{ width: 416, viewSize: 480 },
		{ width: 374, viewSize: 414 },
		{ width: 335, viewSize: 375 },
		{ width: 300 },
	],
	photoPath: 'https://www-kiva-org.freetls.fastly.net/img/',
	defaultImage: { width: 300 },
	percentage: 45,
};
