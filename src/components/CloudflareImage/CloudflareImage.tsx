import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CloudflareImageProps } from '@/components/CloudflareImage/CloudflareImage.core';
import { useGTomyContext } from '@/utils/GTomyProvider.core';

export function CloudflareImage({
  imageId,
  srcType = 'original',
  placeholderType = 'miniature',
  effect,
  ...otherProps
}: CloudflareImageProps) {
  const gtomyContext = useGTomyContext();
  const src = `${gtomyContext?.cloudFlareImagesUrl}/${imageId}`;
  const isSame = srcType === placeholderType;
  return (
    <LazyLoadImage
      src={`${src}/${srcType}`}
      placeholderSrc={isSame ? undefined : `${src}/${placeholderType}`}
      effect={effect}
      {...otherProps}
    />
  );
}
