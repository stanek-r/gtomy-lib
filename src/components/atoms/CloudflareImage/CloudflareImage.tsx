import React from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
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
  effect = 'blur',
  ...otherProps
}: CloudflareImageProps) {
  const src = `${config.cloudFlareImagesUrl}/${imageId}`;
  const placeholderSrc = srcType === placeholderType ? undefined : `${src}/${placeholderType}`;
  return <LazyLoadImage src={`${src}/${srcType}`} placeholderSrc={placeholderSrc} effect={effect} {...otherProps} />;
}
