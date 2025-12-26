
import React from 'react';
import { UI_STRINGS } from '../constants';
import { Language } from '../types';

interface AppPreviewProps {
  lang: Language;
}

const AppPreview: React.FC<AppPreviewProps> = ({ lang }) => {
  const t = (key: string) => UI_STRINGS[key][lang];

  return (
    <section id="preview" className="py-24 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-12">
             <div className="space-y-4">
               <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight">
                 {t('previewTitle')}
               </h2>
               <p className="text-lg text-slate-600 dark:text-slate-400">
                 {t('previewSubtitle')}
               </p>
             </div>
             
             <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand font-bold">1</span>
                 </div>
                 <div>
                    <h4 className="font-bold text-xl dark:text-white">{t('previewPoint1Title')}</h4>
                    <p className="text-slate-500">{t('previewPoint1Desc')}</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand font-bold">2</span>
                 </div>
                 <div>
                    <h4 className="font-bold text-xl dark:text-white">{t('previewPoint2Title')}</h4>
                    <p className="text-slate-500">{t('previewPoint2Desc')}</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand font-bold">3</span>
                 </div>
                 <div>
                    <h4 className="font-bold text-xl dark:text-white">{t('previewPoint3Title')}</h4>
                    <p className="text-slate-500">{t('previewPoint3Desc')}</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/600/1200?random=11" className="rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 mt-12 transform -translate-y-4" alt="App Preview 1" />
              <img src="https://picsum.photos/600/1200?random=12" className="rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 transform translate-y-4" alt="App Preview 2" />
            </div>
            {/* Background Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand/5 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
