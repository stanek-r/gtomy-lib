import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ThemeStore {
  theme: string | null;
  setTheme: (theme: string | null) => void;
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      theme: null,
      setTheme: (theme: string | null) => set(() => ({ theme: theme })),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
