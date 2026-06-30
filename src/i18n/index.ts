import type { Language } from '@/types';
import zh from './zh.json';
import en from './en.json';
import ja from './ja.json';
import zhHant from './zh-Hant.json';

export const translations = {
  zh,
  en,
  ja,
  'zh-Hant': zhHant,
} as const;

export type Translations = typeof translations;

export function t(lang: Language, key: string, fallback?: string): string {
  const value = key.split('.').reduce(
    (obj, k) =>
      obj && typeof obj === 'object' && k in obj
        ? (obj as Record<string, unknown>)[k]
        : undefined,
    translations[lang] as unknown
  );

  return typeof value === 'string' ? value : fallback || key;
}

export function tArray(lang: Language, key: string): string[] {
  const value = key.split('.').reduce(
    (obj, k) =>
      obj && typeof obj === 'object' && k in obj
        ? (obj as Record<string, unknown>)[k]
        : undefined,
    translations[lang] as unknown
  );

  return Array.isArray(value) && value.every((v) => typeof v === 'string')
    ? (value as string[])
    : [];
}

export function tRecord(lang: Language, key: string): Record<string, unknown> {
  const value = key.split('.').reduce(
    (obj, k) =>
      obj && typeof obj === 'object' && k in obj
        ? (obj as Record<string, unknown>)[k]
        : undefined,
    translations[lang] as unknown
  );

  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}
