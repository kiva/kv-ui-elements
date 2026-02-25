# AI Documentation Prompt

Use this prompt when generating component documentation with AI assistance.

---

## ⚠️ CRITICAL: ALWAYS Use the ComponentDocs.template.mdx Template

**When creating any component `.mdx` documentation file, you MUST use the template:**

📄 **Template Location:** `@kiva/kv-components/src/vue/.storybook/templates/ComponentDocs.template.mdx`

**This is NOT optional. Do NOT create freeform MDX documentation.**

The template provides:
- Consistent structure across all component documentation
- Required sections (Variations, Usage Information, Behavior, Anatomy, Specs, Best Practices, Accessibility)
- Proper Storybook imports and Meta configuration
- Table of Contents with navigation
- Do/Don't best practices layout
- Controls integration for interactive demos

**Every `.mdx` file MUST:**
1. Start by reading the ComponentDocs.template.mdx file
2. Fill in ALL template placeholders with component-specific content
3. Use the exact section structure and headings from the template
4. Follow the established patterns for story references and code examples
5. Include all required sections (do not skip sections)

---

## Prompt Template

### For New Documentation

```
I need to create comprehensive Storybook documentation for a Vue 3 component in the @kiva/kv-components library.

Component Name: {{ComponentName}}
Component File: @kiva/kv-components/src/vue/{{ComponentName}}.vue
Story File: @kiva/kv-components/src/vue/stories/{{ComponentName}}.stories.js [May not exist yet]
Existing Documentation: [None | Path to existing MDX file]

Please use the documentation template located at:
@kiva/kv-components/src/vue/.storybook/templates/ComponentDocs.template.mdx

**IMPORTANT - If Story File Does Not Exist:**
1. Create a **stub** `.stories.js` file first (use the stories template with minimal working exports)
2. Ensure the stub exports all story names referenced in the MDX (ComponentOverview, AllVariations, Default, etc.)
3. Then proceed with documentation creation
4. Add a TODO comment at the top indicating which stories need to be fully implemented
5. The documentation can guide story creation later, but the file must exist to avoid MDX import errors

**IMPORTANT:** If existing documentation exists:
1. Analyze the existing MDX file structure and content
2. Compare it against the template structure
3. Identify what sections are missing or need updates
4. Preserve existing quality content, stories references, and examples
5. Provide a migration plan to bring documentation up to current standards
6. Suggest which existing stories can be reused vs. which need to be created

Generate a complete MDX documentation file by filling in all template placeholders with appropriate content based on the component's implementation.

Required steps:
1. Analyze the component's props, slots, events, and implementation
2. Identify all variants and states
3. Fill in ALL template variables with specific, accurate content
4. Ensure story references match the existing story file
5. Create meaningful code examples using realistic prop values
6. Write clear, actionable usage guidelines
7. Document all accessibility features present in the component

Template Variables to Fill:

**Basic Info:**
- {{folderPrefix}} - Storybook folder prefix for the component (see prefix guidance below)
- {{ComponentName}} - Component name (e.g., KvButton, KvModal)
- {{componentDescription}} - One-sentence component purpose
- {{componentOverviewDescription}} - Brief paragraph about the component

**Storybook Folder Prefixes:**

The MDX `<Meta title="..." />` MUST include a folder prefix matching the component's `.stories.js` file. See **[Storybook Folder Prefixes](./storybook-folder-prefixes.md)** for the full list of prefixes, guidelines, and examples. If uncertain about which prefix to use, **ASK THE USER**.

**Variations:**
- {{variationsDescription}} - Describe all available variations

**Usage:**
- {{usageInformationDescription}} - Main description of component usage
- {{whenToUseList}} - Bullet list of appropriate use cases
- {{whenNotToUseList}} - Bullet list of when NOT to use this component

**Behavior:**
- {{behaviorDescription}} - Overall behavior description
- {{BehaviorSubsection1Title}} - First behavior subsection title
- {{behaviorSubsection1Description}} - Description for first behavior
- {{BehaviorSubsection1StoryName}} - Story name for first behavior demo
- {{BehaviorSubsection2Title}} - Second behavior subsection title
- {{behaviorSubsection2Description}} - Description for second behavior
- {{BehaviorSubsection2StoryName}} - Story name for second behavior demo

**Anatomy:**
- {{anatomyDescription}} - Brief intro to component structure
- {{anatomyBulletList}} - Markdown bullet list of component parts

**Specs:**
- {{SpecsSubsection1Title}} - First specs subsection title
- {{specsSubsection1Description}} - Description for first spec
- {{SpecsSubsection1StoryName}} - Story name for first spec demo
- {{SpecsSubsection2Title}} - Second specs subsection title
- {{specsSubsection2Description}} - Description for second spec

**Best Practices:**
- {{bestPractice1ImageFileName}} - Image filename for first "Do" example
- {{bestPractice1DoDescription}} - Description for first "Do"
- {{bestPractice1DontImageFileName}} - Image filename for first "Don't"
- {{bestPractice1DontDescription}} - Description for first "Don't"
- {{bestPractice2ImageFileName}} - Image filename for second "Do"
- {{bestPractice2DoDescription}} - Description for second "Do"
- {{bestPractice2DontImageFileName}} - Image filename for second "Don't"
- {{bestPractice2DontDescription}} - Description for second "Don't"

**Accessibility:**
- {{accessibilityBulletList}} - Markdown bullet list of accessibility features

**Code Examples:**
- {{codeExample1Title}} - Title for first example
- {{codeExample1}} - Complete Vue code for first example
- {{codeExample2Title}} - Title for second example
- {{codeExample2}} - Complete Vue code for second example
- {{codeExample3Title}} - Title for third example
- {{codeExample3}} - Complete Vue code for third example

Guidelines:
- Use actual prop names and values from the component
- **PRESERVE existing story references** from the .stories.js file - don't rename stories that already exist
- **Reuse existing Default story** rather than creating a new one
- **Use existing stories** for ComponentOverview if suitable stories exist
- For AllVariations: If component is complex or has many existing variation stories, use multiple existing stories instead of requiring one comprehensive AllVariations story
- Follow the style and tone of existing documentation (see KvIconButtonDocs.mdx)
- Be specific and actionable in all descriptions
- Use realistic, practical code examples
- Include image placeholders with descriptive filenames using kebab-case
- Ensure all accessibility features are documented
- Adapt the template structure if needed (add/remove subsections based on component complexity)

Output:
A complete MDX file ready to save as {{ComponentName}}Docs.mdx

**After completion, verify using:**
📋 [Component Documentation Checklist](./component-documentation-checklist.md)

---

### For Migrating Existing Documentation

```
I need to migrate existing Storybook documentation to our current template standards.

