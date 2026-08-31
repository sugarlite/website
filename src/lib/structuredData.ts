import { MEDICAL_REFERENCES } from '@/constants';
import { t, translations } from '@/i18n';
import { APP_NAME, SITE_NAME } from '@/i18n/meta';
import { SITE, getLocalizedPath, LANG_TO_HTML_LANG } from '@/i18n/routing';
import type { Language } from '@/types';

/**
 * Absolute URL for the given locale. The default locale (zh) is served at
 * root paths — never emit `/zh/...` URLs: those are 308-redirects and would
 * conflict with the canonical URL in JSON-LD.
 */
function localizedUrl(lang: Language, pathWithoutLang: string): string {
  return `${SITE}${getLocalizedPath(lang, pathWithoutLang)}`;
}

const ORG_SAME_AS = [
  'https://apps.apple.com/app/apple-store/id6753901096?pt=127680531&ct=sugarlitetop&mt=8',
];
// NOTE: add social profile URLs here ONLY once they actually exist
// (Twitter/YouTube/Xiaohongshu/Weibo...). sameAs entries pointing at
// non-existent profiles dilute entity confidence rather than help it.

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
    name: 'SugarLite',
    alternateName: SITE_NAME[lang],
    description: t(lang, 'hero.metaDescription'),
    inLanguage: ['zh-CN', 'en-US', 'ja-JP', 'zh-TW'],
    publisher: {
      '@id': `${SITE}/#organization`,
    },
  };
}

export function buildOrganizationSchema(_lang: Language) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'SugarLite',
    alternateName: ['轻糖', '輕糖', '軽糖', 'SugarLite 轻糖'],
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
    '@type': ['MobileApplication', 'SoftwareApplication'],
    '@id': `${SITE}/#app`,
    name: 'SugarLite',
    alternateName: APP_NAME[lang],
    description: t(lang, 'hero.metaDescription'),
    operatingSystem: ['iOS'],
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'MedicalApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    // NOTE: no aggregateRating — only add real App Store ratings here once
    // there are enough of them (fabricated ratings risk a manual action).
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
      item: localizedUrl(lang, ''),
    },
    ...segments.map((seg, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: seg.name,
      item: localizedUrl(lang, seg.path),
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
    datePublished,
    dateModified,
    image,
    type = 'BlogPosting',
  }: {
    title: string;
    description: string;
    path: string;
    datePublished?: string;
    dateModified?: string;
    image?: string;
    type?: 'BlogPosting' | 'Article';
  }
) {
  const url = localizedUrl(lang, path);
  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description,
    image: image ? [image] : [`${SITE}/og-image.png`],
    url,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    inLanguage: LANG_TO_HTML_LANG[lang],
    about: {
      '@type': 'MedicalCondition',
      name: 'Diabetes',
    },
    author: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'SugarLite',
      url: SITE,
    },
    publisher: {
      '@id': `${SITE}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    isPartOf: {
      '@id': `${localizedUrl(lang, 'blog')}#blog`,
    },
  };
}

export function buildWebPageSchema(
  lang: Language,
  {
    title,
    description,
    path,
  }: {
    title: string;
    description: string;
    path: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${localizedUrl(lang, path)}#webpage`,
    url: localizedUrl(lang, path),
    name: title,
    description,
    inLanguage: LANG_TO_HTML_LANG[lang],
    isPartOf: {
      '@id': `${SITE}/#website`,
    },
    publisher: {
      '@id': `${SITE}/#organization`,
    },
  };
}

/**
 * Blog index page: a `Blog` collection listing the current posts. Gives
 * search engines and LLMs a machine-readable inventory of the blog.
 */
export function buildBlogSchema(
  lang: Language,
  posts: { title: string; description: string; path: string; datePublished: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${localizedUrl(lang, 'blog')}#blog`,
    url: localizedUrl(lang, 'blog'),
    name: t(lang, 'blog.title'),
    description: t(lang, 'blog.subtitle'),
    inLanguage: LANG_TO_HTML_LANG[lang],
    publisher: {
      '@id': `${SITE}/#organization`,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url: localizedUrl(lang, post.path),
      datePublished: post.datePublished,
      author: {
        '@type': 'Organization',
        '@id': `${SITE}/#organization`,
      },
    })),
  };
}

/**
 * Medical guide pages (YMYL): MedicalWebPage with an explicit medical topic.
 * Reinforces E-E-A-T signals for health content.
 */
export function buildMedicalWebPageSchema(
  lang: Language,
  {
    title,
    description,
    path,
    conditionName,
    citationKeys,
  }: {
    title: string;
    description: string;
    path: string;
    conditionName: string;
    citationKeys?: string[];
  }
) {
  const citations = (citationKeys ?? [])
    .map((key) => MEDICAL_REFERENCES[key]?.url)
    .filter((url): url is string => Boolean(url));

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${localizedUrl(lang, path)}#webpage`,
    url: localizedUrl(lang, path),
    name: title,
    description,
    inLanguage: LANG_TO_HTML_LANG[lang],
    about: {
      '@type': 'MedicalCondition',
      name: conditionName,
    },
    audience: {
      '@type': 'PeopleAudience',
      audienceType: 'Patient',
    },
    author: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'SugarLite',
    },
    publisher: {
      '@id': `${SITE}/#organization`,
    },
    ...(citations.length
      ? {
          citation: citations.map((url) => ({
            '@type': 'CreativeWork',
            url,
          })),
        }
      : {}),
  };
}

export function buildGuideIndexSchema(
  lang: Language,
  guides: { title: string; description: string; path: string }[]
) {
  const url = localizedUrl(lang, 'guide');
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#webpage`,
    url,
    name: t(lang, 'guide.indexTitle'),
    description: t(lang, 'guide.indexSubtitle'),
    inLanguage: LANG_TO_HTML_LANG[lang],
    isPartOf: {
      '@id': `${SITE}/#website`,
    },
    publisher: {
      '@id': `${SITE}/#organization`,
    },
    hasPart: guides.map((guide) => ({
      '@type': 'MedicalWebPage',
      name: guide.title,
      description: guide.description,
      url: localizedUrl(lang, guide.path),
    })),
  };
}

export function buildHowToSchema(lang: Language) {
  const copy = HOW_TO_COPY[lang];

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: copy.name,
    description: copy.description,
    image: `${SITE}/og-image.png`,
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
          ? `${localizedUrl(lang, '')}#download`
          : `${localizedUrl(lang, '')}#features`,
      ...(index === 0 ? { image: `${SITE}/preview/Screenshot-01.png` } : {}),
    })),
  };
}
