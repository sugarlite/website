
import React from 'react';
import { FEATURES } from '../constants';
import { Language } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface FeaturesProps {
  lang: Language;
}

const Features: React.FC<FeaturesProps> = ({ lang }) => {
  const { t } = useTranslation(lang);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

  return (
    <section id="features" className="py-32 bg-[#f5f5f7] dark:bg-[#0d0d0f] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-20 space-y-4 ${headerVisible ? 'visible' : ''}`}
        >
          <p className="reveal stagger-1 text-brand font-semibold tracking-wide uppercase text-sm">{t('features.tag')}</p>
          <h2 className="reveal stagger-2 text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">{t('features.title')}</h2>
          <p className="reveal stagger-3 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 ${gridVisible ? 'visible' : ''}`}
        >
          {FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              className={`reveal text-left stagger-${Math.min(index + 1, 6)}`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-brand to-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-brand/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{t(`features.${feature.id === 'cloud' ? 'sync' : feature.id}.title`)}</h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                {t(`features.${feature.id === 'cloud' ? 'sync' : feature.id}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
