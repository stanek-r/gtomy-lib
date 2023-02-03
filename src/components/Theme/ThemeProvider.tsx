import React, { ReactNode, useEffect } from 'react';
import { themeChange } from 'theme-change';

interface Props {
  children?: ReactNode;
}

export function ThemeProvider({ children }: Props) {
  useEffect(() => {
    themeChange(false);
  }, []);

  return children;
}
