import { CloudflareImageProps } from '@/components/CloudflareImage/CloudflareImage.core';
import { PropsAs } from '@/utils/typeHelpers.core';
import { ElementType } from 'react';

export function CloudflareImage<T extends ElementType = 'img'>({
  as,
  imageId,
  imagesUrl,
  srcType = 'original',
  placeholderType = 'miniature',
  effect,
  ...otherProps
}: PropsAs<CloudflareImageProps<T>, T>) {
  const Component = as ?? 'img';

  const src = `${imagesUrl}/${imageId}`;
  const isSame = srcType === placeholderType;
  return (
    <Component
      src={`${src}/${srcType}`}
      placeholderSrc={isSame ? undefined : `${src}/${placeholderType}`}
      effect={effect}
      {...otherProps}
    />
  );
}
