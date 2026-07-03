import { t, tArray, translations } from '@/i18n';
import { APP_NAME, SITE_NAME } from '@/i18n/meta';
import { SITE } from '@/i18n/routing';
import type { Language } from '@/types';

const ORG_SAME_AS = [
  'https://apps.apple.com/app/apple-store/id6753901096?pt=127680531&ct=sugarlitetop&mt=8',
  'https://twitter.com/SugarLite',
  'https://www.facebook.com/SugarLiteApp',
  'https://www.instagram.com/sugarlite.app',
  'https://www.youtube.com/@SugarLiteApp',
  'https://www.tiktok.com/@sugarlite.app',
  'https://www.xiaohongshu.com/user/profile/SugarLite',
  'https://weibo.com/SugarLite',
];

const HOW_TO_COPY: Record<Language, { name: string; description: string; steps: { name: string; text: string }[] }> = {
  zh: {
    name: '如何使用轻糖记录血糖',
    description: '通过简单的三步开始使用轻糖管理您的血糖健康',
    steps: [
      {
        name: '下载并安装轻糖',
        text: '在 App Store 搜索轻糖，下载并安装应用。打开应用后完成简单的注册流程。',
      },
      {
        name: '记录您的第一次血糖',
        text: '点击首页的「记录」按钮，选择餐前或餐后，输入血糖值（单位 mmol/L），添加备注如饮食内容。',
      },
      {
        name: '查看趋势分析',
        text: '在「趋势」页面查看您的血糖变化曲线，使用血糖指数配对分析了解不同食物对血糖的影响。',
      },
    ],
  },
  en: {
    name: 'How to track blood sugar with SugarLite',
    description: 'Get started managing your blood sugar health in three simple steps',
    steps: [
      {
        name: 'Download and install SugarLite',
        text: 'Search for SugarLite on the App Store, download and install the app, then complete the simple onboarding flow.',
      },
      {
        name: 'Log your first reading',
        text: 'Tap the log button, choose pre- or post-meal, enter your glucose value (mmol/L), and add notes such as meal details.',
      },
      {
        name: 'Review your trends',
        text: 'Visit the Trends screen to see your glucose curves and use glucose index pairing analysis to understand how foods affect you.',
      },
    ],
  },
  ja: {
    name: 'SugarLiteで血糖を記録する方法',
    description: '3つの簡単なステップで血糖健康管理を始めましょう',
    steps: [
      {
        name: 'SugarLiteをダウンロード・インストール',
        text: 'App StoreでSugarLiteを検索し、ダウンロード・インストールして簡単な初期設定を完了します。',
      },
      {
        name: '初めての血糖値を記録',
        text: '「記録」ボタンをタップし、食前または食後を選択して血糖値（mmol/L）を入力し、食事内容などのメモを追加します。',
      },
      {
        name: 'トレンドを確認',
        text: '「トレンド」画面で血糖変化曲線を確認し、血糖指数ペアリング分析を使って食事が血糖に与える影響を理解します。',
      },
    ],
  },
  'zh-Hant': {
    name: '如何使用輕糖記錄血糖',
    description: '透過簡單的三步開始使用輕糖管理您的血糖健康',
    steps: [
      {
        name: '下載並安裝輕糖',
        text: '在 App Store 搜尋輕糖，下載並安裝應用程式。打開應用後完成簡單的註冊流程。',
      },
      {
        name: '記錄您的第一次血糖',
        text: '點擊首頁的「記錄」按鈕，選擇餐前或餐後，輸入血糖值（單位 mmol/L），新增備註如飲食內容。',
      },
      {
        name: '查看趨勢分析',
        text: '在「趨勢」頁面查看您的血糖變化曲線，使用血糖指數配對分析了解不同食物對血糖的影響。',
      },
    ],
  },
};

export function buildWebSiteSchema(lang: Language) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE,
    name: SITE_NAME[lang],
    description: t(lang, 'hero.metaDescription'),
    inLanguage: ['zh-CN', 'en-US', 'ja-JP', 'zh-TW'],
    publisher: {
      '@id': `${SITE}/#organization`,
    },
  };
}

export function buildOrganizationSchema(lang: Language) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: SITE_NAME[lang],
    url: SITE,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE}/icon.png`,
      width: 512,
      height: 512,
    },
    sameAs: ORG_SAME_AS,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@sugarlite.top',
      contactType: 'customer support',
      availableLanguage: ['Chinese', 'English', 'Japanese'],
    },
  };
}

export function buildMobileApplicationSchema(lang: Language) {
  const featureKeys = ['glucose', 'food', 'pgrs', 'exercise', 'insights', 'sync'] as const;
  const featureList = featureKeys.map((k) => t(lang, `features.${k}.title`)).join(', ');

  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    '@id': `${SITE}/#app`,
    name: APP_NAME[lang],
    description: t(lang, 'hero.metaDescription'),
    operatingSystem: ['iOS'],
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'MedicalApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1200',
      bestRating: '5',
      worstRating: '1',
    },
    featureList,
    screenshot: [
      `${SITE}/preview/Screenshot-01.png`,
      `${SITE}/preview/Screenshot-02.png`,
      `${SITE}/preview/Screenshot-03.png`,
    ],
    downloadUrl:
      'https://apps.apple.com/app/apple-store/id6753901096?pt=127680531&ct=sugarlitetop&mt=8',
    softwareVersion: '1.5.1',
    fileSize: '25MB',
    supportingData: {
      '@type': 'HealthTopicContent',
      healthCondition: ['Diabetes', 'Prediabetes'],
    },
  };
}

export function buildBreadcrumbSchema(lang: Language, segments: { name: string; path: string }[]) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: t(lang, 'nav.home'),
      item: `${SITE}/${lang}`,
    },
    ...segments.map((seg, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: seg.name,
      item: `${SITE}/${lang}/${seg.path}`,
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export function buildFAQPageSchema(lang: Language) {
  const rawItems = translations[lang].faq?.items as Array<{ q: string; a: string }> | undefined;

  const mainEntity =
    rawItems?.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })) || [];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

export function buildArticleSchema(
  lang: Language,
  {
    title,
    description,
    path,
    datePublished = '2025-06-23T00:00:00+08:00',
    dateModified = '2025-06-23T00:00:00+08:00',
  }: {
    title: string;
    description: string;
    path: string;
    datePublished?: string;
    dateModified?: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE}/${lang}/${path}`,
    datePublished,
    dateModified,
    author: {
      '@id': `${SITE}/#organization`,
    },
    publisher: {
      '@id': `${SITE}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}/${lang}/${path}`,
    },
  };
}

export function buildHowToSchema(lang: Language) {
  const copy = HOW_TO_COPY[lang];

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: copy.name,
    description: copy.description,
    image: `${SITE}/og-image.webp`,
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    step: copy.steps.map((step, index) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      url:
        index === 0
          ? `${SITE}/${lang}#download`
          : `${SITE}/${lang}#features`,
      ...(index === 0 ? { image: `${SITE}/preview/Screenshot-01.png` } : {}),
    })),
  };
}
