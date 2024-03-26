import React, { FunctionComponentElement } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { isSvgIcon, SvgIconType } from '@/models';
import { twMerge } from 'tailwind-merge';
import { typographyColorClasses } from '@/components/atoms/Typography';

export function ToastProvider() {
  return <Toaster position="bottom-right" reverseOrder={false} />;
}

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
  let svgIcon: FunctionComponentElement<any> | undefined = undefined;
  if (isSvgIcon(icon)) {
    svgIcon = React.createElement(icon, {
      className: twMerge('shrink-0 size-5 mr-1.5', typographyColorClasses[iconColor]),
    });
  }
  return toast(message, { icon: svgIcon, duration });
}
