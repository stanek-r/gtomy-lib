import axios from 'axios';
import { UseRequest } from '@/hooks/useRequest/useRequest.core';
import { useCallback, useMemo } from 'react';

export function useRequest(backendUrl: string): UseRequest {
  const client = useMemo(
    () =>
      axios.create({
        baseURL: backendUrl,
      }),
    [backendUrl]
  );

  const get: UseRequest['get'] = useCallback(
    (url, config) => client.get(url, config).then((response) => response.data),
    [client]
  );
  const post: UseRequest['post'] = useCallback(
    (url, data, config) => client.post(url, data, config).then((response) => response.data),
    [client]
  );
  const put: UseRequest['put'] = useCallback(
    (url, data, config) => client.put(url, data, config).then((response) => response.data),
    [client]
  );
  const deleteRequest: UseRequest['delete'] = useCallback(
    (url, config) => client.delete(url, config).then((response) => response.data),
    [client]
  );

  return {
    get,
    post,
    put,
    delete: deleteRequest,
  };
}
