import { useCallback, useMemo } from 'react';
import { Typography } from '@/components/Typography/Typography';
import { Button } from '@/components/Button/Button';
import { InfoDialog } from '@/organisms/dialog/info/InfoDialog';
import useCookie from 'react-use-cookie';
import { useDialog } from '@/organisms/dialog/useDialog';
import { DialogElement } from '@/organisms/dialog/DialogElement';

export interface CookiesProps {
  translation: {
    title: string;
    subtitle: string;
    info: string;
    accept: string;
    dialog: {
      title: string;
      text: string;
    };
  };
}

export function Cookies({ translation }: CookiesProps) {
  const [cookiesAccepted, setCookiesAccepted] = useCookie('cookiesAccepted', 'false');

  const dialog = useMemo(
    () => <InfoDialog title={translation.dialog.title} text={translation.dialog.text} />,
    [translation.dialog.title, translation.dialog.text]
  );
  const { openDialog, dialogElementProps } = useDialog(dialog);

  const acceptCookies = useCallback(() => {
    setCookiesAccepted('true', {
      days: 365,
    });
  }, [setCookiesAccepted]);

  if (cookiesAccepted === 'true') {
    return null;
  }

  return (
    <>
      <DialogElement {...dialogElementProps} />
      <div className="fixed inset-x-0 bottom-0 z-10 flex w-full items-center justify-between gap-4 bg-base-300 px-10 py-4 text-base-content">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <Typography size="lg" weight="medium">
              {translation.title}
            </Typography>
            <Typography>{translation.subtitle}</Typography>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4 flex-col-reverse sm:flex-row">
          <Button onClick={openDialog}>{translation.info}</Button>
          <Button color="primary" onClick={acceptCookies}>
            {translation.accept}
          </Button>
        </div>
      </div>
    </>
  );
}
