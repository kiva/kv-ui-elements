# Figma Code Connect

[Figma Code Connect](https://developers.figma.com/docs/code-connect/) maps a Figma
component's variants and properties to a real code snippet from this repo. Once a
component is mapped and published, designers and engineers see the actual
`@kiva/kv-components` usage — not generated markup — right next to the component in
Figma Dev Mode.

This guide covers the repo-side setup, how to map a new component, and how to publish.
See the design doc for background and decisions:
[`~/kiva/docs/kv-ui-elements-docs/specs/2026-07-02-figma-code-connect-kv-button-design.md`](../../../docs/kv-ui-elements-docs/specs/2026-07-02-figma-code-connect-kv-button-design.md).

## 1. What Code Connect gives us

- A Figma component instance, selected in Dev Mode, resolves to a real
  `<KvComponent ...>` snippet with real prop values instead of Figma's generic
  "inspect" output.
- The snippet is generated from a small mapping file we author and commit —
  `src/vue/code-connect/<Name>.figma.ts` — not from anything Figma infers automatically.
- Mapping a component is opt-in and incremental: nothing changes in Figma or in the
  built package until we explicitly publish a mapping.

## 2. Prerequisites

- **Figma plan**: Org or Enterprise (Code Connect publish is gated on this).
- **The component must already be published** to a team library in Figma — Code
  Connect maps to a published component's `node-id`, not to a local/unpublished frame.
- **`FIGMA_ACCESS_TOKEN`** with Code Connect write scope, set as a local/CI environment
  variable. **Never commit this token.** It's only required to run `publish` (see
  below); `parse` needs no token.
- **Figma MCP server connected**, so you can call `get_context_for_code_connect` (and
  `get_code_connect_suggestions`) against a real published node to confirm property
  names/values before writing or reconciling a mapping.

## 3. How the setup hangs together

All of this is scoped to `@kiva/kv-components` and already in place:

