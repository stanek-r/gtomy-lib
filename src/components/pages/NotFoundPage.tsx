import { FormPage } from '@/components/layout';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/utils/hooks';
import { Button } from '@/components/atoms/Button';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  const { t } = useTranslation('common');

  return (
    <FormPage>
      <div className="flex w-full flex-1 items-center justify-center text-center">
        <div className="flex w-[768px] max-w-full flex-col gap-y-3 p-4">
          <Typography size="3xl" weight="bold">
            {t('notFound.title')}
          </Typography>
          <Typography size="3xl">{t('notFound.subtitle')}</Typography>
          <div>
            <Button as={Link} to="/" size="sm" outline>
              {t('back')}
            </Button>
          </div>
        </div>
      </div>
    </FormPage>
  );
}
