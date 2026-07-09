---
name: publish-code-connect
description: Detect changed Figma Code Connect mappings in @kiva/kv-components and publish them to the shared Figma org library — validate, optionally reconcile property names against the live node, then publish and verify in Dev Mode. Wholesale idempotent publish; no CI path (Figma allows only a 90-day user token for Code Connect write).
when_to_use: When a @kiva/kv-components Code Connect mapping (src/vue/code-connect/*.figma.ts) has been added or changed and needs to go live in Figma, or when someone asks to "publish code connect", "push the KvButton mapping to Figma", "sync Dev Mode snippets", or "why isn't the updated mapping showing in Figma". For how to AUTHOR or RECONCILE a mapping, defer to @kiva/kv-components/docs/code-connect.md.
---

# Publish Code Connect

## Purpose

Take Code Connect mappings that already exist in `@kiva/kv-components`
(`src/vue/code-connect/<Name>.figma.ts`) and get the changed ones live in the
shared Figma org library — safely and deliberately. This skill owns the
**publish workflow**: detect what changed, validate, reconcile if the Figma node
may have drifted, publish, verify.

It is **not** the authoring guide. For how a mapping is written and how property
names are reconciled against the real node, the canonical reference is
[`@kiva/kv-components/docs/code-connect.md`](../../../../kv-components/docs/code-connect.md).
Read it before writing or fixing a `.figma.ts` file; come here to publish one.

## Before you start: the token reality

Publishing writes to the shared org library, so it needs a Figma token — and
Figma constrains which token works:

- Use a **personal access token (PAT)** with scopes **`file_code_connect:write`**
  and **`file_content:read`**. Create it at Figma → Settings → Security →
  Personal access tokens.
- The PAT has a **90-day maximum expiry** and is **tied to your user account**.
- There is **no plan/service-account token** for Code Connect write — Figma's
  org-level "plan access tokens" explicitly exclude `file_code_connect:write`.
  That is why this is a deliberate local action and **not** a CI job: any
  automation would need a user PAT rotated every ~90 days.
- **Never commit the token.** Export it for the publish run only:

  ```bash
  export FIGMA_ACCESS_TOKEN="figd_..."
  ```

If a publish ever fails with a 401/403, the token has almost certainly expired —
regenerate it (same two scopes) and re-export.

## Workflow

Run every command from the repo root of `kv-ui-elements` unless noted.

### 1. Preflight

```bash
nvm use
```

Confirm the token is set (prints only whether it is present, never the value):

```bash
[ -n "$FIGMA_ACCESS_TOKEN" ] && echo "token set" || echo "TOKEN MISSING — see 'the token reality' above"
```

`figma.config.json` at `@kiva/kv-components/` already scopes discovery — no config
change is ever needed per component.

### 2. Detect what changed

List Code Connect mappings that differ from `main` (adjust the ref if you are
publishing from a different base):

```bash
git fetch origin main --quiet
git diff --name-only origin/main...HEAD -- '@kiva/kv-components/src/vue/code-connect/*.figma.ts'
```

- **No output** → nothing to publish. Stop unless you are intentionally
  re-publishing to repair the Figma side.
- **One or more files** → note the component(s); you will verify each in step 5.

> **Important — publish is wholesale.** `figma connect publish` re-uploads **all**
> mappings matched by `figma.config.json`, every run. There is **no
> per-component publish flag** under the `html` parser. This detection step tells
> you *whether* to publish and *which* components to verify afterward — it does
> **not** produce a partial upload. Re-publishing unchanged mappings is
> harmless (idempotent).

### 3. Validate (no network write)

```bash
npm run codeconnect:parse --workspace @kiva/kv-components
```

Expect a clean JSON array and exit code 0. `parse` is **structural only** — it
has no live component, so it does not catch property name/case mismatches. Those
surface only when Figma renders the published mapping (step 5).

### 4. Reconcile if the node may have drifted (conditional)

Skip this if the change was code-only (e.g. a slot rename that doesn't touch
Figma) and you are confident the Figma component's property names/values are
unchanged. Otherwise, confirm names **before** publishing:

- **Figma MCP (preferred):** call `get_context_for_code_connect` against the
  component's node (the `fileKey` + `node-id` from the `url=` comment atop the
  `.figma.ts` file). It returns every property's name, type, and variant options
  plus nested `TEXT` layers.
- **Fallbacks** (`figma connect create <node-url>` diff, or Dev Mode Properties
  panel) and the full reconciliation loop are documented in
  [`code-connect.md`](../../../../kv-components/docs/code-connect.md#reading-the-real-figma-property-names).

Update the `.figma.ts` file for any mismatch, then re-run step 3.

### 5. Publish

```bash
npm run codeconnect:publish --workspace @kiva/kv-components
```

This parses and publishes to the shared org. Requires `FIGMA_ACCESS_TOKEN` in the
environment (step 1).

### 6. Verify in Dev Mode

For **each** component flagged in step 2, open it in Figma Dev Mode and confirm:

- the `@kiva/kv-components` snippet renders (not generated markup), and
- **no "Property not found"** appears on any mapped prop.

A "Property not found" means a name/case mismatch that `parse` cannot catch — go
back to step 4, fix the `.figma.ts`, and re-publish.

## Guardrails

- **Publish deliberately.** Never run `codeconnect:publish` as a side effect of
  unrelated repo work (adding a component, fixing a build). Only publish a
  mapping that has been validated and, if needed, reconciled against the real
  node.
- **Keep the token out of git.** Export it in the shell for the run; do not add
  it to a committed file.
- **Whoever reconciled it, publishes it.** The person who confirmed the
  property names against the live node is best placed to run the publish and
  verify Dev Mode.
- **No CI shortcut exists today.** If someone asks to automate this in GitHub
  Actions, the blocker is the 90-day user-scoped PAT (see "the token reality") —
  raise the rotation/robot-seat tradeoff rather than wiring a long-lived token
  into CI.
