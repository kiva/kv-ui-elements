# kv-ui-elements Monorepo

This is a Lerna-managed monorepo containing Kiva's design system and UI component libraries.

## ⚠️ IMPORTANT: Node Version Management

**Before running ANY terminal commands** (npm, node, etc.) in this repository, you MUST run:

```bash
nvm use
```

This ensures you're using the correct Node.js version specified in [.nvmrc](.nvmrc). Running commands with the wrong Node version can cause build failures, dependency issues, and unexpected behavior.

**Note:** This is only required when executing terminal commands. File reading, editing, and other non-terminal operations do not require `nvm use`.

## Repository Structure

This monorepo uses **Lerna** (independent versioning) and **npm workspaces** for package management.

### Packages

- **@kiva/kv-components** - Vue 3 accessible UI component library (primary focus)
- **@kiva/kv-tokens** - Design token system and Tailwind CSS configuration
- **@kiva/kv-shop** - Shopping basket and checkout utilities
- **@kiva/kv-loan-filters** - Loan filtering and query parameter utilities
- **@kiva/kv-analytics** - Analytics tracking utilities
- **@kiva/kv-activity-feed** - Activity feed components and utilities
- **@kiva/vite-plugin-vue-lib-css** - Custom Vite plugin for Vue library CSS handling

## Monorepo Commands

Commands can be run from the root or within specific packages:

- `npm run lint` - Lint all packages
- `npm run test` - Test all packages
- `npm run build` - Build all packages
- `npm run storybook` - Start Storybook for kv-components
- `npm run publish-release` - Publish packages via Lerna

## Package-Specific AI Instructions

Each package has its own detailed AI instructions in its `AGENTS.md` file:

- **[@kiva/kv-components/AGENTS.md](@kiva/kv-components/AGENTS.md)** - Component development patterns, testing, and Storybook
- **[@kiva/kv-tokens/AGENTS.md](@kiva/kv-tokens/AGENTS.md)** - Design token system and Tailwind CSS configuration

## General Guidelines

- **Node.js**: Version specified in [.nvmrc](.nvmrc)
  - Run `nvm use` before executing terminal commands (npm, node, etc.)
  - Not required for file editing or reading operations
- **npm**: >= 10
- **Commit conventions**: Follows [@commitlint/config-conventional](commitlint.config.js)
- **Pre-commit hooks**: Husky runs lint-staged on TypeScript, JavaScript, and Vue files

## AI Assistant Workflow

When working in this repository, AI assistants should:

1. **Before terminal commands**: Run `nvm use` before any npm, node, or other terminal commands
   - This is NOT required for file reading, editing, or other non-terminal operations
2. Check package-specific AGENTS.md files for detailed instructions
3. Use proper error handling and validation
4. Follow the commit conventions for any generated commits

## TODO: Unconfigured Packages

The following packages need their own `AGENTS.md` files created:

- [ ] @kiva/kv-shop
- [ ] @kiva/kv-loan-filters
- [ ] @kiva/kv-analytics
- [ ] @kiva/kv-activity-feed
- [ ] @kiva/vite-plugin-vue-lib-css
