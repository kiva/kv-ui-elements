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
			>
			<h3 class="tw-text-small"> Chip Title </h3>
			</kv-chip>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story();
export const LongChipTitle = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvChip },
	template: `
			<kv-chip
			>
			<h3 class="tw-text-small"> Longer Chip Title </h3>
			</kv-chip>
		`,
});
export const EmailAddress = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvChip },
	template: `
			<kv-chip
			>
			<h4> @BankofAmerica.com </h4>
			</kv-chip>
		`,
});
