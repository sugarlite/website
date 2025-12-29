import React from "react";
import { APP_NAME, UI_STRINGS } from "../constants";
import { Language } from "../types";

interface FooterProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = (key: string) => UI_STRINGS[key][lang];

  return (
    <footer className="bg-white dark:bg-slate-900 pt-20 pb-10 border-t dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark">
                {APP_NAME[lang]}
              </span>
            </div>
            <p className="text-slate-500 text-sm">{t("footerTagline")}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 dark:text-white">
              {t("footerAbout")}
            </h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  {lang === "zh" ? "核心团队" : "Team"}
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("privacy");
                  }}
                  className="hover:text-brand transition-colors"
                >
                  {lang === "zh" ? "隐私政策" : "Privacy"}
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("terms");
                  }}
                  className="hover:text-brand transition-colors"
                >
                  {lang === "zh" ? "服务条款" : "Terms"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 dark:text-white">
              {t("footerProduct")}
            </h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  iOS 版本
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  Android 版本
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  {lang === "zh" ? "企业合作" : "B2B"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 dark:text-white">
              {t("footerContact")}
            </h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>
                <a
                  href="mailto:support@sugarlite.com"
                  className="hover:text-brand transition-colors"
                >
                  support@sugarlite.com
                </a>
              </li>
              <li>
                {lang === "zh"
                  ? `关注公众号：${APP_NAME.zh}`
                  : `Follow us: ${APP_NAME.en}`}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t dark:border-slate-800 text-center text-slate-400 text-xs">
          {t("footerRights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
