
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
                <img src="/apple-store.svg" alt="App Store" className="w-6 h-6 contrast-200" />
                {t('downloadAppStore')}
              </button>
              <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <img src="/google-play.svg" alt="Google Play" className="w-6 h-6" />
                {t('downloadGooglePlay')}
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex justify-center">
            <div className="relative w-72 lg:w-80 h-auto rounded-[3rem] border-8 border-slate-900 dark:border-slate-800 shadow-2xl overflow-hidden transform lg:rotate-6 hover:rotate-0 transition-transform duration-500 bg-slate-100 dark:bg-slate-900">
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
