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

export interface ImageDialogProps extends BaseDialogProps {
  title: string;
  subtitle?: string;
  imageId?: string;
  videoId?: string;
}

export function ImageDialog({ title, imageId, videoId, subtitle, open, onOpenChange }: ImageDialogProps) {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

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
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <div className="fixed left-[50%] top-16 flex w-full max-w-screen-lg translate-x-[-50%] justify-between p-4">
          <div className="flex flex-col">
            <Typography size="3xl">{title}</Typography>
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
        </div>
        <Dialog.Content
          className={twMerge(
            'fixed left-[50%] translate-x-[-50%] focus:outline-none',
            subtitle ? ' top-44' : ' top-40'
          )}
        >
          <div className="flex justify-center">
            {imageId && (
              <CloudflareImage
                imageId={imageId}
                className={twMerge(
                  'w-[90vw] max-w-[90vw] object-contain',
                  windowDimensions.height >= 1000 ? 'h-[80vh]' : 'h-[75vh]'
                )}
              />
            )}
            {videoId && <CloudflareStream videoId={videoId} />}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
