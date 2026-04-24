
import React from 'react';
import { Feature, NavItem, LocalizedString } from './types';

export const APP_NAME = {
  zh: '轻糖',
  en: 'SugarLite'
};

export const APP_LINKS = {
  appStore: 'https://apps.apple.com/us/app/sugarlite/id6753901096',
  marketingUrl: 'https://sugar-lite-web.vercel.app/',
  supportUrl: 'https://my.feishu.cn/wiki/SwYAw2DDEiLFMSk11mOcHMgtnnh?from=from_copylink'
};

export const NAV_ITEMS: NavItem[] = [
  { label: { zh: '功能特性', en: 'Features' }, href: '#features' },
  { label: { zh: '应用预览', en: 'Preview' }, href: '#preview' },
  { label: { zh: '下载中心', en: 'Download' }, href: '#download' }
];

export const FEATURES: Feature[] = [
  {
    id: 'glucose',
    title: { zh: '血糖趋势追踪', en: 'Glucose Trend Tracking' },
    description: {
      zh: '轻松记录餐前、餐后血糖值，自动生成可视化趋势曲线，参考 IDF 目标范围。',
      en: 'Log pre- and post-meal glucose easily and get visual trend curves with IDF-aligned target references.'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 'food',
    title: { zh: '饮食记录管理', en: 'Food Logging' },
    description: {
      zh: '快速记录每日饮食，支持丰富食物数据库与自定义食物，自动估算碳水摄入。',
      en: 'Track meals quickly with rich food data and custom items, with automatic carbohydrate estimation.'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 9V2H9v7H7V2H5v7H3v2h2v7a2 2 0 002 2v1a2 2 0 002 2v-1a2 2 0 002-2v-7h2V9h-2zm8 0V2h-2v7h-2V2h-2v7h-2v2h2v7a2 2 0 002 2v1a2 2 0 002 2v-1a2 2 0 002-2v-7h2V9h-2z" />
      </svg>
    )
  },
  {
    id: 'pgrs',
    title: { zh: '个性化血糖反应分析', en: 'Personalized Glucose Response' },
    description: {
      zh: '通过餐前餐后血糖配对分析（PGRS），识别友好食物与风险食物。',
      en: 'Use PGRS pairing analysis to identify glucose-friendly foods and foods that need caution.'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M7 14l3-3 3 2 4-5" />
      </svg>
    )
  },
  {
    id: 'exercise',
    title: { zh: '运动记录', en: 'Exercise Tracking' },
    description: {
      zh: '记录日常运动，观察不同强度活动对血糖波动的影响。',
      en: 'Track daily activity and understand how exercise intensity affects glucose fluctuations.'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'insights',
    title: { zh: 'AI 智能洞察', en: 'AI Insights' },
    description: {
      zh: '基于多次记录生成个性化建议，帮助形成更可持续的控糖方案。',
      en: 'Generate personalized insights from repeated records to build a more sustainable glucose plan.'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3a3.75 3.75 0 00-3.75 3.75v.5A3.25 3.25 0 002.75 10.5v4A3.25 3.25 0 006 17.75h.5A3.75 3.75 0 0010.25 21h3.5a3.75 3.75 0 003.75-3.25h.5a3.25 3.25 0 003.25-3.25v-4A3.25 3.25 0 0018 7.25h-.5A3.75 3.75 0 0013.75 3h-4z" />
      </svg>
    )
  },
  {
    id: 'cloud',
    title: { zh: '云端同步', en: 'Cloud Sync' },
    description: {
      zh: '登录后自动同步数据，跨设备使用更连续，换机也不丢记录。',
      en: 'Sync data automatically after sign-in for seamless cross-device use and zero record loss.'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 010-8 5 5 0 019.584-1.757A4.5 4.5 0 1118 16H7zm5-4v6m0 0l-3-3m3 3l3-3" />
      </svg>
    )
  }
];

export const UI_STRINGS: Record<string, LocalizedString> = {
  heroTag: { zh: '支持 Apple Health 同步与 AI 洞察', en: 'Apple Health Sync and AI Insights' },
  heroTitle: { zh: '记录血糖规律，', en: 'Track Your Glucose,' },
  heroTitleHighlight: { zh: '找到适合你的饮食方案', en: 'Find Your Best Diet Plan' },
  heroSubtitle: {
    zh: '「轻糖」是一款专为关注血糖健康人群设计的智能管理工具。通过简洁记录与科学分析，帮助你更好了解血糖变化并持续优化日常饮食。',
    en: 'SugarLite is a smart glucose management app for people who care about blood sugar health, combining simple logging with practical data insights.'
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
  featuresTitle: { zh: '围绕控糖场景的 6 大能力', en: 'Six Core Capabilities for Glucose Care' },
  featuresSubtitle: {
    zh: '从记录、分析到提醒和同步，帮助你把控餐前餐后变化，形成长期可执行的血糖管理节奏。',
    en: 'From logging and analysis to reminders and syncing, build a long-term and actionable glucose routine.'
  },
  previewTitle: { zh: '更贴近日常的血糖管理体验', en: 'A Practical Daily Glucose Experience' },
  previewSubtitle: {
    zh: '你可以从记录中快速看到趋势变化，并结合饮食、运动与个性化分析，逐步找到适合自己的控糖方案。',
    en: 'Understand trends faster from your logs and combine food, exercise, and personalized analysis to improve outcomes.'
  },
  previewPoint1Title: { zh: 'PGRS 配对分析', en: 'PGRS Pairing Analysis' },
  previewPoint1Desc: { zh: '通过餐前餐后配对，判断食物对你血糖的真实影响。', en: 'Pair pre- and post-meal values to see real food impact on your glucose.' },
  previewPoint2Title: { zh: 'HealthKit 数据同步', en: 'HealthKit Sync' },
  previewPoint2Desc: { zh: '支持 Apple Health 同步，减少重复录入。', en: 'Sync with Apple Health to reduce manual entry.' },
  previewPoint3Title: { zh: '血糖定时提醒', en: 'Timed Glucose Reminders' },
  previewPoint3Desc: { zh: '按你的节奏设置提醒，降低漏测漏记。', en: 'Set reminders on your own schedule to avoid missed checks.' },
  ctaTitle: { zh: '开始你的轻量化控糖管理', en: 'Start Smarter Glucose Management' },
  ctaSubtitle: {
    zh: '现在下载轻糖，记录、分析、提醒一站完成。每一次记录，都会变成下一次更好的选择。',
    en: 'Download SugarLite to log, analyze, and get reminders in one place. Every record helps your next better choice.'
  },
  ctaPrimary: { zh: '立即免费下载', en: 'Free Download' },
  ctaSecondary: { zh: '获取支持', en: 'Get Support' },
  suitableUsersTitle: { zh: '适合人群', en: 'Who It Is For' },
  suitableUser1: { zh: '糖尿病前期及糖尿病患者', en: 'People with prediabetes or diabetes' },
  suitableUser2: { zh: '关注血糖健康的普通人群', en: 'Anyone focused on glucose health' },
  suitableUser3: { zh: '执行低糖或控糖饮食计划的用户', en: 'People following low-sugar diet plans' },
  suitableUser4: { zh: '需要监测餐后血糖反应的人群', en: 'People monitoring post-meal glucose responses' },
  disclaimerTitle: { zh: '重要提示', en: 'Important Notice' },
  disclaimerText: {
    zh: '「轻糖」不提供医疗诊断建议，所有数据仅供参考。如有健康问题，请咨询专业医生。',
    en: 'SugarLite does not provide medical diagnosis. All data is for reference only. Please consult a qualified doctor for medical concerns.'
  },
  footerTagline: { zh: '致力于为全球用户提供最专业的血糖与健康管理方案。', en: 'Dedicated to providing the most professional health solutions globally.' },
  footerAbout: { zh: '关于我们', en: 'About' },
  footerProduct: { zh: '产品服务', en: 'Product' },
  footerContact: { zh: '联系我们', en: 'Contact' },
  footerRights: { zh: '© 2025 轻糖 (SugarLite) 版权所有', en: '© 2025 SugarLite All rights reserved.' }
};
