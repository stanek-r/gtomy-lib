export interface GTomyLibConfig {
  appName?: string;
  appDisplayName?: string;
  themes?: string[];
  authUrl?: string;
  backendUrl?: string;
  cloudFlareImagesUrl?: string;
  googleAuthClientId?: string;
  googleAnalyticsEnabled?: boolean;
}

export const config: GTomyLibConfig = {};
