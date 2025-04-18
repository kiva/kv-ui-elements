<template>
	<div class="tw-whitespace-normal">
		<button
			class="tw-w-full tw-py-2 tw-flex tw-justify-between tw-not-prose"
			@click="toggleFAQ"
		>
			<h3 class="tw-text-subhead tw-text-left">
				{{ title }}
			</h3>
			<kv-material-icon
				class="tw-w-4 tw-h-4"
				:icon="open ? mdiChevronUp : mdiChevronDown"
				@click.stop="toggleFAQ"
			/>
		</button>
		<kv-expandable easing="ease-in-out">
			<div v-show="open">
				<div class="tw-prose tw-pb-4 tw-pt-2">
					<slot></slot>
					<!-- eslint-disable vue/no-v-html -->
					<div
						v-if="content !== ''"
						v-html="content"
					>
					</div>
					<!--eslint-enable-->
				</div>
			</div>
		</kv-expandable>
	</div>
</template>

<script>
import {
	computed,
	onMounted,
	watch,
	ref,
	toRefs,
} from 'vue';
import {
	mdiChevronDown,
	mdiChevronUp,
} from '@mdi/js';
import { kebabCase } from 'change-case';

import KvExpandable from './KvExpandable.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	components: {
		KvMaterialIcon,
		KvExpandable,
	},
	props: {
		/**
		 * Question Title
		* */
		title: {
			type: String,
			default: '',
		},
		/**
		 * Question Content - can accept raw html
		* */
		content: {
			type: String,
			default: '',
		},
		active: {
			type: Boolean,
			default: false,
		},
		routeHash: {
			type: String,
			default: '',
		},
		kvTrackFunction: {
			type: Function,
			default: () => {},
		},
	},
	emits: [
		'toggle',
	],
	setup(props, { emit }) {
		const {
			title,
			active,
		} = toRefs(props);
		const open = ref(active.value || false);
		const titleSlugified = computed(() => kebabCase(title.value));

		const toggleFAQ = () => {
			props.kvTrackFunction('faq', 'toggle', titleSlugified.value, open.value ? 'expand' : 'collapse');
			open.value = !open.value;
			emit('toggle', { title: titleSlugified.value });
		};

		watch(active, (val) => {
			open.value = val;
		});

		onMounted(() => {
			/** Allows directly linking to the question via a hash equal to slugified title */
			if (props.routeHash === `#${titleSlugified.value}`) {
				open.value = true;
			}
		});

		return {
			open,
			mdiChevronDown,
			mdiChevronUp,
			titleSlugified,
			toggleFAQ,
		};
	},
};
</script>
