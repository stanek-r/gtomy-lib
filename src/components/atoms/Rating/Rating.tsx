import { Typography } from '@/components/atoms/Typography/Typography';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

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

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ label, hint, error, half, className, value, amount, size, ...other }: RatingProps, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <Typography>{label}</Typography>
        <div className="flex items-center gap-4">
          <div ref={ref} className={twMerge('rating rating-', size && ratingSizeClasses[size], half && 'rating-half')}>
            {[...Array(amount).keys()].map((n) => (
              <input
                key={n}
                type="radio"
                name="score"
                className={twMerge(
                  'mask mask-star-2 bg-orange-400',
                  half && (n % 2 === 0 ? 'mask-half-1' : 'mask-half-2'),
                  className
                )}
                value={n + 1}
                defaultChecked={n + 1 === value}
                {...other}
              />
            ))}
          </div>
          <Typography size="2xl">{value}/10</Typography>
        </div>
        {error && (
          <div className="label">
            <Typography color="error" content={false} className="label-text-alt">
              {error}
            </Typography>
          </div>
        )}
        {hint && !error && (
          <div className="label">
            <span className="label-text-alt">{hint}</span>
          </div>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';
