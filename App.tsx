import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import AppPreview from "./components/AppPreview";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import { Language } from "./types";
import { APP_LINKS, UI_STRINGS } from "./constants";
import { useOpenGraph } from "./hooks/useOpenGraph";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useCountUp } from "./hooks/useCountUp";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Sync with system preference on mount
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Language Wrapper Component to extract lang from URL
  const LanguageWrapper: React.FC = () => {
    const { lang: urlLang } = useParams<{ lang: Language }>();
    const lang = urlLang === "en" || urlLang === "zh" ? urlLang : "zh";

    const t = (key: string) => UI_STRINGS[key][lang];

    // Update language when URL changes
    const handleSetLang = (newLang: Language) => {
      const currentPath = location.pathname.split("/").slice(2).join("/") || "";
      navigate(`/${newLang}${currentPath ? "/" + currentPath : ""}`);
    };

    // Update HTML lang attribute
    useEffect(() => {
      document.documentElement.lang = lang === "zh" ? "zh-CN" : "en-US";
    }, [lang]);

    // Manage alternate language links for SEO
    useEffect(() => {
      const currentPath = location.pathname.split("/").slice(2).join("/") || "";
      const langs: Language[] = ["zh", "en"];
      const existingAlts = document.querySelectorAll('link[rel="alternate"]');
      existingAlts.forEach((el) => el.remove());

      langs.forEach((l) => {
        const link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", l);
        link.setAttribute("href", `https://sugarlite.top/${l}${currentPath ? "/" + currentPath : ""}`);
        document.head.appendChild(link);
      });

      // x-default points to zh
      const defaultLink = document.createElement("link");
      defaultLink.setAttribute("rel", "alternate");
      defaultLink.setAttribute("hreflang", "x-default");
      defaultLink.setAttribute("href", `https://sugarlite.top/zh${currentPath ? "/" + currentPath : ""}`);
      document.head.appendChild(defaultLink);
    }, [location.pathname]);

    // Set OpenGraph metadata based on current page
    useOpenGraph({
      title:
        location.pathname.endsWith("/") || location.pathname === `/${lang}`
          ? lang === "zh"
            ? "SugarLite 轻糖 - 掌控您的血糖健康"
            : "SugarLite - Manage Your Blood Sugar Health"
          : location.pathname.includes("/privacy")
          ? lang === "zh"
            ? "隐私政策 - SugarLite 轻糖"
            : "Privacy Policy - SugarLite"
          : lang === "zh"
          ? "服务条款 - SugarLite 轻糖"
          : "Terms of Service - SugarLite",
      description:
        location.pathname.endsWith("/") || location.pathname === `/${lang}`
          ? lang === "zh"
            ? "SugarLite（轻糖）是一款专业的血糖监测、趋势分析与健康管理应用，通过科学的数据看板助您掌控健康生活。"
            : "SugarLite is a professional blood sugar monitoring, trend analysis and health management application."
          : location.pathname.includes("/privacy")
          ? lang === "zh"
            ? "了解 SugarLite 轻糖的隐私政策和数据保护措施。"
            : "Learn about SugarLite's privacy policy and data protection measures."
          : lang === "zh"
          ? "查看 SugarLite 轻糖的服务条款和使用协议。"
          : "View SugarLite's terms of service and usage agreement.",
      url: `https://sugarlite.top${location.pathname}`,
      image: "https://sugarlite.top/og-image.png",
      type: "website",
    });

    // Navigate to different pages
    const handleNavigate = (page: string) => {
      if (page === "home") {
        navigate(`/${lang}`);
      } else if (page === "privacy") {
        navigate(`/${lang}/privacy`);
      } else if (page === "terms") {
        navigate(`/${lang}/terms`);
      }
      window.scrollTo(0, 0);
    };

    // Home page content
    const HomePage = () => {
      const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();
      const { ref: suitableRef, isVisible: suitableVisible } = useScrollReveal();
      const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

      const userCount = useCountUp(5000000, 2000, 0, statsVisible);
      const foodCount = useCountUp(10000, 2000, 0, statsVisible);

      return (
        <main>
          <Hero lang={lang} />

          {/* Statistics Banner */}
          <section className="py-20 bg-[#f5f5f7] dark:bg-[#0d0d0f]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                ref={statsRef}
                className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center ${statsVisible ? 'visible' : ''}`}
              >
                <div className="reveal stagger-1">
                  <div className="text-4xl lg:text-5xl font-extrabold mb-2 text-slate-900 dark:text-white">
                    {userCount.toLocaleString()}+
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {t("statsUsers")}
                  </div>
                </div>
                <div className="reveal stagger-2">
                  <div className="text-4xl lg:text-5xl font-extrabold mb-2 text-slate-900 dark:text-white">
                    {foodCount.toLocaleString()}+
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {t("statsFood")}
                  </div>
                </div>
                <div className="reveal stagger-3">
                  <div className="text-4xl lg:text-5xl font-extrabold mb-2 text-slate-900 dark:text-white">4.9/5</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {t("statsRatings")}
                  </div>
                </div>
                <div className="reveal stagger-4">
                  <div className="text-4xl lg:text-5xl font-extrabold mb-2 text-slate-900 dark:text-white">24/7</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {t("statsAvailability")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Features lang={lang} />

          <AppPreview lang={lang} />

          {/* Suitable Users & Disclaimer */}
          <section className="py-32 bg-white dark:bg-black">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                ref={suitableRef}
                className={`grid lg:grid-cols-2 gap-16 ${suitableVisible ? 'visible' : ''}`}
              >
                <div>
                  <h3 className="reveal stagger-1 text-4xl lg:text-5xl font-extrabold mb-8 text-slate-900 dark:text-white">
                    {t("suitableUsersTitle")}
                  </h3>
                  <ul className="space-y-4 text-lg text-slate-500 dark:text-slate-400">
                    <li className="reveal stagger-2 flex items-start gap-3">
                      <span className="text-brand mt-1.5 text-xs">●</span>
                      <span>{t("suitableUser1")}</span>
                    </li>
                    <li className="reveal stagger-3 flex items-start gap-3">
                      <span className="text-brand mt-1.5 text-xs">●</span>
                      <span>{t("suitableUser2")}</span>
                    </li>
                    <li className="reveal stagger-4 flex items-start gap-3">
                      <span className="text-brand mt-1.5 text-xs">●</span>
                      <span>{t("suitableUser3")}</span>
                    </li>
                    <li className="reveal stagger-5 flex items-start gap-3">
                      <span className="text-brand mt-1.5 text-xs">●</span>
                      <span>{t("suitableUser4")}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="reveal stagger-1 text-4xl lg:text-5xl font-extrabold mb-8 text-slate-900 dark:text-white">
                    {t("disclaimerTitle")}
                  </h3>
                  <p className="reveal stagger-3 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
                    {t("disclaimerText")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section id="download" className="py-32 bg-[#f5f5f7] dark:bg-[#0d0d0f]">
            <div
              ref={ctaRef}
              className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${ctaVisible ? 'visible' : ''}`}
            >
              <h2 className="reveal stagger-1 text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">
                {t("ctaTitle")}
              </h2>
              <p className="reveal stagger-2 text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-xl mx-auto">
                {t("ctaSubtitle")}
              </p>
              <div className="reveal stagger-3 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={APP_LINKS.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand text-white px-10 py-4 rounded-full font-bold hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
                >
                  <img src="/apple-store.svg" alt="App Store" className="w-6 h-6" />
                  {t("ctaPrimary")}
                </a>
                <a
                  href={APP_LINKS.supportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-full font-bold hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t("ctaSecondary")}
                </a>
              </div>
            </div>
          </section>
        </main>
      );
    };

    return (
      <div className="min-h-screen transition-colors duration-300 dark:bg-slate-950">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          lang={lang}
          setLang={handleSetLang}
          onNavigate={handleNavigate}
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/privacy"
            element={<PrivacyPolicy lang={lang} onNavigate={handleNavigate} />}
          />
          <Route
            path="/terms"
            element={<TermsOfService lang={lang} onNavigate={handleNavigate} />}
          />
        </Routes>

        <Footer lang={lang} onNavigate={handleNavigate} />
      </div>
    );
  };

  return (
    <Routes>
      {/* Redirect root to default language (zh) */}
      <Route path="/" element={<Navigate to="/zh" replace />} />

      {/* Redirect privacy and terms without language to English */}
      <Route path="/privacy" element={<Navigate to="/en/privacy" replace />} />
      <Route path="/terms" element={<Navigate to="/en/terms" replace />} />

      {/* Language-based routes */}
      <Route path="/:lang/*" element={<LanguageWrapper />} />
    </Routes>
  );
};

export default App;
