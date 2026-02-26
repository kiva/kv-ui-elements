import {
	mdiArrowRight,
	mdiChevronRight,
	mdiOpenInNew,
} from '@mdi/js';
import KvTextLink from '../KvTextLink.vue';
import KvTextLinkDocsMdx from './KvTextLinkDocs.mdx';

export default {
	title: 'Forms/KvTextLink',
	component: KvTextLink,
	parameters: {
		docs: {
			page: KvTextLinkDocsMdx,
			title: 'Kv Text Link Docs',
		},
	},
	argTypes: {
		to: {
			control: 'text',
			description: 'Vue Router destination. Use for internal navigation.',
		},
		href: {
			control: 'text',
			description: 'External URL. Use for external links or old-stack pages.',
		},
		icon: {
			control: 'select',
			options: {
				None: '',
				'Arrow Right': mdiArrowRight,
				'Chevron Right': mdiChevronRight,
				'Open In New': mdiOpenInNew,
			},
			description: 'SVG path data from @mdi/js for trailing icon.',
		},
		state: {
			control: 'select',
			options: ['', 'disabled'],
			description: 'State of the link. Use "disabled" to prevent interaction.',
		},
		default: {
			control: 'text',
			description: 'Slot content for the link text.',
			table: {
				type: { summary: 'slot' },
			},
		},
	},
};

