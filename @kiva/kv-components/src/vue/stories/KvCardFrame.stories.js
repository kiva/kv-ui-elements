import KvCardFrame from '../KvCardFrame.vue';
import KvButton from '../KvButton.vue';
import KvCardFrameDocsMdx from './KvCardFrameDocs.mdx';

export default {
	title: 'Interface Elements/KvCardFrame',
	component: KvCardFrame,
	parameters: {
		docs: {
			page: KvCardFrameDocsMdx,
			title: 'KvCardFrame Docs',
		},
	},
	argTypes: {
		allowOverflow: {
			control: 'boolean',
			description: 'Controls whether content can overflow the card boundaries',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		bgColorClass: {
			control: 'select',
			options: ['tw-bg-primary', 'tw-bg-secondary', 'tw-bg-tertiary', 'tw-bg-action', 'tw-bg-caution', 'tw-bg-danger'],
			description: 'Tailwind class for background color',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'tw-bg-primary' },
			},
		},
		borderClass: {
			control: 'text',
			description: 'Tailwind class(es) for border styling',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '' },
			},
		},
		radiusClass: {
			control: 'select',
			options: ['tw-rounded-xs', 'tw-rounded-sm', 'tw-rounded-md', 'tw-rounded', 'tw-rounded-lg', 'tw-rounded-xl', 'tw-rounded-full'],
			description: 'Tailwind class for border radius',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'tw-rounded' },
			},
		},
		shadowClass: {
			control: 'select',
			options: ['tw-shadow-none', 'tw-shadow', 'tw-shadow-lg'],
			description: 'Tailwind class for drop shadow',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'tw-shadow-lg' },
			},
		},
		theme: {
			control: 'select',
			options: ['default', 'greenLight', 'greenDark', 'marigoldLight', 'stoneLight', 'stoneDark'],
			description: 'Predefined theme from @kiva/kv-tokens',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'default' },
			},
		},
	},
};

