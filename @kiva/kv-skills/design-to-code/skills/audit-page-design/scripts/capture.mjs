// capture.mjs — standalone before/after screenshot capture for audit-page-design.
//
// Usage:
//   node capture.mjs --base-url http://localhost:8080 --routes /lend-by-category \
//     --viewports mobile,tablet,desktop --label before --out-dir ./before
//
// Logged-in capture (dev fake-auth; only when asked):
//   node capture.mjs --base-url http://localhost:3000 --routes / \
//     --logged-in --label before --out-dir ./before
//
// Uses the Playwright Node API (not the `playwright screenshot` CLI) so it can
// inject the dev auth cookie before page load and scroll the page to trigger
// lazy-loaded, below-the-fold content. One-time setup (installs nothing into the
// target repo): `npm install -g playwright && npx playwright install chromium`.
//
// Viewport frames map to Kiva design-system layout tiers:
//   mobile  = SM design frame (390)
//   tablet  = MD tier (768, within 734-1023)
//   desktop = LG tier (1280, within 1024-1439)
// Verify against layout.md / kv-tokens before relying on exact values.

import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

export const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 900 },
};

const DEFAULT_VIEWPORTS = ['mobile', 'tablet', 'desktop'];

// Dev-only fake-auth cookie. Setting it before the page loads makes the app
// initialize a logged-in state. `secure` is honored on http://localhost because
// Chromium treats localhost as a secure context.
export const DEFAULT_AUTH_COOKIE = 'kvfa=2655698:recent/active/mfa';

// Defaults tuned for "normal-rate" scrolling so lazy content has time to fetch.
const DEFAULT_AUTH_WAIT = 3000; // ms — cms-page-server (:3000) client-side auth delay
const DEFAULT_SCROLL_STEP = 800; // px per step
const DEFAULT_SCROLL_DELAY = 350; // ms between steps
const SETTLE_MS = 1500; // final settle before the screenshot

const BOOLEAN_FLAGS = new Set(['--logged-in']);
const NUMERIC_FLAGS = new Set(['--auth-wait', '--scroll-step', '--scroll-delay']);

export function slugifyRoute(route) {
  const trimmed = String(route).replace(/^\/+|\/+$/g, '');
  if (trimmed === '') return 'root';
  return trimmed.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();
}

export function outfileName(route, viewport, label) {
  return `${slugifyRoute(route)}__${viewport}__${label}.png`;
}

// The exact assignment the dev environment expects, run via window before the
// page's own scripts (Playwright addInitScript) so auth is live on first render.
export function buildAuthInitScript(cookie = DEFAULT_AUTH_COOKIE) {
  return `document.cookie='${cookie};secure'`;
}

export function parseArgs(argv) {
  const args = {
    baseUrl: 'http://localhost:8080',
    routes: [],
    viewports: [...DEFAULT_VIEWPORTS],
    label: 'before',
    outDir: '.',
    loggedIn: false,
    authCookie: DEFAULT_AUTH_COOKIE,
    authWait: DEFAULT_AUTH_WAIT,
    scrollStep: DEFAULT_SCROLL_STEP,
    scrollDelay: DEFAULT_SCROLL_DELAY,
  };
  for (let i = 0; i < argv.length; ) {
    const key = argv[i];
    if (BOOLEAN_FLAGS.has(key)) {
      if (key === '--logged-in') args.loggedIn = true;
      i += 1;
      continue;
    }
    const val = argv[i + 1];
    switch (key) {
      case '--base-url': args.baseUrl = val; break;
      case '--routes': args.routes = val.split(',').map((s) => s.trim()).filter(Boolean); break;
      case '--viewports': args.viewports = val.split(',').map((s) => s.trim()).filter(Boolean); break;
      case '--label': args.label = val; break;
      case '--out-dir': args.outDir = val; break;
      case '--auth-cookie': args.authCookie = val; break;
      case '--auth-wait': args.authWait = Number(val); break;
      case '--scroll-step': args.scrollStep = Number(val); break;
      case '--scroll-delay': args.scrollDelay = Number(val); break;
      default: throw new Error(`Unknown arg: ${key}`);
    }
    i += 2;
  }
  return args;
}

// Resolve Playwright from a local install if present, else the global install.
// The skill adds no dependency to the target repo; it expects a global install.
export function resolvePlaywright() {
  const localRequire = createRequire(import.meta.url);
  try {
    return localRequire(localRequire.resolve('playwright'));
  } catch { /* fall through to global */ }
  try {
    const globalRoot = execSync('npm root -g').toString().trim();
    const globalRequire = createRequire(`${globalRoot}/`);
    return globalRequire(globalRequire.resolve('playwright', { paths: [globalRoot] }));
  } catch { /* report a clear setup error below */ }
  throw new Error(
    'Playwright not found. Install it once with:\n'
    + '  npm install -g playwright && npx playwright install chromium',
  );
}

// Scroll to the bottom at a "normal" rate so lazy-loaded / below-the-fold
// content has time to fetch and render, growing the page until it stops.
async function autoScroll(page, step, delay) {
  await page.evaluate(async ({ step, delay }) => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    let lastHeight = 0;
    for (let i = 0; i < 200; i += 1) {
      window.scrollBy(0, step);
      await sleep(delay);
      const height = document.body.scrollHeight;
      const atBottom = window.innerHeight + window.scrollY >= height - 2;
      if (atBottom && height === lastHeight) break; // bottom reached, nothing new loaded
      lastHeight = height;
    }
    window.scrollTo(0, 0);
    await sleep(delay);
  }, { step, delay });
}

export async function capture(argv) {
  const args = parseArgs(argv);
  if (args.routes.length === 0) throw new Error('No --routes provided');
  for (const viewport of args.viewports) {
    if (!VIEWPORTS[viewport]) throw new Error(`Unknown viewport: ${viewport}`);
  }
  const { chromium } = resolvePlaywright();
  mkdirSync(args.outDir, { recursive: true });

  const browser = await chromium.launch();
  const results = [];
  try {
    for (const route of args.routes) {
      for (const viewport of args.viewports) {
        const vp = VIEWPORTS[viewport];
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        if (args.loggedIn) {
          // Inject the dev auth cookie before any page script runs.
          await context.addInitScript(buildAuthInitScript(args.authCookie));
        }
        const page = await context.newPage();
        const url = new URL(route, args.baseUrl).toString();
        await page.goto(url, { waitUntil: 'load' });
        // cms-page-server (:3000) auth is client-side only — wait for it to
        // resolve and re-render. kiva-ui.local renders logged-in server-side,
        // so the wait is harmless there.
        if (args.loggedIn && args.authWait > 0) {
          await page.waitForTimeout(args.authWait);
        }
        await autoScroll(page, args.scrollStep, args.scrollDelay);
        await page.waitForTimeout(SETTLE_MS);
        const outfile = path.join(args.outDir, outfileName(route, viewport, args.label));
        await page.screenshot({ path: outfile, fullPage: true });
        results.push({ outfile, status: 0 });
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
  return results;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  capture(process.argv.slice(2)).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
