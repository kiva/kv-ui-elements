# How to Use AI Prompts

This guide explains how to use the AI prompt files in this repository to generate component stories and documentation.

## Available Prompts

- **[ai-stories-prompt.md](./ai-stories-prompt.md)** - Generate Storybook stories
  - Scaffold minimal stories for new components
  - Create comprehensive stories for stable components
  - Add documentation stories to existing story files

- **[ai-documentation-prompt.md](./ai-documentation-prompt.md)** - Generate component documentation
  - Create new MDX documentation
  - Migrate existing documentation to current standards

## How to Use Prompts with AI

You have several options for using these prompts. Choose the one that feels most natural to you.

### Option 1: Reference the File (Recommended ⭐)

Attach the prompt file to your chat and reference it directly. The AI can read the file and apply the appropriate prompt.

**Example:**
```
@ai-stories-prompt.md Use the "For Scaffolding a New Component" prompt
to create a stories file for KvButton.

Component: src/vue/KvButton.vue
```

**Why this works well:**
- No need to copy/paste large blocks of text
- AI gets the full context and latest version
- Quick and easy
- You can reference specific sections

### Option 2: Copy, Customize, and Paste

Copy the relevant prompt section from the file, replace the `{{placeholders}}` with your actual values, and paste into chat.

**Example:**
```
I need to scaffold a basic Storybook stories file for a new Vue 3
component that I'm just starting to build.

Component Name: KvButton
Component File: @kiva/kv-components/src/vue/KvButton.vue

Task: Create a minimal stories file to get started with interactive development.

[Include rest of prompt from the file...]
```

**When to use this:**
- You want to modify the prompt for specific needs
- Working in an environment without file attachments
- Sharing the prompt with others

### Option 3: Natural Language Reference (Most Concise ⭐)

Just ask naturally and mention the guide. The AI will look up the appropriate prompt.

**Example:**
```
Scaffold a stories file for KvButton using the scaffolding approach
from the ai-stories-prompt.md guide.
```

or even simpler:

```
Create stories for KvButton following the scaffolding guide.
```

**Why this works well:**
- Fastest approach
- Most natural
- AI infers which prompt to use based on context
- Great for quick iterations

## Practical Examples

### Scaffolding Stories for a New Component

**Natural language approach:**
```
I'm starting work on a new KvToggle component. Can you scaffold
a basic stories file with just the Default story so I can develop
it interactively?

Component: src/vue/KvToggle.vue
```

**File reference approach:**
```
@ai-stories-prompt.md Use the scaffolding prompt for KvToggle

Component file: src/vue/KvToggle.vue
```

### Creating Comprehensive Stories

**Natural language approach:**
```
Following the comprehensive stories guide, create all stories for
KvModal including ComponentOverview, AllVariations, and behavior stories.

Component: src/vue/KvModal.vue
Documentation: src/vue/stories/KvModalDocs.mdx
```

**File reference approach:**
```
@ai-stories-prompt.md Use "For Comprehensive Stories" prompt for KvModal

Files:
- Component: src/vue/KvModal.vue
- Docs: src/vue/stories/KvModalDocs.mdx
```

### Creating Documentation

**Natural language approach:**
```
Create MDX documentation for KvButton following the documentation
template. The stories already exist.

Component: src/vue/KvButton.vue
Stories: src/vue/stories/KvButton.stories.js
```

**File reference approach:**
```
@ai-documentation-prompt.md Generate new documentation for KvButton

Component: src/vue/KvButton.vue
Stories: src/vue/stories/KvButton.stories.js
```

### Adding Stories to Existing Story Files

**Natural language approach:**
```
I have existing stories for KvCard but the MDX docs reference some
stories that don't exist yet. Add the missing stories without
modifying the existing ones.

Existing stories: src/vue/stories/KvCard.stories.js
Documentation: src/vue/stories/KvCardDocs.mdx
Component: src/vue/KvCard.vue
```

**File reference approach:**
```
@ai-stories-prompt.md Use "For Adding Documentation Stories" prompt for KvCard

Files:
- Existing stories: src/vue/stories/KvCard.stories.js
- Documentation: src/vue/stories/KvCardDocs.mdx
- Component: src/vue/KvCard.vue
```

### Migrating Documentation

**Natural language approach:**
```
The KvButton docs are outdated. Can you migrate them to the current
template standards following the migration guide? Preserve existing
content and add missing sections.

Existing docs: src/vue/stories/KvButtonDocs.mdx
Stories: src/vue/stories/KvButton.stories.js
Component: src/vue/KvButton.vue
```