Component Name: {{ComponentName}}
Existing Documentation: @kiva/kv-components/src/vue/stories/{{ComponentName}}Docs.mdx
Story File: @kiva/kv-components/src/vue/stories/{{ComponentName}}.stories.js
Template: @kiva/kv-components/src/vue/.storybook/templates/ComponentDocs.template.mdx

Task:
1. Analyze the existing documentation against the template
2. Identify missing sections (Variations, Usage Information, Behavior, Anatomy, Specs, Best Practices, Accessibility, etc.)
3. Preserve all existing content, story references, and code examples
4. Enhance with missing sections following template structure
5. Maintain existing story names - do NOT rename or create new stories unnecessarily
6. Update structure to match template where possible without losing valuable content
7. Identify which new stories (if any) need to be created

Migration Approach:
- Keep what works: Preserve existing quality content
- Fill the gaps: Add missing required sections
- Standardize format: Adjust to template structure where beneficial
- Maintain continuity: Don't break existing story references

Output:
- Updated MDX file with enhanced documentation
- List of existing stories that are working well
- List of new stories needed (if any)
- Summary of changes made
```

---

## Recommended Creation Order

See [Component Stories Guide - Recommended Creation Order](./ai-stories-prompt.md#recommended-creation-order) for detailed workflow options.

**Quick Reference:**
- **Stories First**: Create stories → Test in Storybook → Document
- **Documentation First**: Document requirements → Create stories
- **Parallel**: Basic stories → Documentation → Fill gaps

## Handling Missing Files

### When Stories Don't Exist Yet
1. **Create a stub stories file first** - The MDX import requires it
2. **Reference standard story names** - ComponentOverview, AllVariations, Default, etc.
3. **Add TODO comments** - Clearly list required stories to flesh out
4. **Provide clear guidance** - Describe what each story should show

**Example TODO comment:**
```mdx
<!--
TODO: Create the following stories in ComponentName.stories.js:

