# Typography dimension

Detect and fix typographic drift on a page against the Kiva design system. Load
the design-system `typography.md` sub-skill (via the `kiva-design-system` router)
for the canonical type scale before judging anything. Use
`references/swap-and-verify-mechanics.md` for how to edit safely.

## Off-spec signals (scan local source in the page's component tree)

Scope the scan to the page body — **skip the global header and footer subtrees**
unless the prompt explicitly asks for them (see SKILL.md).

1. **Bespoke text CSS** — any custom rule setting `font-family`, `font-size`,
   `font-weight`, `line-height`, or `letter-spacing`. Always a finding; the
   design system forbids hand-authored type.
2. **Hand-rolled type via raw utilities** — stock Tailwind text utilities
   (`tw-text-lg`, `tw-text-sm`, `tw-text-xl`, `tw-font-bold`, `tw-font-semibold`,
   `tw-leading-*`, `tw-tracking-*`) assembling a style instead of one semantic
   token class.
3. **Wrong semantic token for the role** — e.g. a section header using
   `tw-text-base`, judged against the Display -> Caption hierarchy in the
   design-system `typography.md`.

## The design system drives the mapping

The canonical type scale, the role→class mapping, and the list of sanctioned
classes all live in the design-system `typography.md` sub-skill — its "How to
apply type styles" list and "Heading hierarchy & semantic HTML mapping" table.
Load it via the `kiva-design-system` router and judge every finding against it.
Do **not** keep a private copy of the class list here; verify any class name
against current `@kiva/kv-tokens` before applying. If that skill isn't
installed, see SKILL.md → "Load the right knowledge" for how to get it.

## Fix rule

Replace the off-spec styling with the correct **whole** semantic utility class or
the correct element default. Apply tokens whole — never patch an individual
attribute (size/weight/line-height/spacing) on top of a token.

## Apply policy

Typography findings are mostly mechanical class swaps. **Auto-apply** when the
correct semantic class is unambiguous and verified to exist in code. If the right
class is genuinely ambiguous, record it as a proposal in `audit.md` instead.

## Allowed by design — do not flag

The design system decouples the semantic HTML element from the visual type
style. These are valid and must **not** be recorded as findings or "fixed":

- **Element/class mismatch** — e.g. `<h2 class="tw-text-title">`. Choosing the
  element for document structure and the class for the visual style is the whole
  point of having classes. Allowed.
- **A type class on a non-heading element** — e.g. `<span class="tw-text-headline">`
  or `<p class="tw-text-title">`. Applying a heading/semantic style to
  non-heading markup is a valid way to style content. Allowed.

## Legacy `tw-text-h1`–`h6` — suggest, don't fix

`tw-text-h1`–`tw-text-h6` are valid classes — they carry the base-element type
styles and render correctly, so they are **not** a visual finding. When you find
them in the page, **gently suggest** the equivalent semantic class
(`tw-text-h3` → `tw-text-subheadline`, `tw-text-h4` → `tw-text-title`, etc., per
the design-system mapping). Always record this as a low-priority proposal in
`audit.md` — **never** an auto-applied swap, even when the mapping is
unambiguous. They render identically today, so there is no urgency and no visual
risk to leaving them.

## Headings — decoupled, preserve completed work

This dimension handles headings itself using the swap mechanics — it is
self-contained. The earlier `<h4>` cleanup is already done across kv-ui-elements
and its consumers, so honor the "Respect completed migrations" list in
`references/swap-and-verify-mechanics.md` and never regress those outcomes.

## Per-finding flow

For each finding: classify local vs external
(`references/classifying-external.md`) -> edit local-fixable, notate
external-only -> record in the run's `audit.md` under Applied / Requires external
update / Design-system gap.
