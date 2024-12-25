import { HttpClient } from '@/utils/auth/httpClient';
import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import { useConfig } from '@/utils/config/context';

interface UseRequest {
  get: <T>(url: string, config?: AxiosRequestConfig<T>) => Promise<T>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig<T>) => Promise<T>;
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig<T>) => Promise<T>;
  delete: <T>(url: string, config?: AxiosRequestConfig<T>) => Promise<T>;
  refresh: () => Promise<string | null>;
}

export function useRequest(forceBackendUrl?: string): UseRequest {
  const { backendUrl } = useConfig();
  const baseURL = useMemo(() => forceBackendUrl ?? backendUrl, [forceBackendUrl, backendUrl]);
  const client = useMemo(() => new HttpClient({ baseURL }), [baseURL]);

  return {
    get: (url, config) => client.get(url, config),
    post: (url, data, config) => client.post(url, data, config),
    put: (url, data, config) => client.put(url, data, config),
    delete: (url, config) => client.delete(url, config),
    refresh: () => client.refresh(),
  };
}
