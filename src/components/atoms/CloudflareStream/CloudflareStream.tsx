import { Stream } from '@cloudflare/stream-react';
import { useObjectSize, UseObjectSizeSettings } from '@/utils/hooks/useObjectSize';

export interface CloudflareStreamProps {
  videoId: string;
  height?: number;
  width?: number;
  responsive?: boolean;
  settings?: UseObjectSizeSettings;
}

export function CloudflareStream({
  videoId,
  responsive = true,
  height: staticHeight,
  width: staticWidth,
  settings,
}: CloudflareStreamProps) {
  const { height, width } = useObjectSize(settings);

  if (!responsive) {
    return <Stream src={videoId} controls responsive={false} height={`${staticHeight}`} width={`${staticWidth}`} />;
  }
  return <Stream src={videoId} controls responsive={false} height={`${height}`} width={`${width}`} />;
}
