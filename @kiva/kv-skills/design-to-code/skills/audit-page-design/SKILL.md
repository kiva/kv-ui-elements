---
name: audit-page-design
description: Audit a page and its nested local components against the Kiva design system one dimension at a time (typography, then spacing), apply in-repo fixes, and capture before/after screenshots for visual review. Code-first detection; external package components are notated, never edited.
when_to_use: When auditing or updating a specific page/route in a Kiva web app for design-system alignment with shareable before/after screenshots. Trigger phrases - "audit this page's typography", "audit /lend-by-category spacing", "screenshot before and after, fix the type", "bring this page's spacing into design-system alignment".
---

# Audit Page Design

## Purpose

Audit a page (and its nested local components) for design-system alignment one
dimension at a time — **typography first, spacing second** — apply in-repo fixes,
and capture before/after screenshots for visual review. Detection is code-first;
screenshots are evidence, not the measuring tool. This is a workflow skill, not a
token-knowledge sub-skill — for token definitions it defers to the
`kiva-design-system` skill.

Jira ticket creation is **out of scope** here — this skill produces a local,
shareable run folder. (Jira push is a planned later phase.)

## Inputs (from the prompt, with fallbacks)

- **Route(s)** — primary input. If none given, ask; do not guess.
- **Dimension** — `typography` or `spacing` (one per run).
- **Entry component** — the Vue component that drives the route. Take it from the
  prompt if provided; otherwise ask "what Vue component drives this page?" before
  scanning. Import-tracing starts there.
- **Viewports** — optional; default `mobile,tablet,desktop`.
- **baseUrl** — optional; default `http://localhost:8080`. The app must already
  be running locally.
- **Logged-in mode** — optional; **off by default**. Only enable when the prompt
  explicitly asks to audit the page in a signed-in state. See "Logged-in mode"
  below and `references/capturing-screenshots.md`.

## Always skip the global header and footer

The page header and footer are **global elements**, shared across every route.
**Always exclude them — and everything nested inside them — from the audit**:
do not trace their imports, scan their source, or screenshot-judge them. They are
out of scope by default.

- This means the header/footer Vue components, their child components, and their
  logic — skip all of it to avoid wasting tokens on elements that aren't specific
  to this page.
- **Only exception:** the prompt explicitly asks to audit the header or footer.
  "Audit the page" does **not** count — that is the page body only.
- This is a scoping rule, not a fix rule: never edit header/footer source as a
  side effect of a page audit.

## Load the right knowledge

- Design-system tokens: route through the `kiva-design-system` skill to the
  matching sub-skill (`typography.md` or `spacing.md`). Verify class/token names
  against current `@kiva/kv-tokens` code — the sub-skills are Figma-canonical and
  code may lag.
- This skill's dimension file: `typography.md` or `spacing.md`.
- Editing mechanics: `references/swap-and-verify-mechanics.md`.
- External classification: `references/classifying-external.md`.
- Screenshots: `references/capturing-screenshots.md`.

> **The `kiva-design-system` skill is a required dependency** — it ships as a
> separate plugin (`kiva-design-system`, not this one). If its router or the
> `typography.md` / `spacing.md` sub-skill isn't available, **stop** and have the
> operator install it before judging anything:
>
> - Claude Code: `/plugin install kiva-design-system@kv-ui-elements`
> - Codex: `/plugins` → install **Kiva Design System**
>
> Don't audit typography from memory — the canonical type scale and the
> role→class mapping live in that skill, and it is the source of truth for every
> decision this dimension makes.

## Run loop

1. **Resolve target** — gather route(s), dimension, entry component, viewports,
   baseUrl from the prompt; confirm the app is reachable at `baseUrl`.
2. **Capture before** — run `scripts/capture.mjs` with `--label before` into
   `docs/design-audits/<date>-<route-slug>-<dimension>/before/`.
3. **Detect (code-first)** — from the entry component, trace imports to build the
   in-scope local component set; scan for the dimension's off-spec signals across
   all four detection surfaces. **Skip the global header and footer subtrees**
   (see "Always skip the global header and footer"). For each finding, classify
   local vs external by source path.
4. **Apply** — make local-fixable edits per the dimension's apply policy
   (typography: mechanical swaps; spacing: confidence-graded). Record
   external-only and design-system-gap items in `audit.md` — never edit those.
5. **Capture after** — run `scripts/capture.mjs` with `--label after` into the
   run folder's `after/`.
6. **Write `audit.md`** — in the run folder, with three buckets: Applied,
   Requires external update, Design-system gap; plus review notes.
7. **Review gate** — present before/after pairs + the `audit.md` summary, then
   **stop and wait for operator approval** before any next dimension. Typography
   and spacing are always separate runs/folders; never auto-chain. Do not
   auto-commit — the operator decides commit boundaries.

## Logged-in mode (only when asked)

Some routes only render meaningfully for a signed-in user. The dev environment has
a **fake auth** process activated by a cookie — no real login. **Only use this
when the prompt explicitly asks** for a logged-in audit; otherwise capture
logged-out.

- Pass `--logged-in` to `scripts/capture.mjs`. It injects
  `document.cookie='kvfa=2655698:recent/active/mfa;secure'` via `window` **before**
  the page loads, so the app initializes a logged-in state.
- **cms-page-server** (usually `http://localhost:3000`) has **client-side-only**
  auth, so there is an initialization delay — the script waits for it
  (`--auth-wait`, default 3000ms). Point `--base-url` at `:3000` for it.
- **UI (`kiva-ui.local`)** can render server pages as logged in; the same flag
  works and the wait is harmless.

See `references/capturing-screenshots.md` for the full flag reference.

## Run-folder layout

```
docs/design-audits/<date>-<route-slug>-<dimension>/
  before/   *.png
  after/    *.png
  audit.md
```
