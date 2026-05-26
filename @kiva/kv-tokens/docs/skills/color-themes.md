---
name: color-themes
description: Per-theme semantic color token tables from the Kiva design system — every token in Default, Green Light, Green Dark, Marigold, and Stone Light, with hex value, primitive source, and Figma-authored description. Plus the shadow color tokens. The reference companion to the conceptual `color` skill.
when_to_use: When implementing or designing in a specific theme and you need the full token list for that theme — every text, background, border, and underline slot with its hex, primitive token, and intended usage description. Load this alongside the `color` skill whenever you need the canonical data, not just the framework. Sourced from Figma; values describe design intent and may diverge from current code implementation.
---

# Kiva Color — Theme Token Tables

This is the data companion to [color](color.md). Load that first for the *why* (principles, token grammar, accessibility framework, best practices, code-state caveats); load this when you need the full per-theme token list.

Five themes are documented below in the order they appear in Figma, followed by the shadow color tokens. Each table is reproduced from the Figma "Color Themes and Usage" panel and uses the format:

| Token | Hex | Primitive | Description |

The **Token** column is the semantic name a designer or engineer references. The **Primitive** column shows which raw value powers it — useful when tracing how the system composes, and the only place opacity-based disabled tokens (e.g., `color/gray/800-1` = `#212121 (30%)`) are visible.

## Source-of-truth caveats

Several rows in the Figma source have obvious copy-paste or transcription errors. These are surfaced in **Figma source caveats** at the bottom of each theme rather than transcribed verbatim. When in doubt, treat the **Primitive** column as the canonical answer — primitive token names rarely have typos, and the hex/description should match the primitive.

---

## Default theme

**White base · Used across all standard page layouts.**

The fully populated theme. Every other theme inherits from this one and only redefines the tokens that differ. Forms and text fields render in this theme regardless of the surrounding section.

### Text

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `text/primary` | `#223829` | `color/eco-green/4` | Primary text for all body copy, headlines, and icons. The darkest eco-green value. Use it for all high-importance content. |
| `text/primary-inverse` | `#EDF4F1` | `color/eco-green/1` | Inverted text color for dark buttons and dark backgrounds. Used on dark surfaces (like `background/primary-inverse`) to maintain contrast. |
| `text/secondary` | `#505050` | `color/gray/600` | Medium-contrast supportive text. Used for secondary labels, subtitles, metadata, and placeholder text. |
| `text/tertiary` | `#757575` | `color/gray/500` | Low-contrast text for subtle information. Used for hints or non-essential decorative text. |
| `text/action` | `#276A43` | `color/eco-green/3` | Brand-colored interactive text. Used for links, clickable labels, and active navigation items. |
| `text/action-highlight` | `#223829` | `color/eco-green/4` | Darker brand text for active/pressed states. Used when the mouse hovers over links, secondary buttons, or clickable labels. |
| `text/action-disabled` | `#212121` (30%) | `color/gray/800-1` | Disabled text within Default sections. Opacity-based — the intentionally low contrast communicates unavailability. |

### Text — Alerts

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `text/caution` | `#593207` | `color/marigold/4` | Dark text for warning context. Used for warning messages or status labels that require user attention. |
| `text/caution-highlight` | `#996210` | `color/marigold/3` | Hover state for warning-related text. Enhances visibility for interactive warning elements during hover. |
| `text/danger` | `#5C2A22` | `color/desert-rose/4` | Dark text for error context. Used for error messages, critical alerts, and destructive action labels. |
| `text/danger-highlight` | `#A24536` | `color/desert-rose/3` | Hover state for error-related text. Visual feedback for interactive destructive or error-prone elements. |

