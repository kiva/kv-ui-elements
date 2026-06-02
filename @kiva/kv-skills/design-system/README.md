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
