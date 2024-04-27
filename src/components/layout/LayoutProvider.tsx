import { createContext, FunctionComponent, ReactNode } from 'react';
import { useThemeStore } from '@/utils/hooks/storage/useThemeStore';

export interface LayoutContext {
  MenuComponent?: FunctionComponent | JSX.Element;
  FooterComponent?: FunctionComponent | JSX.Element;
}

export const LayoutContext = createContext<LayoutContext>({});

export interface LayoutProviderProps {
  children?: ReactNode;
  MenuComponent?: FunctionComponent | JSX.Element;
  FooterComponent?: FunctionComponent | JSX.Element;
}

export function LayoutProvider({ children, MenuComponent, FooterComponent }: LayoutProviderProps) {
  const [theme] = useThemeStore((state) => [state.theme]);
  return (
    <LayoutContext.Provider value={{ MenuComponent, FooterComponent }}>
      <div className="flex min-h-screen flex-col" data-theme={theme == null || theme === 'system' ? undefined : theme}>
        {children}
      </div>
    </LayoutContext.Provider>
  );
}
