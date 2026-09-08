/**
 * Post-build: generate a Markdown twin for every page (Markdown for Agents).
 *
 * Agents that send `Accept: text/markdown` get the plain markdown version of
 * the same URL; browsers keep the rendered HTML. The negotiation itself is a
 * header-conditional rewrite in vercel.json (rewrites only fire when the
 * request carries the markdown Accept header), pointing at the static files
 * produced here under dist/md/.
 *
 * - Each page's <main> is converted to markdown with turndown (+GFM tables).
 * - Layout noise (nav/footer/scripts) lives outside <main>, so it is dropped.
 * - dist/md/<route>.md mirrors the page path: /blog/foo -> /md/blog/foo.md.
 * - Files are also mirrored into .vercel/output/static when present, matching
 *   scripts/generate-llms-html.mjs.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = existsSync(join(root, 'dist', 'client'))
  ? join(root, 'dist', 'client')
  : join(root, 'dist');
const VERCEL_STATIC_DIR = existsSync(join(root, '.vercel', 'output', 'static'))
  ? join(root, '.vercel', 'output', 'static')
  : null;

const SITE = 'https://sugarlite.top';

// Pages that must not get a markdown twin (suffixes, so locales are covered).
const SKIP_ROUTE_SUFFIXES = ['/404', '/llms-full', '/baidu_verify_codeva-pQmYbWdHUF'];

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});
turndown.use(gfm);
turndown.remove(['script', 'style', 'noscript', 'svg', 'iframe', 'form', 'button', 'input', 'select']);

/** Return the page's main content; fall back to the whole document. */
function extractMain(html) {
  const start = html.search(/<main[\s>]/);
  if (start === -1) return html;
  const openEnd = html.indexOf('>', start);
  const close = html.lastIndexOf('</main>');
  if (close < openEnd) return html;
  return html.slice(openEnd + 1, close);
}

function toMarkdown(html) {
  return turndown
    .turndown(extractMain(html))
    .replace(/\[\s*\]\(([^)]*)\)/g, '') // drop decorative empty links
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';
}

/** Walk dist and yield every HTML file path. */
function* walkHtml(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkHtml(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

/** 'blog/foo/index.html' -> '/blog/foo', 'index.html' -> '/' */
function routeFor(relPath) {
  const p = relPath
    .replace(/(^|\/)index\.html$/, '$1')
    .replace(/\.html$/, '')
    .replace(/\/+$/, '');
  return p === '' ? '/' : `/${p}`;
}

function writeMirror(absPath, content) {
  mkdirSync(dirname(absPath), { recursive: true });
  writeFileSync(absPath, content);
}

let generated = 0;
const mdDir = join(DIST_DIR, 'md');
rmSync(mdDir, { recursive: true, force: true });
if (VERCEL_STATIC_DIR) rmSync(join(VERCEL_STATIC_DIR, 'md'), { recursive: true, force: true });

for (const htmlPath of walkHtml(DIST_DIR)) {
  const relPath = htmlPath.slice(DIST_DIR.length + 1);
  const route = routeFor(relPath);
  if (SKIP_ROUTE_SUFFIXES.some((skip) => route === skip || route.endsWith(skip))) continue;

  const md = toMarkdown(readFileSync(htmlPath, 'utf8'));
  if (!md.trim()) continue;

  const mdFile = join(mdDir, `${route === '/' ? 'index' : route.slice(1)}.md`);
  writeMirror(mdFile, md);
  if (VERCEL_STATIC_DIR) writeMirror(join(VERCEL_STATIC_DIR, 'md', `${route === '/' ? 'index' : route.slice(1)}.md`), md);
  generated += 1;
}

console.log(`[generate-markdown] ${generated} markdown twins under ${mdDir.replace(root + '/', '')}/`);
