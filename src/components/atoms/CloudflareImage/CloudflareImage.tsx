import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import { useConfig } from '@/utils/ConfigProvider';

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
  const { cloudFlareImagesUrl } = useConfig();
  const src = `${cloudFlareImagesUrl}/${imageId}`;
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
