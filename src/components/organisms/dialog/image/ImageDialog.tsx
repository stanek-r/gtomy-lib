import { useEffect, useMemo, useState } from 'react';
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

export interface ImageDialogProps extends BaseDialogProps, Pick<LazyLoadImageProps, 'effect'> {
  title: string;
  subtitle?: string;
  imageId?: string;
  videoId?: string;
}

export function ImageDialog({ title, imageId, videoId, subtitle, open, onOpenChange, effect }: ImageDialogProps) {
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [loaded, setLoaded] = useState<boolean>(videoId != null);

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

  const zoom = () => {
    const src = `${config.cloudFlareImagesUrl}/${imageId}`;
    window.open(`${src}/original`, '_blank', 'noreferrer');
  };

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none">
          <div className="flex flex-col items-center gap-4">
            <div
              className={twMerge(
                'relative flex w-full max-w-screen-lg justify-between p-4',
                !loaded && 'justify-center items-center',
                subtitle ? 'min-h-[96px]' : 'min-h-[68px]'
              )}
              style={{ backgroundColor: loaded ? 'rgba(255, 255, 255, 0.1)' : '' }}
            >
              {loaded ? (
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
                wrapperClassName="!bg-contain bg-no-repeat bg-center cursor-zoom-in"
                onLoad={() => setLoaded(true)}
                onClick={zoom}
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
