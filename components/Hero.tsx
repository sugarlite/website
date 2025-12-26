
import React from 'react';
import { UI_STRINGS } from '../constants';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = (key: string) => UI_STRINGS[key][lang];

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold border border-brand/20">
              <span className="animate-pulse w-2 h-2 bg-brand rounded-full"></span>
              {t('heroTag')}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              {t('heroTitle')}<br />
              <span className="text-brand">{t('heroTitleHighlight')}</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-brand text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.24-1.99 1.1-3.15-1.04.04-2.3.69-3.05 1.52-.66.71-1.25 1.88-1.1 3.03 1.16.09 2.3-.57 3.05-1.4z"/></svg>
                {t('downloadAppStore')}
              </button>
              <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.41-.814V2.628c0-.31.14-.6-.41-.814zM15.208 13.417l2.846 1.638a2 2 0 0 1 0 3.475l-2.846 1.637-2.917-2.917 2.917-2.833zm-4.333-1.417L2.458 3.583a1 1 0 0 1 1.417-1.417l8.417 8.417-1.417 1.417zm0 0l1.417 1.417-8.417 8.417a1 1 0 0 1-1.417-1.417L10.875 12z"/></svg>
                {t('downloadGooglePlay')}
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex justify-center">
             <div className="relative w-72 lg:w-80 h-[600px] bg-slate-200 dark:bg-slate-800 rounded-[3rem] border-8 border-slate-900 dark:border-slate-700 shadow-2xl overflow-hidden transform lg:rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="h-full w-full bg-white dark:bg-slate-900 flex flex-col">
                  <div className="p-6 pb-2 space-y-4">
                     <div className="flex justify-between items-center pt-4">
                        <span className="font-bold text-lg dark:text-white">{t('overview')}</span>
                        <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">＋</div>
                     </div>
                     <div className="bg-brand/5 rounded-2xl p-4 border border-brand/10">
                        <div className="text-xs text-slate-500 mb-1">{t('dailyAvg')}</div>
                        <div className="text-3xl font-bold text-brand">5.6 <span className="text-sm font-normal text-slate-500">{t('unit')}</span></div>
                        <div className="mt-4 h-24 w-full flex items-end gap-1">
                          {[40, 70, 50, 90, 60, 40, 30].map((h, i) => (
                            <div key={i} className="flex-1 bg-brand rounded-t-sm" style={{ height: `${h}%` }}></div>
                          ))}
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">🍎</div>
                          <div className="flex-1">
                            <div className="text-sm font-bold dark:text-white">{lang === 'zh' ? '丝瓜' : 'Sponge Gourd'}</div>
                            <div className="text-xs text-slate-500">{lang === 'zh' ? '热量 21卡 · GI 24' : 'Cal 21 · GI 24'}</div>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">🍞</div>
                          <div className="flex-1">
                            <div className="text-sm font-bold dark:text-white">{lang === 'zh' ? '全麦面包' : 'Whole Wheat'}</div>
                            <div className="text-xs text-slate-500">{lang === 'zh' ? '热量 278卡 · GI 60' : 'Cal 278 · GI 60'}</div>
                          </div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-auto p-4 flex justify-between border-t dark:border-slate-800">
                    <div className="text-brand">🏠</div>
                    <div className="text-slate-400">🥗</div>
                    <div className="text-slate-400">👤</div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
