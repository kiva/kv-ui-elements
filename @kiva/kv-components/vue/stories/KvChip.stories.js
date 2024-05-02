import KvChip from '../KvChip.vue';

export default {
	title: 'KvChip',
	component: KvChip,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvChip },
		template: `
			<kv-chip
			:title="title"
			:email="email"
			/>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({ title: 'Chip Title' });
export const LongChipTitle = story({ title: 'Longer Chip Title' });
export const EmailAddress = story({ title: '@bankofamerica.com', email: true });
