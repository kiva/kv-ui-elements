# Component Stories Guide

This guide outlines the standards and best practices for creating Storybook stories for components in the kv-components library.

## ⚠️ CRITICAL: Working with Existing Files

**NEVER create duplicate story files.** When updating existing stories:

1. **Work within the existing file** - Edit the current `.stories.js` file directly
2. **Do NOT convert existing story formats** - Leave existing CSF2 stories in their current format; they work fine
3. **Only add new stories** - Add stories with specific titles needed for documentation
4. **Use replace operations** - Use `replace_string_in_file` or similar tools to update sections in place
5. **No `.new.js` or backup files** - Make changes directly; version control handles history

**Working with Existing Story Suites:**

When a component already has a comprehensive suite of stories:

1. **Preserve all existing stories exactly as-is** - Do not refactor, rename, or convert format
2. **Identify missing documentation stories** - Check MDX docs for story references that don't exist
3. **Add only the specific stories needed** - Create new stories with exact names referenced in docs
4. **Use CSF3 for new stories only** - New stories should use CSF3 format, but don't convert existing ones

**Common documentation story names to add:**
- `ComponentOverview` - Simple visual showcase for docs overview section
- `AllVariations` - Comprehensive variant grid (or use existing stories)
- Feature-specific stories referenced in MDX documentation

**Format for new stories (CSF3):**

```javascript
export const ComponentOverview = {
	render: () => ({
		components: { ComponentName },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<!-- 2-4 simple examples with labels -->
			</div>
		`,
	}),
};
```

## Creation Order

While stories and documentation can be created in any order, here are recommended approaches:

### Stories First (Recommended)
1. Create component → Create stories → Test → Document
2. Allows visual testing during development
3. Stories inform documentation structure

### Documentation First
1. Create component → Document → Create stories
2. Better for complex components with many requirements
3. Documentation drives story implementation

**Either way is fine** - choose what works best for your workflow. Stories can reference non-existent MDX files, and documentation can reference non-existent stories. Both will work without breaking the build.

## Handling Missing Documentation

If creating stories before documentation:

```javascript
// TODO: Create KvComponentDocs.mdx (use the template)
// Required sections: Component Overview, Variations, Usage Information,
// Behavior, Anatomy, Specs, Best Practices, Accessibility, Code Examples

// NOTE: Only import docs if the file exists. Create a stub from the template,
// or omit this import + docs.page until docs are ready.
import KvComponentDocsMdx from './KvComponentDocs.mdx';

