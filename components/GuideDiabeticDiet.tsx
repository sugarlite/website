import React from "react";
import { Language } from "../types";
import { useTranslation } from "../hooks/useTranslation";
import { useArticleJsonLd } from "../hooks/useArticleJsonLd";
import { APP_LINKS, MEDICAL_REFERENCES } from "../constants";
import References from "./References";

interface GuideDiabeticDietProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const GuideDiabeticDiet: React.FC<GuideDiabeticDietProps> = ({ lang, onNavigate }) => {
  const { t, tArray } = useTranslation(lang);

  const sections = tArray("guide.diabeticDiet.sections");

  // Extract article body text from sections for structured data
  const articleBody = sections
    .map((s: any) => [s.heading, ...(s.paragraphs || [])].join(". "))
    .join(". ")
    .substring(0, 2000);

  // Article structured data for SEO
  useArticleJsonLd({
    type: "Article",
    headline: t("guide.diabeticDiet.title"),
    description: t("guide.diabeticDiet.subtitle"),
    url: `https://sugarlite.top/${lang}/guide/diabetic-diet`,
    image: "https://sugarlite.top/og-image.png",
    articleBody,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <a
          href={`/${lang}`}
          onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
          className="text-brand hover:text-brand-dark transition-colors mb-8 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t("guide.backToHome")}
        </a>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 dark:text-white">
            {t("guide.diabeticDiet.title")}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            {t("guide.diabeticDiet.subtitle")}
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-bold mb-4 dark:text-white">{t("guide.toc")}</h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300">
            {sections.map((section: any, index: number) => (
              <li key={index}>
                <a href={`#section-${index}`} className="hover:text-brand transition-colors">
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Content Sections */}
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
          {sections.map((section: any, index: number) => (
            <section key={index} id={`section-${index}`} className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                {section.heading}
              </h2>
              {section.paragraphs && section.paragraphs.map((paragraph: string, pIndex: number) => {
                // Add inline source link for GI mention in the GI/GL section
                if (index === 1 && pIndex === 0) {
                  const giPatterns = [
                    "升糖指数（Glycemic Index, GI）",
                    "Glycemic Index (GI)",
                    "グリセミック・インデックス（GI）",
                    "升糖指數（Glycemic Index, GI）",
                  ];
                  const giPattern = giPatterns.find(p => paragraph.includes(p));
                  if (giPattern) {
                    const parts = paragraph.split(giPattern);
                    return (
                      <p key={pIndex} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {parts[0]}
                        <a href={MEDICAL_REFERENCES.glycemicIndexDatabase.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-dark underline decoration-brand/30 hover:decoration-brand transition-colors">{giPattern}</a>
                        {parts[1]}
                      </p>
                    );
                  }
                }
                return (
                  <p key={pIndex} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
              {section.bullets && (
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mt-4">
                  {section.bullets.map((item: string, bIndex: number) => (
                    <li key={bIndex}>{item}</li>
                  ))}
                </ul>
              )}
              {section.foodLists && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {section.foodLists.map((list: any, fIndex: number) => (
                    <div key={fIndex} className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-3 dark:text-white">{list.title}</h3>
                      <ul className="space-y-2">
                        {list.items.map((item: string, iIndex: number) => (
                          <li key={iIndex} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <span className={`w-2 h-2 rounded-full ${list.type === 'good' ? 'bg-emerald-500' : 'bg-red-400'}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {section.tip && (
                <div className="mt-6 p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded-r-xl">
                  <p className="text-amber-800 dark:text-amber-200 font-medium">💡 {section.tip}</p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Related Guides */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold mb-4 dark:text-white">{t("guide.relatedGuides")}</h3>
          <div className="flex flex-wrap gap-4">
            <a
              href={`/${lang}/guide/blood-sugar-management`}
              onClick={(e) => { e.preventDefault(); onNavigate("guide-blood-sugar"); }}
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand/10 hover:text-brand transition-colors font-medium"
            >
              {t("guide.bloodSugar.title")} →
            </a>
          </div>
        </div>

        {/* References */}
        <References
          lang={lang}
          references={[
            "glycemicIndexDatabase",
            "nutritionRecommendations",
            "usdaFoodDataCentral",
            "harvardHealthCalories",
            "chinaNutritionTable",
          ]}
        />

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-brand/5 to-emerald-500/5 rounded-3xl p-12">
          <h3 className="text-2xl font-bold mb-4 dark:text-white">
            {t("guide.ctaTitle")}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xl mx-auto">
            {t("guide.ctaDescription")}
          </p>
          <a
            href={APP_LINKS.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand text-white px-10 py-4 rounded-full font-bold hover:bg-brand-dark transition-colors"
          >
            {t("guide.ctaButton")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default GuideDiabeticDiet;
