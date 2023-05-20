import { useTranslation } from 'react-i18next';

export function useCommonTranslation(namespace?: string) {
  const { t } = useTranslation(namespace);

  const stringifiedT = (key: string, options?: any) => t(key, options).toString();

  return {
    t,
    st: stringifiedT,
  };
}
