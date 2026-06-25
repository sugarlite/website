
import React from "react";
import { Language } from "../types";
import { useTranslation } from "../hooks/useTranslation";

interface PrivacyPolicyProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ lang, onNavigate }) => {
  const { t, tArray } = useTranslation(lang);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <a
          href={`/${lang}`}
          onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
          className="text-brand hover:text-brand-dark transition-colors mb-8 flex items-center gap-2"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("privacy.backToHome")}
        </a>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 dark:text-white">
            {t("privacy.title")}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t("privacy.lastUpdated")}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          {tArray("privacy.sections").map((section: any, index: number) => (
            <section key={index}>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                {section.title}
              </h2>
              {section.content && (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {section.content}
                </p>
              )}
              {section.intro && (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {section.intro}
                </p>
              )}
              {section.items && (
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mt-4">
                  {section.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {section.emailLabel && (
                <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <p className="text-slate-700 dark:text-slate-300">
                    {section.emailLabel}: support@sugarlite.top
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
