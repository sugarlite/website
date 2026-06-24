import { useState, useEffect, useCallback } from 'react';
import type { Language } from '../types';

// Translation cache
const translationsCache: Record<Language, Record<string, any> | null> = {
  zh: null,
  en: null,
  ja: null,
  'zh-Hant': null,
};

// Loading promises to avoid duplicate fetches
const loadingPromises: Record<Language, Promise<void> | null> = {
  zh: null,
  en: null,
  ja: null,
  'zh-Hant': null,
};

async function loadTranslations(lang: Language): Promise<void> {
  if (translationsCache[lang]) return;
  if (loadingPromises[lang]) return loadingPromises[lang]!;

  loadingPromises[lang] = (async () => {
    try {
      const response = await fetch(`/i18n/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      translationsCache[lang] = await response.json();
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      // Fallback to empty object
      translationsCache[lang] = {};
    }
  })();

  return loadingPromises[lang];
}

export function useTranslation(lang: Language) {
  const [isLoading, setIsLoading] = useState(!translationsCache[lang]);
  const [translations, setTranslations] = useState<Record<string, any>>(
    translationsCache[lang] || {}
  );

  useEffect(() => {
    let cancelled = false;

    if (!translationsCache[lang]) {
      setIsLoading(true);
      loadTranslations(lang).then(() => {
        if (!cancelled) {
          setTranslations(translationsCache[lang] || {});
          setIsLoading(false);
        }
      });
    } else {
      setTranslations(translationsCache[lang] || {});
      setIsLoading(false);
    }

    return () => { cancelled = true; };
  }, [lang]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const keys = key.split('.');
      let value: any = translations;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return fallback || key;
        }
      }

      return typeof value === 'string' ? value : fallback || key;
    },
    [translations]
  );

  const tArray = useCallback(
    (key: string): string[] => {
      const keys = key.split('.');
      let value: any = translations;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return [];
        }
      }

      return Array.isArray(value) ? value : [];
    },
    [translations]
  );

  return { t, tArray, isLoading };
}

// Preload all translations on app start
export function preloadTranslations(): Promise<void> {
  const langs: Language[] = ['zh', 'en', 'ja', 'zh-Hant'];
  return Promise.all(langs.map(loadTranslations)).then(() => undefined);
}
