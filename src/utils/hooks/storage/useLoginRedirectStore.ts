import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useLoginRedirectStore = create(
  persist(
    (set) => ({
      redirectUrl: undefined,
      setRedirectUrl: (redirectUrl: string | undefined) => set(() => ({ redirectUrl: redirectUrl })),
    }),
    {
      name: 'login-redirect-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
