import React, { ChangeEvent } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { useFormController } from '@/utils';
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox';

/**
 * @group Components
 * @category Props
 */
export interface FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  hint?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

/**
 * @group Components
 * @category Form
 */
export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, hint, placeholder, className, type, ...useControllerProps }: FormCheckboxProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
    errorMessage,
  } = useFormController(useControllerProps);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <Checkbox
      label={label}
      placeholder={placeholder}
      error={errorMessage}
      className={className}
      onChange={handleOnChange}
      type={type}
      checked={value}
      hint={hint}
      {...other}
    />
  );
}
