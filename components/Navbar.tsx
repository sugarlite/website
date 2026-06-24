
import React, { useState, useEffect, useRef } from "react";
import { APP_NAME, APP_LINKS } from "../constants";
import { Language } from "../types";
import { useTranslation } from "../hooks/useTranslation";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  lang: Language;
  setLang: (val: Language) => void;
  onNavigate: (page: string) => void;
}

const LANG_LABELS: Record<Language, string> = {
  zh: "中文",
  en: "English",
  ja: "日本語",
  "zh-Hant": "繁體中文",
};

const LANG_SHORT_LABELS: Record<Language, string> = {
  zh: "中",
  en: "EN",
  ja: "日",
  "zh-Hant": "繁",
};

const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  lang,
  setLang,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  // Separate refs for desktop and mobile dropdowns: a single ref shared by two
  // DOM nodes is silently overwritten by the second mount, so click-outside
  // detection would only ever guard the mobile menu and break the desktop one.
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(lang);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close language dropdown when clicking outside either dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideDesktop =
        !!desktopLangRef.current && desktopLangRef.current.contains(target);
      const insideMobile =
        !!mobileLangRef.current && mobileLangRef.current.contains(target);
      if (!insideDesktop && !insideMobile) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    setIsLangOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0_12px_40px_-24px_rgba(15,23,42,0.45)]"
          : "bg-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src="/icon.png"
                alt="SugarLite Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand to-teal-600 dark:to-teal-300">
              {APP_NAME[lang]}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 rounded-full px-5 py-2 bg-white/72 dark:bg-slate-900/72 backdrop-blur-md shadow-[0_14px_34px_-24px_rgba(15,23,42,0.45)]">
            <button
              onClick={() => {
                const element = document.querySelector("#features");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-brand font-medium transition-colors"
            >
              {t("nav.features")}
            </button>
            <button
              onClick={() => {
                const element = document.querySelector("#preview");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-brand font-medium transition-colors"
            >
              {t("nav.preview")}
            </button>
            <button
              onClick={() => {
                const element = document.querySelector("#download");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-brand font-medium transition-colors"
            >
              {t("nav.download")}
            </button>

            <button
              onClick={() => onNavigate("faq")}
              className="text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-brand font-medium transition-colors"
            >
              {t("nav.faq")}
            </button>

            <div className="flex items-center gap-2 pl-4 ml-1">
              {/* Language Dropdown - Desktop */}
              <div className="relative" ref={desktopLangRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1 p-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {LANG_LABELS[lang]}
                  <svg
                    className={`w-3 h-3 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden py-1">
                    {(["zh", "en", "ja", "zh-Hant"] as Language[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLangChange(l)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          l === lang
                            ? "bg-brand/10 text-brand font-semibold"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        {LANG_LABELS[l]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              >
                {darkMode ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.929 7.929l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <a
              href={APP_LINKS.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-brand to-emerald-500 text-white px-6 py-2 rounded-full font-bold hover:brightness-105 transition-all transform hover:-translate-y-0.5"
            >
              {t("nav.download")}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            {/* Language Dropdown - Mobile */}
            <div className="relative" ref={mobileLangRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1"
              >
                {LANG_SHORT_LABELS[lang]}
                <svg
                  className={`w-3 h-3 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-28 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden py-1 z-50">
                  {(["zh", "en", "ja", "zh-Hant"] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLangChange(l)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        l === lang
                          ? "bg-brand/10 text-brand font-semibold"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      {LANG_SHORT_LABELS[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.929 7.929l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 dark:text-slate-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 p-4 space-y-4 shadow-xl">
          <button
            onClick={() => {
              const element = document.querySelector("#features");
              element?.scrollIntoView({ behavior: "smooth" });
              setIsMenuOpen(false);
            }}
            className="block w-full text-left text-lg font-medium text-slate-600 dark:text-slate-300"
          >
            {t("nav.features")}
          </button>
          <button
            onClick={() => {
              const element = document.querySelector("#preview");
              element?.scrollIntoView({ behavior: "smooth" });
              setIsMenuOpen(false);
            }}
            className="block w-full text-left text-lg font-medium text-slate-600 dark:text-slate-300"
          >
            {t("nav.preview")}
          </button>
          <button
            onClick={() => {
              const element = document.querySelector("#download");
              element?.scrollIntoView({ behavior: "smooth" });
              setIsMenuOpen(false);
            }}
            className="block w-full text-left text-lg font-medium text-slate-600 dark:text-slate-300"
          >
            {t("nav.download")}
          </button>
          <button
            onClick={() => {
              onNavigate("faq");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left text-lg font-medium text-slate-600 dark:text-slate-300"
          >
            {t("nav.faq")}
          </button>
          <a
            href={APP_LINKS.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center w-full bg-brand text-white py-3 rounded-xl font-bold"
          >
            {t("nav.download")}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
