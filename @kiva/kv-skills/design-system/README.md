# kiva-design-system

The design-system plugin category of [`@kiva/kv-skills`](../README.md).

The entry point for **using** Kiva's design system. For the styling mechanics
and code migrations see [`kiva-design-to-code`](../design-to-code/README.md);
for skill-authoring tooling see
[`kiva-skill-builder-utils`](../skill-builder-utils/README.md).

## Skills

| Skill | What it does |
|-------|--------------|
| `kiva-design-system` | Router/index for the design system, with token sub-skills: color, typography, spacing, radius, layout, color-themes. |

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

## Install on the Claude app (claude.ai / desktop)

This is the one Kiva skill meant for the Claude app and non-developer use. The
other categories (`kiva-design-to-code`, `kiva-skill-builder-utils`) are
developer-experience skills aimed at Claude Code / Codex, where a repo is
present — they assume access to files in the monorepo and aren't useful in the
app.

The Claude app has no marketplace; you upload a skill as a **folder**. To add
the design-system skill:

1. **Get the files.** Either download/clone this repo, or download the single
   skill folder. Keep the folder structure intact — the router `SKILL.md` and
   its supporting files must stay together in one folder:

   ```
   kiva-design-system/
     SKILL.md          ← the router (entry point)
     color.md
     color-themes.md
     typography.md
     layout.md
     spacing.md
     radius.md
   ```

   The simplest path: clone the repo and copy just
   `@kiva/kv-skills/design-system/skills/kiva-design-system/` — that one folder
   is the whole skill.

2. **Upload it.** In the Claude app, go to **Settings → Capabilities → Skills**
   and add the `kiva-design-system` folder. The app reads `SKILL.md` and loads
   the supporting `.md` files on demand, so the folder must be uploaded whole —
   don't flatten or split it.

> The folder structure is load-bearing: the router reads its sibling `.md`
> files by relative name. Uploading `SKILL.md` alone, or renaming/moving the
> supporting files, breaks routing.

## Updating

Installed plugins are served from a local **clone of the GitHub remote**, not
from your working tree. Editing files under
`kv-ui-elements/@kiva/kv-skills/…` does **not** change what an installed plugin
runs until those edits are committed and pushed, then re-pulled. The flow:

1. **Commit and push** your changes to `kiva/kv-ui-elements` (the branch the
   marketplace tracks — `main`).
2. **Bump the patch version** in both
   [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json) and
   [`.codex-plugin/plugin.json`](.codex-plugin/plugin.json) (e.g. `0.2.0` →
   `0.2.1`). The install cache is keyed by version, so a bump is what reliably
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
