import { SvgIconType } from '@/utils/svg.core';
import toast from 'react-hot-toast';
import { createElement } from 'react';
import { Icon } from '@/components/Icon/Icon';

export interface ShowToastSettings {
  message: string;
  duration?: number;
  icon?: SvgIconType;
  iconColor?:
    | 'inherit'
    | 'base'
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
}

export function showToast({ message, duration, icon, iconColor = 'base' }: ShowToastSettings) {
  return toast(message, {
    icon: createElement(Icon, {
      icon,
      color: iconColor,
      content: false,
      className: 'mr-1.5',
    }),
    duration,
  });
}
