import { ReactNode } from 'react';
import { IconType } from '@/components/Icon/Icon.core';

export const maxWidthOptions = {
  sm: 'max-w-screen-sm ',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
};

export interface BaseDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ExtendedBaseDialogProps extends BaseDialogProps {
  title: string;
  closable?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  actions?: ReactNode;
  children?: ReactNode;
  spacing?: boolean;
  icon?: IconType;
}
