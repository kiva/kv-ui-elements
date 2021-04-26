import KvButton from '../KvButton.vue';

export default {
	title: 'KvButton',
	component: KvButton,
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: ['primary', 'secondary', 'link', 'danger'],
			},
		},
		state: {
			control: {
				type: 'select',
				options: ['', 'disabled', 'loading'],
			},
		},
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvButton },
	template: `
		<kv-button
			:variant="variant"
			:state="state"
			:to="to"
			:href="href"
			@click="onClick"
		>
			Find a borrower
		</kv-button>`,
	methods: {
		onClick(e) { console.log(e); },
	},
});

export const VariantPrimary = Template.bind({});
VariantPrimary.args = {
	variant: 'primary',
};

export const VariantSecondary = Template.bind({});
VariantSecondary.args = {
	variant: 'secondary',
};

export const VariantDanger = Template.bind({});
VariantDanger.args = {
	variant: 'danger',
};

export const StateLoading = Template.bind({});
StateLoading.args = {
	state: 'loading',
};

export const StateDisabled = Template.bind({});
StateDisabled.args = {
	state: 'disabled',
};

// export const Alert = () => ({
// 	components: { KvButton },
// 	template: '<kv-button class="alert">Alert</kv-button>'
// });

// export const Secondary = () => ({
// 	components: { KvButton },
// 	template: '<kv-button class="secondary">Secondary</kv-button>'
// });

// export const SecondarySmaller = () => ({
// 	components: { KvButton },
// 	template: '<kv-button class="secondary smaller">Secondary Smaller</kv-button>'
// });

// export const SecondarySmallest = () => ({
// 	components: { KvButton },
// 	template: '<kv-button class="secondary smallest">Secondary Smallest</kv-button>'
// });

// export const TextLink = () => ({
// 	components: { KvButton },
// 	template: '<kv-button class="text-link">Text Link Button</kv-button>'
// });

// export const Disabled = () => ({
// 	components: { KvButton },
// 	template: '<kv-button disabled>Button</kv-button>'
// });

// export const Expanded = () => ({
// 	components: { KvButton },
// 	template: '<kv-button class="expanded">Button</kv-button>'
// });

// export const AsALink = () => ({
// 	components: { KvButton },
// 	template: '<kv-button href="http://www.google.com">Button</kv-button>'
// });
