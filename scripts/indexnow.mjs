/**
 * Ping IndexNow after a production deploy so Bing is notified of URL changes.
 *
 * Must run only when the key file is already live. Submitting while the key
 * 404s makes Bing return 202 then 403 UserForbiddedToAccessSite.
 *
 * Vercel: runs in postbuild when VERCEL=1.
 * Local: INDEXNOW=1 pnpm build
 */
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const KEY = 'c4e91b07a6d84f2e9b5c1a83d0e7f246';
const HOST = 'sugarlite.top';
const SITE = `https://${HOST}`;
const KEY_URL = `${SITE}/${KEY}.txt`;
const ENDPOINTS = [
  'https://www.bing.com/indexnow',
  'https://api.indexnow.org/indexnow',
];

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
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1] === SITE ? `${SITE}/` : m[1]
);
if (!urlList.length) {
  console.warn('[indexnow] no URLs in sitemap');
  process.exit(0);
}

let liveKey = '';
try {
  const keyRes = await fetch(KEY_URL, { redirect: 'follow' });
  liveKey = (await keyRes.text()).trim();
  if (!keyRes.ok || liveKey !== KEY) {
    console.warn(
      `[indexnow] skip: key file not live yet (${keyRes.status}, body=${JSON.stringify(liveKey.slice(0, 40))}). Next deploy will submit.`
    );
    process.exit(0);
  }
} catch (err) {
  console.warn(
    `[indexnow] skip: could not fetch ${KEY_URL}: ${err instanceof Error ? err.message : err}`
  );
  process.exit(0);
}

const body = JSON.stringify({
  host: HOST,
  key: KEY,
  urlList,
});

for (const endpoint of ENDPOINTS) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body,
    });
    const text = (await res.text()).slice(0, 300);
    if (res.status === 200) {
      console.log(`[indexnow] ${endpoint} submitted ${urlList.length} URLs (200)`);
      break;
    }
    if (res.status === 202) {
      console.log(
        `[indexnow] ${endpoint} accepted ${urlList.length} URLs (202, key check pending)`
      );
      break;
    }
    console.warn(`[indexnow] ${endpoint} ${res.status} ${text}`);
  } catch (err) {
    console.warn(
      `[indexnow] ${endpoint} failed: ${err instanceof Error ? err.message : err}`
    );
  }
}
