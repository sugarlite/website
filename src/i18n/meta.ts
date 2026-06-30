import type { Language } from '@/types';

export type PageKey =
  | 'home'
  | 'privacy'
  | 'terms'
  | 'faq'
  | 'guideBloodSugar'
  | 'guideDiabeticDiet'
  | 'stories';

interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  ogType?: 'website' | 'article';
}

export const APP_NAME: Record<Language, string> = {
  zh: '轻糖',
  en: 'SugarLite',
  ja: '軽糖',
  'zh-Hant': '輕糖',
};

export const SITE_NAME: Record<Language, string> = {
  zh: '轻糖',
  en: 'SugarLite',
  ja: 'SugarLite',
  'zh-Hant': '輕糖',
};

export const DEFAULT_OG_IMAGE = 'https://sugarlite.top/og-image.png';

const BASE_KEYWORDS = {
  zh: '血糖监测,血糖记录,血糖管理,糖尿病,控糖,血糖追踪,健康管理,PGRS,饮食记录,运动记录,SugarLite,轻糖',
  en: 'blood glucose tracker,diabetes management,glucose monitoring,CGM app,SugarLite,blood sugar log,health app',
  ja: '血糖管理,血糖記録,糖尿病,糖質コントロール,血糖モニタリング,ヘルスケアアプリ,SugarLite',
  'zh-Hant': '血糖監測,血糖記錄,血糖管理,糖尿病,控糖,血糖追蹤,健康管理,PGRS,飲食記錄,運動記錄,SugarLite,輕糖',
};

