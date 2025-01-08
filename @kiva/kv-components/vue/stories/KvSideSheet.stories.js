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
				:show-go-to-link="true"
				@side-sheet-closed="isVisible = false"
				:animation-source-element="animationSourceElement"
				:sticky-controls="stickyControls"
			>
				<div>
					Some content
					<img src="https://www-kiva-org.freetls.fastly.net/img/w600h450/9673d0722a7675b9b8d11f90849d9b44.jpg" />
				</div>

				<template #controls>
					<p>Controls</p>
				<template>
			</kv-side-sheet>
		</div>`,
	data() {
		return {
			isVisible: args.visible,
			expandEffect: args.expandEffect,
			animationSourceElement: null,
			stickyControls: args.stickyControls,
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

export const StickyControls = Template.bind({});
StickyControls.args = {
	stickyControls: true,
};

export const ExpandEffect = Template.bind({});
ExpandEffect.args = {
	expandEffect: true,
};
