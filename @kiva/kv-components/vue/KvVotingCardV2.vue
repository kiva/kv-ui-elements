<template>
	<div
		class="vote_card tw-flex tw-flex-col tw-justify-end"
		:style="cssProps"
	>
		<div
			class="tw-flex-grow-0"
		>
			<h2 class="tw-italic tw-pb-1">
				{{ title }}
			</h2>
			<p class="tw-pb-1.5">
				{{ description }}
			</p>
			<div class="tw-block md:tw-flex tw-justify-between">
				<div
					v-if="showPercentage"
					class="tw-flex tw-items-center tw-w-full tw-max-w-16"
				>
					<kv-progress-bar
						class="tw-flex-grow"
						:aria-label="'Percent of votes for ' + description"
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
	</div>
</template>

<script>
import {
	computed,
	toRefs,
} from 'vue-demi';
import KvProgressBar from './KvProgressBar.vue';
import KvButton from './KvButton.vue';

export default {
	name: 'KvVotingCard',
	components: {
		KvProgressBar,
		KvButton,
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
		const {
			backgroundImageUrl,
		} = toRefs(props);

		const cssProps = computed(() => {
			return {
				'--background-image-voting-card': `url(${backgroundImageUrl.value})`,
			};
		});

		return {
			cssProps,
			castVote() {
				emit('vote');
			},
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
	@apply tw-rounded tw-px-4 tw-pb-4 tw-text-white;
}
</style>
