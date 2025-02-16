import { ComponentPropsWithRef } from 'react';

export const ratingSizeClasses = {
  xs: 'rating-sm',
  sm: 'rating-lg',
  md: 'rating-lg',
  lg: 'rating-lg',
};

export interface RatingProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  amount: number;
  half?: true;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}
