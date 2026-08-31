import type { Language } from '@/types';

export const LANGUAGES: Language[] = ['zh', 'en', 'ja', 'zh-Hant'];

export const DEFAULT_LOCALE: Language = 'zh';

export const LOCALIZED_LANGUAGES: Language[] = LANGUAGES.filter(
  (lang) => lang !== DEFAULT_LOCALE
);

export const LANG_TO_HTML_LANG: Record<Language, string> = {
  zh: 'zh-CN',
  en: 'en-US',
  ja: 'ja-JP',
  'zh-Hant': 'zh-TW',
};

export const HTML_LANG_TO_LANG: Record<string, Language> = {
  'zh-CN': 'zh',
  'en-US': 'en',
  'ja-JP': 'ja',
  'zh-TW': 'zh-Hant',
};

/** Extra hreflang codes that map to the same URL as the regional tag. */
export const HREFLANG_ALIASES: Record<string, string[]> = {
  'zh-CN': ['zh', 'zh-Hans'],
  'en-US': ['en'],
  'ja-JP': ['ja'],
  'zh-TW': ['zh-Hant'],
};

export const LANG_TO_OG_LOCALE: Record<Language, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  ja: 'ja_JP',
  'zh-Hant': 'zh_TW',
};

export const SITE = 'https://sugarlite.top';

export interface AlternateUrl {
  hrefLang: string;
  href: string;
}

export function getPathWithoutLang(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (LANGUAGES.includes(segments[0] as Language)) {
    segments.shift();
  }
  return segments.join('/');
}

export function getLocalizedPath(lang: Language, pathWithoutLang: string): string {
  const prefix = lang === DEFAULT_LOCALE ? '' : `/${lang}`;
  return pathWithoutLang ? `${prefix}/${pathWithoutLang}` : prefix || '/';
}

export function getAlternateUrls(
  pathWithoutLang: string,
  defaultLocale: Language = DEFAULT_LOCALE,
  baseUrl?: string
): AlternateUrl[] {
  const origin = baseUrl || SITE;

  // Full hreflang codes (zh-CN / en-US / ja-JP / zh-TW) — keep in sync with
  // the sitemap serialize() output in astro.config.mjs.
  const alternates: AlternateUrl[] = LANGUAGES.map((lang) => ({
    hrefLang: LANG_TO_HTML_LANG[lang],
    href: `${origin}${getLocalizedPath(lang, pathWithoutLang)}`,
  }));

  alternates.push({
    hrefLang: 'x-default',
    href: `${origin}${getLocalizedPath(defaultLocale, pathWithoutLang)}`,
  });

  return alternates;
}

/**
 * Expand regional hreflang tags with language-only aliases (en, zh, ja, …)
 * so unspecified-region queries still match. Navbar should keep using
 * `getAlternateUrls` so the language switcher is not duplicated.
 */
export function expandHreflangUrls(alternates: AlternateUrl[]): AlternateUrl[] {
  const extra: AlternateUrl[] = [];
  for (const alt of alternates) {
    const aliases = HREFLANG_ALIASES[alt.hrefLang];
    if (!aliases) continue;
    for (const hrefLang of aliases) {
      extra.push({ hrefLang, href: alt.href });
    }
  }
  return [...alternates, ...extra];
}

export function getStaticLangPaths() {
  return LOCALIZED_LANGUAGES.map((lang) => ({ params: { lang } }));
}

export function getLangFromPath(pathname: string): Language {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return LANGUAGES.includes(firstSegment as Language) ? (firstSegment as Language) : 'zh';
}