export const PAGE_META: Record<PageKey, Record<Language, PageMeta>> = {
  home: {
    zh: {
      title: 'SugarLite 轻糖 - 掌控您的血糖健康 | 智能血糖监测与饮食管理',
      description:
        'SugarLite（轻糖）是一款专业的血糖监测、趋势分析与健康管理应用，通过科学的数据看板助您掌控健康生活。',
      keywords: BASE_KEYWORDS.zh,
      ogType: 'website',
    },
    en: {
      title: 'SugarLite - Manage Your Blood Sugar Health | Smart Glucose Monitoring & Diet Management',
      description:
        'SugarLite is a professional blood sugar monitoring, trend analysis and health management application.',
      keywords: BASE_KEYWORDS.en,
      ogType: 'website',
    },
    ja: {
      title: 'SugarLite - 血糖健康管理 | スマートな血糖モニタリングと食事管理',
      description:
        'SugarLiteは、専門的な血糖モニタリング、トレンド分析、健康管理アプリです。科学的なデータダッシュボードで健康的な生活をサポートします。',
      keywords: BASE_KEYWORDS.ja,
      ogType: 'website',
    },
    'zh-Hant': {
      title: 'SugarLite 輕糖 - 掌控您的血糖健康 | 智能血糖監測與飲食管理',
      description:
        'SugarLite（輕糖）是一款專業的血糖監測、趨勢分析與健康管理應用，透過科學的資料看板助您掌控健康生活。',
      keywords: BASE_KEYWORDS['zh-Hant'],
      ogType: 'website',
    },
  },
  privacy: {
    zh: {
      title: '隐私政策 - SugarLite 轻糖',
      description: '了解 SugarLite 轻糖的隐私政策和数据保护措施。',
      ogType: 'article',
    },
    en: {
      title: 'Privacy Policy - SugarLite',
      description: "Learn about SugarLite's privacy policy and data protection measures.",
      ogType: 'article',
    },
    ja: {
      title: 'プライバシーポリシー - SugarLite',
      description: 'SugarLiteのプライバシーポリシーとデータ保護対策についてご確認ください。',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '隱私政策 - SugarLite 輕糖',
      description: '了解 SugarLite 輕糖的隱私政策和資料保護措施。',
      ogType: 'article',
    },
  },
  terms: {
    zh: {
      title: '服务条款 - SugarLite 轻糖',
      description: '查看 SugarLite 轻糖的服务条款和使用协议。',
      ogType: 'article',
    },
    en: {
      title: 'Terms of Service - SugarLite',
      description: "View SugarLite's terms of service and usage agreement.",
      ogType: 'article',
    },
    ja: {
      title: '利用規約 - SugarLite',
      description: 'SugarLiteの利用規約と使用契約をご確認ください。',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '服務條款 - SugarLite 輕糖',
      description: '查看 SugarLite 輕糖的服務條款和使用協議。',
      ogType: 'article',
    },
  },
  faq: {
    zh: {
      title: '常见问题 - SugarLite 轻糖',
      description:
        'SugarLite 轻糖常见问题解答，了解血糖管理、应用使用、数据同步等问题的详细答案。',
      ogType: 'website',
    },
    en: {
      title: 'FAQ - SugarLite',
      description:
        'SugarLite FAQ - answers about glucose management, app usage, data sync, and more.',
      ogType: 'website',
    },
    ja: {
      title: 'よくある質問 - SugarLite',
      description:
        'SugarLiteのよくある質問への回答。血糖管理、アプリの使用方法、データ同期などについて詳しく解説します。',
      ogType: 'website',
    },
    'zh-Hant': {
      title: '常見問題 - SugarLite 輕糖',
      description:
        'SugarLite 輕糖常見問題解答，了解血糖管理、應用使用、資料同步等問題的詳細答案。',
      ogType: 'website',
    },
  },
  guideBloodSugar: {
    zh: {
      title: '血糖管理完全指南 - SugarLite 轻糖',
      description:
        '全面的血糖管理指南，涵盖正常血糖范围、监测方法、影响因素和个性化管理方案。',
      ogType: 'article',
    },
    en: {
      title: 'Blood Sugar Management Guide - SugarLite',
      description:
        'Comprehensive blood sugar management guide covering normal ranges, monitoring methods, influencing factors, and personalized management plans.',
      ogType: 'article',
    },
    ja: {
      title: '血糖管理完全ガイド - SugarLite',
      description:
        '包括的な血糖管理ガイド。正常な血糖範囲、測定方法、影響要因、パーソナライズされた管理計画を解説。',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '血糖管理完全指南 - SugarLite 輕糖',
      description:
        '全面的血糖管理指南，涵蓋正常血糖範圍、監測方法、影響因素和個人化管理方案。',
      ogType: 'article',
    },
  },
  guideDiabeticDiet: {
    zh: {
      title: '糖尿病饮食管理指南 - SugarLite 轻糖',
      description:
        '糖尿病饮食管理指南，了解升糖指数、推荐食物、餐盘法和餐前餐后血糖配对分析。',
      ogType: 'article',
    },
    en: {
      title: 'Diabetic Diet Guide - SugarLite',
      description:
        'Diabetic diet management guide covering glycemic index, recommended foods, plate method, and pre/post-meal glucose pairing analysis.',
      ogType: 'article',
    },
    ja: {
      title: '糖尿病食事管理ガイド - SugarLite',
      description:
        '糖尿病食事管理ガイド。血糖生成指数、推奨食品、プレート法、食前食後血糖ペアリング分析を解説。',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '糖尿病飲食管理指南 - SugarLite 輕糖',
      description:
        '糖尿病飲食管理指南，了解升糖指數、推薦食物、餐盤法和餐前餐後血糖配對分析。',
      ogType: 'article',
    },
  },
  stories: {
    zh: {
      title: '用户故事 - SugarLite 轻糖',
      description:
        'SugarLite 用户真实故事，了解糖尿病患者、妊娠糖尿病和糖尿病前期用户如何使用轻糖改善血糖管理。',
      ogType: 'article',
    },
    en: {
      title: 'User Stories - SugarLite',
      description:
        'Real SugarLite user stories. Learn how people with diabetes, gestational diabetes, and prediabetes use SugarLite to improve their glucose management.',
      ogType: 'article',
    },
    ja: {
      title: 'ユーザーの声 - SugarLite',
      description:
        'SugarLiteユーザーの実体験。糖尿病患者、妊娠糖尿病、糖尿病前期のユーザーがSugarLiteを使って血糖管理を改善した方法を紹介。',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '用戶故事 - SugarLite 輕糖',
      description:
        'SugarLite 用戶真實故事，了解糖尿病患者、妊娠糖尿病和糖尿病前期用戶如何使用輕糖改善血糖管理。',
      ogType: 'article',
    },
  },
};

export function getPageMeta(page: PageKey, lang: Language): PageMeta {
  return PAGE_META[page][lang];
}
