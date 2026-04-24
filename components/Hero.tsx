
import React from 'react';
import { APP_LINKS, UI_STRINGS } from '../constants';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = (key: string) => UI_STRINGS[key][lang];

  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 text-brand text-sm font-semibold animate-fade-in">
              <span className="animate-pulse w-2 h-2 bg-brand rounded-full"></span>
              {t('heroTag')}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white animate-fade-in" style={{ animationDelay: '0.08s' }}>
              {t('heroTitle')}<br />
              <span className="text-brand">{t('heroTitleHighlight')}</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in" style={{ animationDelay: '0.16s' }}>
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start text-sm animate-fade-in" style={{ animationDelay: '0.24s' }}>
              <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 font-medium">PGRS</span>
              <span className="px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400 font-medium">HealthKit</span>
              <span className="px-4 py-1.5 rounded-full bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 font-medium">AI Insights</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 animate-fade-in" style={{ animationDelay: '0.32s' }}>
              <a
                href={APP_LINKS.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
              >
                <img src="/apple-store.svg" alt="App Store" className="w-6 h-6" />
                {t('downloadAppStore')}
              </a>
              <a
                href={APP_LINKS.supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {lang === "zh" ? "使用帮助" : "Help Center"}
              </a>
            </div>
          </div>

          <div className="flex-1 relative flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-0 right-0 md:right-8 z-10 px-5 py-3 rounded-2xl glass-card float-y">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Today</p>
              <p className="text-2xl font-extrabold text-brand">5.6 mmol/L</p>
            </div>
            <div className="absolute bottom-8 left-0 md:left-4 z-10 px-5 py-3 rounded-2xl glass-card float-y" style={{ animationDelay: "600ms" }}>
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">PGRS</p>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{lang === "zh" ? "友好食物 +6" : "Friendly Foods +6"}</p>
            </div>
            <div className="relative w-72 lg:w-[22rem] h-auto rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-900/20">
              <img
                src="/hero-phone.png"
                alt="SugarLite App Interface"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
