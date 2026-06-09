# kiva-skill-builder-utils

The skill-builder-utils plugin category of [`@kiva/kv-skills`](../README.md).

Meta-tooling for the people who **build and maintain** Kiva agent skills.
These are internal authoring workflows, not skills for consuming the design
system — they assume the monorepo is present and are aimed at Claude Code /
Codex.

## Skills

| Skill | What it does |
|-------|--------------|
| `figma-design-system-to-skill` | Process for extracting a design-system section from Figma into a skill under `design-system/skills/kiva-design-system`. |

Future skill-authoring and maintenance helpers belong here too.

## Install

```bash
# Claude Code
/plugin marketplace add kiva/kv-ui-elements
/plugin install kiva-skill-builder-utils@kv-ui-elements

# Codex
codex plugin marketplace add kiva/kv-ui-elements
# then: codex → /plugins → install "Kiva Skill Builder Utils"
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
   /plugin install kiva-skill-builder-utils@kv-ui-elements
   /reload-skills

   # Codex
   codex plugin marketplace update kiva/kv-ui-elements
   # then: codex → /plugins → reinstall "Kiva Skill Builder Utils"
   ```