// Component Overview - Simple examples of each link type
export const ComponentOverview = {
	render: () => ({
		components: { KvTextLink },
		setup() {
			return {
				mdiArrowRight,
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-flex tw-flex-wrap tw-gap-8 tw-items-center tw-justify-center">
					<div class="tw-text-center">
						<kv-text-link @click="onClick">
							Text Link
						</kv-text-link>
						<p class="tw-text-small tw-text-secondary tw-mt-2">Button</p>
					</div>
					<div class="tw-text-center">
						<kv-text-link href="https://www.kiva.org">
							External Link
						</kv-text-link>
						<p class="tw-text-small tw-text-secondary tw-mt-2">With href</p>
					</div>
					<div class="tw-text-center">
						<kv-text-link :icon="mdiArrowRight" @click="onClick">
							Learn more
						</kv-text-link>
						<p class="tw-text-small tw-text-secondary tw-mt-2">With Icon</p>
					</div>
					<div class="tw-text-center">
						<kv-text-link state="disabled">
							Disabled
						</kv-text-link>
						<p class="tw-text-small tw-text-secondary tw-mt-2">Disabled</p>
					</div>
				</div>
			</div>
		`,
		methods: {
			onClick(e) {
				console.log('KvTextLink clicked:', e);
			},
		},
	}),
};

// All Variations - Comprehensive view of all link variants
export const AllVariations = {
	render: () => ({
		components: { KvTextLink },
		setup() {
			return {
				mdiArrowRight,
				mdiChevronRight,
				mdiOpenInNew,
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
					<!-- Link Types -->
					<div>
						<h3 class="tw-text-h4 tw-mb-4 tw-font-medium">Link Types</h3>
						<div class="tw-space-y-4">
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link @click="onClick">
									Button link
								</kv-text-link>
								<span class="tw-text-small tw-text-secondary">(renders as button)</span>
							</div>
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link href="https://www.kiva.org">
									External link
								</kv-text-link>
								<span class="tw-text-small tw-text-secondary">(renders as anchor)</span>
							</div>
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link to="/lend">
									Router link
								</kv-text-link>
								<span class="tw-text-small tw-text-secondary">(renders as router-link)</span>
							</div>
						</div>
					</div>

					<!-- With Icons -->
					<div>
						<h3 class="tw-text-h4 tw-mb-4 tw-font-medium">With Icons</h3>
						<div class="tw-space-y-4">
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link :icon="mdiArrowRight" @click="onClick">
									Continue
								</kv-text-link>
								<span class="tw-text-small tw-text-secondary">Arrow Right</span>
							</div>
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link :icon="mdiChevronRight" @click="onClick">
									See all
								</kv-text-link>
								<span class="tw-text-small tw-text-secondary">Chevron Right</span>
							</div>
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link :icon="mdiOpenInNew" href="https://www.kiva.org">
									Open Kiva
								</kv-text-link>
								<span class="tw-text-small tw-text-secondary">Open In New</span>
							</div>
						</div>
					</div>

					<!-- States -->
					<div>
						<h3 class="tw-text-h4 tw-mb-4 tw-font-medium">States</h3>
						<div class="tw-space-y-4">
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link @click="onClick">
									Default state
								</kv-text-link>
								<span class="tw-text-small tw-text-secondary">Enabled</span>
							</div>
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link state="disabled">
									Disabled state
								</kv-text-link>
								<span class="tw-text-small tw-text-secondary">Disabled</span>
							</div>
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link :icon="mdiArrowRight" state="disabled">
									Disabled with icon
								</kv-text-link>
								<span class="tw-text-small tw-text-secondary">Disabled + Icon</span>
							</div>
						</div>
					</div>

					<!-- Usage Examples -->
					<div>
						<h3 class="tw-text-h4 tw-mb-4 tw-font-medium">Common Use Cases</h3>
						<div class="tw-space-y-4">
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link :icon="mdiArrowRight" @click="onClick">
									Find a borrower
								</kv-text-link>
							</div>
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link @click="onClick">
									View all loans
								</kv-text-link>
							</div>
							<div class="tw-flex tw-items-center tw-gap-4">
								<kv-text-link href="https://www.kiva.org/about">
									Learn about Kiva
								</kv-text-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		`,
		methods: {
			onClick(e) {
				console.log('KvTextLink clicked:', e);
			},
		},
	}),
};

// Icon Animation - Demonstrates the hover/focus animation on the trailing icon
export const IconAnimation = {
	render: () => ({
		components: { KvTextLink },
		setup() {
			return {
				mdiArrowRight,
				mdiChevronRight,
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<p class="tw-text-primary tw-text-small tw-mb-4">
					Hover or focus on the links below to see the icon animation (translates right).
				</p>
				<div class="tw-space-y-4">
					<div>
						<kv-text-link :icon="mdiArrowRight" @click="onClick">
							Hover me to see the animation
						</kv-text-link>
					</div>
					<div>
						<kv-text-link :icon="mdiChevronRight" @click="onClick">
							Focus with keyboard (Tab) to trigger
						</kv-text-link>
					</div>
				</div>
			</div>
		`,
		methods: {
			onClick(e) {
				console.log('KvTextLink clicked:', e);
			},
		},
	}),
};

// Link Rendering - Shows how the component renders based on props
export const LinkRendering = {
	render: () => ({
		components: { KvTextLink },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<p class="tw-text-primary tw-text-small tw-mb-4">
					The component renders as different HTML elements based on the props provided.
					Inspect the elements in your browser's dev tools to verify.
				</p>
				<div class="tw-space-y-6">
					<div class="tw-p-4 tw-bg-white tw-rounded tw-border tw-border-tertiary">
						<h4 class="tw-text-h4 tw-font-medium tw-mb-2">Button (no to or href)</h4>
						<kv-text-link @click="onClick">
							Click me
						</kv-text-link>
						<p class="tw-text-small tw-text-secondary tw-mt-2">
							Renders as: &lt;button&gt;
						</p>
					</div>
					<div class="tw-p-4 tw-bg-white tw-rounded tw-border tw-border-tertiary">
						<h4 class="tw-text-h4 tw-font-medium tw-mb-2">Anchor (with href)</h4>
						<kv-text-link href="https://www.kiva.org">
							Visit Kiva
						</kv-text-link>
						<p class="tw-text-small tw-text-secondary tw-mt-2">
							Renders as: &lt;a href="..."&gt;
						</p>
					</div>
					<div class="tw-p-4 tw-bg-white tw-rounded tw-border tw-border-tertiary">
						<h4 class="tw-text-h4 tw-font-medium tw-mb-2">Router Link (with to)</h4>
						<kv-text-link to="/lend">
							Browse loans
						</kv-text-link>
						<p class="tw-text-small tw-text-secondary tw-mt-2">
							Renders as: &lt;router-link to="..."&gt;
						</p>
					</div>
				</div>
			</div>
		`,
		methods: {
			onClick(e) {
				console.log('KvTextLink clicked:', e);
			},
		},
	}),
};

// Default story - interactive playground
export const Default = {
	args: {
		to: '',
		href: '',
		icon: '',
		state: '',
		default: 'Find a borrower',
	},
	render: (args) => ({
		components: { KvTextLink },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6 tw-inline-block">
				<kv-text-link
					:to="args.to || null"
					:href="args.href || null"
					:icon="args.icon"
					:state="args.state"
					@click="onClick"
				>
					{{ args.default }}
				</kv-text-link>
			</div>
		`,
		methods: {
			onClick(e) {
				console.log('KvTextLink click event:', e);
			},
		},
	}),
};

// Disabled State - explicit story for disabled state
export const StateDisabled = {
	args: {
		state: 'disabled',
	},
	render: (args) => ({
		components: { KvTextLink },
		setup() {
			return { args, mdiArrowRight };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<div class="tw-space-y-4">
					<div>
						<kv-text-link :state="args.state">
							Disabled link
						</kv-text-link>
					</div>
					<div>
						<kv-text-link :state="args.state" :icon="mdiArrowRight">
							Disabled with icon
						</kv-text-link>
					</div>
				</div>
			</div>
		`,
	}),
};

// With Href - explicit story for external links
export const WithHref = {
	args: {
		href: 'https://www.kiva.org',
	},
	render: (args) => ({
		components: { KvTextLink },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<kv-text-link :href="args.href">
					Visit Kiva.org
				</kv-text-link>
			</div>
		`,
	}),
};

// With Icon - explicit story for icon usage
export const WithIcon = {
	args: {
		icon: mdiArrowRight,
	},
	render: (args) => ({
		components: { KvTextLink },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<kv-text-link :icon="args.icon" @click="onClick">
					Continue to checkout
				</kv-text-link>
			</div>
		`,
		methods: {
			onClick(e) {
				console.log('KvTextLink clicked:', e);
			},
		},
	}),
};
