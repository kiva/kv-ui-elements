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
2. **Confirm the real property names/values** against the published node — never guess.
   Every `getEnum`/`getString`/`findText` name and enum value must match Figma **exactly,
   including case**, or Figma shows "Property not found" on that prop. See
   [Reading the real Figma property names](#reading-the-real-figma-property-names) for how
   (Figma MCP preferred; CLI/manual fallbacks).
3. **Add `src/vue/code-connect/<Name>.figma.ts`**, following the KvButton worked example
   below. Map every Figma variant value; omit code props that have no Figma equivalent.
4. **Validate locally** — no network write:
   ```bash
   npm run codeconnect:parse --workspace @kiva/kv-components
   ```
   Expect a clean JSON array and exit code 0. Note: `parse` is structural only — it has no
   live component, so it does **not** catch name/case mismatches. Those surface only when
   Figma renders the published mapping, so verify in Dev Mode after publishing.
5. **Publish** — a deliberate, manual step (see [Publishing](#publishing)).

No config changes are needed per component — `figma.config.json`'s `include` glob, the
scoped `tsconfig.json`, and the ESLint/`dts` guards already cover any file added to
`src/vue/code-connect/`. Prioritize components by Dev Mode usage/visibility.

### Reading the real Figma property names

Steps 1–2 need the component's actual property names, enum values, and nested layer names.
These must match your mapping **exactly, including case** — a mismatch renders "Property
not found" on that prop in Dev Mode. Get them one of these ways, best first:

- **Figma MCP server (preferred).** With the Figma Dev Mode MCP server connected, call
  `get_context_for_code_connect` against the node (it takes the `fileKey` + `node-id` from
  the component URL). It returns each property's name, type, and variant options, plus the
  descendant tree — including nested `TEXT` layers like a button's `label`, which are read
  with `findText`, not `getString`. `get_code_connect_suggestions` can propose a starting
  template. This is how the `KvButton` mapping was reconciled.
- **CLI fallback — `figma connect create <figma-node-url>`.** If MCP isn't available, this
  scaffolds a mapping file from the node via the Figma REST API (needs `FIGMA_ACCESS_TOKEN`
  with read scope). You don't keep the generated file — diff it against yours to read the
  real names/values, then discard it.
- **Manual fallback — Figma Dev Mode.** Open the component in Dev Mode and read the
  Properties panel: each variant property's name and its options appear there verbatim. For
  nested content (e.g. a text label mapped with `findText`), copy the exact layer name from
  the Layers panel. Slowest and easiest to get casing wrong — always confirm against a
  publish.

### Worked example: `KvButton.figma.ts`

```ts
// url=https://www.figma.com/design/TPmBUB4olYPMF6glEhBGDG/Ecosystem-2026--WIP-?node-id=20280-98&m=dev
// source=src/vue/KvButton.vue
// component=KvButton
//
// Reconciled against the published "KvButton (WIP)" component (CIT-4435) via
// get_context_for_code_connect: Figma property names AND enum values are lowercase,
// `label` is a nested TEXT layer (read with findText, not a component property), and
// Figma's `hover` state has no KvButton prop value so it maps to the default (no attr).
import figma from 'figma';

const instance = figma.selectedInstance;

// Property name and enum values must match Figma exactly (all lowercase here).
const variant = instance.getEnum('variant', {
	primary: 'primary',
	secondary: 'secondary',
	danger: 'danger',
	link: 'link',
	ghost: 'ghost',
	caution: 'caution',
});

// `hover` is a visual-only Figma state with no KvButton equivalent -> render as default ('').
const state = instance.getEnum('state', {
	default: '',
	active: 'active',
	disabled: 'disabled',
	loading: 'loading',
	hover: '',
});

const size = instance.getEnum('size', {
	default: 'default',
	small: 'small',
});

// `label` is a nested TEXT layer, not a component property — read its text content.
const label = instance.findText('label').textContent;

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

Note the two things that trip people up here, both confirmed from the real component
(never assumed): **property names and enum values are lowercase** and must match Figma's
case exactly, and the **`label` is a nested TEXT layer** read with `findText(...).textContent`
— not a component text property, so `getString('label')` would render "Property not found".

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

## KvButton reconciliation status (published)

`src/vue/code-connect/KvButton.figma.ts` was authored **code-first** from
`src/vue/KvButton.vue`, then **reconciled against the published "KvButton (WIP)" component
and published** (CIT-4435). Its `url=` points at the real node and its property names/values
are confirmed via `get_context_for_code_connect`, not assumed.

It doubles as the reference for what reconciliation actually caught — the mapping was first
written with assumed names and every prop showed "Property not found" in Dev Mode until:

- Property names **and** enum values were lowercased to match Figma exactly (`Variant` →
  `variant`, `Primary` → `primary`, …).
- The `label` was switched from `getString('Label')` to `findText('label').textContent`,
  because it's a nested TEXT layer, not a component text property.
- Figma's extra `hover` state (no KvButton equivalent) was mapped to `''` rather than left
  unmapped (which would render `undefined`).

If the design team later changes the component, re-reconcile with the same loop: get the
node URL → confirm names/values (see
[Reading the real Figma property names](#reading-the-real-figma-property-names)) → update
the file → `npm run codeconnect:parse` → `npm run codeconnect:publish`. The emitted
`<KvButton ...>` snippet is **code-derived** (from `KvButton.vue`'s props/slot), so
reconciling Figma-side names changes whether props resolve, not the snippet's shape.

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
- **A way to read the component's real property names/values** before writing or
  reconciling a mapping — the **Figma MCP server** (`get_context_for_code_connect` /
  `get_code_connect_suggestions`) preferred, or the `figma connect create <node-url>` CLI
  / Figma Dev Mode as fallbacks. See
  [Reading the real Figma property names](#reading-the-real-figma-property-names).

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
