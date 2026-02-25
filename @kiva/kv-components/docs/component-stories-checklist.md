# Component Stories Checklist

Use this checklist to ensure comprehensive, high-quality Storybook stories for components.

## Pre-Development

- [ ] Component implementation is complete and stable
- [ ] Component props are well-defined with types
- [ ] Component events are documented
- [ ] Component has MDX documentation with story references
- [ ] Understand all component variants and behaviors

## Existing Stories Assessment (if applicable)

⚠️ **CRITICAL: Do NOT convert existing stories to CSF3 or modify their format**

- [ ] Existing stories file reviewed
- [ ] All existing story exports listed (preserve all as-is)
- [ ] MDX documentation reviewed for story references
- [ ] Missing stories identified (referenced in MDX but not in stories file)
- [ ] Confirmed existing stories will NOT be modified or converted
- [ ] New stories use exact names matching MDX references
- [ ] Evaluated if ComponentOverview already exists or is needed
- [ ] Evaluated if AllVariations is practical or if existing stories suffice

## File Setup

- [ ] Story file created in `src/vue/stories/[ComponentName].stories.js`
- [ ] Component imported correctly
- [ ] MDX docs file imported
- [ ] Required icons imported (MDI or other)
- [ ] File follows consistent formatting

## Default Export Configuration

- [ ] `title` includes appropriate folder prefix (Base Styling, Charts, Checkout, Comments, Components, Forms, Interface Elements, Loan Display, or Page Frame)
- [ ] If uncertain about prefix, asked for clarification or checked existing similar components
- [ ] `title` matches format: 'Folder Prefix/ComponentName'
- [ ] `component` references the Vue component correctly
- [ ] `parameters.docs.page` points to MDX file
- [ ] `parameters.docs.title` is descriptive

## argTypes Configuration

- [ ] All component props have argType entries
- [ ] Control types are appropriate for each prop
- [ ] Select controls use descriptive option labels
- [ ] Descriptions provided for complex props
- [ ] Default values documented (optional but helpful)
- [ ] Table configuration added for better docs (optional)

### argTypes Quality Checks
- [ ] Boolean props use `control: 'boolean'`
- [ ] Limited string options use `control: 'select'` or `'radio'`
- [ ] Numeric props use `control: 'number'` or `'range'`
- [ ] Icon props use `control: 'select'` with labeled options
- [ ] Complex props use `control: 'object'` or `'array'`

## Required Stories

### ComponentOverview
- [ ] Story exists OR suitable existing stories identified for reuse
- [ ] Shows 2-4 simple, clear examples (if new story created)
- [ ] Each example demonstrates a key variant
- [ ] Descriptive labels included under each example
- [ ] Uses gray background container (`tw-bg-gray-50`)
- [ ] Layout is clean and organized
- [ ] All examples render without errors
- [ ] If reusing existing: Documented which stories serve this purpose

### AllVariations
- [ ] Evaluated if single comprehensive story is practical
- [ ] If practical: Story exists and exports correctly
- [ ] If impractical: Multiple focused variation stories identified/created
- [ ] Shows every visual variant (across one or multiple stories)
- [ ] Shows every functional variant
- [ ] Shows all size variations
- [ ] Organized with grid layout (if single story)
- [ ] Section headings for variant categories
- [ ] Descriptive labels for each variation
- [ ] Responsive grid layout (1 col mobile, 2+ desktop)
- [ ] Gray background container used
- [ ] All variations render without errors
- [ ] Documentation references appropriate variation stories

### Default
- [ ] **If existing: Leave completely untouched** (do not convert format)
- [ ] If new: Story exists with proper args object
- [ ] If new: Uses CSF3 `render: (args) => ({})` format
- [ ] If new: All props included with sensible defaults
- [ ] Component uses `v-bind="args"`
- [ ] Event handlers included and log to console
- [ ] Template is simple and focused
- [ ] Gray background container used
- [ ] Story works as interactive playground

## Additional Behavior/Feature Stories

