# kiva-design-to-code

The design-to-code plugin category of [`@kiva/kv-skills`](../README.md).

Developer tooling for turning Kiva designs into compliant code: how the
styling system works, and how to bring existing code into design-system
alignment. These skills assume a repo is present and are aimed at Claude
Code / Codex, not the Claude app.

## Skills

| Skill | What it does |
|-------|--------------|
| `kiva-tailwind-css` | How the `@kiva/kv-tokens` Tailwind preset changes stock Tailwind. |
| `audit-page-design` | Audit a page against the design system one dimension at a time (typography, then spacing), apply in-repo fixes, and capture before/after screenshots. |
| `publish-code-connect` | Detect changed Code Connect mappings in `@kiva/kv-components` and publish them to Figma — validate, reconcile, publish, verify. |

> **Depends on `kiva-design-system`.** `audit-page-design` judges against the
> design-system token sub-skills, so install the
> [`kiva-design-system`](../design-system/README.md) plugin alongside this one.
> For *which* token to pick (color, type, spacing, radius, layout), that router
> is the source of truth — this category is about the styling mechanics and
> code-alignment workflow, not token choice.

## Install

```bash
# Claude Code
/plugin marketplace add kiva/kv-ui-elements
/plugin install kiva-design-to-code@kv-ui-elements

# Codex
codex plugin marketplace add kiva/kv-ui-elements
# then: codex → /plugins → install "Kiva Design to Code"
```

See the repo-root [`SKILLS.md`](../../../SKILLS.md) for the full per-audience
install matrix.

## Updating

Installed plugins are served from a clone of the GitHub remote, not your
working tree. After editing files here:

1. **Commit and push** to the branch the marketplace tracks (`main`).
2. **Bump the patch version** in both
   [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json) and
   [`.codex-plugin/plugin.json`](.codex-plugin/plugin.json). The install cache is
   keyed by version, so a bump is what reliably signals clients to refresh.
3. **Refresh and reinstall** on each client:

   ```bash
   # Claude Code
   /plugin marketplace update kv-ui-elements
   /plugin install kiva-design-to-code@kv-ui-elements
   /reload-skills

   # Codex
   codex plugin marketplace update kiva/kv-ui-elements
   # then: codex → /plugins → reinstall "Kiva Design to Code"
   ```
