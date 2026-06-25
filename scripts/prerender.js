/**
 * Prerender script for SugarLite
 * Uses the built dist/index.html as a template and creates per-page static HTML
 * by replacing title, meta tags, and noscript content for each route+language.
 *
 * Vercel serves static files first (filesystem handle), then falls back to SPA.
 *
 * Run: node scripts/prerender.js
 * (Automatically runs as "postbuild" after vite build)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const i18nDir = join(__dirname, "..", "public", "i18n");

const LANGUAGES = ["zh", "en", "ja", "zh-Hant"];

const LANG_HTML_MAP = {
  zh: "zh-CN",
  en: "en-US",
  ja: "ja-JP",
  "zh-Hant": "zh-TW",
};

const LANG_NAMES = {
  zh: "轻糖",
  en: "SugarLite",
  ja: "軽糖",
  "zh-Hant": "輕糖",
};

const OG_LOCALES = {
  zh: "zh_CN",
  en: "en_US",
  ja: "ja_JP",
  "zh-Hant": "zh_TW",
};

function escapeHtml(str) {
  return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function loadI18n(lang) {
  const filePath = join(i18nDir, `${lang}.json`);
  if (!existsSync(filePath)) {
    console.error(`  ⚠️  i18n file not found: ${filePath}`);
    return null;
  }
  return JSON.parse(readFileSync(filePath, "utf-8"));
}

// ---- Page content generators ----

function getHomepageContent(i18n) {
  const t = (key) => key.split(".").reduce((o, k) => o?.[k], i18n) || "";
  const features = i18n.features || {};
  const featureKeys = ["glucose", "food", "pgrs", "exercise", "insights", "sync"];

  let html = `<h1>${t("hero.title")}${t("hero.titleHighlight")}</h1>\n`;
  html += `<p>${t("hero.subtitle")}</p>\n`;
  html += `<h2>${t("features.tag") || t("features.title")}</h2>\n`;
  html += `<ul>\n`;
  for (const key of featureKeys) {
    const f = features[key];
    if (f) html += `  <li><strong>${f.title}</strong>: ${f.description}</li>\n`;
  }
  html += `</ul>\n`;
  html += `<p><strong>${t("disclaimer.title")}:</strong> ${t("disclaimer.text")}</p>\n`;
  html += `<p><a href="https://apps.apple.com/app/apple-store/id6753901096?pt=127680531&ct=sugarlitetop&mt=8">${t("hero.downloadAppStore")}</a></p>\n`;

  return {
    title: `${t("appName")} - ${t("hero.title")}${t("hero.titleHighlight")}`,
    description: t("hero.subtitle"),
    html,
    type: "website",
  };
}

function getFAQContent(i18n) {
  const t = (key) => key.split(".").reduce((o, k) => o?.[k], i18n) || "";
  const items = i18n.faq?.items || [];

  let html = `<h1>${t("faq.title")}</h1>\n`;
  html += `<p>${t("faq.subtitle")}</p>\n`;

  const faqEntities = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    html += `<h2>Q${i + 1}: ${item.q}</h2>\n`;
    html += `<p>${item.a}</p>\n`;
    faqEntities.push({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } });
  }

  html += `<p>${t("faq.stillHaveQuestions")} <a href="mailto:support@sugarlite.top">${t("faq.contactUs")}</a></p>\n`;

  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqEntities };

  return {
    title: `${t("faq.title")} - ${t("appName")}`,
    description: t("faq.subtitle"),
    html,
    jsonLd,
    type: "website",
  };
}

function getGuideContent(i18n, guideKey) {
  const t = (key) => key.split(".").reduce((o, k) => o?.[k], i18n) || "";
  const guide = i18n.guide?.[guideKey] || {};
  const sections = guide.sections || [];

  let html = `<h1>${guide.title}</h1>\n`;
  html += `<p>${guide.subtitle}</p>\n`;

  let articleBody = "";
  for (const s of sections) {
    html += `<h2>${s.heading}</h2>\n`;
    articleBody += s.heading + ". ";
    if (s.paragraphs) {
      for (const p of s.paragraphs) {
        html += `<p>${p}</p>\n`;
        articleBody += p + " ";
      }
    }
    if (s.bullets) {
      html += `<ul>\n`;
      for (const b of s.bullets) { html += `  <li>${b}</li>\n`; articleBody += b + " "; }
      html += `</ul>\n`;
    }
    if (s.table) {
      html += `<table><thead><tr>`;
      for (const h of (s.table.headers || [])) html += `<th>${h}</th>`;
      html += `</tr></thead><tbody>`;
      for (const row of (s.table.rows || [])) {
        html += `<tr>`;
        for (const cell of row) html += `<td>${cell}</td>`;
        html += `</tr>`;
      }
      html += `</tbody></table>\n`;
    }
  }

  html += `<p><a href="https://apps.apple.com/app/apple-store/id6753901096?pt=127680531&ct=sugarlitetop&mt=8">${t("guide.ctaButton")}</a></p>\n`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.subtitle,
    image: "https://sugarlite.top/og-image.png",
    author: { "@type": "Organization", name: t("appName"), url: "https://sugarlite.top" },
    publisher: {
      "@type": "Organization",
      name: t("appName"),
      logo: { "@type": "ImageObject", url: "https://sugarlite.top/icon.png" },
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    articleBody: articleBody.substring(0, 5000),
    mainEntityOfPage: { "@type": "WebPage", "@id": "https://sugarlite.top" },
  };

  return {
    title: `${guide.title} - ${t("appName")}`,
    description: guide.subtitle,
    html,
    jsonLd,
    type: "article",
  };
}

function getStoriesContent(i18n) {
  const t = (key) => key.split(".").reduce((o, k) => o?.[k], i18n) || "";
  const stories = i18n.stories?.items || [];

  let html = `<h1>${t("stories.title")}</h1>\n`;
  html += `<p>${t("stories.subtitle")}</p>\n`;

  const storyArticles = [];
  for (const story of stories) {
    html += `<article>\n  <h2>${story.name}</h2>\n`;
    html += `  <p><em>${story.condition} — ${story.location}</em></p>\n`;
    let body = "";
    for (const p of (story.paragraphs || [])) { html += `  <p>${p}</p>\n`; body += p + " "; }
    if (story.results) html += `  <p><strong>${story.results}</strong></p>\n`;
    if (story.quote) html += `  <blockquote>"${story.quote}"</blockquote>\n`;
    html += `</article>\n`;
    storyArticles.push({
      "@type": "Article",
      headline: story.name,
      description: `${story.condition} - ${story.location}`,
      author: { "@type": "Person", name: story.name },
      articleBody: body.substring(0, 1000),
    });
  }

  html += `<p><a href="https://apps.apple.com/app/apple-store/id6753901096?pt=127680531&ct=sugarlitetop&mt=8">${t("stories.communityButton")}</a></p>\n`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("stories.title"),
    description: t("stories.subtitle"),
    numberOfItems: stories.length,
    itemListElement: storyArticles.map((a, i) => ({
      ...a,
      position: i + 1,
      publisher: {
        "@type": "Organization",
        name: t("appName"),
        logo: { "@type": "ImageObject", url: "https://sugarlite.top/icon.png" },
      },
      datePublished: new Date().toISOString().split("T")[0],
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://sugarlite.top" },
    })),
  };

  return {
    title: `${t("stories.title")} - ${t("appName")}`,
    description: t("stories.subtitle"),
    html,
    jsonLd,
    type: "article",
  };
}

// ---- HTML template manipulation ----

function buildHreflangLinks(lang, urlPath) {
  let links = "";
  for (const l of LANGUAGES) {
    const hl = LANG_HTML_MAP[l];
    const lPath = urlPath.replace(`/${lang}`, `/${l}`);
    links += `  <link rel="alternate" hreflang="${hl}" href="https://sugarlite.top${lPath}">\n`;
  }
  links += `  <link rel="alternate" hreflang="x-default" href="https://sugarlite.top${urlPath.replace(`/${lang}`, "/zh")}">\n`;
  return links;
}

function buildBreadcrumbJsonLd(lang, urlPath) {
  const pathParts = urlPath.replace(/\/$/, "").split("/").filter(Boolean);
  const items = [];
  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    const itemUrl = "https://sugarlite.top/" + pathParts.slice(0, i + 1).join("/");
    let name = part;
    if (part === lang) name = LANG_NAMES[lang];
    else if (part === "guide") { /* keep as is */ }
    else if (part === "blood-sugar-management") name = "血糖管理指南";
    else if (part === "diabetic-diet") name = "糖尿病饮食建议";
    else if (part === "faq") name = "FAQ";
    else if (part === "stories") name = "用户故事";
    items.push({ "@type": "ListItem", position: i + 1, name, item: itemUrl });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }, null, 2);
}

