import {
	mdiChevronRight,
	mdiLink,
	mdiExportVariant,
	mdiPencil,
} from '@mdi/js';
import KvButton from '../KvButton.vue';
import KvMaterialIcon from '../KvMaterialIcon.vue';
import KvButtonDocsMdx from './KvButtonDocs.mdx';

export default {
	title: 'Forms/KvButton',
	component: KvButton,
	parameters: {
		docs: {
			page: KvButtonDocsMdx,
			title: 'Kv Button Docs',
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'link', 'danger', 'ghost', 'caution'],
		},
		state: {
			control: 'select',
			options: ['', 'active', 'disabled', 'loading'],
		},
		size: {
			control: 'select',
			options: ['default', 'small'],
		},
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvButton },
	setup() { return { args }; },
	template: `
		<kv-button
			:variant="args.variant"
			:state="args.state"
			:to="args.to"
			:href="args.href"
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
	setup() { return { args }; },
	template: `
		<ul>
			<li
				v-for="variant in ['primary', 'secondary', 'link', 'danger', 'ghost', 'caution']"
				:key="variant"
				class="tw-mb-2"
			>
				<kv-button
					:variant="variant"
					:state="args.state"
					:to="args.to"
					:href="args.href"
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

export const VariantCaution = Template.bind({});
VariantCaution.args = {
	variant: 'caution',
};

// States
export const StateLoading = VariantTemplate.bind({});
StateLoading.args = {
	state: 'loading',
};

export const StateActive = VariantTemplate.bind({});
StateActive.args = {
	state: 'active',
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
	setup() { return { args }; },
	template: `
	<ul>
		<li
			v-for="variant in ['primary', 'secondary', 'link', 'danger', 'ghost', 'caution']"
			:key="variant"
			class="tw-mb-2"
		>
			<kv-button
				class="tw-w-full"
				:variant="variant"
				:state="args.state"
				:to="args.to"
				:href="args.href"
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

// ---------------------------------------------------------------------------
// CSF3 stories below support the MDX documentation (KvButtonDocs.mdx).
// The CSF2 stories above are preserved for backwards compatibility.
// ---------------------------------------------------------------------------

// Component Overview - Simple examples showing the primary button at each size
export const ComponentOverview = {
	render: () => ({
		components: { KvButton },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-flex tw-gap-8 tw-items-center tw-justify-center">
					<div class="tw-text-center">
						<kv-button variant="primary" size="default">Find a borrower</kv-button>
						<p class="tw-text-small tw-mt-2">Default (48px)</p>
					</div>
					<div class="tw-text-center">
						<kv-button variant="primary" size="small">Find a borrower</kv-button>
						<p class="tw-text-small tw-mt-2">Small (32px)</p>
					</div>
					<div class="tw-text-center">
						<kv-button variant="secondary" size="default">Find a borrower</kv-button>
						<p class="tw-text-small tw-mt-2">Secondary</p>
					</div>
				</div>
			</div>
		`,
	}),
};

// All Variations - Every variant rendered at both the default and small size
export const AllVariations = {
	render: () => ({
		components: { KvButton },
		setup() {
			return {
				variants: ['primary', 'secondary', 'link', 'danger', 'ghost', 'caution'],
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
					<div>
						<h3 class="tw-text-upper tw-mb-4 tw-font-medium">Default (48px)</h3>
						<ul class="tw-space-y-2">
							<li v-for="variant in variants" :key="'default-' + variant">
								<kv-button :variant="variant" size="default">{{ variant }}</kv-button>
							</li>
						</ul>
					</div>
					<div>
						<h3 class="tw-text-upper tw-mb-4 tw-font-medium">Small (32px)</h3>
						<ul class="tw-space-y-2">
							<li v-for="variant in variants" :key="'small-' + variant">
								<kv-button :variant="variant" size="small">{{ variant }}</kv-button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		`,
	}),
};

// Button Sizes - Demonstrates the size prop (default vs small)
export const ButtonSizes = {
	render: () => ({
		components: { KvButton },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<p class="tw-text-primary tw-text-small tw-mb-4">
					The <code>size</code> prop controls the button's height, horizontal padding, corner radius, and text style.
					<strong>default</strong> is 48px tall with 24px of horizontal padding, a 16px corner radius, and the button-link text style;
					<strong>small</strong> is 32px tall with 16px of horizontal padding, a smaller 8px corner radius, and the label text style.
				</p>
				<div class="tw-flex tw-gap-8 tw-items-center">
					<div class="tw-text-center">
						<kv-button variant="primary" size="default">Find a borrower</kv-button>
						<p class="tw-text-small tw-mt-2">size="default"</p>
					</div>
					<div class="tw-text-center">
						<kv-button variant="primary" size="small">Find a borrower</kv-button>
						<p class="tw-text-small tw-mt-2">size="small"</p>
					</div>
				</div>
			</div>
		`,
	}),
};

// With Icons - shows KvMaterialIcon alongside the label across both sizes,
// using the inner flex wrapper to control alignment and spacing.
export const WithIcons = {
	render: () => ({
		components: { KvButton, KvMaterialIcon },
		setup() {
			return {
				sizes: ['default', 'small'],
				icons: [
					{ name: 'Chevron Right', icon: mdiChevronRight },
					{ name: 'Link', icon: mdiLink },
					{ name: 'Export', icon: mdiExportVariant },
					{ name: 'Pencil', icon: mdiPencil },
				],
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<p class="tw-text-primary tw-text-small tw-mb-4">
					The label and icon are wrapped in a flex container
					(<code>tw-inline-flex tw-items-center tw-gap-1</code>) to control alignment and spacing.
				</p>
				<div v-for="size in sizes" :key="size" class="tw-mb-4">
					<p class="tw-text-small tw-mb-2 tw-font-medium">size="{{ size }}"</p>
					<div class="tw-flex tw-flex-wrap tw-gap-3 tw-items-center">
						<kv-button
							v-for="item in icons"
							:key="size + '-' + item.name"
							variant="primary"
							:size="size"
						>
							<span class="tw-inline-flex tw-items-center tw-justify-center tw-gap-1">
								{{ item.name }}
								<kv-material-icon
									:icon="item.icon"
									:class="size === 'small' ? 'tw-w-2 tw-h-2' : 'tw-w-2.5 tw-h-2.5'"
								/>
							</span>
						</kv-button>
					</div>
				</div>
			</div>
		`,
	}),
};

// Default story - interactive playground with all props
export const Default = {
	args: {
		variant: 'primary',
		state: '',
		size: 'default',
	},
	render: (args) => ({
		components: { KvButton },
		setup() { return { args }; },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6 tw-inline-block">
				<kv-button
					:variant="args.variant"
					:state="args.state"
					:size="args.size"
					@click="onClick"
				>
					Find a borrower
				</kv-button>
			</div>
		`,
		methods: {
			onClick(e) { console.log('Button clicked', e); },
		},
	}),
};
