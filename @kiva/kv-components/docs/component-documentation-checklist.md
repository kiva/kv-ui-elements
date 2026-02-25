# Component Documentation Checklist

Use this checklist to ensure comprehensive, high-quality component documentation.

## Pre-Documentation

- [ ] Component implementation is stable
- [ ] Component has a corresponding `.stories.js` file with all necessary stories
- [ ] Component props are well-defined with TypeScript types or PropTypes
- [ ] Component is tested and working correctly
- [ ] Design specifications are available (if applicable)

## Existing Documentation Assessment (if applicable)

- [ ] Existing MDX file reviewed
- [ ] Existing content quality evaluated
- [ ] Existing story references inventoried
- [ ] Missing sections identified
- [ ] Migration plan created (additive approach)
- [ ] Existing quality content marked for preservation
- [ ] Existing story names documented (to preserve references)

## Documentation File Setup

- [ ] **CRITICAL: Template used** - ComponentDocs.template.mdx structure followed exactly
- [ ] MDX file created in `src/vue/stories/[ComponentName]Docs.mdx`
- [ ] Correct imports for Storybook blocks (Canvas, Meta, Story, Controls)
- [ ] Story file imported correctly (`import * as ComponentStories from './Component.stories.js'`)
- [ ] Meta tag includes folder prefix matching the .stories.js file (see [Storybook Folder Prefixes](./storybook-folder-prefixes.md))
- [ ] If uncertain about prefix, asked for clarification or checked existing similar components
- [ ] Meta tag configured with component reference
- [ ] **No freeform MDX structure** - All template sections present

## Content Sections

### Header & Overview
- [ ] Component name as H1
- [ ] Clear, concise one-sentence description
- [ ] Component Overview section with description paragraph
- [ ] ComponentOverview story displayed

### Table of Contents
- [ ] **CRITICAL: Table of Contents present** with all section links
- [ ] All major sections linked (Variations, Usage Information, Behavior, Anatomy, Specs, Best Practices, Accessibility, Component Properties + Demo, Code Examples)
- [ ] Links are functional (test by clicking)
- [ ] Section order matches actual content
- [ ] Proper markdown anchor link format used

### Variations
- [ ] **CRITICAL: "Variations" heading (not "All Variations")**
- [ ] Description paragraph explaining available variations
- [ ] AllVariations story displayed OR multiple focused variation stories used
- [ ] All size variants documented
- [ ] All style variants documented
- [ ] All functional variants documented
- [ ] For complex components: Multiple smaller variation stories acceptable
- [ ] Horizontal rule (---) after this section

### Usage Information
- [ ] **CRITICAL: "Usage Information" heading (not "Usage Guidelines")**
- [ ] Main usage description provided
- [ ] **"When to Use" subsection** with 3-5 bullet points
- [ ] **"When Not to Use" subsection** with 3-5 bullet points
- [ ] Examples are specific and actionable
- [ ] Guidance considers accessibility and UX
- [ ] Horizontal rule (---) after this section

### Behavior
- [ ] Overall behavior described
- [ ] Interactive states documented (hover, active, focus, disabled)
- [ ] At least 2 behavior subsections
- [ ] Each subsection has a descriptive title
- [ ] Each subsection has clear description
- [ ] Each behavior demonstrated with a story
- [ ] State transitions explained
- [ ] User interaction patterns described

### Anatomy
- [ ] **CRITICAL: "Anatomy" heading present**
- [ ] Brief intro paragraph
- [ ] Component parts listed with bullet points
- [ ] Each part clearly described
- [ ] Props that control each part referenced
- [ ] Slot usage explained (if applicable)
- [ ] Horizontal rule (---) after this section

### Specs
- [ ] **CRITICAL: "Specs" heading present**
- [ ] At least 2 specs subsections
- [ ] Touch target sizes documented (minimum 44x44px)
- [ ] Spacing guidelines provided
- [ ] Typography specs included (if applicable)
- [ ] Color/theming information (if applicable)
- [ ] Responsive behavior noted (if applicable)
- [ ] Visual story demonstrations where helpful
- [ ] Horizontal rule (---) after this section

