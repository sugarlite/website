import React from "react";
import { Language } from "../types";
import { useTranslation } from "../hooks/useTranslation";
import { MEDICAL_REFERENCES, MedicalReference } from "../constants";

interface ReferencesProps {
  lang: Language;
  /** List of reference keys to display */
  references: string[];
}

const References: React.FC<ReferencesProps> = ({ lang, references }) => {
  const { t } = useTranslation(lang);

  const validRefs = references
    .map((key) => MEDICAL_REFERENCES[key])
    .filter(Boolean);

  if (validRefs.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {t("references.title")}
      </h3>
      <ol className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
        {validRefs.map((ref: MedicalReference, index: number) => (
          <li key={ref.key} className="flex items-start gap-2">
            <span className="text-slate-400 dark:text-slate-500 shrink-0">{index + 1}.</span>
            <span>
              {t(`references.items.${ref.key}`)}{" "}
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:text-brand-dark underline decoration-brand/30 hover:decoration-brand transition-colors break-all"
              >
                {new URL(ref.url).hostname}
                <svg className="w-3 h-3 inline-block ml-0.5 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default References;
