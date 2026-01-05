# kv-ui-elements Monorepo

This is a Lerna-managed monorepo containing Kiva's design system and UI component libraries.

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

Each package has its own detailed AI instructions in its `.github/copilot-instructions.md` file:

- **[@kiva/kv-components/.github/copilot-instructions.md](../@kiva/kv-components/.github/copilot-instructions.md)** - Component development patterns, testing, and Storybook

## General Guidelines

- **Node.js**: >= 18
- **npm**: >= 10
- **Commit conventions**: Follows [@commitlint/config-conventional](../commitlint.config.js)
- **Pre-commit hooks**: Husky runs lint-staged on TypeScript, JavaScript, and Vue files

## TODO: Unconfigured Packages

The following packages need their own `.github/copilot-instructions.md` files created:

- [ ] @kiva/kv-shop
- [ ] @kiva/kv-loan-filters
- [ ] @kiva/kv-analytics
- [ ] @kiva/kv-activity-feed
- [ ] @kiva/kv-tokens
- [ ] @kiva/vite-plugin-vue-lib-css