### Best Practices
- [ ] **CRITICAL: "Best Practices" heading present**
- [ ] **CRITICAL: Grid layout with Do/Don't pairs** (not bullet list)
- [ ] At least 2 do/don't pairs
- [ ] Grid layout code from template used
- [ ] Each item has an image placeholder with proper path
- [ ] Image filenames follow naming convention (KvComponentName/Do-description.png)
- [ ] Each "Do" has ✓ symbol and green color (#2e7d32)
- [ ] Each "Don't" has ✗ symbol and red color (#c62828)
- [ ] Each item has clear, concise description (1-2 sentences)
- [ ] Practices are actionable and specific
- [ ] Common mistakes addressed
- [ ] Horizontal rule (---) after this section

### Accessibility
- [ ] Bullet list format
- [ ] All ARIA attributes documented
- [ ] Keyboard navigation support listed
- [ ] Screen reader behavior described
- [ ] Focus management explained
- [ ] Touch target sizes mentioned
- [ ] Disabled state handling noted
- [ ] Color contrast requirements (if applicable)

### Component Properties + Demo
- [ ] **CRITICAL: "Component Properties + Demo" heading (not "Interactive Playground")**
- [ ] Canvas component displayed with Default story
- [ ] Controls component displayed with Default story
- [ ] Default story shows typical usage
- [ ] All props visible in controls
- [ ] Horizontal rule (---) after this section

### Code Examples
- [ ] **CRITICAL: "Code Examples" heading present**
- [ ] **CRITICAL: At least 3 code examples** (not inline examples scattered throughout)
- [ ] Examples progress from simple to complex
- [ ] Each example has a descriptive ### heading
- [ ] Code is syntactically correct
- [ ] Code uses realistic prop values
- [ ] Code follows Vue best practices
- [ ] Examples cover common use cases
- [ ] Examples are copy-paste ready
- [ ] Vue code blocks specified with ```vue
- [ ] No horizontal rule after this section (end of document)

## Technical Quality

- [ ] All story references are valid
- [ ] No broken links
- [ ] No template placeholders remaining (`{{` syntax)
- [ ] MDX syntax is valid (no errors in Storybook)
- [ ] Images display correctly (or placeholders noted)
- [ ] Code blocks have correct language specified

## Content Quality

- [ ] Writing is clear and concise
- [ ] Terminology is consistent throughout
- [ ] Grammar and spelling are correct
- [ ] Tone matches existing documentation
- [ ] Technical accuracy verified
- [ ] No assumptions about user knowledge
- [ ] Jargon is explained or avoided

## Visual Assets

- [ ] Image folder created in `public/[ComponentName]/`
- [ ] All referenced images exist or are documented as needed
- [ ] Images use descriptive kebab-case filenames
- [ ] Images are optimized for web
- [ ] Alt text provided (or marked decorative)

## Storybook Stories

Verify these stories exist in the `.stories.js` file:
- [ ] Component (export)
- [ ] ComponentOverview
- [ ] AllVariations
- [ ] Default
- [ ] Behavior demonstration stories (as referenced)
- [ ] Specs demonstration stories (as referenced)
- [ ] Additional stories as needed

## Cross-Reference Checks

- [ ] Component name matches across all files
- [ ] Prop names match component implementation
- [ ] Story names match between docs and stories file
- [ ] Code examples use correct prop names
- [ ] Accessibility features match implementation

## Testing

- [ ] View documentation in Storybook
- [ ] Verify all stories render correctly
- [ ] Test all interactive controls
- [ ] Click all TOC links
- [ ] Verify code examples in actual implementation
- [ ] Check responsive layout of Best Practices grid
- [ ] Test with screen reader (if possible)

## Final Review

- [ ] Compare to reference documentation (KvIconButtonDocs.mdx)
- [ ] Verify completeness against this checklist
- [ ] Get peer review (if available)
- [ ] Address all feedback
- [ ] Run final read-through for clarity

## Post-Documentation

- [ ] Update component AGENTS.md if needed
- [ ] Add any new patterns to documentation guide
- [ ] Note any template improvements needed
- [ ] Document any component-specific quirks for future reference

## Common Issues to Watch For

- [ ] ⚠️ **Template not followed - freeform MDX structure created**
- [ ] ⚠️ **Missing Table of Contents**
- [ ] ⚠️ **Wrong section headings** (e.g., "All Variations" instead of "Variations")
- [ ] ⚠️ **Best Practices as bullet list** instead of Do/Don't grid layout
- [ ] ⚠️ **Code examples inline** instead of in dedicated "Code Examples" section
- [ ] ⚠️ **Missing required sections** (Anatomy, Specs, Usage Information, etc.)
- [ ] ⚠️ **Missing horizontal rules** (---) between major sections
- [ ] ⚠️ Story name typos (story reference doesn't match actual story)
- [ ] ⚠️ Incorrect prop names in code examples
- [ ] ⚠️ Missing accessibility documentation
- [ ] ⚠️ Vague or generic usage guidance
- [ ] ⚠️ Code examples that don't work
- [ ] ⚠️ Broken image links
- [ ] ⚠️ Missing behavior subsections for complex components
- [ ] ⚠️ Specs section without actual specifications
- [ ] ⚠️ Template placeholders not replaced ({{}})

---

## Quick Reference: Minimum Requirements

Every component documentation MUST have:
1. ✅ **Follow ComponentDocs.template.mdx structure exactly**
2. ✅ **Table of Contents with all section links**
3. ✅ Clear description and overview
4. ✅ **Variations section** (not "All Variations")
5. ✅ **Usage Information** with When to Use / When Not to Use lists
6. ✅ **Behavior section** with at least 2 behavior examples with stories
7. ✅ **Anatomy section** with component parts breakdown
8. ✅ **Specs section** with at least 2 specifications
9. ✅ **Best Practices section** with at least 2 Do/Don't pairs in grid layout
10. ✅ Complete accessibility documentation
11. ✅ **Component Properties + Demo** section with Canvas and Controls
12. ✅ **Code Examples section** with at least 3 working examples
13. ✅ Horizontal rules (---) between all major sections

---

**Documentation Status:** [Draft | In Review | Complete]

**Reviewed By:** _______________

**Date:** _______________

**Notes:**
