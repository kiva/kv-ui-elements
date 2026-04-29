---
name: typography
description: Semantic typography guidelines from the Kiva design system — type scale, heading hierarchy, font families, pairing rules, and HTML/Tailwind mappings. Sourced from Figma; values describe design intent and may diverge from current code implementation.
when_to_use: When designing or implementing UI that involves text styling — choosing a heading level, applying a type token, picking a font family, building a section that pairs multiple type styles, or reasoning about typographic hierarchy. Reference design intent first; verify token names against current code before relying on them.
---

# Kiva Typography

## Source of truth

This skill captures the **semantic typography system** as defined in Figma (the Kiva Ecosystem 2026 file). Figma is the canonical source for design intent: which token exists, what it means, when to use it, and how styles pair together.

Numeric values, token names, and Tailwind utility class names in this document reflect the Figma specifications. The shipped code in `@kiva/kv-tokens` may temporarily lag behind these specs while the token sync work is in progress. **Verify any class name or token reference against the current code before depending on it.**

## How to apply type styles

Always apply type styles by using the right **semantic HTML element** or by adding a **provided typography utility class**. Do not write custom CSS to set font family, size, weight, line height, or letter spacing for text. If no existing element default or class fits the use case, that is a signal to talk to the design system team — not to author bespoke styles.

