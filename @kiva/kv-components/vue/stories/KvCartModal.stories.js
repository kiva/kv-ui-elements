import KvCartModal from '#components/KvCartModal';
import KvButton from '#components/KvButton';

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
			name: 'This is a Loan with a very long name',
			amount: 100,
			country: 'Kenya',
			imageHash: '9673d0722a7675b9b8d11f90849d9b44',
		},
		photoPath: 'https://www-kiva-org.freetls.fastly.net/img/',
		basketCount: 1,
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCartModal, KvButton },
	setup() { return { args }; },
	template: `
		<div>
			<kv-button @click="isVisible = true;">Show cart modal</kv-button>
			<p>The lightbox is visible: {{isVisible}}</p>

			<kv-cart-modal
				v-bind="args"
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
