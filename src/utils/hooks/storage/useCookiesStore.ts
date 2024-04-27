import { create } from 'zustand';
import dayjs from 'dayjs';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CookieStore {
  acceptedAt: string | null;
  acceptCookies: () => void;
  clearCookies: () => void;
}

export const useCookiesStore = create(
  persist<CookieStore>(
    (set) => ({
      acceptedAt: null,
      acceptCookies: () => set(() => ({ acceptedAt: dayjs().format('YYYY-MM-DD') })),
      clearCookies: () => set(() => ({ acceptedAt: null })),
    }),
    {
      name: 'cookies-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
