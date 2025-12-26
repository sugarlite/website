
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
      zh: '通过直观的图表展示全天血糖趋势，支持上午、下午及全天数据切换，让波动一目了然。', 
      en: 'Visualize glucose trends with intuitive charts. Switch between morning, afternoon, and daily views.' 
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 'diet',
    title: { zh: '饮食GI百科', en: 'Diet GI Encyclopedia' },
    description: { 
      zh: '内置海量食物库，详细标注热量、碳水、蛋白及GI值，助您科学选择每一餐。', 
      en: 'Extensive food database with calories, carbs, proteins, and GI values to help you eat scientifically.' 
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  },
  {
    id: 'exercise',
    title: { zh: '运动闭环管理', en: 'Exercise Management' },
    description: { 
      zh: '记录每日运动情况，系统自动计算热量消耗，平衡摄入与支出，维持血糖稳定。', 
      en: 'Log daily activities. Automatically calculate calorie burn to balance intake and maintain stability.' 
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

export const UI_STRINGS: Record<string, LocalizedString> = {
  heroTag: { zh: '2025 全新升级版现已发布', en: '2025 New Version Now Live' },
  heroTitle: { zh: '掌控血糖，', en: 'Master Your Glucose,' },
  heroTitleHighlight: { zh: '定义健康新生活', en: 'Define Your Healthy Life' },
  heroSubtitle: { 
    zh: 'SugarLite 是一款专为血糖健康设计的管理工具。通过智能分析、海量饮食数据库以及全方位的追踪记录，助您轻松管理健康每一天。', 
    en: 'SugarLite is a management tool designed for glucose health. Manage your wellness through AI analysis and a comprehensive database.' 
  },
  downloadAppStore: { zh: 'App Store 下载', en: 'App Store' },
  downloadGooglePlay: { zh: 'Google Play 下载', en: 'Google Play' },
  nowDownload: { zh: '立即下载', en: 'Download Now' },
  overview: { zh: '血糖概览', en: 'Overview' },
  dailyAvg: { zh: '今日均值', en: 'Daily Avg' },
  unit: { zh: 'mmol/L', en: 'mmol/L' },
  statsUsers: { zh: '用户信赖选择', en: 'Trusted Users' },
  statsFood: { zh: '专业食物库', en: 'Food Database' },
  statsRatings: { zh: 'App Store 评分', en: 'App Store Rating' },
  statsAvailability: { zh: '健康陪伴', en: 'Availability' },
  featuresTag: { zh: '核心功能', en: 'Core Features' },
  featuresTitle: { zh: '科学管理，智能护航', en: 'Scientific & Smart' },
  featuresSubtitle: { 
    zh: '集血糖监测、饮食辅助与运动追踪于一体，为您提供多维度的健康管理建议。', 
    en: 'Integrating monitoring, diet assistance, and activity tracking for multi-dimensional health advice.' 
  },
  previewTitle: { zh: '更懂你的数据可视化看板', en: 'Visual Dashboard That Understands You' },
  previewSubtitle: { 
    zh: '拒绝复杂枯燥的数据。我们用优雅的波形图和清晰的颜色标识，直观呈现您的健康状态。无论是餐前还是餐后，波动一目了然。', 
    en: 'No more boring data. Elegant wave charts and clear color indicators visualize your status at a glance.' 
  },
  previewPoint1Title: { zh: '全天候趋势分析', en: '24/7 Trend Analysis' },
  previewPoint1Desc: { zh: '支持日、周、月不同维度的统计分析。', en: 'Support daily, weekly, and monthly statistical analysis.' },
  previewPoint2Title: { zh: '饮食记录与GI匹配', en: 'Diet & GI Matching' },
  previewPoint2Desc: { zh: '智能匹配食物GI值，给予饮食调整建议。', en: 'Smart food GI matching with personalized dietary advice.' },
  previewPoint3Title: { zh: '自动化报告导出', en: 'Automated Reports' },
  previewPoint3Desc: { zh: '一键生成PDF报告，方便医生问诊参考。', en: 'Generate PDF reports for medical consultations with one tap.' },
  ctaTitle: { zh: '准备好开启健康新旅程了吗？', en: 'Ready to Start Your Journey?' },
  ctaSubtitle: { 
    zh: '立即下载 SugarLite，享受 7 天专业版免费试用。让科技成为您管理健康的得力助手。', 
    en: 'Download SugarLite today and enjoy a 7-day Pro trial. Let technology be your health assistant.' 
  },
  ctaPrimary: { zh: '立即免费下载', en: 'Free Download' },
  ctaSecondary: { zh: '了解更多详情', en: 'Learn More' },
  footerTagline: { zh: '致力于为全球用户提供最专业的血糖与健康管理方案。', en: 'Dedicated to providing the most professional health solutions globally.' },
  footerAbout: { zh: '关于我们', en: 'About' },
  footerProduct: { zh: '产品服务', en: 'Product' },
  footerContact: { zh: '联系我们', en: 'Contact' },
  footerRights: { zh: '© 2025 SugarLite Health Tech Co., Ltd. 版权所有', en: '© 2025 SugarLite Health Tech Co., Ltd. All rights reserved.' }
};
