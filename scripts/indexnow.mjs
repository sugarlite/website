/**
 * Ping IndexNow (Bing, Yandex, Seznam) after a production build so new and
 * updated URLs are submitted instead of waiting for a recrawl.
 *
 * Runs on Vercel builds by default. Locally: INDEXNOW=1 pnpm build
 */
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const KEY = '8f3c1a92e6b74d0c9a5e2f1b4c7d8e90';
const HOST = 'sugarlite.top';
const SITE = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = existsSync(join(root, 'dist', 'client'))
  ? join(root, 'dist', 'client')
  : join(root, 'dist');

const enabled = process.env.VERCEL === '1' || process.env.INDEXNOW === '1';
if (!enabled) {
  console.log('[indexnow] skip (not on Vercel). Set INDEXNOW=1 to force.');
  process.exit(0);
}

const sitemapPath = join(DIST_DIR, 'sitemap-0.xml');
if (!existsSync(sitemapPath)) {
  console.warn(`[indexnow] sitemap not found: ${sitemapPath}`);
  process.exit(0);
}

const xml = readFileSync(sitemapPath, 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) {
  console.warn('[indexnow] no URLs in sitemap');
  process.exit(0);
}

const body = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `${SITE}/${KEY}.txt`,
  urlList,
});

try {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body,
  });
  if (res.ok || res.status === 202) {
    console.log(`[indexnow] submitted ${urlList.length} URLs (${res.status})`);
  } else {
    const text = await res.text();
    console.warn(`[indexnow] ${res.status} ${text.slice(0, 200)}`);
  }
} catch (err) {
  console.warn(`[indexnow] request failed: ${err instanceof Error ? err.message : err}`);
}
