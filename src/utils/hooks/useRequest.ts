import { HttpClient } from '@/utils/auth/httpClient';
import { AxiosRequestConfig } from 'axios';
import { config } from '@/config';
import { useMemo } from 'react';

interface UseRequest {
  get: <T>(url: string, config?: AxiosRequestConfig<T>) => Promise<T>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig<T>) => Promise<T>;
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig<T>) => Promise<T>;
  delete: <T>(url: string, config?: AxiosRequestConfig<T>) => Promise<T>;
}

export function useRequest(baseURL = config.backendUrl): UseRequest {
  const client = useMemo(() => new HttpClient({ baseURL }), [baseURL]);

  return {
    get: (url, config) => client.get(url, config),
    post: (url, data, config) => client.post(url, data, config),
    put: (url, data, config) => client.put(url, data, config),
    delete: (url, config) => client.delete(url, config),
  };
}
