import React, { useEffect } from 'react';
import { themeChange } from 'theme-change';

export interface ThemeProviderProps {
  children?: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    themeChange(false);
  }, []);

  return <>{children}</>;
}
