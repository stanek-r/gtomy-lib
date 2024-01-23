import React from 'react';
import { useThemeStore } from '@/utils/hooks/storage/useThemeStore';

export interface ThemeProviderProps {
  children?: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme] = useThemeStore((state: any) => [state.theme]);

  if (theme == null || theme === 'system') {
    return <div>{children}</div>;
  }
  return <div data-theme={theme}>{children}</div>;
}
