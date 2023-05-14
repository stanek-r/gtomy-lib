import create from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface User {
  userId: string;
  username: string;
  email: string;
  emailVerified: boolean;
  role: 'user' | 'subscriber' | 'admin';
  displayName: string;
}

export interface AuthStore {
  user: User | undefined;
  token: string | undefined;
  setUser: (user: User | undefined) => void;
  setToken: (token: string | undefined) => void;
  reset: () => void;
}

export const useAuthStore = create(
  persist(
    (set) => ({
      user: undefined,
      token: undefined,
      setUser: (user: User | undefined) => set((state: AuthStore) => ({ user: user })),
      setToken: (token: string | undefined) => set((state: AuthStore) => ({ token: token })),
      reset: () => set(() => ({ user: undefined, token: undefined })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
