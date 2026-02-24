export default {
	title: 'Base Styling/Typography',
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/design/TPmBUB4olYPMF6glEhBGDG/%F0%9F%8C%BF-Ecosystem-2026--WIP-?node-id=17299-5886&t=R9armxVQM5Sqkg7l-1',
		},
		// Required to show the design tab by default instead of the docs tab
		options: {
			selectedPanel: 'storybook/design-addon/panel',
		},
	},
};

/*
How to find figma frame links:

Copy the Figma URL

Copy the URL for the file or frame you’d like to embed in your story.

    Open the Figma file.
    If you want to share a specific frame, select the frame on your canvas.
    Click the Share button.
    Click the Copy link button.

Note: The Figma design file is currently set to private, so the following links may not work for all users.
Please ensure you have access to the Figma file to view the typography guidelines.
*/

export const TypographyGuidelinesEmbed = {
	render: () => ({
		template: `
			<div class="tw-w-full tw-h-screen">
				<iframe
					class="tw-w-full tw-h-full tw-border-0"
					src="https://www.figma.com/design/TPmBUB4olYPMF6glEhBGDG/%F0%9F%8C%BF-Ecosystem-2026--WIP-?node-id=17299-5886&t=R9armxVQM5Sqkg7l-1"
					allowfullscreen
				></iframe>
			</div>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: 'Typography documentation embedded from Figma.',
			},
		},
	},
};
