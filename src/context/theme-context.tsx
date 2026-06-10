import { Eclipse, type LucideIcon } from 'lucide-react';
import * as React from 'react';

import type { Theme } from '@/types/theme';

interface ThemeProviderState {
  theme: Theme;
  icon: LucideIcon;
  rotate: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeProviderContext = React.createContext<ThemeProviderState>({
  icon: Eclipse,
  theme: 'system',
  rotate: () => null,
  setTheme: () => null,
});
