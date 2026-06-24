
import React from "react";
import { Language } from "../types";
import { useTranslation } from "../hooks/useTranslation";

interface FAQPageProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const FAQPage: React.FC<FAQPageProps> = ({ lang, onNavigate }) => {
  const { t, tArray } = useTranslation(lang);

  const faqs = tArray("faq.items");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate("home")}
          className="text-brand hover:text-brand-dark transition-colors mb-8 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t("faq.backToHome")}
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 dark:text-white">
            {t("faq.title")}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq: any, index: number) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white flex items-start gap-3">
                <span className="text-brand text-lg">Q{index + 1}</span>
                {faq.q}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            {t("faq.stillHaveQuestions")}
          </p>
          <a
            href="mailto:support@sugarlite.top"
            className="inline-block bg-brand text-white px-8 py-3 rounded-full font-bold hover:bg-brand-dark transition-colors"
          >
            {t("faq.contactUs")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
