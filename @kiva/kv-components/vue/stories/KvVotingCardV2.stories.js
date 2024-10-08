import KvVotingCardV2 from '../KvVotingCardV2.vue';

export default {
	title: 'KvVotingCardV2',
	component: KvVotingCardV2,
};

const Template = (args) => ({
	components: { KvVotingCardV2 },
	setup() {
		return { args };
	},
	template: `
	<div style="max-width: 524px;">
		<kv-voting-card-v2 v-bind="args"/>
	</div>
  `,
});

export const Default = Template.bind({});
Default.args = {
	title: 'Women owned small businesses',
	description: 'Just half of all women-owned businesses in the U.S. who apply for a loan are approved. Kiva provides access where others don\'t, creating more opportunities for women entrepreneurs.',
	backgroundImageUrl: '//images.ctfassets.net/j0p9a6ql0rn7/3LZLziZYCl05YAhb6zlH6G/df770c45b790f065b8f3d11744ef1417/Lola__Oregon__United_States.jpeg',
	percentage: 45,
	showVoteButton: true,
	showPercentage: true,
};
