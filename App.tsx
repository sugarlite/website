import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import AppPreview from "./components/AppPreview";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import { Language } from "./types";
import { UI_STRINGS } from "./constants";
import { useOpenGraph } from "./hooks/useOpenGraph";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState<Language>("zh");
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

  const t = (key: string) => UI_STRINGS[key][lang];

  // Set OpenGraph metadata based on current page
  useOpenGraph({
    title:
      location.pathname === "/"
        ? "SugarLite 轻糖 - 掌控您的血糖健康"
        : location.pathname === "/privacy"
        ? "隐私政策 - SugarLite 轻糖"
        : "服务条款 - SugarLite 轻糖",
    description:
      location.pathname === "/"
        ? "SugarLite（轻糖）是一款专业的血糖监测、趋势分析与健康管理应用，通过科学的数据看板助您掌控健康生活。"
        : location.pathname === "/privacy"
        ? "了解 SugarLite 轻糖的隐私政策和数据保护措施。"
        : "查看 SugarLite 轻糖的服务条款和使用协议。",
    url: `https://sugerlite.top${location.pathname}`,
    image: "https://sugerlite.top/og-image.png",
    type: "website",
  });

  // Navigate to different pages
  const handleNavigate = (page: string) => {
    if (page === "home") {
      navigate("/");
    } else if (page === "privacy") {
      navigate("/privacy");
    } else if (page === "terms") {
      navigate("/terms");
    }
    window.scrollTo(0, 0);
  };

  // Home page content
  const HomePage = () => (
    <main>
      <Hero lang={lang} />

      {/* Statistics Banner */}
      <section className="bg-brand py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-extrabold mb-1">5,000,000+</div>
              <div className="text-sm opacity-80 uppercase tracking-wider font-semibold">
                {t("statsUsers")}
              </div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-1">10,000+</div>
              <div className="text-sm opacity-80 uppercase tracking-wider font-semibold">
                {t("statsFood")}
              </div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-1">4.9/5</div>
              <div className="text-sm opacity-80 uppercase tracking-wider font-semibold">
                {t("statsRatings")}
              </div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-1">24/7</div>
              <div className="text-sm opacity-80 uppercase tracking-wider font-semibold">
                {t("statsAvailability")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Features lang={lang} />

      <AppPreview lang={lang} />

      {/* Call to Action Section */}
      <section
        id="download"
        className="py-24 bg-white dark:bg-slate-900 transition-colors"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-brand/20">
            <div className="absolute top-0 right-0 p-8 text-white/10 text-9xl font-bold italic">
              HEALTH
            </div>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 relative z-10">
              {t("ctaTitle")}
            </h2>
            <p className="text-lg opacity-90 mb-10 max-w-xl mx-auto relative z-10">
              {t("ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button className="bg-white text-brand px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-colors shadow-lg flex items-center justify-center gap-2">
                <img
                  src="/apple-store.svg"
                  alt="App Store"
                  className="w-6 h-6"
                />
                {t("ctaPrimary")}
              </button>
              <button className="bg-brand-dark/50 border border-white/30 text-white px-10 py-4 rounded-2xl font-bold hover:bg-brand-dark transition-colors flex items-center justify-center gap-2">
                <img
                  src="/google-play.svg"
                  alt="Google Play"
                  className="w-6 h-6"
                />
                {t("ctaSecondary")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-slate-950">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        lang={lang}
        setLang={setLang}
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

export default App;