// Component Overview - Simple examples showing main use cases
export const ComponentOverview = {
	render: () => ({
		components: { KvCardFrame, KvButton },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
					<!-- Basic Card -->
					<div>
						<p class="tw-text-small tw-mb-2 tw-font-medium">Basic Card</p>
						<kv-card-frame>
							<div class="tw-p-4">
								<h3 class="tw-mb-2">Card Title</h3>
								<p class="tw-text-small">Default card with standard shadow and rounded corners.</p>
							</div>
						</kv-card-frame>
					</div>

					<!-- Themed Card -->
					<div>
						<p class="tw-text-small tw-mb-2 tw-font-medium">Themed Card (greenLight)</p>
						<kv-card-frame theme="greenLight">
							<div class="tw-p-4">
								<h3 class="tw-mb-2">Themed Content</h3>
								<p class="tw-text-small">Card with greenLight theme applied.</p>
							</div>
						</kv-card-frame>
					</div>

					<!-- Card with Border -->
					<div>
						<p class="tw-text-small tw-mb-2 tw-font-medium">Card with Border</p>
						<kv-card-frame
							shadow-class="tw-shadow-none"
							border-class="tw-border tw-border-tertiary"
						>
							<div class="tw-p-4">
								<h3 class="tw-mb-2">Bordered Card</h3>
								<p class="tw-text-small">No shadow, with border instead.</p>
							</div>
						</kv-card-frame>
					</div>

					<!-- Full Image Card -->
					<div>
						<p class="tw-text-small tw-mb-2 tw-font-medium">Full Image Card</p>
						<kv-card-frame :allow-overflow="false" class="tw-max-w-13 tw-max-h-13">
							<img
								src="https://www.kiva.org/img/team_impact_fb_share2.png"
								alt="Example"
								class="tw-w-full tw-h-full tw-object-cover"
							/>
						</kv-card-frame>
					</div>
				</div>
			</div>
		`,
	}),
};

// All Variations - Comprehensive view of all styling options
export const AllVariations = {
	render: () => ({
		components: { KvCardFrame },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<!-- Themes -->
				<div class="tw-mb-8">
					<h3 class="tw-mb-4">Themes</h3>
					<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
						<div>
							<p class="tw-text-small tw-mb-2">default</p>
							<kv-card-frame theme="default">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Default</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">greenLight</p>
							<kv-card-frame theme="greenLight">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Green Light</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">greenDark</p>
							<kv-card-frame theme="greenDark">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small tw-text-primary">Green Dark</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">marigoldLight</p>
							<kv-card-frame theme="marigoldLight">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Marigold</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">stoneLight</p>
							<kv-card-frame theme="stoneLight">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Stone Light</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">stoneDark</p>
							<kv-card-frame theme="stoneDark">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small tw-text-primary">Stone Dark</p>
								</div>
							</kv-card-frame>
						</div>
					</div>
				</div>

				<!-- Shadow Variations -->
				<div class="tw-mb-8">
					<h3 class="tw-mb-4">Shadow Variations</h3>
					<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
						<div>
							<p class="tw-text-small tw-mb-2">tw-shadow-none</p>
							<kv-card-frame shadow-class="tw-shadow-none">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">No Shadow</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">tw-shadow</p>
							<kv-card-frame shadow-class="tw-shadow">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Standard Shadow</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">tw-shadow-lg</p>
							<kv-card-frame shadow-class="tw-shadow-lg">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Large Shadow (default)</p>
								</div>
							</kv-card-frame>
						</div>
					</div>
				</div>

				<!-- Border Radius Variations -->
				<div class="tw-mb-8">
					<h3 class="tw-mb-4">Border Radius Variations</h3>
					<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
						<div>
							<p class="tw-text-small tw-mb-2">xs</p>
							<kv-card-frame radius-class="tw-rounded-xs">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">XS</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">sm</p>
							<kv-card-frame radius-class="tw-rounded-sm">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">SM</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">md</p>
							<kv-card-frame radius-class="tw-rounded-md">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">MD</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">default</p>
							<kv-card-frame radius-class="tw-rounded">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Default</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">lg</p>
							<kv-card-frame radius-class="tw-rounded-lg">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">LG</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">xl</p>
							<kv-card-frame radius-class="tw-rounded-xl">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">XL</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">full</p>
							<kv-card-frame radius-class="tw-rounded-full" class="tw-w-24 tw-h-24">
								<div class="tw-p-3 tw-flex tw-items-center tw-justify-center tw-h-full">
									<p class="tw-text-small">Full</p>
								</div>
							</kv-card-frame>
						</div>
					</div>
				</div>

				<!-- Background Color Variations -->
				<div class="tw-mb-8">
					<h3 class="tw-mb-4">Background Color Variations</h3>
					<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
						<div>
							<p class="tw-text-small tw-mb-2">primary</p>
							<kv-card-frame bg-color-class="tw-bg-primary">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Primary</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">secondary</p>
							<kv-card-frame bg-color-class="tw-bg-secondary">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Secondary</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">tertiary</p>
							<kv-card-frame bg-color-class="tw-bg-tertiary">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Tertiary</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">action</p>
							<kv-card-frame bg-color-class="tw-bg-action">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small tw-text-primary">Action</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">caution</p>
							<kv-card-frame bg-color-class="tw-bg-caution">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Caution</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">danger</p>
							<kv-card-frame bg-color-class="tw-bg-danger">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small tw-text-primary">Danger</p>
								</div>
							</kv-card-frame>
						</div>
					</div>
				</div>

				<!-- Border Variations -->
				<div>
					<h3 class="tw-mb-4">Border Variations</h3>
					<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
						<div>
							<p class="tw-text-small tw-mb-2">No Border</p>
							<kv-card-frame shadow-class="tw-shadow-none" border-class="">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">No Border</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">Standard Border</p>
							<kv-card-frame shadow-class="tw-shadow-none" border-class="tw-border tw-border-tertiary">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Standard Border</p>
								</div>
							</kv-card-frame>
						</div>
						<div>
							<p class="tw-text-small tw-mb-2">Thick Border</p>
							<kv-card-frame shadow-class="tw-shadow-none" border-class="tw-border-2 tw-border-action">
								<div class="tw-p-3 tw-text-center">
									<p class="tw-text-small">Thick Border</p>
								</div>
							</kv-card-frame>
						</div>
					</div>
				</div>
			</div>
		`,
	}),
};

// Overflow Behavior Demo
export const OverflowBehavior = {
	render: () => ({
		components: { KvCardFrame },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
					<div>
						<h3 class="tw-mb-2">Allow Overflow (default: true)</h3>
						<p class="tw-text-small tw-mb-4">Content can extend beyond card boundaries</p>
						<kv-card-frame :allow-overflow="true" class="tw-w-48 tw-h-32">
							<div class="tw-p-4">
								<p class="tw-text-small">This is a long piece of content that will overflow outside the card boundaries when allowOverflow is true. Notice how it extends beyond the card frame.</p>
							</div>
						</kv-card-frame>
					</div>
					<div>
						<h3 class="tw-mb-2">Prevent Overflow (false)</h3>
						<p class="tw-text-small tw-mb-4">Content is clipped at card boundaries</p>
						<kv-card-frame :allow-overflow="false" class="tw-w-48 tw-h-32">
							<div class="tw-p-4">
								<p class="tw-text-small">This is a long piece of content that will be clipped when it reaches the card boundaries because allowOverflow is false. The content is hidden.</p>
							</div>
						</kv-card-frame>
					</div>
				</div>
			</div>
		`,
	}),
};

// Full Image Card Example
export const FullImageCard = {
	render: () => ({
		components: { KvCardFrame },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-max-w-md tw-mx-auto">
					<h3 class="tw-mb-4">Full Image Card with allowOverflow=false</h3>
					<kv-card-frame :allow-overflow="false" class="tw-w-full tw-h-64">
						<a href="https://www.kiva.org/team/impact" target="_blank" rel="noopener noreferrer">
							<img
								src="https://www.kiva.org/img/team_impact_fb_share2.png"
								alt="Kiva Team Impact"
								class="tw-w-full tw-h-full tw-object-cover"
							/>
						</a>
					</kv-card-frame>
					<p class="tw-text-small tw-mt-4">
						When using full-bleed images, set <code>allow-overflow="false"</code> to ensure the image
						respects the card's rounded corners and boundaries.
					</p>
				</div>
			</div>
		`,
	}),
};

