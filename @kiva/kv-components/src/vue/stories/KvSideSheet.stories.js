import KvSideSheet from '../KvSideSheet.vue';
import KvButton from '../KvButton.vue';

export default {
	title: 'KvSideSheet',
	component: KvSideSheet,
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvSideSheet,
		KvButton,
	},
	setup() {
		return { args };
	},
	template: `
		<div>
			<kv-button @click="openModal($event)">Show Side Sheet</kv-button>
			<kv-side-sheet
				:visible="isVisible"
				:kv-track-function="kvTrackMock"
				track-event-category="new-loan-card"
				@side-sheet-closed="isVisible = false"
				v-bind="args"
			>
				<div>
					Some content
					<img src="https://www.kiva.org/img/w600h450/9673d0722a7675b9b8d11f90849d9b44.webp" />
				</div>
			</kv-side-sheet>
		</div>`,
	data() {
		return {
			isVisible: args.visible,
		};
	},
	methods: {
		kvTrackMock(
			category,
			action,
			label,
			property,
			value,
		) {
			console.log(category, action, label, property, value);
		},
		openModal() {
			this.isVisible = true;
		},
	},
});

export const Default = Template.bind({});

const TemplateWithControls = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvSideSheet,
		KvButton,
	},
	setup() {
		return { args };
	},
	template: `
		<div>
			<kv-button @click="openModal($event)">Show Side Sheet</kv-button>
			<kv-side-sheet
				:visible="isVisible"
				:kv-track-function="kvTrackMock"
				track-event-category="new-loan-card"
				@side-sheet-closed="isVisible = false"
				v-bind="args"
			>
				<div>
					Some content
					<img src="https://www.kiva.org/img/w600h450/9673d0722a7675b9b8d11f90849d9b44.webp" />
				</div>
				<template #controls>
					<div
						class="tw-flex tw-justify-end tw-gap-x-2.5
							tw-pb-2.5 tw-pt-1.5 tw-px-2.5 md:tw-pb-3 md:tw-pt-2 md:tw-px-3"
					>
						<!-- @slot controls -->
						<KvButton variant="secondary">
							Secondary button
						</KvButton>
						<KvButton variant="primary">
							Primary button
						</KvButton>
					</div>
				</template>
			</kv-side-sheet>
		</div>`,
	data() {
		return {
			isVisible: args.visible,
		};
	},
	methods: {
		kvTrackMock(
			category,
			action,
			label,
			property,
			value,
		) {
			console.log(category, action, label, property, value);
		},
		openModal() {
			this.isVisible = true;
		},
	},
});

export const WithControls = TemplateWithControls.bind({});
WithControls.args = {
	headline: 'Headline',
	showGoToLink: true,
	showBackButton: true,
};

export const FixedWidth = Template.bind({});
FixedWidth.args = {
	headline: 'Fixed Width',
	showGoToLink: true,
	showBackButton: true,
	widthDimensions: '33.33%',
};

export const ResponsiveWidths = Template.bind({});
ResponsiveWidths.args = {
	headline: 'Responsive Widths',
	showGoToLink: true,
	showBackButton: true,
	widthDimensions: { lg: '480px', md: '460px', sm: '100%' },
};

export const ResponsiveWidthsWithControls = TemplateWithControls.bind({});
ResponsiveWidthsWithControls.args = {
	headline: 'Responsive Widths with Controls',
	showGoToLink: true,
	showBackButton: true,
	widthDimensions: { lg: '480px', md: '460px', sm: '100%' },
};

export const CustomResponsiveWidths = Template.bind({});
CustomResponsiveWidths.args = {
	headline: 'Custom Responsive Widths',
	showGoToLink: true,
	showBackButton: true,
	widthDimensions: {
		default: '100%', sm: '80%', md: '500px', lg: '600px',
	},
};

export const NoAnimation = Template.bind({});
NoAnimation.args = {
	headline: 'No Animation',
	showGoToLink: true,
	showBackButton: true,
	widthDimensions: { lg: '480px', md: '460px', sm: '100%' },
	visible: true,
	isAnimated: false,
};
