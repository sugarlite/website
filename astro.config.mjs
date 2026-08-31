import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { rehypeWrapTables } from './src/lib/rehypeWrapTables.ts';

const SITE = 'https://sugarlite.top';

const LANG_TO_HREFLANG = {
  zh: 'zh-CN',
  en: 'en-US',
  ja: 'ja-JP',
  'zh-Hant': 'zh-TW',
};
const HREFLANG_ALIASES = {
  'zh-CN': ['zh', 'zh-Hans'],
  'en-US': ['en'],
  'ja-JP': ['ja'],
  'zh-TW': ['zh-Hant'],
};
const DEFAULT_LOCALE = 'zh';
const LOCALIZED_PREFIXES = ['en', 'ja', 'zh-Hant'];

function getLocaleAndPath(url) {
  const path = new URL(url).pathname.replace(/\/+$/, '') || '/';
  const segments = path.split('/').filter(Boolean);
  const first = segments[0];
  if (LOCALIZED_PREFIXES.includes(first)) {
    return { locale: first, pathWithoutLang: segments.slice(1).join('/') };
  }
  return { locale: DEFAULT_LOCALE, pathWithoutLang: segments.join('/') };
}

function getLocalizedUrl(locale, pathWithoutLang) {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  if (!pathWithoutLang) return `${SITE}${prefix || '/'}`;
  return `${SITE}${prefix}/${pathWithoutLang}`;
}

function loadBlogSitemapMeta() {
  const dir = join(process.cwd(), 'src/content/blog');
  /** @type {Map<string, { lastmod: Date }>} */
  const map = new Map();
  let files = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  } catch {
    return map;
  }
  for (const file of files) {
    const match = file.match(/^(.+)-(zh-Hant|zh|en|ja)\.mdx$/);
    if (!match) continue;
    const [, slug, locale] = match;
    const raw = readFileSync(join(dir, file), 'utf8');
    const updated = raw.match(/^updatedDate:\s*"?(\d{4}-\d{2}-\d{2})"?/m)?.[1];
    const published = raw.match(/^pubDate:\s*"?(\d{4}-\d{2}-\d{2})"?/m)?.[1];
    const dateStr = updated || published;
    if (!dateStr) continue;
    map.set(getLocalizedUrl(locale, `blog/${slug}`), {
      lastmod: new Date(`${dateStr}T00:00:00+08:00`),
    });
  }
  return map;
}

const blogSitemapMeta = loadBlogSitemapMeta();

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  markdown: {
    rehypePlugins: [rehypeWrapTables],
  },
  // Fully static output. The former `output: 'server'` + Vercel edge
  // middleware (AI-crawler GEO rewriting) never actually ran in production —
  // the adapter only routed /_server-islands & /_image through the middleware
  // function. The GEO distilled pages are now generated at build time by
  // scripts/generate-llms-html.mjs (see postbuild in package.json).
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        const isLocalized = /^\/(en|ja|zh-Hant)(\/|$)/.test(path);
        const isDefaultLocaleRoot =
          path === '/' ||
          /^\/(blog|faq|guide|privacy|stories|terms|changelog)(\/|$)/.test(path);
        return isLocalized || isDefaultLocaleRoot;
      },
      serialize: (item) => {
        const { pathWithoutLang } = getLocaleAndPath(item.url);
        const links = Object.entries(LANG_TO_HREFLANG).flatMap(([lang, hrefLang]) => {
          const url = getLocalizedUrl(lang, pathWithoutLang);
          const aliases = (HREFLANG_ALIASES[hrefLang] || []).map((alias) => ({
            lang: alias,
            url,
          }));
          return [{ lang: hrefLang, url }, ...aliases];
        });
        links.push({
          lang: 'x-default',
          url: getLocalizedUrl(DEFAULT_LOCALE, pathWithoutLang),
        });
        const canonicalUrl = item.url.replace(/\/+$/, '') || `${SITE}/`;
        const blogMeta = blogSitemapMeta.get(canonicalUrl === SITE ? `${SITE}/` : canonicalUrl);
        const next = {
          ...item,
          url: canonicalUrl === SITE ? `${SITE}/` : canonicalUrl,
          links,
        };
        if (blogMeta) {
          next.lastmod = blogMeta.lastmod;
        } else {
          delete next.lastmod;
        }
        return next;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'ja', 'zh-Hant'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    // Note: default locale (zh) now lives at root paths; old /zh/* URLs are
    // handled by vercel.json redirects for backward compatibility.
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  },
});
