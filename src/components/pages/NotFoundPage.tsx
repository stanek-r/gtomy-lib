import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnPage } from '@/components/layout/ColumnPage';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';

export function NotFoundPage() {
  const { t } = useTranslation('common');

  return (
    <ColumnPage>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-8">
        <Typography size="3xl" weight="bold">
          {t('notFound')}
        </Typography>
        <div>
          <Button as={Link} to="/" wide outline>
            {t('back')}
          </Button>
        </div>
      </div>
    </ColumnPage>
  );
}
