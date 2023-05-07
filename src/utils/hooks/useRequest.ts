import { HttpClient } from '../auth';
import { AxiosRequestConfig } from 'axios';
import { useAuth } from './useAuth';
import { useEffect, useState } from 'react';
import { config } from '../../config';

interface UseRequest {
  get: <T>(url: string, config?: AxiosRequestConfig<T>) => Promise<T>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig<T>) => Promise<T>;
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig<T>) => Promise<T>;
  delete: <T>(url: string, config?: AxiosRequestConfig<T>) => Promise<T>;
}

interface Props {
  baseURL?: string;
}

export function useRequest({ baseURL = config.backendUrl }: Props): UseRequest {
  const { token } = useAuth();
  const [client, setClient] = useState<HttpClient | null>(null);

  useEffect(() => {
    if (token) {
      setClient(new HttpClient(token, baseURL));
    } else {
      setClient(null);
    }
  }, [token]);

  return {
    get: client!.get,
    post: client!.post,
    put: client!.put,
    delete: client!.delete,
  };
}
