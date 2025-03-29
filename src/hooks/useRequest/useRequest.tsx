import axios from 'axios';
import { UseRequest } from '@/hooks/useRequest/useRequest.core';

export function useRequest(backendUrl: string): UseRequest {
  const client = axios.create({
    baseURL: backendUrl,
  });

  return {
    get: (url, config) => client.get(url, config).then((response) => response.data),
    post: (url, data, config) => client.post(url, data, config).then((response) => response.data),
    put: (url, data, config) => client.put(url, data, config).then((response) => response.data),
    delete: (url, config) => client.delete(url, config).then((response) => response.data),
  };
}
