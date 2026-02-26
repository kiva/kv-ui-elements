import KvAvatarBubble from '../KvAvatarBubble.vue';
import KvButton from '../KvButton.vue';

export default {
	title: 'Interface Elements/KvAvatarBubble',
	component: KvAvatarBubble,
};

const Template = (args, {
	argTypes,
}) => ({
	props: Object.keys(argTypes),
	components: {
		KvAvatarBubble,
		KvButton,
	},
	setup() {
		return { args };
	},
	template: `
		<div>
      <kv-button data-testid="header-basket" @click="startAnimation()">Show Bubble</kv-button>
			<kv-avatar-bubble
        ref="avatarBubble"
        class="tw-bottom-2"
				:borrower-name="borrowerName"
        :borrower-image-url="borrowerImageUrl"
        :bubble-target-query="bubbleTargetQuery"
			>
			</kv-avatar-bubble>
		</div>`,
	data() {
		return {
			borrowerName: args.borrowerName,
			borrowerImageUrl: args.borrowerImageUrl,
			bubbleTargetQuery: args.bubbleTargetQuery,
		};
	},
	methods: {
		startAnimation() {
			this.$refs?.avatarBubble?.animateBubble();
		},
	},
});

export const Default = Template.bind({});
Default.args = {
	bubbleTargetQuery: '[data-testid="header-basket"]',
	borrowerName: 'Default Profile',
	borrowerImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.webp',
};