// Theme Comparison
export const ThemeComparison = {
	render: () => ({
		components: { KvCardFrame, KvButton },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<h3 class="tw-mb-4">Theme Comparison with Interactive Content</h3>
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
					<kv-card-frame theme="default">
						<div class="tw-p-4">
							<h4 class="tw-mb-2">Default Theme</h4>
							<p class="tw-text-small tw-mb-3">Standard theme for general use.</p>
							<kv-button variant="primary" size="small">Learn More</kv-button>
						</div>
					</kv-card-frame>

					<kv-card-frame theme="greenLight">
						<div class="tw-p-4">
							<h4 class="tw-mb-2">Green Light Theme</h4>
							<p class="tw-text-small tw-mb-3">For positive actions or confirmations.</p>
							<kv-button variant="primary" size="small">Confirm</kv-button>
						</div>
					</kv-card-frame>

					<kv-card-frame theme="greenDark">
						<div class="tw-p-4">
							<h4 class="tw-mb-2 tw-text-primary">Green Dark Theme</h4>
							<p class="tw-text-small tw-mb-3 tw-text-primary">Dark variant with light text.</p>
							<kv-button variant="primary" size="small">Continue</kv-button>
						</div>
					</kv-card-frame>

					<kv-card-frame theme="marigoldLight">
						<div class="tw-p-4">
							<h4 class="tw-mb-2">Marigold Light Theme</h4>
							<p class="tw-text-small tw-mb-3">For attention or highlights.</p>
							<kv-button variant="primary" size="small">View Details</kv-button>
						</div>
					</kv-card-frame>

					<kv-card-frame theme="stoneLight">
						<div class="tw-p-4">
							<h4 class="tw-mb-2">Stone Light Theme</h4>
							<p class="tw-text-small tw-mb-3">Neutral theme for secondary content.</p>
							<kv-button variant="secondary" size="small">More Info</kv-button>
						</div>
					</kv-card-frame>

					<kv-card-frame theme="stoneDark">
						<div class="tw-p-4">
							<h4 class="tw-mb-2 tw-text-primary">Stone Dark Theme</h4>
							<p class="tw-text-small tw-mb-3 tw-text-primary">Dark neutral variant.</p>
							<kv-button variant="primary" size="small">Explore</kv-button>
						</div>
					</kv-card-frame>
				</div>
			</div>
		`,
	}),
};

// Default story - interactive playground
export const Default = {
	args: {
		allowOverflow: true,
		bgColorClass: 'tw-bg-primary',
		borderClass: '',
		radiusClass: 'tw-rounded',
		shadowClass: 'tw-shadow-lg',
		theme: 'default',
	},
	render: (args) => ({
		components: { KvCardFrame, KvButton },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<kv-card-frame
					:allow-overflow="args.allowOverflow"
					:bg-color-class="args.bgColorClass"
					:border-class="args.borderClass"
					:radius-class="args.radiusClass"
					:shadow-class="args.shadowClass"
					:theme="args.theme"
				>
					<div class="tw-p-4">
						<div class="tw-w-16 tw-h-16 tw-mb-3 tw-mx-auto">
							<img
								src="https://www.kiva.org/img/w80h80fz50/07f4ec319cb89eabe211cef6a7413931.webp"
								alt="Profile"
								class="tw-w-full tw-h-full tw-rounded-full tw-object-cover"
							/>
						</div>
						<h3 class="tw-text-center tw-mb-2">Damary Lilibeth</h3>
						<p class="tw-text-small tw-text-center tw-mb-4">
							Explore different themes, borders, shadows, and styling options using the controls below.
						</p>
						<div class="tw-text-center">
							<kv-button variant="primary" size="small">View Profile</kv-button>
						</div>
					</div>
				</kv-card-frame>
			</div>
		`,
	}),
};
