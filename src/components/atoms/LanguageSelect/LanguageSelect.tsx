import { ComponentPropsWithRef, useMemo } from 'react';
import { changeLanguage, supportedLngs } from '@/utils/i18n';
import { useTranslation } from 'react-i18next';
import { SelectInput } from '@/components/atoms/SelectInput/SelectInput';

export type LanguageSelectProps = Omit<
  Omit<Omit<Omit<ComponentPropsWithRef<'select'>, 'children'>, 'onChange'>, 'value'>,
  'size'
>;

export function LanguageSelect(props: LanguageSelectProps) {
  const { i18n, t } = useTranslation('common');

  const options = useMemo(
    () => supportedLngs.map((lng) => ({ value: lng, label: t('languages.' + lng, { lng }) })),
    [t]
  );

  return (
    <SelectInput
      options={options}
      value={i18n.language}
      onChange={(event) => changeLanguage(event.target.value)}
      size="sm"
      {...props}
    />
  );
}
