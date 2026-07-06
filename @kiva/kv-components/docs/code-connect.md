# Figma Code Connect

[Figma Code Connect](https://developers.figma.com/docs/code-connect/) maps a Figma
component's variants and properties to a real code snippet from this repo. Once a
component is mapped and published, designers and engineers see the actual
`@kiva/kv-components` usage — not generated markup — right next to the component in
Figma Dev Mode.

The snippet comes from a small mapping file we author and commit
(`src/vue/code-connect/<Name>.figma.ts`) — not from anything Figma infers. Mapping is
opt-in and incremental: nothing changes in Figma or the built package until we
explicitly publish a mapping.

The repo-side setup is already in place, so mapping a new component is just adding one
file. Start here; setup internals and tooling reference are at the bottom.

## Map a new component

1. **Get the component's Figma URL, including its `node-id`** — from the published
   component in the team library. (The component must already be published to a Figma
   team library; Code Connect maps to a published node, not a local frame.)
2. **Confirm the real property names/values.** Run the Figma MCP tools
   `get_context_for_code_connect` (and `get_code_connect_suggestions`) against that
   URL/node. Use their output — not guesses — for the Figma property names in the next
   step.
3. **Add `src/vue/code-connect/<Name>.figma.ts`**, following the KvButton worked example
   below. Map every Figma variant value; omit code props that have no Figma equivalent.
4. **Validate locally** — no network write:
   ```bash
   npm run codeconnect:parse --workspace @kiva/kv-components
   ```
   Expect a clean JSON array and exit code 0.
5. **Publish** — a deliberate, manual step (see [Publishing](#publishing)).

No config changes are needed per component — `figma.config.json`'s `include` glob, the
scoped `tsconfig.json`, and the ESLint/`dts` guards already cover any file added to
`src/vue/code-connect/`. Prioritize components by Dev Mode usage/visibility.

### Worked example: `KvButton.figma.ts`

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

This specific file is authored code-first and is **not yet published** — see
[KvButton reconciliation status](#kvbutton-reconciliation-status-pending).

### Best practices

- **PascalCase tag + package import** — snippets should read like real usage:
  `<KvButton ...>`, imported via `import { KvButton } from '@kiva/kv-components'`, not a
  relative path or the internal `.vue` filename.
- **Map slots to slot content** — a component's default/named slot content (e.g. a
  button's label) should come from the Figma text/content property, rendered between the
  opening and closing tags — not as a prop.
- **Map variants exhaustively** — every Figma enum value for a property needs an entry in
  the corresponding `getEnum(...)` map. An unmapped value silently resolves to `undefined`
  in the emitted snippet, which is worse than an explicit mapping.
- **Omit props with no Figma equivalent** — if a code prop has no visual/Figma-side
  counterpart (e.g. `KvButton`'s `to`, `href`, `type`), leave it out rather than
  inventing a Figma property for it.
- **Keep mappings in sync with the component** — when a mapped component's props, slots,
  or variant values change, update its `.figma.ts` file (and re-parse) in the same change,
  the same way you'd update a story or a test.

## Publishing

Publish writes the mapping to the **shared Figma org library** — every designer and
engineer with access to that library sees the result. Do this deliberately, not as a
side effect of another task:

```bash
npm run codeconnect:publish --workspace @kiva/kv-components
```

(equivalent to `figma connect publish`). Requires `FIGMA_ACCESS_TOKEN` with Code Connect
write scope in the environment. Whoever owns the Figma-side write for the team library
should run this — typically the person who reconciled the mapping's property names
against the real published node.

**Do not run `codeconnect:publish` as part of routine repo work** (adding a component,
fixing a build issue, etc.) — only when a mapping has been reconciled against a real
published Figma node and is ready to go live for the whole org.

## KvButton reconciliation status (pending)

`src/vue/code-connect/KvButton.figma.ts` is authored **code-first** and is **not yet
published**. It was written directly from `src/vue/KvButton.vue` while the design team
separately finalizes an updated Figma component, so two things in the file are
placeholders/assumptions, not confirmed facts:

- The `url=` comment line is a literal `TODO-RECONCILE` placeholder — there is no real
  Figma URL/`node-id` in it yet.
- The Figma property names (`Variant`, `State`, `Size`, `Label`) are **assumed** to match
  what the published component will expose; they have not been confirmed against a real
  node.

**Before publishing this mapping**, whoever picks it up once the design team publishes the
updated `KvButton` component should:

1. Get the published component's Figma URL, including its `node-id`.
2. Run `get_context_for_code_connect` (Figma MCP) against that node to confirm the real
   property names/values.
3. Update the `url=` line and fix any property-name mismatches in `KvButton.figma.ts`.
4. Re-validate: `npm run codeconnect:parse --workspace @kiva/kv-components`.
5. Publish deliberately: `npm run codeconnect:publish --workspace @kiva/kv-components`.

The emitted `<KvButton ...>` snippet itself is **code-derived** — it comes from
`KvButton.vue`'s actual props/slot, not from the Figma component — so reconciling the
Figma-side property names does not change what Dev Mode shows once published.

---

## Setup reference

Everything below is already in place and scoped to `@kiva/kv-components`. You don't need
to touch it to map a component — it's here for maintenance.

### Prerequisites (for publishing)

- **Figma plan**: Org or Enterprise (Code Connect publish is gated on this).
- **A published component** in a Figma team library — Code Connect maps to a published
  component's `node-id`, not a local/unpublished frame.
- **`FIGMA_ACCESS_TOKEN`** with Code Connect write scope, as a local/CI environment
  variable. **Never commit this token.** It's only required for `publish`; `parse` needs
  no token.
- **Figma MCP server connected**, to call `get_context_for_code_connect` /
  `get_code_connect_suggestions` against a real node before writing or reconciling a
  mapping.

### Repo config & guards

- **`figma.config.json`** (package root):
  ```json
  {
  	"codeConnect": {
  		"parser": "html",
  		"include": ["src/vue/code-connect/**/*.figma.ts"]
  	}
  }
  ```
  `parser: "html"` is the CLI's template-file mode for Vue and other non-React web
  frameworks — the mapping file produces the snippet string rather than the CLI parsing
  JSX. `include` is the only glob the CLI needs; it auto-discovers this config from the
  package directory. `importPaths` is intentionally omitted (a no-op under `html`); the
  import guarantee comes from each mapping file's own `imports` array.

- **`src/vue/code-connect/`** — dedicated directory for one `.figma.ts` file per mapped
  component, kept separate from `src/vue/` so mapping files are easy to find and exclude
  from the build.

- **Types** — `src/vue/code-connect/tsconfig.json` gives `.figma.ts` files the ambient
  `figma` module (`import figma from 'figma'`) via
  `@figma/code-connect/figma-types`, with `skipLibCheck` scoped to that config to
  tolerate a quirk in the vendored `.d.ts`. It's consumed **only** by the editor/IDE —
  not by `codeconnect:parse` (which reads `figma.config.json`) nor by the Vite/`dts`
  build (which uses the package's main `tsconfig.json`). The main `tsconfig.json` excludes
  `src/vue/code-connect/**`, so the main type environment never reconciles with the
  vendored ambient declarations.

- **Build/lint/test guards** — `.figma.ts` files use idioms that don't fit our normal
  rules, so they're excluded everywhere except `codeconnect:parse`:
  - **ESLint**: ignored via `ignorePatterns: ['**/src/vue/code-connect/**']` in the root
    `.eslintrc.cjs`. It must live in the root config (not a package `.eslintignore`)
    because the husky pre-commit hook runs each workspace's `lint` against staged files,
    and only `ignorePatterns` in an `.eslintrc.*` participates in ESLint's per-file config
    cascade regardless of which workspace's script is linting.
  - **`vite-plugin-dts`**: `vite.config.ts` excludes `src/vue/code-connect/**` from
    declaration generation.
  - **Jest**: no change needed — `testMatch` is scoped to `**/unit/specs/**`.
  - **Vite library build**: no change needed — the build follows the import graph from
    `src/index.ts`, and nothing imports `src/vue/code-connect/**`.

### CLI reference

Confirmed against the installed `@figma/code-connect@1.4.9`:

- `figma connect parse` — parses locally, converts to JSON, **prints to stdout only**. No
  network write. Exposed as `npm run codeconnect:parse --workspace @kiva/kv-components`.
- `figma connect publish` — parses and **publishes** to the shared org. Exposed as
  `npm run codeconnect:publish --workspace @kiva/kv-components`.
- Other CLI subcommands (not wrapped in scripts): `unpublish`, `create <figma-node-url>`
  (scaffold a mapping from a node URL), `migrate` (convert older formats), `preview`.
- `parser: "html"` is the confirmed value for Vue — the CLI's label for "Web Components,
  Angular and Vue" template-file mode.
- The template-file API — `figma.selectedInstance`, `instance.getEnum(...)`, and the
  `` figma.code`...` `` tagged template — parses cleanly with this CLI version under
  `parser: "html"`; no rewrite into the older `figma.connect()` style is needed for Vue.
