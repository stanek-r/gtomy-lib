import { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseDialogProps } from '@/components/organisms/dialog';
import { ButtonIcon } from '@/components/atoms/ButtonIcon';
import * as Dialog from '@radix-ui/react-dialog';
import { Typography } from '@/components/atoms/Typography';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import { CloudflareStream } from '@/components/atoms/CloudflareStream';
import { CloudflareImage } from '@/components/atoms/CloudflareImage';
import { LoadingState } from '@/components/atoms/LoadingState';
import { LazyLoadImageProps } from 'react-lazy-load-image-component';
import { config } from '@/config';
import { useBreakpoint } from '@/utils/hooks/useBreakpoint';
import { useTranslation } from '@/utils/hooks/useTranslation';

export interface ImageDialogProps extends BaseDialogProps, Pick<LazyLoadImageProps, 'effect'> {
  title: string;
  subtitle?: string;
  imageId?: string;
  videoId?: string;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function ImageDialog({
  title,
  imageId,
  videoId,
  subtitle,
  open,
  onOpenChange,
  effect,
  onNext,
  onPrevious,
}: ImageDialogProps) {
  const { t } = useTranslation('common');
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [loaded, setLoaded] = useState<boolean>(videoId != null);
  const [error, setError] = useState<boolean>(false);
  const { isOverBreakpoint } = useBreakpoint('lg');

  const imageClasses = useMemo(
    () =>
      twMerge(
        'max-w-[90vw] object-contain',
        loaded && (height >= 1000 ? 'max-h-[80dvh]' : 'max-h-[75dvh]'),
        !loaded && 'w-[90vw]',
        !loaded && (height >= 1000 ? 'h-[80dvh]' : 'h-[75dvh]')
      ),
    [loaded, height]
  );

  const zoom = useCallback(() => {
    const src = `${config.cloudFlareImagesUrl}/${imageId}`;
    window.open(`${src}/original`, '_blank', 'noreferrer');
  }, [imageId]);

  const handleResize = useCallback(() => {
    if (!open) {
      return;
    }
    setHeight(window.innerHeight);
  }, [setHeight, open]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!open) {
        return;
      }

      if (e.key === 'ArrowLeft' && onPrevious != null) {
        onOpenChange?.(false);
        onPrevious();
      }
      if (e.key === 'ArrowRight' && onNext != null) {
        onOpenChange?.(false);
        onNext();
      }
    },
    [onNext, onPrevious, open]
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none">
          <div className="flex flex-col items-center gap-4">
            <div
              className={twMerge(
                'relative flex w-full max-w-screen-lg justify-between p-4',
                !loaded && !error ? 'justify-center items-center' : 'bg-base-100 text-base-content',
                subtitle && !error ? 'min-h-[96px]' : 'min-h-[68px]'
              )}
            >
              {error ? (
                <>
                  <div className="flex flex-col pr-10">
                    <Typography size="3xl" weight="semibold">
                      {t('state.error')}
                    </Typography>
                  </div>
                  <Dialog.Close asChild>
                    <ButtonIcon
                      icon={XMarkIcon}
                      variant="circle"
                      size="sm"
                      color="ghost"
                      className="absolute right-[10px] top-[10px]"
                    />
                  </Dialog.Close>
                </>
              ) : loaded ? (
                <>
                  <div className="flex flex-col pr-10">
                    <Typography size="3xl" weight="semibold">
                      {title}
                    </Typography>
                    <Typography size="lg">{subtitle}</Typography>
                  </div>
                  <Dialog.Close asChild>
                    <ButtonIcon
                      icon={XMarkIcon}
                      variant="circle"
                      size="sm"
                      color="ghost"
                      className="absolute right-[10px] top-[10px]"
                    />
                  </Dialog.Close>
                </>
              ) : (
                <LoadingState showLoading layout="row" />
              )}
            </div>
            {imageId && (
              <CloudflareImage
                imageId={imageId}
                className={imageClasses}
                wrapperClassName={twMerge('!bg-contain bg-no-repeat bg-center', isOverBreakpoint && 'cursor-zoom-in')}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                onClick={isOverBreakpoint ? zoom : undefined}
                effect={effect}
                title="Otevřít na nové kartě"
              />
            )}
            {videoId && <CloudflareStream videoId={videoId} />}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
