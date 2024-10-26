import { ComponentProps } from 'react';
import { Threads } from '@/assets/social/Threads';
import { Youtube } from '@/assets/social/Youtube';
import { Instagram } from '@/assets/social/Instagram';
import { X } from '@/assets/social/X';
import { Bluesky } from '@/assets/social/Bluesky';

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
