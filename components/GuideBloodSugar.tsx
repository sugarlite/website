import React from "react";
import { Language } from "../types";
import { useTranslation } from "../hooks/useTranslation";
import { useArticleJsonLd } from "../hooks/useArticleJsonLd";
import { APP_LINKS, MEDICAL_REFERENCES } from "../constants";
import References from "./References";

interface GuideBloodSugarProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const GuideBloodSugar: React.FC<GuideBloodSugarProps> = ({ lang, onNavigate }) => {
  const { t, tArray } = useTranslation(lang);

  const sections = tArray("guide.bloodSugar.sections");

  // Extract article body text from sections for structured data
  const articleBody = sections
    .map((s: any) => [s.heading, ...(s.paragraphs || [])].join(". "))
    .join(". ")
    .substring(0, 2000);

  // Article structured data for SEO
  useArticleJsonLd({
    type: "Article",
    headline: t("guide.bloodSugar.title"),
    description: t("guide.bloodSugar.subtitle"),
    url: `https://sugarlite.top/${lang}/guide/blood-sugar-management`,
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
            {t("guide.bloodSugar.title")}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            {t("guide.bloodSugar.subtitle")}
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
                // Add inline source link for IDF mention in blood sugar ranges section
                if (index === 1 && pIndex === 0) {
                  const idfPatterns = [
                    { search: "国际糖尿病联盟（IDF）和美国糖尿病协会（ADA）", linkText: "国际糖尿病联盟（IDF）" },
                    { search: "International Diabetes Federation (IDF) and the American Diabetes Association (ADA)", linkText: "International Diabetes Federation (IDF)" },
                    { search: "国際糖尿病連合（IDF）と米国糖尿病協会（ADA）", linkText: "国際糖尿病連合（IDF）" },
                    { search: "國際糖尿病聯盟（IDF）和美國糖尿病協會（ADA）", linkText: "國際糖尿病聯盟（IDF）" },
                  ];
                  const pattern = idfPatterns.find(p => paragraph.includes(p.search));
                  if (pattern) {
                    const parts = paragraph.split(pattern.search);
                    return (
                      <p key={pIndex} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {parts[0]}
                        <a href={MEDICAL_REFERENCES.bloodSugarRanges.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-dark underline decoration-brand/30 hover:decoration-brand transition-colors">{pattern.linkText}</a>
                        {pattern.search.slice(pattern.linkText.length)}
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
              {section.table && (
                <div className="overflow-x-auto mt-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                        {section.table.headers.map((header: string, hIndex: number) => (
                          <th key={hIndex} className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row: string[], rIndex: number) => (
                        <tr key={rIndex} className="border-b border-slate-100 dark:border-slate-800">
                          {row.map((cell: string, cIndex: number) => (
                            <td key={cIndex} className="py-3 px-4 text-slate-600 dark:text-slate-300">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              href={`/${lang}/guide/diabetic-diet`}
              onClick={(e) => { e.preventDefault(); onNavigate("guide-diabetic-diet"); }}
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand/10 hover:text-brand transition-colors font-medium"
            >
              {t("guide.diabeticDiet.title")} →
            </a>
          </div>
        </div>

        {/* References */}
        <References
          lang={lang}
          references={[
            "bloodSugarRanges",
            "bloodSugarMonitoring",
            "idfDiabetesTypes",
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

export default GuideBloodSugar;