### Background

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `background/primary` | `#FFFFFF` | `color/neutral/white` | Main application surface. The base color for the entire page or main content areas. |
| `background/primary-inverse` | `#223829` | `color/eco-green/4` | High-contrast dark surface. Use for high-emphasis containers like dark headers, sidebars, or hero cards. |
| `background/secondary` | `#EDF4F1` | `color/eco-green/1` | Subtle secondary surface. Use for section backgrounds, form inputs, or to differentiate cards from the main page. |
| `background/tertiary` | `#C4C4C4` | `color/gray/300` | Low-priority decorative surface. Use inside a component (e.g., the track behind a progress bar) or for a disabled button surface. Not for page or section backgrounds. |
| `background/action` | `#276A43` | `color/eco-green/3` | Brand-colored action surface. The base color for primary buttons, active toggles, and brand-heavy elements. Pair text with `text/primary-inverse`. |
| `background/action-highlight` | `#223829` | `color/eco-green/4` | Hover state for action surfaces. Specifically for primary button hover and interactive brand surfaces. |
| `background/action-secondary` | `#FFFFFF` | `color/neutral/white` | Surface color for secondary button default state within Default sections. |
| `background/action-secondary-highlight` | `#EDF4F1` | `color/eco-green/1` | Hover state for secondary surfaces. Feedback color for interactive cards or buttons on hover. |
| `background/primary-disabled` | `#276A43` (30%) | `color/eco-green/3-1` | Disabled or inactive state for primary button (30% opacity). |

### Background — Alerts

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `background/caution` | `#F8CD69` | `color/marigold/2` | Subtle amber background. Background color for warning banners, toast notifications, and alert callouts. |
| `background/caution-highlight` | `#F8F2E6` | `color/marigold/1` | Hover state for warning surfaces. Feedback color for interactive warning cards or actionable alerts on hover. |
| `background/danger` | `#E0988D` | `color/desert-rose/2` | Subtle red background. Background color for error banners, destructive action dialogs, or invalid states. |
| `background/danger-highlight` | `#F9F0EF` | `color/desert-rose/1` | Soft red background. The standard error alert surface — paired with `text/danger` for the body copy of an error message. |

### Border

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `border/primary` | `#505050` | `color/gray/600` | High-contrast border. Use for component outlines, input field borders, and strong layout dividers. |
| `border/primary-inverse` | `#FFFFFF` | `color/neutral/white` | Inverted border for dark surfaces. Contrast border for elements placed on dark-themed containers. |
| `border/secondary` | `#757575` | `color/gray/500` | Medium-contrast border. Use for card borders, internal table dividers, and secondary component outlines. |
| `border/secondary-disabled` | `#212121` (30%) | `color/gray/800-1` | Disabled or inactive state for secondary button (30% opacity). |
| `border/tertiary` | `#C4C4C4` | `color/gray/300` | Low-contrast subtle border. Use for low-emphasis decorative lines or subtle element separation. |
| `border/action` | `#276A43` | `color/eco-green/3` | Brand-colored border. Use for active focus states, selection rings, and brand-themed outlines. |
| `border/action-highlight` | `#223829` | `color/eco-green/4` | Hover state for Default action borders. Darker green that darkens the outline on interaction. Apply on `:hover` and `:active` only. |

### Border — Alerts

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `border/caution` | `#F8CD69` | `color/marigold/2` | Dark border for warning-related components. Borders on warning banners, alert cards, or validation states. |
| `border/caution-highlight` | `#F8F2E6` | `color/marigold/1` | Hover state for warning-related borders. Visual feedback for interactive warning components on hover. |
| `border/danger` | `#E0988D` | `color/desert-rose/2` | Dark border for error-related components. Borders on invalid input fields, error banners, or critical alert containers. |
| `border/danger-highlight` | `#F9F0EF` | `color/desert-rose/1` | Hover state for error-related borders. Visual feedback for interactive destructive or error components on hover. |

### Underline

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `heading-underline-primary` | `#2AA967` | `color/eco-green/default` | Brand-colored heading accent. A decorative variable used for brand underlines beneath main titles. |

### Figma source caveats — Default

- `background/danger-highlight` in the Figma table copies `background/danger`'s description verbatim. The corrected description above reflects how the token is actually used (soft error alert surface).

---

## Green Light theme

**Light tint surface · Secondary sections, soft brand presence.**