- **`figma.config.json`** (package root):
  ```json
  {
  	"codeConnect": {
  		"parser": "html",
  		"include": ["src/vue/code-connect/**/*.figma.ts"]
  	}
  }
  ```
  `parser: "html"` is the correct mode for Vue (and other non-React web frameworks) —
  it's the CLI's template-file mode, where the mapping file itself produces the
  snippet string rather than the CLI parsing JSX. `include` is the only glob the CLI
  needs; it auto-discovers this config file from the package directory, so no `--dir`
  flag is required when running the scripts below.

  Note: `figma.config.json` intentionally does **not** set `importPaths` — that key is
  only consumed by the CLI's React parser internally and is a no-op under `parser:
  "html"`. The import guarantee for an emitted snippet comes from each mapping file's
  own `imports` array (see `KvButton.figma.ts` below), not from config.

- **`src/vue/code-connect/`** — dedicated directory for one `.figma.ts` file per
  mapped component. Kept separate from `src/vue/` (where the actual `.vue` components
  live) so mapping files are easy to find and easy to exclude from the build.

- **Types**: `.figma.ts` files get the ambient `figma` module (`import figma from
  'figma'`) via a scoped `tsconfig.json` at `src/vue/code-connect/tsconfig.json`:
  ```json
  {
  	"extends": "../../../tsconfig.json",
  	"compilerOptions": {
  	  "types": [
  		"@figma/code-connect/figma-types"
  	  ],
  	  "skipLibCheck": true
  	},
  	"include": [
  		"**/*.figma.ts"
  	],
  	"exclude": []
  }
  ```
  This is deliberately **not** in the package's main `tsconfig.json` — that file
  excludes `src/vue/code-connect/**` entirely (`"exclude": [..., "src/vue/code-connect/**"]`),
  so the main type environment never has to reconcile with the vendored
  `@figma/code-connect/figma-types` ambient declarations. `skipLibCheck` is scoped to
  just this child config for the same reason: it's only needed to tolerate a known
  quirk in that vendored `.d.ts`, not to relax checking on our own source.

- **Build/lint/test guards** — `.figma.ts` files use the ambient `figma` import and
  template-file idioms that don't fit our normal component lint/type rules, so they're
  excluded everywhere that isn't `codeconnect:parse`:
  - **ESLint**: ignored via `ignorePatterns: ['**/src/vue/code-connect/**']` in the
    root `.eslintrc.cjs`. This has to live in the root config (not a package-level
    `.eslintignore`) because the repo's husky pre-commit hook runs every workspace's
    own `lint` script against any staged `.ts/.js/.vue` file, and only `ignorePatterns`
    in an `.eslintrc.*` participates in ESLint's per-file config cascade regardless of
    which workspace's script is doing the linting.
  - **`vite-plugin-dts`**: `@kiva/kv-components/vite.config.ts` excludes
    `src/vue/code-connect/**` from declaration generation, since mapping files aren't
    part of the package's public API surface.
  - **Jest**: no change needed — `jest.config.cjs`'s `testMatch` is scoped to
    `**/unit/specs/**`, so `.figma.ts` files were never in scope.
  - **Vite library build**: no change needed either — the build follows the import
    graph from `src/index.ts`, and nothing imports `src/vue/code-connect/**`, so
    mapping files never end up in `dist/`.
  - Mapping files are validated by `codeconnect:parse` (below), not by ESLint or `tsc`
    on the main project — that's the whole point of scoping them out.

## 4. Per-component recipe

To map a new component:

1. Get its **Figma URL, including the `node-id`**, from the published component in
   the team library.
2. Use the Figma MCP tools — `get_context_for_code_connect` (and
   `get_code_connect_suggestions`) — against that URL/node to get the real property
   names and values.
3. Add `src/vue/code-connect/<Name>.figma.ts`, following `KvButton.figma.ts` as the
   worked example (below).
4. Run the parse command (see §8) to validate the file structurally — no publish, no
   network write.
5. Publish (§5) — a deliberate, manual step.

### Worked example: `src/vue/code-connect/KvButton.figma.ts`

```ts
// url=TODO-RECONCILE: paste the published KvButton Figma URL (with node-id) here before publishing
// source=src/vue/KvButton.vue
// component=KvButton
//
// NOTE (CIT-4435, Code-Connect-only): authored from the code component while the
// design team finalizes the Figma component. Before `figma connect publish`, confirm
// the Figma property NAMES/VALUES below against the real component via
// `get_context_for_code_connect` and fill in the url above. The emitted snippet
// (the <KvButton …> output) is code-derived and does not change on reconciliation.
import figma from 'figma';

const instance = figma.selectedInstance;

// Figma property names assumed; confirm on reconcile. Values are exhaustive per KvButton.vue.
const variant = instance.getEnum('Variant', {
	Primary: 'primary',
	Secondary: 'secondary',
	Link: 'link',
	Danger: 'danger',
	Ghost: 'ghost',
	Caution: 'caution',
});

const state = instance.getEnum('State', {
	Default: '',
	Active: 'active',
	Disabled: 'disabled',
	Loading: 'loading',
});

const size = instance.getEnum('Size', {
	Default: 'default',
	Small: 'small',
});

const label = instance.getString('Label');

export default {
	example: figma.code`
		<KvButton
			variant="${variant}"
			${state ? figma.code`state="${state}"` : ''}
			${size !== 'default' ? figma.code`size="${size}"` : ''}
		>
			${label}
		</KvButton>
	`,
	imports: ["import { KvButton } from '@kiva/kv-components'"],
	id: 'kv-button',
	metadata: { nestable: true },
};
```

Note this specific file's status — see §9, it is not yet published.

## 5. Publishing

Publish writes the mapping to the **shared Figma org library** — every designer and
engineer with access to that library sees the result. Do this deliberately, not as a
side effect of another task:

```bash
npm run codeconnect:publish --workspace @kiva/kv-components
```

(equivalent to `figma connect publish`, run from the package directory or via
`--workspace`). Requires `FIGMA_ACCESS_TOKEN` with Code Connect write scope in the
environment. Whoever owns the Figma-side write for the team library should run this —
typically the person who reconciled the mapping's property names against the real
published node (see §9's checklist for `KvButton`).

**Do not run `codeconnect:publish` as part of routine repo work** (adding a component,
fixing a build issue, etc.) — only when a mapping has been reconciled against a real
published Figma node and is ready to go live for the whole org.

## 6. Best practices

- **PascalCase tag + package import** — snippets should read like real usage:
  `<KvButton ...>`, imported via `import { KvButton } from '@kiva/kv-components'`, not
  a relative path or the internal `.vue` filename.
- **Map slots to slot content** — a component's default/named slot content (e.g. a
  button's label) should come from the Figma text/content property, rendered between
  the opening and closing tags — not as a prop.
- **Map variants exhaustively** — every Figma enum value for a property needs an entry
  in the corresponding `getEnum(...)` map. An unmapped Figma value silently resolves to
  `undefined` in the emitted snippet, which is worse than an explicit mapping.
- **Omit props with no Figma equivalent** — if a code prop has no visual/Figma-side
  counterpart (e.g. `KvButton`'s `to`, `href`, `type`), leave it out of the mapping
  rather than inventing a Figma property for it.
- **Keep mappings in sync with the component** — when a mapped component's props,
  slots, or variant values change, update its `.figma.ts` file (and re-parse) in the
  same change, the same way you'd update a story or a test.

## 7. Incremental rollout

Mapping the rest of the component suite is additive, one file at a time:

- Each new component is one `src/vue/code-connect/<Name>.figma.ts` file, following the
  recipe in §4.
- **No further config changes are needed** — `figma.config.json`'s `include` glob
  (`src/vue/code-connect/**/*.figma.ts`), the scoped `tsconfig.json`, and the
  ESLint/`dts` guards already cover any file added to that directory.
- Prioritize components by Dev Mode usage/visibility, not build order.

## 8. Confirmed tooling notes

Confirmed against the installed `@figma/code-connect@1.4.9` CLI:

- `figma connect parse [options]` — parses locally, converts to JSON, **prints to
  stdout only**. No publish, no network write. This is the safe local-validation
  command, exposed as:
  ```bash
  npm run codeconnect:parse --workspace @kiva/kv-components
  ```
- `figma connect publish [options]` — parses and **publishes** to the shared org.
  Exposed as:
  ```bash
  npm run codeconnect:publish --workspace @kiva/kv-components
  ```
- Other CLI subcommands available (not wrapped in an npm script here): `unpublish`,
  `create <figma-node-url>` (scaffold a new mapping file from a node URL), `migrate`
  (convert older Code Connect formats), `preview` (preview the rendered snippet in the
  Figma inspect panel).
- `parser: "html"` in `figma.config.json` is the confirmed, correct value for Vue —
  it's the CLI's own label for "Web Components, Angular and Vue" template-file mode.
- The template-file authoring API — `figma.selectedInstance`, `instance.getEnum(...)`,
  and the `` figma.code`...` `` tagged template — is confirmed to parse cleanly with
  this CLI version and `parser: "html"`; no rewrite into the older `figma.connect()`
  API style is needed for Vue.
- `npm run codeconnect:parse --workspace @kiva/kv-components` on `KvButton.figma.ts`
  returns a clean, single-entry JSON array (exit code 0) with the mapping's `component`,
  `template`, `imports`, and `metadata` — confirming the file structurally validates
  ahead of any real Figma node existing to resolve it against.

## 9. `KvButton` reconciliation status (pending)

`src/vue/code-connect/KvButton.figma.ts` is authored **code-first** and is **not yet
published**. It was written directly from `src/vue/KvButton.vue` while the design team
separately finalizes an updated Figma component, so two things in the file are
placeholders/assumptions, not confirmed facts:

- The `url=` comment line is a literal `TODO-RECONCILE` placeholder — there is no real
  Figma URL/`node-id` in it yet.
- The Figma property names (`Variant`, `State`, `Size`, `Label`) are **assumed** to
  match what the published component will expose; they have not been confirmed against
  a real node.

**Before publishing this mapping**, whoever picks this up once the design team
publishes the updated `KvButton` component should:

1. Get the published component's Figma URL, including its `node-id`.
2. Run `get_context_for_code_connect` (Figma MCP) against that node to confirm the real
   property names/values.
3. Update the `url=` line and fix any property-name mismatches found in step 2 inside
   `KvButton.figma.ts`.
4. Re-validate: `npm run codeconnect:parse --workspace @kiva/kv-components`.
5. Publish deliberately: `npm run codeconnect:publish --workspace @kiva/kv-components`
   (writes to the shared org — see §5).

The emitted `<KvButton ...>` snippet itself is **code-derived** — it comes from
`KvButton.vue`'s actual props/slot, not from the Figma component — so reconciling the
Figma-side property names does not change what Dev Mode shows once published.