/**
 * Take the built dist/index.html and customize it for a specific page.
 * Preserves all script tags, import maps, etc. that Vite generated.
 */
function customizeTemplate(templateHtml, pageData, lang, urlPath, canonicalUrl) {
  const langHtml = LANG_HTML_MAP[lang];
  const ogLocale = OG_LOCALES[lang];
  const appName = LANG_NAMES[lang];

  let html = templateHtml;

  // 1. Update <html lang>
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${langHtml}"`);

  // 2. Update <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(pageData.title)}</title>`);

  // 3. Update canonical
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonicalUrl}">`);

  // 4. Update meta description
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${escapeHtml(pageData.description)}">`
  );

  // 5. Update robots meta
  html = html.replace(
    /<meta name="robots"[^>]*>/,
    `<meta name="robots" content="index, follow, max-image-preview:large">`
  );

  // 6. Update OG tags
  html = html.replace(
    /<meta property="og:site_name"[^>]*>/,
    `<meta property="og:site_name" content="${appName}">`
  );
  html = html.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${escapeHtml(pageData.title)}">`
  );
  html = html.replace(
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${escapeHtml(pageData.description)}">`
  );
  html = html.replace(
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${canonicalUrl}">`
  );
  html = html.replace(
    /<meta property="og:type"[^>]*>/,
    `<meta property="og:type" content="${pageData.type}">`
  );
  html = html.replace(
    /<meta property="og:locale"[^>]*>/,
    `<meta property="og:locale" content="${ogLocale}">`
  );

  // 7. Update Twitter tags
  html = html.replace(
    /<meta name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${escapeHtml(pageData.title)}">`
  );
  html = html.replace(
    /<meta name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${escapeHtml(pageData.description)}">`
  );

  // 8. Update Smart App Banner app-argument
  html = html.replace(
    /app-argument=https:\/\/sugarlite\.top[^"]*/,
    `app-argument=${canonicalUrl}`
  );

  // 9. Update hreflang alternates — remove old ones, insert new ones after canonical
  const hreflangBlock = buildHreflangLinks(lang, urlPath);
  // Remove existing alternates
  html = html.replace(/  <link rel="alternate" hreflang="[^"]*"[^>]*>\n/g, "");
  // Insert new ones after canonical
  html = html.replace(
    /(<link rel="canonical"[^>]*>\n)/,
    `$1${hreflangBlock}`
  );

  // 10. Replace noscript content with page-specific content
  html = html.replace(
    /<noscript>[\s\S]*?<\/noscript>/,
    `<noscript>\n    <div style="max-width:800px;margin:40px auto;padding:20px;font-family:system-ui,sans-serif;line-height:1.6">\n${indent(pageData.html, 6)}\n    </div>\n  </noscript>`
  );

  // 11. Update JSON-LD breadcrumb (replace the existing BreadcrumbList block)
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, urlPath);
  html = html.replace(
    /<script type="application\/ld\+json">\s*\{[\s\S]*?"@type":\s*"BreadcrumbList"[\s\S]*?\n  <\/script>/,
    `<script type="application/ld+json">\n${breadcrumbJsonLd}\n  </script>`
  );

  // 12. If page has custom JSON-LD, insert after breadcrumb
  if (pageData.jsonLd) {
    const jsonLdScript = `\n  <script type="application/ld+json">\n${JSON.stringify(pageData.jsonLd, null, 2)}\n  </script>`;
    const breadcrumbEnd = `</script>`;
    const breadcrumbIdx = html.indexOf(breadcrumbEnd, html.indexOf("BreadcrumbList"));
    if (breadcrumbIdx > 0) {
      const insertPos = html.indexOf("\n", breadcrumbIdx) + 1;
      html = html.slice(0, insertPos) + jsonLdScript + html.slice(insertPos);
    }
  }

  // 13. Update the hardcoded WebSite/organization JSON-LD: replace zh content with page language
  // (The main @graph JSON-LD uses Chinese text — for non-zh pages, adjust names)
  if (lang !== "zh") {
    html = html.replace(
      /"name":\s*"轻糖"/g,
      `"name": "${appName}"`
    );
    // Adjust the description in MobileApplication
    html = html.replace(
      /"description":\s*"[^"]*专为关注血糖健康人群设计[^"]*"/,
      `"description": "${escapeHtml(pageData.description)}"`
    );
  }

  // 14. Remove verification placeholder meta tags (still placeholders, not useful)
  // Keep them as-is for now since they need real values

  // 15. Remove analytics script placeholders (keep in only the default index.html)
  // We skip analytics cleanup since these are placeholders anyway

  return html;
}

