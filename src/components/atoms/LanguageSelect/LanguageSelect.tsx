import React, { ComponentPropsWithRef } from 'react';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { SelectInput } from '@/components/atoms/SelectInput';
import { changeLanguage } from '@/utils';

export type LanguageSelectProps = Omit<Omit<Omit<ComponentPropsWithRef<'select'>, 'children'>, 'onChange'>, 'value'>;

export function LanguageSelect(props: LanguageSelectProps) {
  const { i18n, t } = useTranslation('common');

  const options = [
    { value: 'en', label: t('languages.english') },
    { value: 'cs', label: t('languages.czech') },
  ];

  return (
    <SelectInput
      options={options}
      value={i18n.language}
      onChange={(event) => changeLanguage(event.target.value)}
      {...props}
    />
  );
}
