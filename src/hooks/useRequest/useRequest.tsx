import axios from 'axios';
import { useGTomyContext } from '@/utils/GTomyProvider/useGTomyContext';
import { UseRequest } from '@/hooks/useRequest/useRequest.core';

export function useRequest(forceBackendUrl?: string): UseRequest {
  const gtomyContext = useGTomyContext();
  const baseURL = forceBackendUrl ?? gtomyContext?.backendUrl;
  const client = axios.create({
    baseURL: baseURL,
  });

  return {
    get: (url, config) => client.get(url, config),
    post: (url, data, config) => client.post(url, data, config),
    put: (url, data, config) => client.put(url, data, config),
    delete: (url, config) => client.delete(url, config),
  };
}
