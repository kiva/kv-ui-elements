# @kiva/kv-tokens - Design Token System

Design token system and Tailwind CSS preset for Kiva's design system.

## Overview

This package provides:
- **Design tokens** - JSON-based design definitions for colors, typography, spacing, and more
- **Tailwind CSS preset** - Pre-configured Tailwind setup matching Kiva's style guide
- **Utility exports** - Color and typography utilities for programmatic access

## Package Structure

- [index.js](index.js) - Main entry point, exports tokens and configurations
- [primitives.js](primitives.js) - Raw design token definitions
- [configs/](configs/) - Tailwind configuration and utility modules
  - [tailwind.config.js](configs/tailwind.config.js) - Tailwind preset configuration
  - [kivaColors.js](configs/kivaColors.js) - Color system utilities
  - [kivaTypography.js](configs/kivaTypography.js) - Typography system utilities
- [build/](build/) - Build scripts for generating token outputs
- [assets/fonts/](assets/fonts/) - Font files for Kiva's typography system

## Usage

### Importing Design Tokens

```js
import designTokens from '@kiva/kv-tokens';

const primaryTextColor = designTokens.colors.theme.DEFAULT.text.primary;
```

### Using as Tailwind Preset

```js
// tailwind.config.js
import { tailwindConfig } from "@kiva/kv-tokens";

export default {
	presets: [tailwindConfig],
	// Project-specific customizations
	theme: {
		//...
	},
	content: [
		//...
	],
};
```

## Key Tailwind Configuration Differences

This preset differs from default Tailwind CSS in several ways:

1. **Prefix**: All Tailwind classes use `tw-` prefix (e.g., `tw-mb-1`, `tw-bg-primary`)
2. **Color System**: Themable semantic color names instead of default Tailwind colors
   - Use `tw-bg-primary`, `tw-text-secondary`, etc.
   - Supports light/dark theme variants
   - See [Storybook](https://main--608b4cf87f686c00213841b1.chromatic.com/?path=/docs/base-styling-primitives--primitives) for full color palette
3. **Spacing Scale**: Based on 8px increments rather than Tailwind's default 4px
4. **Typography**: Custom type scale with Kiva-specific font families and sizes

## Development

### Scripts

```bash
npm run lint   # ESLint check
npm run build  # Generate token outputs
npm test       # No tests specified (placeholder)
```

### Technology

- **Node.js**: Version specified in [.nvmrc](../../.nvmrc) - Always run `nvm use`
- **Tailwind CSS**: ^3.4.3
- **@tailwindcss/typography**: ^0.5.1 for prose styling

## File Naming Conventions

- Configuration files: `camelCase.js` (e.g., `kivaColors.js`, `tailwind.config.js`)
- All files use ES modules (`.js` with `"type": "module"` in package.json)

## Design Token Structure

The token system is organized hierarchically:

- **Colors**: Theme colors (primary, secondary, action, etc.) with light/dark variants
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent 8px-based spacing scale
- **Shadows**: Elevation shadows for components
- **Border Radius**: Corner radius values
- **Z-Index**: Layering scale for UI elements

## Integration with @kiva/kv-components

The [@kiva/kv-components](../kv-components/) package uses this token system for all styling:

- Components import `tailwindConfig` as a preset
- All Tailwind classes use the `tw-` prefix
- Themeable colors enable light/dark mode support via `KvThemeProvider`

## Publishing

This package is published to npm with public access. Version bumping and publishing is managed by Lerna from the repository root.

## Additional Resources

- [Package README](README.md)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/configuration#presets)
- [Kiva Storybook - Design Primitives](https://main--608b4cf87f686c00213841b1.chromatic.com/?path=/docs/base-styling-primitives--primitives)
- [GitHub Repository](https://github.com/kiva/kv-ui-elements)
