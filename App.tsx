
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AppPreview from './components/AppPreview';
import Footer from './components/Footer';
import { Language } from './types';
import { UI_STRINGS } from './constants';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState<Language>('zh');

  useEffect(() => {
    // Sync with system preference on mount
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const t = (key: string) => UI_STRINGS[key][lang];

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-slate-950">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        
        {/* Statistics Banner */}
        <section className="bg-brand py-12">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                <div>
                  <div className="text-4xl font-extrabold mb-1">5,000,000+</div>
                  <div className="text-sm opacity-80 uppercase tracking-wider font-semibold">{t('statsUsers')}</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold mb-1">10,000+</div>
                  <div className="text-sm opacity-80 uppercase tracking-wider font-semibold">{t('statsFood')}</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold mb-1">4.9/5</div>
                  <div className="text-sm opacity-80 uppercase tracking-wider font-semibold">{t('statsRatings')}</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold mb-1">24/7</div>
                  <div className="text-sm opacity-80 uppercase tracking-wider font-semibold">{t('statsAvailability')}</div>
                </div>
              </div>
           </div>
        </section>

        <Features lang={lang} />
        
        <AppPreview lang={lang} />

        {/* Call to Action Section */}
        <section id="download" className="py-24 bg-white dark:bg-slate-900 transition-colors">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-brand/20">
              <div className="absolute top-0 right-0 p-8 text-white/10 text-9xl font-bold italic">HEALTH</div>
              <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 relative z-10">{t('ctaTitle')}</h2>
              <p className="text-lg opacity-90 mb-10 max-w-xl mx-auto relative z-10">
                {t('ctaSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <button className="bg-white text-brand px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-colors shadow-lg">
                  {t('ctaPrimary')}
                </button>
                <button className="bg-brand-dark/50 border border-white/30 text-white px-10 py-4 rounded-2xl font-bold hover:bg-brand-dark transition-colors">
                  {t('ctaSecondary')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default App;
