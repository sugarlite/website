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

  const alternates = LANGUAGES.map((lang) => ({
    hrefLang: lang,
    href: `${origin}${getLocalizedPath(lang, pathWithoutLang)}`,
  }));

  alternates.push({
    hrefLang: 'x-default',
    href: `${origin}${getLocalizedPath(defaultLocale, pathWithoutLang)}`,
  });

  return alternates;
}

export function getStaticLangPaths() {
  return LOCALIZED_LANGUAGES.map((lang) => ({ params: { lang } }));
}

export function getLangFromPath(pathname: string): Language {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return LANGUAGES.includes(firstSegment as Language) ? (firstSegment as Language) : 'zh';
}
