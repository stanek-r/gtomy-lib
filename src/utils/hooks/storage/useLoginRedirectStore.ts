import { create } from 'zustand';

interface LoginRedirectStore {
  redirectUrl: string | null;
  setRedirectUrl: (redirectUrl: string | null) => void;
}

export const useLoginRedirectStore = create<LoginRedirectStore>((set) => ({
  redirectUrl: null,
  setRedirectUrl: (redirectUrl: string | null) => set(() => ({ redirectUrl: redirectUrl })),
}));
