
import React from "react";
import { APP_NAME, APP_LINKS } from "../constants";
import { Language } from "../types";
import { useTranslation } from "../hooks/useTranslation";

interface FooterProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const { t } = useTranslation(lang);

  return (
    <footer className="bg-[#f5f5f7] dark:bg-[#0d0d0f] pt-20 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/icon.png"
                  alt="SugarLite Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark">
                {APP_NAME[lang]}
              </span>
            </div>
            <p className="text-slate-500 text-sm">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 dark:text-white">
              {t("footer.about")}
            </h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("privacy");
                  }}
                  className="hover:text-brand transition-colors"
                >
                  {t("nav.privacy")}
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("faq");
                  }}
                  className="hover:text-brand transition-colors"
                >
                  {t("nav.faq")}
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
                  {t("nav.terms")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 dark:text-white">
              {t("footer.product")}
            </h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>
                <a
                  href={APP_LINKS.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors"
                >
                  {t("footer.iosVersion")}
                </a>
              </li>
              <li>
                <span className="text-slate-400">
                  {t("footer.androidVersion")}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 dark:text-white">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>
                <a
                  href="mailto:support@sugarlite.top"
                  className="hover:text-brand transition-colors"
                >
                  support@sugarlite.top
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8">
          <div className="flex justify-center mb-6">
            <div className="bg-slate-100 rounded-xl px-4 py-2">
              <img
                src="/apple-health-badge.svg"
                alt="Works with Apple Health"
                className="h-8 w-auto"
              />
            </div>
          </div>
          <div className="text-center text-slate-400 text-xs">{t("footer.rights")}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
