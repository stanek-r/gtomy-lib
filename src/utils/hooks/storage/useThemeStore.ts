import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: undefined,
      setTheme: (theme: string | undefined) => set(() => ({ theme: theme })),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
