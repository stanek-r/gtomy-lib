import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface User {
  userId: string;
  username: string;
  email: string;
  emailVerified: boolean;
  role: 'user' | 'subscriber' | 'admin';
  displayName: string;

  // JWT
  iat: number;
  exp: number;
}

export const useAuthStore = create(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token: string | undefined) => set(() => ({ token: token })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
