import { useQuery } from '@/utils/hooks/query';
import { useRequest } from '@/utils/hooks/useRequest';
import { UserAccessRequestDto } from '@/models/userAccessRequest.dto';
import { config } from '@/config';
import { Roles } from '@/utils/hooks/storage';
import { useAuth } from '@/utils/hooks/useAuth';
import { useCallback, useMemo, useState } from 'react';

export interface UseRequestAccessReturn {
  requestAccess: () => Promise<void>;
  error: any | null;
  sent: boolean;
  sending: boolean;
}

export function useRequestAccess(role: string, application = config.appName): UseRequestAccessReturn {
  const { isAuthenticated, user } = useAuth();
  const { get, put } = useRequest(config.authUrl);
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const { data, status, refetch } = useQuery<UserAccessRequestDto[]>({
    queryKey: ['request-access', user?.userId],
    queryFn: () => get<UserAccessRequestDto[]>('/request-access'),
    staleTime: 30 * 1000,
    enabled: isAuthenticated,
  });

  const sent = useMemo(() => {
    if (status === 'success') {
      return data.find((request: Roles) => request.role === role && request.application === application) != null;
    }
    return false;
  }, [data, status, role, application]);

  const handleRequestAccess = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }
    setSending(true);
    setError(null);
    const request = {
      application: application,
      role: role,
    } as Roles;
    await put('/request-access', request).catch((e) => setError(e));
    await refetch();
    setSending(false);
  }, [isAuthenticated, setSending, application, role, put, setError, refetch]);

  return {
    requestAccess: handleRequestAccess,
    error,
    sent,
    sending,
  };
}
