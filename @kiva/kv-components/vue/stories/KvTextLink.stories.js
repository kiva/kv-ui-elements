import {
	mdiArrowRight,
} from '@mdi/js';
import KvTextLink from '../KvTextLink.vue';

export default {
	title: 'KvTextLink',
	component: KvTextLink,
	args: {
		state: '',
	},
	argTypes: {
		state: {
			control: {
				type: 'select',
				options: ['', 'disabled'],
			},
		},
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvTextLink },
	template: `
		<kv-text-link
			:state="state"
			:href="href"
			:to="to"
			:icon="icon"
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
