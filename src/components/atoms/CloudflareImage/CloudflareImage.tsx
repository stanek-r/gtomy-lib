import React from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import { config } from '@/config';

export type CloudflareImageType = 'original' | 'fullhd' | 'miniature' | 'profile' | 'blur';

export interface CloudflareImageProps extends Omit<LazyLoadImageProps, 'src'> {
  imageId: string;
  srcType?: CloudflareImageType;
  placeholderType?: CloudflareImageType;
}

export function CloudflareImage({
  imageId,
  srcType = 'original',
  placeholderType = 'miniature',
  effect,
  ...otherProps
}: CloudflareImageProps) {
  const src = `${config.cloudFlareImagesUrl}/${imageId}`;
  return (
    <LazyLoadImage
      src={`${src}/${srcType}`}
      placeholderSrc={`${src}/${placeholderType}`}
      effect={effect}
      {...otherProps}
    />
  );
}
