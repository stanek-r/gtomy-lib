import React, { ChangeEvent } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { useFormController } from '@/utils/hooks';
import { Switch } from '@/components/atoms/Switch/Switch';

/**
 * @group Components
 * @category Props
 */
export interface FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  placeholder?: string;
  type?: string;
  className?: string;
}

/**
 * @group Components
 * @category Form
 */
export function FormSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ placeholder, className, type, ...useControllerProps }: FormSwitchProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
  } = useFormController(useControllerProps);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <Switch
      placeholder={placeholder}
      className={className}
      onChange={handleOnChange}
      type={type}
      checked={value}
      {...other}
    />
  );
}
