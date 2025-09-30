export interface ErrorTranslations {
  retry: string;
  error: string;
  noPermission: string;
  badGateway: string;
}

export interface ErrorWithLoadingTranslations extends ErrorTranslations {
  loadingMessage?: string;
}
