import React from 'react';
import { ColumnPage } from '@/components/layout';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks';
import dayjs from 'dayjs';

export const PRIVACY_EFFECTIVE_DATE = dayjs('2024-02-25', 'YYYY-MM-DD');

export interface PrivacyPolicyPageProps {
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function PrivacyPolicyPage({ width }: PrivacyPolicyPageProps) {
  const { t } = useTranslation('pages');
  return (
    <ColumnPage width={width}>
      <Typography size="4xl" weight="semibold">
        {t('privacy.title')}
      </Typography>
      <Typography size="xl" weight="semibold">
        {t('privacy.subtitle')}
        {PRIVACY_EFFECTIVE_DATE.format('D.M.YYYY')}
      </Typography>
      <p>{t('privacy.description')}</p>
      <Typography size="xl" weight="medium">
        {t('privacy.informationWeCollect.title')}
      </Typography>
      <p>{t('privacy.informationWeCollect.paragraph1')}</p>
      <ul>
        <li>{t('privacy.informationWeCollect.list.element1')}</li>
        <li>{t('privacy.informationWeCollect.list.element2')}</li>
        <li>{t('privacy.informationWeCollect.list.element3')}</li>
      </ul>
      <p>{t('privacy.informationWeCollect.paragraph2')}</p>
      <Typography size="xl" weight="medium">
        {t('privacy.howWeUseYourInformation.title')}
      </Typography>
      <p>{t('privacy.howWeUseYourInformation.paragraph1')}</p>
      <ul>
        <li>{t('privacy.howWeUseYourInformation.list.element1')}</li>
        <li>{t('privacy.howWeUseYourInformation.list.element2')}</li>
        <li>{t('privacy.howWeUseYourInformation.list.element3')}</li>
        <li>{t('privacy.howWeUseYourInformation.list.element4')}</li>
        <li>{t('privacy.howWeUseYourInformation.list.element5')}</li>
      </ul>
      <Typography size="xl" weight="medium">
        {t('privacy.sharingOfYourInformation.title')}
      </Typography>
      <p>{t('privacy.sharingOfYourInformation.paragraph1')}</p>
      <p>{t('privacy.sharingOfYourInformation.paragraph2')}</p>
      <Typography size="xl" weight="medium">
        {t('privacy.dataSecurity.title')}
      </Typography>
      <p>{t('privacy.dataSecurity.paragraph1')}</p>
      <Typography size="xl" weight="medium">
        {t('privacy.gdpr.title')}
      </Typography>
      <p>{t('privacy.gdpr.paragraph1')}</p>
      <ul>
        <li>{t('privacy.gdpr.list.element1')}</li>
        <li>{t('privacy.gdpr.list.element2')}</li>
        <li>{t('privacy.gdpr.list.element3')}</li>
        <li>{t('privacy.gdpr.list.element4')}</li>
        <li>{t('privacy.gdpr.list.element5')}</li>
        <li>{t('privacy.gdpr.list.element6')}</li>
      </ul>
      <p>{t('privacy.gdpr.paragraph2')}</p>
      <Typography size="xl" weight="medium">
        {t('privacy.childrenPrivacy.title')}
      </Typography>
      <p>{t('privacy.childrenPrivacy.paragraph1')}</p>
      <Typography size="xl" weight="medium">
        {t('privacy.changesToPolicy.title')}
      </Typography>
      <p>{t('privacy.changesToPolicy.paragraph1')}</p>
      <Typography size="xl" weight="medium">
        {t('privacy.contactUs.title')}
      </Typography>
      <p>{t('privacy.contactUs.paragraph1')}</p>
      <ul>
        <li>{t('privacy.contactUs.list.element1')}</li>
        <li>{t('privacy.contactUs.list.element2')}</li>
      </ul>
      <p>{t('privacy.contactUs.paragraph2')}</p>
      <p>{t('privacy.contactUs.paragraph3')}</p>
    </ColumnPage>
  );
}
