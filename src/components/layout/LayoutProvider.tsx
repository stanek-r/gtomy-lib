import React, { ReactNode } from 'react';
import { useThemeStore } from '@/utils/hooks/storage/useThemeStore';

export interface LayoutProviderProps {
  children?: ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [theme] = useThemeStore((state: any) => [state.theme]);
  return (
    <div className="flex min-h-screen flex-col" data-theme={theme == null || theme === 'system' ? undefined : theme}>
      {children}
    </div>
  );
}