function indent(text, spaces) {
  const prefix = " ".repeat(spaces);
  return text.split("\n").map(line => line ? prefix + line : "").join("\n");
}

function writePage(lang, subPath, html) {
  const dir = join(distDir, lang, ...subPath.split("/").filter(Boolean));
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  const filePath = join(dir, "index.html");
  writeFileSync(filePath, html);
  const fullPath = `/${lang}${subPath ? "/" + subPath : ""}`;
  console.log(`  ✅ ${fullPath}`);
}

function main() {
  console.log("🔧 SugarLite Prerendering\n");

  if (!existsSync(distDir)) {
    console.error("❌ dist/ directory not found. Run 'vite build' first.");
    process.exit(1);
  }

  // Read the built index.html as template
  const templatePath = join(distDir, "index.html");
  if (!existsSync(templatePath)) {
    console.error("❌ dist/index.html not found. Run 'vite build' first.");
    process.exit(1);
  }
  const templateHtml = readFileSync(templatePath, "utf-8");

  for (const lang of LANGUAGES) {
    const i18n = loadI18n(lang);
    if (!i18n) continue;

    console.log(`\n📝 ${lang.toUpperCase()} pages:`);

    // Homepage
    const homeData = getHomepageContent(i18n);
    writePage(lang, "", customizeTemplate(templateHtml, homeData, lang, `/${lang}`, `https://sugarlite.top/${lang}`));

    // FAQ
    const faqData = getFAQContent(i18n);
    writePage(lang, "faq", customizeTemplate(templateHtml, faqData, lang, `/${lang}/faq`, `https://sugarlite.top/${lang}/faq`));

    // Blood sugar guide
    const bsGuide = getGuideContent(i18n, "bloodSugar");
    writePage(lang, "guide/blood-sugar-management",
      customizeTemplate(templateHtml, bsGuide, lang, `/${lang}/guide/blood-sugar-management`, `https://sugarlite.top/${lang}/guide/blood-sugar-management`));

    // Diabetic diet guide
    const dietGuide = getGuideContent(i18n, "diabeticDiet");
    writePage(lang, "guide/diabetic-diet",
      customizeTemplate(templateHtml, dietGuide, lang, `/${lang}/guide/diabetic-diet`, `https://sugarlite.top/${lang}/guide/diabetic-diet`));

    // Stories
    const storiesData = getStoriesContent(i18n);
    writePage(lang, "stories",
      customizeTemplate(templateHtml, storiesData, lang, `/${lang}/stories`, `https://sugarlite.top/${lang}/stories`));
  }

  // Remove the root dist/index.html since we now have dist/zh/index.html etc.
  // The root index.html is no longer needed as Vercel redirects root to /zh
  // Keep it for safety but it will be superseded by per-lang pages.

  console.log("\n✨ Prerendering complete!");
  console.log(`   Generated ${LANGUAGES.length * 5} static HTML pages across ${LANGUAGES.length} languages.`);
}

main();