1. ComponentOverview - Show 2-4 key variants (bare, with background, with border, toggle)
2. AllVariations - Comprehensive showcase of all sizes and styles
3. Default - Interactive playground with all props
4. ComponentStates - Show enabled, hover, active, disabled states
5. SpecialFeature - Demonstrate [specific behavior]

See ai-stories-prompt.md for story creation guidance.
-->
```

### When Component File Is Incomplete
If the component implementation is missing features:
1. Document the **intended** behavior
2. Add notes about features that need implementation
3. Mark sections as "Coming Soon" or "Planned"
4. Create story placeholders for future features

## Usage Instructions

1. **Copy the prompt template above**
2. **Replace `{{ComponentName}}`** with your actual component name
3. **Provide the AI with access to:**
   - The component source file
   - The existing story file
   - The template file
   - Reference documentation (like KvIconButtonDocs.mdx)
4. **Review and refine** the generated documentation
5. **Test all story references** to ensure they work
6. **Add images** for Best Practices section
7. **Verify code examples** are functional

## Tips for Best Results

### Context Provision
- Share the full component file content
- Include the complete stories file
- Reference existing good documentation as examples
- Mention any special features or complexity

### Iteration Approach
Generate in stages if needed:
1. First pass: Basic structure and content
2. Second pass: Refine descriptions and examples
3. Third pass: Add missing details, verify accuracy

### Common Adjustments
After generation, typically need to:
- Add or adjust story references to match actual story names
- Create actual image files for Best Practices
- Fine-tune code examples for clarity
- Add domain-specific Kiva context
- Adjust accessibility details based on actual implementation

### Review Checklist
- [ ] All template variables replaced with real content
- [ ] Story references match actual story names in .stories.js
- [ ] Code examples use correct prop names and types
- [ ] Accessibility section reflects actual implementation
- [ ] Usage guidelines are specific to this component
- [ ] Best Practices are relevant and actionable
- [ ] No placeholder text remains (search for `{{`)

## Example Command

For a hypothetical KvModal component:

```
Generate documentation for KvModal using the template at
@kiva/kv-components/src/vue/.storybook/templates/ComponentDocs.template.mdx

Component: @kiva/kv-components/src/vue/KvModal.vue
Stories: @kiva/kv-components/src/vue/stories/KvModal.stories.js

This is a modal dialog component with:
- Size variants (small, medium, large)
- Optional close button
- Header, body, and footer slots
- Backdrop click to close
- ESC key handling
- Focus trap when open

Follow all guidelines in the prompt template above.
```

## Advanced: Batch Generation

For generating documentation for multiple components:

1. Create a list of components needing documentation
2. Use the same prompt template for each
3. Process 2-3 at a time to maintain quality
4. Review and refine each before moving to the next batch
5. Maintain consistency across all generated docs

## Maintenance

Update this prompt when:
- Template structure changes
- New documentation patterns emerge
- Common generation issues are identified
- Documentation standards evolve
