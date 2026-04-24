
import React from "react";
import { Language } from "../types";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface AppPreviewProps {
  lang: Language;
}

const AppPreview: React.FC<AppPreviewProps> = ({ lang }) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

  return (
    <section id="preview" className="py-32 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-20 space-y-4 ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="reveal stagger-1 text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            {lang === "zh" ? "轻松记录，科学控糖" : "Easy Logging, Smarter Control"}
          </h2>
          <p className="reveal stagger-2 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {lang === "zh"
              ? "从血糖追踪到饮食分析，一切尽在掌握"
              : "From glucose tracking to diet analysis, everything at your fingertips"}
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 ${gridVisible ? 'visible' : ''}`}
        >
          {[1, 2, 3, 4, 5].map((n, idx) => (
            <div
              key={n}
              className={`reveal-scale stagger-${Math.min(idx + 1, 6)}`}
            >
              <div className="rounded-[2rem] overflow-hidden shadow-xl shadow-slate-900/10">
                <img
                  src={`/preview/Screenshot ${String(n).padStart(2, "0")}.png`}
                  alt={`SugarLite Preview ${n}`}
                  className="w-full h-auto block"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