**File reference approach:**
```
@ai-documentation-prompt.md Use migration prompt for KvButton

Files:
- Existing docs: src/vue/stories/KvButtonDocs.mdx
- Stories: src/vue/stories/KvButton.stories.js
- Component: src/vue/KvButton.vue
```

## Tips for Best Results

### Provide File Context
Always mention the relevant files:
- Component file (required)
- Existing stories or docs (if they exist)
- Reference examples (optional but helpful)

You can use `@` to attach files directly to your message.

### Be Specific About the Task
Clear language helps:
- ✅ "Scaffold a minimal stories file for KvToggle"
- ✅ "Create comprehensive documentation for KvModal"
- ✅ "Enhance existing KvCard stories, preserving the Default story"
- ❌ "Help with KvButton"

### Mention Constraints or Preferences
If you have specific requirements:
```
Scaffold stories for KvAccordion. Note: This component will have
many variants, so use multiple focused stories instead of one
AllVariations story.
```

### Iterate in Stages
For complex components, break it down:
```
Step 1: Scaffold basic stories for KvDataTable
[review output]

Step 2: Now add stories for sorting and filtering behaviors
[review output]

Step 3: Add pagination stories
```

## Common Workflows

### Starting a New Component
1. **Scaffold stories first** (enables interactive development)
   ```
   Scaffold stories for [ComponentName] using the scaffolding guide
   ```
2. Develop component interactively in Storybook
3. Add more stories as features are built
4. Create documentation when component is stable

### Documenting an Existing Component
1. **Create comprehensive stories** (if minimal stories exist)
   ```
   Create comprehensive stories for [ComponentName]
   following the complete stories guide
   ```
2. **Create documentation**
   ```
   Create documentation for [ComponentName] referencing
   the existing stories
   ```
3. Review and refine both

### Updating Legacy Components
1. **Assess what exists**
   ```
   Review the stories and docs for [ComponentName] and tell me
   what stories are referenced in the MDX but missing from the stories file
   ```
2. **Add missing stories** (don't convert or modify existing ones)
   ```
   Add the missing documentation stories to [ComponentName].stories.js
   without modifying any existing stories
   ```
3. **Migrate documentation**
   ```
   Migrate [ComponentName] documentation to current template,
   preserving good content and adding missing sections
   ```

## Troubleshooting

### "The AI didn't follow the prompt correctly"
- Be more explicit about which section of the prompt to use
- Attach the prompt file with `@` for direct reference
- Copy the exact prompt section and customize it

### "The generated code has errors"
- Provide the component file for proper prop/event understanding
- Mention any special patterns (v-model, slots, complex state)
- Ask for fixes: "The KvModal stories have an error on line 23..."

### "I want to modify the prompt for my specific case"
- Copy the relevant prompt section
- Modify the guidelines or requirements
- Paste the customized prompt in your message

### "Which prompt should I use?"
- Starting new component? → Scaffolding prompt
- Component is stable, needs full stories? → Comprehensive stories prompt
- Stories exist but MDX references missing ones? → Add documentation stories prompt
- No documentation yet? → New documentation prompt
- Docs need updating? → Migration prompt

## Quick Reference

| Task | Prompt File | Section | Quick Ask |
|------|-------------|---------|-----------|
| Scaffold stories for new component | ai-stories-prompt.md | For Scaffolding | "Scaffold stories for [Component]" |
| Create all stories | ai-stories-prompt.md | For Comprehensive Stories | "Create comprehensive stories for [Component]" |
| Add missing doc stories | ai-stories-prompt.md | For Adding Documentation Stories | "Add missing stories for [Component] docs" |
| Create new docs | ai-documentation-prompt.md | For New Documentation | "Create docs for [Component]" |
| Update existing docs | ai-documentation-prompt.md | For Migrating | "Migrate docs for [Component]" |

## Getting Help

If you're unsure which approach to use or how to phrase your request:

1. **Ask for guidance first:**
   ```
   I want to work on KvTabs component. It's partially built with
   some stories but no docs. What's the best approach?
   ```

2. **Reference the guides:**
   ```
   Looking at ai-stories-prompt.md, which section should I use
   for a component that has a Default story but needs more?
   ```

3. **Try the natural language approach:**
   ```
   Help me create better stories and docs for KvTabs
   ```

   The AI will ask clarifying questions and guide you through the process.

## Additional Resources

- [Component Documentation Guide](./component-documentation-guide.md) - Standards for documentation
- [Component Stories Guide](./component-stories-guide.md) - Standards for stories
- [Component Documentation Checklist](./component-documentation-checklist.md) - Quality checklist
- [Component Stories Checklist](./component-stories-checklist.md) - Quality checklist

---

**Remember:** These prompts are guides, not rigid requirements. Feel free to ask naturally and the AI will apply the appropriate guidance!
