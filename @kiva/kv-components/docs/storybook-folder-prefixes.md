# Storybook Folder Prefixes

All story titles and MDX `<Meta title="..." />` tags MUST include a folder prefix to organize components in the Storybook sidebar. The prefix in the MDX file MUST match the prefix in the corresponding `.stories.js` file.

Use one of the existing prefixes below, or ask for clarification if none fit.

## Existing Folder Prefixes

- **Base Styling/** - Style guide, theme provider, and foundational styling components
- **Charts/** - Chart and data visualization components (e.g., KvPieChart, KvLineGraph, KvTreeMapChart)
- **Checkout/** - Checkout flow components (e.g., KvAtbModal, KvCartModal, KvCartPill, KvCheckoutReceipt)
- **Comments/** - Comment-related components (e.g., KvCommentsAdd, KvCommentsList, KvCommentsListItem)
- **Components/** - General-purpose components that don't fit other categories (e.g., KvCarousel, KvLightbox, KvMap, KvUtilityMenu)
- **Forms/** - Form controls and input components (e.g., KvButton, KvCheckbox, KvTextInput, KvSelect, KvSwitch)
- **Interface Elements/** - General UI elements, indicators, and feedback components (e.g., KvToast, KvTooltip, KvProgressBar, KvLoadingSpinner)
- **Loan Display/** - Loan-specific display components (e.g., KvLoanInfoCard, KvClassicLoanCard, KvBorrowerImage)
- **Page Frame/** - Page layout and structural components (e.g., KvPageContainer, KvGrid, KvWwwHeader)

## Guidelines

- If the component clearly fits an existing category, use that prefix
- If uncertain or the component represents a new category, **ask for clarification** on which prefix to use or if a new folder prefix should be created
- Never omit the folder prefix
- The prefix creates the folder structure in the Storybook sidebar navigation

## Examples

**Story titles:**
- `'Forms/KvButton'`
- `'Loan Display/KvLoanInfoCard'`
- `'Interface Elements/KvToast'`

**MDX Meta tags:**
- `<Meta title="Forms/KvButton" ... />`
- `<Meta title="Loan Display/KvLoanInfoCard" ... />`
- `<Meta title="Interface Elements/KvToast" ... />`
