import create from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface User {
  userId: string;
  username: string;
  email: string;
  role: 'user' | 'subscriber' | 'admin';
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  reset: () => void;
}

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user: User | null) => set((state: AuthStore) => ({ user: user })),
      setToken: (token: string | null) => set((state: AuthStore) => ({ token: token })),
      reset: () => set(() => ({ user: null, token: null })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
