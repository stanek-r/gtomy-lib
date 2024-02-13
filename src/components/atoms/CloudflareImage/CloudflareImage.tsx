import React from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import { config } from '@/config';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

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
  effect = 'blur',
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
