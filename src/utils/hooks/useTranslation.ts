import i18n from '@/utils/i18n';
import { DefaultNamespace, KeyPrefix, Namespace } from 'i18next';
import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next';

function useCustomTranslation<N extends Namespace = DefaultNamespace, TKPrefix extends KeyPrefix<N> = undefined>(
  ns?: N | Readonly<N>,
  options?: UseTranslationOptions<TKPrefix>
): UseTranslationResponse<N, TKPrefix> {
  const { t, ...other } = useTranslation<N, TKPrefix>(ns, { i18n: i18n, ...options });
  return { t, ...other };
}

export { useCustomTranslation as useTranslation };
