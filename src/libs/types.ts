import type { LucideIcon } from 'lucide-react';

import type { PLACEMENTS } from '@/libs/constants';

export type Theme = 'dark' | 'light' | 'system';
export type Placement = (typeof PLACEMENTS)[number]['id'];
export type TOCPosition = 'start' | 'end';
export type IconPosition = 'start' | 'end';

export type Position = {
  top: number;
  left: number;
};

export type ThemeItem = {
  label: string;
  value: Theme;
  icon: LucideIcon;
};
