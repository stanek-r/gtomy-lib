import { useEffect, useMemo } from 'react';
import { HttpClient } from '@/utils/auth/httpClient';
import { ConfigContext, ConfigProviderProps, GTomyLibConfig } from '@/utils/config/context';
import { useRouter } from 'next/navigation';

export function ConfigProviderNextJs({ children, config: initConfig }: ConfigProviderProps) {
  const router = useRouter();

  const config: GTomyLibConfig = useMemo(
    () => ({
      appName: initConfig.appName,
      appDisplayName: initConfig.appDisplayName,
      themes: initConfig.themes && initConfig.themes.length > 1 ? ['system', ...initConfig.themes] : [],
      backendUrl: initConfig.backendUrl,
      authUrl: initConfig.authUrl,
      storageUrl: initConfig.storageUrl,
      cloudFlareImagesUrl: initConfig.cloudflareConfig?.imagesUrl ?? '/images',
      googleAuthClientId: initConfig.googleConfig?.clientId,
      navigate: (url) => router.push(url),
    }),
    [initConfig, router]
  );

  useEffect(() => {
    HttpClient.AUTH_URL = initConfig.authUrl;
  }, [initConfig.authUrl]);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}
