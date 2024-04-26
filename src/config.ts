export interface GTomyLibConfig {
  appName?: string;
  appDisplayName?: string;
  themes?: string[];
  authUrl?: string;
  backendUrl?: string;
  storageUrl?: string;
  cloudFlareImagesUrl?: string;
  googleAuthClientId?: string;
  googleAnalyticsPlugin?: any;
}

export const config: GTomyLibConfig = {};
