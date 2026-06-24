import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

// 多语言支持
const LANGUAGES = ['zh', 'en', 'ja', 'zh-Hant'] as const;
type Language = typeof LANGUAGES[number];

// 路由配置 - 与 App.tsx 中的路由保持一致
const ROUTES = [
  { path: '', priority: 1.0, changefreq: 'weekly' as const, hasImages: true },
  { path: 'privacy', priority: 0.5, changefreq: 'monthly' as const, hasImages: false },
  { path: 'terms', priority: 0.5, changefreq: 'monthly' as const, hasImages: false },
  { path: 'faq', priority: 0.8, changefreq: 'weekly' as const, hasImages: false },
  { path: 'guide/blood-sugar-management', priority: 0.9, changefreq: 'weekly' as const, hasImages: false },
  { path: 'guide/diabetic-diet', priority: 0.9, changefreq: 'weekly' as const, hasImages: false },
  { path: 'stories', priority: 0.8, changefreq: 'weekly' as const, hasImages: false },
];

// 页面图片配置
const PAGE_IMAGES: Record<string, Record<Language, Array<{ url: string; title: string; caption: string }>>> = {
  '': {
    zh: [
      { url: 'https://sugarlite.top/og-image.png', title: 'SugarLite 轻糖 - 智能血糖监测应用', caption: 'SugarLite 轻糖 App 界面预览' },
      { url: 'https://sugarlite.top/preview/Screenshot%2001.png', title: '血糖概览界面', caption: 'SugarLite 血糖数据概览截图' },
    ],
    en: [
      { url: 'https://sugarlite.top/og-image.png', title: 'SugarLite - Smart Blood Sugar Monitoring App', caption: 'SugarLite App Interface Preview' },
    ],
    ja: [
      { url: 'https://sugarlite.top/og-image.png', title: 'SugarLite - スマートな血糖モニタリングアプリ', caption: 'SugarLite アプリインターフェースのプレビュー' },
    ],
    'zh-Hant': [
      { url: 'https://sugarlite.top/og-image.png', title: 'SugarLite 輕糖 - 智能血糖監測應用', caption: 'SugarLite 輕糖 App 介面預覽' },
    ],
  },
};

export function generateSitemap(hostname: string) {
  const links: any[] = [];

  for (const lang of LANGUAGES) {
    for (const route of ROUTES) {
      const urlPath = `/${lang}${route.path ? '/' + route.path : ''}`;
      const fullUrl = `${hostname}${urlPath}`;

      // 构建 alternate links (xhtml:link)
      const xhtmlLinks = [];
      for (const l of LANGUAGES) {
        const hreflang = l === 'zh' ? 'zh-CN' : l === 'zh-Hant' ? 'zh-TW' : l === 'ja' ? 'ja-JP' : 'en-US';
        xhtmlLinks.push({
          lang: hreflang,
          url: `${hostname}/${l}${route.path ? '/' + route.path : ''}`,
        });
      }
      // x-default
      xhtmlLinks.push({
        lang: 'x-default',
        url: `${hostname}/zh${route.path ? '/' + route.path : ''}`,
      });

      // 构建图片
      const images = route.hasImages ? PAGE_IMAGES[route.path]?.[lang] : undefined;

      links.push({
        url: fullUrl,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: route.changefreq,
        priority: route.priority,
        links: xhtmlLinks,
        ...(images && { img: images }),
      });
    }
  }

  return links;
}

export default function customSitemapPlugin(options: { hostname: string; outDir?: string }) {
  const { hostname, outDir = 'dist' } = options;

  return {
    name: 'custom-sitemap',
    closeBundle() {
      const links = generateSitemap(hostname);
      const stream = new SitemapStream({
        hostname,
        xmlns: {
          news: false,
          xhtml: true,
          image: true,
          video: false,
        },
      });

      const data = Readable.from(links).pipe(stream);
      streamToPromise(data).then((buffer) => {
        const outputPath = path.resolve(process.cwd(), outDir, 'sitemap.xml');
        fs.writeFileSync(outputPath, buffer.toString());
        console.log(`✅ Sitemap generated: ${outputPath}`);
      });
    },
  };
}
