import { create } from 'zustand';

interface RefetchStore {
  refetch: boolean;
  setRefetch: (refetch: boolean) => void;
}

export const useRefetchStore = create<RefetchStore>((set) => ({
  refetch: false,
  setRefetch: (refetch: boolean) => set(() => ({ refetch: refetch })),
}));

export function setRefetch(refetch: boolean): void {
  useRefetchStore.setState({ refetch: refetch });
}

export function getRefetch(): boolean {
  return useRefetchStore.getState().refetch;
}
