import {
	mdiArrowRight,
} from '@mdi/js';
import KvTextLink from '#components/KvTextLink';

export default {
	title: 'KvTextLink',
	component: KvTextLink,
	args: {
		state: '',
	},
	argTypes: {
		state: {
			control: 'select',
			options: ['', 'disabled'],
		},
	},
};

const Template = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvTextLink },
	setup() { return { args: { ...templateArgs } }; },
	template: `
		<kv-text-link
			v-bind="args"
			@click="onClick"
		>
			Find a borrower
		</kv-text-link>`,
	methods: {
		onClick(e) { console.log(e); },
	},
});

export const Default = Template.bind({});

export const StateDisabled = Template.bind({});
StateDisabled.args = {
	state: 'disabled',
};

export const WithHref = Template.bind({});
WithHref.args = {
	href: 'https://www.example.com',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
	icon: mdiArrowRight,
};
