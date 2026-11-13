import type { ReactNode } from 'react';

export interface ChildrenProps {
  children: ReactNode;
}

export interface SkeletonCountProps {
  count?: number;
}

export interface LocaleItem {
  code: 'en' | 'ur' | 'ps';
  label: string;
  nativeName: string;
}
