import test from 'node:test';
import assert from 'node:assert/strict';
import {
  slugifyRoute,
  outfileName,
  parseArgs,
  buildAuthInitScript,
  DEFAULT_AUTH_COOKIE,
  VIEWPORTS,
} from './capture.mjs';

test('slugifyRoute strips slashes and lowercases', () => {
  assert.equal(slugifyRoute('/lend-by-category'), 'lend-by-category');
  assert.equal(slugifyRoute('/Lend/By_Category/'), 'lend-by-category');
});

test('slugifyRoute maps root to "root"', () => {
  assert.equal(slugifyRoute('/'), 'root');
  assert.equal(slugifyRoute(''), 'root');
});

test('outfileName joins slug, viewport, label', () => {
  assert.equal(outfileName('/lend-by-category', 'desktop', 'before'),
    'lend-by-category__desktop__before.png');
});

test('parseArgs reads flags with defaults', () => {
  const a = parseArgs(['--routes', '/a,/b', '--label', 'after', '--out-dir', './after']);
  assert.deepEqual(a.routes, ['/a', '/b']);
  assert.equal(a.label, 'after');
  assert.equal(a.outDir, './after');
  assert.deepEqual(a.viewports, ['mobile', 'tablet', 'desktop']);
});

test('parseArgs defaults logged-out with default scroll/auth settings', () => {
  const a = parseArgs(['--routes', '/a']);
  assert.equal(a.loggedIn, false);
  assert.equal(a.authCookie, DEFAULT_AUTH_COOKIE);
  assert.equal(typeof a.authWait, 'number');
  assert.equal(typeof a.scrollStep, 'number');
  assert.equal(typeof a.scrollDelay, 'number');
});

test('parseArgs --logged-in is a valueless boolean flag', () => {
  const a = parseArgs(['--routes', '/a', '--logged-in', '--label', 'before']);
  assert.equal(a.loggedIn, true);
  assert.equal(a.label, 'before');
  assert.deepEqual(a.routes, ['/a']);
});

test('parseArgs --auth-cookie overrides the default cookie', () => {
  const a = parseArgs(['--routes', '/a', '--logged-in', '--auth-cookie', 'kvfa=99:recent']);
  assert.equal(a.authCookie, 'kvfa=99:recent');
});

test('parseArgs parses numeric scroll/auth flags as numbers', () => {
  const a = parseArgs([
    '--routes', '/a', '--auth-wait', '5000',
    '--scroll-step', '600', '--scroll-delay', '250',
  ]);
  assert.equal(a.authWait, 5000);
  assert.equal(a.scrollStep, 600);
  assert.equal(a.scrollDelay, 250);
});

test('parseArgs throws on unknown flag', () => {
  assert.throws(() => parseArgs(['--nope', 'x']), /Unknown arg/);
});

test('buildAuthInitScript sets a secure cookie via document.cookie', () => {
  assert.equal(
    buildAuthInitScript(),
    "document.cookie='kvfa=2655698:recent/active/mfa;secure'",
  );
  assert.equal(
    buildAuthInitScript('kvfa=99:recent'),
    "document.cookie='kvfa=99:recent;secure'",
  );
});

test('VIEWPORTS map to the three layout tiers', () => {
  assert.deepEqual(Object.keys(VIEWPORTS), ['mobile', 'tablet', 'desktop']);
  assert.equal(VIEWPORTS.desktop.width, 1280);
});