Green Light has only two unique tokens. Everything else — text, action, alerts, borders — is inherited from Default. Use Green Light for sections that need a subtle brand tint without owning the page atmosphere.

### Background

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `background/primary` | `#EDF4F1` | `color/eco-green/1` | Light green section background. The base surface for all Green Light theme sections. |
| `background/primary-inverse` | `#FFFFFF` | `color/neutral/white` | Theme-specific secondary surface. Provides contrast against `background/primary` for cards and inputs. |

> **Why Green Light has only two unique tokens.** Green Light inherits all text, border, and alert tokens from the Default theme — they are identical in value and usage. Only `background/primary` and `background/primary-inverse` differ, because they define the section's surface color. The shared tokens are not duplicated here to avoid confusion — refer to the Default theme tables above for everything else.

---

## Green Dark theme

**Dark green base · For high-emphasis sections, hero areas · Never full page.**

Green Dark inverts the text/background relationship and brightens the action color so it remains legible against the dark surface. Reserved for section-level emphasis; never apply to a full page. Forms still render in Default — re-wrap form children in a Default-themed container.

### Text

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `text/primary` | `#EDF4F1` | `color/eco-green/1` | Primary text on dark green surfaces. Use for body copy, headlines, and icons in Green Dark sections. |
| `text/primary-inverse` | `#223829` | `color/eco-green/4` | Dark text color. Used for contrast when text is placed on rare light-colored components within a Green Dark section. |
| `text/secondary` | `#C4C4C4` | `color/gray/300` | Subtle light gray text. Used for secondary labels, metadata, and supporting information. |
| `text/tertiary` | `#E0E0E0` | `color/gray/200` | Low-contrast muted text. Used for hints or non-essential decorative text. |
| `text/action` | `#78C79F` | `color/eco-green/2` | Bright accent green. High-visibility interactive color for links and active navigation tabs against dark surfaces. |
| `text/action-highlight` | `#EDF4F1` | `color/eco-green/1` | Hover state for action text. Strong feedback color when hovering over interactive links in Green Dark sections. |
| `text/action-disabled` | `#212121` (30%) | `color/gray/800-1` | Disabled text within Green Dark sections. Opacity-based — the low contrast communicates unavailability. |

### Background

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `background/primary` | `#223829` | `color/eco-green/4` | Dark green base surface. The main background for Green Dark section content areas. |
| `background/primary-inverse` | `#FFFFFF` | `color/neutral/white` | Pure white surface. High-contrast callouts or special containers needing maximum attention within a dark section. |
| `background/secondary` | `#276A43` | `color/eco-green/3` | Subtle secondary surface. Use for nested cards, form inputs, or to differentiate sub-regions from the main dark surface. |
| `background/tertiary` | `#C4C4C4` | `color/gray/300` | Low-priority decorative surface. Use inside a component (e.g., progress bar track) or for a disabled button surface. |
| `background/action` | `#78C79F` | `color/eco-green/2` | Bright action surface. High-visibility background for primary buttons to stand out against dark environments. |
| `background/action-highlight` | `#EDF4F1` | `color/eco-green/1` | Hover state for action surfaces. Specifically for primary button hover and active brand surfaces. |
| `background/action-secondary` | `#223829` | `color/eco-green/4` | Surface color for secondary button default state within Green Dark sections. |
| `background/action-secondary-highlight` | `#276A43` | `color/eco-green/3` | Hover state for secondary surfaces. Feedback color for interactive cards or buttons on hover. |
| `background/primary-disabled` | `#276A43` (30%) | `color/eco-green/3-1` | Disabled or inactive state for primary button (30% opacity). |

