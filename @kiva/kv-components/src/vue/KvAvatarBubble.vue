<template>
	<div
		ref="bubble"
		class="tw-absolute tw-right-3 tw-z-modal"
	>
		<kv-user-avatar
			v-show="showBubble"
			class="loan-image tw-rounded-full"
			:style="bubbleStyle"
			:lender-name="borrowerName"
			:lender-image-url="borrowerImageUrl"
			:class="{'animate': isAnimating}"
			@transitionend="resetBubble"
		/>
	</div>
</template>

<script lang="ts">
import {
	ref, nextTick, toRefs,
} from 'vue';
import KvUserAvatar from './KvUserAvatar.vue';

export default {
	name: 'KvAvatarBubble',
	components: {
		KvUserAvatar,
	},
	props: {
		/**
		 * Query selector for the target element to animate the bubble to
		 */
		bubbleTargetQuery: {
			type: String,
			default: '',
		},
		/**
		 * Name of the borrower
		 */
		borrowerName: {
			type: String,
			default: '',
		},
		/**
		 * Image URL of the borrower that will be displayed in the bubble
		 */
		borrowerImageUrl: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const bubble = ref(null);
		const isAnimating = ref(false);
		const bubbleStyle = ref({});
		const showBubble = ref(false);
		const {
			bubbleTargetQuery,
		} = toRefs(props);

		const resetBubble = () => {
			isAnimating.value = false;
			showBubble.value = false;
			bubbleStyle.value = {};
		};

		const getTargetPosition = () => {
			const targets = [...document.querySelectorAll(bubbleTargetQuery.value)];
			const target = targets.find((t) => t?.clientHeight);

			return target?.getBoundingClientRect() ?? {
				top: 0, left: 0, width: 0, height: 0,
			};
		};

		const animateBubble = () => {
			const {
				top, left, width, height,
			} = getTargetPosition();

			if (width || height) {
				showBubble.value = true;

				nextTick(() => {
					const bubbleRect = bubble.value.getBoundingClientRect();
					const targetX = left - bubbleRect.left
							+ width / 2 - bubbleRect.width / 2;
					const targetY = top - bubbleRect.top
							+ height / 2 - bubbleRect.height / 2;
					isAnimating.value = true;
					bubbleStyle.value = {
						...bubbleStyle,
						transform: `translate(${targetX}px, ${targetY}px)`,
						opacity: 0,
					};
				});
			}
		};
		return {
			bubble,
			showBubble,
			isAnimating,
			bubbleStyle,

			resetBubble,
			getTargetPosition,
			animateBubble,
		};
	},
};
</script>

<style lang="postcss" scoped>

.loan-image {
	transition: transform 1s, opacity 1s;
}

.loan-image.animate {
	opacity: 0;
}
</style>
