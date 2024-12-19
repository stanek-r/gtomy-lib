import { ComponentProps } from 'react';
import { Threads } from '@/components/icons/Threads';
import { Youtube } from '@/components/icons/Youtube';
import { Instagram } from '@/components/icons/Instagram';
import { X } from '@/components/icons/X';
import { Bluesky } from '@/components/icons/Bluesky';

const types = {
  bluesky: <Bluesky />,
  threads: <Threads />,
  youtube: <Youtube />,
  instagram: <Instagram />,
  x: <X />,
};

export interface FooterSocialItemProps extends Omit<ComponentProps<'a'>, 'children'> {
  type: 'bluesky' | 'threads' | 'youtube' | 'instagram' | 'x';
}

export function FooterSocialItem({ type, ...other }: FooterSocialItemProps) {
  return (
    <a {...other} title={type}>
      {types[type]}
    </a>
  );
}