For each story referenced in the MDX documentation:
- [ ] Story exists with matching name
- [ ] Story demonstrates the documented behavior
- [ ] Story includes explanatory text
- [ ] Uses appropriate args configuration
- [ ] Includes necessary reactive state in data()
- [ ] Event handlers present where needed
- [ ] Template is clear and demonstrates feature well
- [ ] Gray background container used

Common additional stories to check:
- [ ] State variations (enabled, disabled, loading, etc.)
- [ ] Interactive behaviors (toggle, selection, expansion)
- [ ] Accessibility demonstrations (keyboard nav, focus, touch targets)
- [ ] Special features (animations, transitions, etc.)
- [ ] Different content scenarios (empty, full, overflow)
- [ ] Slot demonstrations (if component has slots)

## Vue Component Structure

### Data Management
- [ ] Reactive state uses `data()` function
- [ ] Non-reactive data (icons, constants) uses `setup()`
- [ ] Default story uses `setup() { return { args }; }`
- [ ] Independent state for multiple instances (e.g., `isToggledSmall`, `isToggledMedium`)
- [ ] V-model bindings work correctly
- [ ] Initial values are sensible

### Template Quality
- [ ] Valid Vue template syntax
- [ ] Proper attribute binding (`:prop` for dynamic, `prop` for static)
- [ ] Event handlers properly bound (`@click`, `@input`, etc.)
- [ ] V-model used for two-way binding where appropriate
- [ ] Slots used correctly (if applicable)
- [ ] Conditional rendering works (v-if, v-show)

### Methods
- [ ] Event handlers defined for all emitted events
- [ ] Handlers log to console for debugging
- [ ] Log messages are descriptive
- [ ] Handlers include event parameter information

## Styling and Layout

### Container Styling
- [ ] All stories use `tw-bg-gray-50` background
- [ ] Rounded corners applied (`tw-rounded-md`)
- [ ] Consistent padding (`tw-p-6` or `tw-p-8`)
- [ ] Inline-block used for Default story container

### Layout Patterns
- [ ] Flexbox used for horizontal layouts
- [ ] Grid used for AllVariations
- [ ] Proper gap spacing (`tw-gap-4`, `tw-gap-8`)
- [ ] Vertical spacing with `tw-space-y-4` or margins
- [ ] Centered content where appropriate
- [ ] Responsive classes for mobile/desktop

### Typography and Labels
- [ ] Descriptive text uses `tw-text-small`
- [ ] Section headings use `tw-text-h4`
- [ ] Text color uses `tw-text-primary` or semantic classes
- [ ] Font weights appropriate (`tw-font-medium`)
- [ ] Labels positioned clearly below or beside examples

## Code Quality

### Imports
- [ ] Only necessary imports included
- [ ] No unused imports
- [ ] Import paths are correct and relative
- [ ] Icons imported from correct packages

### Code Style
- [ ] Consistent indentation
- [ ] Proper spacing around code blocks
- [ ] Comments added for complex logic (if needed)
- [ ] No console errors or warnings
- [ ] No linting errors
- [ ] Follows project code style guidelines

### Naming Conventions
- [ ] Story names use PascalCase
- [ ] Story names are descriptive and specific
- [ ] Data properties use camelCase
- [ ] Variable names are clear and meaningful
- [ ] No placeholder or generic names remain

## Testing

### Visual Testing
- [ ] View all stories in Storybook
- [ ] ComponentOverview displays correctly
- [ ] AllVariations shows all variants properly
- [ ] Default story renders with controls visible
- [ ] Additional stories display as expected
- [ ] No visual glitches or layout issues
- [ ] Responsive layouts work at different screen sizes

### Interactive Testing
- [ ] Default story controls all work
- [ ] Boolean controls toggle correctly
- [ ] Select controls change component props
- [ ] Number controls update values
- [ ] All interactive variants respond to clicks
- [ ] V-model binding updates correctly
- [ ] Toggle states persist appropriately

### Console Testing
- [ ] No console errors when stories load
- [ ] Event handlers log correctly when triggered
- [ ] Log messages are clear and informative
- [ ] No warnings about missing props or invalid values
- [ ] No Vue warnings about component usage

