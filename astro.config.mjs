import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://sugarlite.top';

const LANG_TO_HREFLANG = {
  zh: 'zh-CN',
  en: 'en-US',
  ja: 'ja-JP',
  'zh-Hant': 'zh-TW',
};
const HREF_LANGS = Object.values(LANG_TO_HREFLANG);
const DEFAULT_LOCALE = 'zh';
const LOCALIZED_PREFIXES = ['en', 'ja', 'zh-Hant'];

function getLocaleAndPath(url) {
  const path = new URL(url).pathname;
  const segments = path.split('/').filter(Boolean);
  const first = segments[0];
  if (LOCALIZED_PREFIXES.includes(first)) {
    return { locale: first, pathWithoutLang: segments.slice(1).join('/') };
  }
  return { locale: DEFAULT_LOCALE, pathWithoutLang: segments.join('/') };
}

function getLocalizedUrl(locale, pathWithoutLang) {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const suffix = pathWithoutLang ? `/${pathWithoutLang}/` : '/';
  return `${SITE}${prefix}${suffix}`;
}

export default defineConfig({
  site: SITE,
  // Fully static output. The former `output: 'server'` + Vercel edge
  // middleware (AI-crawler GEO rewriting) never actually ran in production —
  // the adapter only routed /_server-islands & /_image through the middleware
  // function. The GEO distilled pages are now generated at build time by
  // scripts/generate-llms-html.mjs (see postbuild in package.json).
  integrations: [
    react(),
    mdx(),
    sitemap({
      // Only bump lastmod when content actually changes: a blanket
      // `lastmod: new Date()` makes search engines distrust the field.
      lastmod: new Date('2026-08-24'),
      filter: (page) => {
        const path = new URL(page).pathname;
        const isLocalized = /^\/(en|ja|zh-Hant)\//.test(path) || /^\/(en|ja|zh-Hant)$/.test(path);
        const isDefaultLocaleRoot =
          path === '/' ||
          /^\/(blog|faq|guide|privacy|stories|terms|changelog)(\/|$)/.test(path);
        return isLocalized || isDefaultLocaleRoot;
      },
      serialize: (item) => {
        const { locale, pathWithoutLang } = getLocaleAndPath(item.url);
        const links = Object.entries(LANG_TO_HREFLANG).map(([lang, hrefLang]) => ({
          lang: hrefLang,
          url: getLocalizedUrl(lang, pathWithoutLang),
        }));
        links.push({
          lang: 'x-default',
          url: getLocalizedUrl(DEFAULT_LOCALE, pathWithoutLang),
        });
        return { ...item, links };
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
