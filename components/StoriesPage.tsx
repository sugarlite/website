import React from "react";
import { Language } from "../types";
import { useTranslation } from "../hooks/useTranslation";
import { APP_LINKS } from "../constants";

interface StoriesPageProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const StoriesPage: React.FC<StoriesPageProps> = ({ lang, onNavigate }) => {
  const { t, tArray } = useTranslation(lang);

  const stories = tArray("stories.items");
  const stats = tArray("stories.stats");

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
          {t("stories.backToHome")}
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 dark:text-white">
            {t("stories.title")}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            {t("stories.subtitle")}
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat: any, index: number) => (
            <div key={index} className="text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl">
              <div className="text-3xl font-extrabold text-brand mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Stories */}
        <div className="space-y-12">
          {stories.map((story: any, index: number) => (
            <article
              key={index}
              className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {story.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{story.name}</h3>
                  <p className="text-sm text-brand font-medium">{story.condition}</p>
                  <p className="text-sm text-slate-400">{story.location}</p>
                </div>
              </div>

              <div className="space-y-4">
                {story.paragraphs.map((paragraph: string, pIndex: number) => (
                  <p key={pIndex} className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {story.results && (
                <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-l-4 border-emerald-400">
                  <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                    {story.results}
                  </p>
                </div>
              )}

              {story.quote && (
                <blockquote className="mt-6 pl-6 border-l-4 border-brand/30 italic text-slate-500 dark:text-slate-400">
                  "{story.quote}"
                </blockquote>
              )}
            </article>
          ))}
        </div>

        {/* Community CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-brand/5 to-emerald-500/5 rounded-3xl p-12">
          <h3 className="text-2xl font-bold mb-4 dark:text-white">
            {t("stories.communityTitle")}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xl mx-auto">
            {t("stories.communityDescription")}
          </p>
          <a
            href={APP_LINKS.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand text-white px-10 py-4 rounded-full font-bold hover:bg-brand-dark transition-colors"
          >
            {t("stories.communityButton")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
