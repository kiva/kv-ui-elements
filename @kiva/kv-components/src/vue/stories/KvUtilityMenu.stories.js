import { mdiPencil } from '@mdi/js';
import KvUtilityMenu from '../KvUtilityMenu.vue';

export default {
	title: 'KvUtilityMenu',
	component: KvUtilityMenu,
	args: {},
	argTypes: {
		analyticsCategory: {
			control: { type: 'text' },
		},
		buttonBorderClass: {
			control: { type: 'text' },
		},
		buttonRadiusClass: {
			control: { type: 'text' },
		},
		buttonSize: {
			control: { type: 'select' },
			options: ['small', 'medium'],
		},
		icon: {
			control: {
				disable: true,
			},
		},
		menuPosition: {
			control: { type: 'select' },
			options: ['left-aligned', 'right-aligned'],
		},
	},
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
