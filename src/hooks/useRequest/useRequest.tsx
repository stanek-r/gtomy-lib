import axios from 'axios';
import { UseRequest } from '@/hooks/useRequest/useRequest.core';

export function useRequest(backendUrl: string): UseRequest {
  const client = axios.create({
    baseURL: backendUrl,
  });

  return {
    get: (url, config) => client.get(url, config),
    post: (url, data, config) => client.post(url, data, config),
    put: (url, data, config) => client.put(url, data, config),
    delete: (url, config) => client.delete(url, config),
  };
}
