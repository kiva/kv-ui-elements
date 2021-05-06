import KvButton from '../KvButton.vue';

export default {
	title: 'KvButton',
	component: KvButton,
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: ['primary', 'secondary', 'link', 'danger', 'ghost'],
			},
		},
		state: {
			control: {
				type: 'select',
				options: ['', 'disabled', 'loading'],
				defaultValue: null,
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

// Variants
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

export const VariantLink = Template.bind({});
VariantLink.args = {
	variant: 'link',
};

export const VariantGhost = Template.bind({});
VariantGhost.args = {
	variant: 'ghost',
};

// States
export const StateLoading = Template.bind({});
StateLoading.args = {
	state: 'loading',
};

export const StateDisabled = Template.bind({});
StateDisabled.args = {
	state: 'disabled',
};

// Kitchen Sink
export const KitchenSink = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvButton },
	template: `
		<div>
			<kv-button
				variant="primary"
				:state="state"
				:to="to"
				:href="href"
				@click="onClick"
			>
				Primary
			</kv-button>
			<kv-button
				variant="secondary"
				:state="state"
				:to="to"
				:href="href"
				@click="onClick"
			>
				Find a borrower
			</kv-button>
			<kv-button
				variant="danger"
				:state="state"
				:to="to"
				:href="href"
				@click="onClick"
			>
				Find a borrower
			</kv-button>
			<kv-button
				variant="link"
				:state="state"
				:to="to"
				:href="href"
				@click="onClick"
			>
				Find a borrower
			</kv-button>
			<kv-button
				variant="ghost"
				:state="state"
				:to="to"
				:href="href"
				@click="onClick"
			>
				Find a borrower
			</kv-button>
			<kv-button
				variant="danger"
				:state="state"
				:to="to"
				:href="href"
				@click="onClick"
			>
				Find a borrower Eu cillum consectetur mollit cillum nostrud veniam in laboris tempor Lorem id nulla fugiat.
			</kv-button>
		</div>`,
	methods: {
		onClick(e) { console.log(e); },
	},
});
