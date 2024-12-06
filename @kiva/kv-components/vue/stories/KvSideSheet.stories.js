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
				:initial-styles="modalInitialStyles"
				:expand-effect="expandEffect"
				@close="closeModal"
			>
				<div>
					Some content
				</div>
			</kv-side-sheet>
		</div>`,
	data() {
		return {
			isVisible: args.visible,
			modalInitialStyles: {},
			expandEffect: args.expandEffect,
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
				const card = event.currentTarget;
				if (card) {
					const rect = card.getBoundingClientRect();

					this.modalInitialStyles = {
						position: 'fixed',
						top: `${rect.top}px`,
						left: `${rect.left}px`,
						width: `${rect.width}px`,
						height: `${rect.height}px`,
					};
				}
			}

			this.isVisible = true;
		},
		closeModal() {
			this.isVisible = false;
		},
	},
});

export const Default = Template.bind({});

export const ExpandEffect = Template.bind({});
ExpandEffect.args = {
	expandEffect: true,
};
