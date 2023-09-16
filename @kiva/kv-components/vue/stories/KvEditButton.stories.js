import KvEditButton from '../KvEditButton.vue';

export default {
	title: 'KvEditButton',
	component: KvEditButton,
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvEditButton },
	template: `
		<kv-edit-button />
	`,
});

export const EditButton = DefaultTemplate.bind({});
