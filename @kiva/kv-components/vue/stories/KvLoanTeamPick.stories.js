import KvLoanTeamPick from '#components/KvLoanTeamPick';

export default {
	title: 'KvLoanTeamPick',
	component: KvLoanTeamPick,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanTeamPick },
		template: `
			<kv-loan-team-pick  />
		`,
	});
	template.args = args;
	return template;
};

export const Default = story();
