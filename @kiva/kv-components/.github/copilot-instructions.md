# @kiva/kv-components - Vue 3 Component Library

Accessible UI component library built with Vue 3 Composition API, Tailwind CSS, and Storybook.

## TODO: Upcoming Changes

- [ ] **Update for TypeScript migration** - This file will need significant updates once the TypeScript conversion is complete. Key sections to update: Technology Stack, Component Structure patterns, prop definitions (TypeScript interfaces instead of JSDoc), file naming conventions (.ts/.tsx extensions), ESLint configuration, and test patterns.

## Technology Stack

- **Vue 3** - Composition API (using `setup()` function, NOT `<script setup>`)
- **JavaScript** - Pure JS, no TypeScript
- **Tailwind CSS** - Custom `tw-` prefix for all utility classes
- **Vite** - Build tool configured for library mode
- **Jest + Vue Testing Library** - Testing framework
- **Storybook 8** - Component documentation and development

## Component Development Patterns

### Component Structure

Components follow Vue 3 Composition API with Options API structure:

- Use `export default { setup() }` pattern, NOT `<script setup>` syntax
- Components located in [src/vue/](../src/vue/)
- Reference examples: [KvButton.vue](../src/vue/KvButton.vue), [KvCarousel.vue](../src/vue/KvCarousel.vue), [KvExpandable.vue](../src/vue/KvExpandable.vue)

### Key Patterns

1. **Props** - Define with JSDoc for Storybook documentation
2. **Composition API** - Use `ref`, `computed`, `toRefs`, `onMounted` from Vue
3. **Utilities** - See [attrs.js](../src/utils/attrs.js) for splitting attrs/listeners
4. **Slots** - Provide flexible content projection
5. **v-model** - Use `modelValue` prop and `update:modelValue` emit for Vue 3
6. **Accessibility** - ARIA labels, semantic HTML, keyboard navigation required

## Styling Guidelines

### Tailwind CSS

- **Prefix**: ALL Tailwind classes use `tw-` prefix (e.g., `tw-bg-primary`, `tw-text-h1`)
- **Design tokens**: Import from [@kiva/kv-tokens](../../kv-tokens/) package
- **Theme system**: Use [KvThemeProvider.vue](../src/vue/KvThemeProvider.vue) for light/dark mode
- **Config**: See [tailwind.config.js](../tailwind.config.js)

### Icons

- Use Material Design Icons from `@mdi/js`
- Import paths like `import { mdiChevronRight } from '@mdi/js'`
- Render with [KvMaterialIcon.vue](../src/vue/KvMaterialIcon.vue) component

## Code Quality Standards

### ESLint Configuration

See [.eslintrc.cjs](../.eslintrc.cjs) for full rules:

- **Indentation**: Tabs (NOT spaces)
- **Max line length**: 120 characters
- **Vue rules**: Vue 3 recommended + no self-closing HTML elements
- **Path aliases**: Use `#components`, `#utils`, `#fixtures` imports

### File Naming Conventions

- Components: `KvComponentName.vue` (PascalCase in [src/vue/](../src/vue/))
- Tests: `ComponentName.spec.js` (in [tests/unit/specs/components/](../tests/unit/specs/components/))
- Stories: `ComponentName.stories.js` (in [src/vue/stories/](../src/vue/stories/))

## Testing Requirements

### Test Framework

- **Jest** configured in [jest.config.cjs](../jest.config.cjs)
- **Vue Testing Library** for component testing
- **jest-axe** for automated accessibility testing (MANDATORY)

### Test Pattern

Reference [tests/unit/specs/components/KvButton.spec.js](../tests/unit/specs/components/KvButton.spec.js) for structure:

1. Import component, `render`, `fireEvent` from `@testing-library/vue`
2. Import `axe` from `jest-axe`
3. Write accessibility test with `toHaveNoViolations()` matcher
4. Test user interactions with `fireEvent`
5. Test props, slots, and emitted events
6. Use [tests/fixtures/](../tests/fixtures/) for mock data as needed

### Running Tests

```bash
npm run test  # Runs lint + jest
npm run lint  # ESLint check
```

## Storybook Development

### Configuration

- **Version**: 8.4.7
- **Config**: [src/vue/.storybook/main.js](../src/vue/.storybook/main.js)
- **Addons**: a11y, docs, essentials, storysource, viewport
- **Port**: 6006

### Story Format (CSF)

Reference [src/vue/stories/KvButton.stories.js](../src/vue/stories/KvButton.stories.js) for structure:

1. Export default object with `title`, `component`, `argTypes`
2. Create `Template` function returning component setup
3. Export story variations binding Template
4. Configure `args` for each variation

### JSDoc for Storybook

Document props, slots, and events with JSDoc in component files for auto-documentation in Storybook Docs.

### Running Storybook

```bash
npm run storybook        # Start dev server on :6006
npm run build-storybook  # Build static Storybook
```

## Build System

### Vite Configuration

See [vite.config.js](../vite.config.js):

- **Library mode** with ES modules output
- **No bundling** - preserves file structure
- **CSS code splitting** - separate CSS per component
- Custom plugin [@kiva/vite-plugin-vue-lib-css](../../vite-plugin-vue-lib-css/)

### Build Scripts

```bash
npm run prebuild  # Copy flag assets
npm run build     # Vite library build
```

## Component Creation Workflow

1. Create component in [src/vue/](../src/vue/) following patterns in [KvButton.vue](../src/vue/KvButton.vue)
2. Write Storybook story in [src/vue/stories/](../src/vue/stories/) following [KvButton.stories.js](../src/vue/stories/KvButton.stories.js)
3. Write tests in [tests/unit/specs/components/](../tests/unit/specs/components/) following [KvButton.spec.js](../tests/unit/specs/components/KvButton.spec.js)
4. Ensure jest-axe accessibility tests pass
5. Run `npm run test` to validate linting and tests
6. Review in Storybook with `npm run storybook`

## Design System Integration

### @kiva/kv-tokens

Import design primitives from [@kiva/kv-tokens](../../kv-tokens/):

- **Colors**: Themable variants (primary, secondary, action, caution, danger)
- **Typography**: Text styles (h1, h2, body, small)
- **Spacing**: Consistent spacing scale
- **Shadows, radii, opacity, z-index**: Component tokens

## Accessibility Standards

All components MUST:

- Pass automated jest-axe testing
- Include proper ARIA attributes
- Support keyboard navigation
- Use semantic HTML elements
- Meet WCAG color contrast requirements

## Additional Resources

- [Published Storybook](https://main--608b4cf87f686c00213841b1.chromatic.com/?path=/docs/base-styling-primitives--primitives)
- [Package README](../README.md)
- [GitHub Repository](https://github.com/kiva/kv-ui-elements)
