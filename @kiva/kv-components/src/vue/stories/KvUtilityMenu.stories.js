import { mdiPencil, mdiCogOutline } from '@mdi/js';
import KvUtilityMenu from '../KvUtilityMenu.vue';
import KvUtilityMenuDocsMdx from './KvUtilityMenuDocs.mdx';

export default {
	title: 'Components/KvUtilityMenu',
	component: KvUtilityMenu,
	parameters: {
		docs: {
			page: KvUtilityMenuDocsMdx,
			title: 'KvUtilityMenu Docs',
		},
	},
	args: {},
	argTypes: {
		analyticsCategory: {
			control: { type: 'text' },
			description: 'Category string for analytics tracking events.',
		},
		buttonBorderClass: {
			control: { type: 'text' },
			description: 'Tailwind border classes for the trigger button.',
		},
		buttonRadiusClass: {
			control: { type: 'text' },
			description: 'Tailwind border-radius classes for the trigger button.',
		},
		buttonSize: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'Size of the trigger button.',
		},
		icon: {
			control: { type: 'text' },
			description: 'MDI icon path for the trigger button. Defaults to vertical dots.',
		},
		menuBorderClass: {
			control: { type: 'text' },
			description: 'Tailwind border classes for the dropdown menu.',
		},
		menuRadiusClass: {
			control: { type: 'text' },
			description: 'Tailwind border-radius classes for the dropdown menu.',
		},
		menuPosition: {
			control: { type: 'select' },
			options: ['left-aligned', 'right-aligned'],
			description: 'Horizontal alignment of the dropdown menu relative to the trigger.',
		},
	},
};

