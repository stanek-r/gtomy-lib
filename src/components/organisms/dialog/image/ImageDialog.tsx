import React, { useEffect, useState } from 'react';
import { BaseDialogProps } from '@/components/organisms/dialog';
import { ButtonIcon } from '@/components/atoms/ButtonIcon';
import * as Dialog from '@radix-ui/react-dialog';
import { Typography } from '@/components/atoms/Typography';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import { getWindowDimensions } from '@/utils/hooks';
import { CloudflareStream } from '@/components/atoms/CloudflareStream';
import { CloudflareImage } from '@/components/atoms/CloudflareImage';
import { LoadingState } from '@/components/atoms/LoadingState';
import { LazyLoadImageProps } from 'react-lazy-load-image-component';

export interface ImageDialogProps extends BaseDialogProps, Pick<LazyLoadImageProps, 'effect'> {
  title: string;
  subtitle?: string;
  imageId?: string;
  videoId?: string;
}

export function ImageDialog({ title, imageId, videoId, subtitle, open, onOpenChange, effect }: ImageDialogProps) {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [loaded, setLoaded] = useState<boolean>(videoId != null);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] focus:outline-none">
          <div className="flex flex-col items-center gap-4">
            <div
              className={twMerge(
                'flex w-full max-w-screen-lg justify-between p-4',
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
                className={twMerge(
                  'max-w-[90vw] object-contain',
                  !loaded && 'w-[90vw]',
                  windowDimensions.height >= 1000 ? 'h-[80vh]' : 'h-[75vh]'
                )}
                wrapperClassName="!bg-contain bg-no-repeat bg-center"
                onLoad={() => setLoaded(true)}
                effect={effect}
              />
            )}
            {videoId && <CloudflareStream videoId={videoId} />}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
