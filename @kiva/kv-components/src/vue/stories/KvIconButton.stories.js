import {
	mdiDotsVertical,
	mdiClose,
	mdiMenu,
	mdiPlus,
	mdiMinus,
	mdiChevronRight,
	mdiChevronLeft,
	mdiBookmark,
	mdiBookmarkOutline,
} from '@mdi/js';
import KvIconButton from '../KvIconButton.vue';
import KvIconButtonDocsMdx from './KvIconButtonDocs.mdx';

export default {
	title: 'Forms/KvIconButton',
	component: KvIconButton,
	parameters: {
		docs: {
			page: KvIconButtonDocsMdx,
			title: 'Kv Icon Button Docs',
		},
	},
	argTypes: {
		icon: {
			control: 'select',
			options: {
				'Dots Vertical': mdiDotsVertical,
				Close: mdiClose,
				Menu: mdiMenu,
				Plus: mdiPlus,
				Minus: mdiMinus,
				'Chevron Right': mdiChevronRight,
				'Chevron Left': mdiChevronLeft,
				'Bookmark Outline': mdiBookmarkOutline,
				Bookmark: mdiBookmark,
			},
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
		disabled: {
			control: 'boolean',
		},
		showBorder: {
			control: 'boolean',
		},
		borderColor: {
			control: 'select',
			options: ['primary', 'secondary', 'tertiary'],
		},
		showBackground: {
			control: 'boolean',
		},
	},
};

// Component Overview - Simple examples of each type (CSF format)
export const ComponentOverview = {
	render: () => ({
		components: { KvIconButton },
		data() {
			return {
				isToggled: false,
			};
		},
		setup() {
			return {
				mdiDotsVertical,
				mdiClose,
				mdiBookmarkOutline,
				mdiBookmark,
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-flex tw-gap-8 tw-items-center tw-justify-center">
					<div class="tw-text-center">
						<kv-icon-button
							:icon="mdiDotsVertical"
						/>
						<p class="tw-text-small tw-mt-2">Bare</p>
					</div>
					<div class="tw-text-center">
						<kv-icon-button
							:icon="mdiDotsVertical"
							show-background
						/>
						<p class="tw-text-small tw-mt-2">Background</p>
					</div>
					<div class="tw-text-center">
						<kv-icon-button
							:icon="mdiClose"
							show-background
							show-border
							border-color="tertiary"
						/>
						<p class="tw-text-small tw-mt-2">Border</p>
					</div>
					<div class="tw-text-center">
						<kv-icon-button
							:active-icon="mdiBookmark"
							:icon="mdiBookmarkOutline"
							show-background
							toggleable
							v-model="isToggled"
						/>
						<p class="tw-text-small tw-mt-2">Toggle</p>
					</div>
				</div>
			</div>
		`,
	}),
};

// All Variations - Comprehensive view of all style and functional variants across all sizes
export const AllVariations = {
	render: () => ({
		components: { KvIconButton },
		data() {
			return {
				isToggledSmall: false,
				isToggledMedium: false,
				isToggledLarge: false,
			};
		},
		setup() {
			return {
				mdiDotsVertical,
				mdiClose,
				mdiBookmarkOutline,
				mdiBookmark,
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
					<!-- Bare (no background, no border) -->
					<div>
						<h3 class="tw-text-h4 tw-mb-4 tw-font-medium">Bare</h3>
						<div class="tw-flex tw-gap-4 tw-items-center">
							<div class="tw-text-center">
								<kv-icon-button
									size="small"
									:icon="mdiDotsVertical"
								/>
								<p class="tw-text-small tw-mt-1">Small</p>
							</div>
							<div class="tw-text-center">
								<kv-icon-button
									size="medium"
									:icon="mdiDotsVertical"
								/>
								<p class="tw-text-small tw-mt-1">Medium</p>
							</div>
							<div class="tw-text-center">
								<kv-icon-button
									size="large"
									:icon="mdiDotsVertical"
								/>
								<p class="tw-text-small tw-mt-1">Large</p>
							</div>
						</div>
					</div>

					<!-- With Background -->
					<div>
						<h3 class="tw-text-h4 tw-mb-4 tw-font-medium">Background</h3>
						<div class="tw-flex tw-gap-4 tw-items-center">
							<div class="tw-text-center">
								<kv-icon-button
									size="small"
									:icon="mdiDotsVertical"
									show-background
								/>
								<p class="tw-text-small tw-mt-1">Small</p>
							</div>
							<div class="tw-text-center">
								<kv-icon-button
									size="medium"
									:icon="mdiDotsVertical"
									show-background
								/>
								<p class="tw-text-small tw-mt-1">Medium</p>
							</div>
							<div class="tw-text-center">
								<kv-icon-button
									size="large"
									:icon="mdiDotsVertical"
									show-background
								/>
								<p class="tw-text-small tw-mt-1">Large</p>
							</div>
						</div>
					</div>

					<!-- With Background and Border -->
					<div>
						<h3 class="tw-text-h4 tw-mb-4 tw-font-medium">Border</h3>
						<div class="tw-flex tw-gap-4 tw-items-center">
							<div class="tw-text-center">
								<kv-icon-button
									size="small"
									:icon="mdiClose"
									show-background
									show-border
									border-color="tertiary"
								/>
								<p class="tw-text-small tw-mt-1">Small</p>
							</div>
							<div class="tw-text-center">
								<kv-icon-button
									size="medium"
									:icon="mdiClose"
									show-background
									show-border
									border-color="tertiary"
								/>
								<p class="tw-text-small tw-mt-1">Medium</p>
							</div>
							<div class="tw-text-center">
								<kv-icon-button
									size="large"
									:icon="mdiClose"
									show-background
									show-border
									border-color="tertiary"
								/>
								<p class="tw-text-small tw-mt-1">Large</p>
							</div>
						</div>
					</div>

					<!-- Toggle -->
					<div>
						<h3 class="tw-text-h4 tw-mb-4 tw-font-medium">Toggle</h3>
						<div class="tw-flex tw-gap-4 tw-items-center">
							<div class="tw-text-center">
								<kv-icon-button
									size="small"
									:icon="mdiBookmarkOutline"
									:active-icon="mdiBookmark"
									show-background
									toggleable
									v-model="isToggledSmall"
								/>
								<p class="tw-text-small tw-mt-1">Small</p>
							</div>
							<div class="tw-text-center">
								<kv-icon-button
									size="medium"
									:icon="mdiBookmarkOutline"
									:active-icon="mdiBookmark"
									show-background
									toggleable
									v-model="isToggledMedium"
								/>
								<p class="tw-text-small tw-mt-1">Medium</p>
							</div>
							<div class="tw-text-center">
								<kv-icon-button
									size="large"
									:icon="mdiBookmarkOutline"
									:active-icon="mdiBookmark"
									show-background
									toggleable
									v-model="isToggledLarge"
								/>
								<p class="tw-text-small tw-mt-1">Large</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		`,
	}),
};

// Toggleable Button
export const ToggleableButton = {
	args: {
		icon: mdiBookmarkOutline,
		activeIcon: mdiBookmark,
		showBackground: true,
	},
	render: (args) => ({
		components: { KvIconButton },
		data() {
			return {
				isToggledSmall: false,
				isToggledMedium: false,
				isToggledLarge: false,
			};
		},
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<div class="tw-space-y-4">
					<p class="tw-text-primary tw-text-small tw-mb-3">
						Click the bookmark icon to toggle between saved (filled) and unsaved (outline) states.
					</p>
					<div class="tw-flex tw-gap-2 tw-items-center">
						<kv-icon-button
							size="small"
							:icon="args.icon"
							:active-icon="args.activeIcon"
							:show-background="args.showBackground"
							toggleable
							v-model="isToggledSmall"
							@click="onClick"
						/>
						<kv-icon-button
							size="medium"
							:icon="args.icon"
							:active-icon="args.activeIcon"
							:show-background="args.showBackground"
							toggleable
							v-model="isToggledMedium"
							@click="onClick"
						/>
						<kv-icon-button
							size="large"
							:icon="args.icon"
							:active-icon="args.activeIcon"
							:show-background="args.showBackground"
							toggleable
							v-model="isToggledLarge"
							@click="onClick"
						/>
					</div>
				</div>
			</div>
		`,
		methods: {
			onClick(e) { console.log('Icon button clicked', e); },
		},
	}),
};

// Icon Button States
export const IconButtonStates = {
	args: {
		icon: mdiDotsVertical,
		showBackground: true,
		showBorder: true,
		borderColor: 'tertiary',
	},
	render: (args) => ({
		components: { KvIconButton },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<div class="tw-space-y-4">
					<p class="tw-text-primary tw-text-small tw-mb-3">
						Icon buttons can be enabled or disabled. The disabled state reduces opacity and prevents interaction.
					</p>
					<div class="tw-flex tw-gap-8 tw-items-start">
						<div class="tw-text-center">
							<p class="tw-text-small tw-mb-2 tw-font-medium">Default State (Hover and Click for background variations)</p>
							<kv-icon-button
								size="medium"
								:icon="args.icon"
								:show-background="args.showBackground"
								:show-border="args.showBorder"
								:border-color="args.borderColor"
								@click="onClick"
							/>
						</div>
						<div class="tw-text-center">
							<p class="tw-text-small tw-mb-2 tw-font-medium">Disabled State</p>
							<kv-icon-button
								size="medium"
								:icon="args.icon"
								:show-background="args.showBackground"
								:show-border="args.showBorder"
								:border-color="args.borderColor"
								disabled
								@click="onClick"
							/>
						</div>
					</div>
				</div>
			</div>
		`,
		methods: {
			onClick(e) { console.log('Icon button clicked', e); },
		},
	}),
};

// Touch Target Visualization
export const TouchTargetVisualization = {
	args: {
		icon: mdiDotsVertical,
		showBackground: true,
	},
	render: (args) => ({
		components: { KvIconButton },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<p class="tw-text-primary tw-mb-4 tw-text-small">
					The dashed border shows the 44px minimum touch target area.
					The visual circle is sized according to the size prop.
				</p>
				<div class="tw-flex tw-gap-4 tw-items-center">
					<div class="tw-text-center">
						<div class="tw-border tw-border-dashed tw-border-tertiary tw-inline-block">
							<kv-icon-button size="small" :icon="args.icon" :show-background="args.showBackground" @click="onClick" />
						</div>
						<p class="tw-text-small tw-mt-1">Small (16px)</p>
					</div>
					<div class="tw-text-center">
						<div class="tw-border tw-border-dashed tw-border-tertiary tw-inline-block">
							<kv-icon-button size="medium" :icon="args.icon" :show-background="args.showBackground" @click="onClick" />
						</div>
						<p class="tw-text-small tw-mt-1">Medium (20px)</p>
					</div>
					<div class="tw-text-center">
						<div class="tw-border tw-border-dashed tw-border-tertiary tw-inline-block">
							<kv-icon-button size="large" :icon="args.icon" :show-background="args.showBackground" @click="onClick" />
						</div>
						<p class="tw-text-small tw-mt-1">Large (24px)</p>
					</div>
				</div>
			</div>
		`,
		methods: {
			onClick(e) { console.log('Icon button clicked', e); },
		},
	}),
};

// Default story - interactive playground
export const Default = {
	args: {
		icon: mdiDotsVertical,
		size: 'large',
		showBorder: false,
		borderColor: 'tertiary',
		showBackground: false,
		disabled: false,
	},
	render: (args) => ({
		components: { KvIconButton },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6 tw-inline-block">
				<kv-icon-button
					:icon="args.icon"
					:size="args.size"
					:show-border="args.showBorder"
					:border-color="args.borderColor"
					:show-background="args.showBackground"
					:disabled="args.disabled"
					@click="onClick"
				/>
			</div>
		`,
		methods: {
			onClick(e) { console.log('Icon button clicked', e); },
		},
	}),
};
