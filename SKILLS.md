# Kiva Agent Skills (public)

Public [Agent Skills](https://agentskills.io) for Kiva, shipped from this repo as
installable plugin categories. Usable in Claude Code, Codex, and — by download —
on claude.ai / the web. No GitHub org membership required.

Canonical source: [`@kiva/kv-skills/`](./@kiva/kv-skills). v1 ships one category,
the `kiva-design-system` plugin.

## Install

| Audience | How |
|----------|-----|
| **Claude Code CLI** | `/plugin marketplace add kiva/kv-ui-elements` then `/plugin install kiva-design-system@kv-ui-elements`. No clone needed. |
| **Codex CLI** | `codex plugin marketplace add kiva/kv-ui-elements`, then open `codex`, run `/plugins`, and install **Kiva Design System**. Restart Codex after installing. No clone needed. |
| **claude.ai / web (no CLI)** | On GitHub, use **Code → Download ZIP** (or clone). Open `@kiva/kv-skills/design-system/skills/`, pick the skill folder you want, and upload it to a Project / Capability. |

### Claude Code

```bash
# Add the marketplace directly from GitHub (no clone required)
/plugin marketplace add kiva/kv-ui-elements

# Browse and install from the interactive UI
/plugin

# Or install directly
/plugin install kiva-design-system@kv-ui-elements
```

Installing a plugin gives you all skills in that category. You cannot install
individual skills via Claude Code's plugin system.

### Codex

```bash
# Add the marketplace directly from GitHub (no clone required)
codex plugin marketplace add kiva/kv-ui-elements

# Then open Codex and browse plugins
codex
/plugins
```

Install **Kiva Design System** from the `Kiva UI Elements` marketplace, then
restart Codex (or reload the session) so it picks up the updated plugin cache.

### claude.ai / web

1. On <https://github.com/kiva/kv-ui-elements>, click **Code → Download ZIP** (or clone the repo).
2. Open `@kiva/kv-skills/design-system/skills/` and choose the skill folder you
   need (e.g. `kiva-design-system`).
3. Upload that folder to your claude.ai Project or Capability per the
   [claude.ai skills docs](https://support.anthropic.com/).

## Plugin categories

| Category (folder) | Plugin | Skills |
|---|---|---|
| `@kiva/kv-skills/design-system` | `kiva-design-system` | `kiva-design-system` (router + color, typography, spacing, radius, layout, color-themes), `kiva-tailwind-css`, `kiva-header-element-audit`, `figma-design-system-to-skill` |

## Adding a skill (to an existing category)

1. Create a branch: `feat/add-{skill-name}`.
2. Add or edit the skill under
   `@kiva/kv-skills/<category>/skills/<skill-name>/` with a `SKILL.md` that has
   valid YAML frontmatter (`name`, `description`; optionally `when_to_use`,
   `allowed-tools`).
3. Bump the `version` in **both**
   `@kiva/kv-skills/<category>/.claude-plugin/plugin.json` and
   `@kiva/kv-skills/<category>/.codex-plugin/plugin.json`.
4. Open a PR.

## Adding a plugin (a new category)

Categories are how new plugins are added (Model A — one package, many plugins):

1. Create a branch: `feat/add-{category}-plugin`.
2. Create `@kiva/kv-skills/<category>/` containing:
   - `.claude-plugin/plugin.json` (`name: "kiva-<category>"`, `version`, `description`, `keywords`)
   - `.codex-plugin/plugin.json` (mirror + `"skills": "./skills/"` + an `interface` block)
   - `README.md` (category overview + install one-liners)
   - `skills/<skill-name>/SKILL.md` (one or more skills)
3. Register the plugin in **both** root marketplace files:
   - `.claude-plugin/marketplace.json` — add
     `{ "name": "kiva-<category>", "source": "./@kiva/kv-skills/<category>" }`
   - `.agents/plugins/marketplace.json` — add
     `{ "name": "kiva-<category>", "source": { "source": "local", "path": "./@kiva/kv-skills/<category>" }, "policy": { "installation": "AVAILABLE", "authentication": "ON_INSTALL" }, "category": "Development" }`
4. Open a PR. Users install it with `/plugin install kiva-<category>@kv-ui-elements`
   (Claude) or via `/plugins` (Codex).

Keep each `SKILL.md` under ~500 lines; put longer material in sibling files and
reference them. Skills follow the [Agent Skills open standard](https://agentskills.io).
