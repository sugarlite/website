import type { Language } from '@/types';

export type PageKey =
  | 'home'
  | 'privacy'
  | 'terms'
  | 'faq'
  | 'guideBloodSugar'
  | 'guideDiabeticDiet'
  | 'stories'
  | 'blog'
  | 'blogWhatIsBloodSugar'
  | 'blogHowToLowerBloodSugarNaturally'
  | 'blogBestBloodSugarTrackerApp'
  | 'blogCgmVsFingerstick'
  | 'blogWhatIsHba1c'
  | 'blogBloodSugarAfterMeals'
  | 'blogNormalBloodSugarChart'
  | 'blogType2DiabetesDiet'
  | 'blogHighBloodSugarSymptoms'
  | 'blogInsulinTrackingGuide';

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
  ja: '軽糖',
  'zh-Hant': '輕糖',
};

export const DEFAULT_OG_IMAGE = 'https://sugarlite.top/og-image.webp';

const BASE_KEYWORDS = {
  zh: '血糖监测,血糖记录,血糖管理,糖尿病,控糖,血糖追踪,健康管理,血糖指数,饮食记录,运动记录,SugarLite,轻糖',
  en: 'blood glucose tracker,diabetes management,glucose monitoring,CGM app,SugarLite,blood sugar log,health app',
  ja: '血糖管理,血糖記録,糖尿病,糖質コントロール,血糖モニタリング,ヘルスケアアプリ,SugarLite',
  'zh-Hant': '血糖監測,血糖記錄,血糖管理,糖尿病,控糖,血糖追蹤,健康管理,血糖指數,飲食記錄,運動記錄,SugarLite,輕糖',
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
  blog: {
    zh: {
      title: 'SugarLite 轻糖博客 - 血糖管理与健康生活指南',
      description:
        '探索轻糖博客，获取血糖管理、糖尿病饮食、血糖监测技术与健康生活方式的专业指南。',
      keywords: '血糖管理,糖尿病饮食,血糖监测,控糖,低血糖,高血糖,HbA1c,血糖仪,SugarLite,轻糖博客',
      ogType: 'website',
    },
    en: {
      title: 'SugarLite Blog - Blood Sugar Management & Health Guides',
      description:
        'Explore the SugarLite blog for expert guides on blood sugar management, diabetic diet, glucose monitoring technology, and healthy living.',
      keywords: 'blood sugar management,diabetic diet,glucose monitoring,CGM,blood sugar tracker,HbA1c,hyperglycemia,hypoglycemia,SugarLite blog',
      ogType: 'website',
    },
    ja: {
      title: 'SugarLite ブログ - 血糖管理と健康生活ガイド',
      description:
        'SugarLiteブログでは、血糖管理、糖尿病食事、血糖モニタリング技術、健康ライフスタイルに関する専門ガイドを提供します。',
      keywords: '血糖管理,糖尿病食事,血糖モニタリング,CGM,血糖測定,HbA1c,高血糖,低血糖,SugarLiteブログ',
      ogType: 'website',
    },
    'zh-Hant': {
      title: 'SugarLite 輕糖部落格 - 血糖管理與健康生活指南',
      description:
        '探索輕糖部落格，獲取血糖管理、糖尿病飲食、血糖監測技術與健康生活方式的專業指南。',
      keywords: '血糖管理,糖尿病飲食,血糖監測,控糖,低血糖,高血糖,HbA1c,血糖儀,SugarLite,輕糖部落格',
      ogType: 'website',
    },
  },
  blogWhatIsBloodSugar: {
    zh: {
      title: '血糖是什么？一文读懂血糖来源、作用与正常范围 - SugarLite 轻糖',
      description:
        '血糖是什么？了解血糖的来源、生理功能、正常范围，以及血糖波动如何影响健康。SugarLite 轻糖为您解读血糖基础知识。',
      keywords: '血糖是什么,血糖来源,血糖作用,正常血糖范围,血糖波动,葡萄糖,胰岛素,SugarLite',
      ogType: 'article',
    },
    en: {
      title: 'What Is Blood Sugar? Sources, Functions & Normal Ranges - SugarLite',
      description:
        'Learn what blood sugar is, where it comes from, its role in the body, and what normal glucose ranges look like. A complete guide by SugarLite.',
      keywords: 'what is blood sugar,blood glucose,glucose sources,normal blood sugar range,blood sugar function,insulin,glucose metabolism,SugarLite',
      ogType: 'article',
    },
    ja: {
      title: '血糖とは？基礎知識と正常値を解説 - SugarLite',
      description:
        '血糖とは何か、血糖の来源と働き、正常範囲について解説します。SugarLiteが血糖の基礎知識をわかりやすく説明します。',
      keywords: '血糖とは,血糖の働き,正常血糖値,血糖変動,グルコース,インスリン,SugarLite',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '血糖是什麼？一文讀懂血糖來源、作用與正常範圍 - SugarLite 輕糖',
      description:
        '血糖是什麼？了解血糖的來源、生理功能、正常範圍，以及血糖波動如何影響健康。SugarLite 輕糖為您解讀血糖基礎知識。',
      keywords: '血糖是什麼,血糖來源,血糖作用,正常血糖範圍,血糖波動,葡萄糖,胰島素,SugarLite',
      ogType: 'article',
    },
  },
  blogHowToLowerBloodSugarNaturally: {
    zh: {
      title: '如何自然降低血糖？10 个科学有效的方法 - SugarLite 轻糖',
      description:
        '想自然降低血糖？本文介绍饮食、运动、睡眠、压力管理等 10 个科学有效的方法，帮助您稳定血糖、改善健康。',
      keywords: '降低血糖,自然降糖,控糖方法,降血糖食物,运动降血糖,血糖稳定,糖尿病前期,SugarLite',
      ogType: 'article',
    },
    en: {
      title: 'How to Lower Blood Sugar Naturally: 10 Science-Backed Methods - SugarLite',
      description:
        'Discover 10 natural ways to lower blood sugar through diet, exercise, sleep, stress management, and simple lifestyle changes backed by science.',
      keywords: 'lower blood sugar naturally,reduce blood sugar,blood sugar control,foods that lower blood sugar,exercise blood sugar,prediabetes,SugarLite',
      ogType: 'article',
    },
    ja: {
      title: '自然に血糖を下げる方法 - SugarLite',
      description:
        '食事、運動、睡眠、ストレス管理など、科学的に効果的な血糖を下げる方法を解説します。',
      keywords: '血糖を下げる,自然に血糖コントロール,食事,運動,糖尿病予防,SugarLite',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '如何自然降低血糖？10 個科學有效的方法 - SugarLite 輕糖',
      description:
        '想自然降低血糖？本文介紹飲食、運動、睡眠、壓力管理等 10 個科學有效的方法，幫助您穩定血糖、改善健康。',
      keywords: '降低血糖,自然降糖,控糖方法,降血糖食物,運動降血糖,血糖穩定,糖尿病前期,SugarLite',
      ogType: 'article',
    },
  },
  blogBestBloodSugarTrackerApp: {
    zh: {
      title: '最佳血糖记录 App 推荐：SugarLite 轻糖如何帮您管理血糖 - SugarLite',
      description:
        '选择一款好用的血糖记录 App 至关重要。本文介绍优秀血糖 App 的核心功能，以及 SugarLite 轻糖如何通过 血糖指数分析、饮食记录帮您控糖。',
      keywords: '血糖记录App,血糖管理App,血糖追踪软件,糖尿病App,SugarLite,血糖仪同步,血糖指数分析',
      ogType: 'article',
    },
    en: {
      title: 'Best Blood Sugar Tracker App: How SugarLite Helps Manage Glucose - SugarLite',
      description:
        'Find out what makes a great blood sugar tracker app and how SugarLite uses glucose index pairing analysis, food logging, and trends to support your glucose management.',
      keywords: 'best blood sugar tracker app,glucose tracker,diabetes app,blood sugar log app,CGM app,SugarLite,glucose index',
      ogType: 'article',
    },
    ja: {
      title: 'おすすめ血糖管理アプリ - SugarLite',
      description:
        '優れた血糖管理アプリの選び方と、SugarLiteの血糖指数分析や食事記録機能を紹介します。',
      keywords: '血糖管理アプリ,血糖記録アプリ,糖尿病アプリ,SugarLite,血糖指数分析',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '最佳血糖記錄 App 推薦：SugarLite 輕糖如何幫您管理血糖 - SugarLite',
      description:
        '選擇一款好用的血糖記錄 App 至關重要。本文介紹優秀血糖 App 的核心功能，以及 SugarLite 輕糖如何透過 血糖指数分析、飲食記錄幫您控糖。',
      keywords: '血糖記錄App,血糖管理App,血糖追蹤軟體,糖尿病App,SugarLite,血糖儀同步,血糖指数分析',
      ogType: 'article',
    },
  },
  blogCgmVsFingerstick: {
    zh: {
      title: 'CGM 与指尖采血：哪种血糖监测方式更适合您？ - SugarLite 轻糖',
      description:
        '连续血糖监测（CGM）和传统指尖采血各有什么优缺点？本文对比两者准确性、成本、适用人群，帮您选择最合适的监测方案。',
      keywords: 'CGM,连续血糖监测,指尖采血,血糖监测,血糖仪,动态血糖仪,血糖检测方法,SugarLite',
      ogType: 'article',
    },
    en: {
      title: 'CGM vs Fingerstick: Which Glucose Monitoring Method Is Right for You? - SugarLite',
      description:
        'Compare continuous glucose monitors (CGM) and traditional fingerstick meters in accuracy, cost, convenience, and who each method suits best.',
      keywords: 'CGM vs fingerstick,continuous glucose monitor,blood glucose monitoring,glucose meter,CGM accuracy,finger prick,SugarLite',
      ogType: 'article',
    },
    ja: {
      title: 'CGMと穿刺式血糖測定の比較 - SugarLite',
      description:
        '連続血糖測定器（CGM）と従来の穿刺式血糖測定の違い、メリット・デメリットを比較します。',
      keywords: 'CGM,連続血糖測定,穿刺,血糖測定,血糖値,SugarLite',
      ogType: 'article',
    },
    'zh-Hant': {
      title: 'CGM 與指尖採血：哪種血糖監測方式更適合您？ - SugarLite 輕糖',
      description:
        '連續血糖監測（CGM）和傳統指尖採血各有什麼優缺點？本文對比兩者準確性、成本、適用人群，幫您選擇最合適的監測方案。',
      keywords: 'CGM,連續血糖監測,指尖採血,血糖監測,血糖儀,動態血糖儀,血糖檢測方法,SugarLite',
      ogType: 'article',
    },
  },
  blogWhatIsHba1c: {
    zh: {
      title: 'HbA1c 是什么？糖化血红蛋白检测与目标值解读 - SugarLite 轻糖',
      description:
        'HbA1c 反映过去 2-3 个月平均血糖水平。本文介绍 HbA1c 的定义、检测意义、目标值，以及如何通过生活方式改善 HbA1c。',
      keywords: 'HbA1c,糖化血红蛋白,糖化血红蛋白正常值,HbA1c目标值,血糖控制,糖尿病检测,SugarLite',
      ogType: 'article',
    },
    en: {
      title: 'What Is HbA1c? Understanding the A1C Test and Target Levels - SugarLite',
      description:
        'HbA1c reflects average blood sugar over 2-3 months. Learn what the A1C test measures, target ranges, and how lifestyle changes can improve your results.',
      keywords: 'what is HbA1c,A1C test,glycated hemoglobin,A1C target range,blood sugar control,diabetes test,SugarLite',
      ogType: 'article',
    },
    ja: {
      title: 'HbA1cとは？ - SugarLite',
      description:
        'HbA1c（糖化ヘモグロビン）の意味、検査の意義、目標値、生活習慣による改善方法を解説します。',
      keywords: 'HbA1c,糖化ヘモグロビン,A1c目標値,血糖コントロール,糖尿病検査,SugarLite',
      ogType: 'article',
    },
    'zh-Hant': {
      title: 'HbA1c 是什麼？糖化血紅蛋白檢測與目標值解讀 - SugarLite 輕糖',
      description:
        'HbA1c 反映過去 2-3 個月平均血糖水平。本文介紹 HbA1c 的定義、檢測意義、目標值，以及如何透過生活方式改善 HbA1c。',
      keywords: 'HbA1c,糖化血紅蛋白,糖化血紅蛋白正常值,HbA1c目標值,血糖控制,糖尿病檢測,SugarLite',
      ogType: 'article',
    },
  },
  blogBloodSugarAfterMeals: {
    zh: {
      title: '餐后血糖：为什么重要？正常值与管理方法 - SugarLite 轻糖',
      description:
        '餐后血糖是评估血糖控制的重要指标。本文解读餐后血糖正常值、影响因素、测量时机，以及如何通过饮食和运动管理餐后血糖。',
      keywords: '餐后血糖,餐后血糖正常值,血糖峰值,控糖饮食,餐后血糖监测,糖尿病饮食,SugarLite',
      ogType: 'article',
    },
    en: {
      title: 'Blood Sugar After Meals: Why It Matters and How to Manage It - SugarLite',
      description:
        'Postprandial glucose reveals how your body handles food. Learn normal after-meal blood sugar ranges, measurement timing, and strategies to manage spikes.',
      keywords: 'blood sugar after meals,postprandial glucose,after meal blood sugar range,glucose spikes,blood sugar management,SugarLite',
      ogType: 'article',
    },
    ja: {
      title: '食後血糖とは？ - SugarLite',
      description:
        '食後血糖の重要性、正常値、影響要因、測定タイミング、食事と運動による管理方法を解説します。',
      keywords: '食後血糖,食後血糖正常値,血糖スパイク,糖尿病食事,血糖管理,SugarLite',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '餐後血糖：為什麼重要？正常值與管理方法 - SugarLite 輕糖',
      description:
        '餐後血糖是評估血糖控制的重要指標。本文解讀餐後血糖正常值、影響因素、測量時機，以及如何透過飲食和運動管理餐後血糖。',
      keywords: '餐後血糖,餐後血糖正常值,血糖峰值,控糖飲食,餐後血糖監測,糖尿病飲食,SugarLite',
      ogType: 'article',
    },
  },
  blogNormalBloodSugarChart: {
    zh: {
      title: '正常血糖对照表：空腹、餐后、随机血糖标准一览 - SugarLite 轻糖',
      description:
        '了解空腹血糖、餐后血糖、随机血糖和 HbA1c 的正常范围与糖尿病诊断标准。下载 SugarLite 轻糖，轻松记录并追踪您的血糖变化。',
      keywords: '正常血糖对照表,空腹血糖正常值,餐后血糖标准,随机血糖,HbA1c标准,糖尿病诊断,SugarLite',
      ogType: 'article',
    },
    en: {
      title: 'Normal Blood Sugar Chart: Fasting, After Meals & Random Glucose - SugarLite',
      description:
        'View normal blood sugar ranges for fasting, post-meal, random glucose, and HbA1c. Understand diabetes thresholds and track your levels with SugarLite.',
      keywords: 'normal blood sugar chart,fasting blood sugar,post meal blood sugar,random blood sugar,HbA1c range,diabetes diagnosis,SugarLite',
      ogType: 'article',
    },
    ja: {
      title: '正常血糖値一覧表 - SugarLite',
      description:
        '空腹時血糖、食後血糖、随時血糖、HbA1cの正常範囲と糖尿病診断基準を解説します。',
      keywords: '正常血糖値,空腹時血糖,食後血糖,HbA1c,糖尿病診断,SugarLite',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '正常血糖對照表：空腹、餐後、隨機血糖標準一覽 - SugarLite 輕糖',
      description:
        '了解空腹血糖、餐後血糖、隨機血糖和 HbA1c 的正常範圍與糖尿病診斷標準。下載 SugarLite 輕糖，輕鬆記錄並追蹤您的血糖變化。',
      keywords: '正常血糖對照表,空腹血糖正常值,餐後血糖標準,隨機血糖,HbA1c標準,糖尿病診斷,SugarLite',
      ogType: 'article',
    },
  },
  blogType2DiabetesDiet: {
    zh: {
      title: '2 型糖尿病饮食指南：吃什么、怎么吃、吃多少 - SugarLite 轻糖',
      description:
        '2 型糖尿病患者如何通过饮食控制血糖？本文介绍低 GI 食物、碳水化合物计算、餐盘法和实用的控糖饮食技巧。',
      keywords: '2型糖尿病饮食,糖尿病饮食指南,低GI食物,碳水化合物计算,控糖饮食,糖尿病食谱,SugarLite',
      ogType: 'article',
    },
    en: {
      title: 'Type 2 Diabetes Diet: What to Eat, Portion Tips & Blood Sugar Control - SugarLite',
      description:
        'A practical guide to eating with type 2 diabetes. Learn about low-GI foods, carb counting, the plate method, and meal planning for better glucose control.',
      keywords: 'type 2 diabetes diet,diabetic diet,low GI foods,carb counting,plate method,blood sugar diet,SugarLite',
      ogType: 'article',
    },
    ja: {
      title: '2型糖尿病の食事療法 - SugarLite',
      description:
        '2型糖尿病の食事管理、低GI食品、炭水化物計算、プレート法など、血糖コントロールのための実践的な食事ガイドです。',
      keywords: '2型糖尿病,食事療法,低GI食品,炭水化物,血糖コントロール,SugarLite',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '2 型糖尿病飲食指南：吃什麼、怎麼吃、吃多少 - SugarLite 輕糖',
      description:
        '2 型糖尿病患者如何透過飲食控制血糖？本文介紹低 GI 食物、碳水化合物計算、餐盤法和實用的控糖飲食技巧。',
      keywords: '2型糖尿病飲食,糖尿病飲食指南,低GI食物,碳水化合物計算,控糖飲食,糖尿病食譜,SugarLite',
      ogType: 'article',
    },
  },
  blogHighBloodSugarSymptoms: {
    zh: {
      title: '高血糖症状：身体发出的 10 个警示信号 - SugarLite 轻糖',
      description:
        '高血糖初期往往没有明显症状。本文介绍 10 个常见高血糖信号、长期危害，以及发现血糖升高后应立即采取的措施。',
      keywords: '高血糖症状,血糖高有什么症状,高血糖危害,糖尿病症状,血糖控制,SugarLite',
      ogType: 'article',
    },
    en: {
      title: 'High Blood Sugar Symptoms: 10 Warning Signs Your Body Sends - SugarLite',
      description:
        'High blood sugar can be silent at first. Learn 10 common hyperglycemia symptoms, long-term risks, and what to do when your glucose readings are too high.',
      keywords: 'high blood sugar symptoms,hyperglycemia symptoms,signs of high blood sugar,diabetes symptoms,blood sugar too high,SugarLite',
      ogType: 'article',
    },
    ja: {
      title: '高血糖の症状 - SugarLite',
      description:
        '高血糖の初期症状、10の警告サイン、長期的なリスク、血糖値が高い場合の対処法を解説します。',
      keywords: '高血糖,症状,糖尿病,血糖コントロール,SugarLite',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '高血糖症狀：身體發出的 10 個警示信號 - SugarLite 輕糖',
      description:
        '高血糖初期往往沒有明顯症狀。本文介紹 10 個常見高血糖信號、長期危害，以及發現血糖升高後應立即採取的措施。',
      keywords: '高血糖症狀,血糖高有什麼症狀,高血糖危害,糖尿病症狀,血糖控制,SugarLite',
      ogType: 'article',
    },
  },
  blogInsulinTrackingGuide: {
    zh: {
      title: '胰岛素记录完全指南：类型、剂量与追踪技巧 - SugarLite 轻糖',
      description:
        '胰岛素治疗是糖尿病管理的重要手段。本文介绍常见胰岛素类型、剂量记录方法、注射时间，以及如何用 App 科学追踪胰岛素使用情况。',
      keywords: '胰岛素记录,胰岛素类型,胰岛素剂量,糖尿病胰岛素,胰岛素注射,胰岛素追踪,SugarLite',
      ogType: 'article',
    },
    en: {
      title: 'Insulin Tracking Guide: Types, Dosing & Best Practices - SugarLite',
      description:
        'Insulin therapy is key for many people with diabetes. Learn about insulin types, dosing schedules, injection timing, and how to track insulin with an app.',
      keywords: 'insulin tracking,insulin types,insulin dosage,diabetes insulin,insulin injection,insulin log,SugarLite',
      ogType: 'article',
    },
    ja: {
      title: 'インスリン記録ガイド - SugarLite',
      description:
        'インスリン治療の基礎、種類、用量記録、注射タイミング、アプリでの管理方法を解説します。',
      keywords: 'インスリン,インスリン記録,糖尿病,インスリン用量,SugarLite',
      ogType: 'article',
    },
    'zh-Hant': {
      title: '胰島素記錄完全指南：類型、劑量與追蹤技巧 - SugarLite 輕糖',
      description:
        '胰島素治療是糖尿病管理的重要手段。本文介紹常見胰島素類型、劑量記錄方法、注射時間，以及如何用 App 科學追蹤胰島素使用情況。',
      keywords: '胰島素記錄,胰島素類型,胰島素劑量,糖尿病胰島素,胰島素注射,胰島素追蹤,SugarLite',
      ogType: 'article',
    },
  },
};

export function getPageMeta(page: PageKey, lang: Language): PageMeta {
  return PAGE_META[page][lang];
}
