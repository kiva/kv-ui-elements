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
		tw-justify-between
		tw-max-w-300"
	>
		<div class="tw-relative tw-flex tw-w-full tw-bg-black tw-rounded tw-mb-1">
			<slot name="image"></slot>
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
					class="tw-h-2 tw-w-2 tw-truncate"
					:icon="mapMarkerIcon"
				/>
				<div>
					{{ borrowerName }}
				</div>
			</div>
		</div>
		<div class="tw-flex">
			<div class="tw-flex-grow">
				<h3 class="tw-font-medium">
					{{ category }}
				</h3>
			</div>
			<div class="tw-flex-shrink">
				<kv-material-icon
					v-if="showInfoIcon"
					:icon="infoIcon"
					class="tw-h-3 tw-w-3"
					@click="handleInfoClick"
				/>
			</div>
		</div>
		<div class="tw-flex tw-items-center tw-w-full tw-mb-1">
			<kv-progress-bar
				v-if="showPercentage"
				class="tw-flex-grow"
				:aria-label="'Percent of votes for ' + category"
				:value="percentage"
			/>
			<div
				v-if="showPercentage"
				class="tw-ml-2 tw-font-medium"
			>
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
import { mdiInformation, mdiMapMarker } from '@mdi/js';
import { computed } from 'vue-demi';
import KvProgressBar from './KvProgressBar.vue';
import KvButton from './KvButton.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	name: 'KvVotingCard',
	components: {
		KvProgressBar,
		KvButton,
		KvMaterialIcon,
	},
	props: {
		borrowerName: {
			type: String,
			default: '',
		},
		category: {
			type: String,
			default: '',
		},
		images: {
			type: Array,
			default: () => [],
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
		showInfoIcon: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const mapMarkerIcon = computed(() => mdiMapMarker);
		const infoIcon = computed(() => mdiInformation);
		return {
			mapMarkerIcon,
			infoIcon,
		};
	},

	methods: {
		castVote() {
			this.$emit('vote', {
				category: this.category,
			});
		},
		handleInfoClick() {
			this.$emit('info-click', {
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
