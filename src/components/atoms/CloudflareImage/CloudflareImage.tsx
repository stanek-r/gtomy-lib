import React from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export type CloudflareImageType = 'original' | 'fullhd' | 'miniature' | 'profile' | 'blur';

export interface CloudflareImageProps extends LazyLoadImageProps {
  srcType?: CloudflareImageType;
  placeholderType?: CloudflareImageType;
}

export function CloudflareImage({
  src,
  srcType = 'original',
  placeholderSrc,
  placeholderType = 'miniature',
  effect = 'blur',
  ...otherProps
}: CloudflareImageProps) {
  let placeholder = undefined;
  if (placeholderSrc) {
    placeholder = `${placeholderSrc}/${placeholderType}`;
  }
  return <LazyLoadImage src={`${src}/${srcType}`} placeholderSrc={placeholder} effect={effect} {...otherProps} />;
}
