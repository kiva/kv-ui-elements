# Component Documentation Guide

This guide outlines the standards and best practices for creating comprehensive component documentation in the kv-components library.

---

## ⚠️ CRITICAL: ALWAYS Use the ComponentDocs.template.mdx Template

**When creating any component `.mdx` documentation file, you MUST use the template:**

📄 **Template Location:** `@kiva/kv-components/src/vue/.storybook/templates/ComponentDocs.template.mdx`

**This is NOT optional. Do NOT create freeform MDX documentation.**

The template ensures:
- Consistent structure across all component documentation
- All required sections are included
- Proper Storybook configuration and imports
- Standardized layout and formatting
- Accessibility and best practices coverage

**Process:**
1. Copy the ComponentDocs.template.mdx file
2. Fill in ALL `{{placeholders}}` with component-specific content
3. Follow the exact section structure (do not skip or reorder sections)
4. Reference actual stories from the component's .stories.js file
5. Add component-specific subsections as needed within the template structure

---

## Creation Order

Documentation can be created before or after stories:

### After Stories (Recommended)
- Stories already exist and work
- Documentation references real, tested stories
- Can screenshot actual story examples
- Less refactoring needed

### Before Stories
- Documentation drives story requirements
- Clear specifications for story implementation
- Better for complex components
- Stories built to match documented behaviors

**Either approach works** - choose based on your workflow and component complexity.

## Handling Missing Stories

If creating documentation before stories exist, create a **stub** `.stories.js` file first so the MDX import resolves.

```mdx
<!--
TODO: Create these stories in KvComponent.stories.js:
- ComponentOverview: Show main variants (bare, styled, interactive)
- AllVariations: Comprehensive showcase of all options
- Default: Interactive playground
- ComponentStates: Enabled, disabled, loading, error states
- SpecialBehavior: [Describe what this should demonstrate]

See component-stories-guide.md for implementation details.
-->

import { Canvas, Meta, Story, Controls } from '@storybook/addon-docs/blocks';
import * as KvComponentStories from './KvComponent.stories.js';

<Meta title="Folder Prefix/KvComponent" component={KvComponentStories.Component} />

## Component Overview

<Story of={KvComponentStories.ComponentOverview} />
```

**Important:** The `<Meta title="..." />` MUST include a folder prefix that matches the component's `.stories.js` file. See the **Storybook Folder Prefixes** section below for guidance.

The MDX import requires a real stories file. Use a stub with matching export names (ComponentOverview, AllVariations,
Default, etc.) so Storybook can load while you flesh out the stories.

#### Storybook Folder Prefixes

The MDX `<Meta title="..." />` MUST include a folder prefix matching the component's `.stories.js` file. Use one of the existing prefixes below, or ask for clarification if none fit:

##### Existing Folder Prefixes:

- **Base Styling/** - Style guide, theme provider, and foundational styling components
- **Charts/** - Chart and data visualization components (e.g., KvPieChart, KvLineGraph, KvTreeMapChart)
- **Checkout/** - Checkout flow components (e.g., KvAtbModal, KvCartModal, KvCartPill, KvCheckoutReceipt)
- **Comments/** - Comment-related components (e.g., KvCommentsAdd, KvCommentsList, KvCommentsListItem)
- **Components/** - General-purpose components that don't fit other categories (e.g., KvCarousel, KvLightbox, KvMap, KvUtilityMenu)
- **Forms/** - Form controls and input components (e.g., KvButton, KvCheckbox, KvTextInput, KvSelect, KvSwitch)
- **Interface Elements/** - General UI elements, indicators, and feedback components (e.g., KvToast, KvTooltip, KvProgressBar, KvLoadingSpinner)
- **Loan Display/** - Loan-specific display components (e.g., KvLoanInfoCard, KvClassicLoanCard, KvBorrowerImage)
- **Page Frame/** - Page layout and structural components (e.g., KvPageContainer, KvGrid, KvWwwHeader)

**Guidelines:**
- If the component clearly fits an existing category, use that prefix
- If uncertain or the component represents a new category, **ask for clarification** on which prefix to use or if a new folder prefix should be created
- The prefix in the MDX file MUST match the prefix in the corresponding .stories.js file
- Never omit the folder prefix

Example Meta tags:
- `<Meta title="Forms/KvButton" ... />`
- `<Meta title="Loan Display/KvLoanInfoCard" ... />`
- `<Meta title="Interface Elements/KvToast" ... />`

## Documentation Structure

Every component should have a corresponding `.mdx` documentation file in `src/vue/stories/` that follows this structure:

### 1. Component Header
- Component name as H1
- Brief one-sentence description of the component's purpose
- Component Overview section with visual examples

### 2. Table of Contents
Include links to all major sections:
- Variations
- Usage Information
- Behavior
- Anatomy
- Specs
- Best Practices
- Accessibility
- Component Properties + Demo
- Code Examples

### 3. Variations
Show all visual and functional variants of the component. This helps users understand the full range of options available.

**What to include:**
- Size variations (if applicable)
- Style variants (outline, filled, ghost, etc.)
- State variations (default, hover, active, disabled)
- Functional variants (default vs. toggle, single vs. multiple selection, etc.)

### 4. Usage Information
Provide clear guidance on when and how to use the component.

**Required subsections:**
- **When to Use**: Bullet list of appropriate use cases
- **When Not to Use**: Bullet list of scenarios where this component is not suitable

**Tips:**
- Be specific and actionable
- Reference common patterns in web applications
- Consider accessibility and user experience implications

### 5. Behavior
Explain how the component behaves and responds to user interaction.

**What to cover:**
- Interactive states (hover, active, focus, disabled)
- State transitions and animations
- User interaction patterns
- Special behaviors (toggles, selections, expansions, etc.)
- Any component-specific interaction rules

**Include:**
- Visual story demonstrations for each behavior
- Clear descriptions of state changes
- When state updates occur (immediately, on blur, etc.)

### 6. Anatomy
Break down the component's structure into its constituent parts.

**Format:**
- Brief intro paragraph
- Bullet list of component parts with descriptions
- Reference to relevant props that control each part

**Example:**
```markdown
The button consists of three main parts:
- **Label**: The text content (controlled via default slot)
- **Icon** (optional): Visual indicator (via `icon` prop)
- **Container**: Background and border styling (via variant props)
```

### 7. Specs
Document technical specifications and measurements.

**Common specs to include:**
- Touch target sizes (minimum 44x44px for accessibility)
- Spacing guidelines (internal padding, external margins)
- Typography specifications (font sizes, weights, line heights)
- Color specifications (reference design tokens)
- Border radius values
- Any responsive behavior

**Include:**
- Visual demonstrations when helpful
- Specific pixel/rem values
- References to design tokens

### 8. Best Practices
Provide do's and don'ts with visual examples.

**⚠️ IMPORTANT: Images vs. Text Format**

**If you have images ready:**
- Use a 2-column grid layout with images
- Each item includes an image, label (✓ Do or ✗ Don't), and description
- Follow the image naming convention below
- Aim for 2-4 pairs of do's and don'ts

**If you don't have images:**
- Use text-based format with clear headings and bullet points
- Format: `✓ [Guideline]` and `✗ [Anti-pattern]`
- **DO NOT leave empty image placeholders** - remove the grid layout entirely
- Images can be added later when available

**Example text-based format (when images aren't ready):**
```markdown
## Best Practices

**Shadow Depth:**
- ✓ Use appropriate shadow depth to indicate content importance
- ✗ Don't use excessive shadow depth for standard content

**Spacing:**
- ✓ Add padding to card content for proper spacing
- ✗ Don't forget padding - the component doesn't include internal padding
```

**Image naming convention (when using images):**
```
ComponentName/Do-brief-description.png
ComponentName/Do-not-brief-description.png
```

**Tips:**
- Use actual component screenshots or mockups
- Focus on common mistakes or misunderstandings
- Cover both visual and functional best practices
- Keep descriptions concise (1-2 sentences)

### 9. Accessibility
List all accessibility features and requirements.

**Format:** Bullet list

**What to include:**
- Required ARIA attributes (`aria-label`, `aria-labelledby`, `aria-pressed`, etc.)
- Keyboard navigation support (Enter, Space, Arrow keys, etc.)
- Screen reader announcements
- Focus management
- Minimum touch target sizes
- Color contrast requirements
- Disabled state communication

### 10. Component Properties + Demo
Display the interactive controls for component props.

**Required elements:**
```mdx
<Canvas of={ComponentStories.Default} />
<Controls of={ComponentStories.Default} />
```

This automatically generates:
- Live component preview
- Interactive controls for all props
- Prop documentation table

### 11. Code Examples
Provide practical, copy-paste ready code examples.

**Guidelines:**
- Include 2-5 examples showing common use cases
- Start with the simplest example
- Progress to more complex scenarios
- Use actual prop names and realistic values
- Include necessary imports if non-obvious

**Example titles:**
- "Basic [Component]"
- "[Component] with [Feature]"
- "[Component] with [Variant]"
- "Complex [Component] Example"

## Writing Style

### Voice and Tone
- **Clear and Direct**: Use simple, straightforward language
- **Action-Oriented**: Start with verbs when describing usage
- **Consistent**: Use the same terminology throughout
- **Helpful**: Anticipate questions and provide answers

### Grammar and Formatting
- Use sentence case for headings
- Use complete sentences in descriptions
- Use bullet points for lists
- Use bold for emphasis on key terms or component parts
- Use code formatting for prop names, values, and code snippets

### Terminology
- Use consistent names for component parts throughout
- Define any domain-specific terms on first use
- Use Kiva-specific terminology when applicable

## Images and Visual Assets

### Image Requirements
- Store images in `public/[ComponentName]/` directory
- Use descriptive, kebab-case filenames
- Include alt text (can be empty for decorative images)
- Optimize images for web (use appropriate compression)

### Image Naming Convention
```
ComponentName/Do-descriptive-action.png
ComponentName/Do-not-descriptive-action.png
ComponentName/[descriptive-feature-name].png
```

## Storybook Integration

### Required Stories
Every component documentation should reference these Storybook stories:
1. **Component** - The component export
2. **ComponentOverview** - Initial visual overview
3. **AllVariations** - Comprehensive variation showcase
4. **Default** - Default/standard configuration
5. Additional stories as needed for behaviors, states, and specs

### Story Naming
- Use PascalCase for story names
- Be descriptive and specific
- Match the section where the story appears in docs

## Quality Checklist

**Use the comprehensive checklist to verify your documentation:**
📋 [Component Documentation Checklist](./component-documentation-checklist.md)

**Quick verification - before considering documentation complete, verify:**

- [ ] All sections from the template are present
- [ ] Component description is clear and accurate
- [ ] Usage Information includes both "When to Use" and "When Not to Use"
- [ ] Behavior section covers all interactive states
- [ ] Anatomy clearly identifies all component parts
- [ ] Specs include relevant measurements and values
- [ ] Best Practices has at least 2 do/don't pairs with images
- [ ] Accessibility lists all relevant features and requirements
- [ ] Code examples are tested and functional
- [ ] All Storybook story references work correctly
- [ ] Images are properly formatted and display correctly
- [ ] Links in Table of Contents work
- [ ] Grammar and spelling are correct

## Working with Existing Documentation

When updating or migrating existing documentation:

### Assessment
1. **Review existing content** - Identify what's already well-documented
2. **Compare to template** - Note missing sections vs. template
3. **Evaluate story references** - Check which stories exist and work well
4. **Preserve quality content** - Don't rewrite for the sake of it

### Migration Strategy
1. **Additive approach** - Add missing sections rather than replacing everything
2. **Preserve story references** - Keep existing story names that work
3. **Enhance incrementally** - Improve section by section
4. **Maintain continuity** - Don't break existing references or examples

### Story Reference Flexibility
- **ComponentOverview**: Can use existing stories if they showcase key variants
- **AllVariations**: For complex components, multiple smaller stories are acceptable
  - Not every component needs one comprehensive AllVariations story
  - Can reference multiple existing variation stories instead
  - Example: "See [Size Variations](#size-variations), [Style Variants](#style-variants), and [State Examples](#state-examples)"
- **Default**: Should always exist - enhance existing one rather than creating new

## Maintenance

Documentation should be updated when:
- Component API changes (new props, removed props, changed defaults)
- Visual design updates
- New variants or behaviors are added
- Accessibility features are enhanced
- Common questions or issues arise that should be documented
- Best practices evolve
- Migrating to current template standards

## Resources

- [Storybook MDX Documentation](https://storybook.js.org/docs/writing-docs/mdx)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- Reference: [KvIconButtonDocs.mdx](../src/vue/stories/KvIconButtonDocs.mdx)