### Border

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `border/primary` | `#EDF4F1` | `color/eco-green/1` | Light green border. Primary component boundaries and strong dividers for Green Dark layouts. |
| `border/primary-inverse` | `#223829` | `color/eco-green/4` | Dark border color. Inverted border for elements placed on rare light-colored containers within a Green Dark section. |
| `border/secondary` | `#276A43` | `color/eco-green/3` | Muted brand green border. Subtle separation for secondary UI elements or nested sections. |
| `border/secondary-disabled` | `#212121` (30%) | `color/gray/800-1` | Disabled or inactive state for secondary button (30% opacity). |
| `border/tertiary` | `#78C79F` | `color/eco-green/2` | Low-contrast subtle border. Use for low-emphasis decorative lines or subtle element separation. |
| `border/action` | `#78C79F` | `color/eco-green/2` | Bright interactive border. Used for active selection borders and focus rings in Green Dark sections. |
| `border/action-highlight` | `#EDF4F1` | `color/eco-green/1` | Hover state for Green Dark action borders. Lighter green that lightens the outline on interaction. Apply on `:hover` and `:active` only. |

### Underline

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `heading-underline-primary` | `#2AA967` | `color/eco-green/default` | Brand-colored heading accent. A decorative variable used for brand underlines beneath main titles. |

### Figma source caveats — Green Dark

- The Figma table renders `text/action`, `background/action`, `border/tertiary`, and `border/action` with hex `#276A43` (an `#` typo also appears as `##276A43`), but their primitive is `color/eco-green/2`. The shipped code resolves `eco-green/2` to `#78C79F`, which matches the visual in the Figma chips. The hex column above has been corrected to `#78C79F`; if you are reading the Figma table, ignore the textual hex and trust the primitive + chip.
- `background/primary-disabled`'s Figma description ("Hover state for error surfaces…") was copy-pasted from another row. The corrected description above reflects how the token is actually used.

---

## Marigold theme

**Warm amber surface for marketing, decoration, warning purposes.**

Warm amber atmosphere for marketing pages, donation flows, and storytelling. Note that **the code names this theme `marigold-light`** even though Figma drops the `-light` suffix.

### Text

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `text/primary` | `#593207` | `color/marigold/4` | Primary text for body copy, headlines, and icons within Marigold sections. The darkest marigold value. |
| `text/primary-inverse` | `#F8F2E6` | `color/marigold/1` | Light marigold text for content placed on dark marigold surfaces (`background/primary-inverse`). Use exclusively on dark amber backgrounds — never on light surfaces where it becomes unreadable. |
| `text/secondary` | `#505050` | `color/gray/600` | Mid-contrast supporting text within Marigold sections — labels, subtitles, metadata. |
| `text/tertiary` | `#757575` | `color/gray/500` | Low-contrast muted text. Used for hints or non-essential decorative text. |
| `text/action` | `#996210` | `color/marigold/3` | Deep gold interactive text. Used for interactive links and active navigation labels. |
| `text/action-highlight` | `#593207` | `color/marigold/4` | Hover and pressed state for `text/action` within Marigold sections. Darker value ensures increased contrast on interaction. Apply on `:hover` and `:active` only — not for static emphasis. |
| `text/action-disabled` | `#212121` (30%) | `color/gray/800-1` | Disabled text within Marigold sections. Opacity-based — the low contrast communicates unavailability. |

### Background

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `background/primary` | `#F8F2E6` | `color/marigold/1` | Light amber section background. The base surface for Marigold sections. Use for warning-context sections, standout CTAs, or promotional sections. |
| `background/primary-inverse` | `#593207` | `color/marigold/4` | Dark amber surface for high-emphasis containers within a Marigold section — banners, callout cards, or feature highlights. |
| `background/secondary` | `#FFFFFF` | `color/neutral/white` | Subtle secondary surface. Use for nested cards, form inputs, or to differentiate sub-regions from the main amber surface. |
| `background/tertiary` | `#C4C4C4` | `color/gray/300` | Low-priority decorative surface. Use inside a component (e.g., progress bar track) or for a disabled button surface. |
| `background/action` | `#996210` | `color/marigold/3` | Golden action surface. Base color for primary buttons and active UI elements. |
| `background/action-highlight` | `#593207` | `color/marigold/4` | Hover state for action surfaces. Feedback color for interactive surfaces and buttons on hover. |
| `background/action-secondary` | `#F8F2E6` | `color/marigold/1` | Surface color for secondary button default state within Marigold sections. |
| `background/action-secondary-highlight` | `#FFFFFF` | `color/neutral/white` | Hover state for secondary buttons within Marigold sections. Visual feedback that the outlined button is interactive. Apply on `:hover` and `:active` only. |
| `background/primary-disabled` | `#996210` (30%) | `color/marigold/3-1` | Disabled state surface for Marigold primary buttons. Low opacity signals unavailability. |

