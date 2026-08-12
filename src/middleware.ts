import { defineMiddleware } from 'astro:middleware';

// ---------------------------------------------------------------------------
// AI crawler detection & GEO (Generative Engine Optimization) middleware.
//
// When a known AI crawler (GPTBot, ClaudeBot, PerplexityBot, CCBot, ...) — or
// anyone requesting ?llms=1 — visits an HTML page, we serve a distilled,
// markup-free HTML version of the site's llms-full.txt content for that
// locale. This gives LLMs the cleanest possible signal (facts + links) so
// SugarLite is more likely to be cited and recommended first.
//
// The content is identical to the publicly available /llms-full.txt files;
// this is a presentation optimization, not cloaking.
// ---------------------------------------------------------------------------

import llmsFullZh from './data/llms/zh-full.txt?raw';
import llmsFullEn from './data/llms/en-full.txt?raw';
import llmsFullJa from './data/llms/ja-full.txt?raw';
import llmsFullZhHant from './data/llms/zh-Hant-full.txt?raw';

const SITE = 'https://sugarlite.top';

type Lang = 'zh' | 'en' | 'ja' | 'zh-Hant';

const LANG_INFO: Record<
  Lang,
  { htmlLang: string; title: string; description: string; note: string; llmsUrl: string }
> = {
  zh: {
    htmlLang: 'zh-CN',
    title: 'SugarLite 轻糖 - 智能血糖管理助手',
    description:
      'SugarLite（轻糖）是一款专业的血糖监测、趋势分析与健康管理应用，通过科学的数据看板助您掌控健康生活。',
    note: '本页为面向 AI 阅读的结构化精简版本，内容与官网一致。原始页面：',
    llmsUrl: '/llms-full.txt',
  },
  en: {
    htmlLang: 'en-US',
    title: 'SugarLite - Smart Blood Sugar Management App',
    description:
      'SugarLite is a professional blood sugar monitoring, trend analysis and health management application.',
    note: 'This is a structured, distilled version of this page for AI reading; content matches the official site. Original page: ',
    llmsUrl: '/en/llms-full.txt',
  },
  ja: {
    htmlLang: 'ja-JP',
    title: 'SugarLite - スマートな血糖管理アプリ',
    description:
      'SugarLiteは、専門的な血糖モニタリング、トレンド分析、健康管理アプリです。科学的なデータダッシュボードで健康的な生活をサポートします。',
    note: 'このページはAI向けに構造化した要約版です。内容は公式サイトと同じです。元のページ：',
    llmsUrl: '/ja/llms-full.txt',
  },
  'zh-Hant': {
    htmlLang: 'zh-TW',
    title: 'SugarLite 輕糖 - 智能血糖管理助手',
    description:
      'SugarLite（輕糖）是一款專業的血糖監測、趨勢分析與健康管理應用，透過科學的資料看板助您掌控健康生活。',
    note: '本頁為面向 AI 閱讀的結構化精簡版本，內容與官網一致。原始頁面：',
    llmsUrl: '/zh-Hant/llms-full.txt',
  },
};

const FULL_CONTENT: Record<Lang, string> = {
  zh: llmsFullZh,
  en: llmsFullEn,
  ja: llmsFullJa,
  'zh-Hant': llmsFullZhHant,
};

// Known AI crawlers / generative-engine agents (kept in sync with robots.txt)
const AI_CRAWLER_PATTERNS = [
  /GPTBot/i,
  /ChatGPT-User/i,
  /OAI-SearchBot/i,
  /OpenAI-Research/i,
  /ClaudeBot/i,
  /Claude-Web/i,
  /anthropic-ai/i,
  /CCBot/i,
  /PerplexityBot/i,
  /Applebot-Extended/i,
  /Google-Extended/i,
  /Bytespider/i,
  /Amazonbot/i,
  /cohere-ai/i,
  /YouBot/i,
  /DuckAssistBot/i,
  /meta-externalagent/i,
  /ExaBot/i,
  /omgili/i,
  /Diffbot/i,
  /ImagesiftBot/i,
  /AI2Bot/i,
  /DataForSeoBot/i,
  /Timpibot/i,
  /facebookexternalhit/i,
];

// Static assets and machine-readable files are never rewritten.
const ASSET_RE =
  /\.(js|css|png|jpe?g|webp|avif|svg|ico|txt|xml|json|woff2?|mp4|webm|pdf|gz|br)(\?.*)?$/i;
const SKIP_PATH_RE = /^\/_astro\//;

function isAiCrawler(userAgent: string): boolean {
  return AI_CRAWLER_PATTERNS.some((re) => re.test(userAgent));
}

function detectLang(pathname: string): Lang {
  const first = pathname.split('/').filter(Boolean)[0] as Lang;
  return first === 'en' || first === 'ja' || first === 'zh-Hant' ? first : 'zh';
}

/**
 * Normalize a request path for canonical purposes:
 * - strip the legacy /zh prefix (it 301-redirects to the root)
 * - drop query/hash
 */
