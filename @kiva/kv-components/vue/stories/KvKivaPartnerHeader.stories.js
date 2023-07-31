import KvKivaPartnerHeader from '../KvKivaPartnerHeader.vue';

export default {
	title: 'KvKivaPartnerHeader',
	component: KvKivaPartnerHeader,
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvKivaPartnerHeader },
		template: `
			<kv-kiva-partner-header />
		`,
	});
	template.args = args;
	return template;
};

export const Default = story();
