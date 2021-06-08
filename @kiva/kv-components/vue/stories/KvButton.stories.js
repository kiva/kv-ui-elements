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

const VariantTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvButton },
	template: `
		<ul>
			<li
				v-for="variant in ['primary', 'secondary', 'link', 'danger', 'ghost']"
				:key="variant"
				class="tw-mb-2"
			>
				<kv-button
					:variant="variant"
					:state="state"
					:to="to"
					:href="href"
				>
					Find a borrower
				</kv-button>
			</li>
		</ul>`,
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
export const StateLoading = VariantTemplate.bind({});
StateLoading.args = {
	state: 'loading',
};

export const StateDisabled = VariantTemplate.bind({});
StateDisabled.args = {
	state: 'disabled',
};

// Misc
export const WithHref = VariantTemplate.bind({});
WithHref.args = {
	href: 'https://www.google.com',
};

export const FullWidth = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvButton },
	template: `
	<ul>
		<li
			v-for="variant in ['primary', 'secondary', 'link', 'danger', 'ghost']"
			:key="variant"
			class="tw-mb-2"
		>
			<kv-button
				class="tw-w-full"
				:variant="variant"
				:state="state"
				:to="to"
				:href="href"
				@click="onClick"
			>
				Find a borrower
			</kv-button>
		</li>
	</ul>`,
	methods: {
		onClick(e) { console.log(e); },
	},
});
