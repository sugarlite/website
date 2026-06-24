
import React from 'react';

export type Language = 'zh' | 'en' | 'ja' | 'zh-Hant';

export interface Feature {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: React.ReactNode;
}
