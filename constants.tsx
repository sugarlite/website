
import React from 'react';
import { Feature, NavItem, LocalizedString } from './types';

export const APP_NAME = {
  zh: '轻糖',
  en: 'SugarLite'
};

export const NAV_ITEMS: NavItem[] = [
  { label: { zh: '功能特性', en: 'Features' }, href: '#features' },
  { label: { zh: '应用预览', en: 'Preview' }, href: '#preview' },
  { label: { zh: '下载中心', en: 'Download' }, href: '#download' }
];

export const FEATURES: Feature[] = [
  {
    id: 'glucose',
    title: { zh: '血糖精准追踪', en: 'Glucose Tracking' },
    description: {
      zh: '通过直观的图表展示全天血糖趋势，支持多种维度数据切换，让波动一目了然。',
      en: 'Visualize glucose trends with intuitive charts. Support multi-dimensional data views for clear insights.'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 'ai-analysis',
    title: { zh: 'AI 趋势分析', en: 'AI Trend Analysis' },
    description: {
      zh: '基于大数据智能预测血糖趋势，提前预警潜在波动风险，为您提供个性化健康建议。',
      en: 'Predict trends based on AI. Get early warnings for potential fluctuations and personalized advice.'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    id: 'report',
    title: { zh: '专业报告共享', en: 'Report Sharing' },
    description: {
      zh: '一键生成并导出详尽的 PDF 健康报告，方便您在问诊时与医生进行深度沟通。',
      en: 'Generate and export detailed PDF health reports with one tap for better doctor consultations.'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

export const UI_STRINGS: Record<string, LocalizedString> = {
  heroTag: { zh: '2025 全新升级版现已发布', en: '2025 New Version Now Live' },
  heroTitle: { zh: '掌控血糖，', en: 'Master Your Glucose,' },
  heroTitleHighlight: { zh: '定义健康新生活', en: 'Define Your Healthy Life' },
  heroSubtitle: {
    zh: '轻糖 (SugarLite) 是一款专为血糖健康设计的管理工具。通过智能分析、科学的可视化看板以及全方位的追踪记录，助您轻松管理健康每一天。',
    en: 'SugarLite is a management tool designed for glucose health. Manage your wellness through AI analysis and scientific visualization dashboards.'
  },
  downloadAppStore: { zh: 'App Store 下载', en: 'App Store' },
  downloadGooglePlay: { zh: 'Google Play 下载(即将上线)', en: 'Google Play (coming soon)' },
  nowDownload: { zh: '立即下载', en: 'Download Now' },
  overview: { zh: '血糖概览', en: 'Overview' },
  dailyAvg: { zh: '今日均值', en: 'Daily Avg' },
  unit: { zh: 'mmol/L', en: 'mmol/L' },
  statsUsers: { zh: '用户信赖选择', en: 'Trusted Users' },
  statsFood: { zh: '专业数据支撑', en: 'Scientific Data' },
  statsRatings: { zh: 'App Store 评分', en: 'App Store Rating' },
  statsAvailability: { zh: '全天候陪伴', en: '24/7 Support' },
  featuresTag: { zh: '核心功能', en: 'Core Features' },
  featuresTitle: { zh: '科学管理，智能护航', en: 'Scientific & Smart' },
  featuresSubtitle: {
    zh: '集血糖监测、智能分析与趋势预警于一体，为您提供多维度的健康管理建议。',
    en: 'Integrating monitoring, AI analysis, and trend warnings for multi-dimensional health advice.'
  },
  previewTitle: { zh: '更懂你的数据可视化看板', en: 'Visual Dashboard That Understands You' },
  previewSubtitle: {
    zh: '拒绝复杂枯燥的数据。我们用优雅的波形图和清晰的颜色标识，直观呈现您的健康状态。无论是餐前还是餐后，波动一目了然。',
    en: 'No more boring data. Elegant wave charts and clear color indicators visualize your status at a glance.'
  },
  previewPoint1Title: { zh: '多维度趋势分析', en: 'Trend Analysis' },
  previewPoint1Desc: { zh: '支持日、周、月、季不同维度的统计分析。', en: 'Support daily, weekly, monthly, and quarterly analysis.' },
  previewPoint2Title: { zh: '智能风险预警', en: 'Risk Warning' },
  previewPoint2Desc: { zh: 'AI 算法自动识别高低血糖风险，及时提醒。', en: 'AI algorithms automatically identify risks and send timely alerts.' },
  previewPoint3Title: { zh: '跨设备同步', en: 'Cloud Sync' },
  previewPoint3Desc: { zh: '数据多端同步，多名家属可共同守护。', en: 'Sync data across devices for family care management.' },
  ctaTitle: { zh: '准备好开启健康新旅程了吗？', en: 'Ready to Start Your Journey?' },
  ctaSubtitle: {
    zh: '立即下载轻糖 (SugarLite)。让科技成为您管理健康的得力助手。',
    en: 'Download SugarLite today and enjoy. Let technology be your health assistant.'
  },
  ctaPrimary: { zh: '立即免费下载', en: 'Free Download' },
  ctaSecondary: { zh: '了解更多详情', en: 'Learn More' },
  footerTagline: { zh: '致力于为全球用户提供最专业的血糖与健康管理方案。', en: 'Dedicated to providing the most professional health solutions globally.' },
  footerAbout: { zh: '关于我们', en: 'About' },
  footerProduct: { zh: '产品服务', en: 'Product' },
  footerContact: { zh: '联系我们', en: 'Contact' },
  footerRights: { zh: '© 2025 轻糖 (SugarLite) 版权所有', en: '© 2025 SugarLite All rights reserved.' }
};
