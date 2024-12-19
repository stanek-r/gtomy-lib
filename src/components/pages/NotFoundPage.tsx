import { useTranslation } from 'react-i18next';
import { ColumnPage } from '@/components/layout/ColumnPage';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { useCallback } from 'react';
import { useConfig } from '@/utils/ConfigProvider';

export function NotFoundPage() {
  const { t } = useTranslation('common');
  const { navigate } = useConfig();

  const onBackClick = useCallback(() => {
    navigate?.('/');
  }, [navigate]);

  return (
    <ColumnPage>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-8">
        <Typography size="3xl" weight="bold">
          {t('notFound')}
        </Typography>
        <div>
          <Button onClick={onBackClick} wide outline>
            {t('back')}
          </Button>
        </div>
      </div>
    </ColumnPage>
  );
}
