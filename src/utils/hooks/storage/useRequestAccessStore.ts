import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Roles } from '@/utils/hooks/storage/useAuthStore';

interface RequestAccessStore {
  requests: Roles[];
  addRequest: (request: Roles) => void;
  clearRequests: () => void;
}

export const useRequestAccessStore = create(
  persist<RequestAccessStore>(
    (set) => ({
      requests: [],
      addRequest: (request: Roles) => set((prev) => ({ requests: [...prev.requests, request] })),
      clearRequests: () => set(() => ({ requests: [] })),
    }),
    {
      name: 'requests-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export function clearRequests() {
  useRequestAccessStore.setState({ requests: [] });
}
