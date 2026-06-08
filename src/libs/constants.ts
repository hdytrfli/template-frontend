import { Eclipse, Moon, Sun } from 'lucide-react';

import type { ThemeItem } from '@/libs/types';

/**
 * All available placements for anchored items
 */
export const PLACEMENTS = [
  { id: 'top-left', label: 'Top left' },
  { id: 'top-center', label: 'Top center' },
  { id: 'top-right', label: 'Top right' },
  { id: 'bottom-left', label: 'Bottom left' },
  { id: 'bottom-center', label: 'Bottom center' },
  { id: 'bottom-right', label: 'Bottom right' },
  { id: 'left-top', label: 'Left top' },
  { id: 'left-center', label: 'Left center' },
  { id: 'left-bottom', label: 'Left bottom' },
  { id: 'right-top', label: 'Right top' },
  { id: 'right-center', label: 'Right center' },
  { id: 'right-bottom', label: 'Right bottom' },
] as const;

/**
 * All available themes for the theme provider
 */
export const THEMES: ThemeItem[] = [
  { label: 'Light', value: 'light', icon: Sun },
  { label: 'Dark', value: 'dark', icon: Moon },
  { label: 'System', value: 'system', icon: Eclipse },
];
