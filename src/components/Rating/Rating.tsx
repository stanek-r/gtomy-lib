import { forwardRef } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { RatingProps, ratingSizeClasses } from '@/components/Rating/Rating.core';
import { Typography } from '@/components/Typography/Typography';

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ label, hint, error, half, className, value, amount, size, ...other }: RatingProps, ref) => {
    return (
      <div className={twMerge('flex flex-col gap-2', className)}>
        <Typography>{label}</Typography>
        <div className="flex items-center gap-4">
          <div ref={ref} className={twJoin('rating rating-', size && ratingSizeClasses[size], half && 'rating-half')}>
            {[...Array(amount).keys()].map((n) => (
              <input
                key={n}
                type="radio"
                name="score"
                className={twJoin(
                  'mask mask-star-2 bg-orange-400',
                  half && (n % 2 === 0 ? 'mask-half-1' : 'mask-half-2')
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
