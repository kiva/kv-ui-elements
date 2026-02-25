# AI Stories Prompt

Use this prompt when generating Storybook stories with AI assistance.

---

## ⚠️ CRITICAL: ALWAYS Use the Template for MDX Documentation

**When creating any `.mdx` documentation file, you MUST use the template:**

📄 **Template Location:** `@kiva/kv-components/src/vue/.storybook/templates/ComponentDocs.template.mdx`

**This is NOT optional. Do NOT create freeform MDX documentation.**

The template provides:
- Consistent structure across all component documentation
- Required sections (Variations, Behavior, Anatomy, Specs, Best Practices, Accessibility)
- Proper Storybook imports and Meta configuration
- Do/Don't image comparison layout
- Controls integration

**Workflow for creating MDX files:**
1. Read the ComponentDocs.template.mdx file
2. Fill in ALL template placeholders with component-specific content
3. Use the exact section structure and headings from the template
4. Follow the established patterns for story references and code examples

---

## Prompt Template

### For Scaffolding a New Component

```
I need to scaffold a basic Storybook stories file for a new Vue 3 component that I'm just starting to build.

Component Name: {{ComponentName}}
Component File: @kiva/kv-components/src/vue/{{ComponentName}}.vue

Task: Create a minimal stories file to get started with interactive development.

Required:
1. Analyze the component's props, emits, and slots
2. Create the file structure with imports
3. Set up default export with title, component, and parameters
4. Create comprehensive argTypes for all props with appropriate controls
5. Create a Default story - the interactive playground
6. Add TODO comments for stories to be created later

**File Structure:**
```javascript
// TODO: Add ComponentOverview story showing key variants
// TODO: Add AllVariations story or multiple focused variation stories
// TODO: Add behavior/feature stories as component evolves
// TODO: Create ComponentNameDocs.mdx documentation (use the template)

import ComponentName from '../ComponentName.vue';
// NOTE: Only import docs if the file exists. Create a stub from the template,
// or omit this import + docs.page until docs are ready.
import ComponentNameDocsMdx from './ComponentNameDocs.mdx';

// IMPORTANT: Title must include a folder prefix (see guidance below)
export default {
  title: 'Folder Prefix/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      page: ComponentNameDocsMdx,
      title: 'Component Name Docs',
    },
  },
  argTypes: {
    // Comprehensive argTypes for all props
  },
};

**Storybook Folder Prefixes:**

All story titles MUST include a folder prefix to organize components in the Storybook sidebar. Use one of the existing prefixes below, or ask the user which prefix to use if none fit:

