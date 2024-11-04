import { ChangeEvent, useCallback } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { useFormController } from '@/utils/hooks/useFormController';
import { Rating } from '@/components/atoms/Rating/Rating';

/**
 * @group Components
 * @category Props
 */
export interface FormRatingProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  className?: string;
  label?: string;
  hint?: string;
  error?: string;
  amount: number;
  half?: true;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

/**
 * @group Components
 * @category Form
 */
export function FormRating<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, hint, half, className, amount, size, ...useControllerProps }: FormRatingProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
    errorMessage,
  } = useFormController(useControllerProps);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(+event.target.value);
    },
    [onChange]
  );

  return (
    <Rating
      label={label}
      half={half}
      error={errorMessage}
      className={className}
      onChange={handleOnChange}
      amount={amount}
      size={size}
      hint={hint}
      value={value}
      {...other}
    />
  );
}
