import { ElementType } from 'react';

export type CloudflareImageType = 'original' | 'fullhd' | 'miniature' | 'profile' | 'blur';

export interface CloudflareImageProps<T extends ElementType> {
  as?: T;
  imagesUrl: string;
  imageId: string;
  srcType?: CloudflareImageType;
  placeholderType?: CloudflareImageType;
}