### Functional Testing
- [ ] All variants function as expected
- [ ] Disabled states prevent interaction
- [ ] Loading states display correctly
- [ ] Error states show appropriately
- [ ] Keyboard navigation works (if applicable)
- [ ] Focus management is correct (if applicable)

## Documentation Integration

### MDX Reference Matching
- [ ] Story names match MDX file references exactly
- [ ] All stories referenced in docs exist
- [ ] No stories exist that aren't documented
- [ ] Story names are intuitive and match section headings
- [ ] ComponentOverview appears in Component Overview section
- [ ] AllVariations appears in Variations section
- [ ] Default appears in Component Properties + Demo section

### Story Organization
- [ ] Stories appear in logical order in Storybook
- [ ] Related stories grouped together
- [ ] Core stories (Overview, Variations, Default) appear first
- [ ] Feature stories follow in order matching docs

## Accessibility

- [ ] Touch targets are minimum 44px (if applicable)
- [ ] Keyboard navigation works in interactive stories
- [ ] Focus states are visible
- [ ] ARIA attributes present (if needed)
- [ ] Screen reader testing considered (if critical)
- [ ] Color contrast meets standards

## Edge Cases and Special Scenarios

- [ ] Empty state demonstrated (if applicable)
- [ ] Loading state shown (if applicable)
- [ ] Error state included (if applicable)
- [ ] Long content handled (if applicable)
- [ ] Overflow scenarios tested (if applicable)
- [ ] Minimum content shown (if applicable)
- [ ] Maximum constraints demonstrated (if applicable)

## Common Issues to Watch For

- [ ] ⚠️ Story name typos (doesn't match MDX reference)
- [ ] ⚠️ Missing or incorrect argTypes
- [ ] ⚠️ Reactive state not in data() function
- [ ] ⚠️ Icons not returned from setup()
- [ ] ⚠️ V-bind not used in Default story
- [ ] ⚠️ Event handlers missing or not logging
- [ ] ⚠️ Template syntax errors
- [ ] ⚠️ Incorrect component import paths
- [ ] ⚠️ Missing gray background containers
- [ ] ⚠️ Inconsistent spacing and layout
- [ ] ⚠️ Controls not working in Default story
- [ ] ⚠️ AllVariations missing some variants
- [ ] ⚠️ ComponentOverview too complex

## Final Review

- [ ] Compare to reference stories (KvIconButton.stories.js)
- [ ] Verify completeness against this checklist
- [ ] Get peer review (if available)
- [ ] Test in actual Storybook build
- [ ] Verify all MDX story references work
- [ ] Check mobile/responsive views
- [ ] Review console for any warnings
- [ ] Ensure consistent with other component stories

## Pre-Commit

- [ ] Run linter and fix any issues
- [ ] Format code consistently
- [ ] Remove any debug code or comments
- [ ] Remove unused variables or imports
- [ ] Verify no placeholder text remains
- [ ] Check file is saved
- [ ] Git diff looks correct

## Post-Development

- [ ] Update component AGENTS.md if needed
- [ ] Document any special story patterns used
- [ ] Note any challenges for future reference
- [ ] Update stories guide if new patterns emerged

---

## Quick Reference: Minimum Requirements

Every component story file MUST have:
1. ✅ Proper imports (component, MDX, icons)
2. ✅ Complete default export with title, component, parameters, argTypes
3. ✅ ComponentOverview story (2-4 simple examples)
4. ✅ AllVariations story (all variants organized)
5. ✅ Default story (interactive playground with all props)
6. ✅ Additional stories matching MDX references
7. ✅ Event handlers that log to console
8. ✅ Consistent gray background containers
9. ✅ Proper reactive state management
10. ✅ Working controls in Default story

---

**Story Status:** [Draft | In Review | Complete]

**Tested In:** [ ] Storybook | [ ] Chrome | [ ] Firefox | [ ] Safari

**Reviewed By:** _______________

**Date:** _______________

**Notes:**
