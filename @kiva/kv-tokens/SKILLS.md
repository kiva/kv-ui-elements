# @kiva/kv-tokens — Skills Index

Cross-agent skill files documenting design system intent. Each skill is a self-contained markdown file with YAML frontmatter (`name`, `description`, `when_to_use`) and is portable across agent platforms (Claude Code, Codex, OpenCode, Gemini, etc.).

Skills capture **design intent from Figma**, the canonical source of truth for the design system. Numeric values and token names may temporarily diverge from shipped code while sync work is in progress — verify against current code before depending on specifics.

## Skills

- [typography](docs/skills/typography.md) — Type scale, heading hierarchy, font families, pairing rules, and HTML/Tailwind mappings.

## Conventions

- One topic per skill file. Split a skill if it grows beyond what an agent can comfortably load on demand.
- Frontmatter: `name`, `description` (specific enough to gate relevance), `when_to_use` (concrete trigger conditions).
- Skill bodies should describe semantic intent first; code-level specifics second, with caveats where Figma and code may diverge.
