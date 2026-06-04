# kiva-design-system

The design-system plugin category of [`@kiva/kv-skills`](../README.md).

## Skills

| Skill | What it does |
|-------|--------------|
| `kiva-design-system` | Router/index for the design system, with token sub-skills: color, typography, spacing, radius, layout, color-themes. |
| `kiva-tailwind-css` | How the `@kiva/kv-tokens` Tailwind preset changes stock Tailwind. |
| `kiva-header-element-audit` | Audit/cleanup of `<h1>`–`<h6>` usage ahead of the semantic typography remap. |
| `figma-design-system-to-skill` | Process for extracting a design-system section from Figma into a skill. |

## Install

```bash
# Claude Code
/plugin marketplace add kiva/kv-ui-elements
/plugin install kiva-design-system@kv-ui-elements

# Codex
codex plugin marketplace add kiva/kv-ui-elements
# then: codex → /plugins → install "Kiva Design System"
```

See the repo-root [`SKILLS.md`](../../../SKILLS.md) for the full per-audience
install matrix (including claude.ai / web).

## Updating

Installed plugins are served from a local **clone of the GitHub remote**, not
from your working tree. Editing files under
`kv-ui-elements/@kiva/kv-skills/…` does **not** change what an installed plugin
runs until those edits are committed and pushed, then re-pulled. The flow:

1. **Commit and push** your changes to `kiva/kv-ui-elements` (the branch the
   marketplace tracks — `main`).
2. **Bump the patch version** in both
   [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json) and
   [`.codex-plugin/plugin.json`](.codex-plugin/plugin.json) (e.g. `0.1.1` →
   `0.1.2`). The install cache is keyed by version, so a bump is what reliably
   signals consumers' clients to refresh.
3. **Refresh and reinstall** on each client:

   ```bash
   # Claude Code
   /plugin marketplace update kv-ui-elements   # re-pull the remote clone
   /plugin install kiva-design-system@kv-ui-elements   # rebuild the cache
   /reload-skills                              # surface changes in this session

   # Codex
   codex plugin marketplace update kiva/kv-ui-elements
   # then: codex → /plugins → reinstall "Kiva Design System"
   ```

> **Note:** sub-skill content files (`color.md`, `typography.md`, `spacing.md`,
> `radius.md`, `layout.md`, `color-themes.md`) are supporting files loaded by
> the `kiva-design-system` router on demand — editing them follows the same
> commit → push → bump → refresh flow as `SKILL.md`.
