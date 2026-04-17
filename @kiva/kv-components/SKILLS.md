# @kiva/kv-components Skills Catalog

AI-assisted development guides for common workflows in this package.

## Available Skills

| Skill | File | Description |
|-------|------|-------------|
| make-to-vue | [docs/make-to-vue.md](docs/make-to-vue.md) | Use when porting a Figma Make (or other React) component into a Vue 3 kv-components component. Triggered by requests like "port this to Vue" or by the user sharing React source, a Figma Make URL, or a Figma file link. |

## AI Prompts

Drop-in prompts for generating Storybook stories and MDX documentation with an AI assistant.

| Prompt | File | Description |
|--------|------|-------------|
| ai-stories-prompt | [docs/ai-stories-prompt.md](docs/ai-stories-prompt.md) | Prompt for generating standardized Storybook `.stories.js` files for a component. |
| ai-documentation-prompt | [docs/ai-documentation-prompt.md](docs/ai-documentation-prompt.md) | Prompt for generating the matching `Docs.mdx` documentation page for a component. |
| how-to-use-ai-prompts | [docs/how-to-use-ai-prompts.md](docs/how-to-use-ai-prompts.md) | Walkthrough of when and how to use the prompt files above. |

## Authoring Guides & Checklists

Reference material the AI prompts pull from — useful when reviewing output by hand or authoring without a prompt.

| Doc | File | Description |
|-----|------|-------------|
| Component Stories Guide | [docs/component-stories-guide.md](docs/component-stories-guide.md) | Standards and best practices for Storybook stories in kv-components. |
| Component Stories Checklist | [docs/component-stories-checklist.md](docs/component-stories-checklist.md) | Checklist for verifying story coverage and quality before merging. |
| Component Documentation Guide | [docs/component-documentation-guide.md](docs/component-documentation-guide.md) | Standards and best practices for MDX component documentation. |
| Component Documentation Checklist | [docs/component-documentation-checklist.md](docs/component-documentation-checklist.md) | Checklist for verifying documentation completeness before merging. |
| Storybook Folder Prefixes | [docs/storybook-folder-prefixes.md](docs/storybook-folder-prefixes.md) | Required title prefixes for organizing components in the Storybook sidebar. |
