import { AxiosRequestConfig } from 'axios';

export interface UseRequest {
  get: <T>(url: string, config?: AxiosRequestConfig<T>) => Promise<T>;
  post: <T = void, K = object>(url: string, data?: K, config?: AxiosRequestConfig<K>) => Promise<T>;
  put: <T = void, K = object>(url: string, data?: K, config?: AxiosRequestConfig<K>) => Promise<T>;
  delete: <T = void>(url: string, config?: AxiosRequestConfig<T>) => Promise<T>;
}
