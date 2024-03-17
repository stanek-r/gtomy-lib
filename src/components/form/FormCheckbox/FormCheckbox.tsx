import React, { ChangeEvent } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox';
import { useFormController } from '@/utils/hooks';

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
  imageId?: string;
  outlined?: boolean;
}

/**
 * @group Components
 * @category Form
 */
export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  hint,
  placeholder,
  className,
  type,
  outlined,
  imageId,
  ...useControllerProps
}: FormCheckboxProps<TFieldValues, TName>) {
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
      imageId={imageId}
      outlined={outlined}
      {...other}
    />
  );
}
