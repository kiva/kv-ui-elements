# Classifying external vs local (by source path)

Every finding is classified by where the rendering element's source resolves.
This decides whether the skill **edits** it or only **notates** it.

## Procedure

1. Start from the page's **entry component** (provided in the prompt, or asked
   for: "what Vue component drives this page?").
2. For each finding, find the tag/component that owns the off-spec styling and
   follow its `import` to a resolved path.
3. Classify:
   - Resolves under `node_modules/` (especially `node_modules/@kiva/*`) ->
     **external-only**. Record the package and the suggested change. **Never
     edit.**
   - Resolves under the repo's own `src/` (or other first-party source) ->
     **local-fixable**. Edit per the dimension's apply policy.
4. Plain HTML elements and first-party local components are local-fixable. A
   component imported from a package (e.g. `KvButton` from
   `@kiva/kv-components`) is external-only.

## audit.md buckets

Every run's `audit.md` ends with three buckets:

1. **Applied** — local edits made this run (file, line, before -> after).
2. **Requires external update** — package components; package name + suggested
   change. These need a ticket/PR against the source package.
3. **Design-system gap** — the correct semantic token exists in design intent but
   there is no shipped utility/class to map to yet (token sync in progress).

## Notes

- If a finding sits in a slot whose content comes from a parent, classify by
  where the **markup with the off-spec styling** actually lives, not where the
  slot is declared.
- When import-tracing is ambiguous (dynamic import, deep re-export), ask the
  operator rather than guessing.