### Border

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `border/primary` | `#996210` | `color/marigold/3` | Deep gold border. Main border color for defining component boundaries within Marigold sections. |
| `border/primary-inverse` | `#F8F2E6` | `color/marigold/1` | Light marigold inverted border. Used for elements placed on dark amber surfaces. |
| `border/secondary` | `#F8CD69` | `color/marigold/2` | Medium-contrast border. Use for card borders, internal table dividers, and secondary component outlines. |
| `border/secondary-disabled` | `#212121` (30%) | `color/gray/800-1` | Disabled or inactive state for secondary button (30% opacity). |
| `border/tertiary` | `#FFFFFF` | `color/neutral/white` | Low-contrast subtle border for this theme. Use for low-emphasis decorative lines or subtle element separation. |
| `border/action` | `#996210` | `color/marigold/3` | Brand-colored border for this theme. Use for active focus states, selection rings, and brand-themed outlines. |
| `border/action-highlight` | `#593207` | `color/marigold/4` | Hover state for Marigold action borders. Darker amber that darkens the outline on interaction. Apply on `:hover` and `:active` only. |

### Underline

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `heading-underline-primary` | `#F8CD69` | `color/marigold/2` | Brand-colored heading accent. A decorative variable used for brand underlines beneath main titles. |

### Figma source caveats — Marigold

- The Figma table renders `border/primary-inverse` with hex `#223829` (an eco-green value) and description "Brand gold accent. Specific decorative underline for headings." Both fields appear pasted from another token; the primitive `color/marigold/1` and the surrounding Marigold palette make `#F8F2E6` the correct value. Corrected above.

---

## Stone Light theme

**Neutral warm stone · Earth-toned content.**

Editorial and story atmosphere where green would compete with imagery. Note that **the code names this theme `stone-light`** which matches Figma's naming (unlike Marigold).

### Text

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `text/primary` | `#2E271E` | `color/stone/4` | Primary text for body copy, headlines, and icons within Stone Light sections. The darkest stone value. |
| `text/primary-inverse` | `#F3F1EF` | `color/stone/1` | Light stone text. Used for contrast when text is placed on dark stone surfaces (`background/primary-inverse`). |
| `text/secondary` | `#505050` | `color/gray/600` | Subtle gray text. Used for secondary labels, metadata, and supporting information. |
| `text/tertiary` | `#757575` | `color/gray/500` | Low-contrast muted text. Used for hints or non-essential decorative text. |
| `text/action` | `#635544` | `color/stone/3` | Interactive text for links and clickable labels. Passes AA on `background/primary` and `background/secondary`. Do not use on `background/tertiary` (`#C4C4C4`) — contrast fails there. |
| `text/action-highlight` | `#2E271E` | `color/stone/4` | Hover and pressed state for `text/action` within Stone sections. Apply on `:hover` and `:active` only. |
| `text/action-disabled` | `#212121` (30%) | `color/gray/800-1` | Disabled text within Stone sections. Opacity-based — the low contrast communicates unavailability. |

