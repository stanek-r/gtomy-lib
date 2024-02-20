import React, { ChangeEvent } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { useFormController } from '@/utils';
import { Radio } from '@/components/atoms/Radio/Radio';

/**
 * @group Components
 * @category Props
 */
export interface FormRadioProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  hint?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  value: string;
}

/**
 * @group Components
 * @category Form
 */
export function FormRadio<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  hint,
  placeholder,
  className,
  type,
  value: radioValue,
  ...useControllerProps
}: FormRadioProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
    errorMessage,
  } = useFormController(useControllerProps);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Radio
      label={label}
      placeholder={placeholder}
      error={errorMessage}
      className={className}
      onChange={handleOnChange}
      type={type}
      hint={hint}
      value={radioValue}
      checked={radioValue === value}
      {...other}
    />
  );
}
