
import React from 'react';
import { Feature } from './types';

export const APP_NAME = {
  zh: '轻糖',
  en: 'SugarLite',
  ja: '軽糖',
  'zh-Hant': '輕糖'
};

export const APP_LINKS = {
  appStore: 'https://apps.apple.com/us/app/sugarlite/id6753901096',
  marketingUrl: 'https://sugarlite.top/',
  supportUrl: 'https://my.feishu.cn/wiki/SwYAw2DDEiLFMSk11mOcHMgtnnh?from=from_copylink'
};

export const FEATURES: Feature[] = [
  {
    id: 'glucose',
    title: { zh: '血糖趋势追踪', en: 'Glucose Trend Tracking', ja: '血糖トレンド追跡', 'zh-Hant': '血糖趨勢追蹤' },
    description: {
      zh: '轻松记录餐前、餐后血糖值，自动生成可视化趋势曲线，参考 IDF 目标范围。',
      en: 'Log pre- and post-meal glucose easily and get visual trend curves with IDF-aligned target references.',
      ja: '食前・食後の血糖値を簡単に記録し、IDF基準の目標範囲に基づく視覚的なトレンド曲線を自動生成します。',
      'zh-Hant': '輕鬆記錄餐前、餐後血糖值，自動生成可視化趨勢曲線，參考 IDF 目標範圍。'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 'food',
    title: { zh: '饮食记录管理', en: 'Food Logging', ja: '食事記録管理', 'zh-Hant': '飲食記錄管理' },
    description: {
      zh: '快速记录每日饮食，支持丰富食物数据库与自定义食物，自动估算碳水摄入。',
      en: 'Track meals quickly with rich food data and custom items, with automatic carbohydrate estimation.',
      ja: '豊富な食品データベースとカスタム食品に対応し、炭水化物摂取量を自動推定しながら毎日の食事を素早く記録します。',
      'zh-Hant': '快速記錄每日飲食，支援豐富食物資料庫與自訂食物，自動估算碳水攝取。'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 9V2H9v7H7V2H5v7H3v2h2v7a2 2 0 002 2v1a2 2 0 002 2v-1a2 2 0 002-2v-7h2V9h-2zm8 0V2h-2v7h-2V2h-2v7h-2v2h2v7a2 2 0 002 2v1a2 2 0 002 2v-1a2 2 0 002-2v-7h2V9h-2z" />
      </svg>
    )
  },
  {
    id: 'pgrs',
    title: { zh: '个性化血糖反应分析', en: 'Personalized Glucose Response', ja: '個別化血糖反応分析', 'zh-Hant': '個人化血糖反應分析' },
    description: {
      zh: '通过餐前餐后血糖配对分析（PGRS），识别友好食物与风险食物。',
      en: 'Use PGRS pairing analysis to identify glucose-friendly foods and foods that need caution.',
      ja: 'PGRSペアリング分析を使用して、血糖に優しい食品と注意が必要な食品を特定します。',
      'zh-Hant': '透過餐前餐後血糖配對分析（PGRS），識別友好食物與風險食物。'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M7 14l3-3 3 2 4-5" />
      </svg>
    )
  },
  {
    id: 'exercise',
    title: { zh: '运动记录', en: 'Exercise Tracking', ja: '運動記録', 'zh-Hant': '運動記錄' },
    description: {
      zh: '记录日常运动，观察不同强度活动对血糖波动的影响。',
      en: 'Track daily activity and understand how exercise intensity affects glucose fluctuations.',
      ja: '日常の運動を記録し、運動強度が血糖変動にどのように影響するかを理解します。',
      'zh-Hant': '記錄日常運動，觀察不同強度活動對血糖波動的影響。'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'insights',
    title: { zh: 'AI 智能洞察', en: 'AI Insights', ja: 'AI インサイト', 'zh-Hant': 'AI 智能洞察' },
    description: {
      zh: '基于多次记录生成个性化建议，帮助形成更可持续的控糖方案。',
      en: 'Generate personalized insights from repeated records to build a more sustainable glucose plan.',
      ja: '複数回の記録に基づいてパーソナライズされた提案を生成し、より持続可能な血糖管理計画を構築します。',
      'zh-Hant': '基於多次記錄生成個人化建議，幫助形成更永續的控糖方案。'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3a3.75 3.75 0 00-3.75 3.75v.5A3.25 3.25 0 002.75 10.5v4A3.25 3.25 0 006 17.75h.5A3.75 3.75 0 0010.25 21h3.5a3.75 3.75 0 003.75-3.25h.5a3.25 3.25 0 003.25-3.25v-4A3.25 3.25 0 0018 7.25h-.5A3.75 3.75 0 0013.75 3h-4z" />
      </svg>
    )
  },
  {
    id: 'cloud',
    title: { zh: '云端同步', en: 'Cloud Sync', ja: 'クラウド同期', 'zh-Hant': '雲端同步' },
    description: {
      zh: '登录后自动同步数据，跨设备使用更连续，换机也不丢记录。',
      en: 'Sync data automatically after sign-in for seamless cross-device use and zero record loss.',
      ja: 'サインイン後にデータを自動同期し、シームレスなクロスデバイス使用と記録の紛失ゼロを実現します。',
      'zh-Hant': '登入後自動同步資料，跨裝置使用更連續，換機也不丟記錄。'
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 010-8 5 5 0 019.584-1.757A4.5 4.5 0 1118 16H7zm5-4v6m0 0l-3-3m3 3l3-3" />
      </svg>
    )
  }
];
