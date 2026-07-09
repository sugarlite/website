import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://sugarlite.top';

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-CN',
          en: 'en-US',
          ja: 'ja-JP',
          'zh-Hant': 'zh-TW',
        },
      },
      lastmod: new Date(),
      filter: (page) => {
        const url = new URL(page);
        const path = url.pathname;
        return /^\/(zh|en|ja|zh-Hant)\//.test(path) || /^\/(zh|en|ja|zh-Hant)$/.test(path);
      },
    }),
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'ja', 'zh-Hant'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  redirects: {
    '/': '/zh',
    '/faq': '/en/faq',
    '/privacy': '/en/privacy',
    '/terms': '/en/terms',
    '/guide/blood-sugar-management': '/en/guide/blood-sugar-management',
    '/guide/diabetic-diet': '/en/guide/diabetic-diet',
    '/stories': '/en/stories',
    '/blog': '/en/blog',
    '/blog/what-is-blood-sugar': '/en/blog/what-is-blood-sugar',
    '/blog/how-to-lower-blood-sugar-naturally': '/en/blog/how-to-lower-blood-sugar-naturally',
    '/blog/best-blood-sugar-tracker-app': '/en/blog/best-blood-sugar-tracker-app',
    '/blog/cgm-vs-fingerstick': '/en/blog/cgm-vs-fingerstick',
    '/blog/what-is-hba1c': '/en/blog/what-is-hba1c',
    '/blog/blood-sugar-after-meals': '/en/blog/blood-sugar-after-meals',
    '/blog/normal-blood-sugar-chart': '/en/blog/normal-blood-sugar-chart',
    '/blog/type-2-diabetes-diet': '/en/blog/type-2-diabetes-diet',
    '/blog/high-blood-sugar-symptoms': '/en/blog/high-blood-sugar-symptoms',
    '/blog/insulin-tracking-guide': '/en/blog/insulin-tracking-guide',
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
