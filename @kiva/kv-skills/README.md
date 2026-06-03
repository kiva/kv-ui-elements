# @kiva/kv-skills

Kiva's public [Agent Skills](https://agentskills.io) for Claude Code, Codex, and
other agents that follow the open skill standard. This package is the
**canonical source** for Kiva skills.

## How it's organized (multi-plugin container)

Each subfolder is an independently-installable **plugin category**:

```
@kiva/kv-skills/
└── design-system/        ← plugin "kiva-design-system"
    ├── .claude-plugin/plugin.json
    ├── .codex-plugin/plugin.json
    ├── README.md
    └── skills/<skill-name>/SKILL.md
```

The repo-root marketplace files (`.claude-plugin/marketplace.json`,
`.agents/plugins/marketplace.json`) expose each category as a plugin. Install
instructions for every audience live in the repo-root
[`SKILLS.md`](../../SKILLS.md).

## Categories

| Category (folder) | Plugin name | Description |
|---|---|---|
| `design-system` | `kiva-design-system` | Design tokens, the Kiva Tailwind preset, typography/color/spacing/radius/layout, header audits, and Figma-to-skill extraction. |

## Adding a skill (to an existing category)

1. Add a folder under `<category>/skills/<skill-name>/` with a `SKILL.md` that has
   valid YAML frontmatter (`name`, `description`).
2. Bump the `version` in **both** `<category>/.claude-plugin/plugin.json` and
   `<category>/.codex-plugin/plugin.json`.
3. Open a PR.

## Adding a plugin (a new category)

1. Create `@kiva/kv-skills/<category>/` with `.claude-plugin/plugin.json`,
   `.codex-plugin/plugin.json`, `README.md`, and a `skills/` folder.
2. Register it: add one entry to `.claude-plugin/marketplace.json` and one to
   `.agents/plugins/marketplace.json` at the repo root, each pointing `source`
   at `./@kiva/kv-skills/<category>`.
3. Open a PR.

See the repo-root [`SKILLS.md`](../../SKILLS.md) for full details and the
install matrix.
