
import React from 'react';
import { FEATURES, UI_STRINGS } from '../constants';
import { Language } from '../types';

interface FeaturesProps {
  lang: Language;
}

const Features: React.FC<FeaturesProps> = ({ lang }) => {
  const t = (key: string) => UI_STRINGS[key][lang];

  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        <div className="space-y-4">
          <h2 className="text-brand font-bold tracking-wider uppercase">{t('featuresTag')}</h2>
          <p className="text-3xl lg:text-5xl font-extrabold">{t('featuresTitle')}</p>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 hover:shadow-xl transition-all group border border-transparent hover:border-brand/20">
              <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-brand/20">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">{feature.title[lang]}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
