import KvSideSheet from '../KvSideSheet.vue';
import KvButton from '../KvButton.vue';

export default {
	title: 'KvSideSheet',
	component: KvSideSheet,
};

const Template = (args, {
	argTypes,
}) => ({
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
				:animation-source-element="animationSourceElement"
				v-bind="args"
			>
				<div>
					Some content
					<img src="https://www-kiva-org.freetls.fastly.net/img/w600h450/9673d0722a7675b9b8d11f90849d9b44.jpg" />
				</div>
			</kv-side-sheet>
		</div>`,
	data() {
		return {
			isVisible: args.visible,
			animationSourceElement: null,
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
		openModal(event) {
			if (this.expandEffect) {
				this.animationSourceElement = event.currentTarget;
			}
			this.isVisible = true;
		},
	},
});

export const Default = Template.bind({});

export const ExpandEffect = Template.bind({});
ExpandEffect.args = {
	expandEffect: true,
	headline: 'Headline',
	showGoToLink: true,
	showBackButton: true,
};

const TemplateWithControls = (args, {
	argTypes,
}) => ({
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
				:animation-source-element="animationSourceElement"
				v-bind="args"
			>
				<div>
					Some content
					<img src="https://www-kiva-org.freetls.fastly.net/img/w600h450/9673d0722a7675b9b8d11f90849d9b44.jpg" />
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
			expandEffect: args.expandEffect,
			animationSourceElement: null,
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
		openModal(event) {
			if (this.expandEffect) {
				this.animationSourceElement = event.currentTarget;
			}
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
