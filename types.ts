
import React from 'react';

export type Language = 'zh' | 'en';

export interface LocalizedString {
  zh: string;
  en: string;
}

export interface Feature {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: React.ReactNode;
}

export interface NavItem {
  label: LocalizedString;
  href: string;
}

export interface Testimonial {
  name: string;
  role: LocalizedString;
  content: LocalizedString;
  avatar: string;
}
