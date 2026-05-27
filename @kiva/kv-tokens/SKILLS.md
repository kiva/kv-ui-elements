# @kiva/kv-tokens — Skills Index

Cross-agent skill files documenting design system intent. Each skill is a self-contained markdown file with YAML frontmatter (`name`, `description`, `when_to_use`) and is portable across agent platforms (Claude Code, Codex, OpenCode, Gemini, etc.).

Most skills capture **design intent from Figma**, the canonical source of truth for the design system; numeric values and token names may temporarily diverge from shipped code while sync work is in progress, so verify against current code before depending on specifics. A few skills instead document **integration mechanics** — how the shipped config and build pipeline actually work (see [tailwind](docs/skills/tailwind.md)).

## Skills

- [tailwind](docs/skills/tailwind.md) — How to use Tailwind v3 backed by Kiva's tokens: what the `@kiva/kv-tokens` preset changes vs. stock Tailwind (the `tw-` prefix, themable colors as CSS vars, disabled `fontSize`/`lineHeight` plugins, token-driven scales, the base layer), how to wire up the preset, and how it's compiled from DTCG tokens. Integration mechanics — defer to the per-topic skills below for which value to pick.
- [typography](docs/skills/typography.md) — Type scale, heading hierarchy, font families, pairing rules, and HTML/Tailwind mappings.
- [layout](docs/skills/layout.md) — Layout grid system: breakpoint tiers (XS/SM/MD/LG/XL), columns, gutters, margins, nested grids, and rules for placing content on the grid.
- [spacing](docs/skills/spacing.md) — Semantic spacing categories (Structure, Component Gap, Component Inset, Micro), the 4px-grain ramp, and the "between vs. inside" decision for picking a token.
- [radius](docs/skills/radius.md) — Border-radius token scale (`none` → `full`), per-component use cases, the `inner = outer − gap` formula, and the `tw-rounded` = 16px gotcha.
- [color](docs/skills/color.md) — Primitive palettes, the five themes (Default, Green Light, Green Dark, Marigold, Stone Light), the role/slot/state token grammar, accessibility levels per pairing, and rules for picking a token by purpose.
- [color-themes](docs/skills/color-themes.md) — Reference companion to `color`: the full per-theme token tables (name, hex, primitive source, description) for every text, background, border, and underline slot, plus shadow tokens. Load when you need canonical token data for a specific theme.
- [header-element-audit](docs/skills/header-element-audit.md) — Pre-emptive audit and cleanup of `<h1>`–`<h6>` elements and `tw-text-h1`–`tw-text-h6` utility classes ahead of the semantic typography remap.
- [figma-design-system-to-skill](docs/skills/figma-design-system-to-skill.md) — Reusable process for extracting a Figma design-system section (color, elevation, motion, etc.) into a portable skill file. Load this before starting any new design-system → skill task.

## Conventions

- One topic per skill file. Split a skill if it grows beyond what an agent can comfortably load on demand.
- Frontmatter: `name`, `description` (specific enough to gate relevance), `when_to_use` (concrete trigger conditions).
- Skill bodies should describe semantic intent first; code-level specifics second, with caveats where Figma and code may diverge.
- Skills tagged with `make_kit.include: true` in their frontmatter are exported into a Figma Make kit at `dist/make-kit/` by `npm run build` (see [README](README.md#figma-make-kit)). Process/authoring skills omit the block and are excluded.
