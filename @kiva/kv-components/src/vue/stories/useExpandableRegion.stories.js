import { ref } from 'vue';
import { mdiChevronDown } from '@mdi/js';
import { useExpandableRegion } from '../../utils/useExpandableRegion';
import KvButton from '../KvButton.vue';
import KvExpandable from '../KvExpandable.vue';
import KvMaterialIcon from '../KvMaterialIcon.vue';

export default {
	title: 'Interface Elements/useExpandableRegion',
	argTypes: {
		startExpanded: { control: 'boolean' },
	},
};

const RegionTemplate = (args) => ({
	components: { KvButton, KvExpandable, KvMaterialIcon },
	setup() {
		const bodyElement = ref(null);
		const region = useExpandableRegion({
			idHandle: 'Learn more about Kiva',
			startExpanded: args.startExpanded,
			bodyElement,
			analyticsLabel: 'Learn more about Kiva',
			trackFunction: () => {},
		});
		return { region, bodyElement, mdiChevronDown };
	},
	template: `
		<div class="tw-p-2.5" :id="region.regionId.value">
			<h3>
				<button
					type="button"
					class="tw-w-full tw-flex tw-items-center tw-justify-between tw-text-left"
					style="font: inherit"
					v-bind="region.controllerAttrs.value"
					@click="region.toggle({ label: 'Learn more about Kiva' })"
				>
					Learn more about Kiva
					<kv-material-icon
						:icon="mdiChevronDown"
						class="tw-w-4 tw-h-4 tw-transition-transform tw-duration-300 tw-flex-shrink-0"
						:class="{ 'tw-rotate-180': region.isExpanded.value }"
					/>
				</button>
			</h3>
			<kv-expandable :skip-enter="region.skipEnter.value" easing="ease-in-out">
				<div v-show="region.isExpanded.value" ref="bodyElement" v-bind="region.bodyAttrs.value">
					<p class="tw-py-2">Kiva is an international nonprofit with a mission to expand financial access.</p>
				</div>
			</kv-expandable>
			<kv-button
				class="tw-mt-2"
				variant="secondary"
				v-bind="region.controllerAttrs.value"
				@click="region.toggle({ label: 'Read more' })"
			>
				Read more
			</kv-button>
		</div>
	`,
});

export const HeadingAndButtonControllers = RegionTemplate.bind({});
HeadingAndButtonControllers.args = { startExpanded: false };

export const StartExpanded = RegionTemplate.bind({});
StartExpanded.args = { startExpanded: true };
