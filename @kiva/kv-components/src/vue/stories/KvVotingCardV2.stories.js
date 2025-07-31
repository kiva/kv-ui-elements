import KvVotingCardV2 from '../KvVotingCardV2.vue';

export default {
	title: 'KvVotingCardV2',
	component: KvVotingCardV2,
};

const TemplateDefault = (args) => ({
	components: { KvVotingCardV2 },
	setup() {
		return { args };
	},
	template: `
	<div>
		<kv-voting-card-v2 v-bind="args" @vote="vote"/>
	</div>
  `,
	methods: {
		vote() {
			console.log('vote');
		},
	},
});

const TemplateMultiple = () => ({
	components: { KvVotingCardV2 },
	setup() {
		const args1 = {
			title: 'Women owned small businesses',
			description: 'Just half of all women-owned businesses in the U.S. who apply for a loan are approved. Kiva provides access where others don\'t, creating more opportunities for women entrepreneurs.',
			backgroundImageUrl: '//images.ctfassets.net/j0p9a6ql0rn7/2l422gpfOYHz02yy3V1Qey/12e64dbe0690fb2f12e0d95f6321f6d1/Jacqueline-Rwanda.jpg',
			percentage: 45,
			showVoteButton: true,
			showPercentage: true,
		};
		const args2 = {
			title: 'BIPOC-owned small businesses',
			description: 'Small businesses create more opportunities for women entrepreneurs.',
			backgroundImageUrl: '//images.ctfassets.net/j0p9a6ql0rn7/3LZLziZYCl05YAhb6zlH6G/df770c45b790f065b8f3d11744ef1417/Lola__Oregon__United_States.jpeg',
			percentage: 45,
			showVoteButton: true,
			showPercentage: true,
		};
		const args3 = {
			title: 'Early-stage small businesses',
			description: 'Local shops are the heartbeat of our communities — but only 80% of these businesses survive their first year. When you support U.S. small businesses, youre helping to create employment opportunities and stimulate local economies.',
			backgroundImageUrl: '//images.ctfassets.net/j0p9a6ql0rn7/65YeFWuXaomM61E8PYasqp/0594e95be96cb8eac86b9ebc26bd684d/Natasha__California__United_States_sm.jpeg',
			percentage: 45,
			showVoteButton: true,
			showPercentage: true,
		};
		const args4 = {
			title: 'Food and retail small businesses',
			description: 'Food and retail businesses are vital contributors to their communities. Sadly they face challenges in getting the financing they need. Loans can help them grow and operate sustainably so they can keep feeding their local neighborhoods.',
			backgroundImageUrl: '//images.ctfassets.net/j0p9a6ql0rn7/2B3wamFMVgJnjuIgMmWCNB/51e4a36aeeb86156f8fe967486c13126/Anna__California__United_States.jpg',
			percentage: 45,
			showVoteButton: true,
			showPercentage: true,
		};
		return {
			args1, args2, args3, args4,
		};
	},
	template: `
	<div class="tw-flex md:tw-flex-wrap" style="max-width: 1200px;">
		<kv-voting-card-v2 v-bind="args1" @vote="vote" style="min-height: 400px;flex-basis: calc(50% - 1.5rem);margin: 0.75rem;"/>
		<kv-voting-card-v2 v-bind="args2" @vote="vote" style="min-height: 400px;flex-basis: calc(50% - 1.5rem);margin: 0.75rem;"/>
		<kv-voting-card-v2 v-bind="args3" @vote="vote" style="min-height: 400px;flex-basis: calc(50% - 1.5rem);margin: 0.75rem;"/>
		<kv-voting-card-v2 v-bind="args4" @vote="vote" style="min-height: 400px;flex-basis: calc(50% - 1.5rem);margin: 0.75rem;"/>
	</div>
  `,
	methods: {
		vote() {
			console.log('vote');
		},
	},
});

export const Default = TemplateDefault.bind({});
Default.args = {
	title: 'Women owned small businesses',
	description: 'Just half of all women-owned businesses in the U.S. who apply for a loan are approved. Kiva provides access where others don\'t, creating more opportunities for women entrepreneurs.',
	backgroundImageUrl: '//images.ctfassets.net/j0p9a6ql0rn7/3LZLziZYCl05YAhb6zlH6G/df770c45b790f065b8f3d11744ef1417/Lola__Oregon__United_States.jpeg',
	percentage: 45,
	showVoteButton: true,
	showPercentage: true,
};

export const MultipleInGrid = TemplateMultiple.bind({});
