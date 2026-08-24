/**
 * Post-build: generate llms.txt / llms-full.txt / blog/llms.txt into dist/.
 *
 * Single source of truth: src/data/llms/{zh,en,ja,zh-Hant}[-full].txt
 * (the -full variants are also rendered to static /llms-full.html pages by
 * scripts/generate-llms-html.mjs).
 *
 * Blog indexes are generated from src/content/blog/*.mdx frontmatter so the
 * article list always matches the deployed site.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = join(root, 'src', 'data', 'llms');
// Server/hybrid builds put static assets in dist/client; pure static builds
// put them in dist. Pick whichever exists.
const DIST_DIR = existsSync(join(root, 'dist', 'client'))
  ? join(root, 'dist', 'client')
  : join(root, 'dist');
// The Vercel adapter snapshots static files into .vercel/output/static before
// this postbuild runs, so mirror the generated files there as well.
const VERCEL_STATIC_DIR = existsSync(join(root, '.vercel', 'output', 'static'))
  ? join(root, '.vercel', 'output', 'static')
  : null;
const BLOG_SRC_DIR = join(root, 'src', 'content', 'blog');
const SITE = 'https://sugarlite.top';

const LOCALES = ['zh', 'en', 'ja', 'zh-Hant'];

const BLOG_META = {
  zh: {
    title: 'SugarLite 轻糖博客 - 血糖管理与健康生活指南',
    description:
      '血糖管理、糖尿病饮食、血糖监测技术与健康生活方式的专业指南。',
  },
  en: {
    title: 'SugarLite Blog - Blood Sugar Management & Health Guides',
    description:
      'Expert guides on blood sugar management, diabetic diet, glucose monitoring technology, and healthy living.',
  },
  ja: {
    title: 'SugarLite ブログ - 血糖管理と健康生活ガイド',
    description:
      '血糖管理、糖尿病食事、血糖モニタリング技術、健康ライフスタイルに関する専門ガイド。',
  },
  'zh-Hant': {
    title: 'SugarLite 輕糖部落格 - 血糖管理與健康生活指南',
    description:
      '血糖管理、糖尿病飲食、血糖監測技術與健康生活方式的專業指南。',
  },
};

function readBlogPosts(lang) {
  const posts = [];
  for (const file of readdirSync(BLOG_SRC_DIR)) {
    const match = file.match(/^(.+?)-((?:zh-Hant|en|ja|zh))\.mdx$/);
    if (!match || match[2] !== lang) continue;
    const [, slug] = match;
    const content = readFileSync(join(BLOG_SRC_DIR, file), 'utf8');
    const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    const get = (key) => {
      const line = fm[1].match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'));
      if (!line) return '';
      return line[1].replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"');
    };
    const title = get('title');
    const description = get('description');
    if (!title || !description) continue;
    const url =
      lang === 'zh'
        ? `${SITE}/blog/${slug}/`
        : `${SITE}/${lang}/blog/${slug}/`;
    posts.push({ slug, title, description, url });
  }
  // Deterministic order: same as the site's SLUGS list would produce; sort by slug.
  posts.sort((a, b) => a.slug.localeCompare(b.slug));
  return posts;
}

function buildBlogLlms(lang, posts) {
  const meta = BLOG_META[lang];
  const lines = [`# ${meta.title}`, '', `> ${meta.description}`, '', '## 文章', ''];
  for (const post of posts) {
    lines.push(`- [${post.title}](${post.url}): ${post.description}`);
  }
  lines.push('');
  return lines.join('\n');
}

let missing = 0;
for (const lang of LOCALES) {
  const base = lang === 'zh' ? DIST_DIR : join(DIST_DIR, lang);

  // llms.txt + llms-full.txt
  for (const name of [`${lang}.txt`, `${lang}-full.txt`]) {
    const outName = name.endsWith('-full.txt') ? 'llms-full.txt' : 'llms.txt';
    const outFile = join(base, outName);
    mkdirSync(dirname(outFile), { recursive: true });
    try {
      writeFileSync(outFile, readFileSync(join(SRC_DIR, name), 'utf8'));
    } catch {
      console.warn(`[generate-llms] missing source: ${name}`);
      missing += 1;
    }
  }

  // blog/llms.txt
  const posts = readBlogPosts(lang);
  const blogDir = join(base, 'blog');
  mkdirSync(blogDir, { recursive: true });
  writeFileSync(join(blogDir, 'llms.txt'), buildBlogLlms(lang, posts));

  // Mirror into the Vercel deployment output (adapter snapshot ran earlier).
  if (VERCEL_STATIC_DIR) {
    const vBase = lang === 'zh' ? VERCEL_STATIC_DIR : join(VERCEL_STATIC_DIR, lang);
    for (const name of ['llms.txt', 'llms-full.txt']) {
      writeFileSync(join(vBase, name), readFileSync(join(base, name), 'utf8'));
    }
    const vBlogDir = join(vBase, 'blog');
    mkdirSync(vBlogDir, { recursive: true });
    writeFileSync(join(vBlogDir, 'llms.txt'), readFileSync(join(blogDir, 'llms.txt'), 'utf8'));
  }

  console.log(
    `[generate-llms] ${lang}: llms.txt, llms-full.txt, blog/llms.txt (${posts.length} posts)`
  );
}

if (missing > 0) {
  console.error(`[generate-llms] FAILED: ${missing} source file(s) missing`);
  process.exit(1);
}
console.log('[generate-llms] done.');