export default {
  title: 'KvComponent',
  component: KvComponent,
  parameters: {
    docs: {
      page: KvComponentDocsMdx, // Safe to reference before file exists
    },
  },
};
```

Importing a missing MDX file will fail. Create a stub MDX file from the template, or omit the docs import
and `docs.page` until the documentation exists.

## Story File Structure

Every component should have a corresponding `.stories.js` file in `src/vue/stories/` that follows this structure:

### 1. Imports
```javascript
import { mdiIconName } from '@mdi/js'; // MDI icons if needed
import ComponentName from '../ComponentName.vue';
import ComponentNameDocsMdx from './ComponentNameDocs.mdx';
```

**Guidelines:**
- Import only the icons actually used in the stories
- Component import path should be relative from the stories directory
- Always import the corresponding MDX docs file

### 2. Default Export (Story Configuration)

```javascript
export default {
	title: 'ComponentName',
	component: ComponentName,
	parameters: {
		docs: {
			page: ComponentNameDocsMdx,
			title: 'Component Name Docs',
		},
	},
	argTypes: {
		// Define controls for each prop
	},
};
```

**Key elements:**
- **title**: Display name in Storybook sidebar (matches component name)
- **component**: Reference to the Vue component
- **parameters.docs.page**: Links to the MDX documentation
- **argTypes**: Defines interactive controls and their configuration

### 3. argTypes Configuration

Configure controls for component props to enable interactive testing:

```javascript
argTypes: {
	// Select dropdown
	size: {
		control: 'select',
		options: ['small', 'medium', 'large'],
	},
	// Boolean toggle
	disabled: {
		control: 'boolean',
	},
	// Text input
	label: {
		control: 'text',
	},
	// Number input
	maxValue: {
		control: 'number',
	},
	// Select with labeled options
	icon: {
		control: 'select',
		options: {
			'Dots Vertical': mdiDotsVertical,
			'Close': mdiClose,
			'Menu': mdiMenu,
		},
	},
	// Radio buttons
	variant: {
		control: 'radio',
		options: ['primary', 'secondary', 'tertiary'],
	},
	// Color picker
	backgroundColor: {
		control: 'color',
	},
}
```

**Control types:**
- `boolean` - Checkbox for true/false props
- `text` - Text input for string props
- `number` - Number input with increment/decrement
- `select` - Dropdown menu (can use array or object with labels)
- `radio` - Radio button group
- `range` - Slider for numeric values
- `color` - Color picker
- `date` - Date picker
- `object` - JSON editor for complex objects
- `array` - Array editor

### 4. Required Stories

Every component story file should include these stories at minimum:

**Note on Existing Stories:**
When a component already has a suite of stories, **do not modify or convert existing stories**. Instead:
- Preserve all existing stories in their current format (CSF2 or CSF3)
- Only add new stories that are specifically referenced in documentation but don't exist yet
- Use exact story names that match MDX documentation references
- For ComponentOverview and AllVariations, evaluate if existing stories can serve these purposes before creating new ones
- If existing stories cover the needed functionality, reference them in documentation instead of creating duplicates

#### ComponentOverview
Shows simple, clear examples of the component's main variants.

**Purpose:** Give users an immediate visual understanding of what the component offers

**Format:**
```javascript
export const ComponentOverview = {
	render: () => ({
		components: { ComponentName },
		data() {
			return {
				// Any reactive state needed
			};
		},
		setup() {
			return {
				// Icons or other non-reactive data
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<!-- 2-4 simple component examples with labels -->
			</div>
		`,
	}),
};
```

**Best practices:**
- Keep it simple - 2-4 examples maximum
- Show the most common/important variants
- Include descriptive labels under each example
- Use consistent background styling (gray-50)

#### AllVariations
Comprehensive showcase of all component variants.

**Purpose:** Document every visual and functional variant for reference

**Important Flexibility Note:**
For complex components with many variants, creating one comprehensive AllVariations story may be impractical or overwhelming. In these cases:
- Use multiple smaller, focused variation stories instead (e.g., SizeVariations, StyleVariants, StateExamples)
- Reference these multiple stories in the documentation
- This approach provides better organization and maintainability
- AllVariations is recommended but not mandatory if better alternatives exist

**Format:**
```javascript
export const AllVariations = {
	render: () => ({
		components: { ComponentName },
		data() {
			return {
				// State for interactive variants
			};
		},
		setup() {
			return {
				// Icons or constants
			};
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
					<!-- Organized sections for each variant type -->
				</div>
			</div>
		`,
	}),
};
```

**Best practices:**
- Use a grid layout for organization
- Group related variants together with section headings
- Include size variations for each style variant
- Add descriptive labels (Small, Medium, Large, etc.)
- Show all functional states (default, toggled, etc.)

#### Default
Interactive playground for testing all component props.

**Purpose:** Allow users to experiment with all component options

**Format:**
```javascript
export const Default = {
	args: {
		// Default prop values
		size: 'medium',
		disabled: false,
		// ... all props
	},
	render: (args) => ({
		components: { ComponentName },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6 tw-inline-block">
				<component-name v-bind="args" @click="onClick" />
			</div>
		`,
		methods: {
			onClick(e) { console.log('Clicked', e); },
		},
	}),
};
```

**Best practices:**
- Include all props with sensible defaults
- Use `v-bind="args"` to apply all args at once
- Include event handlers that log to console
- Keep the template simple and focused

#### Additional Behavior/Feature Stories
Create additional stories for specific behaviors or features documented in the MDX.

**Examples:**
- `IconButtonStates` - Show enabled vs disabled states
- `ToggleableButton` - Demonstrate toggle functionality
- `TouchTargetVisualization` - Visualize accessibility features
- `WithIconVariants` - Show different icon positions
- `LoadingStates` - Demonstrate loading behavior

**Format:**
```javascript
export const FeatureName = {
	args: {
		// Props specific to this feature
	},
	render: (args) => ({
		components: { ComponentName },
		data() {
			return {
				// Local state
			};
		},
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<p class="tw-text-primary tw-text-small tw-mb-3">
					Explanation of what this story demonstrates
				</p>
				<!-- Component examples -->
			</div>
		`,
		methods: {
			// Event handlers
		},
	}),
};
```

## Story Writing Best Practices

### Template Structure

**Container styling:**
- Always wrap stories in `<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">` or similar
- Use consistent padding (p-6 or p-8)
- Use gray-50 background to provide contrast

**Layout patterns:**
- Use flexbox for horizontal layouts: `tw-flex tw-gap-4`
- Use grid for complex layouts: `tw-grid tw-grid-cols-2 tw-gap-8`
- Center content when appropriate: `tw-items-center tw-justify-center`
- Use `tw-space-y-4` for vertical spacing

**Labels and descriptions:**
- Add descriptive text with `tw-text-small` class
- Use `tw-mb-3` or similar for spacing before examples
- Include labels under examples to clarify what's being shown

### Reactivity

**Use `data()` for reactive state:**
```javascript
data() {
	return {
		isToggled: false,
		currentValue: 5,
		selectedOption: 'option1',
	};
},
```

**Use `setup()` for non-reactive data:**
```javascript
setup() {
	return {
		mdiIcon,
		constantValue,
	};
},
```

**In Default stories, use `args`:**
```javascript
setup() {
	return { args };
},
```

### Event Handling

Always include event handlers that log to console for debugging:

```javascript
methods: {
	onClick(e) {
		console.log('Component clicked', e);
	},
	onInput(value) {
		console.log('Input changed', value);
	},
	onChange(newValue) {
		console.log('Value changed', newValue);
	},
},
```

### Naming Conventions

**Story names:**
- Use PascalCase for all story names
- Be descriptive and specific
- Match the section in documentation where they appear
- Examples: `ComponentOverview`, `AllVariations`, `IconButtonStates`, `TouchTargetVisualization`

**Variable names in templates:**
- Use camelCase for data properties
- Use descriptive names that indicate purpose
- Examples: `isToggled`, `selectedValue`, `isLoading`

## Component Story Format (CSF3)

We use Storybook's Component Story Format 3 (CSF3):

```javascript
export const StoryName = {
	args: { /* default props */ },
	render: (args) => ({ /* Vue component definition */ }),
};
```

**Benefits:**
- More concise than CSF2
- Better TypeScript support
- Cleaner syntax for Vue 3
- Easier to compose and extend stories

## Interactive Controls

### Selecting the Right Control Type

| Prop Type | Control Type | Use Case |
|-----------|--------------|----------|
| `Boolean` | `boolean` | Simple true/false toggles |
| `String` (limited options) | `select` or `radio` | Size, variant, color options |
| `String` (free text) | `text` | User-entered content, labels |
| `Number` (range) | `range` | Values with min/max |
| `Number` (specific) | `number` | Counts, indices, measurements |
| `Icon` | `select` with object | Named icon options |
| `Object` | `object` | Complex configuration objects |
| `Array` | `array` | Lists of items |

### Example argTypes Section

```javascript
argTypes: {
	size: {
		control: 'select',
		options: ['small', 'medium', 'large'],
		description: 'Size of the component',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'medium' },
		},
	},
	disabled: {
		control: 'boolean',
		description: 'Whether the component is disabled',
	},
	icon: {
		control: 'select',
		options: {
			'None': null,
			'Close': mdiClose,
			'Menu': mdiMenu,
		},
		description: 'Icon to display',
	},
},
```

## Testing Stories

Before finalizing stories, verify:

1. **All stories render correctly** in Storybook
2. **Interactive controls work** in the Default story
3. **Event handlers log** appropriately to console
4. **Responsive layouts** work at different screen sizes
5. **All variants are shown** in AllVariations
6. **Story names match** references in MDX documentation
7. **No console errors** appear
8. **V-model binding works** for two-way data flow (if applicable)

## Common Patterns

### Toggle/Checkbox Components
```javascript
export const ToggleExample = {
	render: () => ({
		components: { ComponentName },
		data() {
			return {
				isChecked: false,
			};
		},
		template: `
			<component-name v-model="isChecked" />
		`,
	}),
};
```

### Multiple Instances with Independent State
```javascript
data() {
	return {
		isToggledSmall: false,
		isToggledMedium: false,
		isToggledLarge: false,
	};
},
```

### Components with Slots
```javascript
template: `
	<component-name>
		<template #header>Header Content</template>
		<template #default>Main Content</template>
		<template #footer>Footer Content</template>
	</component-name>
`,
```

### Components with Multiple Props and Events
```javascript
template: `
	<component-name
		:size="args.size"
		:disabled="args.disabled"
		:loading="args.loading"
		@click="onClick"
		@change="onChange"
		@input="onInput"
	/>
`,
```

## Styling Guidelines

### Tailwind Classes to Use

**Backgrounds:**
- `tw-bg-gray-50` - Standard story background
- `tw-bg-white` - When contrast is needed
- `tw-bg-primary` - For dark backgrounds

**Spacing:**
- `tw-p-6` or `tw-p-8` - Container padding
- `tw-gap-4` or `tw-gap-8` - Flex/grid gaps
- `tw-space-y-4` - Vertical spacing
- `tw-mb-2`, `tw-mb-3`, `tw-mb-4` - Bottom margins

**Layout:**
- `tw-flex tw-items-center` - Horizontal alignment
- `tw-grid tw-grid-cols-2` - Two-column grid
- `tw-inline-block` - Inline containers

**Typography:**
- `tw-text-small` - Descriptive text
- `tw-text-h4` - Section headings
- `tw-font-medium` - Medium weight text
- `tw-text-primary` - Primary text color

**Other:**
- `tw-rounded-md` - Rounded corners
- `tw-border tw-border-dashed` - Dashed borders for guides

## Quality Checklist

**Use the comprehensive checklist to verify your work:**
📋 [Component Documentation Checklist](./component-documentation-checklist.md)

The checklist covers both stories and documentation comprehensively.

**Quick verification - before considering stories complete:**

- [ ] All required stories exist (ComponentOverview, AllVariations, Default)
- [ ] Additional behavior stories created as needed
- [ ] All argTypes configured correctly
- [ ] Interactive controls work in Default story
- [ ] Event handlers log to console
- [ ] Story names match MDX references
- [ ] Templates use consistent styling
- [ ] Reactive state managed appropriately
- [ ] All variants visible in AllVariations
- [ ] No console errors when rendering
- [ ] Stories display correctly in Storybook
- [ ] Code is clean and well-formatted

## Working with Existing Stories

When enhancing or adding to existing story files:

### CRITICAL: File Editing Rules
1. **NEVER create duplicate files** - No `.new.js`, `.backup.js`, or any other duplicate files
2. **Edit in place** - Use `replace_string_in_file` to modify the existing file directly
3. **Version control handles history** - Git tracks changes; no need for backup files
4. **Work within the existing structure** - Update sections as needed without recreating the entire file

### Assessment First
1. **Inventory existing stories** - List what already exists
2. **Evaluate quality** - Determine which stories work well as-is
3. **Identify gaps** - Compare against documentation needs
4. **Check Default story** - This should always exist and be functional
5. **Check story format** - Are stories using CSF2 or CSF3?

### Format Conversion (CSF2 → CSF3)
When you find stories in the old CSF2 format, convert them to CSF3 **while preserving their exact presentation and functionality**:

**CSF2 Example (old):**
```javascript
export const CustomizableCard = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCard },
	setup() { return { args }; },
	template: `
		<kv-card v-bind="args">
			<p>Content here</p>
		</kv-card>
	`,
	data() {
		return { localState: false };
	},
});
CustomizableCard.args = {
	title: 'Card Title',
	elevated: true,
};
```

**CSF3 Conversion (new):**
```javascript
export const CustomizableCard = {
	args: {
		title: 'Card Title',
		elevated: true,
	},
	render: (args) => ({
		components: { KvCard },
		setup() {
			return { args };
		},
		template: `
			<kv-card v-bind="args">
				<p>Content here</p>
			</kv-card>
		`,
		data() {
			return { localState: false };
		},
	}),
};
```

**Conversion checklist:**
- [ ] Move `.args` assignment into story object as `args` property
- [ ] Wrap existing story function in `render: (args) => (...)`
- [ ] Remove `props: Object.keys(argTypes)` line
- [ ] Keep `setup() { return { args }; }` as-is
- [ ] Preserve entire template exactly
- [ ] Preserve all data(), methods, computed properties
- [ ] Verify story renders identically after conversion

### Preservation Guidelines
1. **Default story is sacred** - Never replace it, only enhance if needed or convert format
2. **Keep working stories** - If a story functions well, update format but preserve functionality
3. **Reuse over recreate** - Use existing stories in documentation where appropriate
4. **Enhance incrementally** - Improve argTypes, convert format, or clean templates without breaking functionality
5. **Preserve presentation** - When converting formats, the visual output must remain identical

### Adding New Stories
- **Check first** - Can existing stories serve the purpose?
- **ComponentOverview** - May not need to create if good examples already exist
- **AllVariations** - Consider multiple focused stories for complex components
- **Fill gaps only** - Create stories only for documented behaviors that lack examples
- **Use CSF3 format** - All new stories should use the current format

### Migration Approach
```javascript
// ✅ Good: Convert format, preserve functionality, add missing stories
export const Default = {
	args: { /* props */ },
	render: (args) => ({ /* converted from CSF2 */ }),
};
export const ComponentOverview = { /* new story */ };

// ✅ Also Good: Enhance converted story if needed
export const Default = {
	args: {
		size: 'medium', // enhanced with better defaults
		disabled: false,
	},
	render: (args) => ({ /* converted and template cleaned up */ }),
};

// ❌ Bad: Replace working Default story completely
// export const Default = { /* totally new implementation */ };

// ❌ Bad: Create duplicate file
// Create KvCard.stories.new.js
```

### AllVariations Alternatives
For large/complex components, instead of one AllVariations story:
```javascript
// Multiple focused stories
export const SizeVariations = { /* small, medium, large */ };
export const StyleVariants = { /* primary, secondary, tertiary */ };
export const StateExamples = { /* default, hover, disabled, loading */ };
export const WithIcons = { /* icon positions and combinations */ };
```

Then in documentation:
```mdx
## Variations

The component supports various sizes, styles, and states.

<Story of={ComponentStories.SizeVariations} />
<Story of={ComponentStories.StyleVariants} />
<Story of={ComponentStories.StateExamples} />
```

## Maintenance

Update stories when:
- Component API changes (new props, removed props)
- New variants are added
- Behavior changes
- Visual design updates
- New features are added
- Documentation sections are added that need story demonstrations
- Migrating to current standards (preserve existing stories)

## Resources

- [Storybook CSF3 Documentation](https://storybook.js.org/docs/vue/api/csf)
- [Storybook Controls](https://storybook.js.org/docs/vue/essentials/controls)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- Reference: [KvIconButton.stories.js](../src/vue/stories/KvIconButton.stories.js)
