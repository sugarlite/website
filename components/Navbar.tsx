
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, APP_NAME } from '../constants';
import { Language } from '../types';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  lang: Language;
  setLang: (val: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 overflow-hidden p-1">
              <img src="/logo.svg" alt="SugarLite Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark">{APP_NAME[lang]}</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <a key={item.label.en} href={item.href} className="text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-brand font-medium transition-colors">
                {item.label[lang]}
              </a>
            ))}

            <div className="flex items-center gap-2 border-l dark:border-slate-700 pl-6 ml-2">
              <button
                onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
                className="p-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors uppercase"
              >
                {lang === 'zh' ? 'EN' : '中文'}
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.929 7.929l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>
            </div>

            <button className="bg-brand text-white px-6 py-2 rounded-full font-bold hover:bg-brand-dark transition-all transform hover:scale-105">
              {lang === 'zh' ? '立即下载' : 'Download'}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600">
              {lang === 'zh' ? 'EN' : '中'}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 dark:text-slate-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 p-4 space-y-4 shadow-xl">
          {NAV_ITEMS.map((item) => (
            <a key={item.label.en} href={item.href} onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-600 dark:text-slate-300">
              {item.label[lang]}
            </a>
          ))}
          <button className="w-full bg-brand text-white py-3 rounded-xl font-bold">
            {lang === 'zh' ? '立即下载' : 'Download Now'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
