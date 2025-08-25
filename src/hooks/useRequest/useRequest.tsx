import axios, { CreateAxiosDefaults } from 'axios';
import { UseRequest } from '@/hooks/useRequest/useRequest.core';
import { useCallback, useMemo } from 'react';

export function useRequest(config?: CreateAxiosDefaults): UseRequest {
  const client = useMemo(() => axios.create(config), [config]);

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
  const del: UseRequest['del'] = useCallback(
    (url, config) => client.delete(url, config).then((response) => response.data),
    [client]
  );

  return {
    get,
    post,
    put,
    del,
  };
}
