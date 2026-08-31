/**
 * Post-build: generate static LLM-friendly HTML pages (build-time GEO).
 *
 * Replaces the former runtime middleware approach (src/middleware.ts + Vercel
 * edge middleware), which turned out to be dead code in production: the Vercel
 * adapter only routed _server-islands/_image requests through the middleware
 * function, so regular page requests never hit it.
 *
 * New approach: for each locale we render src/data/llms/{lang}-full.txt (the
 * same distilled content as /llms-full.txt) into a self-contained static HTML
 * page at /llms-full.html (localized: /en/llms-full.html, ...). Every normal
 * page's <head> links to it via:
 *
 *   <link rel="alternate" type="text/html" title="LLM-friendly version" href="...">
 *
 * so AI crawlers that never execute JS can still discover the distilled
 * content from any page they land on. The files are also referenced from
 * llms.txt.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = join(root, 'src', 'data', 'llms');
// Server/hybrid builds put static assets in dist/client; pure static builds put them in dist.
const DIST_DIR = existsSync(join(root, 'dist', 'client'))
  ? join(root, 'dist', 'client')
  : join(root, 'dist');
// The Vercel adapter snapshots static files into .vercel/output/static before
// this postbuild runs, so mirror generated files there as well.
const VERCEL_STATIC_DIR = existsSync(join(root, '.vercel', 'output', 'static'))
  ? join(root, '.vercel', 'output', 'static')
  : null;

const SITE = 'https://sugarlite.top';
const LOCALES = ['zh', 'en', 'ja', 'zh-Hant'];

const LANG_INFO = {
  zh: {
    htmlLang: 'zh-CN',
    title: 'SugarLite 轻糖 - 智能血糖管理助手',
    description:
      'SugarLite（轻糖）是一款专业的血糖监测、趋势分析与健康管理应用，通过科学的数据看板助您掌控健康生活。',
    note: '本页为面向 AI 阅读的结构化精简版本，内容与官网一致。原始页面：',
  },
  en: {
    htmlLang: 'en-US',
    title: 'SugarLite - Smart Blood Sugar Management App',
    description:
      'SugarLite is a professional blood sugar monitoring, trend analysis and health management application.',
    note: 'This is a structured, distilled version of this site for AI reading; content matches the official site. Original page: ',
  },
  ja: {
    htmlLang: 'ja-JP',
    title: 'SugarLite - スマートな血糖管理アプリ',
    description:
      'SugarLiteは、専門的な血糖モニタリング、トレンド分析、健康管理アプリです。科学的なデータダッシュボードで健康的な生活をサポートします。',
    note: 'このページはAI向けに構造化した要約版です。内容は公式サイトと同じです。元のページ：',
  },
  'zh-Hant': {
    htmlLang: 'zh-TW',
    title: 'SugarLite 輕糖 - 智能血糖管理助手',
    description:
      'SugarLite（輕糖）是一款專業的血糖監測、趨勢分析與健康管理應用，透過科學的資料看板助您掌控健康生活。',
    note: '本頁為面向 AI 閱讀的結構化精簡版本，內容與官網一致。原始頁面：',
  },
};

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(text) {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
}

/** Minimal markdown -> HTML for our own llms-full.txt files. */
function mdToHtml(md) {
  const out = [];
  let list = null;

  const flush = () => {
    if (list) {
      out.push(`<${list.tag}>${list.items.map((li) => `<li>${li}</li>`).join('')}</${list.tag}>`);
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

function langPrefix(lang) {
  return lang === 'zh' ? '' : `/${lang}`;
}

function buildAiPage(lang) {
  const info = LANG_INFO[lang];
  const body = mdToHtml(readFileSync(join(SRC_DIR, `${lang}-full.txt`), 'utf8'));

  // hreflang alternates between the four localized AI pages.
  const HREFLANG = { zh: 'zh-CN', en: 'en-US', ja: 'ja-JP', 'zh-Hant': 'zh-TW' };
  const alternates = LOCALES.map(
    (l) =>
      `<link rel="alternate" type="text/html" hreflang="${HREFLANG[l]}" href="${SITE}${langPrefix(l)}/llms-full.html">`
  ).join('\n');

  // Canonical points at the human page this distilled version belongs to
  // (the localized homepage).
  const homeUrl = `${SITE}${langPrefix(lang)}/`;
  const llmsFullUrl = `${SITE}${langPrefix(lang)}/llms-full.txt`;

  return `<!DOCTYPE html>
<html lang="${info.htmlLang}">
<head>
<meta charset="utf-8">
<title>${info.title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${info.description}">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${homeUrl}">
<link rel="alternate" type="text/plain" href="${llmsFullUrl}" title="llms.txt">
${alternates}
<style>
  body { max-width: 800px; margin: 40px auto; padding: 0 20px; font: 16px/1.7 -apple-system, 'Noto Sans SC', 'Segoe UI', system-ui, sans-serif; color: #0f172a; background: #fff; }
  h1 { font-size: 1.8em; margin-top: 0; }
  h2 { margin-top: 1.6em; border-bottom: 1px solid #e2e8f0; padding-bottom: .3em; }
  a { color: #0d9488; }
  a:visited { color: #0f766e; }
  blockquote { border-left: 4px solid #e2e8f0; margin: 0 0 1em; padding: 0 1em; color: #475569; }
  hr { border: none; border-top: 1px solid #e2e8f0; }
  .ai-note { font-size: .85em; color: #64748b; background: #f8fafc; padding: .8em 1em; border-radius: 8px; }
  main { padding-bottom: 60px; }
</style>
</head>
<body>
<main>
  <p class="ai-note">${info.note}<a href="${homeUrl}">${homeUrl}</a></p>
  ${body}
</main>
</body>
</html>`;
}

let failed = 0;
for (const lang of LOCALES) {
  const base = lang === 'zh' ? DIST_DIR : join(DIST_DIR, lang);
  const outFile = join(base, 'llms-full.html');

  try {
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, buildAiPage(lang));
  } catch (err) {
    console.error(`[generate-llms-html] FAILED to write ${lang}: ${err.message}`);
    failed += 1;
    continue;
  }

  // Mirror into the Vercel deployment output (adapter snapshot ran earlier).
  if (VERCEL_STATIC_DIR) {
    const vFile = join(lang === 'zh' ? VERCEL_STATIC_DIR : join(VERCEL_STATIC_DIR, lang), 'llms-full.html');
    mkdirSync(dirname(vFile), { recursive: true });
    writeFileSync(vFile, readFileSync(outFile, 'utf8'));
  }

  console.log(`[generate-llms-html] ${lang}: ${outFile.replace(root + '/', '')}`);
}

if (failed > 0) {
  process.exit(1);
}
console.log('[generate-llms-html] done.');