- **Base Styling/** - Style guide, theme provider, and foundational styling components
- **Charts/** - Chart and data visualization components (e.g., KvPieChart, KvLineGraph, KvTreeMapChart)
- **Checkout/** - Checkout flow components (e.g., KvAtbModal, KvCartModal, KvCartPill, KvCheckoutReceipt)
- **Comments/** - Comment-related components (e.g., KvCommentsAdd, KvCommentsList, KvCommentsListItem)
- **Components/** - General-purpose components that don't fit other categories (e.g., KvCarousel, KvLightbox, KvMap, KvUtilityMenu)
- **Forms/** - Form controls and input components (e.g., KvButton, KvCheckbox, KvTextInput, KvSelect, KvSwitch)
- **Interface Elements/** - General UI elements, indicators, and feedback components (e.g., KvToast, KvTooltip, KvProgressBar, KvLoadingSpinner)
- **Loan Display/** - Loan-specific display components (e.g., KvLoanInfoCard, KvClassicLoanCard, KvBorrowerImage)
- **Page Frame/** - Page layout and structural components (e.g., KvPageContainer, KvGrid, KvWwwHeader)

**CRITICAL DECISION POINT:**
- If the component clearly fits an existing category, use that prefix
- If uncertain or the component represents a new category, **ASK THE USER** which prefix to use or if a new folder prefix should be created
- Never omit the folder prefix

Example titles:
- `'Forms/KvButton'`
- `'Loan Display/KvLoanInfoCard'`
- `'Interface Elements/KvToast'`

// Default story - Interactive playground
export const Default = {
  args: {
    // All props with sensible defaults
  },
  render: (args) => ({
    components: { ComponentName },
    setup() {
      return { args };
    },
    template: `
      <div class="tw-bg-gray-50 tw-rounded-md tw-p-6 tw-inline-block">
        <component-name v-bind="args" @event="onEvent" />
      </div>
    `,
    methods: {
      onEvent(e) { console.log('Event:', e); },
    },
  }),
};
```

Guidelines:
- Focus on creating a working Default story first
- Include all props in argTypes with correct control types
- Add event handlers that log to console
- Use proper Vue 3 Composition API patterns
- Include TODOs for stories to add later
- The MDX import must point to an existing file; create a stub from the template or omit the docs import + docs.page until ready

Output:
A minimal, working stories file that enables interactive component development in Storybook.
```

---

### For Comprehensive Stories

```
I need to create comprehensive Storybook stories for a Vue 3 component in the @kiva/kv-components library.

Component Name: {{ComponentName}}
Component File: @kiva/kv-components/src/vue/{{ComponentName}}.vue
Documentation File: @kiva/kv-components/src/vue/stories/{{ComponentName}}Docs.mdx [May not exist yet]
Existing Stories: [None | Path to existing .stories.js file]

Please use the stories template located at:
@kiva/kv-components/src/vue/.storybook/templates/Component.stories.template.js

**IMPORTANT - If Documentation File Does Not Exist:**
1. Proceed with story creation as normal
2. **Do not import a missing MDX file**
3. Either create a stub MDX file from the template OR omit the docs import + docs.page block until docs exist
4. Add a TODO comment at the top of the file indicating documentation needs to be created
5. Base story structure on component props and common patterns
6. Create standard stories: ComponentOverview, AllVariations, Default

Generate a complete stories file by filling in all template placeholders with appropriate content based on the component's implementation and documented behaviors.

Required steps:
1. Analyze the component's props, events, slots, and implementation
2. Review the MDX documentation to understand required stories
3. Fill in ALL template variables with specific, working code
4. Create proper argTypes for all component props
5. Implement all required stories (ComponentOverview, AllVariations, Default)
6. Add additional stories for behaviors/features mentioned in the docs
7. Ensure all reactive state is managed correctly
8. Include proper event handlers that log to console

Template Variables to Fill:

**Imports:**
- {{mdiIconImports}} - Import statements for MDI icons (if needed), e.g., `mdiClose, mdiMenu, mdiPlus`
- {{ComponentName}} - Component name (e.g., KvButton, KvModal)

**Story Configuration:**
- {{folderPrefix}} - Storybook folder prefix (see prefix guidance below)
- {{argTypes}} - Complete argTypes object with controls for all props

**Storybook Folder Prefixes:**

All story titles MUST include a folder prefix. Use one of the existing prefixes below, or ask the user which prefix to use if none fit:

- **Base Styling/** - Style guide, theme provider, and foundational styling components
- **Charts/** - Chart and data visualization components (e.g., KvPieChart, KvLineGraph, KvTreeMapChart)
- **Checkout/** - Checkout flow components (e.g., KvAtbModal, KvCartModal, KvCartPill, KvCheckoutReceipt)
- **Comments/** - Comment-related components (e.g., KvCommentsAdd, KvCommentsList, KvCommentsListItem)
- **Components/** - General-purpose components that don't fit other categories (e.g., KvCarousel, KvLightbox, KvMap, KvUtilityMenu)
- **Forms/** - Form controls and input components (e.g., KvButton, KvCheckbox, KvTextInput, KvSelect, KvSwitch)
- **Interface Elements/** - General UI elements, indicators, and feedback components (e.g., KvToast, KvTooltip, KvProgressBar, KvLoadingSpinner)
- **Loan Display/** - Loan-specific display components (e.g., KvLoanInfoCard, KvClassicLoanCard, KvBorrowerImage)
- **Page Frame/** - Page layout and structural components (e.g., KvPageContainer, KvGrid, KvWwwHeader)

**CRITICAL DECISION POINT:**
- If the component clearly fits an existing category, use that prefix
- If uncertain or the component represents a new category, **ASK THE USER** which prefix to use or if a new folder prefix should be created
- Never omit the folder prefix

**ComponentOverview Story:**
- {{dataSection}} - data() function if reactive state needed (optional, remove if not needed)
- {{setupSection}} - setup() function with icons/constants
- {{componentOverviewTemplate}} - Template showing 2-4 simple component examples with labels

**AllVariations Story:**
- {{allVariationsDataSection}} - data() function for reactive state (if needed)
- {{allVariationsSetupSection}} - setup() function with icons/constants
- {{allVariationsTemplate}} - Comprehensive template showing all variants in organized grid layout

**Additional Stories:**
- {{additionalStories}} - Additional named exports for behavior/feature stories referenced in the MDX docs

**Default Story:**
- {{defaultArgs}} - All props with sensible default values
- {{defaultTemplate}} - Template with component using v-bind="args"
- {{defaultMethods}} - methods object with event handlers (if needed)

Guidelines:
- **PRESERVE existing stories** - Don't recreate stories that already exist and work well
- **Default story is sacred** - If a Default story exists, keep it and enhance if needed
- **Reuse existing stories** - Use existing stories in documentation where appropriate
- For ComponentOverview: If suitable existing stories can serve this purpose, reference them instead of creating new ones
- For AllVariations: **This may be too complex for large components**
  - Check if similar comprehensive variation stories exist
  - If component has many variations, consider using multiple existing stories instead
  - Only create AllVariations if no suitable alternatives exist and component is manageable
  - It's acceptable to reference multiple smaller variation stories in docs instead
- Use actual prop names and types from the component
- Match story names to references in the MDX documentation file
- Follow Vue 3 Composition API patterns
- Use CSF3 format for all stories
- Include console.log in event handlers for debugging
- Use consistent Tailwind styling (tw-bg-gray-50, tw-p-6, etc.)
- Ensure all reactive state uses data() function
- Put non-reactive data (icons, constants) in setup()
- Use v-model for two-way binding where appropriate
- Add descriptive text and labels within story templates
- Make Default story a fully interactive playground

Specific Requirements:
- Import only icons actually used in the stories
- Include proper control types for each prop in argTypes
- Create separate data properties for each interactive instance
- Use descriptive variable names (isToggledSmall, currentValue, etc.)
- Include explanatory text in templates using tw-text-small
- Ensure all stories have proper gray background containers
- Test that v-bind and event handlers work correctly

Story Naming:
All story names must match references in the MDX file. Common story names:
- ComponentOverview
- AllVariations
- Default
- [Feature]States (e.g., IconButtonStates)
- [Feature]Demo (e.g., ToggleableButton)
- [Feature]Visualization (e.g., TouchTargetVisualization)

Output:
A complete, working .stories.js file ready to save as {{ComponentName}}.stories.js
```

---

### For Adding Documentation Stories to Existing Story Files

```
I need to add specific stories to an existing Storybook file to support MDX documentation.

Component Name: {{ComponentName}}
Existing Stories: @kiva/kv-components/src/vue/stories/{{ComponentName}}.stories.js
Documentation File: @kiva/kv-components/src/vue/stories/{{ComponentName}}Docs.mdx
Component File: @kiva/kv-components/src/vue/{{ComponentName}}.vue

⚠️ CRITICAL RULES:
1. **DO NOT convert or modify existing stories** - Leave all existing stories in their current format (CSF2 or CSF3)
2. **DO NOT refactor or rename existing stories** - They are working and should remain untouched
3. **ONLY add new stories** that are specifically referenced in the MDX documentation but don't exist

Task:
1. Read the existing stories file and list all current story exports
2. Read the MDX documentation file and identify story references (e.g., `<Story of={Stories.ComponentOverview} />`)
3. Compare the two lists to find stories referenced in docs but missing from the stories file
4. Add ONLY the missing stories with exact names matching the MDX references
5. Use CSF3 format for new stories only

Story Names to Check For:
- `ComponentOverview` - Simple visual showcase (2-4 examples with labels)
- `AllVariations` - Comprehensive variant grid (only if practical)
- Feature-specific stories referenced in Behavior/Specs sections of MDX

Format for New Stories:
```javascript
// Add after existing stories - DO NOT modify anything above

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

Output:
- List of existing stories (unchanged)
- List of stories referenced in MDX documentation
- New stories to add (with complete code)
- Confirmation that no existing stories were modified
```

---

### For Creating MDX Documentation

```
⚠️ CRITICAL: I need to create comprehensive MDX documentation using the required template.

Component Name: {{ComponentName}}
Component File: @kiva/kv-components/src/vue/{{ComponentName}}.vue
Stories File: @kiva/kv-components/src/vue/stories/{{ComponentName}}.stories.js
**TEMPLATE FILE: @kiva/kv-components/src/vue/.storybook/templates/ComponentDocs.template.mdx**

**MANDATORY REQUIREMENT: Use the ComponentDocs.template.mdx template structure.**

Task:
1. Read and understand the ComponentDocs.template.mdx template structure
2. Analyze the component's props, events, slots, and behavior
3. Review the stories file to see what stories are available
4. Fill in ALL template placeholders with component-specific content:
   - {{ComponentName}} - Component name
   - {{componentDescription}} - Brief component description
   - {{componentOverviewDescription}} - Overview section text
   - {{variationsDescription}} - Variations section text
   - {{whenToUseList}} - Bullet list of when to use
   - {{whenNotToUseList}} - Bullet list of when not to use
   - {{behaviorDescription}} - Behavior section text
   - {{BehaviorSubsection1Title}} / {{BehaviorSubsection2Title}} - Behavior subsection titles
   - {{BehaviorSubsection1StoryName}} / {{BehaviorSubsection2StoryName}} - Story references
   - {{anatomyDescription}} - Anatomy description
   - {{anatomyBulletList}} - Component parts list
   - {{specsSubsection1Title}} / {{specsSubsection2Title}} - Specs subsection titles
   - {{bestPractice*ImageFileName}} - Image file names for best practices
   - {{bestPractice*DoDescription}} / {{bestPractice*DontDescription}} - Do/Don't descriptions
   - {{accessibilityBulletList}} - Accessibility features list
   - {{codeExample*Title}} / {{codeExample*}} - Code examples

**DO NOT:**
- Create a freeform MDX file without using the template
- Skip any template sections
- Change the template structure or section order
- Omit the Table of Contents
- Remove the Best Practices Do/Don't comparison layout
- Forget to use Controls component for the Default story

**DO:**
- Follow the exact template structure
- Fill in all placeholders with meaningful content
- Reference actual stories created in the .stories.js file
- Create appropriate subsections for Behavior and Specs
- Use proper Storybook import syntax from template
- Include comprehensive code examples

Output:
A complete {{ComponentName}}Docs.mdx file following the exact template structure with all placeholders filled in.
```

---

## Recommended Creation Order

### Option 1: Scaffold First (Recommended for new components)
1. Create component implementation (props, emits, basic template)
2. **Scaffold stories file with Default story only** (use "For Scaffolding" prompt above)
3. Develop component interactively in Storybook
4. Add ComponentOverview and variation stories as component matures
5. Create comprehensive documentation
6. Add remaining behavior/feature stories

**Advantages:**
- Start testing immediately with minimal setup
- Interactive development from day one
- Build stories incrementally as features are added
- Default story guides prop design

### Option 2: Complete Stories First (Better for stable components)
1. Create component implementation
2. Create comprehensive stories file (ComponentOverview, AllVariations, Default)
3. Test stories in Storybook
4. Create documentation referencing the stories
5. Add any additional behavior stories as needed

**Advantages:**
- Visual feedback while building component
- Stories inform documentation structure
- Can test component interactively before documenting

### Option 3: Documentation First (Better for complex components)
1. Create component implementation
2. Create documentation outlining all required stories
3. Create stories file implementing documented stories
4. Test and refine both docs and stories

**Advantages:**
- Documentation drives story requirements
- Better for components with many behaviors
- Clear specification before implementation

### Option 3: Parallel Development
1. Create component implementation
2. Create basic stories (at least Default)
3. Create documentation with story placeholders
4. Fill in missing stories
5. Enhance documentation

**Note:** All approaches are valid. For new components, **Option 1 (Scaffold First)** is recommended for fastest iteration.

## Handling Missing Files

### When Documentation Doesn't Exist Yet
Stories can safely reference the MDX file even if it doesn't exist:
```javascript
import ComponentNameDocsMdx from './ComponentNameDocs.mdx'; // Will be created later

export default {
  title: 'ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      page: ComponentNameDocsMdx, // Reference is fine
    },
  },
};
```
Add a TODO comment at the top:
```javascript
// TODO: Create ComponentNameDocs.mdx documentation file
// Required sections: Component Overview, Variations, Usage Information, etc.
```

### When Stories Don't Exist Yet
Documentation can reference stories that will be created:
```mdx
<!-- TODO: Create these stories in ComponentName.stories.js:
  - ComponentOverview
  - AllVariations
  - Default
  - [List any behavior-specific stories needed]
-->

<Story of={ComponentNameStories.ComponentOverview} />
```

## Usage Instructions

### For Scaffolding New Components
1. **Copy the "For Scaffolding a New Component" prompt**
2. **Replace `{{ComponentName}}`** with your component name
3. **Provide the AI with:**
   - The component source file (even if incomplete)
4. **Result:** Minimal stories file with Default story to start development
5. **Add more stories** as component matures using other prompts

### For Complete Story Creation
1. **Copy the "For Comprehensive Stories" prompt template**
2. **Replace `{{ComponentName}}`** with your actual component name
3. **Provide the AI with access to:**
   - The component source file (to understand props, events, slots)
   - The MDX documentation file (to see what stories are referenced)
   - The template file
   - Reference stories file (like KvIconButton.stories.js)
4. **Review and test** the generated stories in Storybook
5. **Verify all controls work** in the Default story
6. **Check console logs** for event handlers
7. **Ensure story names match** MDX references

### For Enhancing Existing Stories
1. **Copy the "For Enhancing Existing Stories" prompt**
2. **Provide both the existing stories file and documentation**
3. **Review suggestions** for what to preserve vs. add
4. **Apply changes incrementally**

## Tips for Best Results

### For Scaffolding (New Components)
- Provide component file even if implementation is incomplete
- Focus on getting props and emits defined first
- The Default story will help you develop interactively
- Add more stories later as features are built
- Don't worry about ComponentOverview or AllVariations yet

### For Complete Stories
**Context Provision:**
- Share the full component Vue file with props, emits, and implementation
- Include the complete MDX documentation file
- Mention any special interactive features (toggles, v-model, complex state)
- Reference existing good stories as examples (KvIconButton.stories.js)

**Iteration Approach:**
Generate in stages if the component is complex:
1. First pass: Basic structure and required stories
2. Second pass: Add behavior/feature stories
3. Third pass: Refine argTypes and interactivity

**Common Adjustments:**
After generation, typically need to:
- Test all interactive controls in Storybook
- Verify story names match MDX references exactly
- Check that v-model bindings work correctly
- Ensure event handlers log properly to console
- Test responsive layouts at different screen sizes
- Verify all variants show correctly in AllVariations
- Check that Default story allows full prop experimentation

### Review Checklist

**For Scaffolded Stories (Minimal):**
- [ ] File structure is correct with imports
- [ ] Default export configured properly
- [ ] argTypes include all props with correct control types
- [ ] Default story exists and works interactively
- [ ] Event handlers log to console
- [ ] TODO comments are clear about what to add later
- [ ] No syntax errors

**For Complete Stories:**
- [ ] All template variables replaced with working code
- [ ] Story names match MDX file references exactly
- [ ] argTypes include all component props with correct control types
- [ ] ComponentOverview is simple and clear (2-4 examples)
- [ ] AllVariations shows every variant in organized layout
- [ ] Default story has all props and works interactively
- [ ] Additional behavior stories match documented features
- [ ] Reactive state uses data() function
- [ ] Non-reactive data uses setup() function
- [ ] Event handlers log to console
- [ ] No syntax errors or linting issues
- [ ] No placeholder text remains (search for `{{`)
- [ ] Consistent Tailwind styling throughout
- [ ] All imports are used and necessary

## Example Command

For a hypothetical KvModal component:

```
Generate Storybook stories for KvModal using the template at
@kiva/kv-components/src/vue/.storybook/templates/Component.stories.template.js

Component: @kiva/kv-components/src/vue/KvModal.vue
Documentation: @kiva/kv-components/src/vue/stories/KvModalDocs.mdx

This modal component has:
- Props: size (small, medium, large), showCloseButton, preventBackdropClose
- Events: @close, @open
- Slots: header, default (body), footer
- v-model for showing/hiding
- ESC key handling

The MDX file references these stories:
- ComponentOverview
- AllVariations
- Default
- ModalStates
- WithSlots
- KeyboardInteraction

Follow all guidelines in the prompt template above.
```

## Advanced: Story Composition

For components with many variations, consider organizing stories by feature:

```javascript
// Base story configuration
const baseStory = {
	render: (args) => ({
		components: { ComponentName },
		setup() { return { args }; },
		template: `<component-name v-bind="args" />`,
	}),
};

// Extend for specific variants
export const WithIcon = {
	...baseStory,
	args: { icon: mdiIcon, size: 'medium' },
};

export const Loading = {
	...baseStory,
	args: { loading: true, size: 'medium' },
};
```

## Testing Generated Stories

### Manual Testing Checklist
1. **Open Storybook** and navigate to the component
2. **ComponentOverview**: Verify all examples render correctly
3. **AllVariations**: Check that all variants display properly
4. **Default**: Test each interactive control
5. **Additional Stories**: Verify behavior matches description
6. **Console**: Check for errors and that event handlers log correctly
7. **Responsive**: Test at different viewport sizes
8. **Documentation**: Verify stories match MDX references

### Common Issues and Fixes

**Story not appearing:**
- Check that export statement is correct
- Verify story name doesn't conflict with reserved words

**Controls not working:**
- Check argTypes configuration
- Ensure args are passed through v-bind
- Verify prop names match component definition

**Reactivity not working:**
- Move reactive state to data() function
- Check v-model syntax
- Verify event handlers are bound correctly

**Icons not displaying:**
- Check import statements
- Verify icon names are correct
- Ensure icons are returned from setup()

**Template errors:**
- Check for missing closing tags
- Verify Tailwind classes are correct
- Ensure Vue syntax is valid

## Verify Your Work

**After creating or updating stories and documentation, use the checklist:**
📋 [Component Documentation Checklist](./component-documentation-checklist.md)

The checklist covers both stories and documentation to ensure nothing is missed.

## Maintenance

Update this prompt when:
- Template structure changes
- New story patterns emerge
- CSF format updates
- Common generation issues are identified
- Best practices evolve

## Component-Specific Considerations

### Form Components
- Include v-model examples
- Show validation states
- Demonstrate error messages
- Test keyboard navigation

### Interactive Components
- Show all interaction states
- Include loading states
- Demonstrate disabled behavior
- Test event handlers

### Layout Components
- Show with various content lengths
- Demonstrate responsive behavior
- Test with and without optional slots

### Complex Components
- Break into multiple focused stories
- Show common use cases
- Provide complete working examples
- Document any special setup needed