// Component Overview - Simple examples of each menu type
export const ComponentOverview = {
	render: () => ({
		components: { KvUtilityMenu },
		setup() {
			return { mdiPencil, mdiCogOutline };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8" style="height: 280px;">
				<div class="tw-flex tw-gap-12 tw-items-start">
					<div class="tw-text-center">
						<p class="tw-text-small tw-text-secondary tw-mb-2">Default (dots icon)</p>
						<KvUtilityMenu
							buttonSize="medium"
							buttonRadiusClass="tw-rounded-full"
						>
							<ul class="tw-m-0 tw-p-0">
								<li class="tw-list-none tw-border-b tw-border-gray-100">
									<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Action 1</a>
								</li>
								<li class="tw-list-none">
									<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Action 2</a>
								</li>
							</ul>
						</KvUtilityMenu>
					</div>
					<div class="tw-text-center">
						<p class="tw-text-small tw-text-secondary tw-mb-2">Custom icon (pencil)</p>
						<KvUtilityMenu
							:icon="mdiPencil"
							buttonSize="medium"
							buttonRadiusClass="tw-rounded"
							buttonBorderClass="tw-border tw-border-primary"
						>
							<ul class="tw-m-0 tw-p-0">
								<li class="tw-list-none tw-border-b tw-border-gray-100">
									<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Edit</a>
								</li>
								<li class="tw-list-none">
									<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Delete</a>
								</li>
							</ul>
						</KvUtilityMenu>
					</div>
					<div class="tw-text-center">
						<p class="tw-text-small tw-text-secondary tw-mb-2">Settings (cog icon)</p>
						<KvUtilityMenu
							:icon="mdiCogOutline"
							buttonSize="medium"
							buttonRadiusClass="tw-rounded"
							buttonBorderClass="tw-border tw-border-tertiary"
						>
							<ul class="tw-m-0 tw-p-0">
								<li class="tw-list-none tw-border-b tw-border-gray-100">
									<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Settings</a>
								</li>
								<li class="tw-list-none">
									<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Preferences</a>
								</li>
							</ul>
						</KvUtilityMenu>
					</div>
				</div>
			</div>
		`,
	}),
};

// All Variations - Comprehensive view of sizes and positions
export const AllVariations = {
	render: () => ({
		components: { KvUtilityMenu },
		setup() {
			return { mdiPencil, mdiCogOutline };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8" style="min-height: 500px;">
				<!-- Size Variations -->
				<div class="tw-mb-8">
					<h3 class="tw-text-h4 tw-mb-4">Button Sizes</h3>
					<div class="tw-flex tw-gap-8 tw-items-start">
						<div class="tw-text-center">
							<p class="tw-text-small tw-text-secondary tw-mb-2">Small</p>
							<KvUtilityMenu
								buttonSize="small"
								buttonRadiusClass="tw-rounded-full"
							>
								<ul class="tw-m-0 tw-p-0">
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Option 1</a></li>
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Option 2</a></li>
								</ul>
							</KvUtilityMenu>
						</div>
						<div class="tw-text-center">
							<p class="tw-text-small tw-text-secondary tw-mb-2">Medium</p>
							<KvUtilityMenu
								buttonSize="medium"
								buttonRadiusClass="tw-rounded-full"
							>
								<ul class="tw-m-0 tw-p-0">
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Option 1</a></li>
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Option 2</a></li>
								</ul>
							</KvUtilityMenu>
						</div>
						<div class="tw-text-center">
							<p class="tw-text-small tw-text-secondary tw-mb-2">Large</p>
							<KvUtilityMenu
								buttonSize="large"
								buttonRadiusClass="tw-rounded-full"
							>
								<ul class="tw-m-0 tw-p-0">
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Option 1</a></li>
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Option 2</a></li>
								</ul>
							</KvUtilityMenu>
						</div>
					</div>
				</div>

				<!-- Button Radius Variations -->
				<div class="tw-mb-8">
					<h3 class="tw-text-h4 tw-mb-4">Button Radius</h3>
					<div class="tw-flex tw-gap-8 tw-items-start">
						<div class="tw-text-center">
							<p class="tw-text-small tw-text-secondary tw-mb-2">Rounded Full</p>
							<KvUtilityMenu
								buttonSize="medium"
								buttonRadiusClass="tw-rounded-full"
								buttonBorderClass="tw-border tw-border-tertiary"
							>
								<ul class="tw-m-0 tw-p-0">
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Option</a></li>
								</ul>
							</KvUtilityMenu>
						</div>
						<div class="tw-text-center">
							<p class="tw-text-small tw-text-secondary tw-mb-2">Rounded</p>
							<KvUtilityMenu
								buttonSize="medium"
								buttonRadiusClass="tw-rounded"
								buttonBorderClass="tw-border tw-border-tertiary"
							>
								<ul class="tw-m-0 tw-p-0">
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Option</a></li>
								</ul>
							</KvUtilityMenu>
						</div>
						<div class="tw-text-center">
							<p class="tw-text-small tw-text-secondary tw-mb-2">Rounded SM</p>
							<KvUtilityMenu
								buttonSize="medium"
								buttonRadiusClass="tw-rounded-sm"
								buttonBorderClass="tw-border tw-border-tertiary"
							>
								<ul class="tw-m-0 tw-p-0">
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Option</a></li>
								</ul>
							</KvUtilityMenu>
						</div>
					</div>
				</div>

				<!-- Menu Position -->
				<div class="tw-mb-8">
					<h3 class="tw-text-h4 tw-mb-4">Menu Position</h3>
					<div class="tw-flex tw-gap-16 tw-items-start">
						<div class="tw-text-center">
							<p class="tw-text-small tw-text-secondary tw-mb-2">Left Aligned (default)</p>
							<KvUtilityMenu
								buttonSize="medium"
								buttonRadiusClass="tw-rounded"
								menuPosition="left-aligned"
							>
								<ul class="tw-m-0 tw-p-0">
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Menu opens to the left</a></li>
								</ul>
							</KvUtilityMenu>
						</div>
						<div class="tw-text-center">
							<p class="tw-text-small tw-text-secondary tw-mb-2">Right Aligned</p>
							<KvUtilityMenu
								buttonSize="medium"
								buttonRadiusClass="tw-rounded"
								menuPosition="right-aligned"
							>
								<ul class="tw-m-0 tw-p-0">
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Menu opens to the right</a></li>
								</ul>
							</KvUtilityMenu>
						</div>
					</div>
				</div>

				<!-- Custom Icons -->
				<div>
					<h3 class="tw-text-h4 tw-mb-4">Custom Icons</h3>
					<div class="tw-flex tw-gap-8 tw-items-start">
						<div class="tw-text-center">
							<p class="tw-text-small tw-text-secondary tw-mb-2">Dots (default)</p>
							<KvUtilityMenu buttonSize="medium" buttonRadiusClass="tw-rounded">
								<ul class="tw-m-0 tw-p-0">
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Option</a></li>
								</ul>
							</KvUtilityMenu>
						</div>
						<div class="tw-text-center">
							<p class="tw-text-small tw-text-secondary tw-mb-2">Pencil</p>
							<KvUtilityMenu :icon="mdiPencil" buttonSize="medium" buttonRadiusClass="tw-rounded">
								<ul class="tw-m-0 tw-p-0">
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Edit</a></li>
								</ul>
							</KvUtilityMenu>
						</div>
						<div class="tw-text-center">
							<p class="tw-text-small tw-text-secondary tw-mb-2">Cog</p>
							<KvUtilityMenu :icon="mdiCogOutline" buttonSize="medium" buttonRadiusClass="tw-rounded">
								<ul class="tw-m-0 tw-p-0">
									<li class="tw-list-none"><a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Settings</a></li>
								</ul>
							</KvUtilityMenu>
						</div>
					</div>
				</div>
			</div>
		`,
	}),
};

// Menu Open/Close Behavior
export const MenuBehavior = {
	render: () => ({
		components: { KvUtilityMenu },
		data() {
			return {
				lastEvent: null,
			};
		},
		methods: {
			handleMenuClick(event) {
				this.lastEvent = event;
				console.log('Menu clicked:', event);
			},
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8" style="height: 300px;">
				<p class="tw-text-secondary tw-mb-4">Click the menu button to toggle. Click outside to close. Event details are logged below.</p>
				<div class="tw-flex tw-gap-8 tw-items-start">
					<KvUtilityMenu
						buttonSize="medium"
						buttonRadiusClass="tw-rounded-full"
						buttonBorderClass="tw-border tw-border-action"
						@kv-utility-menu-clicked="handleMenuClick"
					>
						<ul class="tw-m-0 tw-p-0">
							<li class="tw-list-none tw-border-b tw-border-gray-100">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Action 1</a>
							</li>
							<li class="tw-list-none">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Action 2</a>
							</li>
						</ul>
					</KvUtilityMenu>
					<div v-if="lastEvent" class="tw-bg-white tw-p-4 tw-rounded tw-border tw-border-tertiary">
						<p class="tw-text-small"><strong>Last event:</strong></p>
						<p class="tw-text-small tw-font-mono">{{ JSON.stringify(lastEvent) }}</p>
					</div>
				</div>
			</div>
		`,
	}),
};

const Template = (args, { argTypes }) => ({
	components: { KvUtilityMenu },
	props: Object.keys(argTypes),
	setup() {
		return { args };
	},
	template: `
		<div class="tw-p-8 tw-bg-brand-100" style="height: 300px;">
			<KvUtilityMenu v-bind="args" class="tw-w-6 tw-mx-auto">
				<ul class="tw-m-0 tw-p-0">
					<li class="tw-list-none tw-border-b tw-border-gray-100">
						<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Action 1</a>
					</li>
					<li class="tw-list-none tw-border-b tw-border-gray-100">
						<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Action 2</a>
					</li>
					<li class="tw-list-none">
						<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Action 3</a>
					</li>
				</ul>
			</KvUtilityMenu>
		</div>
	`,
	data() {
		return {
		};
	},
});

export const Default = Template.bind({});
Default.args = {
	menuPosition: 'right-aligned',
	buttonRadiusClass: 'tw-rounded-full',
	buttonSize: 'small',
};

export const WithEditIcon = Template.bind({
	template: `
		<div class="tw-p-8 tw-bg-brand-100" style="height: 300px;">
			<KvUtilityMenu v-bind="args" class="tw-w-6 tw-mx-auto">
				<ol class="tw-m-0 tw-p-0">
					<li class="tw-list-none tw-border-b tw-border-gray-100">
						<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Action 1</a>
					</li>
					<li class="tw-list-none tw-border-b tw-border-gray-100">
						<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Action 2</a>
					</li>
					<li class="tw-list-none">
						<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Action 3</a>
					</li>
				</ol>
			</KvUtilityMenu>
		</div>
	`,
	data() {
		return {
		};
	},
});
WithEditIcon.args = {
	icon: mdiPencil,
	menuPosition: 'left-aligned',
	buttonRadiusClass: 'tw-rounded',
	buttonBorderClass: 'tw-border tw-border-primary',
	buttonSize: 'medium',
	analyticsCategory: 'portfolio',
};

export const MultipleInstances = (args, { argTypes }) => ({
	components: { KvUtilityMenu },
	props: Object.keys(argTypes),
	setup() {
		return { args, mdiPencil, mdiCogOutline };
	},
	template: `
		<div class="tw-p-8 tw-bg-brand-100" style="height: 400px;">
			<div class="tw-flex tw-justify-between tw-items-start tw-gap-8">
				<!-- First Menu Instance -->
				<div class="tw-flex tw-flex-col tw-items-center tw-gap-2">
					<h3 class="tw-text-sm tw-font-medium tw-mb-2">Options Menu (small)</h3>
					<KvUtilityMenu
						buttonRadiusClass="tw-rounded-full"
						buttonSize="small"
						buttonBorderClass="tw-border tw-border-action"
						analyticsCategory="first-menu"
					>
						<ul class="tw-m-0 tw-p-0">
							<li class="tw-list-none tw-border-b tw-border-gray-100">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">View Details</a>
							</li>
							<li class="tw-list-none tw-border-b tw-border-gray-100">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Share</a>
							</li>
							<li class="tw-list-none">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Bookmark</a>
							</li>
						</ul>
					</KvUtilityMenu>
				</div>

				<!-- Second Menu Instance -->
				<div class="tw-flex tw-flex-col tw-items-center tw-gap-2">
					<h3 class="tw-text-sm tw-font-medium tw-mb-2">Edit Menu (medium)</h3>
					<KvUtilityMenu
						:icon="mdiPencil"
						menuPosition="right-aligned"
						buttonRadiusClass="tw-rounded"
						buttonSize="medium"
						buttonBorderClass="tw-border-2 tw-border-primary"
						analyticsCategory="second-menu"
					>
						<ul class="tw-m-0 tw-p-0">
							<li class="tw-list-none tw-border-b tw-border-gray-100">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Edit Item</a>
							</li>
							<li class="tw-list-none tw-border-b tw-border-gray-100">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Duplicate</a>
							</li>
							<li class="tw-list-none tw-border-b tw-border-gray-100">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Move</a>
							</li>
							<li class="tw-list-none">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light tw-text-danger">Delete</a>
							</li>
						</ul>
					</KvUtilityMenu>
				</div>

				<!-- Third Menu Instance -->
				<div class="tw-flex tw-flex-col tw-items-center tw-gap-2">
					<h3 class="tw-text-sm tw-font-medium tw-mb-2">Cog button w/ custom menu styles (large)</h3>
					<KvUtilityMenu
						:icon="mdiCogOutline"
						menuPosition="right-aligned"
						buttonRadiusClass="tw-rounded-sm"
						buttonSize="large"
						buttonBorderClass="tw-border tw-border-tertiary"
						menuRadiusClass="tw-rounded-sm"
						menuBorderClass="tw-border tw-border-tertiary"
						analyticsCategory="third-menu"
					>
						<ul class="tw-m-0 tw-p-0">
							<li class="tw-list-none tw-border-b tw-border-gray-100">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Edit Item</a>
							</li>
							<li class="tw-list-none tw-border-b tw-border-gray-100">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Duplicate</a>
							</li>
							<li class="tw-list-none tw-border-b tw-border-gray-100">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light">Move</a>
							</li>
							<li class="tw-list-none">
								<a href="#" @click.prevent class="tw-block tw-px-2 tw-py-2 hover:tw-bg-secondary-light tw-text-danger">Delete</a>
							</li>
						</ul>
					</KvUtilityMenu>
				</div>
			</div>
		</div>
	`,
});
