import KvVotingCard from '#components/KvVotingCard';

export default {
	title: 'KvVotingCard',
	component: KvVotingCard,
};

const Template = (args) => ({
	components: { KvVotingCard },
	setup() {
		return { args };
	},
	template: `
    <kv-voting-card v-bind="args">
      <template #image>
		<img
			class="tw-rounded"
			src="https://www-kiva-org.freetls.fastly.net/img/w600h450/9673d0722a7675b9b8d11f90849d9b44.jpg"
			alt="Default image"
		/>
      </template>
    </kv-voting-card>
  `,
});

export const Default = Template.bind({});
Default.args = {
	borrowerName: 'Jacqueline',
	category: 'Helping households mitigate or adapt to climate change',
	percentage: 45,
	showVoteButton: true,
	showInfoIcon: true,
};
