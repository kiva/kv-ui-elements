import KvLoanCallouts from '../KvLoanCallouts.vue';

export default {
	title: 'KvLoanCallouts',
	component: KvLoanCallouts,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvLoanCallouts },
		template: `
			<kv-loan-callouts
				:callouts="callouts"
				:enableClickable="enableClickable"
			/>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({ callouts: [{ label: 'callout 1' }, { label: 'callout 2' }, { label: 'callout 3' }] });

export const Clickable = story({
	callouts: [
		{ id: 1, label: 'callout 1', type: 'activity' },
		{ label: 'callout 2' },
		{ id: 33, label: 'callout 3', type: 'sector' },
		{ id: null, label: 'callout 4', type: 'tag' },
		{ id: 12, label: 'callout 5', type: 'theme' },
	],
	enableClickable: true,
});