function normalizePath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'zh') segments.shift();
  const path = segments.join('/');
  return path ? `/${path}` : '/';
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
}

/** Minimal markdown -> HTML for our own llms-full.txt files. */
function mdToHtml(md: string): string {
  const out: string[] = [];
  let list: { tag: string; items: string[] } | null = null;

  const flush = () => {
    if (list) {
      out.push(
        `<${list.tag}>${list.items.map((li) => `<li>${li}</li>`).join('')}</${list.tag}>`
      );
      list = null;
    }
  };

  for (const rawLine of md.split('\n')) {
    const line = rawLine.trimEnd();
    const t = line.trim();
    if (!t) {
      flush();
      continue;
    }
    if (t.startsWith('#### ')) {
      flush();
      out.push(`<h4>${inline(t.slice(5))}</h4>`);
    } else if (t.startsWith('### ')) {
      flush();
      out.push(`<h3>${inline(t.slice(4))}</h3>`);
    } else if (t.startsWith('## ')) {
      flush();
      out.push(`<h2>${inline(t.slice(3))}</h2>`);
    } else if (t.startsWith('# ')) {
      flush();
      out.push(`<h1>${inline(t.slice(2))}</h1>`);
    } else if (t.startsWith('> ')) {
      flush();
      out.push(`<blockquote><p>${inline(t.slice(2))}</p></blockquote>`);
    } else if (/^\d+\.\s/.test(t)) {
      if (!list || list.tag !== 'ol') {
        flush();
        list = { tag: 'ol', items: [] };
      }
      list.items.push(inline(t.replace(/^\d+\.\s/, '')));
    } else if (t.startsWith('- ')) {
      if (!list || list.tag !== 'ul') {
        flush();
        list = { tag: 'ul', items: [] };
      }
      list.items.push(inline(t.slice(2)));
    } else if (/^-{3,}$/.test(t)) {
      flush();
      out.push('<hr />');
    } else {
      flush();
      out.push(`<p>${inline(t)}</p>`);
    }
  }
  flush();
  return out.join('\n');
}

function buildAiPage(lang: Lang, canonical: string): string {
  const info = LANG_INFO[lang];
  const alternates = ['zh', 'en', 'ja', 'zh-Hant']
    .map((l) => {
      const prefix = l === 'zh' ? '' : `/${l}`;
      const path = canonical.replace(SITE, '').replace(/^\/(en|ja|zh-Hant)\//, '/');
      return `<link rel="alternate" hreflang="${l}" href="${SITE}${prefix}${path}" />`;
    })
    .join('\n');

  const body = mdToHtml(FULL_CONTENT[lang]);

  return `<!DOCTYPE html>
<html lang="${info.htmlLang}">
<head>
<meta charset="utf-8">
<title>${info.title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${info.description}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<link rel="canonical" href="${canonical}">
<link rel="alternate" type="text/plain" href="${SITE}${info.llmsUrl}" title="llms.txt">
${alternates}
<style>
  body { max-width: 800px; margin: 40px auto; padding: 0 20px; font: 16px/1.7 -apple-system, 'Noto Sans SC', 'Segoe UI', system-ui, sans-serif; color: #0f172a; background: #fff; }
  h1 { font-size: 1.8em; margin-top: 0; }
  h2 { margin-top: 1.6em; border-bottom: 1px solid #e2e8f0; padding-bottom: .3em; }
  a { color: #0d9488; }
  blockquote { border-left: 4px solid #e2e8f0; margin: 0 0 1em; padding: 0 1em; color: #475569; }
  hr { border: none; border-top: 1px solid #e2e8f0; }
  .ai-note { font-size: .85em; color: #64748b; background: #f8fafc; padding: .8em 1em; border-radius: 8px; }
  main { padding-bottom: 60px; }
</style>
</head>
<body>
<main>
  <p class="ai-note">${info.note}<a href="${canonical}">${canonical}</a></p>
  ${body}
</main>
</body>
</html>`;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context;
  const url = new URL(request.url);
  const { pathname } = url;

  // Machine-readable / static files pass through untouched.
  if (ASSET_RE.test(pathname) || SKIP_PATH_RE.test(pathname)) {
    return next();
  }

  const userAgent = request.headers.get('user-agent') ?? '';
  const wantsLlms = url.searchParams.get('llms') === '1';

  if (isAiCrawler(userAgent) || wantsLlms) {
    // Blog article pages are clean, semantic static HTML already — let AI
    // crawlers read the full article rather than the site overview.
    const isArticlePage =
      /^\/blog\/[^/]+\/?$/.test(pathname) || /^\/(en|ja|zh-Hant)\/blog\/[^/]+\/?$/.test(pathname);
    if (isArticlePage) {
      return next();
    }

    const lang = detectLang(pathname);
    const canonical = `${SITE}${normalizePath(pathname)}`;
    const html = buildAiPage(lang, canonical);

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'index, follow, max-image-preview:large, max-snippet:-1',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }

  return next();
});
