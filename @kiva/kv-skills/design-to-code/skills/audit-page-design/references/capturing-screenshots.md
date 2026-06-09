# Capturing screenshots

`scripts/capture.mjs` drives the Playwright **Node API** to take consistent
before/after captures of routes on a **locally-running** app. It installs nothing
into the target repo (it resolves Playwright from a global install). Using the API
rather than the `playwright screenshot` CLI is what lets it scroll for lazy
content and inject the dev auth cookie.

## One-time setup

```bash
npm install -g playwright && npx playwright install chromium
```

## Invocation

```bash
node <skill>/scripts/capture.mjs \
  --base-url http://localhost:8080 \
  --routes /lend-by-category \
  --viewports mobile,tablet,desktop \
  --label before \
  --out-dir docs/design-audits/<date>-<route-slug>-<dimension>/before
```

Run it again with `--label after` and the `after/` out-dir once fixes are applied.

To capture a signed-in state (only when asked — see SKILL.md "Logged-in mode"):

```bash
node <skill>/scripts/capture.mjs \
  --base-url http://localhost:3000 \
  --routes / \
  --logged-in \
  --label before \
  --out-dir docs/design-audits/<date>-<route-slug>-<dimension>/before
```

## Flags

| Flag | Default | Meaning |
|---|---|---|
| `--base-url` | `http://localhost:8080` | Where the app is running locally. |
| `--routes` | (required) | Comma-separated routes, e.g. `/a,/b`. |
| `--viewports` | `mobile,tablet,desktop` | Subset of the named frames below. |
| `--label` | `before` | `before` or `after`. |
| `--out-dir` | `.` | Output folder; created if missing. |
| `--logged-in` | (off) | Inject the dev fake-auth cookie before load. Only when asked. |
| `--auth-cookie` | `kvfa=2655698:recent/active/mfa` | Override the auth cookie value. |
| `--auth-wait` | `3000` | ms to wait after load for client-side auth (cms-page-server). |
| `--scroll-step` | `800` | px scrolled per step while walking to the bottom. |
| `--scroll-delay` | `350` | ms between scroll steps (the "normal rate" for lazy load). |

## Viewport frames

Mapped to Kiva design-system layout tiers (verify against `layout.md` /
`@kiva/kv-tokens` before relying on exact px):

| Name | Width x Height | Tier |
|---|---|---|
| `mobile` | 390 x 844 | SM design frame |
| `tablet` | 768 x 1024 | MD (734-1023) |
| `desktop` | 1280 x 900 | LG (1024-1439) |

## Output naming

`<route-slug>__<viewport>__<label>.png` (e.g.
`lend-by-category__desktop__before.png`). The slug lowercases the route and
replaces non-alphanumerics with `-`; `/` becomes `root`.

## Lazy-loaded / below-the-fold content

Before each screenshot the script scrolls the page to the bottom at a **normal
rate** (`--scroll-step` px every `--scroll-delay` ms), pausing at each step so
lazy-loaded content below the fold has time to fetch and render, and continuing
until the page stops growing. It then returns to the top and takes a full-page
screenshot. Slow down (raise `--scroll-delay`) for routes whose content streams
in late.

## Logged-in mode

`--logged-in` injects `document.cookie='kvfa=2655698:recent/active/mfa;secure'`
via `window` **before** the page loads, so the app boots in a signed-in state.
This is the dev **fake-auth** process, not a real login — use it only when the
prompt asks for a logged-in audit.

- **cms-page-server** (`http://localhost:3000`) has client-side-only auth, so the
  script waits `--auth-wait` ms (default 3000) after load for it to initialize and
  re-render. Raise it if the signed-in UI appears late.
- **kiva-ui.local** can render pages as logged in server-side; the same flag works
  and the wait is harmless.

## Notes

- The app must already be running locally; this script does not start it.
- A final 1.5s settle runs after scrolling; raise `--scroll-delay`/`--auth-wait`
  for data-heavy routes that hydrate slowly.
- Full-page screenshots are taken so long pages are captured end-to-end.
