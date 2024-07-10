import KvCartModal from '../KvCartModal.vue';
import KvButton from '../KvButton.vue';

export default {
	title: 'KvCartModal',
	component: KvCartModal,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		visible: true,
		title: '',
		preventClose: false,
		addedLoan: {
			name: 'Test Loan',
			amount: 100,
			country: 'Kenya',
			imageHash: '9673d0722a7675b9b8d11f90849d9b44',
		},
		photoPath: 'https://www-kiva-org.freetls.fastly.net/img/',
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCartModal, KvButton },
	template: `
		<div>
			<kv-button @click="isVisible = true;">Show cart modal</kv-button>
			<p>The lightbox is visible: {{isVisible}}</p>

			<kv-cart-modal
				:visible="isVisible"
				:prevent-close="preventClose"
				:added-loan="addedLoan"
				:photo-path="photoPath"
				@cart-modal-closed="isVisible = false"
			>
			</kv-cart-modal>
		</div>
	`,
	data() {
		return {
			isVisible: args.visible,
		};
	},
});

export const Lightbox = DefaultTemplate.bind({});
Lightbox.args = {
	title: 'Added to Basket',
};
