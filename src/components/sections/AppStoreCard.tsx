import { useState, useEffect } from 'react';

interface AppData {
  trackName: string;
  artworkUrl512: string;
  description: string;
  averageUserRating: number;
  userRatingCount: number;
  primaryGenreName: string;
}

const APPLE_APP_STORE_URL =
  'https://apps.apple.com/app/apple-store/id6753901096?pt=127680531&ct=sugarlitetop&mt=8';

const LANG_COUNTRY_MAP: Record<string, string> = {
  zh: 'cn',
  en: 'us',
  ja: 'jp',
  'zh-Hant': 'tw',
};

const CARD_LABELS: Record<string, { download: string; iphone: string; get: string; free: string; getFree: string }> = {
  zh:     { download: '从 App Store 下载', iphone: 'iPhone · 免费', get: '获取', free: '免费', getFree: '免费获取' },
  en:     { download: 'Download on the App Store', iphone: 'iPhone · Free', get: 'Get', free: 'Free', getFree: 'Get it Free' },
  ja:     { download: 'App Store からダウンロード', iphone: 'iPhone · 無料', get: '入手', free: '無料', getFree: '無料で入手' },
  'zh-Hant': { download: '從 App Store 下載', iphone: 'iPhone · 免費', get: '取得', free: '免費', getFree: '免費取得' },
};

interface Props {
  lang: string;
}

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    } else if (i === Math.floor(rating) && rating - Math.floor(rating) >= 0.5) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export default function AppStoreCard({ lang }: Props) {
  const [appData, setAppData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const country = LANG_COUNTRY_MAP[lang] || 'us';
  const labels = CARD_LABELS[lang] || CARD_LABELS.en;

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
          setAppData(data.results[0]);
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
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-[#1a1a1e] rounded-3xl shadow-xl dark:shadow-[#000]/30 p-6 animate-pulse">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gray-200 dark:bg-gray-700 shrink-0" />
            <div className="flex-1 space-y-3 pt-1">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3" />
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6" />
          </div>
          <div className="mt-6 h-14 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !appData) {
    return (
      <div className="w-full max-w-md mx-auto">
        <a
          href={APPLE_APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-white dark:bg-[#1a1a1e] rounded-3xl shadow-xl dark:shadow-[#000]/30 p-6 text-center hover:shadow-2xl transition-all duration-300"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand to-emerald-500 flex items-center justify-center shadow-lg shadow-brand/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">SugarLite</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Download on the App Store</p>
          <span className="inline-block bg-brand text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-dark transition-colors">
            {labels.getFree}
          </span>
        </a>
      </div>
    );
  }

  const shortDescription = appData.description.split('\n')[0] || '';
  const descriptionToShow = expanded
    ? appData.description
    : shortDescription.length > 120
      ? shortDescription.slice(0, 120) + '...'
      : shortDescription;

  return (
    <div className="w-full max-w-md mx-auto">
      <a
        href={APPLE_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-white dark:bg-[#1a1a1e] rounded-3xl shadow-xl dark:shadow-[#000]/30 hover:shadow-2xl transition-all duration-300 overflow-hidden"
      >
        {/* Top section: icon + info */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-5">
            {/* App Icon */}
            <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 dark:ring-white/10">
              <img
                src={appData.artworkUrl512}
                alt={appData.trackName}
                className="w-full h-full object-cover"
                loading="lazy"
                width={80}
                height={80}
              />
            </div>

            {/* App Info */}
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                {appData.trackName}
              </h3>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1">
                  <StarRating rating={appData.averageUserRating} />
                  {appData.userRatingCount > 0 && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">
                      ({formatNumber(appData.userRatingCount)})
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand/10 text-brand font-medium">
                  {appData.primaryGenreName}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 font-medium">
                  {labels.free}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-6">
          <div className="relative">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
              {descriptionToShow}
            </p>
          </div>
        </div>

        {/* Download Button */}
        <div className="px-6 pb-6 mt-4">
          <div className="flex items-center justify-between gap-4 p-3 pl-5 rounded-2xl bg-gradient-to-r from-brand/10 via-brand/5 to-transparent dark:from-brand/15 dark:via-brand/5 dark:to-transparent border border-brand/10 dark:border-brand/20">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-brand shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.62-.71 1.64-1.23 2.59-1.26.1 1.07-.3 2.14-.86 2.91-.58.79-1.53 1.37-2.47 1.29-.13-1.04.31-2.08.74-2.94z"/>
              </svg>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{labels.download}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{labels.iphone}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 bg-brand text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-brand-dark transition-colors shrink-0 group/link">
              {labels.get}
              <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
