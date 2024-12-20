import { useQuery } from '@/utils/hooks/query/useQuery';
import { useRequest } from '@/utils/hooks/useRequest';
import { UserAccessRequestDto } from '@/models/userAccessRequest.dto';
import { Roles } from '@/utils/hooks/storage/useAuthStore';
import { useAuth } from '@/utils/hooks/useAuth';
import { useCallback, useMemo, useState } from 'react';
import { useConfig } from '@/utils/config/context';

export interface UseRequestAccessReturn {
  requestAccess: () => Promise<void>;
  error: any | null;
  sent: boolean;
  sending: boolean;
}

export function useRequestAccess(role: string, forceAppName?: string): UseRequestAccessReturn {
  const { isAuthenticated, user } = useAuth();
  const { appName, authUrl } = useConfig();
  const { get, put } = useRequest(authUrl);
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const application = useMemo(() => forceAppName ?? appName, [forceAppName, appName]);

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
