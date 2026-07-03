import { useState, useEffect } from 'react';

const APPLE_APP_STORE_URL =
  'https://apps.apple.com/app/apple-store/id6753901096?pt=127680531&ct=sugarlitetop&mt=8';

const LANG_COUNTRY_MAP: Record<string, string> = {
  zh: 'cn',
  en: 'us',
  ja: 'jp',
  'zh-Hant': 'tw',
};

interface Props {
  lang: string;
}

export default function AppStoreBadge({ lang }: Props) {
  const [trackName, setTrackName] = useState<string>('SugarLite');
  const [price, setPrice] = useState<string>('Free');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const country = LANG_COUNTRY_MAP[lang] || 'us';

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    setLoading(true);
    setError(false);

    fetch(`https://itunes.apple.com/lookup?id=6753901096&country=${country}&t=${Date.now()}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const app = data.results[0];
          setTrackName(app.trackName || 'SugarLite');
          setPrice(app.formattedPrice || 'Free');
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => {
        clearTimeout(timeoutId);
        setLoading(false);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [country]);

  if (loading) {
    return (
      <a
        href={APPLE_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 bg-brand text-white px-6 py-3.5 font-bold text-lg hover:bg-brand-dark transition-all duration-300 animate-pulse"
      >
        <div class="flex flex-col items-start gap-0.5">
          <div class="h-4 w-24 bg-white/20 rounded" />
          <div class="h-3 w-14 bg-white/20 rounded" />
        </div>
      </a>
    );
  }

  if (error) {
    return (
      <a
        href={APPLE_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        class="bg-brand text-white px-8 py-4 font-bold text-lg hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
      >
        <img src="/apple-store.svg" alt="App Store" class="w-6 h-6" />
        App Store
      </a>
    );
  }

  return (
    <a
      href={APPLE_APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-5 bg-brand text-white pl-6 pr-7 py-2.5 font-bold text-lg hover:bg-brand-dark transition-all duration-300 group"
    >
      <div class="flex flex-col items-start leading-tight">
        <span class="text-base font-bold leading-tight">{trackName}</span>
        <span class="text-xs text-white/70 font-normal">{price}</span>
      </div>
      <svg
        class="w-5 h-5 transition-transform group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}