The typography utility classes shipped today (defined in `configs/tailwind.config.js`, served with the `tw-` prefix the project's Tailwind config applies to all classes):

- `tw-text-base`
- `tw-text-display`
- `tw-text-headline`
- `tw-text-headline-two`
- `tw-text-subheadline`
- `tw-text-title`
- `tw-text-button-link`
- `tw-text-upper`
- `tw-text-caption`
- `tw-text-label`
- `tw-text-small`
- `tw-text-link`
- `tw-text-blockquote`

## Design principles

1. **Hierarchy first.** Kiva serves borrowers, lenders, and partners on the same page. Stick to the predefined scale to maintain visual balance and communicate an immediate reading order.
2. **Simple semantics.** Semantic groupings tell teams how a style is *intended* to be used, while leaving room for context-specific decisions.

A typography token is a complete unit — it bundles font family, size, weight, line height, and letter spacing. Apply tokens whole; do not override individual attributes.

## Typefaces

| Role | Family | Used for |
|---|---|---|
| Serif (brand) | **Dovetail MVB** | Display, Headline 1, Headline 2 — structural hierarchy that anchors a page |
| Sans (product) | **Kiva Post Grotesk** | Subheadline, Title, Base, all utility styles — content, UI, long-form reading |

**Fallbacks**

| Primary | Fallback |
|---|---|
| Dovetail MVB | Georgia |
| Kiva Post Grotesk | Arial |

Fallbacks are tuned to closely match the metrics of the primary typefaces to minimize layout shift if brand fonts fail to load.

## Type scale

Each style is responsive across three device tiers: **Large** (desktop), **Medium** (tablet), **Small** (mobile). `Base` and the small-tier utility styles (Button, Label, Caption, Upper) are universal across all devices.

### Display — `Dovetail MVB Medium`

Expressive, large-scale text reserved for the single most important headline on a marketing page (homepage hero, campaign title). Limit to one per page; marketing pages only.

| Tier | Size | Line height | Letter spacing | Example use |
|---|---|---|---|---|
| Large (desktop) | 44px | 57px (1.3) | -0.88px (-0.02em) | Homepage hero, campaign hero |
| Medium (tablet) | 40px | 52px (1.3) | -0.80px (-0.02em) | Same content, tablet |
| Small (mobile) | 36px | 52px (1.3) | -0.72px (-0.02em) | Same content, mobile |

### Headline 1 — `Dovetail MVB Medium`

Primary section headers that establish top-level hierarchy within a page below the hero.

| Tier | Size | Line height | Letter spacing | Example use |
|---|---|---|---|---|
| Large | 26px | 36px (1.4) | -0.52px (-0.02em) | Section headers |
| Medium | 22px | 31px (1.4) | -0.22px (-0.01em) | Section headers, tablet |
| Small | 22px | 31px (1.4) | -0.22px (-0.01em) | Section headers, mobile |

> **Why are Medium and Small identical?** At this level of hierarchy, further size reduction from tablet to mobile interferes with rather than improves readability.

### Headline 2 — `Dovetail MVB Medium`

Secondary headers that organize and support content within a section.

| Tier | Size | Line height | Letter spacing | Example use |
|---|---|---|---|---|
| Large | 22px | 31px (1.4) | -0.22px (-0.01em) | Category labels, subsection titles |
| Medium | 20px | 26px (1.3) | -0.20px (-0.01em) | Same content, tablet |
| Small | 20px | 26px (1.3) | -0.20px (-0.01em) | Same content, mobile |

### Subheadline — `Kiva Post Grotesk Book`

Supporting text that sits below a Headline to expand on it.

| Tier | Size | Line height | Letter spacing | Example use |
|---|---|---|---|---|
| Large | 20px | 26px (1.3) | 0 | Subheading below the headline |
| Medium | 18px | 23px (1.3) | 0 | Same content, tablet |
| Small | 18px | 23px (1.3) | 0 | Same content, mobile |

### Title — `Kiva Post Grotesk Medium`

Component-level headings used to label cards, modules, or distinct content blocks. Same size/line-height as Subheadline but **Medium weight** instead of Book — this is what distinguishes a component title from a supporting subheadline.

| Tier | Size | Line height | Letter spacing | Example use |
|---|---|---|---|---|
| Large | 20px | 26px (1.3) | 0 | Card headers, modal titles, list titles |
| Medium | 18px | 23px (1.3) | 0 | Same content, tablet |
| Small | 18px | 23px (1.3) | 0 | Same content, mobile |

### Base — `Kiva Post Grotesk Book`

Default body text for paragraphs and most reading content. **Universal across all devices.**

| Token | Size | Line height | Letter spacing | Example use |
|---|---|---|---|---|
| Base | 16px | 22px (1.4) | 0 | Borrower stories, loan descriptions |

### Utility / Small styles — `Kiva Post Grotesk`

Functional UI text. Universal across all devices.

| Token | Size | Weight | Line height | Letter spacing | Example use |
|---|---|---|---|---|---|
| Button | 16px | Medium | 21px (1.25) | 0 | CTA labels |
| Label | 14px | Medium | 18px (1.25) | 0 | Form labels, filter names |
| Caption | 14px | Book | 18px (1.25) | 0 | Disclaimers, captions |
| Upper | 14px | Medium | 18px (1.25) | 0 | Tags, status badges (always UPPERCASE) |

## Heading hierarchy & semantic HTML mapping

The design system defines semantic type tokens for heading levels **h1 through h4 only**. Do not use `<h5>` or `<h6>`. For deeper content hierarchy, use a paragraph element with the appropriate type token (see "Going deeper than h4" below).

### Default mapping (most contexts)

| Style token | HTML element | Tailwind class | Mobile | Tablet | Desktop | Notes |
|---|---|---|---|---|---|---|
| Headline 1 | `<h1>` | `tw-text-headline` | 22px | 22px | 26px | Global h1 default via base CSS |
| Headline 2 | `<h2>` | `tw-text-headline-two` | 20px | 20px | 22px | Global h2 default via base CSS |
| Subheadline | `<h3>` | `tw-text-subheadline` | 18px | 18px | 20px | Global h3 default via base CSS |
| Title | `<h4>` | `tw-text-title` | 18px | 18px | 20px | Global h4 default via base CSS |
| Base / Body | `<p>`, `<body>` | `tw-text-base` | 16px | 16px | 16px | Global paragraph and body default |
| Button | `<button>` | `tw-text-button-link` | 16px | 16px | 16px | Global button default; primary CTA labels |
| Label | `<label>` | `tw-text-label` | 14px | 14px | 14px | Global label default |
| Caption | `<figcaption>` | `tw-text-caption` | 14px | 14px | 14px | Use for disclaimers and captions |
| Upper | — (utility only) | `tw-text-upper` | 14px | 14px | 14px | No element default; always UPPERCASE |
| Small | `<small>` | `tw-text-small` | 14px | 14px | 14px | Supportive UI text |
| Blockquote | `<blockquote>` | `tw-text-blockquote` | 20px | 20px | 22px | Italic Dovetail serif |
| Link | `<a>` | `tw-text-link` | 16px | 16px | 16px | Underline + action color; inherits size from parent |

### Going deeper than h4

For content that needs sub-h4 hierarchy, do not reach for `<h5>`. Use a semantic text element with a type token instead:

- "Small heading" feel → `<p>` + `tw-text-title` or `tw-text-label`
- Supportive / metadata text → `<p>` or `<span>` + `tw-text-caption` or `tw-text-small`
- Form field labels → `<label>` + `tw-text-label`

### Contentful-specific shifted header mapping

Marketing pages rendered through Contentful shift each heading element down one level so that `<h1>` can be reserved for the Display style on hero modules. Use this mapping only in the Contentful context; a CSS override is needed for it.

| Style token | HTML element | Tailwind class | Mobile | Tablet | Desktop | Notes |
|---|---|---|---|---|---|---|
| Display | `<h1>` | `tw-text-display` | 36px | 40px | 44px | Marketing hero only; CSS override required |
| Headline 1 | `<h2>` | `tw-text-headline` | 22px | 22px | 26px | |
| Headline 2 | `<h3>` | `tw-text-headline-two` | 20px | 20px | 22px | |
| Subheadline | `<h4>` | `tw-text-subheadline` | 18px | 18px | 20px | |
| Title | `<h5>` | `tw-text-title` | 18px | 18px | 20px | Permitted only inside the Contentful shift |

## Pairing guidelines

The full marketing pairing pattern stacks five elements in this order:

1. **Upper** — short eyebrow / category label above the headline
2. **Display** — hero headline (one per page, marketing only)
3. **Subheadline** — supporting paragraph that expands the headline
4. **Button** — primary CTA
5. **Caption** — supportive metadata, e.g., a contact prompt

The standard in-page (non-hero) pairing pattern stacks:

1. **Headline 1** — section header (with a paragraph of Subheadline beneath it)
2. **Subheadline** — supporting paragraph
3. **Headline 2** — subsection header (with a paragraph of Base beneath it)
4. **Base** — body content
5. **Title** — card/module heading (with a paragraph of Base beneath it)

The semantic distinction worth remembering: **Subheadline** and **Title** share the same size at every tier — Subheadline (Book weight) describes/expands the thing above it, Title (Medium weight) names the thing it sits inside (a card, a modal, a module).

## Best practices

### Hierarchy and legibility

- **Do** clearly differentiate heading sizes to create hierarchy. Use Base for long-form body paragraphs.
- **Don't** make headings and body text look too similar. Don't use Caption or Label for long paragraphs.

### All caps

- **Do** use the Upper style for short, 1–3 word labels (tags, eyebrows, status badges).
- **Don't** use all caps for full sentences or long paragraphs.

## Usage rules

### Do

- Use the correct size tier (Large / Medium / Small) for the target device.
- Respect the Dovetail MVB / Kiva Post Grotesk family boundary — serif for Display and Headlines, sans for everything else.
- Limit Display to one per page, and only on marketing pages.
- Default to Base for any paragraph content.

### Don't

- Override individual attributes of a token (size, weight, line height, letter spacing). Apply the token whole, or pick a different token.
- Write custom CSS (or one-off Tailwind utility combinations like `tw-text-[18px] tw-font-medium tw-leading-[23px]`) to set type styles. Use a semantic HTML element or one of the provided typography utility classes.
- Create new styles outside this system without design system team review.

### Need something not covered here?

Open a request with the design system team. Include the use case, the component, and why existing tokens don't work.

## How to use in Figma

All tokens are published as text styles in the Kiva Ecosystem library.

- Match the size tier to your frame: Desktop frames get Large variants, Tablet frames get Medium, Mobile frames get Small. Utility styles and Base are universal.
- A detached style breaks the connection to the library — the element stops receiving updates and becomes an undocumented variant.
- Hover over a text style to see a description of where it's used.
- Before handing off, inspect every text layer. If a layer shows raw values (e.g. "Dovetail / 26px / Medium") instead of a style name (e.g. "Headline 1 Large"), it's detached — reapply the matching style from the library.

## Figma source references

- Typography Overview: node `17279:6062`
- Type Scales & Tokens: node `17443:6589`
- Typography Guidelines: node `17279:6478`
- HTML + Tailwind Reference: node `19446:186`

File: `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 — WIP)
