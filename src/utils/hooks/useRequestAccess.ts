import { useQuery } from '@/utils/hooks/query';
import { useRequest } from '@/utils/hooks/useRequest';
import { UserAccessRequestDto } from '@/models/userAccessRequest.dto';
import { config } from '@/config';
import { Roles } from '@/utils/hooks/storage';
import { useAuth } from '@/utils/hooks/useAuth';
import { useCallback, useMemo, useState } from 'react';
import { useRequestAccessStore } from '@/utils/hooks/storage/useRequestAccessStore';

export interface UseRequestAccessReturn {
  requestAccess: () => Promise<void>;
  error: any | null;
  sent: boolean;
  sending: boolean;
}

export function useRequestAccess(role: string, application = config.appName): UseRequestAccessReturn {
  const { isAuthenticated } = useAuth();
  const { get, put } = useRequest(config.authUrl);
  const getRequestAccess: () => Promise<UserAccessRequestDto[]> = useCallback(() => {
    if (isAuthenticated) {
      return get<UserAccessRequestDto[]>('/request-access');
    }
    return new Promise((resolve) => resolve([]));
  }, [isAuthenticated, get]);

  const { data, isError, isLoading, refetch } = useQuery<UserAccessRequestDto[]>({
    queryKey: ['request-access', isAuthenticated],
    queryFn: getRequestAccess,
    fallbackValue: [],
    refetchOnMount: false,
  });

  const [requests, addRequest] = useRequestAccessStore((state: any) => [state.requests, state.addRequest]);
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const sent = useMemo(() => {
    if (data.length === 0 && (isError || isLoading)) {
      return data.find((request: Roles) => request.role === role && request.application === application) != null;
    }
    return requests.find((request: Roles) => request.role === role && request.application === application) != null;
  }, [data, requests, isError, isLoading, role, application]);

  const handleRequestAccess = async () => {
    if (!isAuthenticated) {
      return;
    }
    setSending(true);
    const request = {
      application: application,
      role: role,
    } as Roles;
    await put('/request-access', request)
      .then(() => {
        setError(null);
        addRequest(request);
        refetch();
      })
      .catch((e) => setError(e));
    setSending(false);
  };

  return {
    requestAccess: handleRequestAccess,
    error,
    sent,
    sending,
  };
}
