<template>
	<div
		class="vote_card tw-flex tw-flex-col tw-justify-end"
		:style="cssProps"
	>
		<div
			class="tw-flex-grow-0 tw-text-white"
		>
			<h2 class="tw-italic tw-pb-1">
				{{ title }}
			</h2>
			<p class="tw-pb-1.5">
				{{ truncatedDescription }}
				<a
					v-if="isTruncated"
					class="tw-underline tw-pl-1 tw-text-white tw-cursor-pointer"
					@click="isLightboxOpen = true"
				>read more</a>
			</p>
			<div class="tw-block md:tw-flex tw-justify-between">
				<div
					v-if="showPercentage"
					class="tw-flex tw-items-center tw-w-full tw-max-w-16"
				>
					<kv-progress-bar
						class="tw-flex-grow"
						:label="'Percent of votes for ' + description"
						:value="percentage"
					/>
					<div class="tw-ml-2">
						{{ percentage }}%
					</div>
				</div>
				<kv-button
					v-if="showVoteButton"
					variant="secondary"
					class="tw-flex-grow-0 tw-min-w-16 tw-mt-2"
					@click="castVote"
				>
					Vote
				</kv-button>
			</div>
		</div>
		<KvLightbox
			:title="title"
			:visible="isLightboxOpen"
			@lightbox-closed="isLightboxOpen = false"
		>
			<template #header>
				<h3>
					{{ title }}
				</h3>
			</template>
			<p class="tw-pb-1.5">
				{{ description }}
			</p>
		</KvLightbox>
	</div>
</template>

<script lang="ts">
import {
	computed,
	ref,
	toRefs,
} from 'vue';
import KvProgressBar from './KvProgressBar.vue';
import KvButton from './KvButton.vue';
import KvLightbox from './KvLightbox.vue';

export default {
	name: 'KvVotingCard',
	components: {
		KvButton,
		KvLightbox,
		KvProgressBar,
	},
	props: {
		title: {
			type: String,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
		backgroundImageUrl: {
			type: String,
			default: '',
		},
		percentage: {
			type: Number,
			default: 0,
		},
		showVoteButton: {
			type: Boolean,
			default: true,
		},
		showPercentage: {
			type: Boolean,
			default: true,
		},
	},
	emits: [
		'vote',
	],
	setup(props, { emit }) {
		const isLightboxOpen = ref(false);

		const TRUNCATION_LIMIT = 110;

		const {
			backgroundImageUrl,
			description,
		} = toRefs(props);

		const cssProps = computed(() => {
			return {
				'--background-image-voting-card': `url(${backgroundImageUrl.value})`,
			};
		});

		const isTruncated = computed(() => {
			return description?.value && (description?.value.length > TRUNCATION_LIMIT);
		});

		const truncatedDescription = computed(() => {
			if (isTruncated.value) {
				return `${description.value.substring(0, TRUNCATION_LIMIT)}...`;
			}
			return description.value;
		});
		return {
			cssProps,
			castVote() {
				emit('vote');
			},
			isLightboxOpen,
			isTruncated,
			truncatedDescription,
		};
	},
};
</script>

<style lang="postcss">
.vote_card {
	background-image:
    linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%),
    var(--background-image-voting-card);
	background-size: cover;
	@apply tw-rounded tw-px-4 tw-pb-4;
}
</style>
