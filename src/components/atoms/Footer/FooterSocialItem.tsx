import React, { ComponentProps } from 'react';
import { Threads } from '@/assets/social/Threads';
import { Youtube } from '@/assets/social/Youtube';
import { Instagram } from '@/assets/social/Instagram';

const types = {
  threads: <Threads />,
  youtube: <Youtube />,
  instagram: <Instagram />,
};

export interface FooterSocialItemProps extends Omit<ComponentProps<'a'>, 'children'> {
  type: 'threads' | 'youtube' | 'instagram';
}

export function FooterSocialItem({ type, ...other }: FooterSocialItemProps) {
  return <a {...other}>{types[type]}</a>;
}