### Background

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `background/primary` | `#F3F1EF` | `color/stone/1` | Warm stone section background. Base surface for Stone Light sections — testimonials, partner areas, neutral content bands. |
| `background/primary-inverse` | `#2E271E` | `color/stone/4` | Dark stone surface for high-emphasis containers within Stone sections. Creates strong contrast — use only when genuine emphasis is needed. |
| `background/secondary` | `#FFFFFF` | `color/neutral/white` | Subtle secondary surface. Use for nested cards, form inputs, or to differentiate sub-regions from the main stone surface. |
| `background/tertiary` | `#C4C4C4` | `color/gray/300` | Low-priority decorative surface. Use inside a component (e.g., progress bar track) or for a disabled button surface. |
| `background/action` | `#635544` | `color/stone/3` | Muted stone action surface. Primary button fill for Stone theme buttons. |
| `background/action-highlight` | `#2E271E` | `color/stone/4` | Hover state for action surfaces. Visual feedback for interactive buttons or cards on hover. |
| `background/action-secondary` | `#F3F1EF` | `color/stone/1` | Surface color for secondary button default state within Stone sections. |
| `background/action-secondary-highlight` | `#FFFFFF` | `color/neutral/white` | Hover state for secondary surfaces. Visual feedback for interactive cards or outlined buttons on hover. |
| `background/primary-disabled` | `#635544` (30%) | `color/stone/3-1` | Disabled or inactive state for primary button (30% opacity). |

### Border

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `border/primary` | `#635544` | `color/stone/3` | Muted stone border. Used for component outlines and layout dividers within Stone sections. |
| `border/primary-inverse` | `#2E271E` | `color/stone/4` | Dark stone border. Inverted border for elements placed on light stone containers. |
| `border/secondary` | `#AA9E8D` | `color/stone/2` | Muted stone border. Subtle separation for secondary UI elements or nested sections. |
| `border/secondary-disabled` | `#212121` (30%) | `color/gray/800-1` | Disabled or inactive state for secondary button (30% opacity). |
| `border/tertiary` | `#FFFFFF` | `color/neutral/white` | Low-contrast subtle border. Use for low-emphasis decorative lines or subtle element separation. |
| `border/action` | `#635544` | `color/stone/3` | Muted stone interactive border. Base color for action selection borders and primary button outlines. |
| `border/action-highlight` | `#2E271E` | `color/stone/4` | Hover state for Stone action borders. Visual feedback when hovering over interactive brand elements (e.g., secondary buttons). |

### Underline

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `heading-underline-primary` | `#AA9E8D` | `color/stone/2` | Brand-colored heading accent. A decorative variable used for brand underlines beneath main titles. |

### Figma source caveats — Stone Light

- `background/action-secondary-highlight` and `background/primary-disabled` descriptions in Figma are copy-pasted from other rows ("Hover state for warning surfaces…" and "Hover state for error surfaces…"). The corrected descriptions above reflect actual use.
- `border/secondary`'s Figma description refers to "muted brand green border" — left-over text from the Green Dark table. Corrected to "muted stone border."

---

## Shadow colors

Three color tokens drive elevation. Apply the shadow token via the relevant component or utility rather than hand-rolling an `rgba()` — that way dark-theme shadows can be retuned without component rewrites.

| Token | Hex | Primitive | Description |
|---|---|---|---|
| `shadow/default` | `#000000` (8%) | `color/shadow/default` | Default elevation shadow. Apply to cards, sticky elements, and any surface that should read as "lifted off the page." |
| `shadow/hover` | `#000000` (16%) | `color/shadow/hover` | Stronger shadow for hover and interactive emphasis. Adds visible lift on `:hover` for cards and buttons. |
| `shadow/click-active` | `#000000` (8%) | `color/shadow/click-active` | Pressed-state shadow. Used on `:active` to communicate the surface has been pushed back toward the page. |

### Figma source caveats — Shadow

- The Figma shadow table has the description and primitive-token columns swapped between the `shadow/hover` and `shadow/click-active` rows. The (semantic name, hex) pairings by row position are canonical and have been used above; the `:hover`-typically-stronger-than-`:active` convention confirms the assignment.

---

## Figma source reference

- Color Themes and Usage: node `17950:8787`
  - Default theme table: `18644:1206`
  - Green Dark theme table: `18703:11854`
  - Green Light theme table: `18712:12784`
  - Marigold theme table: `18703:12254`
  - Stone Light theme table: `18703:12497`
  - Shadow token table: `18712:12793`

File: `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 — WIP)
