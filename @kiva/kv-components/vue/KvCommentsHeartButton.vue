<template>
	<button
		aria-label="Like"
		@click="changeState"
	>
		<kv-material-icon
			:icon="icon"
			:class="classState"
		/>
	</button>
</template>

<script>
import { computed, toRefs } from 'vue-demi';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	name: 'KvCommentsHeartButton',
	components: {
		KvMaterialIcon,
	},
	props: {
		/**
		 * Use if small icon is needed
		 * */
		isSmall: {
			type: Boolean,
			default: false,
		},
		/**
		 * Use if icon is active
		 * */
		isLiked: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'click',
	],
	setup(props, { emit }) {
		const {
			isSmall,
			isLiked,
		} = toRefs(props);

		const icon = computed(() => (isLiked.value ? mdiHeart : mdiHeartOutline));

		const classState = computed(() => {
			let className = isSmall.value ? 'tw-w-2.5 tw-h-2.5' : 'tw-w-3 tw-h-3';
			className += isLiked.value ? ' filled' : '';

			return className;
		});

		const changeState = () => {
			emit('click', !isLiked.value);
		};

		return {
			icon,
			classState,
			changeState,
		};
	},
};
</script>

<style scoped>
.filled >>> svg {
    fill: #F60059;
}
</style>
