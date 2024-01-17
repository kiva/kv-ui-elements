<template>
	<div
		class="
		kv-voting-card
		tw-bg-white
		tw-rounded
		tw-shadow
		tw-p-1
		tw-flex
		tw-flex-col
		tw-items-center
		tw-justify-between
		tw-max-w-300"
	>
		<div class="tw-relative tw-flex tw-w-full tw-bg-black tw-rounded tw-mb-1">
			<kv-borrower-image
				class="tw-rounded"
				:alt="`Photo of ${borrowerName}`"
				:aspect-ratio="aspectRatio"
				:default-image="defaultImage"
				:hash="hash"
				:images="images"
				:photo-path="photoPath"
			/>
			<div
				class="
				tw-absolute
				tw-bottom-1
				tw-left-1
				tw-text-primary
				tw-bg-white
				tw-rounded
				tw-text-h4
				tw-inline-flex
				tw-items-center"
				style="padding: 2px 6px; text-transform: capitalize;"
			>
				<kv-material-icon
					class="tw-h-2 tw-w-2"
					:icon="mapMarkerIcon"
				/>
				<div>
					{{ borrowerName }}, {{ country }}
				</div>
			</div>
		</div>

		<h3 class="tw-font-medium">
			{{ category }}
		</h3>
		<div class="tw-flex tw-items-center tw-w-full tw-mb-1">
			<kv-progress-bar
				class="tw-flex-grow"
				:aria-label="'Percent of votes for ' + category"
				:value="percentage"
			/>
			<div class="tw-ml-2 tw-font-medium">
				{{ percentage }}%
			</div>
		</div>
		<kv-button
			v-if="showVoteButton"
			class="tw-w-full"
			@click="castVote"
		>
			Vote
		</kv-button>
	</div>
</template>

<script>
import { mdiMapMarker } from '@mdi/js';
import {
	computed,
} from 'vue-demi';
import KvBorrowerImage from './KvBorrowerImage.vue';
import KvProgressBar from './KvProgressBar.vue';
import KvButton from './KvButton.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	name: 'KvVotingCard',
	components: {
		KvBorrowerImage,
		KvProgressBar,
		KvButton,
		KvMaterialIcon,
	},
	props: {
		borrowerName: {
			type: String,
			default: '',
		},
		country: {
			type: String,
			default: '',
		},
		category: {
			type: String,
			default: '',
		},
		aspectRatio: {
			type: Number,
			default: 1,
		},
		hash: {
			type: String,
			default: '',
		},
		images: {
			type: Array,
			default: () => [],
		},
		photoPath: {
			type: String,
			default: '',
		},
		defaultImage: {
			type: Object,
			default: () => ({ width: 300 }),
		},
		percentage: {
			type: Number,
			default: 0,
		},
		showVoteButton: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['vote'],
	setup() {
		const mapMarkerIcon = computed(() => {
			return mdiMapMarker;
		});
		return {
			mapMarkerIcon,
		};
	},
	methods: {
		castVote() {
			this.$emit('vote', {
				category: this.category,
			});
		},
	},
};
</script>

<style scoped>
.kv-voting-card {
  max-width: 300px;
}
</style>
