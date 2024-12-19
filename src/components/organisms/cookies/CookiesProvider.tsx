import { useCookiesStore } from '@/utils/hooks/storage/useCookiesStore';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { Trans, useTranslation } from 'react-i18next';
import { useInfoDialog } from '@/utils/hooks/useDialog';
import { Typography } from '@/components/atoms/Typography/Typography';
import { DialogElement } from '@/components/organisms/dialog/DialogElement';
import { Button } from '@/components/atoms/Button/Button';

export function CookiesProvider() {
  const { t } = useTranslation('common');
  const [acceptedAt, acceptCookies, clearCookies] = useCookiesStore((state) => [
    state.acceptedAt,
    state.acceptCookies,
    state.clearCookies,
  ]);
  const { openDialog, dialogElementProps } = useInfoDialog({
    title: t('cookies.dialog.title'),
    text: (
      <Trans i18nKey="cookies.dialog.text" ns="common" components={{ a: <br />, b: <Typography weight="medium" /> }} />
    ),
  });

  useEffect(() => {
    if (acceptedAt == null) {
      return;
    }
    const acceptedAtParsed = dayjs(acceptedAt, 'YYYY-MM-DD');
    if (!acceptedAtParsed.isValid() || acceptedAtParsed.isBefore(dayjs().subtract(1, 'month'))) {
      clearCookies();
    }
  }, [acceptedAt]);

  if (acceptedAt != null) {
    return null;
  }

  return (
    <>
      <DialogElement {...dialogElementProps} />
      <div className="fixed inset-x-0 bottom-0 z-10 flex w-full items-center justify-between gap-4 bg-base-300 px-10 py-4 text-base-content">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <Typography size="lg" weight="medium">
              {t('cookies.title')}
            </Typography>
            <Typography>{t('cookies.subtitle')}</Typography>
          </div>
        </div>
        <div className={twMerge('flex gap-2 sm:gap-4 flex-col-reverse sm:flex-row')}>
          <Button onClick={openDialog}>{t('cookies.info')}</Button>
          <Button color="primary" onClick={acceptCookies}>
            {t('cookies.accept')}
          </Button>
        </div>
      </div>
    </>
  );
}
