import KvEditButton from '../KvEditButton.vue';
import KvLightbox from '../KvLightbox.vue';
import KvButton from '../KvButton.vue';

export default {
	title: 'KvEditButton',
	component: KvEditButton,
	argTypes: {
		lightboxTitle: {
			control: 'text',
		},
	},
	args: {
		lightboxTitle: 'Edit',
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvEditButton, KvLightbox, KvButton },
	template: `
		<div>
			<kv-edit-button :lightbox-title="lightboxTitle">
				<p>This is the content that will appear inside the lightbox when the edit button is clicked.</p>
			</kv-edit-button>
		</div>
	`,
});

export const EditButtonWithLightbox = DefaultTemplate.bind({});
EditButtonWithLightbox.args = {
	lightboxTitle: 'Edit Item Details',
};
