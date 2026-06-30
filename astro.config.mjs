import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://sugarlite.top';

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [
    react(),
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
